const Readable = require('stream').Readable;
const Path = require('path');
const Fs = require('fs');
const IMAGES = { jpg: 1, png: 1, gif: 1, svg: 1, jpeg: 1, heic: 1, heif: 1, webp: 1, tiff: 1, bmp: 1 };
const HEADERSIZE = 2000;
const MKDIR = { recursive: true };
const REGCLEAN = /^[\s]+|[\s]+$/g;
const GZIPFILE = { memLevel: 9 };
const ENCODING = 'utf8';
const CONCAT = [null, null];
const REG_RANGE = /bytes=/;

function FileDB(name, directory) {
	var t = this;
	t.name = name;
	// t.directory = directory;
	// t.logger = directory + '/files.log';
	t.cache = {};
	t.total = 0;
	t.size = 0;
	t.ext = '.file';
	t.pause = false;

	ON('service', function(counter) {
		if (counter % 10)
			t.cache = {};
	});

	t.retrysave = function(id, name, filename, callback, custom, expire, headers) {
		t._save(id, name, filename, callback, custom, expire, headers);
	};

	t.retryread = function(id, callback, nostream) {
		t._read(id, callback, nostream);
	};

	t.storage(directory);
}

const FP = FileDB.prototype;

FP.storage = function(value) {
	var self = this;
	self.cache = {};
	self.directory = value;
	self.logger = Path.join(value, 'files.log');
	return self;
};

FP.count = function(callback) {
	var self = this;
	NOSQL('~' + self.logger).scalar('sum', 'size').callback(function(err, response) {
		response.size = response.sum;
		self.size = response.size;
		self.total = response.count;
		response.sum = undefined;
		callback && callback(err, response);
	});
	return self;
};

FP.makedirectory = function(id) {

	var val = (HASH(id, true) % 10000) + '';
	var diff = 4 - val.length;

	if (diff > 0) {
		for (var i = 0; i < diff; i++)
			val = '0' + val;
	}

	if (diff.length > 4)
		val = val.substring(0, 4);

	return Path.join(this.directory, val);
};

FP.readfilename = function(id) {
	var self = this;
	var directory = self.makedirectory(id);
	return Path.join(directory, id + '.file');
};

FP.savejson = function(id, value, callback, custom, expire) {
	return this.save(id, id + '.json', Buffer.from(JSON.stringify(value), 'utf8'), callback, custom, expire);
};

FP.readjson = function(id, callback) {
	return this.read(id, function(err, meta) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = [];
		meta.stream.on('data', chunk => buffer.push(chunk));
		meta.stream.on('end', function() {
			meta.stream = null;
			callback(null, Buffer.concat(buffer).toString('utf8').parseJSON(true), meta);
		});

	});
};

FP.save = FP.insert = function(id, name, filename, callback, custom, expire, headers) {
	var self = this;

	if (callback && typeof(callback) !== 'function') {
		headers = expire;
		expire = custom;
		custom = callback;
		callback = null;
	}

	if (callback)
		return self._save(id, name, filename, callback, custom, expire, headers);
	else
		return new Promise((resolve, reject) => self._save(id, name, filename, (err, res) => err ? reject(err) : resolve(res), custom, expire, headers));
};

FP._save = function(id, name, filename, callback, custom, expire, headers) {

	var self = this;

	if (self.pause) {
		setTimeout(self.retrysave, 500, id, name, filename, callback, custom, expire, headers);
		return self;
	}

	var directory = self.makedirectory(id);
	var filenameto = Path.join(directory, id + '.file');

	var index = name.lastIndexOf('/');
	if (index !== -1)
		name = name.substring(index + 1);

	if (self.cache[directory]) {
		if (typeof(filename) === 'string' && filename[0] === 'h' && filename[1] === 't' && filename[7] === '/') {
			// URL address
			var opt = {};
			opt.url = filename;
			opt.custom = true;
			opt.headers = headers;
			opt.callback = function(err, response) {

				if (err) {
					callback(err);
					return;
				}

				if (response.status < 400)
					self.saveforce(id, name, response.stream, filenameto, callback, custom, expire);
				else
					callback(U.httpstatus(response.status));
			};
			REQUEST(opt);
		} else
			self.saveforce(id, name, filename, filenameto, callback, custom, expire);
	} else {
		Fs.mkdir(directory, MKDIR, function(err) {
			if (err)
				callback(err);
			else {
				self.cache[directory] = 1;
				if (typeof(filename) === 'string' && filename[0] === 'h' && filename[1] === 't' && filename[7] === '/') {
					// URL address
					var opt = {};
					opt.url = filename;
					opt.custom = true;
					opt.headers = headers;
					opt.callback = function(err, response) {

						if (err) {
							callback(err);
							return;
						}

						if (response.status < 400)
							self.saveforce(id, name, response.stream, filenameto, callback, custom, expire);
						else
							callback(U.httpstatus(response.status));
					};
					REQUEST(opt);
				} else
					self.saveforce(id, name, filename, filenameto, callback, custom, expire);
			}
		});
	}

	return self;
};

FP.saveforce = function(id, name, filename, filenameto, callback, custom, expire) {

	if (!callback)
		callback = NOOP;

	F.stats.performance.open++;

	var isbuffer = filename instanceof Buffer;
	var self = this;
	var header = Buffer.alloc(HEADERSIZE, ' ');
	var reader = isbuffer ? null : filename instanceof Readable ? filename : Fs.createReadStream(filename);
	var writer = Fs.createWriteStream(filenameto);
	var ext = framework_utils.getExtension(name);
	var meta = { name: name, size: 0, ext: ext, custom: custom, type: U.getContentType(ext) };
	var tmp;

	writer.write(header, 'binary');

	if (IMAGES[meta.ext]) {
		if (isbuffer) {
			switch (meta.ext) {
				case 'gif':
					tmp = framework_image.measureGIF(filename);
					break;
				case 'png':
					tmp = framework_image.measurePNG(filename);
					break;
				case 'jpg':
				case 'jpeg':
					tmp = framework_image.measureJPG(filename);
					break;
				case 'svg':
					tmp = framework_image.measureSVG(filename);
					break;
			}
		} else {
			reader.once('data', function(buffer) {
				switch (meta.ext) {
					case 'gif':
						tmp = framework_image.measureGIF(buffer);
						break;
					case 'png':
						tmp = framework_image.measurePNG(buffer);
						break;
					case 'jpg':
					case 'jpeg':
						tmp = framework_image.measureJPG(buffer);
						break;
					case 'svg':
						tmp = framework_image.measureSVG(buffer);
						break;
				}
			});
		}
	}

	if (isbuffer) {
		writer.end(filename);
	} else {
		reader.pipe(writer);
		if (typeof(filename) !== 'string')
			reader.resume();
	}

	CLEANUP(writer, function() {

		Fs.open(filenameto, 'r+', function(err, fd) {

			if (err) {
				// Unhandled error
				callback(err);
				return;
			}

			if (tmp) {
				meta.width = tmp.width;
				meta.height = tmp.height;
			}

			meta.size = writer.bytesWritten - HEADERSIZE;
			meta.date = NOW = new Date();

			if (expire)
				meta.expire = NOW.add(expire);

			self.total++;
			self.size += meta.size;

			if (meta.name.length > 250)
				meta.name = meta.name.substring(0, 250);

			header.write(JSON.stringify(meta));

			// Update header
			Fs.write(fd, header, 0, header.length, 0, function(err) {
				if (err) {
					callback(err);
					Fs.close(fd, NOOP);
				} else {
					meta.id = id;
					Fs.appendFile(self.logger, JSON.stringify(meta) + '\n', NOOP);
					Fs.close(fd, () => callback(null, meta));
				}
			});
		});
	});
};

FP.read = function(id, callback, nostream) {
	var self = this;
	if (callback)
		return self._read(id, callback, nostream);
	else
		return new Promise((resolve, reject) => self._read(id, (err, res) => err ? reject(err) : resolve(res), nostream));
};

FP._read = function(id, callback, nostream) {

	var self = this;

	if (self.pause) {
		setTimeout(self.retryread, 500, id, callback, nostream);
		return self;
	}

	var filename = Path.join(self.makedirectory(id), id + '.file');
	F.stats.performance.open++;
	Fs.open(filename, 'r', function(err, fd) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = Buffer.alloc(HEADERSIZE);
		Fs.read(fd, buffer, 0, HEADERSIZE, 0, function(err) {

			if (err) {
				Fs.close(fd, NOOP);
				callback(err);
				return;
			}

			var str = buffer.toString('utf8').replace(REGCLEAN, '');
			if (!str) {
				// Invalid file
				Fs.close(fd, function() {
					if (buffer.length === HEADERSIZE)
						Fs.unlink(filename, NOOP);
				});
				callback('File not found');
				return;
			}

			var meta = str.parseJSON(true);
			if (!meta) {
				Fs.close(fd, NOOP);
				callback('Invalid file');
				return;
			}

			meta.id = id;

			if (meta.expire && meta.expire < NOW) {
				Fs.close(fd, NOOP);
				callback('File is expired');
				return;
			}

			if (!nostream) {
				F.stats.performance.open++;
				meta.stream = Fs.createReadStream(filename, { fd: fd, start: HEADERSIZE });
				CLEANUP(meta.stream, () => Fs.close(fd, NOOP));
			} else
				Fs.close(fd, NOOP);

			callback(err, meta);
		});
	});

	return self;
};

FP.readbuffer = function(id, callback) {
	var self = this;
	if (callback)
		return self._readbuffer(id, callback);
	else
		return new Promise((resolve, reject) => self._readbuffer(id, (err, res) => err ? reject(err) : resolve(res)));
};

FP._readbuffer = function(id, callback) {

	var self = this;

	if (self.pause) {
		setTimeout(self._readbuffer, 500, id, callback);
		return self;
	}

	var filename = Path.join(self.makedirectory(id), id + '.file');
	F.stats.performance.open++;
	Fs.open(filename, 'r', function(err, fd) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = Buffer.alloc(HEADERSIZE);
		Fs.read(fd, buffer, 0, HEADERSIZE, 0, function(err) {

			if (err) {
				Fs.close(fd, NOOP);
				callback(err);
				return;
			}

			var meta = buffer.toString('utf8').replace(REGCLEAN, '').parseJSON(true);
			meta.id = id;

			if (meta.expire && meta.expire < NOW) {
				Fs.close(fd, NOOP);
				callback('File is expired');
				return;
			}

			buffer = [];
			F.stats.performance.open++;

			var stream = Fs.createReadStream(filename, { fd: fd, start: HEADERSIZE });
			stream.on('data', chunk => buffer.push(chunk));

			CLEANUP(stream, function() {
				Fs.close(fd, NOOP);
				callback(err, Buffer.concat(buffer), meta);
			});
		});
	});

	return self;
};

FP.browse = function(callback) {
	var db = NOSQL('~' + this.logger).find();
	if (callback)
		db.$callback = callback;
	return db;
};

FP.move = function(id, newid, callback) {
	var self = this;
	if (callback)
		return self._move(id, newid, callback);
	else
		return new Promise((resolve, reject) => self._move(id, newid, (err, res) => err ? reject(err) : resolve(res)));
};

FP._move = function(id, newid, callback) {

	var self = this;
	var filename = Path.join(self.makedirectory(id), id + '.file');

	F.stats.performance.open++;

	Fs.lstat(filename, function(err) {

		if (err) {
			callback(err);
			return;
		}

		var directory = self.makedirectory(newid);
		var filenamenew = Path.join(directory, newid + '.file');

		if (self.cache[directory]) {
			Fs.rename(filename, filenamenew, err => callback && callback(err));
		} else {
			Fs.mkdir(directory, MKDIR, function(err) {

				if (err) {
					callback(err);
					return;
				}

				self.cache[directory] = 1;
				Fs.rename(filename, filenamenew, err => callback && callback(err));
			});
		}

	});

	return self;
};

FP.rename = function(id, newname, callback) {
	var self = this;
	if (callback)
		return self._rename(id, newname, callback);
	else
		return new Promise((resolve, reject) => self._rename(id, newname, (err, res) => err ? reject(err) : resolve(res)));
};

FP._rename = function(id, newname, callback) {

	var self = this;
	var filename = Path.join(self.makedirectory(id), id + '.file');
	F.stats.performance.open++;

	Fs.open(filename, 0o666, function(err, fd) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = Buffer.alloc(HEADERSIZE);
		Fs.read(fd, buffer, 0, HEADERSIZE, 0, function(err) {

			if (err) {
				Fs.close(fd, NOOP);
				callback(err);
				return;
			}

			var meta = buffer.toString('utf8').replace(REGCLEAN, '').parseJSON(true);
			meta.name = newname;

			if (meta.name.length > 250)
				meta.name = meta.name.substring(0, 250);

			buffer = Buffer.alloc(HEADERSIZE, ' ');
			buffer.write(JSON.stringify(meta));

			// Update header
			Fs.write(fd, buffer, 0, buffer.length, 0, function(err) {
				if (err) {
					callback(err);
					Fs.close(fd, NOOP);
				} else {
					meta.id = id;
					NOSQL('~' + self.logger).modify(meta).id(id);
					// Fs.appendFile(self.logger, JSON.stringify(meta) + '\n', NOOP);
					Fs.close(fd, () => callback(null, meta));
				}
			});
		});
	});

	return self;
};

FP.remove = function(id, callback) {
	var self = this;
	if (callback)
		return self._remove(id, callback);
	else
		return new Promise((resolve, reject) => self._remove(id, (err, res) => err ? reject(err) : resolve(res)));
};

FP._remove = function(id, callback) {
	var self = this;
	var filename = Path.join(self.makedirectory(id), id + '.file');
	Fs.unlink(filename, function(err) {
		NOSQL('~' + self.logger).remove().id(id);
		// Fs.appendFile(self.logger, JSON.stringify({ id: id, removed: true, date: NOW = new Date() }) + '\n', NOOP);
		callback && callback(err);
	});
	return self;
};

FP.clean = function(callback) {
	var self = this;
	if (callback)
		return self._clean(callback);
	else
		return new Promise((resolve, reject) => self._clean((err, res) => err ? reject(err) : resolve(res)));
};

FP._clean = function(callback) {

	var self = this;
	var db = NOSQL('~' + self.logger);

	db.find().where('expire', '<', NOW).callback(function(err, files) {

		if (err || !files || !files.length) {
			callback && callback(err, 0);
			return;
		}

		var id = [];
		for (var i = 0; i < files.length; i++)
			id.push(files[i].id);

		db.remove().in('id', id);

		files.wait(function(item, next) {
			var filename = Path.join(self.makedirectory(item.id), item.id + '.file');
			Fs.unlink(filename, next);
		}, function() {
			FP.count();
			db.clean();
			callback && callback(err, files.length);
		});
	});

	return self;
};

FP.backup = function(filename, callback) {
	var self = this;
	if (callback)
		return self._backup(filename, callback);
	else
		return new Promise((resolve, reject) => self._backup(filename, (err, res) => err ? reject(err) : resolve(res)));
};

FP._backup = function(filename, callback) {

	var self = this;
	var writer = typeof(filename) === 'string' ? Fs.createWriteStream(filename) : filename;
	var totalsize = 0;
	var counter = 0;
	var padding = 50;

	writer.on('finish', function() {
		callback && callback(null, { filename: filename, files: counter, size: totalsize });
	});

	Fs.readdir(self.directory, function(err, response) {

		if (err) {
			callback(err);
			return;
		}

		for (var dir of response) {
			if (dir.length === 4) {
				var tmp = Buffer.from(('/' + dir + '/').padRight(padding) + ': #\n', ENCODING);
				writer.write(tmp);
				totalsize += tmp.length;
			}
		}

		response.wait(function(item, next) {

			if (item.length !== 4) {
				next();
				return;
			}

			var dir = Path.join(self.directory, item);
			Fs.readdir(dir, function(err, response) {
				response.wait(function(name, next) {

					var filename = Path.join(dir, name);
					var data = Buffer.alloc(0);
					var tmp = Buffer.from(('/' + Path.join(item, name)).padRight(padding) + ': ');

					totalsize += tmp.length;
					writer.write(tmp);

					Fs.createReadStream(filename).pipe(F.Zlib.createGzip(GZIPFILE)).on('data', function(chunk) {

						CONCAT[0] = data;
						CONCAT[1] = chunk;
						data = Buffer.concat(CONCAT);

						var remaining = data.length % 3;
						if (remaining) {
							var tmp = data.slice(0, data.length - remaining).toString('base64');
							writer.write(tmp, ENCODING);
							data = data.slice(data.length - remaining);
							totalsize += tmp.length;
						}

					}).on('end', function() {
						var tmp = data.length ? data.toString('base64') : '';
						data.length && writer.write(tmp);
						writer.write('\n', ENCODING);
						totalsize += tmp.length + 1;
						counter++;
						setImmediate(next);
					}).on('error', function() {
						setImmediate(next);
					});

				}, next);
			});

		}, () => writer.end());
	});
};

FP.restore = function(filename, callback) {
	var self = this;
	if (callback)
		return self._restore(filename, callback);
	else
		return new Promise((resolve, reject) => self._restore(filename, (err, res) => err ? reject(err) : resolve(res)));
};

FP._restore = function(filename, callback) {
	var self = this;
	self.pause = true;
	self.clear(function() {
		self.pause = true;
		RESTORE(filename, self.directory, function(err, meta) {
			self.cache = {};
			self.pause = false;
			callback && callback(err, meta);
		});
	});
};

FP.drop = FP.clear = function(callback) {
	var self = this;
	if (callback)
		return self._clear(callback);
	else
		return new Promise((resolve, reject) => self._clear((err, res) => err ? reject(err) : resolve(res)));
};

FP._clear = function(callback) {

	var self = this;
	var count = 0;

	self.pause = true;

	Fs.readdir(self.directory, function(err, response) {

		if (err) {
			callback(err);
			return;
		}

		Fs.unlink(self.logger, NOOP);
		response.wait(function(item, next) {
			var dir = Path.join(self.directory, item);
			Fs.readdir(dir, function(err, response) {
				if (response instanceof Array) {
					count += response.length;
					response.wait((file, next) => Fs.unlink(Path.join(self.directory, item, file), next), () => Fs.rmdir(dir, next));
				} else
					next();
			});
		}, function() {
			Fs.unlink(self.logger, NOOP);
			self.pause = false;
			self.cache = {};
			callback && callback(null, count);
		});

	});

	return self;
};

FP.stream = function(onfile, callback, workers) {

	var self = this;

	Fs.readdir(self.directory, function(err, response) {

		if (err) {
			callback();
			return;
		}

		var count = 0;

		response.wait(function(item, next) {

			if (item.length !== 4) {
				next();
				return;
			}

			Fs.readdir(Path.join(self.directory, item), function(err, files) {
				if (files instanceof Array) {
					files.wait(function(item, next) {
						var id = item.substring(0, item.lastIndexOf('.'));
						self.read(id, function(err, meta) {
							if (meta) {
								meta.id = id;
								meta.index = count++;
								onfile(meta, next);
							} else
								next();
						}, true);
					}, next, workers);
				} else
					next();
			});
		}, callback);
	});

	return self;
};

FP.browse2 = function(callback) {
	var self = this;
	if (callback)
		return self._browse2(callback);
	else
		return new Promise((resolve, reject) => self._browse2((err, res) => err ? reject(err) : resolve(res)));
};

FP._browse2 = function(callback) {
	var self = this;
	var files = [];
	self.stream(function(item, next) {
		files.push(item);
		next();
	}, () => callback(null, files), 5);
	return self;
};

FP.rebuild = function(callback) {
	var self = this;
	if (callback)
		return self._rebuild(callback);
	else
		return new Promise((resolve, reject) => self._rebuild((err, res) => err ? reject(err) : resolve(res)));
};

FP._rebuild = function(callback) {

	var self = this;

	self.browse2(function(err, files) {

		self.pause = true;

		Fs.unlink(self.logger, NOOP);

		var builder = [];
		self.size = 0;
		self.total = 0;

		for (var i = 0; i < files.length; i++) {
			var item = files[i];
			self.size += item.size;
			self.total++;
			builder.push(JSON.stringify(item));
		}

		builder.limit(500, (items, next) => Fs.appendFile(self.logger, items.join('\n'), next), function() {
			Fs.appendFile(self.logger, '\n', NOOP);
			self.pause = false;
			callback && callback();
		});
	});

	return self;
};

FP.count2 = function(callback) {
	var self = this;
	if (callback)
		return self._count2(callback);
	else
		return new Promise((resolve, reject) => self._count2((err, res) => err ? reject(err) : resolve(res)));
};

FP._count2 = function(callback) {
	var self = this;
	var count = 0;
	Fs.readdir(self.directory, function(err, response) {
		response.wait(function(item, next) {
			Fs.readdir(Path.join(self.directory, item), function(err, response) {
				if (response instanceof Array)
					count += response.length;
				next();
			});
		}, () => callback(null, count));
	});
	return self;
};

function jsonparser(key, value) {
	return typeof(value) === 'string' && value.isJSONDate() ? new Date(value) : value;
}

FP.readmeta = function(id, callback, keepfd) {
	var self = this;
	if (callback)
		return self._readmeta(id, callback, keepfd);
	else
		return new Promise((resolve, reject) => self._readmeta(id, (err, res) => err ? reject(err) : resolve(res), keepfd));
};

FP._readmeta = function(id, callback, keepfd) {

	var self = this;
	var filename = Path.join(self.makedirectory(id), id + self.ext);

	F.stats.performance.open++;

	Fs.open(filename, function(err, fd) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = Buffer.alloc(HEADERSIZE);

		Fs.read(fd, buffer, 0, buffer.length, 0, function(err, bytes, buffer) {

			if (err) {
				Fs.close(fd, NOOP);
				callback(err);
				return;
			}

			var json = buffer.toString('utf8').replace(REGCLEAN, '');

			try {
				json = JSON.parse(json, jsonparser);
			} catch (e) {
				Fs.close(fd, NOOP);
				callback(e, null, filename);
				return;
			}

			if (!keepfd)
				Fs.close(fd, NOOP);

			callback(null, json, filename, fd);
		});

	});

	return self;
};

FP.image = function(id, callback) {
	var self = this;
	if (callback)
		return self._image(id, callback);
	else
		return new Promise((resolve, reject) => self._image(id, (err, res) => err ? reject(err) : resolve(res)));
};

FP._image = function(id, callback) {
	var self = this;
	self.readmeta(id, function(err, obj, filename, fd) {

		if (err) {
			callback(err);
			return;
		}

		var stream = Fs.createReadStream(filename, { fd: fd, start: HEADERSIZE });
		var image = Image.load(stream);
		stream.$totalfd = fd;
		callback(err, image, obj);
		CLEANUP(stream);
	}, true);

	return self;
};

FP.res = function(res, options, checkcustom) {

	var self = this;
	var req = res.req;

	if (RELEASE && req.$key && F.temporary.notfound[req.$key] !== undefined) {
		res.throw404();
		return res;
	}

	var id = options.id || '';

	self.readmeta(id, function(err, obj, filename, fd) {

		if (err || (obj.expire && obj.expire < NOW) || (checkcustom && checkcustom(obj) == false)) {
			if (RELEASE)
				F.temporary.notfound[F.createTemporaryKey(req)] = true;
			fd && Fs.close(fd, NOOP);
			res.throw404();
			return;
		}

		F.stats.performance.open++;

		var utc = obj.date ? obj.date.toUTCString() : '';

		if (!options.download && req.headers['if-modified-since'] === utc) {
			Fs.close(fd, NOOP);
			res.extension = obj.ext || framework_utils.getExtension(obj.name);
			F.$file_notmodified(res, utc);
		} else {

			if (RELEASE && req.$key && F.temporary.path[req.$key]) {
				Fs.close(fd, NOOP);
				res.$file();
				return res;
			}

			F.stats.performance.open++;
			res.options.type = obj.type;
			res.options.lastmodified = true;

			!options.headers && (options.headers = {});

			if (options.download) {
				res.options.download = options.download === true ? obj.name : typeof(options.download) === 'function' ? options.download(obj.name, obj.type) : options.download;
			} else
				options.headers['Last-Modified'] = utc;

			if (obj.width && obj.height) {
				options.headers['X-Width'] = obj.width;
				options.headers['X-Height'] = obj.height;
			}

			options.headers['X-Size'] = obj.size;
			res.options.headers = options.headers;
			res.options.done = options.done;

			Fs.close(fd, NOOP);

			if (options.image) {
				res.options.stream = { filename: filename, start: HEADERSIZE, custom: true };
				res.options.make = options.make;
				res.options.cache = options.cache !== false;
				res.options.persistent = false;
				res.$image();
			} else {

				var range = req.headers.range;
				if (range) {

					var arr = range.replace(REG_RANGE, '').split('-');
					var beg = (arr[0] ? +arr[0] : 0);
					var end = (arr[1] ? +arr[1] : 0);

					if (isNaN(beg) || isNaN(end)) {
						res.throw404();
						return;
					}

					if (end <= 0)
						end = beg + ((1024 * 1024) * 5); // 5 MB

					if (beg > end) {
						beg = 0;
						end = obj.size - 1;
					}

					if (end > obj.size)
						end = obj.size - 1;

					if (beg >= end || beg < 0) {
						res.throw404();
						return;
					}

					var length = (end - beg) + 1;
					res.options.code = 206;
					res.options.headers = {};
					res.options.headers['Cache-Control'] = DEBUG ? 'private, no-cache, no-store, max-age=0' : 'public, max-age=11111111';
					res.options.headers['Accept-Ranges'] = 'bytes';
					res.options.headers['Content-Length'] = length;
					res.options.headers['Content-Range'] = 'bytes ' + beg + '-' + end + '/' + obj.size;
					res.options.stream = Fs.createReadStream(filename, { flags: 'r', mode: '0666', autoClose: true, start: HEADERSIZE + beg, end: end + HEADERSIZE });

				} else
					res.options.stream = Fs.createReadStream(filename, { start: HEADERSIZE });

				res.options.compress = options.nocompress ? false : true;
				res.$stream();
			}
		}

	}, true);
};

FP.readbase64 = function(id, callback) {
	var self = this;
	if (callback)
		return self._readbase64(id, callback);
	else
		return new Promise((resolve, reject) => self._readbase64(id, (err, res) => err ? reject(err) : resolve(res)));
};

FP._readbase64 = function(id, callback) {

	var self = this;

	self.readmeta(id, function(err, meta, filename, fd) {

		if (err) {
			callback(err);
			return;
		}

		F.stats.performance.open++;
		meta.stream = Fs.createReadStream(filename, { fd: fd, start: HEADERSIZE, encoding: 'base64' });
		callback(null, meta);
		framework_internal.onFinished(meta.stream, () => Fs.close(fd, NOOP));

	}, true);

	return self;
};

exports.FileDB = function(name, directory) {
	return new FileDB(name, directory);
};
