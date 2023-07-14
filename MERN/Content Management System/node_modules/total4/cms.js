// CMS module v1
// The MIT License
// Copyright 2021 (c) Peter Širka <petersirka@gmail.com>

const SKIP_CLASSES = { CMS_hidden: 1, CMS_mv: 1, CMS_mh: 1, CMS_expression: 1, CMS_multiple: 1 };
const VERSION = 1;

function clean(html) {
	var index = html.indexOf('>');
	var tag = html.substring(5, index);
	tag = tag.replace(/data-cms=".*?"(\s)?|data-cms-id=".*?"(\s)?/, '').trim();
	return '<div' + (tag ? (' ' + tag) : '') + '>' + html.substring(index + 1);
}

function expressions_multiple(body) {

	var index = 0;
	var arr = [];

	while (true) {

		index = body.indexOf('CMS_multiple', index + 12);

		if (index === -1)
			break;

		var b = body.lastIndexOf('<', index);
		var tag = body.substring(b + 1, body.indexOf(' ', b));

		var e = body.indexOf('</' + tag + '>', index);
		var size = e + 3 + tag.length;
		var obj = {};

		obj.id = body.substring(b, body.indexOf('>', b + tag.length)).match(/\s(data-cms-|data-)?id=".*?"/);

		if (obj.id) {
			obj.id = obj.id[0];
			var qi = obj.id.indexOf('"');
			obj.id = obj.id.substring(qi + 1, obj.id.length - 1).trim();
		}

		obj.html = body.substring(b, size);
		obj.body = obj.html.substring(obj.html.indexOf('>') + 1, obj.html.lastIndexOf('<'));
		obj.expressions = expressions(obj.body);
		obj.replace = '<!--cmsmultiple' + GUID(10) + '-->';

		arr.push(obj);
		index = e + 3 + tag.length;
	}

	return arr;
}

function expressions(body) {

	var index = 0;
	var arr = [];

	while (true) {

		index = body.indexOf('CMS_expression', index + 10);

		if (index === -1)
			break;

		var b = body.lastIndexOf('<', index);
		var tag = body.substring(b + 1, body.indexOf(' ', b));

		var e = body.indexOf('</' + tag + '>', index);
		var size = e + 3 + tag.length;
		var obj = {};
		obj.replace = obj.html = body.substring(b, size);
		obj.body = obj.html.substring(obj.html.indexOf('>') + 1, obj.html.lastIndexOf('<'));
		obj.text = obj.body.removeTags();
		arr.push(obj);
		index = e + 3 + tag.length;
	}

	return arr;
}

function trash(body) {
	var index = 0;
	var tags = ['CMS_trash', 'CMS_editor'];

	for (var t of tags) {
		while (true) {

			index = body.indexOf(t, index + t.length);

			if (index === -1)
				break;

			var b = body.lastIndexOf('<', index);
			var tag = body.substring(b + 1, body.indexOf(' ', b));
			var e = body.indexOf('</' + tag + '>', index);
			var size = e + 3 + tag.length;
			body = body.replace(body.substring(b, size), '');
			index = e + 3 + tag.length;

		}
	}

	return body;
}

function layout(body, append) {

	var index = body.indexOf(' id="CMS"');
	if (index === -1)
		return body;

	var beg = body.lastIndexOf('<', index);
	if (beg === -1)
		return body;

	var tag = body.substring(beg + 1, body.indexOf(' ', beg));
	var tagend = '</' + tag + '>';
	var count = 0;
	var end = body.indexOf('>', beg) + 1;

	tag = '<' + tag;

	while (true) {

		var str = body.substring(index, index + tagend.length);

		if (index >= body.length) {
			beg = body.length;
			break;
		}

		if (str === tagend) {
			if (count) {
				count--;
				index++;
				continue;
			}
			return body.substring(0, end) + append + body.substring(index);
		}

		if (str.substring(0, tag.length) === tag)
			count++;

		index++;
	}

	return body;
}

// Cleans CMS markup
function tidy(body) {

	var beg;
	var end;
	var index = 0;
	var count = 0;
	var c = 'CMS_unwrap';
	var tag;
	var tagend;

	body = U.minify_html(body);

	while (true) {

		beg = body.indexOf(c, beg);

		if (beg === -1)
			break;

		index = beg;
		while (true) {
			if (body[--index] === '<' || index <= 0)
				break;
		}

		if (index === beg || index <= 0)
			return;

		tag = body.substring(index + 1, body.indexOf('>', index + 1));
		end = index + tag.length + 2;
		tag = tag.substring(0, tag.indexOf(' '));
		tagend = '</' + tag;
		tag = '<' + tag;
		count = 0;
		beg = index;
		index = end;

		while (true) {
			var str = body.substring(index, index + tagend.length);

			if (index >= body.length) {
				beg = body.length;
				break;
			}

			if (str === tagend) {

				if (count) {
					count--;
					index++;
					continue;
				}

				body = body.substring(0, beg) + body.substring(end, index) + body.substring(index + 1 + tagend.length);
				break;
			}

			if (str.substring(0, tag.length) === tag)
				count++;

			index++;
		}
	}

	return body.replace(/(\s)class=".*?"/g, function(text) {

		var is = text[0] === ' ';
		var arr = text.substring(is ? 8 : 7, text.length - 1).split(' ');
		var builder = '';

		for (var i = 0; i < arr.length; i++) {
			var cls = arr[i];
			if (cls[0] === 'C' && cls[1] === 'M' && cls[2] === 'S' && !SKIP_CLASSES[cls])
				continue;
			builder += (builder ? ' ' : '') + cls;
		}

		return builder ? ((is ? ' ' : '') + 'class="' + builder + '"') : '';

	}).replace(/<div\s>/g, '<div>');
}

exports.compile = function(html, widgets, used) {

	var arr = html.match(/data-cms=".*?"/g) || EMPTYARRAY;
	var response = new CMSRender();
	var indexer = 0;
	var beg;
	var end;
	var index;

	response.css = [];
	response.js = [];
	response.widgets = [];
	response.cache = {};

	if (!used) {
		for (var widget of widgets) {
			if (widget.css)
				response.css.push(U.minify_css(widget.css));
			if (widget.js)
				response.js.push(U.minify_js(widget.js));
			if (widget.ui) {
				widget.ui.css && response.css.push(U.minify_css(widget.ui.css));
				widget.ui.js && response.js.push(U.minify_js(widget.ui.js));
			}
		}
	}

	for (var attr of arr) {

		if (html.indexOf(attr) === -1)
			continue;

		var w = attr.substring(10);
		var index = w.indexOf('__');
		var id = w.substring(0, index);

		index = html.lastIndexOf('<', html.indexOf(attr));
		beg = '<div';
		end = '</div>';

		var pos = index + 1;
		var count = 0;
		var counter = 0;

		while (true) {

			if (counter++ > 100)
				break;

			var a = html.indexOf(beg, pos);
			var b = html.indexOf(end, pos);

			if (a !== -1 && a < b) {
				count++;
				pos = html.indexOf('>', a);
				continue;
			}

			if (a === -1 || b < a) {

				pos = b + 6;

				if (count) {
					count--;
					continue;
				}

				break;
			}
		}

		var widget = widgets instanceof Array ? widgets.findItem('id', id) : widgets[id];
		var body = html.substring(index, pos);

		// Widget not found
		if (!widget) {
			html = html.replace(body, '');
			continue;
		}

		if (used) {

			if (widget.css)
				response.css.push(U.minify_css(widget.css));

			if (widget.js)
				response.js.push(U.minify_js(widget.js));

			if (widget.ui) {
				widget.ui.css && response.css.push(U.minify_css(widget.ui.css));
				widget.ui.js && response.js.push(U.minify_js(widget.ui.js));
			}

		}

		if (!widget.render) {
			html = html.replace(body, clean(body));
			continue;
		}

		html = html.replace(body, '~WIDGET' + indexer + '~');
		index = body.indexOf('>');
		body = body.substring(0, index + 1) + '~BEG~' + body.substring(index + 1);
		index = body.lastIndexOf('<');
		body = body.substring(0, index) + '~END~' + body.substring(index);

		index = w.indexOf('__');
		var config = decodeURIComponent(w.substring(index + 2, w.length - 1)).parseJSON(true);

		var opt = {};
		opt.id = id;
		opt.indexer = indexer;
		opt.body = tidy(clean(body));
		opt.text = body.substring(body.lastIndexOf('~BEG~') + 5, body.lastIndexOf('~END~'));
		opt.config = config || EMPTYOBJECT;
		opt.render = widget.render;
		opt.beg = opt.body.substring(0, opt.body.indexOf('>') + 1);
		opt.end = opt.body.substring(opt.body.lastIndexOf('<'));

		index = opt.beg.indexOf('data-cms-id="');

		if (index === -1)
			opt.uid = opt.beg.makeid();
		else
			opt.uid = opt.beg.substring(index + 13, opt.beg.indexOf('"', index + 14));

		response.widgets.push(opt);
		indexer++;
	}

	response.html = tidy(trash(layout(html, '~WIDGETLAYOUT~')));
	response.multiple = expressions_multiple(response.html);

	for (var item of response.multiple)
		response.html = response.html.replace(item.html, item.replace);

	response.expressions = expressions(response.html);
	response.widgets.reverse();

	var builder = [];
	var text = [];

	while (true) {
		beg = response.html.indexOf('~WIDGET');
		if (beg !== -1) {
			end = response.html.indexOf('~', beg + 6) + 1;
			var h = response.html.substring(0, beg);
			var windex = response.html.substring(beg + 7, end - 1);
			if (windex === 'LAYOUT') {
				response.html = response.html.substring(end);
				builder.push('text[{0}]+body'.format(text.push(h) - 1));
			} else {
				indexer = +windex;
				response.html = response.html.substring(end);
				if (h)
					builder.push('text[{0}]+widget[{1}]'.format(text.push(h) - 1, indexer));
				else
					builder.push('widget[{0}]'.format(indexer));
			}

		} else {
			builder.push('text[{0}]'.format(text.push(response.html) - 1));
			break;
		}
	}

	response.js = response.js.length ? response.js.join('\n') : '';
	response.css = response.css.length ? response.css.join('') : '';
	response.toString = new Function('text', 'widget', 'body', 'return ' + builder.join('+'));
	response.text = text;
	delete response.html;
	return response;
};

function CMSRender() {}

CMSRender.prototype.importmeta = function(val) {
	var self = this;
	for (var i = 0; i < self.text.length; i++) {
		var item = self.text[i];
		var index = item.indexOf('</head');
		if (index !== -1) {
			self.text[i] = item.substring(0, index) + val + item.substring(index);
			return self;
		}
	}
	return self;
};

CMSRender.prototype.importcss = function(val) {

	var self = this;

	if (val == null) {
		if (self.css)
			val = '<style>' + self.css + '</style>';
		else
			return self;
	}

	for (var i = 0; i < self.text.length; i++) {
		var item = self.text[i];
		var index = item.indexOf('</head');
		if (index !== -1) {
			self.text[i] = item.substring(0, index) + val + item.substring(index);
			return self;
		}
	}

	self.text[0] += val;
	return self;
};

CMSRender.prototype.importjs = function(val) {
	var self = this;

	if (val == null) {
		if (self.js)
			val = '<script>' + self.js + '</script>';
		else
			return self;
	}

	for (var i = 0; i < self.text.length; i++) {
		var item = self.text[i];
		var index = item.indexOf('</body>');
		if (index !== -1) {
			self.text[i] = item.substring(0, index) + val + item.substring(index);
			return self;
		}
	}

	self.text[self.text.length - 1] += val;
	return self;
};

CMSRender.prototype.render = function(meta, layout, callback) {
	var self = this;
	if (callback)
		self._render(meta, layout, callback);
	else
		return new Promise((resolve, reject) => self._render(meta, layout, (err, res) => err ? reject(err) : resolve(res)));
};

CMSRender.prototype._render = function(meta, layout, callback) {

	// meta.controller {Object}
	// meta.url {String}
	// meta.vars {Object}
	// meta.refs {Object}
	// meta.body {String} targeted for the layout
	// meta.nav {Object Array}
	// meta.breadcrumb {Object Array}
	// meta.widgets {Object Array}

	if (typeof(layout) === 'function') {
		callback = layout;
		layout = null;
	}

	var self = this;
	var widgets = [];
	var opt = {};

	for (var key in meta) {
		if (key !== 'widgets')
			opt[key] = meta[key];
	}

	self.widgets.wait(function(item, next) {

		opt.id = item.uid;
		opt.widget = item.id;
		opt.version = VERSION;
		opt.config = item.config;
		opt.body = item.body || '';
		opt.html = item.html || '';
		opt.template = item.template;
		opt.cacheid = opt.id;

		var render = item.render;
		if (meta.widgets) {
			var w = meta.widgets instanceof Array ? meta.widgets.findItem('id', item.id) : meta.widgets[item.id];
			if (w) {
				render = w.render;
				if (w.cache === 'url' && opt.url)
					opt.cacheid += '_' + HASH(opt.url).toString(36);
			}

		}

		if (self.cache[opt.cacheid]) {
			widgets[item.indexer] = self.cache[opt.cacheid];
			next();
			return;
		}

		render(opt, function(response, replace, cache) {
			widgets[item.indexer] = replace === true ? response == null ? '' : (response + '').replace(/~(BEG|END)~/g, '') : (item.beg + (response || '') + item.end);
			if (cache)
				self.cache[opt.cacheid] = widgets[item.indexer];
			next();
		});

	}, function() {
		var html = self.toString(self.text, widgets, meta.body || '');
		if (layout) {
			meta.body = html;
			layout.render(meta, callback);
		} else
			callback.call(self, null, html, self);
	});

};