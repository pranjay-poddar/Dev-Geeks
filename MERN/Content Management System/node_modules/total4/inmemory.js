const QueryBuilder = require('./textdb-builder').QueryBuilder;
const TextReader = require('./textdb-reader');
const Fs = require('fs');

function InMemory(name) {
	var t = this;

	t.items = [];
	t.pending_update = [];
	t.pending_append = [];
	t.pending_reader = [];
	t.pending_remove = [];
	t.pending_reader2 = [];
	t.pending_streamer = [];
	t.pending_clear = [];
	t.filename = name;
	t.clone = true;

	try {
		t.items = JSON.parse(Fs.readFileSync(t.filename), jsonparser);
	} catch (e) {}
}

const IM = InMemory.prototype;

function next_operation(self, type) {
	self.next(type);
}

IM.next = function() {

	if (this.pending_clear.length)
		this.$clear();

	if (this.pending_drops)
		this.$drop();

	if (this.pending_count)
		this.$count();

	if (this.pending_append.length)
		this.$append();

	if (this.pending_update.length)
		this.$update();

	if (this.pending_remove.length)
		this.$remove();

	if (this.pending_reader.length)
		this.$reader();

	if (this.pending_reader2.length)
		this.$reader2();

	if (this.pending_streamer.length)
		this.$streamer();

};

IM.find = function(builder) {
	var self = this;
	if (builder instanceof QueryBuilder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader.push(builder);
	setImmediate(next_operation, self, 4);
	return builder;
};

IM.find2 = function(builder) {
	var self = this;
	if (builder instanceof QueryBuilder)
		builder.db = self;
	else
		builder = new QueryBuilder(self);
	self.pending_reader2.push(builder);
	setImmediate(next_operation, self, 11);
	return builder;
};

IM.stream = function(fn, arg, callback) {
	var self = this;

	if (typeof(arg) === 'function') {
		callback = arg;
		arg = null;
	}

	self.pending_streamer.push({ fn: fn, callback: callback, arg: arg || {} });
	setImmediate(next_operation, self, 10);
	return self;
};

IM.insert = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_append.push(builder);
	setImmediate(next_operation, self, 1);
	return builder;
};

IM.update = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_update.push(builder);
	setImmediate(next_operation, self, 2);
	return builder;
};

IM.remove = function() {
	var self = this;
	var builder = new QueryBuilder(self);
	self.pending_remove.push(builder);
	setImmediate(next_operation, self, 3);
	return builder;
};

IM.$append = function() {
	var self = this;
	if (self.pending_append.length) {
		var arr = self.pending_append.splice(0);
		for (var i = 0; i < arr.length; i++) {
			var builder = arr[i];
			self.items.push(JSON.parse(JSON.stringify(builder.payload), jsonparser));
			builder.response = builder.counter = builder.count = 1;
			builder.logrule && builder.logrule();
			builder.done();
		}
		self.flush2();
	}
};

IM.$update = function() {

	var self = this;

	if (!self.pending_update.length)
		return self;

	var filter = self.pending_update.splice(0);
	var filters = TextReader.make();
	var count = 0;

	filters.type = 'update';
	filters.db = self;

	for (var i = 0; i < filter.length; i++)
		filters.add(filter[i], true);

	var update = function(docs, doc, dindex, f) {
		try {
			count++;
			f.modifyrule(docs[dindex], f.modifyarg);
			// f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
		} catch (e) {
			f.canceled = true;
			f.error = e + '';
		}
	};

	filters.compare2(self.items, update);

	for (var i = 0; i < filters.builders.length; i++) {
		var builder = filters.builders[i];
		builder.logrule && builder.logrule();
		builder.done();
	}

	count && self.flush2();
	return self;
};

IM.$reader = function() {

	var self = this;

	if (!self.pending_reader.length)
		return self;

	var filters = TextReader.make(self.pending_reader.splice(0));
	filters.type = 'read';
	filters.db = self;
	filters.cancelable = false;
	filters.compare(self.items);
	filters.done();
};

IM.$reader2 = function() {

	var self = this;
	self.step = 11;

	if (!self.pending_reader2.length) {
		self.next(0);
		return self;
	}

	var filters = TextReader.make(self.pending_reader2.splice(0));
	filters.type = 'readreverse';
	filters.db = self;

	var items = self.items.slice(0);
	items.reverse();

	filters.compare(self.items);
	filters.done();
};

IM.$streamer = function() {

	var self = this;
	if (!self.pending_streamer.length)
		return self;

	var filter = self.pending_streamer.splice(0);
	var length = filter.length;
	var count = 0;

	for (var j = 0; j < self.items.length; j++) {
		var json = self.items[j];
		count++;
		for (var i = 0; i < length; i++)
			filter[i].fn(json, filter[i].arg, count);
	}

	for (var i = 0; i < length; i++)
		filter[i].callback && filter[i].callback(null, filter[i].arg, count);
};

IM.$remove = function() {

	var self = this;

	if (!self.pending_remove.length)
		return;

	var filter = self.pending_remove.splice(0);
	var filters = TextReader.make(filter);
	var removed = [];
	var count = 0;

	filters.type = 'remove';
	filters.db = self;

	var remove = function(docs, d) {
		count++;
		removed.push(d);
		filters.total--;
		// f.backuprule && f.backuprule(fs.docsbuffer[dindex].doc);
		return 1;
	};

	filters.compare2(self.items, remove);

	for (var i = 0; i < removed.length; i++) {
		var index = self.items.indexOf(removed[i]);
		if (index !== -1)
			self.items.splice(index, 1);
	}

	filters.done();
	count && self.flush2();
};

IM.$clear = function() {

	var self = this;

	if (!self.pending_clear.length)
		return;

	self.items = [];

	var filter = self.pending_clear.splice(0);
	for (var i = 0; i < filter.length; i++)
		filter[i]();
};

IM.flush = function() {
	var self = this;
	Fs.writeFile(self.filename, JSON.stringify(self.items), ERROR('inmemory'));
};

function flush_in_memory(self) {
	self.flushingcount = 0;
	self.flushing = null;
	self.flush();
}

IM.flush2 = function() {
	var self = this;
	self.flushingcount++;
	if (self.flushingcount < 100)
		self.flushing && clearTimeout(self.flushing);
	self.flushing = setTimeout(flush_in_memory, 5000, self);
};

exports.load = function(name) {
	return new InMemory(name);
};

function jsonparser(key, value) {
	return typeof(value) === 'string' && value.isJSONDate() ? new Date(value) : value;
}