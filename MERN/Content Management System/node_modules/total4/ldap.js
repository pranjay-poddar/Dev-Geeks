const GROWTHFACTOR = 8;

const PROTOCOL = {
	// Misc
	LDAP_VERSION_3: 0x03,
	LBER_SET: 0x31,
	LDAP_CONTROLS: 0xa0,

	// Search
	SCOPE_BASE_OBJECT: 0,
	SCOPE_ONE_LEVEL: 1,
	SCOPE_SUBTREE: 2,

	NEVER_DEREF_ALIASES: 0,
	DEREF_IN_SEARCHING: 1,
	DEREF_BASE_OBJECT: 2,
	DEREF_ALWAYS: 3,

	FILTER_AND: 0xa0,
	FILTER_OR: 0xa1,
	FILTER_NOT: 0xa2,
	FILTER_EQUALITY: 0xa3,
	FILTER_SUBSTRINGS: 0xa4,
	FILTER_GE: 0xa5,
	FILTER_LE: 0xa6,
	FILTER_PRESENT: 0x87,
	FILTER_APPROX: 0xa8,
	FILTER_EXT: 0xa9,

	// Protocol Operations
	LDAP_REQ_BIND: 0x60,
	LDAP_REQ_UNBIND: 0x42,
	LDAP_REQ_SEARCH: 0x63,
	LDAP_REQ_MODIFY: 0x66,
	LDAP_REQ_ADD: 0x68,
	LDAP_REQ_DELETE: 0x4a,
	LDAP_REQ_MODRDN: 0x6c,
	LDAP_REQ_COMPARE: 0x6e,
	LDAP_REQ_ABANDON: 0x50,
	LDAP_REQ_EXTENSION: 0x77,

	LDAP_REP_BIND: 0x61,
	LDAP_REP_SEARCH_ENTRY: 0x64,
	LDAP_REP_SEARCH_REF: 0x73,
	LDAP_REP_SEARCH: 0x65,
	LDAP_REP_MODIFY: 0x67,
	LDAP_REP_ADD: 0x69,
	LDAP_REP_DELETE: 0x6b,
	LDAP_REP_MODRDN: 0x6d,
	LDAP_REP_COMPARE: 0x6f,
	LDAP_REP_EXTENSION: 0x78
};

const TYPES = {
	EOC: 0,
	Boolean: 1,
	Integer: 2,
	BitString: 3,
	OctetString: 4,
	Null: 5,
	OID: 6,
	ObjectDescriptor: 7,
	External: 8,
	Real: 9, // float
	Enumeration: 10,
	PDV: 11,
	Utf8String: 12,
	RelativeOID: 13,
	Sequence: 16,
	Set: 17,
	NumericString: 18,
	PrintableString: 19,
	T61String: 20,
	VideotexString: 21,
	IA5String: 22,
	UTCTime: 23,
	GeneralizedTime: 24,
	GraphicString: 25,
	VisibleString: 26,
	GeneralString: 28,
	UniversalString: 29,
	CharacterString: 30,
	BMPString: 31,
	Constructor: 32,
	Context: 128
};

function Reader(buffer, callback) {

	if (buffer instanceof Array)
		buffer = Buffer.concat(buffer);

	var t = this;
	t.buffer = buffer;
	t.size = t.buffer.length;
	t.length = 0;
	t.offset = 0;
	t.response = [];
	t.callback = callback;
}

Reader.parse = function(buffer, callback) {
	var reader = new Reader(buffer, callback);
	reader.parse();
};

Reader.prototype = {
	get remain() {
		return this.size - this.offset;
	}
};

Reader.prototype.readbyte = function(peek) {

	var self = this;
	if (self.size - self.offset < 1)
		return null;

	var b = self.buffer[self.offset] & 0xff;

	if (!peek)
		self.offset += 1;

	return b;
};

Reader.prototype.readattribute = function(attr) {

	var self = this;
	self.readsequence();
	var id = self.readstring();

	if (self.peek() === PROTOCOL.LBER_SET) {

		if (self.readsequence(PROTOCOL.LBER_SET)) {
			var end = self.offset + self.length;
			while (self.offset < end) {

				var val = self.readstring(TYPES.OctetString, true);

				if (id === 'objectGUID' || id === 'objectSid')
					val = val.toString('hex');
				else
					val = val.toString('utf8');

				if (attr[id]) {
					if (!(attr[id] instanceof Array))
						attr[id] = [attr[id]];
					attr[id].push(val);
				} else
					attr[id] = val;
			}
		}
	}

	return true;
};

function slice(self, length) {
	self.buffer = self.buffer.slice(length);
	self.offset = 0;
	self.length = 0;
	if (self.buffer.length)
		self.parse();
	else
		self.finish();
}

Reader.prototype.slice = function(length) {
	var self = this;
	self.buffer = self.buffer.slice(length);
	self.offset = 0;
	self.length = 0;
	if (self.buffer.length)
		self.parse();
	else
		self.finish();
};

Reader.prototype.finish = function() {
	var self = this;
	self.callback(null, self.response);
	// PATH.fs.writeFile('users.json', JSON.stringify(self.response, null, '\t'), () => console.log(self.response.length));
};

Reader.prototype.parse = function() {

	var self = this;

	// Sequence
	self.readsequence();

	// MessageID
	self.readint();

	var type = self.readsequence();
	var length = self.offset + self.length;

	self.size = length;

	switch (type) {

		case PROTOCOL.LDAP_REP_BIND:
			var obj = {};
			obj.status = self.readenum();
			obj.dn = self.readstring();
			obj.error = self.readstring();

			if (obj.error) {
				self.callback(obj.error, null);
				return;
			}

			break;

		case PROTOCOL.LDAP_REP_SEARCH:
			var obj = {};
			obj.status = self.readenum();
			obj.dn = self.readstring();
			obj.error = self.readstring();

			if (obj.error) {
				self.callback(obj.error, null);
				return;
			}

			break;

		case PROTOCOL.LDAP_REP_SEARCH_ENTRY:
			var obj = {};
			obj.name = self.readstring();
			obj.attr = [];
			self.readsequence();
			var end = self.offset + self.length;
			var attr = {};

			while (self.offset < end)
				self.readattribute(attr);

			self.response.push(attr);
			break;
	}

	setImmediate(slice, self, length);
};

Reader.prototype.peek = function() {
	return this.readbyte(true);
};

Reader.prototype.readlength = function(offset) {

	var self = this;

	if (offset === undefined)
		offset = self.offset;

	if (offset >= self.size)
		return null;

	var lenB = self.buffer[offset++] & 0xff;
	if (lenB === null)
		return null;

	if ((lenB & 0x80) === 0x80) {

		lenB &= 0x7f;

		if (lenB === 0)
			throw new Error('Indefinite length not supported');

		if (lenB > 4)
			throw new Error('Encoding too long');

		if (self.size - offset < lenB)
			return null;

		self.length = 0;

		for (var i = 0; i < lenB; i++)
			self.length = (self.length << 8) + (self.buffer[offset++] & 0xff);

	} else {
		// Wasn't a variable length
		self.length = lenB;
	}

	return offset;
};

Reader.prototype.readsequence = function(tag) {

	var self = this;
	var seq = self.peek();
	if (seq === null)
		return null;

	if (tag !== undefined && tag !== seq)
		throw new Error('Expected 0x' + tag.toString(16) + ': got 0x' + seq.toString(16));

	var o = self.readlength(self.offset + 1);
	if (o === null)
		return null;

	self.offset = o;
	return seq;
};

Reader.prototype.readint = function () {
	return this.readtag(TYPES.Integer);
};

Reader.prototype.readboolean = function () {
	return (this.readtag(TYPES.Boolean) === 0 ? false : true);
};

Reader.prototype.readenum = function () {
	return this.readtag(TYPES.Enumeration);
};

Reader.prototype.readstring = function (tag, retbuf) {

	if (!tag)
		tag = TYPES.OctetString;

	var self = this;
	var b = self.peek();
	if (b === null)
		return null;

	if (b !== tag)
		throw new Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));

	var o = self.readlength(self.offset + 1);

	if (o === null)
		return null;

	if (self.length > self.size - o)
		return null;

	self.offset = o;

	if (self.length === 0)
		return retbuf ? Buffer.alloc(0) : '';

	var str = self.buffer.slice(self.offset, self.offset + self.length);
	self.offset += self.length;

	return retbuf ? str : str.toString('utf8');
};

Reader.prototype.readtag = function(tag) {

	var self = this;
	var b = self.peek();

	if (b === null)
		return null;

	if (b !== tag)
		throw new Error('Expected 0x' + tag.toString(16) + ': got 0x' + b.toString(16));

	var o = self.readlength(self.offset + 1); // stored in `length`
	if (o === null)
		return null;

	if (self.length > 4)
		throw new Error('Integer too long: ' + self.length);

	if (self.length > self.size - o)
		return null;

	self.offset = o;

	var fb = self.buffer[self.offset];
	var value = 0;

	for (var i = 0; i < self.length; i++) {
		value <<= 8;
		value |= (self.buffer[self.offset++] & 0xff);
	}

	if ((fb & 0x80) === 0x80 && i !== 4)
		value -= (1 << (i * 8));

	return value >> 0;
};

function Writer() {
	var t = this;
	t.buffer = Buffer.alloc(1024);
	t.size = t.buffer.length;
	t.offset = 0;
	t.seq = [];
}

Writer.prototype.writebyte = function(value) {
	var self = this;
	self.ensure(1);
	self.buffer[self.offset++] = value;
	return self;
};

Writer.prototype.writeint = function(value, tag) {

	var self = this;
	var sz = 4;

	if (!tag)
		tag = TYPES.Integer;

	while ((((value & 0xff800000) === 0) || ((value & 0xff800000) === 0xff800000 >> 0)) && (sz > 1)) {
		sz--;
		value <<= 8;
	}

	self.ensure(2 + sz);
	self.buffer[self.offset++] = tag;
	self.buffer[self.offset++] = sz;

	while (sz-- > 0) {
		self.buffer[self.offset++] = ((value & 0xff000000) >>> 24);
		value <<= 8;
	}

	return self;
};

Writer.prototype.writestring = function (value, tag) {
	var self = this;

	if (!tag)
		tag = TYPES.OctetString;

	var length = Buffer.byteLength(value);
	self.writebyte(tag);
	self.writelength(length);

	if (length) {
		self.ensure(length);
		self.buffer.write(value, self.offset);
		self.offset += length;
	}

	return self;
};

Writer.prototype.writelength = function (length) {
	var self = this;
	self.ensure(4);
	if (length <= 0x7f) {
		self.buffer[self.offset++] = length;
	} else if (length <= 0xff) {
		self.buffer[self.offset++] = 0x81;
		self.buffer[self.offset++] = length;
	} else if (length <= 0xffff) {
		self.buffer[self.offset++] = 0x82;
		self.buffer[self.offset++] = length >> 8;
		self.buffer[self.offset++] = length;
	} else if (length <= 0xffffff) {
		self.buffer[self.offset++] = 0x83;
		self.buffer[self.offset++] = length >> 16;
		self.buffer[self.offset++] = length >> 8;
		self.buffer[self.offset++] = length;
	} else
		throw Error('Length too long');
	return self;
};

Writer.prototype.ensure = function(length) {
	var self = this;
	if (self.size - self.offset < length) {
		var sz = self.size * GROWTHFACTOR;
		if (sz - self.offset < length)
			sz += length;
		var buf = Buffer.alloc(sz);
		self.buffer.copy(buf, 0, 0, self.offset);
		self.buffer = buf;
		self.size = sz;
	}
	return self;
};

Writer.prototype.begsequence = function(tag) {
	var self = this;

	if (!tag)
		tag = 48;

	self.writebyte(tag);
	self.seq.push(self.offset);
	self.ensure(3);
	self.offset += 3;
	return self;
};

Writer.prototype.endsequence = function() {
	var self = this;
	var seq = self.seq.pop();
	var start = seq + 3;
	var length = self.offset - start;
	if (length <= 0x7f) {
		self.shift(start, length, -2);
		self.buffer[seq] = length;
	} else if (length <= 0xff) {
		self.shift(start, length, -1);
		self.buffer[seq] = 0x81;
		self.buffer[seq + 1] = length;
	} else if (length <= 0xffff) {
		self.buffer[seq] = 0x82;
		self.buffer[seq + 1] = length >> 8;
		self.buffer[seq + 2] = length;
	} else if (length <= 0xffffff) {
		self.shift(start, length, 1);
		self.buffer[seq] = 0x83;
		self.buffer[seq + 1] = length >> 16;
		self.buffer[seq + 2] = length >> 8;
		self.buffer[seq + 3] = length;
	} else
		throw new Error('Sequence too long');
	return self;
};

Writer.prototype.shift = function(start, length, shift) {
	var self = this;
	self.buffer.copy(self.buffer, start + shift, start, start + length);
	self.offset += shift;
	return self;
};

Writer.prototype.output = function() {
	return this.buffer.slice(0, this.offset);
};

Writer.prototype.writeboolean = function(value, tag) {
	var self = this;
	if (!tag)
		tag = TYPES.Boolean;
	self.ensure(3);
	self.buffer[self.offset++] = tag;
	self.buffer[self.offset++] = 0x01;
	self.buffer[self.offset++] = value ? 0xff : 0x00;
	return self;
};

Writer.prototype.writeenum = function(value, tag) {
	if (!tag)
		tag = TYPES.Enumeration;
	return this.writeint(value, tag);
};

Writer.prototype.writebuffer = function(buffer, tag) {
	var self = this;
	self.writebyte(tag);
	self.writelength(buffer.length);
	self.ensure(buffer.length);
	buffer.copy(self.buffer, self.offset, 0, buffer.length);
	self.offset += buffer.length;
	return self;
};

function login(user, password) {

	var writer = new Writer();

	writer.begsequence();

	// MessageID
	writer.writeint(1);

	writer.begsequence(96);

	// version
	writer.writeint(3);

	// login
	writer.writestring(user);

	// pass
	writer.writestring(password, TYPES.Context);

	writer.endsequence();
	writer.endsequence();

	return writer.output();
}

function data(dn, filter, type) {

	var writer = new Writer();

	// === 1: beg
	writer.begsequence();

	// MessageID
	writer.writeint(1);

	// === 2: beg
	writer.begsequence(99);

	// keys lowercase
	writer.writestring(dn);

	writer.writeenum(2);        // scope
	writer.writeenum(0);        // deref aliases
	writer.writeint(0);         // size limit
	writer.writeint(10);        // time limit
	writer.writeboolean(false); // types only

	// === 3: beg
	/*
	writer.begsequence(PROTOCOL.FILTER_OR);
	var val = 'objectclass';
	for (var i = 0; i < val.length; i++)
		writer.writebyte(val.charCodeAt(i));
	writer.endsequence();*/

	writer.begsequence(PROTOCOL.FILTER_EQUALITY);
	writer.writestring(filter);
	writer.writebuffer(Buffer.from(type, 'ascii'), TYPES.OctetString);
	writer.endsequence();
	// === 3: end

	// === 4: beg
	writer.begsequence(48);

	writer.writestring('*');

	// === 4: end
	writer.endsequence();

	// === 2: end
	writer.endsequence();

	// === 1: end
	writer.endsequence();

	return writer.output();
}

function data2(dn, name) {

	var writer = new Writer();

	// === 1: beg
	writer.begsequence();

	// MessageID
	writer.writeint(1);

	// === 2: beg
	writer.begsequence(99);

	// keys lowercase
	writer.writestring(dn);

	writer.writeenum(2);        // scope
	writer.writeenum(0);        // deref aliases
	writer.writeint(0);         // size limit
	writer.writeint(10);        // time limit
	writer.writeboolean(false); // types only

	writer.begsequence(PROTOCOL.FILTER_AND);

	// === 3: beg
	writer.begsequence(PROTOCOL.FILTER_EQUALITY);
	writer.writestring('objectClass');
	writer.writebuffer(Buffer.from('person', 'ascii'), TYPES.OctetString);
	writer.endsequence();
	// === 3: end

	// === 3: beg
	writer.begsequence(PROTOCOL.FILTER_EQUALITY);
	writer.writestring('sAMAccountName');
	writer.writebuffer(Buffer.from(name, 'ascii'), TYPES.OctetString);
	writer.endsequence();
	// === 3: end

	writer.endsequence();

	// === 4: beg
	writer.begsequence(48);

	writer.writestring('*');

	// === 4: end
	writer.endsequence();

	// === 2: end
	writer.endsequence();

	// === 1: end
	writer.endsequence();

	return writer.output();
}

exports.load = function(opt, callback) {

	// opt.ldap {Object} with { host: String, port: Number }
	// opt.user {String}
	// opt.password {String}
	// opt.type {String} can be: person, group, login, profile
	// opt.login {String} required for the "profile" type
	// opt.dn {String}
	// opt.noauth {Boolean} true skips auth

	if (opt.callback)
		callback = opt.callback;

	var profile = opt.type === 'profile';

	if (!opt.dn) {
		opt.dn = opt.user;
		opt.type = 'person';
		profile = true;
	}

	U.connect(opt.ldap, function(err, meta) {

		if (err) {
			callback(err);
			return;
		}

		var buffer = [];
		var auth = true;
		var timeout;

		var parse = function() {
			Reader.parse(buffer, function(err, response) {
				callback(err, profile ? (response ? response[0] : null) : response);
				meta.close();
			});
		};

		meta.ondata(function(chunk) {
			if (auth) {
				Reader.parse(chunk, function(err) {

					if (err) {
						callback(err, profile ? null : EMPTYARRAY);
						meta.close();
						return;
					}

					try {
						meta.socket.write(opt.type === 'profile' ? data2(opt.dn, opt.login) : data(opt.dn, 'objectClass', opt.type));
					} catch (e) {
						callback(e, profile ? null : EMPTYARRAY);
						meta.close();
					}

					auth = false;
				});
			} else {
				buffer.push(chunk);
				timeout && clearTimeout(timeout);
				timeout = setTimeout(parse, 1500);
			}
		});

		meta.onend(function() {

			if (timeout)
				return;

			// No emitted any data in "ondata" handler
			Reader.parse(buffer, function(err) {
				callback(err, profile ? null : EMPTYARRAY);
			});

		});

		if (opt.noauth) {
			try {
				auth = false;
				meta.socket.write(opt.type === 'profile' ? data2(opt.dn, opt.login) : data(opt.dn, 'objectClass', opt.type));
			} catch (e) {
				callback(e, profile ? null : EMPTYARRAY);
			}
		} else {
			try {
				meta.socket.write(login(opt.user, opt.password));
			} catch (e) {
				callback(e, profile ? null : EMPTYARRAY);
			}
		}

	});
};