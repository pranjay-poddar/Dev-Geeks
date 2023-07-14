'use strict';

require('./utils');

const Fs = require('fs');
const Path = require('path');
const QueryBuilder = require('./textdb-builder').QueryBuilder;
const TextReader = require('./textdb-reader');
const REGDATE = /"\d{4}-\d{2}-\d{2}T[0-9.:]+Z"/g;
const MAXREADERS = 3;
const FILELIMIT = 512 * 1024; // Bytes
const READOPT = { encoding: 'utf8' };

function TextDB(filename, onetime) {

	var t = this;

	t.filename = filename;
	t.duration = [];
	t.pending_count = 0;
	t.pending_update = [];
	t.pending_append = [];
	t.pending_reader = [];
	t.pending_remove = [];
	t.pending_reader2 = [];
	t.pending_clear = [];
	t.pending_locks = [];
	t.step = 0;
	t.$timeoutmeta;
	t.$writing = false;
	t.$reading = 0;
	t.total = 0;
	t.filesize = 0;
	t.files = [];
	t.writing = {};

	t.next2 = function() {
		t.next(0);
	};

	t.refresh();
}

const TD = TextDB.prototype;

function next_operation(self, type) {
	self.next(type);
}

TD.refresh = function() {
	setImmediate(next_operation, this, 99);
};

TD.$refresh = function() {

	var self = this;
	self.step = 99;

	Fs.readdir(self.filename, function(err, files) {

		if (err) {
			PATH.mkdir(self.filename);
			setTimeout(self.next2, 100);
			return;
		}

		self.filesize = 0;
		files.wait(function load(item, next) {

			if (self.writing[item]) {
				setTimeout(load, 10, item, next);
				return;
			}

			var filename = Path.join(self.filename, item);
			Fs.lstat(filename, function(err, stat) {
				if (stat && stat.isFile()) {
					self.files.push({ id: item, filename: filename, size: stat.size, sortindex: parseInt(item, 36) });
					self.filesize += stat.size;
				}
				next();
			});
		}, function() {
			self.files.quicksort('sortindex_desc');
			self.next(0);
		}, 5);
	});
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

TD.release = function() {
	var self = this;
	for (var key in F.databases) {
		if (F.databases[key] === self)
			delete F.databases[key];
	}
	return self;
};

TD.drop = function(callback) {
	var self = this;
	self.pending_drops = callback || NOOP;
	setImmediate(next_operation, self, 7);
	return self;
};

TD.clear = function(callback) {
	var self = this;
	self.pending_clear.push(callback || NOOP);
	setImmediate(next_operation, self, 12);
	return self;
};

TD.clean = function(callback) {
	var self = this;
	callback && callback();
	setImmediate(next_operation, self, 13);
	return self;
};

TD.remove = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_remove.push(builder);
	setImmediate(next_operation, self, 3);
	return builder;
};

TD.find = TD.find2 = function(builder) {
	var self = this;
	if (builder instanceof QueryBuilder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader.push(builder);
	setImmediate(next_operation, self, 4);
	return builder;
};

TD.recount = function() {
	var self = this;
	self.pending_count++;
	setImmediate(next_operation, self, 5);
};

/*
TD.view = function(name, fn) {

	var self = this;

	if (!self.$views)
		self.$views = {};

	var emit = function(key, doc) {
		// name
		// key
		// doc
	};

	self.$views[name] = { emit: emit, fn: typeof(fn) === 'string' ? new Function('$', fn) : fn };
	return self;
};

TD.$reduce = function($) {
	for (var key in this.$views) {
		var item = this.$views[key];
		$.emit = item.emit;
		item.fn($);
	}
};

TD.rebuild = function() {

};*/

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

const NEXTWAIT = { 99: true, 7: true, 8: true, 9: true, 12: true, 13: true, 14: true };

TD.next = function(type) {

	if (type && NEXTWAIT[this.step])
		return;

	if (this.step !== 99 && type === 99) {
		this.$refresh();
		return;
	}

	if (!this.$writing && !this.$reading) {

		if (this.step !== 12 && this.pending_clear.length) {
			this.$clear();
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

	}

	if (this.step !== type) {
		this.step = 0;
		setImmediate(next_operation, this, 0);
	}
};

// ======================================================================
// FILE OPERATIONS
// ======================================================================

function replacedate(text) {
	return 'new Date(' + new Date(text.substring(1, text.length - 1)).getTime() + ')';
}

TD.lock = function(callback) {
	var self = this;
	self.pending_locks.push(callback || NOOP);
	setImmediate(next_operation, self, 14);
	return self;
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
	}, () => self.next(0));
};

TD.$append = function() {

	var self = this;
	self.step = 1;

	if (!self.pending_append.length) {
		self.next(0);
		return;
	}

	self.$writing = true;
	var now = Date.now();
	var output = [];

	self.files.wait(function load(item, next) {

		if (self.writing[item.id]) {
			setTimeout(load, 10, item, next);
			return;
		}

		if (item.size > FILELIMIT || item.failed) {
			next();
			return;
		}

		Fs.readFile(item.filename, READOPT, function(err, body) {

			var diff = FILELIMIT - item.size;
			var arr;

			try {
				arr = body && body.length ? (new Function('return ' + body))() : [];
			} catch (e) {
				DEF.onError(e, item.filename);
				item.failed = true;
				next();
				return;
			}

			var is = false;

			while (self.pending_append.length) {

				var builder = self.pending_append.shift();
				var length = Buffer.from(JSON.stringify(builder.payload)).length;

				diff -= length;
				item.size += length;
				self.filesize += length;

				// Adds as a first item
				arr.unshift(builder.payload);
				self.total++;

				if (builder.$callback || builder.$callback2)
					output.push(builder);

				is = true;
				self.oninsert && self.oninsert(builder.payload);

				if (diff <= 0)
					break;
			}

			if (is) {
				self.writing[item.id] = 1;
				Fs.writeFile(item.filename, JSON.stringify(arr).replace(REGDATE, replacedate), function() {
					delete self.writing[item.id];
					next();
				});
			} else
				next();

		});

	}, function() {

		var arr = [];
		var size = 0;

		while (self.pending_append.length) {

			var builder = self.pending_append.shift();
			var length = Buffer.from(JSON.stringify(builder.payload)).length;

			// adds as a first item
			arr.unshift(builder.payload);
			self.total++;
			self.filesize += length;

			if (builder.$callback || builder.$callback2)
				output.push(builder);

			size += length;

			if (size > FILELIMIT || !self.pending_append.length) {
				var id = Date.now();
				var filename = Path.join(self.filename, id.toString(36) + '.json');
				self.files.unshift({ filename: filename, size: size, sortindex: id });
				Fs.writeFile(filename, JSON.stringify(arr).replace(REGDATE, replacedate), ERROR('textdb'));
				arr = [];
				size = 0;
			}
		}

		var diff = Date.now() - now;

		if (self.duration.push({ type: 'insert', duration: diff }) > 20)
			self.duration.shift();

		for (var i = 0; i < output.length; i++) {
			var builder = output[i];
			builder.duration = diff;
			builder.response = builder.counter = builder.count = 1;
			builder.logrule && builder.logrule();
			builder.done();
		}

		setImmediate(next_append, self);
	});

};

function next_append(self) {
	self.$writing = false;
	self.next(0);
}

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
	self.$reading++;

	var done = function() {
		self.$reading--;
		filters.done();
		self.next(0);
	};

	self.files.wait(function load(item, next) {

		if (!next)
			return;

		if (self.writing[item.id]) {
			setTimeout(load, 10, item, next);
			return;
		}

		if (item.error) {
			next();
			return;
		}

		Fs.readFile(item.filename, READOPT, function(err, body) {
			var docs;

			try {
				docs = body ? (new Function('return ' + body))() : EMPTYARRAY;
			} catch (e) {
				item.failed = true;
				DEF.onError(e, item.filename);
				next();
				return;
			}

			if (filters.compare(docs)) {
				next = null;
				done();
			} else
				next();
		});

	}, done, 3);

	return self;
};

TD.$update = function() {

	var self = this;
	self.step = 2;

	if (!self.pending_update.length) {
		self.next(0);
		return self;
	}

	self.$writing = true;

	var filter = self.pending_update.splice(0);
	var filters = TextReader.make();

	filters.type = 'update';
	filters.db = self;

	for (var i = 0; i < filter.length; i++)
		filters.add(filter[i], true);

	var update = function(docs, doc, dindex, f) {
		try {
			f.modifyrule(docs[dindex], f.modifyarg);
			f.backuprule && f.backuprule(doc);
			self.onupdate && self.onupdate(docs[dindex]);
		} catch (e) {
			f.canceled = true;
			f.error = e + '';
		}
	};

	var done = function() {

		self.$writing = false;
		self.next(0);

		var diff = filters.done().diff;

		if (self.duration.push({ type: 'update', duration: diff }) > 20)
			self.duration.shift();

		if (filters.total > 0)
			filters.db.total = filters.total;
	};

	self.files.wait(function load(item, next) {

		if (!next)
			return;

		if (self.writing[item.id]) {
			setTimeout(load, 10, item, next);
			return;
		}

		if (item.failed) {
			next();
			return;
		}

		Fs.readFile(item.filename, READOPT, function(err, body) {

			if (!next)
				return;

			var docs;

			try {
				docs = body ? (new Function('return ' + body))() : EMPTYARRAY;
			} catch (e) {
				item.failed = true;
				DEF.onError(e, item.filename);
				next();
				return;
			}

			var r = filters.compare3(docs, update);
			if (r === 0) {
				next = null;
				done();
				return;
			}

			if (r === 2) {
				self.writing[item.id] = 1;
				var buffer = Buffer.from(JSON.stringify(docs).replace(REGDATE, replacedate));
				item.size = buffer.length;
				item.modified = true;
				Fs.writeFile(item.filename, buffer, function() {
					delete self.writing[item.id];
					next();
				});
			} else
				next();
		});

	}, done, 3);

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

	var filter = self.pending_remove.splice(0);
	var filters = TextReader.make(filter);

	filters.type = 'remove';
	filters.db = self;

	var removed = [];

	var remove = function(docs, d, dindex, f) {
		removed.push(d);
		filters.total--;
		f.backuprule && f.backuprule(d);
		self.onremove && self.onremove(d);
		return 1;
	};

	var done = function() {

		var diff = filters.done().diff;

		if (self.duration.push({ type: 'remove', duration: diff }) > 20)
			self.duration.shift();

		self.$writing = false;
		self.next(0);
	};

	self.files.wait(function load(item, next) {

		if (!next)
			return;

		if (self.writing[item.id]) {
			setTimeout(load, 10, item, next);
			return;
		}

		if (item.failed) {
			next();
			return;
		}

		Fs.readFile(item.filename, READOPT, function(err, body) {

			if (!next)
				return;

			var docs;

			try {
				docs = body ? (new Function('return ' + body))() : EMPTYARRAY;
			} catch (e) {
				item.failed = true;
				DEF.onError(e, item.filename);
				next();
				return;
			}

			var r = filters.compare3(docs, remove);
			if (r === 0) {
				next = null;
				done();
				return;
			}

			if (r === 2) {

				while (removed.length) {
					var doc = removed.shift();
					var index = docs.indexOf(doc);
					docs.splice(index, 1);
				}

				var buffer = Buffer.from(JSON.stringify(docs).replace(REGDATE, replacedate));
				item.size = buffer.length;
				item.modified = true;
				self.writing[item.id] = 1;
				Fs.writeFile(item.filename, buffer, function() {
					delete self.writing[item.id];
					next();
				});

			} else
				next();
		});

	}, done, 3);
};

TD.$clear = function() {

	var self = this;
	self.step = 12;

	if (!self.pending_clear.length) {
		self.next(0);
		return;
	}

	var filter = self.pending_clear.splice(0);

	self.files.wait(function load(item, next) {
		if (self.writing[item.id])
			setTimeout(load, 10, item, next);
		else
			Fs.unlink(item.filename, next);
	}, function() {

		self.total = 0;
		self.filesize = 0;

		for (var i = 0; i < filter.length; i++)
			filter[i]();

		self.files = [];
		self.next(0);
	}, 5);

};

TD.$drop = function() {
	var self = this;
	self.step = 7;
	if (self.pending_drops) {
		self.total = 0;
		self.filesize = 0;
		self.files.wait((item, next) => Fs.unlink(item.filename, next), () => Fs.rmdir(self.filename, function() {
			self.pending_drops();
			self.pending_drops = null;
			self.next(0);
		}), 5);
	} else
		self.next(0);
};

TD.$count = function() {

	var self = this;
	self.step = 5;

	if (!self.pending_count) {
		self.next(0);
		return self;
	}

	self.pending_count = 0;
	self.$reading++;

	self.filesize = 0;
	self.total = 0;

	self.files.wait(function load(item, next) {

		if (item.failed) {
			next();
			return;
		}

		if (self.writing[item.id]) {
			setTimeout(load, 10, item, next);
			return;
		}

		self.filesize += item.size;
		Fs.readFile(item.filename, READOPT, function(err, body) {

			var docs;

			try {
				docs = body ? (new Function('return ' + body))() : EMPTYARRAY;
				self.total += docs.length;
			} catch (e) {
				item.failed = true;
				DEF.onError(e, item.filename);
			}

			next();
		});
	}, function() {
		self.$reading--;
		self.next(0);
	});

	return self;
};

exports.TextDB = function(name) {
	var instance = new TextDB(name);
	return instance;
};