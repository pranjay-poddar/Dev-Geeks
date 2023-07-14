// Dependencies
const DButils = require('./textdb-utils');
const Fs = require('fs');
const NEWLINE = '\n';

var PROPCACHE = {};
var FUNCCACHE = {};

ON('service', function(counter) {
	if (counter % 5 === 0) {
		PROPCACHE = {};
		FUNCCACHE = {};
	}
});

var errorhandling = () => {};
var func = {};

func.in = function(a, b) {
	if (a instanceof Array) {
		for (var i = 0; i < a.length; i++) {
			if (b instanceof Array) {
				for (var j = 0; j < b.length; j++) {
					if (a[i] === b[j])
						return true;
				}
			} else if (a[i] === b)
				return true;
		}
	} else {
		if (b instanceof Array)
			return b.indexOf(a) !== -1;
		else if (a === b)
			return true;
	}
	return false;
};

function search(a, b, pos) {
	switch (pos) {
		case 'beg':
		case 1:
			return a.substring(0, b.length) === b;
		case 'end':
		case 2:
			return a.substring(a.length - b.length) === b;
		default:
			return a.indexOf(b) !== -1;
	}
}

func.search = function(a, b, pos) {

	if (!a || !b)
		return false;

	if (a instanceof Array) {
		for (var i = 0; i < a.length; i++) {
			if (!a[i])
				continue;
			var av = (a[i] + '').toLowerCase();
			if (b instanceof Array) {
				for (var j = 0; j < b.length; j++) {
					if (!b[j])
						continue;
					var bv = (b[j] + '').toLowerCase();
					if (search(av, bv, pos))
						return true;
				}
			} else if (search(av, (b + '').toLowerCase(), pos))
				return true;
		}
	} else {
		if (b instanceof Array) {
			for (var i = 0; i < b.length; i++) {
				if (!b[i])
					continue;
				var bv = (b[j] + '').toLowerCase();
				if (search(a, bv, pos))
					return true;
			}
			return b.indexOf(a) !== -1;
		} else {
			if (search((a + '').toLowerCase(), (b + '').toLowerCase(), pos))
				return true;
		}
	}
	return false;
};

// Dependencies
function QueryBuilder(db) {

	var t = this;
	t.tmp = {};
	t.db = db;
	t.response = [];
	t.count = 0;
	t.counter = 0;
	t.scanned = 0;
	t.$take = 9999999;
	t.$skip = 0;

	t.func = func;

	// t.$fields
	// t.$sort
}

QueryBuilder.prototype.assign = function(meta) {
	var self = this;
	self.cid = meta.cid;
	self.$first = meta.first;
	meta.fields && self.fields(meta.fields);
	meta.sort && self.sort(meta.sort);
	meta.take && self.take(meta.take);
	meta.skip && self.skip(meta.skip);

	if (meta.paginate)
		self.$paginate = 1;

	meta.modify && self.modify(meta.modify, meta.modifyarg);
	meta.filter && self.filter(meta.filter, meta.filterarg);
	meta.scalar && self.scalar(meta.scalar, meta.scalararg);
	meta.backup && self.backup(meta.backup);
	meta.payload && (self.payload = meta.payload);
	meta.log && self.log(meta.log);
	meta.join && self.join(meta.join);

	if (meta.filter)
		self.filterid = meta.filter;

	return self;
};

QueryBuilder.prototype.fields = function(value) {
	var self = this;
	var tmp = PROPCACHE[value];
	if (!tmp) {
		self.$fieldsremove = [];
		self.$fields = [];
		self.$fieldsall = {};
		var keys = value.split(',').trim();
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var rename = key.split(' as ');
			if (rename[1]) {
				key = rename[0];
				if (!self.$fieldsrename)
					self.$fieldsrename = {};
				self.$fieldsrename[i] = rename[1].trim();
				self.$fieldsall[self.$fieldsrename[i]] = 1;
			} else if (key[0] !== '-')
				self.$fieldsall[key] = 1;

			if (key[0] === '-')
				self.$fieldsremove.push(key.substring(1));
			else
				self.$fields.push(key);
		}
		tmp = { rename: self.$fieldsrename, all: self.$fieldsall, map: self.$fields.length ? self.$fields : null, rem: self.$fieldsremove.length ? self.$fieldsremove : null };
		PROPCACHE[value] = tmp;
		if (!self.$fields.length)
			self.$fields = null;
		if (!self.$fieldsremove.length)
			self.$fieldsremove = null;
	} else {
		self.$fields = tmp.map;
		self.$fieldsall = tmp.all;
		self.$fieldsremove = tmp.rem;
	}
	return self;
};

QueryBuilder.prototype.transform = function(rule, arg) {
	var self = this;
	if (arg)
		self.transformarg = arg;

	var key = 'T' + rule;
	var tmp = FUNCCACHE[key];
	if (tmp)
		self.transformrule = tmp;
	else {
		if (isdangerous(rule))
			rule = 'doc';
		FUNCCACHE[key] = self.transformrule = new Function('doc', 'arg', 'tmp', 'func', 'return ' + rule);
	}

	return self;
};

QueryBuilder.prototype.prepare = function(doc) {

	var self = this;
	var obj;

	if (self.$fields) {
		obj = {};
		for (var i = 0; i < self.$fields.length; i++) {
			var a = self.$fields[i];
			var b = self.$fields[i];
			if (self.$fieldsrename && self.$fieldsrename[i])
				a = self.$fieldsrename[i];
			obj[a] = doc[b];
		}

	} else if (self.$fieldsremove) {

		obj = {};

		for (var key in doc)
			obj[key] = doc[key];

		for (var i = 0; i < self.$fieldsremove.length; i++)
			obj[self.$fieldsremove[i]] = undefined;
	}

	if (self.transformrule) {

		// Clone data
		if (!obj) {
			obj = {};
			for (var key in doc)
				obj[key] = doc[key];
		}

		self.transformrule(obj, self.transformarg);
	}

	return obj || doc;
};

QueryBuilder.prototype.push = function(item) {
	var self = this;
	if (self.$sort && (!self.joins || self.leftonly))
		return DButils.sort(self, item);
	self.response.push(item);
	return true;
};

QueryBuilder.prototype.take = function(take) {
	this.$take = take;
	return this;
};

QueryBuilder.prototype.skip = function(skip) {
	this.$skip = skip;
	return this;
};

QueryBuilder.prototype.sort = function(sort) {

	this.$sort = U.sortcomparer(sort);

	if (this.$fields && this.$fields.length) {
		// Internal hack
		var meta = F.temporary.other['sort_' + sort];
		for (var i = 0; i < meta.length; i++) {
			var sort = meta[i];
			if (!this.$fieldsall[sort.name]) {
				this.$fieldsall[sort.name] = 1;
				if (this.$fields2)
					this.$fields2.push(sort.name);
				else
					this.$fields2 = [sort.name];
			}
		}
	}

	return this;
};

QueryBuilder.prototype.filter = function(rule, arg) {
	var self = this;

	self.filterarg = arg || {};

	var tmp = FUNCCACHE[rule];
	if (tmp)
		self.filterrule = tmp;
	else {
		if (isdangerous(rule))
			rule = 'false';
		try {
			FUNCCACHE[rule] = self.filterrule = new Function('doc', 'arg', 'tmp', 'func', (rule.indexOf('return ') === -1 ? 'return ' : '') + rule);
		} catch (e) {
			self.$sort = null;
			self.error = e + '';
			self.filterrule = filterrule;
		}
	}

	return self;
};

function modifyrule(doc) {
	return doc;
}

function scalarrule() {
}

function filterrule() {
	return false;
}

QueryBuilder.prototype.modify = function(rule, arg) {

	var self = this;
	var tmp = FUNCCACHE[rule];

	self.modifyarg = arg || {};

	if (tmp)
		self.modifyrule = tmp;
	else {
		if (isdangerous(rule, true))
			rule = '';
		try {
			FUNCCACHE[rule] = self.modifyrule = rule ? new Function('doc', 'arg', 'tmp', 'func', rule) : modifyrule;
		} catch (e) {
			self.modifyrule = modifyrule;
			self.error = e + '';
		}
	}

	return self;
};

QueryBuilder.prototype.scalar = function(rule, arg) {
	var self = this;
	var tmp = FUNCCACHE[rule];

	self.scalararg = arg || {};

	if (tmp)
		self.scalarrule = tmp;
	else {
		if (isdangerous(rule))
			rule = '';
		try {
			FUNCCACHE[rule] = self.scalarrule = new Function('doc', 'arg', 'tmp', 'func', rule);
		} catch (e) {
			self.scalarrule = scalarrule;
			self.error = e + '';
		}
	}

	return self;
};

QueryBuilder.prototype.done = function() {

	var self = this;

	if (!self.$callback && !self.$callback2 && !self.$resolve)
		return;

	var meta = {};

	if (self.error)
		meta.error = self.error;

	meta.cid = self.cid;
	meta.count = self.count;
	meta.counter = self.counter;
	meta.scanned = self.scanned;
	meta.duration = self.duration;

	if (self.inmemory)
		meta.inmemory = self.inmemory;

	if (self.canceled)
		meta.canceled = true;

	if (!self.$TextReader || self.$TextReader.type === 'update' || self.$TextReader.type === 'remove')
		self.response = meta.counter;
	else if (self.$first)
		self.response = self.response instanceof Array ? self.response[0] : self.response;
	else if (self.scalararg)
		self.response = self.scalararg;

	if (self.db && self.db.clone && (!self.$TextReader || (self.$TextReader.type !== 'update' && self.$TextReader.type !== 'remove'))) {
		if (self.response instanceof Array) {
			for (var i = 0; i < self.response.length; i++)
				self.response[i] = CLONE(self.response[i]);
		} else
			self.response = CLONE(self.response);
	}

	if (process.totaldbworker) {
		meta.response = self.response;
		if (self.joins) {
			self.executejoins(meta);
		} else {
			self.$callback && self.$callback(null, meta);
			self.$callback2 && self.$callback2(null, meta);
			self.$resolve && self.$resolve(meta);
		}
	} else {
		if (self.joins) {
			self.executejoins(meta);
		} else {
			self.$callback && self.$callback(null, self.response, meta);
			self.$callback2 && self.$callback2(null, self.response, meta);
			self.$resolve && self.$resolve(self.response);
		}
	}
};

QueryBuilder.prototype.prepareresponse = function(response) {
	for (var i = 0; i < response.length; i++)
		response[i] = this.prepare(response[i]);
};

QueryBuilder.prototype.executejoins = function(mainmeta) {

	var self = this;
	if (!self.response.length) {

		if (process.totaldbworker) {
			self.$callback && self.$callback(null, mainmeta);
			self.$callback2 && self.$callback2(null, mainmeta);
		} else {
			self.$callback && self.$callback(null, self.response, mainmeta);
			self.$callback2 && self.$callback2(null, self.response, mainmeta);
		}

		return;
	}

	self.joins.wait(function(item, next) {

		var unique = new Set();

		for (var i = self.response.length - 1; i > -1; i--) {
			var val = self.response[i][item.options.on[1]];
			if (val == null) {
				if (item.type === 2)
					self.response.splice(i, 1);
				else
					self.response[i][item.field] = item.options.first ? null : [];
			} else
				unique.add(val);
		}

		if (!unique.size) {
			next();
			return;
		}

		item.options.filterarg.params[item.options.on[2]] = unique;

		var tmp = item.db.split('/');
		var db;

		if (tmp[1]) {
			if (tmp[0] === 'table')
				db = TABLE(tmp[1]);
			else
				db = NOSQL(tmp[1]);
		} else
			db = NOSQL(tmp[0]);

		var b = db.find();
		b.options.filter = [item.options.filter];
		b.options.filterarg = item.options.filterarg;
		b.options.fields = item.options.fields;
		b.options.take = item.options.take || 0;
		b.options.skip = item.options.skip || 0;

		if (b.options.fields)
			b.options.fields = item.options.on[0] + ',' + b.options.fields;

		b.callback(function(err, response, meta) {

			var items = meta ? response : response.response;
			for (var i = self.response.length - 1; i > -1; i--) {
				var doc = self.response[i];

				if (!item.options.first)
					doc[item.field] = [];

				for (var j = 0; j < items.length; j++) {
					if (items[j][item.options.on[0]] == doc[item.options.on[1]]) {
						if (item.options.first) {
							doc[item.field] = items[j];
							break;
						} else
							doc[item.field].push(items[j]);
					}
				}

				if (!doc[item.field]) {
					if (self.leftonly) {
						if (!item.options.first)
							doc[item.field] = [];
					} else
						self.response.splice(i, 1);
				}
			}

			mainmeta.scanned += meta ? meta.scanned : response.scanned;
			mainmeta.duration += meta ? meta.duration : response.duration;
			next();
		});

	}, function() {

		if (self.$fields2 && self.$fields2.length) {
			for (var i = 0; i < self.response.length; i++) {
				var item = self.response[i];
				for (var j = 0; j < self.$fields2.length; j++)
					delete item[self.$fields2[j]];
			}
		}

		if (!self.leftonly) {
			if (self.$skipjoin)
				self.response.splice(0, self.$skipjoin);
			if (self.$takejoin)
				self.response.splice(self.$takejoin);
		}

		if (process.totaldbworker) {
			self.$callback && self.$callback(null, mainmeta);
			self.$callback2 && self.$callback2(null, mainmeta);
		} else {
			self.$callback && self.$callback(null, self.response, mainmeta);
			self.$callback2 && self.$callback2(null, self.response, mainmeta);
		}
	});
};

QueryBuilder.prototype.callback = function(fn) {
	var self = this;
	self.$callback = fn;
	return self;
};

QueryBuilder.prototype.backup = function(meta) {
	var self = this;
	self.backuparg = meta || EMPTYOBJECT;
	self.backuprule = self.backupitem;
	return self;
};

QueryBuilder.prototype.log = function(data) {
	var self = this;
	data.date = new Date();
	self.logarg = JSON.stringify(data) + NEWLINE;
	self.logrule = self.logitem;
	return self;
};

// Internal
QueryBuilder.prototype.backupitem = function(item) {
	var self = this;
	self.backuparg.date = new Date();
	self.backuparg.body = (typeof(item) === 'string' ? item : JSON.stringify(item));
	Fs.appendFile(self.db.filenamebackup, JSON.stringify(self.backuparg) + NEWLINE, errorhandling);
};

QueryBuilder.prototype.logitem = function() {
	var self = this;
	Fs.appendFile(self.db.filenameLog, self.logarg, errorhandling);
	return self;
};

QueryBuilder.prototype.join = function(arr) {

	var self = this;
	var leftonly = true;
	var joins = [];

	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];

		if (item.type === 2)
			leftonly = false;

		item.parent = self;
		joins.push(item);

		if (self.$fieldsall && !self.$fieldsall[item.options.on[1]]) {
			self.$fieldsall[item.options.on[1]] = 1;
			if (self.$fields2)
				self.$fields2.push(item.options.on[1]);
			else
				self.$fields2 = [item.options.on[1]];
		}

	}

	if (!leftonly) {
		self.$takejoin = self.$take;
		self.$skipjoin = self.$skip;
		self.$take2 = self.$take = 0;
		self.$skip = 0;
	}

	self.leftonly = leftonly;
	self.joins = joins;
	return self;
};

function isdangerous(rule) {
	return (/require|global/).test(rule);
}

exports.QueryBuilder = QueryBuilder;
exports.make = function() {
	return new QueryBuilder();
};