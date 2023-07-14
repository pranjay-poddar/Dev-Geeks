if (!global.framework_utils)
	global.framework_utils = require('./utils');

const BLACKLISTID = { paused: 1, groups: 1, tabs: 1 };
const REG_ARGS = /\{{1,2}[a-z0-9_.-\s]+\}{1,2}/gi;
const D = '__';

function Message() {
	this.ismessage = true;
	this.cloned = 0;
}

Message.prototype = {

	get user() {
		return this.controller ? this.controller.user : null;
	},

	get session() {
		return this.controller ? this.controller.session : null;
	},

	get sessionid() {
		return this.controller && this.controller ? this.controller.req.sessionid : null;
	},

	get language() {
		return (this.controller ? this.controller.language : '') || '';
	},

	get ip() {
		return this.controller ? this.controller.ip : null;
	},

	get req() {
		return this.controller ? this.controller.req : null;
	},

	get res() {
		return this.controller ? this.controller.res : null;
	},

	get params() {
		return this.controller ? this.controller.params : null;
	},

	get files() {
		return this.controller ? this.controller.files : null;
	},

	get body() {
		return this.controller ? this.controller.body : null;
	},

	get query() {
		return this.controller ? this.controller.query : null;
	},

	get headers() {
		return this.controller && this.controller.req ? this.controller.req.headers : null;
	},

	get ua() {
		return this.controller && this.controller.req ? this.controller.req.ua : null;
	}
};

var MP = Message.prototype;

MP.emit = function(name, a, b, c, d, e, f, g) {

	var self = this;

	if (!self.$events)
		return self;

	var evt = self.$events[name];
	if (evt) {

		var clean = false;

		for (var e of evt) {
			if (e.once)
				clean = true;
			e.fn.call(self, a, b, c, d, e, f, g);
		}

		if (clean) {
			var index = 0;
			while (true) {
				if (!evt[index])
					break;
				if (evt[index].once)
					evt.splice(index, 1);
				else
					index++;
			}
			self.$events[name] = evt.length ? evt : undefined;
		}
	}

	return self;
};

MP.resume = function() {
	sendmessage(this.to, this, this.$emitevent, true);
};

MP.emit2 = function(name, a, b, c, d, e, f, g) {

	var self = this;

	if (!self.$events)
		return self;

	var evt = self.$events[name];
	if (evt) {

		var clean = false;

		for (var e of evt) {
			if (e.cloned < self.cloned) {
				if (e.once)
					clean = true;
				e.fn.call(self, a, b, c, d, e, f, g);
			}
		}

		if (clean) {
			var index = 0;
			while (true) {
				var e = evt[index];
				if (!e)
					break;
				if (e.cloned < self.cloned) {
					if (e.once)
						evt.splice(index, 1);
					else
						index++;
				} else
					index++;
			}
			self.$events[name] = evt.length ? evt : undefined;
		}
	}

	return self;
};

MP.on = function(name, fn, once) {
	var self = this;
	if (!self.$events)
		self.$events = {};
	var obj = { cloned: self.cloned, fn: fn, once: once };
	if (self.$events[name])
		self.$events[name].push(obj);
	else
		self.$events[name] = [obj];
	return self;
};

MP.once = function(name, fn) {
	return this.on(name, fn, true);
};

MP.removeListener = function(name, fn) {
	var self = this;
	if (self.$events) {
		var evt = self.$events[name];
		if (evt) {
			evt = evt.remove(n => n.fn === fn);
			self.$events[name] = evt.length ? evt : undefined;
		}
	}
	return self;
};

MP.removeAllListeners = function(name) {
	var self = this;
	if (self.$events) {
		if (name === true)
			self.$events = {};
		else if (name)
			self.$events[name] = undefined;
		else
			self.$events = {};
	}
	return self;
};

MP.clone = function() {

	var self = this;
	var obj = new Message();
	obj.previd = self.id;
	obj.$events = self.$events;
	obj.duration = self.duration;
	obj.repo = self.repo;
	obj.vars = self.vars;
	obj.main = self.main;
	obj.refs = self.refs;
	obj.count = self.count;
	obj.data = self.data;
	obj.used = self.used;
	obj.processed = 0;
	obj.controller = self.controller;
	obj.cloned = self.cloned + 1;
	obj.$timeoutidtotal = self.$timeoutidtotal;
	obj.color = self.color;

	if (obj.refs.pending)
		obj.refs.pending++;
	else
		obj.refs.pending = 1;

	// additional custom variables
	obj.uid = self.uid;
	obj.reference = self.reference;
	obj.ref = self.ref;

	if (obj.$events && obj.$events.timeout) {
		var index = 0;
		while (true) {
			var e = obj.$events.timeout[index];
			if (e) {
				if ((e.cloned + 1) < obj.cloned)
					obj.$events.timeout.splice(index, 1);
				else
					index++;
			} else
				break;
		}
	}

	if (self.$timeoutid) {
		clearTimeout(self.$timeoutid);
		self.$timeoutid = null;
	}

	return obj;
};

MP.status = function(a, b, c, d) {
	this.instance.status(a, b, c, d);
	return this;
};

MP.dashboard = function(a, b, c, d) {
	this.instance.dashboard(a, b, c, d);
	return this;
};

MP.debug = function(a, b, c, d) {
	this.instance.debug(a, b, c, d);
	return this;
};

MP.throw = function(a, b, c, d) {
	this.error = a;
	this.instance.throw(a, b, c, d);
	return this;
};

function variables(str, data, encoding) {

	if (typeof(str) === 'object') {
		var obj = {};
		for (var key in str) {
			var val = str[key];
			if (typeof(val) === 'string')
				obj[key] = variables.call(this, val, data, encoding);
			else
				obj[key] = val;
		}
		return obj;
	}

	if (typeof(str) !== 'string' || str.indexOf('{') === -1)
		return str;

	var main = this.main;

	if (data == null || data == true)
		data = this;

	return str.replace(REG_ARGS, function(text) {

		var l = text[1] === '{' ? 2 : 1;
		var key = text.substring(l, text.length - l).trim();
		var val = null;

		if (main.variables)
			val = main.variables[key];

		if (!val && main.variables2)
			val = main.variables2[key];

		if (!val && main.secrets)
			val = main.secrets[key];

		if (!val && key === 'hostname') {
			val = (main.$schema.origin || '') + (main.$schema.proxypath || '');
			if (val[val.length - 1] === '/')
				val = val.substring(0, val.length - 1);
		}

		var customencoding = typeof(encoding) === 'function';

		if (!val && data != null && typeof(data) === 'object') {
			var nested = key.indexOf('.') !== -1;
			val = nested ? U.get(data, key) : data[key];
		}

		if (customencoding) {

			val = encoding(val, key);

		} else {

			if (encoding !== 'json') {
				if (val instanceof Date)
					val = val.format();
			}

			switch (encoding) {
				case 'urlencoded':
				case 'url':
					val = encodeURIComponent(val);
					break;
				case 'json':
					val = JSON.stringify(val);
					break;
				case 'querify':
					val = QUERIFY(val).substring(1);
					break;
			}
		}

		return val == null ? text : val;

	});
}

MP.replace = MP.variables = function(str, data, encoding) {
	return variables.call(this, str, data, encoding);
};

function timeouthandler(msg) {
	msg.error = 408;
	msg.$events.timeout && msg.emit('timeout', msg);
	msg.$events.timeout2 && msg.emit('timeout2', msg);
	msg.end();
}

MP.send = function(outputindex, data, clonedata) {

	var self = this;

	if (self.isdestroyed || self.main.paused || (self.instance && self.instance.isdestroyed)) {
		if (!self.isdestroyed)
			self.destroy();
		return 0;
	}

	var outputs;
	var count = 0;

	if (outputindex == null) {

		if (self.instance.connections) {
			for (var key in self.instance.connections)
				count += self.send(key);
		}

		if (!count)
			self.destroy();

		return count;
	}

	var meta = self.main.meta;
	var now = Date.now();

	outputs = self.instance.connections ? (self.instance.connections[outputindex] || EMPTYARRAY) : EMPTYARRAY;

	if (self.processed === 0) {
		self.processed = 1;
		self.main.stats.pending--;

		if (self.main.stats.pending < 0)
			self.main.stats.pending = 0;

		self.instance.stats.pending--;

		if (self.instance.stats.pending < 0)
			self.instance.stats.pending = 0;

		self.instance.stats.output++;
		self.instance.stats.duration = now - self.ts;
	}

	if (!self.main.$can(false, self.instance.id, outputindex)) {
		self.destroy();
		return count;
	}

	var tid = self.toid + D + outputindex + (self.color || '');

	if (self.main.stats.traffic[tid]) {
		self.main.stats.traffic[tid]++;
	} else {
		self.main.stats.traffic[tid] = 1;
		self.main.stats.traffic.priority.push(tid);
	}

	if (self.transformation === '1')
		self.transformation = '_' + tid;

	for (var i = 0; i < outputs.length; i++) {
		var output = outputs[i];

		if (output.disabled || output.paused)
			continue;

		var schema = meta.flow[output.id];
		if (schema && (schema.message || schema['message_' + output.index]) && schema.component && schema.ready && self.main.$can(true, output.id, output.index)) {
			var next = meta.components[schema.component];
			if (next && next.connected && !next.isdestroyed && !next.disabled) {

				if (output.color && self.color && self.color !== output.color)
					continue;

				var inputindex = output.index;
				var message = self.clone();

				if (data)
					message.data = data;

				if (clonedata && message.data && typeof(message.data) === 'object') {
					if (message.data instanceof Buffer) {
						var buf = Buffer.alloc(message.data.length);
						buf.copy(message.data);
						message.data = buf;
					} else
						message.data = CLONE(message.data);
				}

				message.used++;
				message.instance = schema;
				message.from = self.to;
				message.fromid = self.toid;
				message.fromcomponent = self.instance.component;
				message.to = schema;
				message.toid = output.id;
				message.output = outputindex;
				message.input = message.index = inputindex;
				message.tocomponent = schema.component;
				message.cache = schema.cache;
				message.ts = now;
				message.color = output.color;

				if (self.$timeout)
					message.$timeoutid = setTimeout(timeouthandler, self.$timeout, message);

				schema.stats.input++;
				schema.stats.pending++;

				self.main.stats.messages++;
				self.main.stats.pending++;
				self.main.mm++;

				if (self.$events) {
					self.$events.next && self.emit2('next', self, message);
					self.$events.something && self.emit2('something', self, message);
					self.$events.message && self.emit('message', message);
				}

				setImmediate(sendmessage, schema, message, true);
				count++;
			}
		}
	}

	if (count) {
		self.refs.pending--;
		if (self.refs.pending < 0)
			self.refs.pending = 0;
	} else
		self.destroy();

	return count;
};

MP.rewrite = function(data) {
	this.data = data;
	return this;
};

MP.totaltimeout = function(callback, time) {

	if (time == null)
		time = callback;
	else
		this.on('timeout2', callback);

	this.$timeoutidtotal && clearTimeout(this.$timeoutidtotal);
	this.$timeoutidtotal = setTimeout(timeouthandler, time, this);
	return this;
};

MP.timeout = function(callback, time) {

	if (time == null)
		time = callback;
	else
		this.on('timeout', callback);

	this.$timeout = time;
	return this;
};

MP.end = MP.destroy = function() {

	var self = this;

	if (self.isdestroyed)
		return;

	if (self.processed === 0) {
		self.processed = 1;
		self.main.stats.pending--;

		if (self.main.stats.pending < 0)
			self.main.stats.pending = 0;

		self.instance.stats.pending--;

		if (self.instance.stats.pending < 0)
			self.instance.stats.pending = 0;

		self.instance.stats.duration = Date.now() - self.ts;
		self.instance.stats.destroyed++;
	}

	if (self.$timeoutid) {
		clearTimeout(self.$timeoutid);
		self.$timeoutid = null;
	}

	if (self.$timeoutidtotal) {
		clearTimeout(self.$timeoutidtotal);
		self.$timeoutidtotal = null;
	}

	if (self.refs.pending) {
		self.refs.pending--;
		if (self.refs.pending < 0)
			self.refs.pending = 0;
	}

	if (self.$events) {
		self.$events.something && self.emit('something', self);
		self.$events.terminate && self.emit('terminate', self);
	}

	if (!self.refs.pending) {
		if (self.$events) {
			self.$events.end && self.emit('end', self);
			self.$events.destroy && self.emit('destroy', self);
		}
		if (self.main.$events)
			self.main.$events.end && self.main.emit('end', self);
	}

	self.isdestroyed = true;
	self.repo = null;
	self.main = null;
	self.middleware = null;
	self.from = null;
	self.to = null;
	self.data = null;
	self.instance = null;
	self.duration = null;
	self.ts = null;
	self.$events = null;
};

function Flow(name, errorhandler) {

	var t = this;
	t.strict = true;
	t.loading = 0;
	t.error = errorhandler || console.error;
	t.id = t.name = name;
	t.uid = Date.now().toString(36) + 'X';
	t.meta = {};
	t.meta.components = {};
	t.meta.flow = {};
	t.meta.cache = {};
	t.logger = [];
	t.middleware = [];
	t.stats = { messages: 0, pending: 0, traffic: { priority: [] }, mm: 0, minutes: 0 };
	t.mm = 0;
	t.paused = false;
	t.$events = {};

	var counter = 1;

	setImmediate(function(t) {
		if (t.interval !== 0) {
			t.$interval = setInterval(function(t) {

				var is = t.mm;

				if (counter % 20 === 0) {

					t.stats.minutes++;
					t.stats.mm = t.mm;
					t.mm = 0;
					counter = 1;

					for (var key in t.meta.flow) {
						var com = t.meta.flow[key];
						com.service && com.service(t.stats.minutes);
					}

					if (t.stats.traffic.priority.length)
						is = 1;

				} else
					counter++;

				if (counter % 10 === 0)
					global.NOW = new Date();

				t.onstats && t.onstats(t.stats);
				t.$events.stats && t.emit('stats', t.stats);

				if (is)
					t.stats.traffic = { priority: [] };

			}, t.interval || 3000, t);
		}
	}, t);

	new framework_utils.EventEmitter2(t);
}

var FP = Flow.prototype;

FP.pause = function(is) {
	var self = this;
	self.paused = is;
	for (var m in self.meta.flow) {
		var instance = self.meta.flow[m];
		if (instance && instance.pause)
			instance.pause(is);
	}
	return self;
};

FP.register = function(name, declaration, config, callback, extend) {

	var self = this;
	var type = typeof(declaration);

	if (type === 'string') {

		if (!declaration) {
			var e = new Error('Invalid component declaration');
			callback && callback(e);
			self.error(e, 'register', name);
			return;
		}

		try {
			declaration = new Function('instance', declaration);
		} catch (e) {
			callback && callback(e);
			self.error(e, 'register', name);
			return;
		}
	}

	var cache;
	var prev = self.meta.components[name];
	if (prev) {
		cache = prev.cache;
		prev.connected = false;
		prev.disabled = true;
		prev.destroy = null;
		prev.disconnect && prev.disconnect();
	}

	var curr = { id: name, main: self, connected: true, disabled: false, cache: cache || {}, config: config || {}, stats: {}, ui: {}, iscomponent: true };

	if (extend) {
		try {
			var cacheid = name;
			if (type === 'object') {
				for (var key in declaration)
					curr[key] = declaration[key];
			} else
				declaration(curr, F.require);
			curr.id = cacheid;
		} catch (e) {
			self.error(e, 'register', name);
			callback && callback(e);
			return;
		}
	} else
		curr.make = type === 'object' ? declaration.make : declaration;

	curr.config = CLONE(curr.config || curr.options);

	var errors = new ErrorBuilder();
	var done = function() {

		self.inc(-1);
		self.meta.components[name] = curr;
		self.onregister && self.onregister(curr);
		self.$events.register && self.emit('register', name, curr);
		curr.install && !prev && curr.install.call(curr, curr);

		for (var key in self.meta.flow) {
			if (!BLACKLISTID[key]) {
				var f = self.meta.flow[key];
				if (f.component === curr.id)
					self.initcomponent(key, curr);
			}
		}

		self.clean();
		callback && callback(errors.length ? errors : null);
	};

	self.inc(1);

	if (curr.npm && curr.npm.length) {
		curr.npm.wait(function(name, next) {
			NPMINSTALL(name, function(err) {
				if (err) {
					self.error(err, 'npm');
					errors.push(err);
				}
				next();
			});
		}, done);
	} else
		setImmediate(done);

	return curr;
};

FP.destroy = function() {
	var self = this;

	clearInterval(self.$interval);
	self.$interval = null;

	self.inc(1);
	self.unload(function() {
		self.inc(-1);
		self.emit('destroy');
		self.meta = null;
		self.$events = null;
		delete F.flows[self.name];
	});

};

FP.inc = function(num) {

	var self = this;

	if (num === 0)
		self.loading = 0;
	else if (num === -1)
		self.loading--;
	else
		self.loading++;

	// Assurance
	if (self.loading < 0)
		self.loading = 0;

	return self;
};

FP.cleanforce = function() {

	var self = this;

	if (!self.meta)
		return self;

	for (var key in self.meta.flow) {
		if (!BLACKLISTID[key]) {
			var instance = self.meta.flow[key];
			if (instance.connections) {

				for (var key2 in instance.connections) {

					var conns = instance.connections[key2];
					var rem = {};

					for (var conn of conns) {
						if (conn) {
							var target = self.meta.flow[conn.id];
							if (target) {
								var com = self.meta.components[target.component];
								if (com) {
									if (self.strict) {
										if (target.inputs) {
											if (!target.inputs.findItem('id', conn.index))
												rem[conn.id] = 1;
										} else if (!com.inputs || !com.inputs.findItem('id', conn.index))
											rem[conn.id] = 1;
									}
								} else
									rem[conn.id] = 1;
							} else
								rem[conn.id] = 1;
						}
					}

					var arr = conns.remove(c => c == null || rem[c.id] === 1);
					if (arr.length)
						instance.connections[key2] = arr;
					else
						delete instance.connections[key2];
				}
			}
		}
	}

	var paused = self.meta.flow.paused;
	if (paused) {
		for (var key in paused) {
			var arr = key.split(D);
			// arr[0] type
			// arr[1] id
			// arr[2] index
			if (!self.meta.flow[arr[1]])
				delete paused[key];
		}
	}

	var fn = key => self.meta.flow[key] == null;
	self.logger = self.logger.remove(fn);
	self.middleware = self.middleware.remove(fn);
	return self;
};

FP.unregister = function(name, callback) {

	var self = this;

	if (name == null) {
		Object.keys(self.meta.components).wait(function(key, next) {
			self.unregister(key, next);
		}, callback);
		return self;
	}

	var curr = self.meta.components[name];
	if (curr) {
		self.onunregister && self.onunregister(curr);
		self.$events.unregister && self.emit('unregister', name, curr);
		self.inc(1);
		Object.keys(self.meta.flow).wait(function(key, next) {

			var instance = self.meta.flow[key];
			if (instance) {
				if (instance.component === name) {
					instance.ready = false;
					try {
						instance.isdestroyed = true;
						self.ondisconnect && self.ondisconnect(instance);
						instance.close && instance.close.call(instance, true);
						instance.destroy && instance.destroy.call(instance);
					} catch (e) {
						self.onerror.call(instance, e, 'instance_close', key);
					}
					delete self.meta.flow[key];
				}
			} else
				delete self.meta.flow[key];

			next();

		}, function() {
			self.inc(-1);
			curr.connected = false;
			curr.disabled = true;
			curr.uninstall && curr.uninstall.call(curr, curr);
			curr.destroy = null;
			curr.cache = null;
			delete self.meta.components[name];
			callback && callback();
			self.clean();
		});
	} else
		callback && callback();

	return self;
};

FP.clean = function() {
	var self = this;
	if (!self.loading)
		setTimeout2(self.name, () => self.cleanforce(), 1000);
	return self;
};

/*
FP.ondisconnect = function(instance) {
};

FP.onconnect = function(instance) {
};

FP.onregister = function(component) {
};

FP.onunregister = function(component) {
};

FP.onreconfigure = function(instance, init) {

};
*/

FP.ondashboard = function(a, b, c, d) {
	// this == instance
	this.main.$events.dashboard && this.main.emit('dashboard', this, a, b, c, d);
};

FP.onstatus = function(a, b, c, d) {
	// this == instance
	this.main.$events.status && this.main.emit('status', this, a, b, c, d);
};

FP.onerror = function(a, b, c, d) {
	// this == instance
	this.main.$events.error && this.main.emit('error', this, a, b, c, d);
};

FP.ondebug = function(a, b, c, d) {
	// this == instance
	this.main.$events.debug && this.main.emit('debug', this, a, b, c, d);
};

function newlogger(callback) {

	var self = this;
	self.$logger = callback;

	var index = self.main.logger.indexOf(self.id);
	if (callback) {
		if (index === -1)
			self.main.logger.push(self.id);
	} else {
		if (index !== -1)
			self.main.logger.splice(index, 1);
	}

	return self;
}

function newmiddleware(callback) {

	var self = this;
	self.$middleware = callback;

	var index = self.main.middleware.indexOf(self.id);
	if (callback) {
		if (index === -1)
			self.main.middleware.push(self.id);
	} else {
		if (index !== -1)
			self.main.middleware.splice(index, 1);
	}

	return self;
}


function newmessage(data) {
	var self = this;
	var msg = new Message();
	msg.refs = { pending: 1 };
	msg.repo = {};
	msg.vars = {};
	msg.to = msg.instance = self;
	msg.toid = self.id;
	msg.tocomponent = self.component;
	msg.data = data instanceof Message ? data.data : data;
	msg.cloned = 0;
	msg.count = 0;
	msg.instance = self;
	msg.duration = msg.ts = Date.now();
	msg.used = 1;
	msg.main = self instanceof Flow ? self : self.main;
	msg.processed = 1;
	return msg;
}

// New transform message
function newtransform(output, data, callback) {

	if (typeof(data) === 'function') {
		callback = data;
		data = undefined;
	}

	var self = this;
	var msg = newmessage.call(self, data);

	msg.on('destroy', function($) {

		if (callback) {
			var tmp = msg.transformation;
			if (tmp && tmp !== '1') {
				if (self.main.stats.traffic[tmp]) {
					self.main.stats.traffic[tmp]++;
				} else {
					self.main.stats.traffic[tmp] = 1;
					self.main.stats.traffic.priority.push(tmp);
				}
			}

			callback($);
			callback = null;
		}

	});

	msg.transformation = '1';
	msg.send(output);
	//setImmediate(() => msg.send(output));
	//return msg;
}

FP.ontrigger = function(outputindex, data, controller, events) {

	// this == instance

	var schema = this;
	var self = schema.main;
	var count = 0;

	if (self.paused)
		return count;

	if (schema && schema.ready && schema.component && schema.connections) {
		var instance = self.meta.components[schema.component];
		if (instance && instance.connected && !instance.disabled && self.$can(false, schema.id, outputindex)) {
			var conn = schema.connections[outputindex];
			if (conn && conn.length) {

				var ts = Date.now();
				for (var i = 0; i < conn.length; i++) {

					var m = conn[i];
					var target = self.meta.flow[m.id];

					if (!target || (!target.message && !target['message_' + m.index]) || !self.$can(true, m.id, m.index))
						continue;

					var com = self.meta.components[target.component];
					if (!com)
						continue;

					if (target.isdestroyed || (data && data.instance && data.instance.isdestroyed))
						continue;

					var ismessage = data instanceof Message;
					if (ismessage && m.color && data.color && data.color !== m.color)
						continue;

					var message = ismessage ? data.clone() : new Message();

					if (ismessage) {

						if (data.isdestroyed)
							return 0;

						if (data.processed === 0) {
							data.processed = 1;

							data.main.stats.pending--;

							if (data.main.stats.pending < 0)
								data.main.stats.pending = 0;

							if (data.instance) {
								data.instance.stats.pending--;

								if (data.instance.stats.pending < 0)
									data.instance.stats.pending = 0;

								data.instance.stats.output++;
								data.instance.stats.duration = ts - self.ts;
							}
						}
					} else {
						message.refs = { pending: 1 };
						message.$events = events || {};
						message.repo = {};
						message.vars = {};
						message.data = data;
						message.duration = message.ts = ts;
						message.used = 1;
					}

					message.main = self;
					message.controller = controller;
					message.instance = target;
					message.color = m.color;

					message.from = schema;
					message.fromid = schema.id;
					message.fromcomponent = schema.component;
					message.output = outputindex;

					message.to = message.instance = target;
					message.toid = m.id;
					message.input = message.index = m.index;
					message.tocomponent = target.component;
					message.cache = target.cache;
					message.processed = 0;

					target.stats.pending++;
					target.stats.input++;
					schema.stats.output++;
					message.main.stats.pending++;
					message.main.stats.messages++;
					message.main.mm++;

					message.id = message.main.uid + message.main.stats.messages;
					message.count = message.main.stats.messages;

					if (message.fromid && !count) {
						var tid = message.fromid + D + message.output + (message.color || '');
						if (message.main.stats.traffic[tid])
							message.main.stats.traffic[tid]++;
						else {
							message.main.stats.traffic[tid] = 1;
							message.main.stats.traffic.priority.push(tid);
						}
					}

					if (ismessage && data.$timeout)
						message.$timeoutid = setTimeout(timeouthandler, data.$timeout, message);

					if (ismessage) {
						data.next && data.emit2('next', data, message);
						data.something && data.emit2('something', data, message);
						data.message && data.emit('message', message);
					}

					count++;
					setImmediate(sendmessage, target, message, true);
				}
			}
		}
	}

	return count;
};

FP.reconfigure = function(id, config, rewrite) {
	var self = this;
	var instance = self.meta.flow[id];
	if (instance && !instance.isdestroyed) {

		if (rewrite)
			instance.config = config;
		else
			U.extend(instance.config, config);

		instance.configure && instance.configure(instance.config);
		self.onreconfigure && self.onreconfigure(instance);
	}
	return !!instance;
};

FP.unload = function(callback) {
	var self = this;
	var keys = Object.keys(self.meta.flow);
	keys.wait(function(key, next) {
		var current = self.meta.flow[key];
		if (current) {
			current.isdestroyed = true;
			self.ondisconnect && self.ondisconnect(current);
			try {
				current.close && current.close.call(current, true);
				current.destroy && current.destroy.call(current);
			} catch(e) {
				self.onerror.call(current, e, 'instance_close', key);
			}
		}
		delete self.meta.flow[key];
		next();
	}, function() {
		// uninstall components
		self.unregister(null, callback);
	});
	return self;
};

FP.load = function(components, design, callback, asfile) {

	var self = this;
	if (self.loading) {
		setTimeout(() => self.load(components, design, callback), 200);
		return self;
	}

	self.loading = 10000;
	self.unload(function() {

		var keys = Object.keys(components);
		var error = new ErrorBuilder();

		keys.wait(function(key, next) {
			var body = components[key];
			if (typeof(body) === 'string' && body.indexOf('<script ') !== -1) {
				self.add(key, body, function(err) {
					err && error.push(err);
					next();
				}, asfile);
			} else {
				error.push('Invalid component: ' + key);
				next();
			}
		}, function() {

			// Loads design
			self.inc(0);
			self.use(design, function(err) {
				self.inc(0);
				err && error.push(err);
				callback && callback(err);
				self.clean();
			});

		});
	});

	return self;
};

FP.insert = function(schema, callback) {
	var self = this;
	if (callback)
		self._use(schema, callback, null, true);
	else
		return new Promise((resolve, reject) => self._use(schema, (err, res) => err ? reject(err) : resolve(res), null, true));
};

FP.remove = function(keys, callback) {
	var self = this;
	if (callback)
		self._remove(keys, callback);
	else
		return new Promise((resolve, reject) => self._remove(keys, (err, res) => err ? reject(err) : resolve(res), null, true));
};

FP._remove = function(keys, callback) {
	var self = this;

	if (!(keys instanceof Array))
		keys = Object.keys(keys);

	for (var key of keys) {

		if (BLACKLISTID[key]) {
			delete self.meta.flow[key];
			continue;
		}

		var instance = self.meta.flow[key];
		if (instance) {
			instance.ready = false;
			self.ondisconnect && self.ondisconnect(instance);
			try {
				instance.close && instance.close.call(instance, true);
				instance.destroy && instance.destroy.call(instance);
			} catch (e) {
				self.onerror.call(instance, e, 'instance_close', key);
			}
			delete self.meta.flow[key];
		}
	}

	self.clean();
	callback && callback();
};

function use(self, schema, callback, reinit, insert) {
	self._use(schema, callback, reinit, insert);
}

FP.use = function(schema, callback, reinit) {
	var self = this;
	if (callback)
		self._use(schema, callback, reinit);
	else
		return new Promise((resolve, reject) => self._use(schema, (err, res) => err ? reject(err) : resolve(res), reinit));
};

FP._use = function(schema, callback, reinit, insert) {

	var self = this;

	if (self.loading) {
		setTimeout(use, 200, self, schema, callback, reinit, insert);
		return self;
	}

	if (typeof(schema) === 'string')
		schema = schema.parseJSON(true);
	else
		schema = CLONE(schema);

	if (typeof(callback) === 'boolean') {
		var tmp = reinit;
		reinit = callback;
		callback = tmp;
	}

	// schema.COMPONENT_ID.component = 'condition';
	// schema.COMPONENT_ID.config = {};
	// schema.COMPONENT_ID.connections = { '0': [{ id: 'COMPONENT_ID', index: '2' }] }

	var err = new ErrorBuilder();

	if (schema) {

		var keys = Object.keys(schema);
		var ts = Date.now();

		if (!insert) {
			if (self.meta.flow.paused)
				delete self.meta.flow.paused;

			if (self.meta.flow.groups)
				delete self.meta.flow.groups;

			if (self.meta.flow.tabs)
				delete self.meta.flow.tabs;
		}

		self.inc(1);
		keys.wait(function(key, next) {

			if (BLACKLISTID[key]) {
				self.meta.flow[key] = schema[key];
				next();
				return;
			}

			var current = self.meta.flow[key];
			var instance = schema[key];
			var component = instance.component ? self.meta.components[instance.component] : null;

			// Component not found
			if (!component) {
				err.push(key, '"' + instance.component + '" component not found.');

				if (current) {
					current.isdestroyed = true;
					self.ondisconnect && self.ondisconnect(current);
					try {
						current.close && current.close.call(current, true);
						current.destroy && current.destroy.call(current);
					} catch (e) {
						self.onerror.call(current, e, 'instance_close', key);
					}
				}

				delete self.meta.flow[key];
				next();
				return;
			}

			var fi = self.meta.flow[key];

			if (!fi || reinit) {
				self.meta.flow[key] = instance;
				var tmp = self.initcomponent(key, component);
				if (tmp) {
					tmp.ts = ts;
					tmp.newbie = true;
				}
			} else {
				fi.connections = instance.connections;
				fi.x = instance.x;
				fi.y = instance.y;
				fi.offset = instance.offset;
				fi.size = instance.size;
				fi.tab = instance.tab;
				fi.ts = ts;
				if (JSON.stringify(fi.config) !== JSON.stringify(instance.config)) {
					U.extend(fi.config, instance.config);
					fi.configure && fi.configure(fi.config);
					self.onreconfigure && self.onreconfigure(fi, true);
				}
			}

			next();

		}, function() {

			if (!insert) {
				for (var key in self.meta.flow) {
					if (!BLACKLISTID[key]) {
						var instance = self.meta.flow[key];
						if (instance.ts !== ts) {
							instance.ready = false;
							instance.isdestroyed = true;
							self.ondisconnect && self.ondisconnect(instance);
							try {
								instance.close && instance.close.call(instance, true);
								instance.destroy && instance.destroy.call(instance);
							} catch (e) {
								self.onerror.call(instance, e, 'instance_close', key);
							}
							delete self.meta.flow[key];
						}
					}
				}
			}

			for (var key in self.meta.flow) {
				var instance = self.meta.flow[key];
				if (instance.newbie) {
					if (instance.init) {
						try {
							instance.init();
						} catch (e) {
							self.onerror.call(instance, e, 'instance_init', key);
						}
					}
					instance.newbie = false;
				}
				if (instance.refresh) {
					try {
						instance.refresh();
					} catch (e) {
						self.onerror.call(instance, e, 'instance_refresh', key);
					}
				}
			}

			self.inc(-1);

			self.cleanforce();
			self.$events.schema && self.emit('schema', self.meta.flow);
			callback && callback(err.length ? err : null);

		});

	} else {
		err.push('schema', 'Flow schema is invalid.');
		self.error(err, 'use');
		callback && callback(err);
	}

	return self;
};

FP.initcomponent = function(key, component) {

	var self = this;
	var instance = self.meta.flow[key];

	if (instance.ready) {

		// Closes old instance
		instance.ready = false;

		try {
			self.ondisconnect && self.ondisconnect(instance);
			instance.close && instance.close.call(instance);
		} catch (e) {
			self.onerror.call(instance, e, 'instance_close', key);
		}
	}

	instance.isinstance = true;
	instance.stats = { pending: 0, input: 0, output: 0, duration: 0, destroyed: 0 };
	instance.cache = {};
	instance.id = key;
	instance.module = component;
	instance.ready = false;

	if (instance.options) {
		instance.config = instance.options;
		delete instance.options;
	}

	var tmp = component.config;
	if (tmp)
		instance.config = instance.config ? U.extend(CLONE(tmp), instance.config) : CLONE(tmp);

	if (!instance.config)
		instance.config = {};

	instance.main = self;
	instance.dashboard = self.ondashboard;
	instance.status = self.onstatus;
	instance.debug = self.ondebug;
	instance.throw = self.onerror;
	instance.send = self.ontrigger;
	instance.newmessage = newmessage;
	instance.logger = newlogger;
	instance.middleware = newmiddleware;
	instance.transform = newtransform;
	instance.replace = variables;
	instance.instances = self.meta.flow;

	self.onconnect && self.onconnect(instance);

	try {
		component.make && component.make.call(instance, instance, instance.config);
	} catch (e) {
		self.error(e, 'instance_make', instance);
		return;
	}

	if (instance.open) {
		instance.open.call(instance, (function(instance) {
			return function() {
				if (instance) {
					instance.ready = true;
					delete instance.open;
				}
			};
		})(instance));
	} else
		instance.ready = true;

	// Notifies about the pause state
	if (self.paused && instance.pause)
		instance.pause(true);

	self.meta.flow[key] = instance;
	return instance;
};

function sendmessage(instance, message, event) {

	if (instance.isdestroyed || message.isdestroyed || instance.main.paused) {
		message.destroy();
		return;
	}

	if (message.middleware === undefined && instance.main.middleware.length) {
		message.middleware = instance.main.middleware.slice(0);
		if (message.middleware.length)
			message.$emitevent = event;
		else
			message.middleware = null;
	}

	if (message.middleware && message.middleware.length) {
		var mid = message.middleware.shift();
		if (mid) {
			var tmp = instance.main.meta.flow[mid];
			if (tmp && tmp.$middleware) {
				// Executes middleware
				tmp.$middleware(message);
			} else {
				// Maybe another middleware
				sendmessage(instance, message, event);
			}
			return;
		}
	}

	// Logger
	if (instance.main.logger.length) {
		var main = instance.main;
		for (var key of main.logger) {
			var tmp = main.meta.flow[key];
			if (tmp && tmp.$logger)
				tmp.$logger(message);
		}
	}

	if (event) {
		message.$events && message.$events.message && message.emit('message', message);
		message.main.$events && message.main.$events.message && message.main.emit('message', message);
	}

	try {

		var is = false;

		var key = 'message_' + message.input;

		if (instance[key]) {
			is = true;
			instance[key](message);
		}

		if (instance.message) {
			is = true;
			instance.message(message);
		}

		if (!is)
			message.destroy();

	} catch (e) {
		instance.main.error(e, 'instance_message', message);
		message.destroy();
	}
}

FP.$can = function(isinput, id, index) {
	var self = this;
	if (self.paused)
		return false;
	if (!self.meta.flow.paused)
		return true;
	var key = (isinput ? 'input' : 'output') + D + id + D + index;
	if (!self.meta.flow.paused[key])
		return true;
};

function trigger(self, path, data, controller, events) {
	self.trigger(path, data, controller, events);
}

// path = ID__INPUTINDEX
FP.trigger = function(path, data, controller, events) {

	var self = this;
	if (self.loading) {
		setTimeout(trigger, 200, self, path, data, controller, events);
		return;
	}

	if (self.paused)
		return;

	path = path.split(D);

	var inputindex = path.length === 1 ? 0 : path[1];

	var schema = self.meta.flow[path[0]];
	if (schema && schema.ready && schema.component && (schema.message || schema['message_' + inputindex])) {

		var instance = self.meta.components[schema.component];
		if (instance && instance.connected && !instance.disabled && self.$can(true, path[0], path[1])) {

			var ismessage = data instanceof Message;
			var ts = Date.now();
			var message = ismessage ? data.clone() : new Message();

			if (ismessage) {
				if (data.processed === 0) {
					data.processed = 1;
					data.main.stats.pending--;

					if (data.main.stats.pending < 0)
						data.main.stats.pending = 0;

					data.instance.stats.pending--;

					if (data.instance.stats.pending < 0)
						data.instance.stats.pending = 0;

					data.instance.stats.output++;
					data.instance.stats.duration = ts - self.ts;
				}
			} else {
				message.refs = { pending: 1 };
				message.$events = events || {};
				message.repo = {};
				message.data = data;
				message.duration = message.ts = ts;
				message.used = 1;
			}

			message.controller = controller;
			message.instance = schema;
			message.main = self;
			message.to = schema;
			message.toid = path[0];
			message.input = message.index = inputindex;
			message.tocomponent = instance.id;
			message.cache = instance.cache;
			message.processed = 0;

			schema.stats.input++;
			schema.stats.pending++;

			message.main.stats.pending++;
			message.main.stats.messages++;
			message.main.mm++;

			message.id = message.main.uid + message.main.stats.messages;
			message.count = message.main.stats.messages;

			if (message.fromid) {
				var tid = message.fromid + D + message.output + (message.color || '');
				if (message.main.stats.traffic[tid])
					message.main.stats.traffic[tid]++;
				else {
					message.main.stats.traffic[tid] = 1;
					message.main.stats.traffic.priority.push(tid);
				}
			} else {
				message.from = null;
				message.fromid = null;
				message.fromcomponent = null;
				message.output = null;
			}

			setImmediate(sendmessage, schema, message, true);
			return message;
		}
	}
};

FP.trigger2 = function(path, data, controller) {

	var self = this;

	if (self.paused)
		return;

	var events = {};
	var obj;

	path = path.split(D);

	var counter = 0;
	for (var key in self.meta.flow) {
		var flow = self.meta.flow[key];
		if (flow.component === path[0])
			obj = self.trigger(key + D + (path.length === 1 ? 0 : path[1]), data, controller, events, counter++);
	}

	return obj;
};

FP.clear = function() {
	var self = this;
	self.meta.flow = {};
	return self;
};

FP.make = function(fn) {
	var self = this;
	fn.call(self, self);
	return self;
};

FP.find = function(id) {
	return this.meta.flow[id];
};

FP.send = function(path, body) {
	var self = this;
	if (!self.paused && self.meta && self.meta.flow) {
		path = path.split(D);
		var instance = self.meta.flow[path[0]];
		if (instance)
			instance.send(path[1], body);
		return !!instance;
	}
};

FP.add = function(name, body, callback, asfile) {

	var self = this;
	var meta = body.parseComponent({ readme: '<readme>', settings: '<settings>', css: '<style>', be: '<script total>', be2: '<script node>', js: '<script>', html: '<body>', schema: '<schema>', template: '<template>' });
	var node = (meta.be || meta.be2 || '').trim().replace(/\n\t/g, '\n');

	if (!meta.be && !meta.be2) {
		var e = new Error('Invalid component content');
		self.error(e, 'add', name);
		callback && callback(e);
		return;
	}

	meta.id = name;
	meta.checksum = HASH(node).toString(36);

	var component = self.meta.components[name];
	if (component && component.ui && component.ui.checksum === meta.checksum) {
		component.ui = meta;
		component.ts = Date.now();
		callback && callback();
	} else {

		var fn;

		if (asfile) {

			var filename = PATH.temp(self.id + '_' + meta.id) + '.js';

			F.Fs.writeFile(filename, node, function(err) {

				if (err) {
					callback && callback(err);
					return;
				}

				try {

					fn = require(filename);

					delete meta.be;
					delete meta.be2;

					component = self.register(meta.id, fn, null, callback, true);

					if (component) {
						component.ui = meta;
						component.ui.raw = body;
					}

				} catch (e) {
					self.error(e, 'add', name);
					callback && callback(e);
				}

			});

			return;
		}

		try {

			fn = new Function('exports', 'require', node);

		} catch (e) {
			self.error(e, 'add', name);
			callback && callback(e);
			return null;
		}

		delete meta.be;
		delete meta.be2;
		component = self.register(meta.id, fn, null, callback, true);

		if (component)
			component.ui = meta;
		else
			return null;
	}

	component.ui.raw = body;
	return component;
};

FP.instances = function() {

	var self = this;
	var arr = [];

	for (var key in self.meta.flow) {
		if (!BLACKLISTID[key]) {
			var instance = self.meta.flow[key];
			if (instance.ready)
				arr.push(instance);
		}
	}

	return arr;
};

FP.export_instance = function(id) {

	var self = this;
	var instance = self.meta.flow[id];
	if (instance) {

		if (BLACKLISTID[id])
			return CLONE(instance);

		var tmp = {};
		tmp.x = instance.x;
		tmp.y = instance.y;
		tmp.size = instance.size;
		tmp.offset = instance.offset;
		tmp.stats = CLONE(instance.stats);
		tmp.connections = CLONE(instance.connections);
		tmp.id = instance.id;
		tmp.config = CLONE(instance.config);
		tmp.component = instance.component;
		tmp.connected = true;
		tmp.note = instance.note;
		tmp.tab = instance.tab;
		tmp.reference = instance.reference;
		tmp.meta = instance.meta;

		if (instance.outputs)
			tmp.outputs = instance.outputs;

		if (instance.inputs)
			tmp.inputs = instance.inputs;

		return tmp;
	}
};

FP.export_component = function(id) {
	var self = this;
	var com = self.meta.components[id];
	if (com) {
		var obj = {};
		obj.id = com.id;
		obj.name = com.name;
		obj.title = com.title;
		obj.meta = com.meta;
		obj.type = com.type;
		obj.css = com.ui.css;
		obj.js = com.ui.js;
		obj.icon = com.icon;
		obj.color = com.ui.color;
		obj.config = com.config;
		obj.html = com.ui.html;
		obj.readme = com.ui.readme;
		obj.template = com.ui.template;
		obj.settings = com.ui.settings;
		obj.inputs = com.inputs;
		obj.outputs = com.outputs;
		obj.group = com.group;
		obj.version = com.version;
		obj.author = com.author;
		obj.permissions = com.permissions;
		return obj;
	}
};

FP.export = function(type) {

	var self = this;

	if (type === 'components')
		return self.components(true);

	var output = {};

	for (var key in self.meta.flow)
		output[key] = self.export_instance(key);

	return output;
};

FP.components = function(prepare_export) {

	var self = this;
	var arr = [];

	for (var key in self.meta.components) {
		if (prepare_export)
			arr.push(self.export_component(key));
		else
			arr.push(self.meta.components[key]);
	}

	return arr;
};

exports.make = function(name, errorhandler) {
	return new Flow(name, errorhandler);
};

exports.prototypes = function() {
	var obj = {};
	obj.Message = Message.prototype;
	obj.FlowStream = Flow.prototype;
	return obj;
};