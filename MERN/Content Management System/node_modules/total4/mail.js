const Net = require('net');
const Tls = require('tls');
const Fs = require('fs');

const CRLF = '\r\n';
const REG_ESMTP = /\besmtp\b/i;
const REG_STATE = /\d+/;
const REG_WINLINE = /\r\n/g;
const REG_NEWLINE = /\n/g;
const REG_AUTH = /(AUTH LOGIN|AUTH PLAIN|PLAIN LOGIN|XOAUTH2|XOAUTH)/i;
const REG_TLS = /TLS/;
const REG_STARTTLS = /STARTTLS/;
const EMPTYARRAY = [];

var INDEXSENDER = 0;
var INDEXATTACHMENT = 0;

if (!global.framework_utils)
	global.framework_utils = require('./utils');

const BUF_CRLF = Buffer.from(CRLF);
const CONCAT = [null, null];

var CONNECTIONS = {};

function Mailer() {
	this.debug = false;
	this.Message = Message;
	this.Mail = Message;
	this.connections = {};
	this.$events = {};
}

Mailer.prototype.emit = function(name, a, b, c, d, e, f, g) {
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

Mailer.prototype.on = function(name, fn) {
	if (this.$events[name])
		this.$events[name].push(fn);
	else
		this.$events[name] = [fn];
	return this;
};

Mailer.prototype.once = function(name, fn) {
	fn.$once = true;
	return this.on(name, fn);
};

Mailer.prototype.removeListener = function(name, fn) {
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

Mailer.prototype.removeAllListeners = function(name) {
	if (name)
		this.$events[name] = undefined;
	else
		this.$events = {};
	return this;
};

/**
 * Create Mail Message
 * @param {String} subject
 * @param {String} body
 * @return {MailMessage}
 */
Mailer.prototype.create = function(subject, body) {
	return new Message(subject, body);
};

/**
 * Message send callback
 * @callback ResolveMxCallback
 * @param {Error} err Error handling.
 * @param {Socket} socket Net socket.
 */

/**
 * Mail Message
 * @param {String} subject
 * @param {String} body
 * @property {String} subject
 * @property {String} body
 */
function Message(subject, body) {
	var t = this;
	t.subject = subject || '';
	t.body = body || '';
	t.type = 'html';
	t.files;
	t.address_to = [];
	t.address_reply;
	t.address_cc;
	t.address_bcc;
	t.address_from = { name: '', address: '' };
	t.closed = false;
	t.tls = false;
	t.$callback;
	// Supports (but it's hidden):
	// t.headers;
	// t.$unsubscribe;
}

Message.prototype.preview = function(val) {
	this.$preview = val;
	return this;
};

Message.prototype.unsubscribe = function(url) {
	var tmp = url.substring(0, 6);
	this.$unsubscribe = url ? (tmp === 'http:/' || tmp === 'https:' ? '<' + url + '>' : '<mailto:' + url + '>') : null;
	return this;
};

Message.prototype.callback = function(fn) {
	this.$callback = fn;
	return this;
};

Message.prototype.sender = function(address, name) {
	return this.from(address, name);
};

Message.prototype.from = function(address, name) {

	if (address[address.length - 1] === '>') {
		var index = address.indexOf('<');
		name = address.substring(0, index - 1);
		address = address.substring(index + 1, address.length - 1);
	}

	this.address_from.name = name || '';
	this.address_from.address = address;
	return this;
};

Message.prototype.high = function() {
	this.$priority = 1;
	return this;
};

Message.prototype.low = function() {
	this.$priority = 5;
	return this;
};

Message.prototype.confidential = function() {
	this.$confidential = true;
	return this;
};

Message.prototype.to = function(address, name, clear) {

	if (typeof(name) === 'boolean') {
		clear = name;
		name = undefined;
	}

	if (address[address.length - 1] === '>') {
		var index = address.indexOf('<');
		name = address.substring(0, index - 1);
		address = address.substring(index + 1, address.length - 1);
	}

	if (clear)
		this.address_to = [];

	if (name)
		this.address_to.push({ email: address, name: name });
	else
		this.address_to.push(address);

	return this;
};

Message.prototype.cc = function(address, name, clear) {

	if (typeof(name) === 'boolean') {
		clear = name;
		name = undefined;
	}

	if (address[address.length - 1] === '>') {
		var index = address.indexOf('<');
		name = address.substring(0, index - 1);
		address = address.substring(index + 1, address.length - 1);
	}

	if (clear || !this.address_cc)
		this.address_cc = [];

	if (name)
		this.address_cc.push({ email: address, name: name });
	else
		this.address_cc.push(address);

	return this;
};

Message.prototype.bcc = function(address, clear) {
	if (clear || !this.address_bcc)
		this.address_bcc = [];
	this.address_bcc.push(address);
	return this;
};

Message.prototype.reply = function(address, clear) {
	if (clear || !this.address_reply)
		this.address_reply = [];
	this.address_reply.push(address);
	return this;
};

Message.prototype.attachment = function(filename, name, contentid) {
	!name && (name = framework_utils.getName(filename));
	var extension = framework_utils.getExtension(name);

	var obj = {};
	obj.name = name;
	obj.filename = filename;
	obj.type = framework_utils.getContentType(extension);
	obj.extension = extension;

	if (contentid) {
		obj.disposition = 'inline';
		obj.contentid = contentid;
	}

	!this.files && (this.files = []);
	this.files.push(obj);
	return this;
};

Message.prototype.attachmentfs = function(storagename, id, name, contentid) {

	var extension;
	var type;

	if (name) {
		extension = framework_utils.getExtension(name);
		type = framework_utils.getContentType(extension);
	}

	var obj = {};
	obj.storage = storagename;
	obj.name = name;
	obj.filename = id;
	obj.type = type;
	obj.extension = extension;

	if (contentid) {
		obj.disposition = 'inline';
		obj.contentid = contentid;
	}

	!this.files && (this.files = []);
	this.files.push(obj);
	return this;
};

/**
 * Clears a timeout for sending emails (if the email is sent through the DEF.onMail)
 * @return {Message}
 */
Message.prototype.manually = function() {
	this.$sending && clearImmediate(this.$sending);
	return this;
};

/**
 * Adds an inline attachment.
 * Inline attachments are exactly like normal attachments except that they are represented with the 'Content-ID' (cid)
 * which can be referenced in the email's html body. For example an inline attachments (image) with a contentId of 'AB435BH'
 * can be used inside the html body as "<img src='cid:AB435BH'>". An enabled web client then can render and show the embedded image.
 *
 * @param {String} filename Filename with extension (e.g. '/local/path/123.jpg')
 * @param {String} name the optional filename (e.g. '123.jpg')
 * @param {String} contentId the Content-ID (e.g. 'AB435BH'), must be unique across the email
 * @returns {Message}
 */
Message.prototype.attachment = function(filename, name, contentid) {
	!name && (name = framework_utils.getName(filename));
	!this.files && (this.files = []);
	var extension = framework_utils.getExtension(name);
	this.files.push({ name: name, filename: filename, type: framework_utils.getContentType(extension), disposition: 'inline', contentid: contentid, extension: extension });
	return this;
};

Message.prototype.send2 = function(callback) {

	var self = this;

	if (CONF.allow_totalapi && CONF.mail_api) {

		var data = {};

		data.to = [];

		for (var m of self.address_to)
			data.to.push(m instanceof Object ? m.email : m);

		if (self.address_cc && self.address_cc.length) {
			data.cc = [];
			for (var m of self.address_cc)
				data.cc.push(m instanceof Object ? m.email : m);
		}

		if (self.address_bcc && self.address_bcc.length) {
			data.bcc = [];
			for (var m of self.address_bcc)
				data.bcc.push(m instanceof Object ? m.email : m);
		}

		if (self.address_reply && self.address_reply.length) {
			data.reply = [];
			for (var m of self.address_reply)
				data.reply.push(m instanceof Object ? m.email : m);
		}

		data.from = self.from.email;
		data.subject = self.subject;
		data.type = self.type;
		data.body = self.body;
		data.priority = self.$priotity;
		data.unsubscribe = self.$unsubscribe;
		data.confidential = self.$confidential;

		TotalAPI(CONF.mail_api === true || CONF.mail_api === 1 ? (CONF.totalapi || CONF.secret_totalapi) : CONF.mail_api, 'mail', data, callback || NOOP);
		return;
	}

	var opt = F.temporary.mail_settings;
	if (!opt) {
		var config = CONF.mail_smtp_options;
		config && (opt = config);
		F.temporary.mail_settings = opt || {};
		for (var key in CONNECTIONS)
			mailer.destroy(CONNECTIONS[key]);
	}

	// Computes a hostname
	if (!CONF.mail_smtp) {
		var ea = (self.address_from.address || self.address_from) || '';
		if (typeof(ea) !== 'string' || !ea)
			throw new Error('Missing SMTP settings');
		ea = ea.substring(ea.lastIndexOf('@') + 1);
		if (ea)
			ea = 'smtp.' + ea;
		CONF.mail_smtp = ea;
	}

	// self.$callback2 = callback;
	mailer.send(CONF.mail_smtp, opt, self, callback, F.port ? CONF.mail_smtp_keepalive : false);
	return self;
};

Message.prototype.send = function(smtp, options, callback, cache) {
	this.$callback2 = callback;
	mailer.send(smtp, options, this, null, cache);
	return this;
};

Mailer.prototype.switchToTLS = function(obj, options) {

	var self = this;

	obj.tls = true;
	obj.socket.removeAllListeners();

	var opt = framework_utils.copy(options.tls, { socket: obj.socket, host: obj.socket.$host, ciphers: 'SSLv3' });
	obj.socket2 = Tls.connect(opt, () => self.$send(obj, options, true));

	obj.socket2.on('error', function(err) {
		mailer.destroy(obj);
		self.closed = true;
		self.callback && self.callback(err);
		self.callback = null;
		if (obj.try || err.stack.indexOf('ECONNRESET') !== -1)
			return;
		mailer.$events.error && mailer.emit('error', err, obj);
	});

	obj.socket2.on('clientError', function(err) {
		mailer.destroy(obj);
		self.callback && self.callback(err);
		self.callback = null;
		mailer.$events.error && !obj.try && mailer.emit('error', err, obj);
	});

	obj.socket2.on('connect', () => !options.secure && self.$send(obj, options));
};

Mailer.prototype.destroy = function(obj) {

	if (obj.destroyed)
		return this;

	obj.destroyed = true;
	obj.closed = true;

	if (obj.socket) {
		obj.socket.removeAllListeners();
		obj.socket.end();
		obj.socket.destroy();
		obj.socket = null;
	}

	if (obj.socket2) {
		obj.socket2.removeAllListeners();
		obj.socket2.end();
		obj.socket2.destroy();
		obj.socket2 = null;
	}

	if (obj === CONNECTIONS[obj.smtp])
		delete CONNECTIONS[obj.smtp];

	delete this.connections[obj.id];
	return this;
};

const ATTACHMENT_SO = { encoding: 'base64' };

Mailer.prototype.$writeattachment = function(obj) {

	var attachment = obj.files ? obj.files.shift() : false;
	if (!attachment) {

		mailer.$writeline(obj, '--' + obj.boundary + '--', '', '.');

		if (obj.callback) {
			obj.callback(null, obj.instance);
			obj.callback = null;
		}

		if (obj.messagecallback) {
			obj.messagecallback(null, obj.instance);
			obj.messagecallback = null;
		}

		if (obj.messagecallback2) {
			obj.messagecallback2(null, obj.instance);
			obj.messagecallback2 = null;
		}

		return this;
	}

	var stream;

	if (attachment.storage) {
		FILESTORAGE(attachment.storage).readbase64(attachment.filename, function(err, meta) {
			if (err) {
				F.error(err, 'Mail.filestorage()', attachment.filename);
				mailer.$writeattachment(obj);
			} else {

				if (!attachment.name) {
					attachment.name = meta.name;
					attachment.type = meta.type;
					attachment.extension = meta.ext;
				}

				writeattachemnt_stream(attachment, obj, meta.stream);
			}
		});
	} else {
		F.stats.performance.open++;
		stream = Fs.createReadStream(attachment.filename, ATTACHMENT_SO);
		writeattachemnt_stream(attachment, obj, stream);
	}

	return this;
};

function writeattachemnt_stream(attachment, obj, stream) {

	var name = attachment.name;
	var isCalendar = attachment.extension === 'ics';
	var message = [];

	message.push('--' + obj.boundary);

	if (!isCalendar) {
		if (attachment.contentid) {
			message.push('Content-Disposition: inline; filename="' + name + '"');
			message.push('Content-ID: <' + attachment.contentid + '>');
		} else
			message.push('Content-Disposition: attachment; filename="' + name + '"');
	}

	message.push('Content-Type: ' + attachment.type + ';' + (isCalendar ? ' charset="utf-8"; method=REQUEST' : ''));
	message.push('Content-Transfer-Encoding: base64');
	message.push(CRLF);
	mailer.$writeline(obj, message.join(CRLF));

	stream.$mailer = mailer;
	stream.$mailerobj = obj;
	stream.on('data', writeattachment_data);

	CLEANUP(stream, function() {
		mailer.$writeline(obj, CRLF);
		mailer.$writeattachment(obj);
	});
}

function writeattachment_data(chunk) {

	var length = chunk.length;
	var count = 0;
	var beg = 0;

	while (count < length) {

		count += 68;

		if (count > length)
			count = length;

		this.$mailer.$writeline(this.$mailerobj, chunk.slice(beg, count).toString('base64'));
		beg = count;
	}
}

Mailer.prototype.try = function(smtp, options, callback) {
	var self = this;
	if (callback)
		return self.send(smtp, options, undefined, callback);
	else
		return new Promise((resolve, reject) => self.send(smtp, options, undefined, err => err ? reject(err) : resolve()));
};

Mailer.prototype.send2 = function(messages, callback) {

	var opt = F.temporary.mail_settings;

	if (!opt) {
		var config = CONF.mail_smtp_options;
		if (config) {
			if (typeof(config) === 'object')
				opt = config;
			else
				opt = config.toString().parseJSON();
		}

		if (!opt)
			opt = {};

		F.temporary.mail_settings = opt;
	}

	return this.send(CONF.mail_smtp, opt, messages, callback);
};

Mailer.prototype.send = function(smtp, options, messages, callback, cache) {

	if (options instanceof Array) {
		cache = callback;
		callback = messages;
		messages = options;
		options = {};
	} else if (typeof(options) === 'function') {
		cache = messages;
		callback = options;
		options = {};
	}

	if (cache && CONNECTIONS[smtp]) {

		if (messages instanceof Array) {
			var count = messages.length;
			F.stats.performance.mail += count;
			for (var i = 0; i < count; i++)
				CONNECTIONS[smtp].messages.push(messages[i]);
		} else if (messages) {
			F.stats.performance.mail++;
			CONNECTIONS[smtp].messages.push(messages);
		}

		CONNECTIONS[smtp].trytosend();
		return self;
	}

	var self = this;
	var id = 'abcdefghijkl' + (INDEXSENDER++);

	self.connections[id] = {};
	var obj = self.connections[id];

	obj.id = id;
	obj.buffer = [];
	obj.try = messages === undefined;
	obj.messages = obj.try ? EMPTYARRAY : messages instanceof Array ? messages : [messages];

	F.stats.performance.mail += obj.messages.length;

	obj.callback = callback;
	obj.closed = false;
	obj.message = null;
	obj.files = null;
	obj.count = 0;
	obj.socket;
	obj.tls = false;
	obj.date = new Date();

	if (global.NOW)
		global.NOW = obj.date;

	smtp = smtp || null;

	if (options && options.secure && !options.port)
		options.port = 465;

	options = framework_utils.copy(options, { secure: false, port: 25, user: '', password: '', timeout: 10000, tls: null, token: '' });

	if (options.secure) {
		var internal = framework_utils.copy(options);
		internal.host = smtp;
		obj.socket = Tls.connect(internal, () => mailer.$send(obj, options));
	} else
		obj.socket = Net.createConnection(options.port, smtp);

	if (!smtp)  {
		var err = new Error('No SMTP server configuration. Mail message won\'t be sent.');
		callback && callback(err);
		F.error(err, 'mail_smtp');
		return self;
	}

	if (cache) {
		obj.trytosend = function() {
			if (!obj.sending && obj.messages && obj.messages.length) {
				obj.sending = true;
				obj.buffer = [];
				mailer.$writemessage(obj, obj.buffer);
				mailer.$writeline(obj, obj.buffer.shift());
			}
		};
		obj.TS = NOW.add(cache === true ? '10 minutes' : typeof(cache) === 'number' ? (cache + ' minutes') : cache);
		CONNECTIONS[smtp] = obj;
	}

	obj.smtp = smtp;
	obj.cached = cache;
	obj.smtpoptions = options;
	obj.socket.$host = smtp;
	obj.host = smtp.substring(smtp.lastIndexOf('.', smtp.lastIndexOf('.') - 1) + 1);
	obj.socket.on('error', function(err) {
		mailer.destroy(obj);
		var is = obj.callback ? true : false;
		obj.callback && obj.callback(err);
		obj.callback = null;
		if (obj.try || err.stack.indexOf('ECONNRESET') !== -1)
			return;
		!obj.try && !is && F.error(err, 'mail_smtp', smtp);
		if (obj === CONNECTIONS[smtp])
			delete CONNECTIONS[smtp];
		mailer.$events.error && mailer.emit('error', err, obj);
	});

	obj.socket.on('clientError', function(err) {
		mailer.destroy(obj);
		!obj.try && !obj.callback && F.error(err, 'mail_smtp', smtp);
		obj.callback && obj.callback(err);
		obj.callback = null;
		if (obj === CONNECTIONS[smtp])
			delete CONNECTIONS[smtp];
		mailer.$events.error && !obj.try && mailer.emit('error', err, obj);
	});

	if (!cache) {
		obj.socket.setTimeout(options.timeout || 60000, function() {
			var err = framework_utils.httpstatus(408);
			mailer.destroy(obj);
			!obj.try && !obj.callback && F.error(err, 'mail_smtp', smtp);
			obj.callback && obj.callback(err);
			obj.callback = null;
			if (obj === CONNECTIONS[smtp])
				delete CONNECTIONS[smtp];
			mailer.$events.error && !obj.try && mailer.emit('error', err, obj);
		});
	}

	obj.sending = true;
	obj.socket.on('connect', () => !options.secure && mailer.$send(obj, options));
	return self;
};

Mailer.prototype.$writemessage = function(obj, buffer) {

	var self = this;
	var msg = obj.messages.shift();
	var message = [];

	if (global.F) {
		global.F.stats.other.mail++;
		global.F.$events.mail && EMIT('mail', msg);
	}

	var dt = obj.date.getTime();

	obj.boundary = '--totaljs' + dt + obj.count;
	obj.files = msg.files;
	obj.count++;

	message.push('MIME-Version: 1.0');
	buffer.push('MAIL FROM: <' + msg.address_from.address + '>');
	message.push('Message-ID: <total4_' + obj.date.toString(36) + '_' + (INDEXATTACHMENT++) + '_' + (INDEXATTACHMENT) + '>');

	self.$priority && message.push('X-Priority: ' + self.$priority);
	self.$confidential && message.push('Sensitivity: Company-Confidential');

	message.push('From: ' + (msg.address_from.name ? unicode_encode(msg.address_from.name) + ' <' + msg.address_from.address + '>' : msg.address_from.address));

	var length;

	if (msg.headers) {
		for (var key in msg.headers)
			message.push(key + ': ' + msg.headers[key]);
	}

	length = msg.address_to.length;

	var builder = '';
	var mail;
	var item;

	if (length) {
		for (var i = 0; i < length; i++) {
			item = msg.address_to[i];
			if (item instanceof Object)
				mail = '<' + item.email + '>';
			else
				mail = '<' + item + '>';
			buffer.push('RCPT TO: ' + mail);
			builder += (builder ? ', ' : '') + (item instanceof Object ? unicode_encode(item.name) + ' ' : '') + mail;
		}
		message.push('To: ' + builder);
		builder = '';
	}

	if (msg.address_cc) {
		length = msg.address_cc.length;
		for (var i = 0; i < length; i++) {
			item = msg.address_cc[i];
			if (item instanceof Object)
				mail = '<' + item.email  + '>';
			else
				mail = '<' + item + '>';
			buffer.push('RCPT TO: ' + mail);
			builder += (builder ? ', ' : '') + (item instanceof Object ? unicode_encode(item.name) + ' ' : '') + mail;
		}
		message.push('Cc: ' + builder);
		builder = '';
	}

	if (msg.address_bcc) {
		length = msg.address_bcc.length;
		for (var i = 0; i < length; i++)
			buffer.push('RCPT TO: <' + msg.address_bcc[i] + '>');
	}

	buffer.push('DATA');
	buffer.push('');

	message.push('Date: ' + obj.date.toUTCString());
	message.push('Subject: ' + unicode_encode(msg.subject));

	if (msg.$unsubscribe) {
		message.push('List-Unsubscribe: ' + msg.$unsubscribe);
		message.push('List-Unsubscribe-Post: List-Unsubscribe=One-Click');
	}

	if (msg.address_reply) {
		length = msg.address_reply.length;
		for (var i = 0; i < length; i++)
			builder += (builder !== '' ? ', ' : '') + '<' + msg.address_reply[i] + '>';
		message.push('Reply-To: ' + builder);
		builder = '';
	}

	message.push('Content-Type: multipart/mixed; boundary="' + obj.boundary + '"');
	message.push('');
	message.push('--' + obj.boundary);
	message.push('Content-Type: text/' + msg.type + '; charset="utf-8"');
	message.push('Content-Transfer-Encoding: base64');
	message.push('');
	message.push(prepareBASE64(Buffer.from(msg.body.replace(REG_WINLINE, '\n').replace(REG_NEWLINE, CRLF)).toString('base64')));

	// if (msg.type === 'html' && msg.$preview) {
	// 	message.push('--' + obj.boundary);
	// 	message.push('Content-Type: text/plain; charset="utf-8"; format="fixed"');
	// 	message.push('Content-Transfer-Encoding: base64');
	// 	message.push('');
	// 	message.push(prepareBASE64(Buffer.from(msg.$preview.replace(REG_WINLINE, '\n').replace(REG_NEWLINE, CRLF)).toString('base64')));
	// }

	obj.message = message.join(CRLF);
	obj.messagecallback = msg.$callback;
	obj.messagecallback2 = msg.$callback2;
	obj.instance = msg;

	message = null;
	return self;
};

Mailer.prototype.$writeline = function(obj) {

	if (obj.closed)
		return false;

	var socket = obj.socket2 ? obj.socket2 : obj.socket;

	for (var i = 1; i < arguments.length; i++) {
		var line = arguments[i];
		if (line) {
			mailer.debug && console.log('SEND', line);
			socket.write(line + CRLF);
		}
	}

	return true;
};

Mailer.prototype.$send = function(obj, options, autosend) {

	var self = this;
	var isAuthorized = false;
	var isAuthorization = false;
	var command = '';
	var auth = [];
	var socket = obj.socket2 ? obj.socket2 : obj.socket;
	var host = obj.host;
	var line = null;
	var isAttach = !options.tls || (obj.tls && options.tls);

	isAttach && mailer.$events.send && mailer.emit('send', obj);
	socket.setEncoding('utf8');

	socket.on('end', function() {
		mailer.destroy(obj);
		obj.callback && obj.callback();
		obj.callback = null;
		if (obj.cached)
			delete CONNECTIONS[obj.smtp];
		line = null;
	});

	socket.on('data', function(data) {

		if (obj.closed)
			return;

		while (true) {

			var index = data.indexOf(BUF_CRLF);
			if (index === -1) {
				if (line) {
					CONCAT[0] = line;
					CONCAT[1] = data;
					line = Buffer.concat(CONCAT);
				} else
					line = data;
				break;
			}

			var tmp = data.slice(0, index).toString('utf8');
			data = data.slice(index + BUF_CRLF.length);
			tmp && socket && socket.emit('line', tmp);
		}
	});

	socket.on('line', function(line) {

		line = line.toUpperCase();
		mailer.debug && console.log('<---', line);

		var code = +line.match(REG_STATE)[0];
		if (code === 250 && !isAuthorization) {
			if (REG_AUTH.test(line) && (options.user && (options.password || options.token))) {
				isAuthorization = true;
				if (options.token && line.indexOf('XOAUTH2') !== -1) {
					auth.push('AUTH XOAUTH2');
					auth.push(Buffer.from('user=' + options.user + '\1auth=Bearer ' + options.token + '\1\1').toString('base64'));
				} else if (line.lastIndexOf('XOAUTH') === -1) {
					auth.push('AUTH LOGIN');
					auth.push(Buffer.from(options.user).toString('base64'));
					auth.push(Buffer.from(options.password).toString('base64'));
				} else
					auth.push('AUTH PLAIN ' + Buffer.from('\0'+ options.user + '\0' + options.password).toString('base64'));
			}
		}

		// help
		if (line.substring(3, 4) === '-')
			return;

		if (!isAuthorized && isAuthorization) {
			isAuthorized = true;
			code = 334;
		}

		switch (code) {
			case 220:

				if (obj.isTLS || REG_TLS.test(line)) {
					mailer.switchToTLS(obj, options);
				} else {
					obj.secured = REG_ESMTP.test(line);
					command = options.heloid ? options.heloid : (obj.isTLS || (options.user && options.password) || obj.secured ? 'EHLO' : 'HELO');
					mailer.$writeline(obj, command + ' ' + host);
				}

				return;

			case 250: // OPERATION
			case 251: // FORWARD
			case 235: // VERIFY
			case 999: // Total.js again

				if (obj.secured && !obj.isTLS && !obj.logged && obj.smtpoptions.user && obj.smtpoptions.password) {
					// maybe TLS
					obj.isTLS = true;
					mailer.$writeline(obj, 'STARTTLS');
					return;
				}

				mailer.$writeline(obj, obj.buffer.shift());

				if (obj.buffer.length)
					return;

				// NEW MESSAGE
				if (obj.messages.length) {
					obj.buffer = [];
					mailer.$writemessage(obj, obj.buffer);
					mailer.$writeline(obj, obj.buffer.shift());
				} else {

					obj.sending = false;

					// end
					if (obj.cached)
						obj.trytosend();
					else
						mailer.$writeline(obj, 'QUIT');
				}

				return;

			case 221: // BYE

				if (!obj.cached)
					mailer.destroy(obj);

				obj.callback && obj.callback(null, obj.try ? true : obj.count);
				obj.callback = null;

				return;

			case 334: // LOGIN

				if (!self.tls && !obj.isTLS && options.tls) {
					obj.isTLS = true;
					mailer.$writeline(obj, 'STARTTLS');
					return;
				}

				var value = auth.shift();
				if (value) {
					obj.logged = true;
					mailer.$writeline(obj, value);
				} else {
					var err = new Error('Forbidden.');
					mailer.destroy(obj);
					obj.callback && obj.callback(err);
					obj.callback = null;
					mailer.$events.error && !obj.try && mailer.emit('error', err, obj);
				}

				return;

			case 354:
				mailer.$writeline(obj, obj.message);
				mailer.$writeattachment(obj);
				obj.message = null;
				return;

			default:

				if (code < 400)
					return;

				if (!obj.isTLS && code === 530 && REG_STARTTLS.test(line)) {
					obj.isTLS = true;
					mailer.$writeline(obj, 'STARTTLS');
					return;
				}

				var err = line;

				mailer.$events.error && !obj.try && mailer.emit('error', err, obj);

				if (obj.messagecallback) {
					obj.messagecallback(err, obj.instance);
					obj.messagecallback = null;
				}

				if (obj.messagecallback2) {
					obj.messagecallback2(err, obj.instance);
					obj.messagecallback2 = null;
				}

				if (obj.messages.length) {

					F.error(err, 'SMTP error');

					// a problem
					obj.buffer = [];
					obj.count--;
					socket.emit('line', '999 TRY NEXT MESSAGE');

				} else {
					mailer.destroy(obj);
					obj.callback && obj.callback(err);
					obj.callback = null;
				}

				return;
		}
	});

	autosend && self.$writeline(obj, 'EHLO ' + host);
};

Mailer.prototype.restart = function() {
	var self = this;
	self.removeAllListeners();
	self.debug = false;
	INDEXSENDER = 0;
	INDEXATTACHMENT = 0;
};

setImmediate(function() {
	ON('service', function(counter) {
		if (counter % 3 === 0) {
			for (var key in CONNECTIONS) {
				var conn = CONNECTIONS[key];
				if (conn.TS < NOW && (!conn.messages || !conn.messages.length))
					mailer.destroy(CONNECTIONS[key]);
			}
		}
	});
});

// Split Base64 to lines with 68 characters
function prepareBASE64(value) {

	var index = 0;
	var output = '';
	var length = value.length;

	while (index < length) {
		var max = index + 68;
		if (max > length)
			max = length;
		output += value.substring(index, max) + CRLF;
		index = max;
	}

	return output;
}

function unicode_encode(val) {
	return val ? '=?utf-8?B?' + Buffer.from(val.toString()).toString('base64') + '?=' : '';
}

// ======================================================
// EXPORTS
// ======================================================

var mailer = new Mailer();
module.exports = mailer;