if (!global.framework_utils)
	global.framework_utils = require('./utils');

const Crypto = require('crypto');
const Https = require('https');
const Http = require('http');
const Url = require('url');
const Zlib = require('zlib');
const ENCODING = 'utf8';
const WEBSOCKET_COMPRESS = Buffer.from([0x00, 0x00, 0xFF, 0xFF]);
const WEBSOCKET_COMPRESS_OPTIONS = { windowBits: Zlib.Z_DEFAULT_WINDOWBITS };
const CONCAT = [null, null];
// const KeepAlive = new Http.Agent({ keepAlive: true, timeout: 60000 });
// const KeepAliveHttps = new Https.Agent({ keepAlive: true, timeout: 60000 });

var CALLBACKS = {};
var CALLBACKSCOUNTER = 1;

function WebSocketClient() {

	var t = this;
	t.current = {};
	t.$events = {};
	t.pending = [];
	t.reconnect = 0;
	t.closed = true;

	// type: json, text, binary
	t.options = { type: 'json', masking: false, compress: true, reconnect: 3000, encodedecode: false, rejectunauthorized: false }; // key: Buffer, cert: Buffer, dhparam: Buffer
	t.cookies = {};
	t.headers = {};

	t.$ondata2 = () => t.$ondata();
}

const WebSocketClientProto = WebSocketClient.prototype;

function timeoutapi(id) {
	var obj = CALLBACKS[id];
	if (obj) {
		obj.callback(408);
		delete CALLBACKS[id];
	}
}

function closecallbacks(client, e) {
	for (var key in CALLBACKS) {
		var obj = CALLBACKS[key];
		if (obj.client === client) {
			clearTimeout(obj.timeout);
			obj.callback(e);
			delete CALLBACKS[key];
		}
	}
}

function registerapi(client) {

	if (client.$api)
		return;

	client.$api = true;
	client.on('message', function(msg) {
		if (msg.TYPE === 'api') {
			var obj = CALLBACKS[msg.callbackid];
			if (obj) {
				delete CALLBACKS[msg.callbackid];
				clearTimeout(obj.timeout);
				if (msg.error)
					obj.callback(msg.data instanceof Array ? ErrorBuilder.assign(msg.data) : msg.data);
				else
					obj.callback(null, msg.data);
			}
		}
	});

}

WebSocketClientProto.api = function(schema, data, callback, timeout) {

	var self = this;

	if (!schema) {
		registerapi(self);
		return self;
	}

	if (!self.$api)
		self.api();

	if (typeof(data) === 'function') {
		timeout = callback;
		callback = data;
		data = null;
	}

	var msg = { TYPE: 'api', data: { schema: schema, data: data }};

	if (callback) {

		msg.callbackid = (CALLBACKSCOUNTER++) + '';

		if (CALLBACKSCOUNTER > 9999999999)
			CALLBACKSCOUNTER = 1;

		var obj = {};
		obj.client = self;
		obj.callback = callback;
		obj.timeout = setTimeout(timeoutapi, timeout || 5000, msg.callbackid);
		CALLBACKS[msg.callbackid] = obj;
	}

	self.send(msg);
	return self;
};

WebSocketClientProto.connect = function(url, protocol, origin) {
	setImmediate(this.connectforce, this, url, protocol, origin);
};

WebSocketClientProto.connectforce = function(self, url, protocol, origin) {

	var options = {};
	var key = Crypto.randomBytes(16).toString('base64');

	self.url = url;
	self.origin = origin;
	self.protocol = protocol;

	delete self._isClosed;
	delete self.isClosed;

	var secured = false;

	if (typeof(url) === 'string') {
		url = Url.parse(url);
		options.host = url.hostname;
		options.path = url.path;
		options.query = url.query;
		secured = url.protocol === 'wss:';
		options.port = url.port || (secured ? 443 : 80);
	} else {
		options.socketPath = url.socket;
		options.path = url.path;
		// options.query = url.query;
	}

	options.headers = {};
	options.headers['User-Agent'] = 'Total.js/v' + F.version_header;
	options.headers['Sec-WebSocket-Version'] = '13';
	options.headers['Sec-WebSocket-Key'] = key;
	options.headers['Sec-Websocket-Extensions'] = (self.options.compress ? 'permessage-deflate, ' : '') + 'client_max_window_bits';
	protocol && (options.headers['Sec-WebSocket-Protocol'] = protocol);
	origin && (options.headers['Sec-WebSocket-Origin'] = origin);
	options.headers.Connection = 'Upgrade';
	options.headers.Upgrade = 'websocket';

	// options.agent = options.port === 443 ? KeepAliveHttps : KeepAlive;
	// options.agent = options.port === 443 ? new Https.Agent() : new Http.Agent();
	options.agent = false;

	if (self.options.key)
		options.key = self.options.key;

	if (self.options.cert)
		options.cert = self.options.cert;

	if (self.options.dhparam)
		options.dhparam = self.options.dhparam;

	if (self.options.rejectUnauthorized || self.options.rejectunauthorized)
		options.rejectUnauthorized = true;

	self.typebuffer = self.options.type === 'buffer';
	self.istext = self.options.type !== 'binary' && !self.typebuffer;

	for (k in self.headers)
		options.headers[k] = self.headers[k];

	var tmp = [];
	for (var k in self.cookies)
		tmp.push(k + '=' + self.cookies[k]);

	options.headers.Cookie = tmp.join(', ');

	F.stats.performance.online++;
	self.req = (secured ? Https : Http).get(options);
	self.req.$main = self;

	self.req.on('error', function(e) {
		self.$events.error && self.emit('error', e);
		self.$onclose();
		self.$api && closecallbacks(self, e);
		self.options.reconnectserver && reconnect_client_timer(self);
	});

	self.req.on('response', function(res) {

		self.$events.error && self.emit('error', new Error('Unexpected server response (' + res.statusCode + ')'));

		if (self.options.reconnectserver) {
			self.$onclose();
			reconnect_client_timer(self);
		}

		self.$onclose();
	});

	self.req.on('upgrade', function(response, socket) {

		self.socket = socket;
		self.socket.$websocket = self;

		var compress = self.options.compress && (response.headers['sec-websocket-extensions'] || '').indexOf('-deflate') !== -1;
		var digest = Crypto.createHash('sha1').update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11', 'binary').digest('base64');

		if (response.headers['sec-websocket-accept'] !== digest) {
			socket.destroy();
			self.closed = true;
			self.$events.error && self.emit('error', new Error('Invalid server key'), response);
			self.free();
			return;
		}

		self.closed = false;
		self.socket.on('data', websocket_ondata);
		self.socket.on('error', websocket_onerror);
		self.socket.on('close', websocket_close);
		self.socket.on('end', websocket_close);

		if (compress) {
			self.inflatepending = [];
			self.inflatelock = false;
			self.inflate = Zlib.createInflateRaw(WEBSOCKET_COMPRESS_OPTIONS);
			self.inflate.$websocket = self;
			self.inflate.on('error', F.error());
			self.inflate.on('data', websocket_inflate);
			self.deflatepending = [];
			self.deflatelock = false;
			self.deflate = Zlib.createDeflateRaw(WEBSOCKET_COMPRESS_OPTIONS);
			self.deflate.$websocket = self;
			self.deflate.on('error', F.error());
			self.deflate.on('data', websocket_deflate);
		}

		self.$events.open && self.emit('open');
	});
};

function websocket_ondata(chunk) {
	this.$websocket.$ondata(chunk);
}

function websocket_onerror(e) {
	this.$websocket.$onerror(e);
}

function websocket_close() {
	websocket_close_force(this.$websocket);
}

function reconnect_client(client) {
	client.isClosed = false;
	client._isClosed = false;
	client.$reconnecting = null;
	client.reconnect++;
	client.connect(client.url, client.protocol, client.origin);
}

function reconnect_client_timer(client) {
	if (client.options.reconnect) {
		client.$reconnecting && clearTimeout(client.$reconnecting);
		client.$reconnecting = setTimeout(reconnect_client, client.options.reconnect, client);
	}
}

function websocket_close_force(client) {
	if (!client.closed) {
		client.$events.close && client.emit('close', client.closecode, client.closemessage);
		client.closed = true;
		client.$onclose();
		reconnect_client_timer(client);
	}
}

WebSocketClientProto.emit = function(name, a, b, c, d, e, f, g) {
	var evt = this.$events[name];
	if (evt) {
		var clean = false;
		for (var i = 0, length = evt.length; i < length; i++) {
			if (evt[i].$once)
				clean = true;
			evt[i].call(this, a, b, c, d, e, f, g);
		}
		if (clean) {
			evt = evt.remove(n => n.$once);
			if (evt.length)
				this.$events[name] = evt;
			else
				this.$events[name] = undefined;
		}
	}
	return this;
};

WebSocketClientProto.on = function(name, fn) {
	if (this.$events[name])
		this.$events[name].push(fn);
	else
		this.$events[name] = [fn];
	return this;
};

WebSocketClientProto.once = function(name, fn) {
	fn.$once = true;
	return this.on(name, fn);
};

WebSocketClientProto.removeListener = function(name, fn) {
	var evt = this.$events[name];
	if (evt) {
		evt = evt.remove(n => n === fn);
		if (evt.length)
			this.$events[name] = evt;
		else
			this.$events[name] = undefined;
	}
	return this;
};

WebSocketClientProto.removeAllListeners = function(name) {
	if (name === true)
		this.$events = EMPTYOBJECT;
	else if (name)
		this.$events[name] = undefined;
	else
		this.$events = {};
	return this;
};

WebSocketClientProto.free = function() {

	var self = this;

	if (self.req) {
		self.req.connection && self.req.connection.destroy();
		self.req.removeAllListeners();
		self.req.destroy();
		CLEANUP(self.req);
	}

	if (self.socket) {
		self.socket.removeAllListeners();
		self.socket.destroy();
		CLEANUP(self.socket);
	}

	self.socket = null;
	self.req = null;
	return self;
};

/**
 * Internal handler written by Jozef Gula
 * @param {Buffer} data
 * @return {Framework}
 */
WebSocketClientProto.$ondata = function(data) {

	var self = this;

	if (self.isClosed)
		return;

	if (data)
		F.stats.performance.download += data.length / 1024 / 1024;

	var current = self.current;
	if (data) {
		if (current.buffer) {
			CONCAT[0] = current.buffer;
			CONCAT[1] = data;
			current.buffer = Buffer.concat(CONCAT);
		} else
			current.buffer = data;
	}

	if (!self.$parse())
		return;

	if (!current.final && current.type !== 0x00)
		current.type2 = current.type;

	var decompress = current.compressed && self.inflate;

	switch (current.type === 0x00 ? current.type2 : current.type) {
		case 0x01:

			// text
			if (decompress) {
				current.final && self.parseInflate();
			} else {
				if (current.body) {
					CONCAT[0] = current.body;
					CONCAT[1] = current.data;
					current.body = Buffer.concat(CONCAT);
				} else
					current.body = current.data;
				current.final && self.$decode();
			}

			break;

		case 0x02:

			// binary
			if (decompress) {
				current.final && self.parseInflate();
			} else {
				if (current.body) {
					CONCAT[0] = current.body;
					CONCAT[1] = current.data;
					current.body = Buffer.concat(CONCAT);
				} else
					current.body = current.data;
				current.final && self.$decode();
			}

			break;

		case 0x08:
			// close
			self.closemessage = current.data.slice(2).toString(ENCODING);
			self.closecode = current.data[0] << 8 | current.data[1];
			if (self.closemessage && self.options.encodedecode)
				self.closemessage = $decodeURIComponent(self.closemessage);
			self.$api && closecallbacks(self, self.closecode);
			websocket_close_force(self);
			break;

		case 0x09:
			// ping, response pong
			self.socket.write(U.getWebSocketFrame(0, 'PONG', 0x0A, false, self.options.masking));
			current.buffer = null;
			current.inflatedata = null;
			break;

		case 0x0a:
			// pong
			self.$timeout && clearTimeout(self.$timeout);
			self.$timeout = null;
			self.latency = Date.now() - self.$ping;
			current.buffer = null;
			current.inflatedata = null;
			break;
	}

	if (current.buffer) {
		current.buffer = current.buffer.slice(current.length, current.buffer.length);
		current.buffer.length && setImmediate(self.$ondata2);
	}

};

function buffer_concat(buffers, length) {
	var buffer = Buffer.alloc(length);
	var offset = 0;
	for (var i = 0, n = buffers.length; i < n; i++) {
		buffers[i].copy(buffer, offset);
		offset += buffers[i].length;
	}
	return buffer;
}

// MIT
// Written by Jozef Gula
// Optimized by Peter Sirka
WebSocketClientProto.$parse = function() {

	var self = this;
	var current = self.current;

	// Fixed a problem with parsing of long messages, the code bellow 0x80 still returns 0 when the message is longer
	// if (!current.buffer || current.buffer.length <= 2 || ((current.buffer[0] & 0x80) >> 7) !== 1)
	if (!current.buffer || current.buffer.length <= 2)
		return;

	// WebSocket - Opcode
	current.type = current.buffer[0] & 0x0f;
	current.compressed = (current.buffer[0] & 0x40) === 0x40;

	// is final message?
	current.final = ((current.buffer[0] & 0x80) >> 7) === 0x01;

	// does frame contain mask?
	current.isMask = ((current.buffer[1] & 0xfe) >> 7) === 0x01;

	// data length
	var length = U.getMessageLength(current.buffer, F.isLE);
	// index for data

	// Solving a problem with The value "-1" is invalid for option "size"
	if (length <= 0)
		return current.final;

	var index = current.buffer[1] & 0x7f;
	index = ((index === 126) ? 4 : (index === 127 ? 10 : 2)) + (current.isMask ? 4 : 0);

	// total message length (data + header)
	var mlength = index + length;

	if (this.options.length && mlength > this.options.length) {
		this.close('Frame is too large', 1009);
		return;
	}

	// Check length of data
	if (current.buffer.length < mlength)
		return;

	current.length = mlength;

	// Not Ping & Pong
	if (current.type !== 0x09 && current.type !== 0x0A) {

		// does frame contain mask?
		if (current.isMask) {
			current.mask = Buffer.alloc(4);
			current.buffer.copy(current.mask, 0, index - 4, index);
		}

		if (current.compressed && this.inflate) {

			var buf = Buffer.alloc(length);
			current.buffer.copy(buf, 0, index, mlength);

			// does frame contain mask?
			if (current.isMask) {
				for (var i = 0; i < length; i++)
					buf[i] = buf[i] ^ current.mask[i % 4];
			}

			// Does the buffer continue?
			buf.$continue = current.final === false;
			this.inflatepending.push(buf);
		} else {
			current.data = Buffer.alloc(length);
			current.buffer.copy(current.data, 0, index, mlength);
		}
	}

	return true;
};

WebSocketClientProto.$readbody = function() {
	var current = this.current;
	var length = current.data.length;
	var buf = Buffer.alloc(length);
	for (var i = 0; i < length; i++) {
		// does frame contain mask?
		if (current.isMask)
			buf[i] = current.data[i] ^ current.mask[i % 4];
		else
			buf[i] = current.data[i];
	}
	return buf;
};

WebSocketClientProto.$decode = function() {

	var data = this.current.body;
	F.stats.performance.message++;

	// Buffer
	if (this.typebuffer) {
		this.emit('message', data);
		return;
	}

	switch (this.options.type) {

		case 'binary':
		case 'buffer':
			this.emit('message', data);
			break;

		case 'json': // JSON

			if (data instanceof Buffer)
				data = data.toString(ENCODING);

			if (this.options.encodedecode === true)
				data = $decodeURIComponent(data);

			if (this.options.encrypt)
				data = framework_utils.decrypt_data(data, this.options.encrypt);

			if (data.isJSON()) {
				var tmp = data.parseJSON(true);
				if (tmp !== undefined)
					this.emit('message', tmp);
			}
			break;

		default: // TEXT
			if (data instanceof Buffer)
				data = data.toString(ENCODING);

			if (this.options.encodedecode === true)
				data = $decodeURIComponent(data);

			if (this.options.encrypt)
				data = framework_utils.decrypt_data(data, this.options.encrypt);

			this.emit('message', data);
			break;
	}

	this.current.body = null;
};

WebSocketClientProto.parseInflate = function() {
	var self = this;

	if (self.inflatelock)
		return;

	var buf = self.inflatepending.shift();
	if (buf) {
		self.inflatechunks = [];
		self.inflatechunkslength = 0;
		self.inflatelock = true;
		self.inflate.write(buf);
		!buf.$continue && self.inflate.write(Buffer.from(WEBSOCKET_COMPRESS));
		self.inflate.flush(function() {

			if (!self.inflatechunks)
				return;

			var data = buffer_concat(self.inflatechunks, self.inflatechunkslength);

			self.inflatechunks = null;
			self.inflatelock = false;


			if (self.options.length && data.length > self.options.length) {
				self.close('Frame is too large', 1009);
				return;
			}

			if (self.current.body) {
				CONCAT[0] = self.current.body;
				CONCAT[1] = data;
				self.current.body = Buffer.concat(CONCAT);
			} else
				self.current.body = data;

			if (!buf.$continue)
				self.$decode();

			self.parseInflate();
		});
	}
};

WebSocketClientProto.$onerror = function(err) {
	this.$events.error && this.emit('error', err);
	if (!this.isClosed) {
		this.$api && closecallbacks(this, err);
		this.isClosed = true;
		this.$onclose();
	}
};

WebSocketClientProto.$onclose = function() {

	var self = this;

	if (self._isClosed)
		return;

	self.isClosed = true;
	self._isClosed = true;
	F.stats.performance.online--;

	if (self.inflate) {
		self.inflate.removeAllListeners();
		self.inflate = null;
		self.inflatechunks = null;
	}

	if (self.deflate) {
		self.deflate.removeAllListeners();
		self.deflate = null;
		self.deflatechunks = null;
	}

	self.free();
};

WebSocketClientProto.destroy = function() {
	var self = this;
	self.free();
	self.options.reconnect = 0;
	self.$reconnecting && clearTimeout(self.$reconnecting);
	self.$events.destroy && self.emit('destroy');
	self.$events = null;
};

/**
 * Sends a message
 * @param {String/Object} message
 * @param {Boolean} raw The message won't be converted e.g. to JSON.
 * @return {WebSocketClient}
 */
WebSocketClientProto.send = function(message, raw, replacer) {

	var self = this;

	if (self.isClosed || self.closed)
		return false;

	var type = self.options.type;

	if (self.istext) {

		var data = type === 'json' ? (raw ? message : JSON.stringify(message, replacer == true ? framework_utils.json2replacer : replacer)) : typeof(message) === 'object' ? JSON.stringify(message, replacer == true ? framework_utils.json2replacer : replacer) : (message + '');
		var buffer;

		if (self.options.encrypt)
			data = framework_utils.encrypt_data(data, self.options.encrypt);

		if (self.options.encodedecode === true && data)
			data = encodeURIComponent(data);

		if (self.deflate) {
			buffer = Buffer.from(data, ENCODING);
			self.deflatepending.push(buffer);
			self.sendDeflate();
		} else {
			buffer = Buffer.from(data, ENCODING);
			self.socket.write(U.getWebSocketFrame(0, buffer, 0x01, false, self.options.masking));
		}

		F.stats.performance.upload += buffer.length / 1024 / 1024;

	} else if (message) {

		if (!(message instanceof Buffer))
			message = Buffer.from(message, ENCODING);

		if (self.deflate) {
			self.deflatepending.push(message);
			self.sendDeflate();
		} else
			self.socket.write(U.getWebSocketFrame(0, message, 0x02, false, self.options.masking));

		F.stats.performance.upload += message.length / 1024 / 1024;
	}

	F.stats.response.websocket++;
	return true;
};

/**
 * Sends a message
 * @param {String/Object} message
 * @param {Boolean} raw The message won't be converted e.g. to JSON.
 * @return {WebSocketClient}
 */
WebSocketClientProto.sendcustom = function(type, message) {

	if (this.isClosed || this.closed || !this.socket)
		return false;

	if (this.istext) {
		var data = (message == null ? '' : message) + '';
		if (self.options.encrypt)
			data = framework_utils.encrypt_data(data, self.options.encrypt);
		if (this.options.encodedecode && data)
			data = encodeURIComponent(data);
		if (this.deflate) {
			this.deflatepending.push(Buffer.from(data));
			this.sendDeflate();
		} else
			this.socket.write(U.getWebSocketFrame(0, data, 0x01, false, self.options.masking));
	} else {

		if (!(message instanceof Buffer))
			message = Buffer.from(message);

		if (this.deflate) {
			this.deflatepending.push(message);
			this.sendDeflate();
		} else
			this.socket.write(U.getWebSocketFrame(0, message, 0x02, false, self.options.masking));
	}

	return true;
};

WebSocketClientProto.sendDeflate = function() {
	var self = this;

	if (self.deflatelock)
		return;

	var buf = self.deflatepending.shift();
	if (buf) {
		self.deflatechunks = [];
		self.deflatechunkslength = 0;
		self.deflatelock = true;
		self.deflate.write(buf);
		self.deflate.flush(function() {
			if (self.deflatechunks) {
				var data = buffer_concat(self.deflatechunks, self.deflatechunkslength);
				data = data.slice(0, data.length - 4);
				self.deflatelock = false;
				self.deflatechunks = null;
				if (self.socket) {
					self.socket.write(U.getWebSocketFrame(0, data, self.type === 1 ? 0x02 : 0x01, true, self.options.masking));
					self.sendDeflate();
				}
			}
		});
	}
};

function websockettimeout(self) {
	self.$timeout = null;
	self.$onerror('Timeout');
}

/**
 * Ping message
 * @return {WebSocketClient}
 */
WebSocketClientProto.ping = function(timeout) {
	var self = this;
	if (!self.isClosed && !self.$timeout) {
		self.$timeout = setTimeout(websockettimeout, timeout || 3000);
		self.socket.write(U.getWebSocketFrame(0, 'PING', 0x09, false, self.options.masking));
		self.$ping = Date.now();
	}
	return self;
};

function websocket_inflate(data) {
	this.$websocket.inflatechunks.push(data);
	this.$websocket.inflatechunkslength += data.length;
}

function websocket_deflate(data) {
	this.$websocket.deflatechunks.push(data);
	this.$websocket.deflatechunkslength += data.length;
}

/**
 * Close connection
 * @param {String} message Message.
 * @param {Number} code WebSocket code.
 * @return {WebSocketClient}
 */
WebSocketClientProto.close = function(message, code) {
	var self = this;

	if (typeof(message) === 'number') {
		var tmp = code;
		code = message;
		message = tmp;
	}

	if (message !== true) {
		self.options.reconnect = 0;
		self.$reconnecting && clearTimeout(self.$reconnecting);
		self.$reconnecting = null;
	} else
		message = undefined;

	if (!self.isClosed && self.socket) {
		self.isClosed = true;
		if (message && self.options.encodedecode)
			message = encodeURIComponent(message);
		self.socket.end(U.getWebSocketFrame(code || 1000, message || '', 0x08, false, self.options.masking));
	}

	return self;
};

function $decodeURIComponent(value) {
	try
	{
		return decodeURIComponent(value);
	} catch (e) {
		return value;
	}
}

exports.create = function() {
	return new WebSocketClient();
};