function Counter(name) {
	var t = this;
	t.db = require('./textdb-wrapper').make('nosql', PATH.databases(name + '.counter'));
	t.cache = {};
	ON('service', function(counter) {
		if (counter % 5 === 0)
			t.flush();
	});
}

const CP = Counter.prototype;

CP.hit = function(id, value) {

	if (value == null)
		value = 1;

	var self = this;
	var key = '+' + id;
	if (self.cache[key]) {

		self.cache[key].sum += value;

		if (self.cache[key].min == null || self.cache[key].min > value)
			self.cache[key].min = value;

		if (self.cache[key].max == null || self.cache[key].max < value)
			self.cache[key].max = value;
	} else
		self.cache[key] = { sum: value, min: value, max: value };

	return self;
};

CP.flush = function() {

	var self = this;

	for (var key in self.cache) {

		var val = self.cache[key];
		var m = {};

		m.id = key.substring(1);

		m['+sum'] = val.sum;
		m['<min'] = val.min;
		m['>max'] = val.max;

		m.day = NOW.getDate();
		m.month = NOW.getMonth() + 1;
		m.year = NOW.getFullYear();
		m.ts = +NOW.format('yyyyMMdd');
		m.date = NOW;
		self.db.modify(m, true).where('id', m.id).where('ts', m.ts);
	}

	self.cache = {};
	return self;
};

CP.find = function() {
	return this.db.find();
};

CP.count = function(id, callback) {

	if (typeof(id) === 'function') {
		callback = id;
		id = null;
	}

	var self = this;
	var builder = self.find();

	builder.callback(callback);
	builder.options.scalar = 'arg.count=(arg.count?arg.count:0)+doc.sum';
	builder.options.scalararg = {};
	id && builder.id(id);
	builder.$custom = function() {
		return function(err, response, meta) {
			response = response.count || 0;
			builder.$callback && builder.$callback(err, response, meta);
		};
	};

	return builder;
};

CP.scalar = function(type, field, key, callback) {

	if (typeof(key) === 'function') {
		callback = key;
		key = null;
	} else if (typeof(field) === 'function' || !field) {
		callback = field;
		field = type;
		type = '*';
	}

	var self = this;
	var builder = self.db.scalar(type, field, key);
	callback && builder.callback(callback);
	return builder;
};

CP.daily = function(id, callback) {
	var self = this;
	var builder = self.find().callback(callback);
	builder.fields('-id');
	builder.where('id', id);
	return builder;
};

CP.monthly = function(id, callback) {
	var self = this;
	var builder = self.find();
	callback && builder.callback(callback);
	builder.options.scalar = 'tmp.id=((doc.ts)+\'\').substring(0,6);if(arg[tmp.id]){arg[tmp.id].sum+=doc.sum;if(arg[tmp.id].min>doc.min)arg[tmp.id].min=doc.min;if(arg[tmp.id].max<doc.max)arg[tmp.id].max=doc.max;arg[tmp.id].count++}else{arg[tmp.id]={count:1,sum:doc.sum,min:doc.min,max:doc.max,year:doc.year,month:doc.month,ts:+tmp.id}}';
	builder.options.scalararg = {};
	builder.where('id', id);
	builder.$custom = function() {
		return function(err, response, meta) {

			var arr = [];

			for (var key in response) {
				var item = response[key];
				item.date = key;
				arr.push(item);
			}

			response = null;
			builder.$callback && builder.$callback(err, arr, meta);
		};
	};
	return builder;
};

CP.yearly = function(id, callback) {
	var self = this;
	var builder = self.find();
	callback && builder.callback(callback);
	builder.options.scalar = 'tmp.id=((doc.ts)+\'\').substring(0,4);if(arg[tmp.id]){arg[tmp.id].sum+=doc.sum;if(arg[tmp.id].min>doc.min)arg[tmp.id].min=doc.min;if(arg[tmp.id].max<doc.max)arg[tmp.id].max=doc.max;arg[tmp.id].count++}else{arg[tmp.id]={count:1,sum:doc.sum,min:doc.min,max:doc.max,year:doc.year,ts:doc.year}}';
	builder.options.scalararg = {};
	builder.where('id', id);
	builder.$custom = function() {
		return function(err, response, meta) {

			var arr = [];

			for (var key in response) {
				var item = response[key];
				item.date = key;
				arr.push(item);
			}

			response = null;
			builder.$callback && builder.$callback(err, arr, meta);
		};
	};
	return builder;
};

CP.summarize = function(type, callback) {

	if (typeof(type) === 'function') {
		callback = type;
		type = null;
	}

	var self = this;
	var builder = self.find();
	callback && builder.callback(callback);

	switch (type) {
		case 'yearly':
			builder.options.scalar = 'tmp.ts=(doc.ts+\'\').substring(0,4);tmp.id=(tmp.ts+\'_\'+doc.id);if(arg[tmp.id]){arg[tmp.id].sum+=doc.sum;if(arg[tmp.id].min>doc.min)arg[tmp.id].min=doc.min;if(arg[tmp.id].max<doc.max)arg[tmp.id].max=doc.max;arg[tmp.id].count++}else{arg[tmp.id]={id:doc.id,count:1,sum:doc.sum,min:doc.min,max:doc.max,ts:+tmp.ts,date:tmp.ts,year:+tmp.ts}}';
			break;
		case 'monthly':
			builder.options.scalar = 'tmp.ts=(doc.ts+\'\').substring(0,6);tmp.id=(tmp.ts+\'_\'+doc.id);if(arg[tmp.id]){arg[tmp.id].sum+=doc.sum;if(arg[tmp.id].min>doc.min)arg[tmp.id].min=doc.min;if(arg[tmp.id].max<doc.max)arg[tmp.id].max=doc.max;arg[tmp.id].count++}else{arg[tmp.id]={id:doc.id,count:1,sum:doc.sum,min:doc.min,max:doc.max,ts:+tmp.ts,date:tmp.ts,year:+tmp.ts.substring(0,4),month:+tmp.ts.substring(4)}}';
			break;
		default:
			builder.options.scalar = 'if(arg[doc.id]){arg[doc.id].sum+=doc.sum;if(arg[doc.id].min>doc.min)arg[doc.id].min=doc.min;if(arg[doc.id].max<doc.max)arg[doc.id].max=doc.max;arg[doc.id].count++}else{arg[doc.id]={id:doc.id,count:1,sum:doc.sum,min:doc.min,max:doc.max}}';
			break;
	}

	builder.options.scalararg = {};
	builder.$custom = function() {
		return function(err, response, meta) {

			var arr = [];

			for (var key in response) {
				var item = response[key];
				item.date = item.ts + '';
				arr.push(item);
			}

			response = null;
			builder.$callback && builder.$callback(err, arr, meta);
		};
	};
	return builder;
};

CP.clear = function() {
	this.db.clear();
	return this;
};

CP.remove = function(id, callback) {
	var builder = this.db.remove();
	id && builder.where('id', id);
	callback && builder.callback(callback);
	return builder;
};

exports.make = function(name) {
	return new Counter(name);
};