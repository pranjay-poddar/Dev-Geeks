const SPECIAL = { clear: 1, clean: 1, drop: 1 };
const REG_FIELDS_CLEANER = /"|`|\||'|\s/g;
const REG_NULLABLE = /\./g;
const Path = require('path');
var CACHE = {};

var INSTANCES = {};
var LOADSTATS = function() {

	F.stats.textdb = {};

	var writingstats = 0;
	var readingstats = 0;
	var reading = 0;
	var writing = 0;

	function measure(counter) {

		var pendingread = 0;
		var pendingwrite = 0;
		var duration = 0;
		var documents = 0;

		F.stats.textdb.size = 0;

		for (var m in INSTANCES) {

			var instance = INSTANCES[m];
			pendingread += instance.pending_reader.length + (instance.pending_reader2 ? instance.pending_reader2.length : 0) + (instance.pending_streamer ? instance.pending_streamer.length : 0);
			pendingwrite += instance.pending_update.length + instance.pending_append.length + instance.pending_remove.length;
			if (duration < instance.duration)
				duration = instance.duration;
			documents += instance.total;
			F.stats.textdb.size += (instance.filesize || 0);
		}

		F.stats.textdb.size = (F.stats.textdb.size / 1024 / 1024).floor(3);
		F.stats.textdb.pendingwrite = pendingwrite;
		F.stats.textdb.pendingread = pendingread;
		F.stats.textdb.duration = duration;
		F.stats.textdb.documents = documents;

		if (counter % 2 === 0) {
			writingstats = Math.abs(writingstats - writing);
			readingstats = Math.abs(writingstats - reading);
			reading = 0;
			writing = 0;
		} else {
			writingstats = writing;
			readingstats = reading;
		}

		F.stats.textdb.reading = readingstats;
		F.stats.textdb.writing = writingstats;
	}

	ON('service', measure);
};

function makedirectory(directory, main, id) {

	var val = (HASH(id, true) % 10000) + '';
	var diff = 4 - val.length;

	if (diff > 0) {
		for (var i = 0; i < diff; i++)
			val = '0' + val;
	}

	if (diff.length > 4)
		val = val.substring(0, 4);

	return Path.join(directory, main, val);
}

function Database(type, name, onetime, schema, fork) {

	var t = this;
	t.type = type;
	t.name = name;
	t.directory = Path.dirname(name);
	t.basename = type === 'textdb' ? name : Path.basename(name);
	t.schema = schema;
	t.id = onetime ? name : t.basename;
	t.key = type + '_' + HASH(t.basename).toString(36);

	t.fork = {};
	t.onetime = onetime;

	t.exec = function(builder) {

		var name = t.name;
		if (builder.options) {

			builder.options.schema = t.schema;
			builder.options.onetime = t.onetime;
			builder.options.filter = builder.options.filter.length ? builder.options.filter.join('&&') : 'true';

			if (builder.options.join && builder.options.join.length) {
				var joins = builder.options.join;
				for (var i = 0; i < joins.length; i++)
					joins[i].options.filter = joins[i].options.filter.length ? joins[i].options.filter.join('&&') : 'true';
			}

			if (builder.options.relation) {
				var dir = makedirectory(t.directory, t.basename + '.relations', builder.options.relation[1]);
				name = Path.join(dir, builder.options.relation[1] + '_' + builder.options.relation[0] + '.nosql');
				if (builder.command === 'insert')
					PATH.mkdir(dir, true);
				builder.options.relation = undefined;
			}
		}

		var key = t.key;

		if (!t.fork[key]) {

			if (fork) {
				t.fork[key] = F.textdbworker;
			} else {

				if (type === 'inmemory') {
					t.fork[key] = require('./inmemory').load(name);
				} else {
					var db;
					if (type === 'textdb') {
						db = require('./textdb-new');
						t.fork[key] = db.TextDB(name, !t.onetime);
						t.fork[key].oninsert = t.oninsert;
						t.fork[key].onupdate = t.onupdate;
						t.fork[key].onremove = t.onremove;
					} else {
						db = require('./textdb');
						t.fork[key] = type === 'nosql' ? db.JsonDB(name, !t.onetime) : db.TableDB(name, schema, !t.onetime);
						t.fork[key].oninsert = t.oninsert;
						t.fork[key].onupdate = t.onupdate;
						t.fork[key].onremove = t.onremove;
					}
				}

				INSTANCES[key] = t.fork[key];

				if (LOADSTATS) {
					LOADSTATS();
					LOADSTATS = null;
				}
			}
		}

		if (SPECIAL[builder.command] || builder.command === 'lock' || builder.command === 'recount') {
			t.fork[key][builder.command](builder.$callback);
			if (builder.command === 'drop') {
				delete t.fork[key];
				delete INSTANCES[key];
			}
			return;
		}

		if (builder.command === 'alter') {
			t.fork[key][builder.command](builder.schema, builder.$callback);
			return;
		}

		if (builder.command === 'memory') {
			t.fork[key][builder.command](builder.options.count, builder.options.size);
			return;
		}

		if (builder.command === 'usage') {
			builder.$callback(null, { documents: t.fork[key].total || 0, filesize: t.fork[key].filesize || 0 });
			return;
		}

		var cb = builder.$custom ? builder.$custom() : builder.$error ? builder.callbackerror() : (builder.$ ? builder.asynchandler() : builder.$callback);

		if (F.textdbworker) {
			builder.options.type = type;
			builder.options.database = name;
			F.textdbworker['cmd_' + builder.command](builder.options, cb);
		} else
			t.fork[key][builder.command]().assign(builder.options).$callback = cb;
	};
}

var DP = Database.prototype;

function assign_querybuilder(filter, item) {
	switch (item.type) {
		case 'between':
			filter.between(item.name, item.a, item.b);
			break;
		case 'where':
			filter.where(item.name, item.comparer, item.value);
			break;
		case 'in':
			filter.in(item.name, item.value);
			break;
		case 'notin':
			filter.notin(item.name, item.value);
			break;
		case 'search':
			filter.search(item.name, item.value, item.comparer);
			break;
		case 'contains':
			filter.contains(item.name);
			break;
		case 'empty':
			filter.empty(item.name);
			break;
		case 'year':
			filter.year(item.name, item.comparer, item.value);
			break;
		case 'month':
			filter.month(item.name, item.comparer, item.value);
			break;
		case 'day':
			filter.day(item.name, item.comparer, item.value);
			break;
		case 'hour':
			filter.hour(item.name, item.comparer, item.value);
			break;
		case 'minute':
			filter.minute(item.name, item.comparer, item.value);
			break;
		case 'or':
			filter.or(function() {
				for (var condition of item.value)
					assign_querybuilder(filter, condition);
			});
			break;
	}
}

DP.assign = function(data) {

	var self = this;
	var fn = self[data.exec];
	if (fn) {

		var filter;

		switch (data.exec) {
			case 'scalar':
				filter = self[data.exec](data.scalar.type, data.scalar.key, data.scalar.key2);
				break;
			default:
				filter = self[data.exec](data.payload, data.upsert);
				break;
		}

		if (data.take)
			filter.options.take = data.take;

		if (data.skip)
			filter.options.skip = data.skip;

		if (data.first)
			filter.options.first = data.first;

		if (data.fields)
			filter.options.fields = data.fields.join(',');

		if (data.sort)
			filter.options.sort = data.sort.join(',');

		for (var i = 0; i < data.filter.length; i++)
			assign_querybuilder(filter, data.filter[i]);

		return filter;
	}
};

DP.next = function(builder) {
	setImmediate(this.exec, builder);
	return this;
};

DP.find = DP.all = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'find';
	this.next(builder);
	return builder;
};

DP.backups = function(callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'backups';
	this.next(builder);
	callback && builder.callback(callback);
	return builder;
};

DP.usage = function(callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'usage';
	this.next(builder);
	callback && builder.callback(callback);
	return builder;
};

DP.recount = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'recount';
	return this.next(builder);
};

function listing(builder, items, response) {
	var skip = builder.options.skip || 0;
	var take = builder.options.take || 0;
	return { page: skip && take ? ((skip / take) + 1) : 1, pages: response.count && take ? Math.ceil(response.count / take) : response.count ? 1 : 0, limit: take, count: response.count, items: items || [] };
}

DP.list = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'find';
	builder.$custom = function() {
		return function(err, response, meta) {
			var data = listing(builder, response, meta);
			if (builder.$) {
				if (err)
					builder.$.invalid(err);
				else
					builder.$resolve(data);
			} else if (builder.$callback)
				builder.$callback(err, data, meta);
		};
	};
	this.next(builder);
	return builder;
};

DP.lock = function(callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'lock';
	builder.$callback = callback;
	this.next(builder);
};

DP.read = DP.one = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'find2';
	builder.options.take = 1;
	builder.options.first = 1;
	this.next(builder);
	return builder;
};

DP.count = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'find';
	builder.options.scalar = 'arg.count+=1';
	builder.options.scalararg = { count: 0 };
	this.next(builder);
	return builder;
};

DP.scalar = function(type, key, key2) {
	var builder = new DatabaseBuilder();
	builder.command = 'find';

	if (key == null) {
		key = type;
		type = '*';
	}

	switch (type) {
		case 'group':
			builder.options.scalar = key2 ? 'if (doc.{0}!=null){tmp.val=doc.{0};arg[tmp.val]=(arg[tmp.val]||0)+(doc.{1}||0)}'.format(key, key2) : 'if (doc.{0}!=null){tmp.val=doc.{0};arg[tmp.val]=(arg[tmp.val]||0)+1}'.format(key);
			builder.options.scalararg = {};
			break;
		default:
			// min, max, sum, count

			if (key2) {
				builder.options.scalar = 'var k=doc.' + key + '+\'\';if (arg[k]){tmp.bk=doc.' + key2 + '||0;' + (type === 'max' ? 'if(tmp.bk>arg[k])arg[k]=tmp.bk' : type === 'min' ? 'if(tmp.bk<arg[k])arg[k]=tmp.bk' : 'arg[k]+=tmp.bk') + '}else{arg[k]=doc.' + key2 + '||0}';
			} else {
				builder.options.scalar = 'if (doc.{0}!=null){tmp.val=doc.{0};arg.count+=1;arg.min=arg.min==null?tmp.val:arg.min>tmp.val?tmp.val:arg.min;arg.max=arg.max==null?tmp.val:arg.max<tmp.val?tmp.val:arg.max;if(!(tmp.val instanceof Date))arg.sum+=tmp.val}'.format(key);
				builder.options.scalararg = { count: 0, sum: 0 };
			}

			break;
	}

	//builder.options.scalar = 'arg.count+=1';
	//builder.options.scalararg = { count: 0 };
	this.next(builder);
	return builder;
};

DP.stats = function(groupfield, datefield, key, type) {
	var builder = new DatabaseBuilder();
	builder.command = 'find';
	builder.options.scalar = 'if (doc.{0}!=null&&doc.{2}!=null&&doc.{1} instanceof Date){tmp.val=doc.{2};tmp.group=doc.{0};tmp.date=doc.{1}.format(\'{3}\');if(!arg[tmp.group])arg[tmp.group]={};if(!arg[tmp.group][tmp.date])arg[tmp.group][tmp.date]={min:null,max:null,count:0};tmp.cur=arg[tmp.group][tmp.date];tmp.cur.count++;if(tmp.cur.max==null){tmp.cur.max=tmp.val}else if(tmp.cur.max<tmp.val){tmp.cur.max=tmp.val}if(tmp.cur.min==null){tmp.cur.min=tmp.val}else if(tmp.cur.min>tmp.val){tmp.cur.min=tmp.val}}'.format(groupfield, datefield, key, type === 'hourly' ? 'yyyyMMddHH' : type === 'monthly' ? 'yyyyMM' : type === 'yearly' ? 'yyyy' : 'yyyyMMdd');
	builder.options.scalararg = {};
	/*
	builder.$custom = function() {
		return function(err, response, meta) {
			var output = [];
			var keys = Object.keys(response);
			for (var i = 0; i < keys.length; i++) {
				var key = keys[i];
				var item = {};
				var tmp = response[key];
				item.id = key;
				item.data = [];
				output.push(item);
				var keys2 = Object.keys(tmp);
				for (var j = 0; j < keys2.length; j++) {
					tmp[keys2[j]].date = tmp;
					item.data.push(tmp[keys2[j]]);
				}
			}
			builder.$callback && builder.$callback(err, output, meta);
		};
	};*/
	this.next(builder);
	return builder;
};

DP.memory = function(count, size) {
	var builder = new DatabaseBuilder();
	builder.command = 'memory';
	builder.options.count = count;
	builder.options.size = size;
	this.next(builder);
};

DP.find2 = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'find2';
	this.next(builder);
	return builder;
};

DP.insert = function(data, check, noeval) {

	var self = this;
	var bi = new DatabaseBuilder();
	bi.command = 'insert';

	for (var key in data) {
		switch(key[0]) {
			case '+':
			case '*':
			case '-':
			case '/':
			case '!':
			case '=':
			case '<':
			case '>':
				data[key.substring(1)] = data[key];
				delete data[key];
				break;
		}
	}

	bi.options.payload = data;

	if (check) {
		var builder = new DatabaseBuilder();
		builder.command = 'find2';
		builder.options.take = 1;
		builder.options.first = 1;
		builder.$custom = function() {
			return function(err, response, meta) {
				if (response) {
					if (builder.$) {
						if (err)
							builder.$.invalid(err);
						else
							builder.$resolve(0);
					} else if (builder.$callback)
						builder.$callback(err, 0, meta);
				} else {
					bi.$ = builder.$;
					bi.$resolve = builder.$resolve;
					bi.$reject = builder.$reject;
					bi.$callback = builder.$callback;
					self.next(bi);
				}
			};
		};

		self.next(builder);
		return builder;

	} else if (!noeval)
		self.next(bi);

	return bi;
};

DP.update = DP.modify = DP.mod = function(data, upsert, noeval) {

	var self = this;
	var builder = new DatabaseBuilder();
	builder.command = 'update';

	var tmp = [];
	var arg = {};

	for (var key in data) {
		var val = data[key];

		if (val === undefined)
			continue;

		var cmd;

		switch (key[0]) {
			case '+':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?0:doc.{0})+arg.{0}';
				break;
			case '*':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?0:doc.{0})*arg.{0}';
				break;
			case '-':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?0:doc.{0})-arg.{0}';
				break;
			case '/':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?0:doc.{0})/arg.{0}';
				break;
			case '!':
				key = key.substring(1);
				cmd = 'doc.{0}=!doc.{0}';
				break;
			case '=':
				key = key.substring(1);
				cmd = 'doc.{0}=' + val;
				break;
			case '>':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?arg.{0}:doc.{0}<arg.{0}?arg.{0}:doc.{0})';
				break;
			case '<':
				key = key.substring(1);
				cmd = 'doc.{0}=(doc.{0}==null?arg.{0}:doc.{0}>arg.{0}?arg.{0}:doc.{0})';
				break;
			default:
				cmd = 'doc.{0}=arg.{0}';
				break;
		}

		arg[key] = val;
		cmd && tmp.push(cmd.format(key));
	}

	if (tmp.length)
		builder.options.modify = tmp.join(';');

	builder.options.modifyarg = arg;

	if (upsert) {
		builder.$custom = function() {
			return function(err, response, meta) {
				if (response) {
					if (builder.$) {
						if (err)
							builder.$.invalid(err);
						else
							builder.$resolve(response);
					} else if (builder.$callback)
						builder.$callback(err, response, meta);
				} else {
					builder.$upsert && builder.$upsert(arg, builder);
					var bi = new DatabaseBuilder();
					bi.command = 'insert';
					bi.options.payload = arg;
					bi.$ = builder.$;
					bi.$resolve = builder.$resolve;
					bi.$reject = builder.$reject;
					bi.$callback = builder.$callback;
					self.next(bi);
				}
			};
		};
	}

	if (!noeval)
		self.next(builder);

	return builder;
};

DP.remove = DP.rem = function(noeval) {
	var builder = new DatabaseBuilder();
	builder.command = 'remove';
	if (!noeval)
		this.next(builder);
	return builder;
};

DP.drop = function() {
	var builder = new DatabaseBuilder();
	builder.command = 'drop';
	this.next(builder);
	return builder;
};

DP.alter = function(schema, callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'alter';
	builder.schema = schema;
	builder.$callback = callback;
	return this.next(builder);
};

DP.clear = function(callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'clear';
	builder.$callback = callback;
	this.next(builder);
	return builder;
};

DP.clean = function(callback) {
	var builder = new DatabaseBuilder();
	builder.command = 'clean';
	builder.$callback = callback;
	return this.next(builder);
};

DP.command = function(command, options, callback) {
	var builder = new DatabaseBuilder();
	builder.command = command;
	builder.options = options;
	builder.$callback = callback;
	this.next(builder);
	return builder;
};

function DatabaseBuilder() {
	var t = this;
	t.options = { filter: [], filterarg: { params: [] } };
	//t.joins;
}

var DB = DatabaseBuilder.prototype;

DB.insert = function(fn) {
	this.$upsert = fn;
	return this;
};

DB.error = DB.err = function(err) {
	this.$error = err + '';
	return this;
};

DB.done = function($, callback, param) {
	this.$callback = function(err, response) {
		if (err)
			$.invalid(err);
		else
			callback(response, param);
	};
	return this;
};

DB.callback = function(callback, err) {

	var self = this;

	if (typeof(callback) === 'function') {

		if (self.parent) {
			self.parent.$callback = callback;
			if (err)
				self.parent.$error = err;
		} else {
			self.$callback = callback;
			if (err)
				self.$error = err;
		}

		return self;

	} else {

		if (self.parent) {
			self.parent.$ = callback;
			if (err)
				self.parent.$error = err;
		} else {
			self.$ = callback;
			if (err)
				self.$error = err;
		}

		return new Promise(function(resolve, reject) {
			if (self.parent) {
				self.parent.$resolve = resolve;
				self.parent.$reject = reject;
			} else {
				self.$resolve = resolve;
				self.$reject = reject;
			}
		});
	}
};

DB.callbackerror = function() {
	var self = this;
	return function(err, response) {
		if (response == null || response === 0 || (response instanceof Array && !response.length))
			err = self.$error;
		if (self.$) {
			if (err)
				self.$.invalid(err);
			else
				self.$resolve(response);
		} else if (self.$callback)
			self.$callback(err, response);
	};
};

DB.assign = function(data) {
	var self = this;

	if (data.take)
		self.options.take = data.take;

	if (data.skip)
		self.options.skip = data.skip;

	if (data.first)
		self.options.first = data.first;

	if (data.fields)
		self.options.fields = data.fields.join(',');

	if (data.sort)
		self.options.sort = data.sort.join(',');

	for (var i = 0; i < data.self.length; i++)
		assign_querybuilder(self, data.self[i]);

	return self;
};

DB.param = function(value) {
	return this.options.filterarg.params.push(value) - 1;
};

DB.id = function(id) {
	return id instanceof Array ? this.in('id', id) : this.where('id', id);
};

DB.where = function(name, operator, value) {

	var self = this;

	if (value === undefined) {
		value = operator;
		operator = '==';
	}

	switch (operator) {
		case '=':
			operator = '==';
			break;
		case '<>':
			operator = '!=';
			break;
	}

	self.options.filter.push('doc.' + name.replace(REG_NULLABLE, '?.') + operator + 'arg.params[' + self.param(value) + ']');
	return self;
};

DB.backup = function(data) {
	this.options.backup = data;
	return this;
};

DB.log = function(data) {
	this.options.log = data;
	return this;
};

DB.rule = function(code, arg) {
	var self = this;

	if (arg) {
		for (var key in arg)
			self.options.filterarg[key] = arg[key];
	}

	self.options.filter.push(code);
	return self;
};

DB.take = function(count) {
	this.options.take = count;
	return this;
};

DB.first = function() {
	this.options.first = 1;
	return this;
};

DB.limit = function(count) {
	this.options.take = count;
	return this;
};

DB.page = function(page, limit) {
	if (limit)
		this.options.take = limit;
	this.options.skip = page * this.options.take;
	this.options.paginate = 1;
	return this;
};

DB.paginate = function(page, limit, maxlimit) {

	var limit2 = +(limit || 0);
	var page2 = (+(page || 0)) - 1;

	if (page2 < 0)
		page2 = 0;

	if (maxlimit && limit2 > maxlimit)
		limit2 = maxlimit;

	if (!limit2)
		limit2 = maxlimit;

	this.options.skip = page2 * limit2;
	this.options.take = limit2;
	this.options.paginate = 1;
	return this;
};

DB.skip = function(count) {
	this.options.skip = count;
	return this;
};

DB.in = function(name, value, id) {
	var self = this;

	if (id) {
		var arr = [];
		for (var i = 0; i < value.length; i++)
			arr.push(value[i][id]);
		value = arr;
	}

	self.options.filter.push('func.in(doc.' + name.replace(REG_NULLABLE, '?.') + ',arg.params[' + self.param(value) + '])');
	return self;
};

DB.notin = function(name, value, id) {
	var self = this;

	if (id) {
		var arr = [];
		for (var i = 0; i < value.length; i++)
			arr.push(value[i][id]);
		value = arr;
	}

	self.options.filter.push('!func.in(doc.' + name.replace(REG_NULLABLE, '?.') + ',arg.params[' + self.param(value) + '])');
	return self;
};

DB.between = function(name, a, b) {
	var self = this;
	var ia = self.param(a);
	var ib = self.param(b);
	self.options.filter.push('(doc.' + name.replace(REG_NULLABLE, '?.') + '>=arg.params[' + ia + ']&&doc.' + name + '<=arg.params[' + ib + '])');
	return self;
};

DB.or = function(callback) {
	var self = this;
	var filter = self.options.filter;
	self.options.filter = [];
	callback.call(self, self);
	self.options.filter.length && filter.push('(' + self.options.filter.join('||') + ')');
	self.options.filter = filter;
	return self;
};

DB.fields = function(fields) {
	var self = this;
	self.options.fields = fields;
	return self;
};

DB.month = function(name, operator, value) {
	var self = this;
	if (value === undefined) {
		value = operator;
		operator = '=';
	}
	self.options.filter.push(compare_datetype('month', name, self.param(value), operator));
	return self;
};

DB.day = function(name, operator, value) {
	var self = this;
	if (value === undefined) {
		value = operator;
		operator = '=';
	}
	self.options.filter.push(compare_datetype('day', name, self.param(value), operator));
	return self;
};

DB.year = function(name, operator, value) {
	var self = this;
	if (value === undefined) {
		value = operator;
		operator = '=';
	}
	self.options.filter.push(compare_datetype('year', name, self.param(value), operator));
	return self;
};

DB.hour = function(name, operator, value) {
	var self = this;
	if (value === undefined) {
		value = operator;
		operator = '=';
	}
	self.options.filter.push(compare_datetype('hour', name, self.param(value), operator));
	return self;
};

DB.minute = function(name, operator, value) {
	var self = this;
	if (value === undefined) {
		value = operator;
		operator = '=';
	}
	self.options.filter.push(compare_datetype('minute', name, self.param(value), operator));
	return self;
};

DB.search = function(name, value, where) {
	var self = this;
	var paramindex = self.param(value);
	self.options.filter.push('func.search(doc.' + name.replace(REG_NULLABLE, '?.') + ',arg.params[' + paramindex + ']' + (where == 'beg' ? ',1' : where == 'end' ? ',2' : '') + ')');
	return self;
};

DB.contains = function(name) {
	var self = this;
	self.options.filter.push('(doc.{0} instanceof Array?!!doc.{0}.length:!!doc.{0})'.format(name.replace(REG_NULLABLE, '?.')));
	return self;
};

DB.empty = function(name) {
	var self = this;
	self.options.filter.push('(doc.{0} instanceof Array?!doc.{0}.length:!doc.{0})'.format(name.replace(REG_NULLABLE, '?.')));
	return self;
};

function compare_datetype(type, key, paramindex, operator) {
	switch (operator) {
		case '=':
			operator = '==';
			break;
		case '<>':
			operator = '!=';
			break;
	}
	switch (type) {
		case 'day':
			type = 'getDate()';
			break;
		case 'month':
			type = 'getMonth()+1';
			break;
		case 'year':
			type = 'getFullYear()';
			break;
		case 'hour':
			type = 'getHour()';
			break;
		case 'minute':
			type = 'getMinute()';
			break;
	}
	return 'doc.{0}&&doc.{0}.getTime?doc.{0}.{3}{2}arg.params[{1}]:false'.format(key.replace(REG_NULLABLE, '?.'), paramindex, operator, type);
}

// Converting values
var convert = function(value, type) {

	if (type === undefined || type === String)
		return value;

	if (type === Number)
		return value.trim().parseFloat();

	if (type === Date) {
		value = value.trim();
		if (value.indexOf(' ') !== -1)
			return NOW.add('-' + value);
		if (value.length < 8) {
			var tmp;
			var index = value.indexOf('-');
			if (index !== -1) {
				tmp = value.split('-');
				value = NOW.getFullYear() + '-' + (tmp[0].length > 1 ? '' : '0') + tmp[0] + '-' + (tmp[1].length > 1 ? '' : '0') + tmp[1];
			} else {
				index = value.indexOf('.');
				if (index !== -1) {
					tmp = value.split('.');
					value = NOW.getFullYear() + '-' + (tmp[1].length > 1 ? '' : '0') + tmp[0] + '-' + (tmp[0].length > 1 ? '' : '0') + tmp[1];
				} else {
					index = value.indexOf(':');
					if (index !== -1) {
						// hours
					} else if (value.length <= 4) {
						value = +value;
						return value || 0;
					}
				}
			}
		}

		return value.trim().parseDate();
	}

	if (type === Boolean)
		return value.trim().parseBoolean();

	return value;
};

DB.gridfields = function(fields, allowed) {

	var self = this;
	var count = 0;
	var newfields = [];

	fields = fields.replace(REG_FIELDS_CLEANER, '').split(',');

	if (allowed)
		allowed = allowed.split(',');

	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		var can = !allowed;
		if (!can) {
			for (var j = 0; j < allowed.length; j++) {
				if (allowed[j] === field) {
					can = true;
					break;
				}
			}
		}
		if (can) {
			newfields.push(fields[i]);
			count++;
		}
	}

	if (!count)
		self.options.fields = newfields.join(',');

	return self;
};

// Grid filtering
DB.gridfilter = function(name, obj, type, key) {

	var builder = this;
	var value = obj[name] || '';

	if (!value)
		return builder;

	var arr, val;

	if (!key)
		key = name;

	// Between
	var index = value.indexOf(' - ');
	if (index !== -1) {

		arr = value.split(' - ');

		for (var i = 0, length = arr.length; i < length; i++) {
			var item = arr[i].trim();
			arr[i] = convert(item, type);
		}

		if (type === Date) {
			if (typeof(arr[0]) === 'number') {
				arr[0] = new Date(arr[0], 1, 1, 0, 0, 0);
				arr[1] = new Date(arr[1], 11, 31, 23, 59, 59);
			} else
				arr[1] = arr[1].extend('23:59:59');
		}

		return builder.between(key, arr[0], arr[1]);
	}

	// Multiple values
	index = value.indexOf(',');
	if (index !== -1) {

		var arr = value.split(',');

		if (type === undefined || type === String) {
			builder.or(function() {
				for (var i = 0; i < arr.length; i++) {
					var item = arr[i].trim();
					builder.search(key, item);
				}
			});
			return builder;
		}

		for (var i = 0, length = arr.length; i < length; i++)
			arr[i] = convert(arr[i], type);

		return builder.in(key, arr);
	}

	if (type === undefined || type === String)
		return builder.search(key, value);

	if (type === Date) {

		if (value === 'yesterday')
			val = NOW.add('-1 day');
		else if (value === 'today')
			val = NOW;
		else
			val = convert(value, type);

		if (typeof(val) === 'number') {
			if (val > 1000)
				return builder.year(key, val);
			else
				return builder.month(key, val);
		}

		if (!(val instanceof Date) || !val.getTime())
			val = NOW;

		return builder.between(key, val.extend('00:00:00'), val.extend('23:59:59'));
	}

	return builder.where(key, convert(value, type));
};

DB.sort = DB.gridsort = function(sort) {
	var self = this;
	self.options.sort = sort;
	return self;
};

DB.autofill = function($, allowedfields, skipfilter, defsort, maxlimit) {

	if (typeof(defsort) === 'number') {
		maxlimit = defsort;
		defsort = null;
	}

	var self = this;
	var query = $.query || $.options;
	var schema = $.schema;
	var skipped;
	var allowed;
	var key;
	var tmp;

	if (skipfilter) {
		key = 'NDB_' + skipfilter;
		skipped = CACHE[key];
		if (!skipped) {
			tmp = skipfilter.split(',').trim();
			var obj = {};
			for (var i = 0; i < tmp.length; i++)
				obj[tmp[i]] = 1;
			skipped = CACHE[key] = obj;
		}
	}

	if (allowedfields) {
		key = 'NDB_' + allowedfields;
		allowed = CACHE[key];
		if (!allowed) {
			var obj = {};
			var arr = [];
			var filter = [];
			tmp = allowedfields.split(',').trim();
			for (var i = 0; i < tmp.length; i++) {
				var k = tmp[i].split(':').trim();
				obj[k[0]] = 1;
				arr.push(k[0]);
				k[1] && filter.push({ name: k[0], type: (k[1] || '').toLowerCase() });
			}
			allowed = CACHE[key] = { keys: arr, meta: obj, filter: filter };
		}
	}

	var fields = query.fields;
	var fieldscount = 0;
	var newfields = [];

	if (fields) {
		fields = fields.replace(REG_FIELDS_CLEANER, '').split(',');
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			if (allowed && allowed.meta[field]) {
				newfields.push(fields[i]);
				fieldscount++;
			} else if (schema.schema[field]) {
				if (skipped && skipped[field])
					continue;
				newfields.push(field);
				fieldscount++;
			}
		}
	}

	if (!fieldscount) {
		if (allowed) {
			for (var i = 0; i < allowed.keys.length; i++)
				newfields.push(allowed.keys[i]);
		}
		if (schema.fields) {
			for (var i = 0; i < schema.fields.length; i++) {
				if (skipped && skipped[schema.fields[i]])
					continue;
				newfields.push(schema.fields[i]);
			}
		}
	}

	self.options.fields = newfields.join(',');

	if (allowed && allowed.filter) {
		for (var i = 0; i < allowed.filter.length; i++) {
			tmp = allowed.filter[i];
			self.gridfilter(tmp.name, query, tmp.type);
		}
	}

	if (schema.fields) {
		for (var i = 0; i < schema.fields.length; i++) {
			var name = schema.fields[i];
			if ((!skipped || !skipped[name]) && query[name]) {
				var field = schema.schema[name];
				var type = 'string';
				switch (field.type) {
					case 2:
						type = 'number';
						break;
					case 4:
						type = 'boolean';
						break;
					case 5:
						type = 'date';
						break;
				}
				self.gridfilter(name, query, type);
			}
		}
	}

	if (query.sort) {

		var sort = query.sort.split(',');
		var sortvalue = '';

		for (var i = 0; i < sort.length; i++) {
			var index = sort[i].lastIndexOf('_');
			var name = index > 1 ? sort[i].substring(0, index) : sort[i];

			if (skipped && skipped[name])
				continue;

			if (allowed) {
				if (!allowed.meta[name] && !schema.schema[name])
					continue;
			} else if (!schema.schema[name])
				continue;

			sortvalue += (sortvalue ? ',' : '') + sort[i];
		}

		if (!sortvalue && defsort)
			sortvalue = defsort;

		if (sortvalue)
			self.sort(sortvalue);

	} else if (defsort)
		self.sort(defsort);

	self.paginate(query.page, query.limit, maxlimit || 50);
	return self;
};

DB.autoquery = function(query, schema, defsort, maxlimit, localized) {

	var self = this;
	var skipped;
	var key = 'QBF' + schema;
	var allowed = CACHE[key];
	var tmp;

	if (!allowed) {
		var obj = {};
		var arr = [];
		var filter = [];

		if (localized)
			localized = localized.split(',');

		tmp = schema.split(',').trim();
		for (var i = 0; i < tmp.length; i++) {
			var k = tmp[i].split(':').trim();
			obj[k[0]] = 1;

			if (localized && localized.indexOf(k[0]) !== -1)
				arr.push(k[0] + '§');
			else
				arr.push(k[0]);

			k[1] && filter.push({ name: k[0], type: (k[1] || 'string').toLowerCase() });
		}

		allowed = CACHE[key] = { keys: arr, meta: obj, filter: filter };
	}

	var fields = query.fields;
	var fieldscount = 0;
	var newfields = [];

	if (fields) {
		fields = fields.replace(REG_FIELDS_CLEANER, '').split(',');
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
			if (allowed && allowed.meta[field]) {
				newfields.push(fields[i]);
				fieldscount++;
			}
		}
	}

	if (!fieldscount) {
		for (var i = 0; i < allowed.keys.length; i++)
			newfields.push(allowed.keys[i]);
	}

	self.options.fields = newfields.join(',');

	if (allowed && allowed.filter) {
		for (var i = 0; i < allowed.filter.length; i++) {
			tmp = allowed.filter[i];
			self.gridfilter(tmp.name, query, tmp.type);
		}
	}

	if (query.sort) {

		tmp = query.sort.split(',');
		var count = 0;

		for (var i = 0; i < tmp.length; i++) {
			var index = tmp[i].lastIndexOf('_');
			var name = index === - 1 ? tmp[i] : tmp[i].substring(0, index);

			if (skipped && skipped[name])
				continue;

			if (!allowed.meta[name])
				continue;

			self.sort(name, tmp[i][index + 1] === 'd');
			count++;
		}

		if (!count && defsort)
			self.gridsort(defsort);

	} else if (defsort)
		self.gridsort(defsort);

	maxlimit && self.paginate(query.page, query.limit, maxlimit);
	return self;
};

DB.relation = function(name, id) {
	this.options.relation = [name, id];
	return this;
};

DB.join = function(field, db, type) {
	var self = this;
	var builder = new DatabaseBuilder();
	builder.command = 'find';
	builder.parent = self;
	if (!self.options.join)
		self.options.join = [];
	self.options.join.push({ field: field, db: db, type: type === 'inner' ? 2 : 1, options: builder.options });
	return builder;
};

DB.on = function(a, b) {
	var index = this.param(0);
	this.options.filter.push('!!(doc.' + a + '==null?false:arg.params[' + index + '].has(doc.' + a + '))');
	this.options.on = [a, b, index];
	return this;
};

DB.asynchandler = function() {
	var self = this;
	return function(err, response) {
		if (err)
			self.$.invalid(err);
		else
			self.$resolve(response);
	};
};

function promise(fn) {
	var self = this;
	return new Promise(function(resolve, reject) {
		self.callback(function(err, result) {
			if (err)
				reject(err);
			else
				resolve(fn == null ? result : fn(result));
		});
	});
}

DB.promise = promise;

exports.make = function(type, name, onetime, schema, fork) {
	return new Database(type, name, onetime, schema, fork);
};

exports.makebuilder = function() {
	return new DatabaseBuilder();
};

ON('service', function(counter) {
	if (counter % 10 === 0)
		CACHE = {};
});
