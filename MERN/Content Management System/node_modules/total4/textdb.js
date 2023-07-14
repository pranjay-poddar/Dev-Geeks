'use strict';

const Fs = require('fs');
const TextStreamReader = require('./textdb-stream');
const QueryBuilder = require('./textdb-builder').QueryBuilder;
const TextReader = require('./textdb-reader');
const DELIMITER = '|';

const JSONBOOL = '":true ';
const NEWLINE = '\n';
const REGBOOL = /":true/g; // for updates of boolean types
const REGDATE = /"\d{4}-\d{2}-\d{2}T[0-9.:]+Z"/g;
const REGTESCAPE = /\||\n|\r/g;
const REGTUNESCAPE = /%7C|%0D|%0A/g;
const REGTESCAPETEST = /\||\n|\r/;
const BOOLEAN = { '1': 1, 'true': 1, on: 1 };
const TABLERECORD = { '+': 1, '-': 1, '*': 1 };
const MAXREADERS = 3;
const JSONBUFFER = 40;

// For performing of cleaning
var INSTANCES = [];

// Temporary
var CACHEITEMS = {};

function TableDB(filename, schema, onetime) {
	var t = this;
	t.duration = [];
	t.filename = filename;
	t.filenamelog = filename + '.log';
	t.filenamebackup = filename + '.bk';

	if (!onetime) {
		t.id = HASH(t.filename, true) + '';
		CACHEITEMS[t.id] = [];
	}

	t.pending_drops = false;
	t.pending_count = 0;
	t.pending_reader = [];
	t.pending_reader2 = [];
	t.pending_update = [];
	t.pending_append = [];
	t.pending_remove = [];
	t.pending_streamer = [];
	t.pending_clean = [];
	t.pending_clear = [];
	t.pending_locks = [];

	t.step = 0;
	t.ready = false;
	t.$writing = false;
	t.$reading = 0;
	t.$allocations = true;
	t.total = 0;

	t.next2 = () => t.next(0);

	Fs.createReadStream(t.filename, { end: 2048 }).once('data', function(chunk) {
		t.parseSchema(t, chunk.toString('utf8').split('\n', 1)[0].split(DELIMITER));
		t.$header = Buffer.byteLength(t.stringifySchema(t)) + 1;
		if (schema) {
			t.alter(schema);
		} else {
			t.ready = true;
			t.next(0);
		}
	}).on('error', function() {
		schema && t.alter(schema);
	});
}

function JsonDB(filename, onetime) {

	var t = this;

	t.filename = filename;
	t.filenamelog = filename + '.log';
	t.filenamebackup = filename + '.bk';

	if (!onetime) {
		t.id = HASH(t.filename, true) + '';
		CACHEITEMS[t.id] = [];
	}

	t.duration = [];
	t.pending_count = 0;
	t.pending_update = [];
	t.pending_append = [];
	t.pending_reader = [];
	t.pending_remove = [];
	t.pending_reader2 = [];
	t.pending_streamer = [];
	t.pending_clean = [];
	t.pending_clear = [];
	t.pending_locks = [];
	t.step = 0;
	t.pending_drops = false;
	t.$timeoutmeta;
	t.$writing = false;
	t.$reading = 0;
	t.total = 0;
	t.inmemory = false;
	t.next2 = () => t.next(0);
}

const TD = TableDB.prototype;
const JD = JsonDB.prototype;

TD.memory = JD.memory = function(count, size) {
	var self = this;
	count && (self.buffercount = count + 1);      // def: 15 - count of stored documents in memory while reading/writing
	size && (self.buffersize = size * 1024);      // def: 32 - size of buffer in kB
	return self;
};

function prepareschema(schema) {
	return schema.replace(/;|,/g, DELIMITER).trim();
}

TD.alter = function(schema, callback) {

	var self = this;

	if (self.ready) {
		self.alterlock(schema, callback);
		return self;
	}

	var parsed = {};

	if (self.$header) {
		self.parseSchema(parsed, prepareschema(schema).split(DELIMITER));
		if (self.stringifySchema(self) === self.stringifySchema(parsed))
			callback && callback();
		else
			self.extend(schema, callback);
	} else {
		self.parseSchema(self, prepareschema(schema).split(DELIMITER));
		var bschema = self.stringifySchema(self);
		self.$header = Buffer.byteLength(bschema) + 1;
		Fs.writeFileSync(self.filename, bschema + NEWLINE, 'utf8');
		callback && callback();
	}
	self.ready = true;
	self.next(0);
};

TD.alterlock = function(schema, callback) {
	var self = this;
	self.lock(function(unlock) {
		self.ready = false;
		self.alter(schema, function() {
			callback && callback();
			unlock();
		});
	});
};

function next_operation(self, type) {
	self.next(type);
}

JD.insert = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_append.push(builder);
	setImmediate(next_operation, self, 1);
	return builder;
};

JD.update = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_update.push(builder);
	setImmediate(next_operation, self, 2);
	return builder;
};

TD.restore = JD.restore = function(filename, callback) {
	var self = this;

	U.wait(() => !self.type, function(err) {

		if (err)
			throw new Error('Database can\'t be restored because it\'s busy.');

		self.type = 9;

		// Restore
		RESTORE(filename, self.directory, function(err, response) {
			self.type = 0;
			callback && callback(err, response);
		});

	});
	return self;
};

TD.backup = JD.backup = function(filename, callback) {

	var self = this;
	var list = [];
	var pending = [];

	pending.push(function(next) {
		PATH.exists(self.filename, function(e) {
			e && list.push(self.filename);
			next();
		});
	});

	pending.push(function(next) {
		PATH.exists(self.filenamelog, function(e) {
			e && list.push(self.filenamelog);
			next();
		});
	});

	pending.push(function(next) {
		PATH.exists(self.filenamebackup, function(e) {
			e && list.push(self.filenamebackup);
			next();
		});
	});

	pending.async(function() {
		if (list.length) {
			// Total.js Backup
			BACKUP(filename, list, callback);
		} else
			callback('No files for backing up.');
	});

	return self;
};

TD.backups = JD.backups = function(callback) {

	var self = this;
	var isTable = self instanceof TableDB;

	if (!builder)
		builder = new QueryBuilder(self);

	if (isTable && !self.ready) {
		setTimeout((self, callback) => self.backups(callback), 500, self, callback);
		return builder;
	}

	var instance = new JsonDB(self.filename + '.bk', true);
	var builder = instance.find2();
	callback && builder.callback(callback);
	return builder;
};

TD.release = JD.release = function() {

	var self = this;

	for (var key in F.databases) {
		if (F.databases[key] === self)
			delete F.databases[key];
	}

	delete CACHEITEMS[self.id];
	return self;
};

TD.drop = JD.drop = function(callback) {
	var self = this;
	self.pending_drops = true;
	setImmediate(next_operation, self, 7);
	callback && callback({ success: true });
	return self;
};

TD.clear = JD.clear = function(callback) {
	var self = this;
	self.pending_clear.push(callback || NOOP);
	setImmediate(next_operation, self, 12);
	return self;
};

TD.clean = JD.clean = function(callback) {
	var self = this;
	self.pending_clean.push(callback || NOOP);
	setImmediate(next_operation, self, 13);
	return self;
};

TD.lock = JD.lock = function(callback) {
	var self = this;
	self.pending_locks.push(callback || NOOP);
	setImmediate(next_operation, self, 14);
	return self;
};

JD.remove = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_remove.push(builder);
	setImmediate(next_operation, self, 3);
	return builder;
};

JD.find = function(builder) {
	var self = this;
	if (builder instanceof QueryBuilder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader.push(builder);
	setImmediate(next_operation, self, 4);
	return builder;
};

JD.find2 = function(builder) {
	var self = this;
	if (builder instanceof QueryBuilder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader2.push(builder);
	setImmediate(next_operation, self, 11);
	return builder;
};

JD.stream = function(fn, arg, callback) {
	var self = this;

	if (typeof(arg) === 'function') {
		callback = arg;
		arg = null;
	}

	self.pending_streamer.push({ fn: fn, callback: callback, arg: arg || {} });
	setImmediate(next_operation, self, 10);
	return self;
};

JD.recount = TD.recount = function() {
	var self = this;
	self.pending_count++;
	setImmediate(next_operation, self, 5);
};

//  1 append
//  2 update
//  3 remove
//  4 reader
//  5 counting
//  7 drop
//  8 backup
//  9 restore
// 10 streamer
// 11 reader reverse
// 12 clear
// 13 clean
// 14 locks

const NEXTWAIT = { 7: true, 8: true, 9: true, 12: true, 13: true, 14: true };

JD.next = function(type) {

	if (type && NEXTWAIT[this.step])
		return;

	if (!this.$writing && !this.$reading) {

		if (this.step !== 12 && this.pending_clear.length) {
			this.$clear();
			return;
		}

		if (this.step !== 13 && this.pending_clean.length) {
			this.$clean();
			return;
		}

		if (this.step !== 7 && this.pending_drops) {
			this.$drop();
			return;
		}

		if (this.step !== 14 && this.pending_locks.length) {
			this.$lock();
			return;
		}

		if (this.step !== 5 && this.pending_count) {
			this.$count();
			return;
		}
	}

	if (!this.$writing) {

		if (this.step !== 1 && this.pending_append.length) {
			this.$append();
			return;
		}

		if (this.step !== 2 && !this.$writing && this.pending_update.length) {
			this.$update();
			return;
		}

		if (this.step !== 3 && !this.$writing && this.pending_remove.length) {
			this.$remove();
			return;
		}

	}

	if (this.$reading < MAXREADERS) {

		// if (this.step !== 4 && this.pending_reader.length) {
		if (this.pending_reader.length) {
			this.$reader();
			return;
		}

		// if (this.step !== 11 && this.pending_reader2.length) {
		if (this.pending_reader2.length) {
			this.$reader2();
			return;
		}

		// if (this.step !== 10 && this.pending_streamer.length) {
		if (this.pending_streamer.length) {
			this.$streamer();
			return;
		}
	}

	if (this.step !== type) {
		this.step = 0;
		setImmediate(next_operation, this, 0);
	}
};

// ======================================================================
// FILE OPERATIONS
// ======================================================================

JD.$append = function() {
	var self = this;
	self.step = 1;

	if (!self.pending_append.length) {
		self.next(0);
		return;
	}

	self.$writing = true;

	self.pending_append.splice(0).limit(JSONBUFFER, function(items, next) {

		var json = '';
		var now = Date.now();

		for (var i = 0; i < items.length; i++) {
			var builder = items[i];
			json += JSON.stringify(builder.payload) + NEWLINE;
			if (self.id && self.inmemory && CACHEITEMS[self.id].length)
				CACHEITEMS[self.id].push(builder.payload);
			self.oninsert && self.oninsert(builder.payload);
		}

		Fs.appendFile(self.filename, json, function(err) {

			err && F.error(err, 'NoSQL insert: ' + self.filename);

			var diff = Date.now() - now;

			if (self.duration.push({ type: 'insert', duration: diff }) > 20)
				self.duration.shift();

			for (var i = 0; i < items.length; i++) {
				var builder = items[i];
				builder.duration = diff;
				builder.response = builder.counter = builder.count = 1;
				builder.logrule && builder.logrule();
				builder.done();
			}

			self.total += items.length;
			next();
		});

	}, () => setImmediate(next_append, self));
};

function next_append(self) {
	self.$writing = false;
	self.next(0);
}

JD.$update = function() {

	var self = this;
	self.step = 2;

	if (!self.pending_update.length) {
		self.next(0);
		return self;
	}

	self.$writing = true;

	var filter = self.pending_update.splice(0);
	var filters = TextReader.make();
	var fs = new TextStreamReader(self.filename);
	var change = false;

	filters.type = 'update';
	filters.db = self;

	for (var i = 0; i < filter.length; i++)
		filters.add(filter[i], true);

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var update = function(docs, doc, dindex, f) {
		try {
			f.modifyrule(docs[dindex], f.modifyarg);
			f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
		} catch (e) {
			f.canceled = true;
			f.error = e + '';
		}
	};

	var updateflush = function(docs, doc, dindex) {

		doc = docs[dindex];

		var rec = fs.docsbuffer[dindex];
		var upd = JSON.stringify(doc).replace(REGBOOL, JSONBOOL);

		if (upd === rec.doc)
			return;

		!change && (change = true);
		var was = true;

		if (rec.doc.length === upd.length) {
			var b = Buffer.byteLength(upd);
			if (rec.length === b) {
				fs.write(upd + NEWLINE, rec.position);
				was = false;
			}
		}

		if (was) {
			var tmp = fs.remchar + rec.doc.substring(1) + NEWLINE;
			fs.write(tmp, rec.position);
			fs.write2(upd + NEWLINE);
		}

		self.onupdate && self.onupdate(doc);
	};

	fs.ondocuments = function() {
		try {
			var docs = (new Function('return [' + fs.docs.replace(REGDATE, 'new Date($&)') + ']'))();
			filters.compare2(docs, update, updateflush);
		} catch (e) {
			F.error('TextDB("' + self.filename + '").update()', e);
			return false;
		}
	};

	fs.$callback = function() {

		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];

		fs = null;
		self.$writing = false;
		self.next(0);

		for (var i = 0; i < filters.builders.length; i++) {
			var builder = filters.builders[i];
			builder.logrule && builder.logrule();
			builder.done();
		}

		if (filters.total > 0)
			filters.db.total = filters.total;

	};

	fs.openupdate();
	return self;
};

JD.$reader = function(items, reader) {

	var self = this;
	self.step = 4;

	if (!self.pending_reader.length) {
		self.next(0);
		return self;
	}

	var filters = TextReader.make(self.pending_reader.splice(0));

	filters.type = 'read';
	filters.db = self;
	filters.inmemory = false;

	if (self.id && self.inmemory && CACHEITEMS[self.id].length) {
		filters.inmemory = true;
		filters.compare(CACHEITEMS[self.id]);
		filters.done();
		self.next(0);
		return self;
	}

	var fs = new TextStreamReader(self.filename);

	self.$reading++;

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var memory = !filters.cancelable && self.inmemory ? [] : null;

	fs.ondocuments = function() {

		try {

			var docs = (new Function('return [' + fs.docs.replace(REGDATE, 'new Date($&)') + ']'))();

			if (memory) {
				for (var i = 0; i < docs.length; i++)
					memory.push(docs[i]);
			}

			return filters.compare(docs);

		} catch (e) {
			F.error('TextDB("' + self.filename + '").read()', e);
			return false;
		}
	};

	fs.$callback = function() {

		if (self.id && memory)
			CACHEITEMS[self.id] = memory;

		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();
		self.$reading--;
		filters.done();
		fs = null;
		self.next(0);
	};

	if (reader)
		fs.openstream(reader);
	else
		fs.openread();

	return self;
};

JD.$reader2 = function() {

	var self = this;
	self.step = 11;

	if (!self.pending_reader2.length) {
		self.next(0);
		return self;
	}

	var filters = TextReader.make(self.pending_reader2.splice(0));
	filters.type = 'readreverse';
	filters.db = self;
	filters.inmemory = false;

	if (self.id && self.inmemory && CACHEITEMS[self.id].length) {
		filters.inmemory = true;
		filters.comparereverse(CACHEITEMS[self.id]);
		filters.done();
		self.next(0);
		return self;
	}

	self.$reading++;

	var fs = new TextStreamReader(self.filename);

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = function() {
		try {
			var data = (new Function('return [' + fs.docs.replace(REGDATE, 'new Date($&)') + ']'))();
			data.reverse();
			return filters.compare(data);
		} catch (e) {
			F.error('TextDB("' + self.filename + '").read()', e);
			return false;
		}
	};

	fs.$callback = function() {
		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();
		filters.done();
		self.$reading--;
		fs = null;
		self.next(0);
	};

	fs.openreadreverse();
	return self;
};

JD.$streamer = function() {

	var self = this;
	self.step = 10;

	if (!self.pending_streamer.length) {
		self.next(0);
		return self;
	}

	self.$reading++;

	var filter = self.pending_streamer.splice(0);
	var length = filter.length;
	var count = 0;
	var fs = new TextStreamReader(self.filename);

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = function() {
		try {
			var docs = (new Function('return [' + fs.docs.replace(REGDATE, 'new Date($&)') + ']'))();
			for (var j = 0; j < docs.length; j++) {
				var json = docs[j];
				count++;
				for (var i = 0; i < length; i++)
					filter[i].fn(json, filter[i].arg, count);
			}
		} catch (e) {
			F.error('TextDB("' + self.filename + '").stream()', e);
			return false;
		}
	};

	fs.$callback = function() {
		for (var i = 0; i < length; i++)
			filter[i].callback && filter[i].callback(null, filter[i].arg, count);
		self.$reading--;
		self.next(0);
		fs = null;
	};

	fs.openread();
	return self;
};

JD.$remove = function() {

	var self = this;
	self.step = 3;

	if (!self.pending_remove.length) {
		self.next(0);
		return;
	}

	self.$writing = true;

	var fs = new TextStreamReader(self.filename);
	var filter = self.pending_remove.splice(0);
	var filters = TextReader.make(filter);
	var change = false;

	filters.type = 'remove';
	filters.db = self;

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var remove = function(docs, d, dindex, f) {
		filters.total--;
		f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
		self.onremove && self.onremove(fs.docsbuffer[dindex].doc);
		return 1;
	};

	var removeflush = function(docs, d, dindex) {
		var rec = fs.docsbuffer[dindex];
		!change && (change = true);
		fs.write(fs.remchar + rec.doc.substring(1) + NEWLINE, rec.position);
	};

	fs.ondocuments = function() {
		try {
			var docs = (new Function('return [' + fs.docs.replace(REGDATE, 'new Date($&)') + ']'))();
			filters.compare2(docs, remove, removeflush);
		} catch (e) {
			F.error('TextDB("' + self.filename + '").read()', e);
			return false;
		}
	};

	fs.$callback = function() {

		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];

		filters.done();
		fs = null;
		self.$writing = false;
		self.next(0);
	};

	fs.openupdate();
};

JD.$clear = function() {

	var self = this;
	self.step = 12;

	if (!self.pending_clear.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_clear.splice(0);
	Fs.unlink(self.filename, function() {
		self.total = 0;
		for (var i = 0; i < filter.length; i++)
			filter[i]();

		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];

		self.total = 0;
		self.filesize = 0;
		self.next(0);
	});
};

JD.$clean = function() {

	var self = this;
	self.step = 13;

	if (!self.pending_clean.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_clean.splice(0);
	var length = filter.length;

	var fs = new TextStreamReader(self.filename);
	var writer = Fs.createWriteStream(self.filename + '-tmp');

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.divider = NEWLINE;

	fs.ondocuments = function() {
		fs.docs && writer.write(fs.docs + NEWLINE);
	};

	fs.$callback = function() {
		writer.end();
	};

	writer.on('finish', function() {
		Fs.rename(self.filename + '-tmp', self.filename, function() {
			for (var i = 0; i < length; i++)
				filter[i]();
			self.next(0);
			fs = null;
		});
	});

	fs.openread();
};

JD.$lock = function() {

	var self = this;
	self.step = 14;

	if (!self.pending_locks.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_locks.splice(0);
	filter.wait(function(fn, next) {
		fn.call(self, next);
	}, () => self.next(0));
};

JD.$drop = TD.$drop = function() {
	var self = this;
	self.step = 7;

	if (!self.pending_drops) {
		self.next(0);
		return;
	}

	self.pending_drops = false;
	var remove = [self.filename, self.filenamebackup, self.filenamelog];
	remove.wait((filename, next) => Fs.unlink(filename, next), function() {
		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];
		self.total = 0;
		self.filesize = 0;
		self.next(0);
	}, 5);
};

TD.insert = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_append.push(builder);
	setImmediate(next_operation, self, 1);
	return builder;
};

TD.update = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_update.push(builder);
	setImmediate(next_operation, self, 2);
	return builder;
};

TD.remove = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_remove.push(builder);
	setImmediate(next_operation, self, 3);
	return builder;
};

TD.find = function(builder) {
	var self = this;
	if (builder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader.push(builder);
	setImmediate(next_operation, self, 4);
	return builder;
};

TD.find2 = function(builder) {
	var self = this;
	if (builder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader2.push(builder);
	setImmediate(next_operation, self, 11);
	return builder;
};

TD.stream = function(fn, arg, callback) {
	var self = this;
	if (typeof(arg) === 'function') {
		callback = arg;
		arg = null;
	}

	self.pending_streamer.push({ fn: fn, callback: callback, arg: arg || {} });
	setImmediate(next_operation, self, 10);
	return self;
};

TD.extend = function(schema, callback) {
	var self = this;
	self.lock(function(next) {

		var olds = self.$schema;
		var oldk = self.$keys;
		var oldl = self.$size;
		var oldh = Buffer.byteLength(self.stringifySchema(self) + NEWLINE);

		self.parseSchema(self, prepareschema(schema).split(DELIMITER));

		var meta = self.stringifySchema(self) + NEWLINE;
		var news = self.$schema;
		var newk = self.$keys;

		self.$schema = olds;
		self.$keys = oldk;

		var count = 0;
		var fs = new TextStreamReader(self.filename);
		var data = {};
		var tmp = self.filename + '-tmp';
		var writer = Fs.createWriteStream(tmp);

		if (self.buffersize)
			fs.buffersize = self.buffersize;

		if (self.buffercount)
			fs.buffercount = self.buffercount;

		writer.write(meta, 'utf8');
		writer.on('finish', function() {
			Fs.rename(tmp, self.filename, function() {
				next();
				callback && callback();
			});
		});

		data.keys = self.$keys;
		fs.start = oldh;
		fs.divider = '\n';

		var copy = [];

		for (var i = 0; i < newk.length; i++) {
			var key = newk[i];
			if (news[key].copy)
				copy.push(news[key]);
		}

		if (oldl)
			self.linesize = oldl;

		var size = self.$size;

		fs.ondocuments = function() {

			var lines = fs.docs.split(fs.divider);
			var items = [];

			self.$schema = olds;
			self.$keys = oldk;
			self.$size = oldl;

			for (var a = 0; a < lines.length; a++) {
				data.line = lines[a].split(DELIMITER);
				data.index = count++;

				var doc = self.parseData(data);

				if (copy.length) {
					for (var i = 0; i < copy.length; i++)
						doc[copy[i].name] = doc[copy[i].copy];
				}

				items.push(doc);
			}

			self.$schema = news;
			self.$keys = newk;

			self.$size = size;
			var buffer = '';
			for (var i = 0; i < items.length; i++)
				buffer += self.stringify(items[i], true) + NEWLINE;
			buffer && writer.write(buffer, 'utf8');
		};

		fs.$callback = function() {
			self.$schema = news;
			self.$keys = newk;
			self.$header = Buffer.byteLength(meta);
			writer.end();
			fs = null;
		};

		fs.openread();
	});

	return self;
};

TD.next = function(type) {

	if (!this.ready || (type && NEXTWAIT[this.step]))
		return;

	if (!this.$writing && !this.$reading) {

		if (this.step !== 12 && this.pending_clear.length) {
			this.$clear();
			return;
		}

		if (this.step !== 13 && this.pending_clean.length) {
			this.$clean();
			return;
		}

		if (this.step !== 7 && this.pending_drops) {
			this.$drop();
			return;
		}

		if (this.step !== 14 && this.pending_locks.length) {
			this.$lock();
			return;
		}

		if (this.step !== 5 && this.pending_count) {
			this.$count();
			return;
		}
	}

	if (!this.$writing) {

		if (this.step !== 1 && this.pending_append.length) {
			this.$append();
			return;
		}

		if (this.step !== 2 && !this.$writing && this.pending_update.length) {
			this.$update();
			return;
		}

		if (this.step !== 3 && !this.$writing && this.pending_remove.length) {
			this.$remove();
			return;
		}
	}

	if (this.$reading < MAXREADERS) {

		// if (this.step !== 4 && this.pending_reader.length) {
		if (this.pending_reader.length) {
			this.$reader();
			return;
		}

		// if (this.step !== 11 && this.pending_reader2.length) {
		if (this.pending_reader2.length) {
			this.$reader2();
			return;
		}

		// if (this.step !== 10 && this.pending_streamer.length) {
		if (this.pending_streamer.length) {
			this.$streamer();
			return;
		}
	}

	if (this.step !== type) {
		this.step = 0;
		setImmediate(next_operation, this, 0);
	}
};

TD.$append = function() {
	var self = this;
	self.step = 1;

	if (!self.pending_append.length) {
		self.next(0);
		return;
	}

	self.$writing = true;

	self.pending_append.splice(0).limit(JSONBUFFER, function(items, next) {

		var data = '';
		var now = Date.now();

		for (var i = 0; i < items.length; i++) {
			var builder = items[i];
			var serialized = self.stringify(builder.payload, true);
			data += serialized + NEWLINE;
			if (self.id && self.inmemory && CACHEITEMS[self.id].length)
				CACHEITEMS[self.id].push(self.parseData(serialized));
		}

		Fs.appendFile(self.filename, data, function(err) {
			err && F.error(err, 'Table insert: ' + self.filename);

			var diff = Date.now() - now;

			if (self.duration.push({ type: 'insert', duration: diff }) > 20)
				self.duration.shift();

			for (var i = 0; i < items.length; i++) {
				var builder = items[i];
				builder.duration = diff;
				builder.response = builder.counter = builder.count = 1;
				builder.logrule && builder.logrule();
				builder.done();
			}

			self.total += items.length;
			next();
		});

	}, () => setImmediate(next_append, self));
};

TD.$reader = function() {

	var self = this;
	self.step = 4;

	if (!self.pending_reader.length) {
		self.next(0);
		return self;
	}

	var filters = TextReader.make(self.pending_reader.splice(0));
	filters.type = 'read';
	filters.db = self;
	// filters.cancelable = false;
	filters.inmemory = false;

	if (self.id && self.inmemory && CACHEITEMS[self.id].length) {
		filters.inmemory = true;
		filters.compare(CACHEITEMS[self.id]);
		filters.done();
		self.next(0);
		return self;
	}

	self.$reading++;

	var fs = new TextStreamReader(self.filename);
	var data = {};
	var indexer = 0;

	fs.array = true;
	fs.start = self.$header;
	fs.linesize = self.$size;
	fs.divider = '\n';

	data.keys = self.$keys;

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var memory = !filters.cancelable && self.inmemory ? [] : null;

	fs.ondocuments = function() {

		var lines = fs.docs;
		var arr = [];

		for (var j = 0; j < lines.length; j++) {
			data.line = lines[j].split(DELIMITER);
			data.index = indexer++;
			var doc = self.parseData(data);
			memory && memory.push(doc);
			arr.push(doc);
		}

		return filters.compare(arr);
	};

	fs.$callback = function() {

		if (self.id && memory)
			CACHEITEMS[self.id] = memory;

		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();
		filters.done();
		fs = null;
		self.$reading--;
		self.next(0);
	};

	fs.openread();
	return self;
};

TD.$reader2 = function() {

	var self = this;

	self.step = 11;

	if (!self.pending_reader2.length) {
		self.next(0);
		return self;
	}

	var filters = TextReader.make(self.pending_reader2.splice(0));
	filters.type = 'readreverse';
	filters.db = self;
	filters.inmemory = false;

	if (self.id && self.inmemory && CACHEITEMS[self.id].length) {
		filters.inmemory = true;
		filters.comparereverse(CACHEITEMS[self.id]);
		filters.done();
		self.next(0);
		return self;
	}

	self.$reading++;

	var fs = new TextStreamReader(self.filename);
	var data = {};
	var indexer = 0;

	fs.array = true;
	fs.start = self.$header;
	fs.linesize = self.$size;
	fs.divider = '\n';
	data.keys = self.$keys;

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = function() {

		var lines = fs.docs;
		var arr = [];

		for (var j = 0; j < lines.length; j++) {
			data.line = lines[j].split(DELIMITER);
			if (TABLERECORD[data.line[0]]) {
				data.index = indexer++;
				arr.push(self.parseData(data));
			}
		}

		return filters.compare(arr);
	};

	fs.$callback = function() {
		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();
		filters.done();
		fs = null;
		self.$reading--;
		self.next(0);
	};

	fs.openreadreverse();
	return self;
};

JD.$count = TD.$count = function() {

	var self = this;
	self.step = 5;

	if (!self.pending_count) {
		self.next(0);
		return self;
	}

	self.pending_count = 0;
	self.$reading++;

	var fs = new TextStreamReader(self.filename);

	// Table
	if (self.$header) {
		fs.start = self.$header;
		fs.linesize = self.$size;
	}

	fs.divider = '\n';

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = NOOP;

	fs.$callback = function() {

		self.filesize = fs.stats.size;
		self.total = fs.indexer;
		CONF.textdb_inmemory && self.$check();

		fs = null;
		self.$reading--;
		self.next(0);
	};

	fs.openread();
	return self;
};

TD.$check = JD.$check = function() {
	var self = this;
	if (self.id) {
		if (!process.totaldbworker)
			self.clone = true;
		self.inmemory = CONF.textdb_inmemory > (self.filesize / 1024 / 1024); // to MB
		if (!self.inmemory)
			delete CACHEITEMS[self.id];
	}
};

TD.$update = function() {

	var self = this;
	self.step = 2;

	if (!self.pending_update.length) {
		self.next(0);
		return self;
	}

	self.$writing = true;

	var fs = new TextStreamReader(self.filename);
	var filter = self.pending_update.splice(0);
	var filters = TextReader.make();
	var change = false;
	var indexer = 0;
	var data = { keys: self.$keys };

	filters.type = 'update';
	filters.db = self;

	for (var i = 0; i < filter.length; i++)
		filters.add(filter[i], true);

	fs.array = true;
	fs.start = self.$header;
	fs.linesize = self.$size;
	fs.divider = '\n';

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var update = function(docs, doc, dindex, f) {
		f.modifyrule(docs[dindex], f.modifyarg);
		f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
	};

	var updateflush = function(docs, doc, dindex) {

		doc = docs[dindex];

		var rec = fs.docsbuffer[dindex];
		var upd = self.stringify(doc, null, rec.length);

		if (upd === rec.doc)
			return;

		!change && (change = true);

		var b = Buffer.byteLength(upd);
		if (rec.length === b) {
			fs.write(upd + NEWLINE, rec.position);
		} else {
			var tmp = fs.remchar + rec.doc.substring(1) + NEWLINE;
			fs.write(tmp, rec.position);
			fs.write2(upd + NEWLINE);
		}

		self.onupdate && self.onupdate(doc);
	};

	fs.ondocuments = function() {

		var lines = fs.docs;
		var arr = [];

		for (var a = 0; a < lines.length; a++) {
			data.line = lines[a].split(DELIMITER);
			data.length = lines[a].length;
			data.index = indexer++;
			arr.push(self.parseData(data, EMPTYOBJECT));
		}

		filters.compare2(arr, update, updateflush);
	};

	fs.$callback = function() {

		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];

		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();

		fs = null;
		self.$writing = false;
		self.next(0);

		for (var i = 0; i < filters.builders.length; i++) {
			var builder = filters.builders[i];
			builder.logrule && builder.logrule();
			builder.done();
		}

		if (filters.total > 0)
			filters.db.total = filters.total;
	};

	fs.openupdate();
	return self;
};

TD.$remove = function() {

	var self = this;
	self.step = 3;

	if (!self.pending_remove.length) {
		self.next(0);
		return;
	}

	self.$writing = true;

	var fs = new TextStreamReader(self.filename);
	var filter = self.pending_remove.splice(0);
	var filters = TextReader.make(filter);
	var change = false;
	var indexer = 0;

	filters.type = 'remove';
	filters.db = self;

	fs.array = true;
	fs.start = self.$header;
	fs.linesize = self.$size;
	fs.divider = '\n';

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	var data = { keys: self.$keys };

	var remove = function(docs, d, dindex, f) {
		filters.total--;
		f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
		self.onremove && self.onremove(fs.docsbuffer[dindex].doc);
		return 1;
	};

	var removeflush = function(docs, d, dindex) {
		var rec = fs.docsbuffer[dindex];
		!change && (change = true);
		fs.write(fs.remchar + rec.doc.substring(1) + NEWLINE, rec.position);
	};

	fs.ondocuments = function() {

		var lines = fs.docs;
		var arr = [];

		for (var a = 0; a < lines.length; a++) {
			data.line = lines[a].split(DELIMITER);
			data.index = indexer++;
			arr.push(self.parseData(data));
		}

		filters.compare2(arr, remove, removeflush);
	};

	fs.$callback = function() {

		if (self.id && self.inmemory && CACHEITEMS[self.id].length)
			CACHEITEMS[self.id] = [];

		filters.done();
		self.filesize = fs.stats.size;
		CONF.textdb_inmemory && self.$check();
		fs = null;
		self.$writing = false;
		self.next(0);
	};

	fs.openupdate();
};

TD.$clean = function() {

	var self = this;
	self.step = 13;

	if (!self.pending_clean.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_clean.splice(0);
	var length = filter.length;

	var fs = new TextStreamReader(self.filename);
	var writer = Fs.createWriteStream(self.filename + '.tmp');

	writer.write(self.stringifySchema(self) + NEWLINE);

	fs.start = self.$header;
	fs.linesize = self.$size;
	fs.divider = NEWLINE;

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = function() {
		fs.docs && writer.write(fs.docs + NEWLINE);
	};

	fs.$callback = function() {
		writer.end();
	};

	writer.on('finish', function() {
		Fs.rename(self.filename + '.tmp', self.filename, function() {
			for (var i = 0; i < length; i++)
				filter[i]();
			self.next(0);
			fs = null;
		});
	});

	fs.openread();
};

TD.$clear = function() {

	var self = this;
	self.step = 12;

	if (!self.pending_clear.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_clear.splice(0);
	Fs.unlink(self.filename, function() {
		Fs.appendFile(self.filename, self.stringifySchema(self) + NEWLINE, function() {
			for (var i = 0; i < filter.length; i++)
				filter[i]();
			if (self.id && self.inmemory && CACHEITEMS[self.id].length)
				CACHEITEMS[self.id] = [];
			self.total = 0;
			self.filesize = 0;
			self.next(0);
		});
	});
};

TD.$lock = function() {

	var self = this;
	self.step = 14;

	if (!self.pending_locks.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_locks.splice(0);
	filter.wait(function(fn, next) {
		fn.call(self, next);
	}, function() {
		self.next(0);
	});
};

TD.$streamer = function() {

	var self = this;
	self.step = 10;

	if (!self.pending_streamer.length) {
		self.next(0);
		return self;
	}

	self.$reading++;

	var filter = self.pending_streamer.splice(0);
	var length = filter.length;
	var count = 0;
	var fs = new TextStreamReader(self.filename);
	var data = {};

	data.keys = self.$keys;

	fs.array = true;
	fs.start = self.$header;
	fs.divider = '\n';

	if (self.buffersize)
		fs.buffersize = self.buffersize;

	if (self.buffercount)
		fs.buffercount = self.buffercount;

	fs.ondocuments = function() {
		var lines = fs.docs;
		for (var a = 0; a < lines.length; a++) {
			data.line = lines[a].split(DELIMITER);
			data.index = count++;
			var doc = self.parseData(data);
			for (var i = 0; i < length; i++)
				filter[i].fn(doc, filter[i].arg, count);
		}
	};

	fs.$callback = function() {
		for (var i = 0; i < length; i++)
			filter[i].callback && filter[i].callback(null, filter[i]);
		self.$reading--;
		self.next(0);
		fs = null;
	};

	fs.openread();
	return self;
};

TD.allocations = function(enable) {
	this.$allocations = enable;
	return this;
};

TD.parseSchema = function(output, arr) {

	var sized = true;

	output.$schema = {};
	output.$keys = [];
	output.$size = 2;

	for (var i = 0; i < arr.length; i++) {
		var arg = arr[i].split(':');
		var type = 0;
		var T = (arg[1] || '').toLowerCase().trim();
		var size = 0;
		var copy = arg[0].match(/=.*$/g);

		if (copy) {
			arg[0] = arg[0].replace(copy, '').trim();
			copy = (copy + '').replace(/=/g, '').trim();
		}

		var index = T.indexOf('(');
		if (index != -1) {
			size = +T.substring(index + 1, T.lastIndexOf(')'));
			T = T.substring(0, index);
		}

		switch (T) {
			case 'number':
				type = 2;
				!size && (size = 16);
				break;
			case 'boolean':
			case 'bool':
				type = 3;
				size = 1;
				break;
			case 'date':
				type = 4;
				size = 13;
				break;
			case 'object':
				type = 5;
				size = 0;
				sized = false;
				break;
			case 'string':
			default:
				type = 1;
				if (!size)
					sized = false;
				break;
		}
		var name = arg[0].trim();
		output.$schema[name] = { name: name, type: type, pos: i, size: size, copy: copy };
		output.$keys.push(name);
		output.$size += size + 1;
	}

	if (sized) {
		output.$allocations = false;
		output.$size++; // newline
	} else
		output.$size = 0;

	return this;
};

TD.stringifySchema = function(schema) {

	var data = [];

	if (schema.$keys === undefined)
		throw new Error('FET');

	for (var i = 0; i < schema.$keys.length; i++) {

		var key = schema.$keys[i];
		var meta = schema.$schema[key];
		var type = 'string';

		switch (meta.type) {
			case 2:

				type = 'number';

				// string
				if (schema.$size && meta.size !== 16)
					type += '(' + (meta.size) + ')';

				break;

			case 3:
				type = 'boolean';
				break;
			case 4:
				type = 'date';
				break;
			case 5:
				type = 'object';
				break;
			default:
				// string
				if (meta.size)
					type += '(' + (meta.size) + ')';
				break;
		}

		data.push(key + ':' + type);
	}

	return data.join(DELIMITER);
};

TD.parseData = function(data, cache) {

	var self = this;
	var obj = {};
	var esc = data.line[0] === '*';
	var val, alloc;

	if (cache && !self.$size && data.keys.length === data.line.length - 2)
		alloc = data.line[data.line.length - 1].length;

	for (var i = 0; i < data.keys.length; i++) {
		var key = data.keys[i];

		if (cache && cache !== EMPTYOBJECT && cache[key] != null) {
			obj[key] = cache[key];
			continue;
		}

		var meta = self.$schema[key];
		if (meta == null)
			continue;

		var pos = meta.pos + 1;
		var line = data.line[pos];

		if (self.$size) {
			for (var j = line.length - 1; j > -1; j--) {
				if (line[j] !== ' ') {
					line = line.substring(0, j + 1);
					break;
				}
			}
		}

		switch (meta.type) {
			case 1: // String
				obj[key] = line;

				if (esc && obj[key])
					obj[key] = obj[key].replace(REGTUNESCAPE, regtescapereverse);

				break;
			case 2: // Number
				val = +line;
				obj[key] = val < 0 || val > 0 ? val : 0;
				break;
			case 3: // Boolean
				val = line;
				obj[key] = BOOLEAN[val] == 1;
				break;
			case 4: // Date
				val = line;
				obj[key] = val ? new Date(val[10] === 'T' ? val : +val) : null;
				break;
			case 5: // Object
				val = line;
				if (esc && val)
					val = val.replace(REGTUNESCAPE, regtescapereverse);
				obj[key] = val ? val.parseJSON(true) : null;
				break;
		}
	}

	alloc >= 0 && (obj.$$alloc = { size: alloc, length: data.length });
	return obj;
};

TD.stringify = function(doc, insert, byteslen) {

	var self = this;
	var output = '';
	var esc = false;
	var size = 0;

	for (var i = 0; i < self.$keys.length; i++) {
		var key = self.$keys[i];
		var meta = self.$schema[key];
		var val = doc[key];

		switch (meta.type) {
			case 1: // String

				if (self.$size) {
					switch (typeof(val)) {
						case 'number':
							val = val + '';
							break;
						case 'boolean':
							val = val ? '1' : '0';
							break;
						case 'object':
							val = JSON.stringify(val);
							break;
					}

					if (val.length > meta.size)
						val = val.substring(0, meta.size);
					else
						val = val.padRight(meta.size, ' ');

					// bytes
					var diff = meta.size - Buffer.byteLength(val);
					if (diff > 0) {
						for (var j = 0; j < diff; j++)
							val += ' ';
					}

				} else {
					val = val ? val : '';
					if (meta.size && val.length > meta.sized)
						val = val.substring(0, meta.size);
					size += 4;
				}

				break;
			case 2: // Number
				val = (val || 0) + '';
				if (self.$size) {
					if (val.length < meta.size)
						val = val.padRight(meta.size, ' ');
				} else
					size += 2;
				break;

			case 3: // Boolean
				val = (val == true ? '1' : '0');
				break;

			case 4: // Date
				val = val ? val instanceof Date ? val.getTime() : val : '';
				if (self.$size)
					val = (val + '').padRight(meta.size, ' ');
				else if (!val)
					size += 10;
				break;

			case 5: // Object
				val = val ? JSON.stringify(val) : '';
				size += 4;
				break;
		}

		if (!esc && (meta.type === 1 || meta.type === 5)) {
			val += '';
			if (REGTESCAPETEST.test(val)) {
				esc = true;
				val = val.replace(REGTESCAPE, regtescape);
			}
		}

		output += DELIMITER + val;
	}

	if (self.$size && (insert || byteslen)) {
		output += DELIMITER;
	} else if (doc.$$alloc) {
		var l = output.length;
		var a = doc.$$alloc;
		if (l <= a.length) {
			var s = (a.length - l) - 1;
			if (s > 0) {
				output += DELIMITER.padRight(s, '.');
				if (byteslen) {
					var b = byteslen - Buffer.byteLength(output);
					if (b > 0) {
						b--;
						for (var i = 0; i < b; i++)
							output += '.';
					} else {
						var c = s - b;
						if (c > 0)
							output = output.substring(0, (output.length + b) - 1);
					}
				}
			} else if (s === 0)
				output += DELIMITER;
			else
				insert = true;
		} else
			insert = true;
	} else
		insert = true;

	if (insert && size && self.$allocations)
		output += DELIMITER.padRight(size, '.');

	return (esc ? '*' : '+') + output;
};

function regtescapereverse(c) {
	switch (c) {
		case '%0A':
			return '\n';
		case '%0D':
			return '\r';
		case '%7C':
			return '|';
	}
	return c;
}

function regtescape(c) {
	switch (c) {
		case '\n':
			return '%0A';
		case '\r':
			return '%0D';
		case '|':
			return '%7C';
	}
	return c;
}

// ======================================================
// Helper functions
// ======================================================

exports.JsonDB = function(name, cache) {
	var instance = new JsonDB(name, cache !== true);
	cache && INSTANCES.push(instance);
	return instance;
};

exports.TableDB = function(name, schema, cache) {
	var instance = new TableDB(name, schema, cache !== true);
	cache && INSTANCES.push(instance);
	return instance;
};

// Clears cache each hour
if (process.totaldbworker) {
	var CLEANERTICKS = 1;
	setInterval(function() {

		for (var key in CACHEITEMS)
			CACHEITEMS[key] = [];

		// 12 hours
		if (CLEANERTICKS % 12 === 0) {
			for (var i = 0; i < INSTANCES.length; i++)
				INSTANCES[i].clean();
		}

		CLEANERTICKS++;
	}, 60000 * 60);
} else {
	ON('service', function(counter) {

		if (counter % 60 === 0) {
			for (var m in CACHEITEMS)
				CACHEITEMS[m] = [];
		}

		// 12 hours
		if (counter % 720 === 0) {
			for (var i = 0; i < INSTANCES.length; i++)
				INSTANCES[i].clean();
		}
	});
}