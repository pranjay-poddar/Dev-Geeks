const DButils = require('./textdb-utils');

function TextReader(builder) {
	var self = this;
	self.ts = Date.now();
	self.cancelable = true;
	self.builders = [];
	self.canceled = 0;
	self.total = 0;
	if (builder) {
		self.add(builder);
		self.prepare();
	}
}

TextReader.prototype.add = function(builder) {
	var self = this;
	if (builder instanceof Array) {
		for (var i = 0; i < builder.length; i++)
			self.add(builder[i]);
	} else {
		builder.$TextReader = self;
		if (builder.$sort)
			self.cancelable = false;
		self.builders.push(builder);
	}
	return self;
};

TextReader.prototype.compare2 = function(docs, custom, done) {

	var self = this;

	for (var i = 0; i < docs.length; i++) {

		var doc = docs[i];
		if (doc === EMPTYOBJECT)
			continue;

		if (self.builders.length === self.canceled) {
			self.total = 0;
			return false;
		}

		self.total++;
		var is = false;

		for (var j = 0; j < self.builders.length; j++) {

			var builder = self.builders[j];
			if (builder.canceled)
				continue;

			builder.scanned++;

			var can = false;

			try {
				can = builder.filterrule(doc, builder.filterarg, builder.tmp, builder.func);
			} catch (e) {
				can = false;
				builder.canceled = true;
				builder.error = e + '';
			}

			if (can) {

				builder.count++;

				if (!builder.$sort && ((builder.$skip && builder.$skip >= builder.count) || (builder.$take && builder.$take <= builder.counter)))
					continue;

				if (!is)
					is = true;

				builder.counter++;

				var canceled = builder.canceled;
				var c = custom(docs, doc, i, builder, j);

				if (builder.$take === 1) {
					builder.canceled = true;
					self.canceled++;
				} else if (!canceled && builder.canceled)
					self.canceled++;

				if (c === 1)
					break;
				else
					continue;
			}
		}

		is && done && done(docs, doc, i, self.builders);
	}
};

// For FILEDB
TextReader.prototype.compare3 = function(docs, custom) {

	var self = this;
	var changed = false;

	for (var i = 0; i < docs.length; i++) {

		var doc = docs[i];
		if (doc === EMPTYOBJECT)
			continue;

		if (self.builders.length === self.canceled) {
			self.total = 0;
			return 0;
		}

		self.total++;

		for (var j = 0; j < self.builders.length; j++) {

			var builder = self.builders[j];
			if (builder.canceled)
				continue;

			builder.scanned++;

			var can = false;

			try {
				can = builder.filterrule(doc, builder.filterarg, builder.tmp, builder.func);
			} catch (e) {
				can = false;
				builder.canceled = true;
				builder.error = e + '';
			}

			if (can) {

				builder.count++;

				if (!builder.$sort && ((builder.$skip && builder.$skip >= builder.count) || (builder.$take && builder.$take <= builder.counter)))
					continue;

				if (!changed)
					changed = true;

				builder.counter++;

				var canceled = builder.canceled;
				var c = custom(docs, doc, i, builder, j);

				if (builder.$take === 1) {
					builder.canceled = true;
					self.canceled++;
				} else if (!canceled && builder.canceled)
					self.canceled++;

				if (c === 1)
					break;
				else
					continue;
			}
		}
	}

	return changed ? 2 : 1;
};

TextReader.prototype.compare = function(docs) {

	var self = this;
	self.total += docs.length;

	for (var i = 0; i < docs.length; i++) {
		var doc = docs[i];

		if (self.builders.length === self.canceled) {
			self.total = 0;
			return false;
		}

		for (var j = 0; j < self.builders.length; j++) {

			var builder = self.builders[j];
			if (builder.canceled)
				continue;

			builder.scanned++;

			var is = false;

			try {
				is = builder.filterrule(doc, builder.filterarg, builder.tmp, builder.func);
			} catch (e) {
				is = false;
				builder.canceled = true;
				builder.error = e + '';
			}

			if (is) {

				builder.count++;

				if (builder.scalarrule) {
					builder.counter++;
					try {
						builder.scalarrule(doc, builder.scalararg, builder.tmp, builder.func);
					} catch (e) {
						builder.canceled = true;
						builder.error = e + '';
					}
					continue;
				}

				if (!builder.$sort && (!builder.joins || builder.leftonly) && ((builder.$skip && builder.$skip >= builder.count) || (builder.$take && builder.$take <= builder.counter)))
					continue;

				builder.counter++;
				builder.push(doc);

				if (self.cancelable && !builder.$sort && !builder.$paginate && builder.response.length === builder.$take) {
					builder.canceled = true;
					self.canceled++;
				}
			}
		}
	}
};

TextReader.prototype.comparereverse = function(docs) {

	var self = this;

	self.total += docs.length;

	for (var i = docs.length - 1; i > -1; i--) {

		var doc = docs[i];

		if (self.builders.length === self.canceled) {
			self.total = 0;
			return false;
		}

		for (var j = 0; j < self.builders.length; j++) {

			var builder = self.builders[j];
			if (builder.canceled)
				continue;

			builder.scanned++;

			var is = false;

			try {
				is = builder.filterrule(doc, builder.filterarg, builder.tmp, builder.func);
			} catch (e) {
				is = false;
				builder.canceled = true;
				builder.error = e + '';
			}

			if (is) {

				builder.count++;

				if (builder.scalarrule) {
					builder.counter++;
					try {
						builder.scalarrule(doc, builder.scalararg, builder.tmp, builder.func);
					} catch (e) {
						builder.canceled = true;
						builder.error = e + '';
					}
					continue;
				}

				if (!builder.$sort && (!builder.joins || builder.leftonly) && ((builder.$skip && builder.$skip >= builder.count) || (builder.$take && builder.$take <= builder.counter)))
					continue;

				builder.counter++;
				builder.push(doc);

				if (self.cancelable && !builder.$sort && builder.response.length === builder.$take) {
					builder.canceled = true;
					self.canceled++;
				}
			}
		}
	}
};

TextReader.prototype.callback = function(builder) {
	var self = this;

	if (builder.$sort && !builder.$sorted)
		DButils.sortfinal(builder);

	if ((!builder.joins || builder.leftonly) && builder.$sort && builder.$take2 && builder.response.length >= builder.$take) {
		if (builder.$skip)
			builder.response = builder.response.splice(builder.$skip, builder.$take);
		else
			builder.response = builder.response.splice(0, builder.$take);
	}

	for (var i = 0; i < builder.response.length; i++)
		builder.response[i] = builder.prepare(builder.response[i]);

	builder.logrule && builder.logrule();
	builder.done();
	return self;
};

TextReader.prototype.prepare = function() {
	var self = this;
	for (var i = 0; i < self.builders.length; i++) {
		var builder = self.builders[i];
		if (builder.$take)
			builder.$take2 = builder.$sort ? ((builder.$skip || 1) + builder.$take) : builder.$take;
		else
			builder.$take2 = 0;
	}
	return self;
};

TextReader.prototype.done = function() {

	var self = this;
	var diff = Date.now() - self.ts;

	if (self.db && self.db.duration) {
		if (self.total > 0)
			self.db.total = self.total;
		if (self.db.duration.push({ type: self.type, duration: diff }) > 20)
			self.db.duration.shift();
	}

	for (var i = 0; i < self.builders.length; i++) {
		var builder = self.builders[i];
		builder.duration = diff;
		builder.inmemory = self.inmemory;
		self.callback(builder);
	}

	self.diff = diff;
	self.canceled = 0;
	return self;
};

exports.make = function(builder) {
	return new TextReader(builder);
};