'use strict';

const Crypto = require('crypto');
const Fs = require('fs');
const ReadStream = Fs.ReadStream;
const Stream = require('stream');
const EMPTYARRAY = [];
const EMPTYOBJECT = {};

if (!global.framework_utils)
	global.framework_utils = require('./utils');

Object.freeze(EMPTYOBJECT);
Object.freeze(EMPTYARRAY);

global.$STRING = function(value, encode) {
	value = value != null ? (value + '') : '';
	return encode && value ? value.encode() : value;
};

const REG_1 = /[\n\r\t]+/g;
const REG_2 = /\s{2,}/g;
const REG_4 = /\n\s{2,}./g;
const REG_5 = />\n\s{1,}</g;
const REG_6 = /[<\w"\u0080-\u07ff\u0400-\u04FF]+\s{2,}[\w\u0080-\u07ff\u0400-\u04FF>]+/;
const REG_7 = /\\/g;
const REG_8 = /'/g;
const REG_9 = />\n\s+/g;
const REG_10 = /(\w|\W)\n\s+</g;
const REG_WIN = /\r/g;
const REG_BLOCK_BEG = /@\{block.*?\}/i;
const REG_BLOCK_END = /@\{end\}/i;
const REG_SKIP_1 = /\('|"/;
const REG_SKIP_2 = /,(\s)?\w+/;
const REG_COMPONENTS_GROUP = /('|")[a-z0-9_]+('|")/i;
const RENDERNOW = ['self.$import(', 'self.route', 'self.$js(', 'self.$css(', 'self.$favicon(', '$STRING(self.resource(', '$STRING(RESOURCE(', 'language', 'self.sitemap_url(', 'self.sitemap_name(', '$STRING(CONFIG(', '$STRING(config.', '$STRING(config[', '$STRING(CONF.', '$STRING(CONF[', '$STRING(config('];
const REG_NOTRANSLATE = /@\{notranslate|nolocalize\}/gi;
const REG_NOCOMPRESS = /@\{nocompress\s\w+}/gi;
const REG_TAGREMOVE = /[^>](\r)\n\s{1,}$/;
const REG_HELPERS = /helpers\.[a-z0-9A-Z_$]+\(.*?\)+/g;
const REG_SITEMAP = /\s+(sitemap_navigation\(|sitemap\()+/g;
const REG_CSS_0 = /\s{2,}|\t/g;
const REG_CSS_1 = /\n/g;
const REG_CSS_2 = /\s?\{\s{1,}/g;
const REG_CSS_3 = /\s?\}\s{1,}/g;
const REG_CSS_4 = /\s?:\s{1,}/g;
const REG_CSS_5 = /\s?;\s{1,}/g;
const REG_CSS_6 = /,\s{1,}/g;
const REG_CSS_7 = /\s\}/g;
const REG_CSS_8 = /\s\{/g;
const REG_CSS_9 = /;\}/g;
const REG_CSS_10 = /\$[a-z0-9-_]+(\s)*:.*?;/gi;
const REG_CSS_11 = /\$.*?(\s|;|\}|!)/gi;
const REG_CSS_12 = /(margin|padding):.*?(;|})/g;
const REG_CSS_13 = /#(0{6}|1{6}|2{6}|3{6}|4{6}|5{6}|6{6}|7{6}|8{6}|9{6}|0{6}|A{6}|B{6}|C{6}|D{6}|E{6}|F{6})+[\s;,)}]/gi;
const REG_CSS_14 = /\s>\s/g;
const REG_VIEW_PART = /\/\*PART.*?\*\//g;
const AUTOVENDOR = ['appearance', 'user-select', 'font-smoothing', 'text-size-adjust', 'backface-visibility'];
const ALLOWEDMARKUP = { G: 1, M: 1, R: 1, repository: 1, model: 1, CONF: 1, config: 1, global: 1, resource: 1, RESOURCE: 1, CONFIG: 1, author: 1, root: 1, functions: 1, NOW: 1, F: 1 };

global.$VIEWCACHE = [];
global.$VIEWASYNC = 0;

exports.routesplit = function(url, nolowercase) {

	var arr;

	if (!nolowercase) {
		url = url.toLowerCase();
		arr = F.temporary.other[url];
		if (arr)
			return arr;
	}

	if (!url || url === '/') {
		arr = ['/'];
		return arr;
	}

	var prev = false;
	var key = '';
	var count = 0;

	arr = [];

	for (var i = 0; i < url.length; i++) {
		var c = url[i];

		if (c === '/') {
			if (key && !prev) {
				arr.push(key);
				count++;
				key = '';
			}
			continue;
		}

		key += c;
		prev = c === '/';
	}

	if (key)
		arr.push(key);
	else if (!count)
		arr.push('/');

	return arr;
};

exports.routesplitcreate = function(url, nolowercase) {

	if (!nolowercase)
		url = url.toLowerCase();

	if (url[0] === '/')
		url = url.substring(1);

	if (url[url.length - 1] === '/')
		url = url.substring(0, url.length - 1);

	var count = 0;
	var end = 0;
	var arr = [];

	for (var i = 0, length = url.length; i < length; i++) {
		switch (url[i]) {
			case '/':
				if (count !== 0)
					break;
				arr.push(url.substring(end + (arr.length ? 1 : 0), i));
				end = i;
				break;

			case '{':
				count++;
				break;

			case '}':
				count--;
				break;
		}
	}

	!count && arr.push(url.substring(end + (arr.length ? 1 : 0), url.length));

	if (arr.length === 1 && !arr[0])
		arr[0] = '/';

	return arr;
};

exports.routecompare = function(url, route, isSystem, isWildcard) {

	var length = url.length;
	var lengthroute = route.length;

	if ((lengthroute !== length && !isWildcard) || (isWildcard && length < lengthroute))
		return false;

	if (isWildcard && lengthroute === 1 && route[0] === '/')
		return true;

	var skip = length === 1 && url[0] === '/';

	for (var i = 0; i < length; i++) {

		var value = route[i];

		if (!isSystem && isWildcard && value == null)
			return true;

		if (!isSystem && (!skip && value[0] === '{'))
			continue;

		if (url[i] !== value)
			return isSystem ? false : isWildcard ? i >= lengthroute : false;
	}

	return true;
};

exports.routeparams = function(url, route) {

	if (!route || !url || !route.param.length)
		return EMPTYARRAY;

	var arr = [];
	var is = false;

	for (var i = 0; i < route.param.length; i++) {
		var value = url[route.param[i]];
		var name = route.paramnames[i];
		switch (route.paramtypes[name]) {
			case 'uid':
				if (!value.isUID())
					is = true;
				break;
			case 'guid':
				if (!value.isGUID())
					is = true;
				break;
			case 'number':
				value = +value;
				if (isNaN(value)) {
					is = true;
					value = 0;
				}
				break;
			case 'boolean':
				value = value === 'true' || value === '1';
				break;
			case 'date':
				value = value.length > 6 ? value.indexOf('-') === -1 ? value.parseDate('yyyyMMddHHmm') : value.parseDate('yyyy-MM-dd-HHmm') : null;
				if (value == null || !value.getTime)
					is = true;
				break;
		}

		arr.push(value === '/' ? '' : value);
	}

	return { values: arr, error: is };
};

function HttpFile() {
	// this.name;
	// this.filename;
	// this.type;
	// this.path;
	this.length = 0;
	this.width = 0;
	this.height = 0;
	this.rem = true;
}

HttpFile.prototype = {
	get size() {
		return this.length;
	},
	get extension() {
		if (!this.$extension)
			this.$extension = framework_utils.getExtension(this.filename);
		return this.$extension;
	},
	set extension(val) {
		this.$extension = val;
	}
};

var HFP = HttpFile.prototype;

HFP.rename = HFP.move = function(filename, callback) {
	var self = this;
	if (callback)
		return self._move(filename, callback);
	else
		return new Promise((resolve, reject) => self._move(filename, (err) => err ? reject(err) : resolve()));
};

HFP._move = function(filename, callback) {
	var self = this;
	Fs.rename(self.path, filename, function(err) {

		if (err && err.code === 'EXDEV') {
			self.copy(filename, function(err){

				Fs.unlink(self.path, NOOP);

				if (!err) {
					self.path = filename;
					self.rem = false;
				}

				callback && callback(err);
			});
			return;
		}

		if (!err) {
			self.path = filename;
			self.rem = false;
		}

		callback && callback(err);
	});
	return self;
};

HFP.copy = function(filename, callback) {
	var self = this;
	if (callback)
		return self._copy(filename, callback);
	else
		return new Promise((resolve, reject) => self._copy(filename, (err) => err ? reject(err) : resolve()));
};

HFP._copy = function(filename, callback) {

	var self = this;

	if (!callback) {
		Fs.createReadStream(self.path).pipe(Fs.createWriteStream(filename));
		return;
	}

	var reader = Fs.createReadStream(self.path);
	var writer = Fs.createWriteStream(filename);

	reader.on('close', callback);
	reader.pipe(writer);
	return self;
};

HFP.read = function(callback) {
	var self = this;
	if (callback)
		return self._read(callback);
	else
		return new Promise((resolve, reject) => self._read((err, res) => err ? reject(err) : resolve(res)));
};

HFP._read = function(callback) {
	var self = this;
	Fs.readFile(self.path, callback);
	return self;
};


HFP.md5 = function(callback) {
	var self = this;
	if (callback)
		return self._md5(callback);
	else
		return new Promise((resolve, reject) => self._md5((err, res) => err ? reject(err) : resolve(res)));
};

HFP._md5 = function(callback) {
	var self = this;
	var md5 = Crypto.createHash('md5');
	var stream = Fs.createReadStream(self.path);

	stream.on('data', (buffer) => md5.update(buffer));
	stream.on('error', function(error) {
		if (callback) {
			callback(error, null);
			callback = null;
		}
	});

	onFinished(stream, function() {
		destroyStream(stream);
		if (callback) {
			callback(null, md5.digest('hex'));
			callback = null;
		}
	});

	return self;
};

HFP.stream = function(options) {
	return Fs.createReadStream(this.path, options);
};

HFP.pipe = function(stream, options) {
	return Fs.createReadStream(this.path, options).pipe(stream, options);
};

HFP.isImage = function() {
	return this.type.indexOf('image/') !== -1;
};

HFP.isVideo = function() {
	return this.type.indexOf('video/') !== -1;
};

HFP.isAudio = function() {
	return this.type.indexOf('audio/') !== -1;
};

HFP.image = function(im) {
	if (im === undefined)
		im = CONF.default_image_converter === 'im';
	return framework_image.init(this.path, im, this.width, this.height);
};

HFP.fs = function(storage, id, custom, expire, callback) {

	if (typeof(custom) === 'function') {
		callback = custom;
		custom = null;
		expire = null;
	} else if (typeof(expire) === 'function') {
		callback = expire;
		expire = null;
	}

	return FILESTORAGE(storage).save(id, this.filename, this.path, callback, custom, expire);
};

// *********************************************************************************
// =================================================================================
// JS CSS + AUTO-VENDOR-PREFIXES
// =================================================================================
// *********************************************************************************

function compile_autovendor(css) {
	var avp = '/*auto*/';
	var isAuto = css.substring(0, 100).indexOf(avp) !== -1;
	if (isAuto)
		css = autoprefixer(css.replace(avp, ''));
	return css.replace(REG_CSS_0, ' ').replace(REG_CSS_1, '').replace(REG_CSS_2, '{').replace(REG_CSS_3, '}').replace(REG_CSS_4, ':').replace(REG_CSS_5, ';').replace(REG_CSS_6, function(search, index, text) {
		for (var i = index; i > 0; i--) {
			if ((text[i] === '\'' || text[i] === '"') && (text[i - 1] === ':'))
				return search;
		}
		return ',';
	}).replace(REG_CSS_7, '}').replace(REG_CSS_8, '{').replace(REG_CSS_9, '}').replace(REG_CSS_12, cssmarginpadding).replace(REG_CSS_13, csscolors).replace(REG_CSS_14, '>').trim();
}

function csscolors(text) {
	return text.substring(0, 4) + text.charAt(text.length - 1);
}

function cssmarginpadding(text) {

	// margin
	// padding

	var prop = '';
	var val;
	var l = text.length - 1;
	var last = text[l];

	if (text[0] === 'm') {
		prop = 'margin:';
		val = text.substring(7, l);
	} else {
		prop = 'padding:';
		val = text.substring(8, l);
	}

	var a = val.split(' ');

	for (var i = 0; i < a.length; i++) {
		if (a[i][0] === '0' && a[i].charCodeAt(1) > 58)
			a[i] = '0';
	}

	// 0 0 0 0 --> 0
	if (a[0] === '0' && a[1] === '0' && a[2] === '0' && a[3] === '0')
		return prop + '0' + last;

	// 20px 0 0 0 --> 20px 0 0
	if (a[0] !== '0' && a[1] === '0' && a[2] === '0' && a[3] === '0')
		return prop + a[0] + ' 0 0' + last;

	// 20px 30px 20px 30px --> 20px 30px
	if (a[1] && a[2] && a[3] && a[0] === a[2] && a[1] === a[3])
		return prop + a[0] + ' ' + a[1] + last;

	// 20px 30px 10px 30px --> 20px 30px 10px
	if (a[2] && a[3] && a[1] === a[3] && a[0] !== a[2])
		return prop + a[0] + ' ' + a[1] + ' ' + a[2] + last;

	return text;
}

function autoprefixer(value) {

	var builder = [];
	var index = 0;
	var property;

	// properties
	for (var i = 0, length = AUTOVENDOR.length; i < length; i++) {

		property = AUTOVENDOR[i];
		index = 0;

		while (index !== -1) {

			index = value.indexOf(property, index + 1);
			if (index === -1)
				continue;

			var a = value.indexOf(';', index);
			var b = value.indexOf('}', index);

			var end = Math.min(a, b);
			if (end === -1)
				end = Math.max(a, b);

			if (end === -1)
				continue;

			var before = value.substring(index - 1, index);
			var isPrefix = before === '-' || before === '.' || before === '#';
			if (isPrefix)
				continue;

			var css = value.substring(index, end);
			end = css.indexOf(':');

			if (end === -1 || css.substring(0, end + 1).replace(/\s/g, '') !== property + ':')
				continue;

			builder.push({ name: property, property: before + css, css: css });
		}
	}

	var output = [];
	var length = builder.length;

	for (var i = 0; i < length; i++) {

		var name = builder[i].name;
		var replace = builder[i].property;
		var before = replace[0];

		property = builder[i].css.trim();

		var plus = property;
		var delimiter = ';';
		var updated = plus + delimiter;

		if (name === 'font-smoothing') {
			updated = plus + delimiter;
			updated += plus.replacer('font-smoothing', '-webkit-font-smoothing') + delimiter;
			updated += plus.replacer('font-smoothing', '-moz-osx-font-smoothing');
			value = value.replacer(replace, before + '@[[' + output.length + ']]');
			output.push(updated);
			continue;
		}

		updated += '-webkit-' + plus + delimiter;
		updated += '-moz-' + plus;

		value = value.replacer(replace, before + '@[[' + output.length + ']]');
		output.push(updated);
	}

	length = output.length;
	for (var i = 0; i < length; i++)
		value = value.replacer('@[[' + i + ']]', output[i]);

	output = null;
	builder = null;
	return value;
}

function minify_javascript(data) {

	var index = 0;
	var output = [];
	var isCS = false; // comment multiline
	var isCI = false; // comment inline
	var alpha = /[0-9a-z$]/i;
	var white = /\W/;
	var skip = { '$': true, '_': true };
	var newlines = { '\n': 1, '\r': 1 };
	var regexp = false;
	var scope, prev, next, last;
	var vtmp = false;
	var regvar = /^(\s)*var /;
	var vindex = 0;

	while (true) {

		var c = data[index];
		var prev = data[index - 1];
		var next = data[index + 1];

		index++;

		if (c === undefined)
			break;

		if (!scope) {

			if (!regexp) {

				if (!isCI && c === '/' && next === '*') {
					isCS = true;
					continue;
				} else if (!isCI && c === '*' && next === '/') {
					isCS = false;
					index++;
					continue;
				}

				if (isCS)
					continue;

				if (c === '/' && next === '/') {
					isCI = true;
					continue;
				} else if (isCI && newlines[c]) {
					isCI = false;
					alpha.test(last) && output.push(' ');
					last = '';
					continue;
				}

				if (isCI)
					continue;
			}

			if (c === '\t' || newlines[c]) {
				if (!last || !alpha.test(last))
					continue;
				output.push(' ');
				last = '';
				continue;
			}

			if (!regexp && (c === ' ' && (white.test(prev) || white.test(next)))) {
				// if (!skip[prev] && !skip[next])
				if (!skip[prev]) {
					if (!skip[next] || !alpha.test(prev))
						continue;
				}
			}

			if (regexp) {
				if ((last !== '\\' && c === '/') || (last === '\\' && c === '/' && output[output.length - 2] === '\\'))
					regexp = false;
			} else
				regexp = (last === '=' || last === '(' || last === ':' || last === '{' || last === '[' || last === '?') && (c === '/');
		}

		if (scope && c === '\\') {
			output.push(c);
			output.push(next);
			index++;
			last = next;
			continue;
		}

		if (!regexp && (c === '"' || c === '\'' || c === '`')) {

			if (scope && scope !== c) {
				output.push(c);
				continue;
			}

			if (c === scope)
				scope = 0;
			else
				scope = c;
		}

		// var
		if (!scope && c === 'v' && next === 'a') {
			var v = c + data[index] + data[index + 1] + data[index + 2];
			if (v === 'var ') {
				if (vtmp && output[output.length - 1] === ';') {
					output.pop();
					output.push(',');
				} else
					output.push('var ');
				index += 3;
				vtmp = true;
				continue;
			}
		} else {
			if (vtmp) {
				vindex = index + 1;
				while (true) {
					if (!data[vindex] || !white.test(data[vindex]))
						break;
					vindex++;
				}
				if (c === '(' || c === ')' || (c === ';' && !regvar.test(data.substring(vindex, vindex + 20))))
					vtmp = false;
			}
		}

		if ((c === '+' || c === '-') && next === ' ') {
			if (data[index + 1] === c) {
				index += 2;
				output.push(c);
				output.push(' ');
				output.push(c);
				last = c;
				continue;
			}
		}

		if ((c === '}' && last === ';') || ((c === '}' || c === ']') && output[output.length - 1] === ' ' && alpha.test(output[output.length - 2])))
			output.pop();

		output.push(c);
		last = c;
	}

	return output.join('').trim();
}

exports.compile_css = function(value, filename, nomarkup) {

	// Internal markup
	if (!nomarkup)
		value = markup(value, filename);

	if (global.F) {
		value = modificators(value, filename, 'style');
		if (DEF.onCompileStyle)
			return DEF.onCompileStyle(filename, value);
	}

	try {

		var isVariable = false;

		value = nested(value, '', () => isVariable = true);
		value = compile_autovendor(value);

		if (isVariable)
			value = variablesCSS(value);

		return value;
	} catch (ex) {
		F.error(new Error('CSS compiler error: ' + ex.message));
		return '';
	}
};

exports.compile_javascript = function(source, filename, nomarkup) {

	// Internal markup
	if (!nomarkup)
		source = markup(source, filename);

	if (global.F) {
		source = modificators(source, filename, 'script');
		if (DEF.onCompileScript)
			return DEF.onCompileScript(filename, source).trim();
	}

	return minify_javascript(source);
};

exports.compile_html = function(source, filename, nomarkup) {
	return compressCSS(compressJS(compressHTML(source, true), 0, filename, nomarkup), 0, filename, nomarkup);
};

// *********************************************************************************
// =================================================================================
// VIEW ENGINE
// =================================================================================
// *********************************************************************************

function view_parse_localization(content, language) {

	var is = false;

	content = content.replace(REG_NOTRANSLATE, function() {
		is = true;
		return '';
	}).trim();

	if (is)
		return content;

	var command = view_find_localization(content, 0);
	var output = '';
	var end = 0;

	if (!command)
		return content;

	while (command) {

		if (command)
			output += content.substring(end ? end + 1 : 0, command.beg) + (command.command ? localize(language, command) : '');

		end = command.end;
		command = view_find_localization(content, command.end);
	}

	output += content.substring(end + 1);
	return output;
}

// Escaping ", ' and ` chars
function localize(language, command) {

	!language && (language = 'default');

	if (F.resources[language] && F.resources[language].$empty)
		return command.command;

	var output = TRANSLATE(language, command.command);

	if (command.escape) {
		var index = 0;
		while (true) {
			index = output.indexOf(command.escape, index);
			if (index === -1)
				break;
			var c = output[index - 1];
			if (c !== '\\') {
				output = output.substring(0, index) + '\\' + output.substring(index);
				index++;
			} else
				index += 2;
		}
	}

	return output;
}

var VIEW_IF = { 'if ': 1, 'if(': 1 };

function view_parse(content, minify, filename, controller) {

	content = removeComments(content).ROOT();

	var nocompressHTML = false;
	var nocompressJS = false;
	var nocompressCSS = false;

	content = content.replace(REG_NOCOMPRESS, function(text) {

		var index = text.lastIndexOf(' ');
		if (index === -1)
			return '';

		switch (text.substring(index, text.length - 1).trim()) {
			case 'all':
				nocompressHTML = true;
				nocompressJS = true;
				nocompressCSS = true;
				break;
			case 'html':
				nocompressHTML = true;
				break;
			case 'js':
			case 'script':
			case 'javascript':
				nocompressJS = true;
				break;
			case 'css':
			case 'style':
				nocompressCSS = true;
				break;
		}

		return '';
	}).trim();

	if (!nocompressJS)
		content = compressJS(content, 0, filename, true);

	if (!nocompressCSS)
		content = compressCSS(content, 0, filename, true);

	content = F.$versionprepare(content);

	if (!nocompressHTML)
		content = compressView(content, minify, filename);

	var DELIMITER = '\'';
	var SPACE = ' ';
	var builder = 'var $EMPTY=\'\';var $length=0;var $source=null;var $tmp=index;var $output=$EMPTY';
	var command = view_find_command(content, 0);
	var isFirst = false;
	var txtindex = -1;
	var index = 0;
	var isCookie = false;

	function escaper(value) {

		var is = REG_TAGREMOVE.test(value);

		if (!nocompressHTML) {
		//	value = compressHTML(value, minify, true);
		} else if (!isFirst) {
			isFirst = true;
			value = value.replace(/^\s+/, '');
		}

		if (!value)
			return '$EMPTY';

		if (!nocompressHTML && is)
			value += ' ';

		txtindex = $VIEWCACHE.indexOf(value);

		if (txtindex === -1) {
			txtindex = $VIEWCACHE.length;
			$VIEWCACHE.push(value);
		}

		return '$VIEWCACHE[' + txtindex + ']';
	}

	if (!command)
		builder += '+' + escaper(content);

	index = 0;

	var old = null;
	var newCommand = '';
	var tmp = '';
	var counter = 0;
	var functions = [];
	var functionsName = [];
	var isFN = false;
	var isSECTION = false;
	var isCOMPILATION = false;
	var builderTMP = '';
	var sectionName = '';
	var components = {};
	var text;

	while (command) {

		if (!isCookie && command.command.indexOf('cookie') !== -1)
			isCookie = true;

		if (old) {
			text = content.substring(old.end + 1, command.beg);
			if (text) {
				if (view_parse_plus(builder))
					builder += '+';
				builder += escaper(text);
			}
		} else {
			text = content.substring(0, command.beg);
			if (text) {
				if (view_parse_plus(builder))
					builder += '+';
				builder += escaper(text);
			}
		}

		var cmd = content.substring(command.beg + 2, command.end).trim();

		var cmd8 = cmd.substring(0, 8);
		var cmd7 = cmd.substring(0, 7);

		if (cmd === 'continue' || cmd === 'break') {
			builder += ';' + cmd + ';';
			old = command;
			command = view_find_command(content, command.end);
			continue;
		}

		// cmd = cmd.replace
		command.command = command.command.replace(REG_HELPERS, function(text) {
			var index = text.indexOf('(');
			return index === - 1 ? text : text.substring(0, index) + '.call(self' + (text.endsWith('()') ? ')' : ',' + text.substring(index + 1));
		});

		if (cmd[0] === '\'' || cmd[0] === '"') {
			if (cmd[1] === '%') {
				var t = CONF[cmd.substring(2, cmd.length - 1)];
				if (t != null)
					builder += '+' + DELIMITER + (t + '').encode().replace(/'/g, "\\'") + DELIMITER;
			} else
				builder += '+' + DELIMITER + (new Function('self', 'return self.$import(' + cmd[0] + '!' + cmd.substring(1) + ')'))(controller) + DELIMITER;
		} else if (cmd7 === 'compile' && cmd.lastIndexOf(')') === -1) {

			builderTMP = builder + '+(DEF.onCompileView.call(self,\'' + (cmd8[7] === ' ' ? cmd.substring(8).trim() : '') + '\',';
			builder = '';
			sectionName = cmd.substring(8);
			isCOMPILATION = true;
			isFN = true;

		} else if (cmd8 === 'section ' && cmd.lastIndexOf(')') === -1) {
			builderTMP = builder;
			builder = '+(function(){var $output=$EMPTY';
			sectionName = cmd.substring(8);
			isSECTION = true;
			isFN = true;
		} else if (cmd7 === 'helper ') {

			builderTMP = builder;
			builder = 'function ' + cmd.substring(7).trim() + '{var $output=$EMPTY';
			isFN = true;
			functionsName.push(cmd.substring(7, cmd.indexOf('(', 7)).trim());

		} else if (cmd8 === 'foreach ') {

			counter++;

			if (cmd.indexOf('foreach var ') !== -1)
				cmd = cmd.replace(' var ', SPACE);

			cmd = view_prepare_keywords(cmd);
			newCommand = (cmd.substring(8, cmd.indexOf(SPACE, 8)) || '').trim();
			index = cmd.trim().indexOf(SPACE, newCommand.length + 10);

			if (index === -1)
				index = cmd.indexOf('[', newCommand.length + 10);

			builder += '+(function(){var $source=' + cmd.substring(index).trim() + ';if(!($source instanceof Array))$source=framework_utils.ObjectToArray($source);if(!$source.length)return $EMPTY;var $length=$source.length;var $output=$EMPTY;var index=0;for(var $i=0;$i<$length;$i++){index=$i;var ' + newCommand + '=$source[$i];$output+=$EMPTY';
		} else if (cmd === 'end') {

			if (isFN && counter <= 0) {
				counter = 0;

				if (isCOMPILATION) {
					builder = builderTMP + 'unescape($EMPTY' + builder + '),model) || $EMPTY)';
					builderTMP = '';
				} else if (isSECTION) {
					builder = builderTMP + builder + ';repository[\'$section_' + sectionName + '\']=repository[\'$section_' + sectionName + '\']?repository[\'$section_' + sectionName + '\']+$output:$output;return $EMPTY})()';
					builderTMP = '';
				} else {
					builder += ';return $output;}';
					functions.push(builder);
					builder = builderTMP;
					builderTMP = '';
				}

				isSECTION = false;
				isCOMPILATION = false;
				isFN = false;

			} else {
				counter--;
				builder += '}return $output})()';
				newCommand = '';
			}

		} else if (VIEW_IF[cmd.substring(0, 3)]) {
			builder += ';if (' + (cmd.substring(2, 3) === '(' ? '(' : '') + view_prepare_keywords(cmd).substring(3) + '){$output+=$EMPTY';
		} else if (cmd7 === 'else if') {
			builder += '} else if (' + view_prepare_keywords(cmd).substring(7) + ') {$output+=$EMPTY';
		} else if (cmd === 'else') {
			builder += '} else {$output+=$EMPTY';
		} else if (cmd === 'endif' || cmd === 'fi') {
			builder += '}$output+=$EMPTY';
		} else {

			tmp = view_prepare(command.command, newCommand, functionsName, controller, components);
			var can = false;

			// Inline rendering is supported only in release mode
			if (RELEASE && tmp.indexOf('+') === -1 && REG_SKIP_1.test(tmp) && !REG_SKIP_2.test(tmp)) {
				for (var a = 0, al = RENDERNOW.length; a < al; a++) {
					if (tmp.startsWith(RENDERNOW[a])) {
						if (!a) {
							var isMeta = tmp.indexOf('\'meta\'') !== -1;
							var isHead = tmp.indexOf('\'head\'') !== -1;
							tmp = tmp.replace(/(\s)?'(meta|head)'(\s|,)?/g, '').replace(/(,,|,\)|\s{2,})/g, '');
							if (isMeta || isHead) {
								var tmpimp = '';
								if (isMeta)
									tmpimp += (isMeta ? '\'meta\'' : '');
								if (isHead)
									tmpimp += (tmpimp ? ',' : '') + (isHead ? '\'head\'' : '');
								if (tmpimp)
									builder += '+self.$import(' + tmpimp + ')';
							}
						}
						if (tmp !== 'self.$import()')
							can = true;
						break;
					}
				}
			}

			if (can && !counter) {
				try {

					if (tmp.lastIndexOf(')') === -1)
						tmp += ')';

					var r = (new Function('self', 'config', 'return ' + tmp))(controller, CONF).replace(REG_7, '\\\\').replace(REG_8, '\\\'');
					if (r) {
						txtindex = $VIEWCACHE.indexOf(r);
						if (txtindex === -1) {
							txtindex = $VIEWCACHE.length;
							$VIEWCACHE.push(r);
						}
						builder += '+$VIEWCACHE[' + txtindex + ']';
					}
				} catch (e) {

					console.log('A view compilation error --->', filename, e, tmp);
					F.errors.push({ error: e.stack, name: filename, url: null, date: new Date() });

					if (view_parse_plus(builder))
						builder += '+';
					builder += wrapTryCatch(tmp, command.command, command.line);
				}
			} else if (tmp) {
				if (view_parse_plus(builder))
					builder += '+';
				if (tmp.substring(1, 4) !== '@{-' && tmp.substring(0, 11) !== 'self.$view')
					builder += wrapTryCatch(tmp, command.command, command.line);
				else
					builder += tmp;
			}
		}

		old = command;
		command = view_find_command(content, command.end);
	}

	if (old) {
		text = content.substring(old.end + 1);
		if (text)
			builder += '+' + escaper(text);
	}


	if (RELEASE)
		builder = builder.replace(/(\+\$EMPTY\+)/g, '+').replace(/(\$output=\$EMPTY\+)/g, '$output=').replace(/(\$output\+=\$EMPTY\+)/g, '$output+=').replace(/(\}\$output\+=\$EMPTY)/g, '}').replace(/(\{\$output\+=\$EMPTY;)/g, '{').replace(/(\+\$EMPTY\+)/g, '+').replace(/(>'\+'<)/g, '><').replace(/'\+'/g, '');

	var keys = Object.keys(components);
	builder = builder.replace(REG_VIEW_PART, function(text) {
		var data = [];
		var comkeys = Object.keys(F.components.instances);
		var key = text.substring(6, text.length - 2);
		for (var i = 0; i < comkeys.length; i++) {
			var com = F.components.instances[comkeys[i]];
			if (com.parts && com.group && components[com.group] && com.parts[key])
				data.push(com.parts[key]);
		}

		if (!data.length)
			return '$EMPTY';

		data = data.join('');
		var index = $VIEWCACHE.indexOf(data);
		if (index === -1)
			index = $VIEWCACHE.push(data) - 1;
		return '$VIEWCACHE[' + index + ']';
	});

	var fn = ('(function(self,repository,model,session,query,body,url,helpers,user,config,functions,index,output,files,mobile,settings){var R=this.repository;var M=model;var theme=this.themeName;var language=this.req.$language||\'\';var sitemap=this.repository.$sitemap;' + (isCookie ? 'var cookie=function(name){return self.req.cookie(name)};' : '') + (functions.length ? functions.join('') + ';' : '') + 'var controller=self;' + builder + ';return $output;})');
	try {
		fn = eval(fn);
		fn.components = keys;
	} catch (e) {
		throw new Error(filename + ': ' + (e.message + ''));
	}
	return fn;
}

function view_prepare_keywords(cmd) {
	return cmd.replace(REG_SITEMAP, text => ' self.' + text.trim());
}

function wrapTryCatch(value, command, line) {
	return DEBUG ? ('(function(){try{return ' + value + '}catch(e){throw new Error(unescape(\'' + escape(command) + '\') + \' - Line: ' + line + ' - \' + e.message.toString());}return $EMPTY})()') : value;
}

function view_parse_plus(builder) {
	var c = builder[builder.length - 1];
	return c !== '!' && c !== '?' && c !== '+' && c !== '.' && c !== ':';
}

function view_prepare(command, dynamicCommand, functions, controller, components) {

	var a = command.indexOf('.');
	var b = command.indexOf('(');
	var c = command.indexOf('[');

	var max = [];
	var tmp = 0;

	if (a !== -1)
		max.push(a);

	if (b !== -1)
		max.push(b);

	if (c !== -1)
		max.push(c);

	var index = Math.min.apply(this, max);

	if (index === -1)
		index = command.length;

	var name = command.substring(0, index);
	if (name === dynamicCommand)
		return '$STRING(' + command + ', 1)';

	if (name[0] === '!' && name.substring(1) === dynamicCommand)
		return '$STRING(' + command.substring(1) + ')';

	switch (name) {

		case 'foreach':
		case 'end':
			return '';

		case 'part':
			tmp = command.indexOf('(');
			return '/*PART{0}*/'.format(command.substring(tmp + 2, command.length - 2));

		case 'section':
			tmp = command.indexOf('(');
			return tmp === -1 ? '' : '(repository[\'$section_' + command.substring(tmp + 1, command.length - 1).replace(/'|"/g, '') + '\'] || \'\')';

		case 'log':
		case 'LOG':
			return '(' + (name === 'log' ? 'F.' : '') + command + '?$EMPTY:$EMPTY)';

		case 'logger':
		case 'LOGGER':
			return '(' + (name === 'logger' ? 'F.' : '') + command + '?$EMPTY:$EMPTY)';

		case 'console':
			return '(' + command + '?$EMPTY:$EMPTY)';

		case '!cookie':
			return '$STRING(' + command + ')';

		case 'csrf':
			return 'self.csrf()';

		case 'root':
			var r = CONF.default_root;
			return '\'' + (r ? r.substring(0, r.length - 1) : r) + '\'';

		case 'M':
		case 'R':
		case 'G':
		case 'model':
		case 'repository':
		case 'query':
		case 'global':
		case 'MAIN':
		case 'session':
		case 'user':
		case 'config':
		case 'CONF':
		case 'REPO':
		case 'controller':
			return view_is_assign(command) ? ('self.$set(' + command + ')') : ('$STRING(' + command + ', 1)');

		case 'body':
			return view_is_assign(command) ? ('self.$set(' + command + ')') : command.lastIndexOf('.') === -1 ? 'output' : ('$STRING(' + command + ', 1)');

		case 'files':
		case 'mobile':
		case 'continue':
		case 'break':
		case 'language':
		case 'TRANSLATE':
		case 'helpers':
			return command;

		case 'cookie':
		case 'settings':
		case 'CONFIG':
		case 'FUNC':
		case 'function':
		case 'MODEL':
		case 'SCHEMA':
		case 'MODULE':
		case 'functions':
			return '$STRING(' + command + ', 1)';

		case '!M':
		case '!R':
		case '!G':
		case '!controller':
		case '!repository':
		case '!get':
		case '!post':
		case '!body':
		case '!query':
		case '!global':
		case '!session':
		case '!user':
		case '!config':
		case '!CONF':
		case '!functions':
		case '!model':
		case '!CONFIG':
		case '!SCHEMA':
		case '!function':
		case '!MODEL':
		case '!MODULE':
			return '$STRING(' + command.substring(1) + ')';

		case 'resource':
			return '$STRING(RESOURCE' + command.substring(8) + ', 1)';
		case 'RESOURCE':
			return '$STRING(' + command + ', 1)';

		case '!resource':
			return '$STRING(self.' + command.substring(1) + ')';
		case '!RESOURCE':
			return '$STRING(' + command.substring(1) + ')';

		case 'host':
		case 'hostname':
			return command.indexOf('(') === -1 ? 'self.host()' : 'self.' + command;

		case 'href':
			return command.indexOf('(') === -1 ? 'self.href()' : 'self.' + command;

		case 'url':
			return command.indexOf('(') === -1 ? 'self.' + command : 'self.$' + command;

		case 'title':
		case 'description':
		case 'keywords':
		case 'author':
			return command.indexOf('(') === -1 ? '((repository[\'$' + command + '\'] || \'\') + \'\').encode()' : 'self.$' + command;

		case 'title2':
			return 'self.$' + command;

		case '!title':
		case '!description':
		case '!keywords':
		case '!author':
			return '(repository[\'$' + command.substring(1) + '\'] || \'\')';

		case 'head':
			return command.indexOf('(') === -1 ? 'self.' + command + '()' : 'self.$' + command;

		case 'sitemap_url':
		case 'sitemap_name':
		case 'sitemap_navigation':
		case 'sitemap_url2':
		case 'sitemap_name2':
			return 'self.' + command;
		case 'breadcrumb_url':
		case 'breadcrumb_name':
		case 'breadcrumb_url2':
		case 'breadcrumb_name2':
		case 'breadcrumb_navigation':
			return 'self.sitemap_' + command.substring(10);

		case 'sitemap':
		case 'breadcrumb':
		case 'place':
			if (name === 'breadcrumb')
				name = 'sitemap';
			return command.indexOf('(') === -1 ? '(repository[\'$' + command + '\'] || \'\')' : 'self.$' + command;

		case 'meta':
			return command.indexOf('(') === -1 ? 'self.$meta()' : 'self.$' + command;

		case 'import':
		case 'favicon':
		case 'js':
		case 'css':
			return 'self.$' + command + (command.indexOf('(') === -1 ? '()' : '');

		case 'components':

			var group = command.match(REG_COMPONENTS_GROUP);
			if (group && group.length) {
				group = (group[0] + '').replace(/'|"'/g, '');
				components[group] = 1;
			}

			return 'self.$' + command + (command.indexOf('(') === -1 ? '()' : '');

		case 'index':
			return '(' + command + ')';

		case 'component':

			tmp = command.indexOf('\'');

			var is = false;
			if (tmp !== -1) {
				name = command.substring(tmp + 1, command.indexOf('\'', tmp + 1));
				tmp = F.components.instances[name];
				if (tmp && tmp.render)
					is = true;
			} else {
				tmp = command.indexOf('"');
				name = command.substring(tmp + 1, command.indexOf('"', tmp + 1));
				tmp = F.components.instances[name];
				if (tmp && tmp.render)
					is = true;
			}

			if (tmp)
				components[tmp.group] = 1;

			if (is) {

				var settings = command.substring(11 + name.length + 2, command.length - 1).trim();
				if (settings === ')')
					settings = '';

				$VIEWASYNC++;
				return '\'@{-{0}-}\'+(function(index){!controller.$viewasync&&(controller.$viewasync=[]);controller.$viewasync.push({replace:\'@{-{0}-}\',name:\'{1}\',settings:{2}});return $EMPTY})({0})'.format($VIEWASYNC, name, settings || 'null');
			}

			return 'self.' + command;

		case 'public_js':
		case 'public_css':
		case 'public_image':
		case 'public_font':
		case 'public_download':
		case 'public_video':
		case 'public':
		case 'translate':
			return 'self.' + command;
		case 'json':
		case 'json2':
		case 'sitemap_change':
		case 'sitemap_replace':
		case 'sitemap_add':
		case 'helper':
		case 'view':
		case 'layout':
		case 'image':
		case 'view_compile':
		case 'download':
		case 'selected':
		case 'disabled':
		case 'checked':
		case 'header':
		case 'options':
		case 'readonly':
			return 'self.$' + command;

		case 'now':
			return '(new Date()' + command.substring(3) + ')';

		case 'radio':
		case 'text':
		case 'input':
		case 'checkbox':
		case 'hidden':
		case 'textarea':
		case 'password':
			return 'self.$' + appendModel(command);

		default:
			return DEF.helpers[name] ? ('helpers.' + view_insert_call(command)) : ('$STRING(' + (functions.indexOf(name) === -1 ? command[0] === '!' ? command.substring(1) + ')' : command + ', 1)' : command + ')'));
	}
}

function view_insert_call(command) {

	var beg = command.indexOf('(');
	if (beg === -1)
		return command;

	var length = command.length;
	var count = 0;

	for (var i = beg + 1; i < length; i++) {

		var c = command[i];

		if (c !== '(' && c !== ')')
			continue;

		if (c === '(') {
			count++;
			continue;
		}

		if (count > 0) {
			count--;
			continue;
		}

		var arg = command.substring(beg + 1);
		return command.substring(0, beg) + '.call(self' + (arg.length > 1 ? ',' + arg : ')');
	}

	return command;
}

function view_is_assign(value) {

	var length = value.length;
	var skip = 0;

	for (var i = 0; i < length; i++) {

		var c = value[i];

		if (c === '[') {
			skip++;
			continue;
		}

		if (c === ']') {
			skip--;
			continue;
		}

		var next = value[i + 1] || '';

		if (c === '+' && (next === '+' || next === '=')) {
			if (!skip)
				return true;
		}

		if (c === '-' && (next === '-' || next === '=')) {
			if (!skip)
				return true;
		}

		if (c === '*' && (next === '*' || next === '=')) {
			if (!skip)
				return true;
		}

		if (c === '=') {
			if (!skip)
				return true;
		}
	}
	return false;
}

function view_find_command(content, index, entire) {

	index = content.indexOf('@{', index);
	if (index === -1)
		return null;

	var length = content.length;
	var count = 0;

	for (var i = index + 2; i < length; i++) {
		var c = content[i];

		if (c === '{') {
			count++;
			continue;
		}

		if (c !== '}')
			continue;
		else if (count > 0) {
			count--;
			continue;
		}

		var command = content.substring(index + 2, i).trim();

		// @{{ SKIP }}
		if (command[0] === '{')
			return view_find_command(content, index + 1);

		var obj = { beg: index, end: i, line: view_line_counter(content.substr(0, index)), command: command };

		if (entire)
			obj.phrase = content.substring(index, i + 1);

		return obj;
	}

	return null;
}

function view_line_counter(value) {
	var count = value.match(/\n/g);
	return count ? count.length : 0;
}

function view_find_localization(content, index) {

	index = content.indexOf('@(', index);
	if (index === -1)
		return null;

	var length = content.length;
	var count = 0;
	var beg = content[index - 1];
	var esc = '';

	for (var i = index + 2; i < length; i++) {
		var c = content[i];

		if (c === '(') {
			count++;
			continue;
		}

		if (c !== ')')
			continue;
		else if (count) {
			count--;
			continue;
		}

		var end = content.substring(i + 1, i + 2);
		if (beg === end && beg === '"' || beg === '\'' || beg === '`')
			esc = beg;
		return { beg: index, end: i, command: content.substring(index + 2, i).trim(), escape: esc };
	}

	return null;
}

function removeComments(html) {
	var tagBeg = '<!--';
	var tagEnd = '-->';
	var beg = html.indexOf(tagBeg);
	var end = 0;

	while (beg !== -1) {
		end = html.indexOf(tagEnd, beg + 4);

		if (end === -1)
			break;

		var comment = html.substring(beg, end + 3);
		if (comment.indexOf('[if') !== -1 || comment.indexOf('[endif') !== -1) {
			beg = html.indexOf(tagBeg, end + 3);
		} else {
			html = html.replacer(comment, '');
			beg = html.indexOf(tagBeg, beg);
		}
	}

	return html;
}

function compressView(html, minify) {

	var cache = [];
	var beg = 0;
	var end;

	while (true) {
		beg = html.indexOf('@{compile ', beg - 1);
		if (beg === -1)
			break;
		end = html.indexOf('@{end}', beg + 6);
		if (end === -1)
			break;
		cache.push(html.substring(beg, end + 6));
		html = html.substring(0, beg) + '#@' + (cache.length - 1) + '#' + html.substring(end + 6);
	}

	while (true) {
		beg = html.indexOf('@{', beg);
		if (beg === -1)
			break;
		end = html.indexOf('}', beg + 2);
		if (end === -1)
			break;
		cache.push(html.substring(beg, end + 1));
		html = html.substring(0, beg) + '#@' + (cache.length - 1) + '#' + html.substring(end + 1);
	}

	html = compressHTML(html, minify, false);

	return html.replace(/#@\d+#/g, function(text) {
		return cache[+text.substring(2, text.length - 1)];
	});
}

/**
 * Inline JS compressor
 * @private
 * @param  {String} html HTML.
 * @param  {Number} index Last index.
 * @return {String}
 */
function compressJS(html, index, filename, nomarkup) {

	if (!CONF.allow_compile_script)
		return html;

	var strFrom = '<script type="text/javascript">';
	var strTo = '</script>';

	var indexBeg = html.indexOf(strFrom, index || 0);
	if (indexBeg === -1) {
		strFrom = '<script>';
		indexBeg = html.indexOf(strFrom, index || 0);
		if (indexBeg === -1)
			return html;
	}

	var indexEnd = html.indexOf(strTo, indexBeg + strFrom.length);
	if (indexEnd === -1)
		return html;

	var js = html.substring(indexBeg, indexEnd + strTo.length).trim();
	var beg = html.indexOf(js);
	if (beg === -1)
		return html;

	var val = js.substring(strFrom.length, js.length - strTo.length).trim();
	var compiled = exports.compile_javascript(val, filename, nomarkup);
	html = html.replacer(js, strFrom + compiled.trim() + strTo.trim());
	return compressJS(html, indexBeg + compiled.length + 9, filename, nomarkup);
}

function compressCSS(html, index, filename, nomarkup) {

	if (!CONF.allow_compile_style)
		return html;

	var strFrom = '<style';
	var strTo = '</style>';

	var indexBeg = html.indexOf(strFrom, index || 0);
	if (indexBeg === -1)
		return html;

	var indexBeg2 = html.indexOf('>', indexBeg + strFrom.length);
	if (indexBeg2 === -1)
		return html;

	strFrom = html.substring(indexBeg, indexBeg2 + 1);

	var indexEnd = html.indexOf(strTo, indexBeg2 + strFrom.length);
	if (indexEnd === -1)
		return html;

	var css = html.substring(indexBeg, indexEnd + strTo.length);
	var val = css.substring(strFrom.length, css.length - strTo.length).trim();
	var compiled = exports.compile_css(val, filename, nomarkup);

	html = html.replacer(css, (strFrom + compiled.trim() + strTo).trim());
	return compressCSS(html, indexBeg2 + compiled.length + 8, filename, nomarkup);
}

function variablesCSS(content) {

	if (!content)
		return content;

	var variables = {};

	content = content.replace(REG_CSS_10, function(text) {
		var index = text.indexOf(':');
		if (index === -1)
			return text;
		var key = text.substring(0, index).trim();
		variables[key] = text.substring(index + 1, text.length - 1).trim();
		return '';
	});

	content = content.replace(REG_CSS_11, function(text) {

		var index = text.indexOf('||');
		var variable = '';
		var last = text[text.length - 1];
		var len = text.length;

		if (last === ';' || last === '}' || last === '!' || last === ' ')
			len = len - 1;
		else
			last = '';

		if (index !== -1)
			variable = variables[text.substring(0, index).trim()] || text.substring(index + 2, len).trim();
		else
			variable = variables[text.substring(0, len).trim()];

		return variable ? (variable + last) : text;
	}).trim();

	return content;
}

function nested(css, id, variable) {

	if (!css)
		return css;

	var index = 0;
	var output = '';
	var A = false;
	var count = 0;
	var beg;
	var begAt;
	var valid = false;
	var plus = '';
	var skip = false;
	var skipImport = '';
	var isComment = false;
	var comment = '';
	var skipView = false;
	var skipType;

	while (true) {

		var a = css[index++];
		if (!a)
			break;

		if (a === '/' && css[index] === '*') {
			isComment = true;
			index++;
			comment = '';
			continue;
		}

		if (isComment) {
			comment += a;
			if (a === '*' && css[index] === '/') {
				isComment = false;
				index++;
				if (comment === 'auto*')
					output += '/*auto*/';
			}
			continue;
		}

		if (a === '\n' || a === '\r')
			continue;

		if (a === '$' && variable)
			variable();

		if (a === '@' && css[index] === '{')
			skipView = true;

		if (skipView) {
			plus += a;
			if (a === '}')
				skipView = false;
			continue;
		}

		if (a === '\'' || a === '"') {
			if (a === skipType && css[index] !== '\\')
				skipType = '';
			else if (!skipType) {
				skipType = a;
			}
		}

		if (skipType) {
			plus += a;
			continue;
		}

		if (a === '@') {
			begAt = index;
			skip = true;
		}

		if (skip && !skipImport && (a === ';' || a === '{')) {
			skipImport = a;
			if (a === ';') {
				output += css.substring(begAt - 1, index);
				skip = false;
				plus = '';
				continue;
			}
		}

		plus += a;

		if (a === '{') {

			if (A) {
				count++;
				continue;
			}

			A = true;
			count = 0;
			beg = index;
			valid = false;
			continue;
		}

		if (a === '}') {

			if (count > 0) {
				count--;
				valid = true;
				continue;
			}

			if (!valid) {
				output += plus;
				plus = '';
				A = false;
				skip = false;
				skipImport = '';
				continue;
			}

			if (skip) {

				if (plus.indexOf('@keyframes') !== -1) {
					output += plus;
				} else {
					begAt = plus.indexOf('{');
					output += plus.substring(0, begAt + 1) + process_nested(plus.substring(begAt), id).trim() + '}';
				}

				A = false;
				skip = false;
				skipImport = '';
				plus = '';

				continue;
			}

			var ni = beg - 1;
			var name = '';

			while (true) {
				var b = css[ni--];
				if (b === '{')
					continue;
				if (b === '}' || b === '\n' || b === '\r' || b === undefined || (skipImport && skipImport === b))
					break;
				name = b + name;
			}

			A = false;
			skip = false;
			skipImport = '';
			plus = '';
			output += process_nested(css.substring(beg - 1, index), (id || '') + name.trim());
		}
	}

	return output + plus;
}

function process_nested(css, name) {
	css = css.trim();
	css = make_nested(css.substring(1, css.length - 1), name);
	return nested(css, name);
}

function make_nested(css, name) {

	var index = 0;
	var plus = '';
	var output = '';
	var count = 0;
	var A = false;
	var valid = false;

	while (true) {
		var a = css[index++];

		if (!a)
			break;

		if (a === '\n' || a === '\r')
			continue;

		if (a !== ' ' || plus[plus.length -1] !== ' ')
			plus += a;

		if (a === '{') {

			if (A) {
				count++;
				continue;
			}

			A = true;
			count = 0;
			valid = false;
			continue;
		}

		if (a === '}') {

			if (count > 0) {
				count--;
				valid = true;
				continue;
			}

			if (!valid) {
				output += name + ' ' + plus.trim();
				plus = '';
				A = false;
				continue;
			}

			output += plus;
		}
	}

	return output;
}

function compressHTML(html, minify, isChunk) {

	if (!html || !minify)
		return html;

	html = removeComments(html.replace(REG_WIN, ''));

	var tags = ['script', 'textarea', 'pre', 'code'];
	var id = '[' + new Date().getTime() + ']#';
	var cache = {};
	var indexer = 0;
	var length = tags.length;
	var chars = 65;
	var tagBeg, tagEnd, beg, end, len, key, value;

	for (var i = 0; i < length; i++) {
		var o = tags[i];

		tagBeg = '<' + o;
		tagEnd = '</' + o;

		beg = html.indexOf(tagBeg);
		end = 0;
		len = tagEnd.length;

		while (beg !== -1) {

			end = html.indexOf(tagEnd, beg + 3);
			if (end === -1) {
				if (isChunk)
					end = html.length;
				else
					break;
			}

			key = id + (indexer++) + String.fromCharCode(chars++);
			if (chars > 90)
				chars = 65;

			value = html.substring(beg, end + len);

			if (!i) {
				end = value.indexOf('>');
				len = value.indexOf('type="text/template"');

				if (len < end && len !== -1) {
					beg = html.indexOf(tagBeg, beg + tagBeg.length);
					continue;
				}

				len = value.indexOf('type="text/html"');

				if (len < end && len !== -1) {
					beg = html.indexOf(tagBeg, beg + tagBeg.length);
					continue;
				}

				len = value.indexOf('type="text/ng-template"');

				if (len < end && len !== -1) {
					beg = html.indexOf(tagBeg, beg + tagBeg.length);
					continue;
				}
			}

			cache[key] = value;
			html = html.replacer(value, key);
			beg = html.indexOf(tagBeg, beg + tagBeg.length);
		}
	}

	while (true) {
		if (!REG_6.test(html))
			break;
		html = html.replace(REG_6, text => text.replace(/\s+/g, ' '));
	}

	html = html.replace(REG_9, '>').replace(REG_10, function(text) {
		return text.trim().replace(/\s/g, '');
	}).replace(REG_5, '><').replace(REG_4, function(text) {
		var c = text[text.length - 1];
		return c === '<' ? c : ' ' + c;
	}).replace(REG_1, '').replace(REG_2, '');

	for (var k in cache)
		html = html.replacer(k, cache[k]);

	return html;
}

/**
 * Read file
 * @param {String} path
 * @return {Object}
 */
function viewengine_read(path, controller) {
	var config = CONF;
	var out = path[0] === '.';
	var filename = out ? path.substring(1) : PATH.views(path);
	var key;

	if (RELEASE) {
		key = '404/' + path;
		var is = F.temporary.other[key];
		if (is !== undefined)
			return null;
	}

	if (existsSync(filename))
		return view_parse(view_parse_localization(modificators(Fs.readFileSync(filename).toString('utf8'), filename, 'view', controller), controller.language), config.allow_compile_html, filename, controller);

	var index;

	if (out) {

		if (controller.themeName) {
			index = filename.lastIndexOf('/');
			if (index !== -1) {
				filename = filename.substring(0, filename.lastIndexOf('/', index - 1)) + filename.substring(index);
				if (existsSync(filename))
					return view_parse(view_parse_localization(modificators(Fs.readFileSync(filename).toString('utf8'), filename, 'view', controller), controller.language), config.allow_compile_html, filename, controller);
			}
		}

		if (RELEASE)
			F.temporary.other[key] = null;

		return null;
	}

	index = path.lastIndexOf('/');
	if (index === -1) {
		if (RELEASE)
			F.temporary.other[key] = null;
		return null;
	}

	filename = PATH.views(path.substring(index + 1));

	if (existsSync(filename))
		return view_parse(view_parse_localization(modificators(Fs.readFileSync(filename).toString('utf8'), filename, 'view', controller), controller.language), config.allow_compile_html, filename, controller);

	if (RELEASE)
		F.temporary.other[key] = null;

	return null;
}

function modificators(value, filename, type, controller) {

	if (filename) {
		var length = F.directory.length;
		if (filename.substring(0, length) === F.directory) {
			filename = filename.substring(length);
			if (filename[0] !== '/')
				filename = '/' + filename;
		}

		if (F.modificators2) {
			var arr = F.modificators2[filename];
			if (arr) {
				for (var i = 0; i < arr.length; i++) {
					var output = arr[i](type || 'view', filename, value, controller);
					if (output)
						value = output;
				}
			}
		}
	}

	if (!F.modificators)
		return value;

	for (var i = 0; i < F.modificators.length; i++) {
		var output = F.modificators[i](type || 'view', filename, value, controller);
		if (output)
			value = output;
	}

	return value;
}

function viewengine_load(name, filename, controller, component) {

	var precompiled = F.routes.views[name];
	if (precompiled)
		filename = '.' + precompiled.filename;
	else
		filename += '.html';

	var key = 'view#' + filename + (controller.language || '');
	var generator = F.temporary.views[key];
	if (generator)
		return generator;

	generator = viewengine_read(filename, controller);

	if (component || RELEASE)
		F.temporary.views[key] = generator;

	return generator;
}

function viewengine_dynamic(content, language, controller, cachekey) {

	var generator = cachekey ? (F.temporary.views[cachekey] || null) : null;
	if (generator)
		return generator;

	generator = view_parse(view_parse_localization(modificators(content, '', 'view', controller), language), CONF.allow_compile_html, null, controller);

	if (cachekey && RELEASE)
		F.temporary.views[cachekey] = generator;

	return generator;
}

function appendModel(str) {
	var index = str.indexOf('(');
	if (index === -1)
		return str;
	var end = str.substring(index + 1);
	return str.substring(0, index) + '(model' + (end[0] === ')' ? end : ',' + end);
}

function cleanURL(url, index) {
	var o = url.substring(0, index);
	var prev;
	var skip = false;

	for (var i = index, length = url.length; i < length; i++) {
		var c = url[i];
		if (c === '/' && prev === '/' && !skip)
			continue;
		prev = c;
		o += c;
	}

	return o;
}

exports.preparepath = function(path, remove) {
	var root = CONF.default_root;
	if (!root)
		return path;
	var is = path[0] === '/';
	if ((is && path[1] === '/') || path[4] === ':' || path[5] === ':')
		return path;
	return remove ? path.substring(root.length - 1) : (root + (is ? path.substring(1) : path));
};

exports.parseURI = function(req) {

	var cache = F.temporary.other[req.host];
	var port;
	var hostname;

	if (cache) {
		port = cache.port;
		hostname = cache.hostname;
	} else {
		port = req.host.lastIndexOf(':');
		if (port === -1) {
			port = null;
			hostname = req.host;
		} else {
			hostname = req.host.substring(0, port);
			port = req.host.substring(port + 1);
		}
		F.temporary.other[req.host] = { port: port, hostname: hostname };
	}

	var search = req.url.indexOf('?', 1);
	var query = null;
	var pathname;

	if (search === -1) {
		search = null;
		pathname = req.url;
	} else {
		pathname = req.url.substring(0, search);
		search = req.url.substring(search);
		query = search.substring(1);
	}

	var index = pathname.indexOf('//');
	if (index !== -1) {
		pathname = cleanURL(pathname, index);
		req.url = pathname;
		if (search)
			req.url += search;
	}

	return { auth: null, hash: null, host: req.host, hostname: hostname, href: req.$protocol + '://' + req.host + req.url, path: req.url, pathname: pathname, port: port, protocol: req.$protocol + ':', query: query, search: search, slashes: true };
};

function destroyStreamopen() {
	if (typeof(this.fd) === 'number')
		this.close();
}

/**
 * Destroy the stream
 * @param {Stream} stream
 * @return {Stream}
 * @author Jonathan Ong <me@jongleberry.com>
 * @license MIT
 * @see {@link https://github.com/stream-utils/destroy}
 */
function destroyStream(stream) {

	if (stream instanceof ReadStream) {
		stream.destroy();
		typeof(stream.close) === 'function' && stream.on('open', destroyStreamopen);
	} else if (stream instanceof Stream)
		typeof(stream.destroy) === 'function' && stream.destroy();

	if (stream.$totalfd) {
		Fs.close(stream.$totalfd, NOOP);
		stream.$totalfd = null;
	}
	return stream;
}

function isFinished(stream) {

	// Response & Request
	if (stream.socket) {
		if (stream.writable && (!stream.socket._writableState || stream.socket._writableState.finished || stream.socket._writableState.destroyed))
			return true;
		if (stream.readable && (!stream.socket._readableState|| stream.socket._writableState.ended || stream.socket._readableState.destroyed))
			return true;
		return false;
	}

	if (stream._readableState && (stream._readableState.ended || stream._readableState.destroyed))
		return true;

	if (stream._writableState && (stream._writableState.finished || stream._writableState.destroyed))
		return true;

	return false;
}

function onFinished(stream, fn) {

	if (stream.$onFinished) {
		fn && fn();
		fn = null;
		return;
	}

	if (stream.$onFinishedQueue) {
		if (stream.$onFinishedQueue instanceof Array)
			stream.$onFinishedQueue.push(fn);
		else
			stream.$onFinishedQueue = [stream.$onFinishedQueue, fn];
		return;
	} else
		stream.$onFinishedQueue = fn;

	var callback = function() {
		!stream.$onFinished && (stream.$onFinished = true);
		if (stream.$onFinishedQueue instanceof Array) {
			while (stream.$onFinishedQueue.length)
				stream.$onFinishedQueue.shift()();
			stream.$onFinishedQueue = null;
		} else if (stream.$onFinishedQueue) {
			stream.$onFinishedQueue();
			stream.$onFinishedQueue = null;
		}
	};

	if (isFinished(stream)) {
		setImmediate(callback);
	} else {

		if (stream.socket) {
			if (!stream.socket.$totalstream) {
				stream.socket.$totalstream = stream;
				if (stream.socket.prependListener) {
					stream.socket.prependListener('error', callback);
					stream.socket.prependListener('close', callback);
				} else {
					stream.socket.on('error', callback);
					stream.socket.on('close', callback);
				}
			}
		}

		if (stream.prependListener) {
			stream.prependListener('error', callback);
			stream.prependListener('end', callback);
			stream.prependListener('close', callback);
			stream.prependListener('aborted', callback);
			stream.prependListener('finish', callback);
		} else {
			stream.on('error', callback);
			stream.on('end', callback);
			stream.on('close', callback);
			stream.on('aborted', callback);
			stream.on('finish', callback);
		}

		//stream.uri --> determines ServerRespone
		// stream.uri && stream.prependListener('aborted', callback);
		// (stream._writableState || stream.uri) && stream.prependListener('finish', callback);
	}
}

exports.encodeUnicodeURL = function(url) {
	var output = url;
	for (var i = 0, length = url.length; i < length; i++) {
		var code = url.charCodeAt(i);
		if (code > 127)
			output = output.replace(url[i], encodeURIComponent(url[i]));
	}
	return output;
};

exports.parseBlock = function(name, content) {

	// @{block name}
	//
	// @{end}

	if (!REG_BLOCK_BEG.test(content))
		return content;

	var newline = '\n';
	var lines = content.split(newline);
	var is = false;
	var skip = false;
	var builder = '';

	name = (name || '').replace(/\s/g, '').split(',');

	for (var i = 0, length = lines.length; i < length; i++) {

		var line = lines[i];

		if (!line)
			continue;

		if (REG_BLOCK_END.test(line)) {
			is = false;
			skip = false;
			continue;
		}

		if (is) {
			if (skip)
				continue;
			builder += line + newline;
			continue;
		}

		var index = line.search(REG_BLOCK_BEG);
		if (index === -1) {
			builder += line + newline;
			continue;
		}

		is = true;
		skip = true;

		var block = line.substring(index + 8, line.indexOf('}', index)).replace(/\|\|/g, ',').replace(/\s/g, '').split(',');
		for (var j = 0, jl = block.length; j < jl; j++) {
			if (name.indexOf(block[j]) === -1)
				continue;
			skip = false;
			break;
		}
	}

	return builder.trim();
};

function existsSync(filename) {
	try {
		return !!Fs.statSync(filename);
	} catch (e) {
		return false;
	}
}

function markup(body, filename) {
	body = body.ROOT();
	var command = view_find_command(body, 0, true);
	if (!command)
		return body;

	var config = CONF;
	var resource = F.resource;
	var M = EMPTYOBJECT;
	var R = EMPTYOBJECT;
	var model = EMPTYOBJECT;
	var repository = EMPTYOBJECT;
	var r = [];

	while (command) {

		var cmd = command.command;
		var name = cmd;

		if (name.substring(0, 2) === '\'%') {
			name = 'config';
			cmd = 'config[\'' + cmd.substring(2) + ']';
		} else {
			var index = name.indexOf('.');
			if (index !== -1)
				name = name.substring(0, index);
			else {
				index = name.indexOf('(');
				if (index !== -1)
					name = name.substring(0, index);
			}
		}

		if (ALLOWEDMARKUP[name]) {
			switch (cmd) {
				case 'author':
					cmd = 'CONF.author';
					break;
				case 'root':
					cmd = 'CONF.default_root';
					break;
			}

			try {
				r.push({ cmd: command.phrase, value: eval('(' + cmd + ')') });
			} catch (e) {
				console.log('A markup compilation error -->', cmd, e, '"' + body.trim().max(0, 150) + '"', filename);
			}
		}

		command = view_find_command(body, command.end, true);
	}

	for (var i = 0; i < r.length; i++)
		body = body.replace(r[i].cmd, r[i].value);

	return body;
}

exports.parseMULTIPART = function(req, type, route) {

	var beg = type.indexOf('boundary=');
	if (beg === -1) {
		F.stats.request.error400++;
		req.res.writeHead(400);
		req.res.end();
		return;
	}

	var end = type.length;

	for (var i = (beg + 10); i < end; i++) {
		if (type[i] === ';' || type[i] === ' ') {
			end = i;
			break;
		}
	}

	var boundary = type.substring(beg + 9, end);
	req.files = [];
	req.body = EMPTYOBJECT;
	req.bodyexceeded = false;
	req.bodyhas = true;

	var parser = U.multipartparser(boundary, req, function(err, meta) {

		F.stats.performance.download += meta.size / 1024 / 1024;

		for (var i = 0; i < meta.files.length; i++) {
			var item = meta.files[i];
			var file = new HttpFile();
			file.path = item.path;
			file.name = item.name;
			file.filename = item.filename;
			file.length = item.size;
			file.width = item.width;
			file.height = item.height;
			file.type = item.type;

			// IE9 sends absolute filename
			var index = file.filename.lastIndexOf('\\');

			// For Unix like senders
			if (index === -1)
				index = file.filename.lastIndexOf('/');

			if (index !== -1)
				file.filename = file.filename.substring(index + 1);

			req.files.push(file);
		}

		req.body = meta.body;

		// Error
		if (err) {
			req.clear();
			switch (err[0][0]) {
				case '4':
				case '5':
				case '6':
					req.bodyexceeded = true;
					route = F.lookup_system(431);
					req.bodydata = null;
					if (route) {
						req.$total_route = route;
						req.$total_execute(431, true);
					} else
						req.res.throw431();
					break;
				default:
					route = F.lookup_system(400);
					req.bodydata = null;
					// req.options.problem = err.substring(3);
					if (route) {
						req.$total_route = route;
						req.$total_execute(400, true);
					} else
						req.res.throw400();
					break;
			}
		} else
			req.$total_end2();
	});

	parser.limits.total = route.length;
};


global.HttpFile = HttpFile;
exports.HttpFile = HttpFile;
exports.viewEngineCompile = viewengine_dynamic;
exports.viewEngine = viewengine_load;
exports.parseLocalization = view_parse_localization;
exports.findLocalization = view_find_localization;
exports.destroyStream = destroyStream;
exports.onFinished = onFinished;
exports.modificators = modificators;
exports.markup = markup;