function Action() {
	var t = this;
	t.opt = {};
	t.$callback = function(err, value) {

		t.instance.responses.push(value || null);

		t.opt.log && t.opt.log(err, value);

		if (t.opt.id)
			t.response[t.opt.id] = value;

		var obj = {};
		obj.err = obj.error = err;
		obj.value = value;
		obj.response = t.response;
		obj.name = t.opt.name;

		if (t.opt.fail || t.opt.pass) {
			obj.throw = obj.invalid = function(e) {
				if (e)
					err = e;
			};
		}

		try {
			if (t.opt.pass) {
				t.$fail(t.opt.pass(obj) != true, obj.name, err);
			} else if (t.opt.fail) {
				t.$fail(t.opt.fail(obj) == true, obj.name, err);
			} else if (t.opt.done && !err)
				t.opt.done(value);
			else
				t.$fail(!!err, obj.name, err);
		} catch (e) {
			t.$fail(true, obj.name, e);
		}

		t.opt.callback && t.opt.callback(err, value);
		t.$next();
	};
}

Action.prototype.url = function(url) {
	this.opt.url = url;
	return this;
};

Action.prototype.fail = function(fn) {
	this.opt.fail = fn;
	return this;
};

Action.prototype.pass = function(fn) {
	this.opt.pass = fn;
	return this;
};

Action.prototype.done = function(fn) {
	this.opt.done = fn;
	return this;
};

Action.prototype.user = function(user) {
	var self = this;
	self.opt.user = user;
	return self;
};

Action.prototype.session = function(session) {
	var self = this;
	self.opt.session = session;
	return self;
};

Action.prototype.query = function(query) {
	var self = this;
	self.opt.query = query;
	return self;
};

Action.prototype.log = function(fn) {
	var self = this;
	self.opt.log = fn;
	return self;
};

Action.prototype.body = Action.prototype.data = function(body) {
	var self = this;
	self.opt.body = body;
	return self;
};

Action.prototype.callback = function(fn) {
	this.opt.callback = fn;
	return this;
};

Action.prototype.make = function(fn) {
	this.opt.make = fn;
	return this;
};

Action.prototype.id = function(id) {
	this.opt.id = id;
	return this;
};

Action.prototype.run = function() {
	var self = this;

	if (self.opt.make) {
		if (self.opt.make.call(self, self, self.response) === false) {
			self.$next();
			return;
		}
	}

	self.controller = ACTION(self.opt.url, self.opt.body, self.$callback);
	if (self.controller) {
		if (self.opt.query)
			self.controller.query = self.opt.query;
		if (self.opt.user)
			self.controller.user = self.opt.user;
		if (self.opt.session)
			self.controller.session = self.opt.session;
		self.controller.test = true;
	} else
		self.$callback(new Error('Route not found'));
};

function Test() {
	var t = this;
	t.output = { items: [], failed: 0 };
	t.pending = [];
	t.errors = 0;

	t.fail = function(is, description, err) {
		if (is) {
			t.output.failed++;
			t.errors++;
		}
		t.output.items.push({ failed: is, name: (description || t.current), error: err ? (err instanceof ErrorBuilder ? err.plain() : (err + '')) : null, ts: Date.now() - t.ts });
	};

	t.next = function() {
		t.$next && clearImmediate(t.$next);
		t.$next = null;

		var action = t.pending.shift();
		if (action) {
			t.ts = Date.now();
			t.current = action.opt.name;
			action.$fail = t.fail;
			action.$next = t.next;
			action.run();
		} else {
			t.clean && t.clean(t.errors, t.responses, t.output);
			if (t.done instanceof Controller) {
				t.done.status = t.errors ? 409 : 200;
				if (t.done.req.xhr)
					t.done.json(t.output);
				else
					t.done.view_test(t.output);
			} else if (t.done) {
				if (t.done.controller) {
					t.done.status = t.errors ? 409 : 200;
					t.done.plain(t.output);
					t.done.cancel();
				} else
					t.done(t.errors, t.output);
			} else if (t.done)
				t.done(null, t.output);
		}
	};
}

Test.prototype.add = function(url, name) {
	var self = this;
	var action = new Action();
	action.instance = self;
	action.response = self.response;
	action.opt.name = name;
	action.opt.url = url;
	self.pending.push(action);
	self.$next && clearImmediate(self.$next);
	self.$next = setImmediate(self.next);
	return action;
};

global.TEST = function(fn, done) {
	var instance = new Test();
	instance.response = {};
	instance.responses = [];
	instance.done = done;
	var add = function(url, name) {
		return instance.add(url, name);
	};
	fn && fn(add, instance.response);
	return instance;
};