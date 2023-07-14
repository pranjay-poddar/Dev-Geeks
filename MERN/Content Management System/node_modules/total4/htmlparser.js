require('./utils');

function HTMLElement() {
	this.children = [];
}

HTMLElement.prototype = {
	get innerHTML() {
		return this.toString();
	},
	get innerText() {
		return this.toString().removeTags();
	}
};

function parseRule(selector, output) {

	var rule = {};

	rule.attrs = [];
	rule.output = output || [];

	// div div[name="Peter Sirka"]
	// div > div[name="Peter Sirka"]

	// for (var c of selector) {
	// 	if (c === '>')
	// 		console.log(c);
	// }

	var cache = [];

	selector = selector.replace(/\[.*?\]/gi, text => '[' + (cache.push(text) - 1) + ']').replace(/(\s)?>(\s)?/, '>').replace(/\s{2}/g, '');

	var m = selector.match(/>|\s/);
	if (m) {
		var nested = selector.substring(m.index + 1).trim().replace(/\[\d+\]/g, text => cache[+text.substring(1, text.length - 1)]);
		rule.nested = parseRule(nested, rule.output);
		rule.direct = m[0] === '>';
		selector = selector.substring(0, m.index).trim();
	}

	selector = selector.replace(/\[\d+\]/, text => cache[+text.substring(1, text.length - 1)]);

	var match = selector.match(/[#|.][a-z-_0-9]+/i);
	if (match) {
		for (var m of match) {
			var val = m.substring(1);
			rule.attrs.push({ id: m[0] === '#' ? 'id' : 'class', value: val });
		}
		selector = selector.replace(match, '');
	}

	match = selector.match(/\[.*?\]/i);
	if (match) {
		for (var m of match) {
			var index = m.indexOf('=');
			rule.attrs.push({ id: m.substring(1, index).trim(), value: m.substring(index + 2, m.length - 2).trim() });
		}
		selector = selector.replace(match, '');
	}

	selector = selector.trim();
	rule.tagName = selector[0] === '*' ? '' : selector.toUpperCase();

	return rule;
}

HTMLElement.prototype.browse = function(fn, reverse) {

	var self = this;

	var browse = function(children) {
		for (var node of children) {
			if (node && node.tagName) {
				var a = fn(node);
				if (a !== true)
					browse(reverse ? [node.parentNode] : node.children);
			}
		}
	};

	if (reverse && !self.parentNode)
		return;

	browse(reverse ? [self.parentNode] : self.children);
	return self;
};

function extendarr(output) {

	output.aclass = function(cls) {
		for (var item of this)
			item.aclass(cls);
		return this;
	};

	output.rclass = function(cls) {
		for (var item of this)
			item.rclass(cls);
		return this;
	};

	output.tclass = function(cls, value) {
		for (var item of this)
			item.tclass(cls, value);
		return this;
	};

	output.attr = function(key, value) {
		for (var item of this)
			item.attr(key, value);
		return this;
	};

	output.attrd = function(key, value) {
		for (var item of this)
			item.attrd(key, value);
		return this;
	};

	output.find = function(selector) {
		var arr = [];
		for (var item of this) {
			var result = item.find(selector);
			if (result.length)
				arr.push(result);
		}
		extendarr(arr);
		return this;
	};

	return output;
}

HTMLElement.prototype.find = function(selector, reverse) {

	var self = this;
	var selectors = selector.split(',');
	var rules = [];
	var output = [];

	for (var sel of selectors)
		rules.push(parseRule(sel.trim()));

	var browse = function(rule, children, parent) {

		for (var node of children) {

			if (!node.tagName)
				continue;

			var skip = false;

			if (rule.tagName && rule.tagName !== node.tagName)
				skip = true;

			if (rule.attrs.length && !skip) {

				for (var attr of rule.attrs) {

					switch (attr.id) {

						case 'class':
							var tmp = node.attrs[attr.id];
							if (tmp) {
								tmp = tmp.split(' ');
								if (!tmp.includes(attr.value))
									skip = true;
							} else
								skip = true;
							break;

						default:
							if (attr.value) {
								if (node.attrs[attr.id] !== attr.value)
									skip = true;
							} else if (node.attrs[attr.id] === undefined)
								skip = true;

							break;
					}

					if (skip)
						break;
				}
			}

			var next = ((reverse && node.parentNode) || (!reverse && node.children.length));

			if (parent) {
				if (skip && parent.direct)
					continue;
			}

			if (rule.nested) {

				if (!skip && next)
					browse(rule.nested, reverse ? [node.parentNode] : node.children, rule);

				// Again same
				if (!parent)
					browse(rule, reverse ? [node.parentNode] : node.children);

			} else {
				if (!skip)
					rule.output.push(node);
				if (next)
					browse(rule, reverse ? [node.parentNode] : node.children);
			}
		}
	};

	if (reverse && !self.parentNode)
		return output;

	for (var rule of rules) {
		browse(rule, reverse ? [self.parentNode] : self.children);
		if (rule.output.length)
			output.push.apply(output, rule.output);
	}

	extendarr(output);
	return output;
};

HTMLElement.prototype.parent = function() {
	return this.parentNode;
};

HTMLElement.prototype.closest = function(selector) {
	return this.find(selector, true);
};

HTMLElement.prototype.attrd = function(name, value) {
	return this.attr('data-' + name, value);
};

HTMLElement.prototype.parsecache = function() {

	var self = this;
	if (self.cache)
		return self;

	self.cache = {};
	self.cache.css = {};
	self.cache.cls = {};

	var tmp = self.attrs.class;
	var arr;

	if (tmp) {
		arr = tmp.split(' ');
		for (var c of arr)
			self.cache.cls[c] = 1;
	}

	var tmp = self.attrs.style;
	if (tmp) {
		arr = tmp.split(';');
		for (var c of arr) {
			var a = c.split(':');
			self.cache.css[a[0]] = a[1];
		}
	}

	return self;
};

HTMLElement.prototype.stringifycache = function() {
	var self = this;
	self.attrs.class = Object.keys(self.cache.cls).join(' ');

	var tmp = [];

	for (var key in self.cache.css)
		tmp.push(key + ':' + self.cache.css[key]);

	if (tmp.length)
		self.attrs.style = tmp.join(';');
	else if (self.attrs.style != null)
		delete self.attrs.style;

	return self;
};

HTMLElement.prototype.attr = function(name, value) {

	var self = this;

	if (value === undefined)
		return self.attrs[name];

	if (value == null || value == '')
		delete self.attrs[name];
	else
		self.attrs[name] = value + '';

	return self;
};

HTMLElement.prototype.aclass = function(cls) {
	var self = this;
	self.parsecache();
	var arr = cls.split(/\s|,/);
	for (var m of arr)
		self.cache.cls[m] = 1;
	self.stringifycache();
	return self;

};

HTMLElement.prototype.hclass = function(cls) {
	var self = this;
	self.parsecache();
	return self.cache.cls[cls] === 1;
};

HTMLElement.prototype.tclass = function(cls, value) {
	var self = this;
	self.parsecache();
	var arr = cls.split(/\s|,/);
	for (var m of arr) {
		if (self.cache.cls[m]) {
			if (!value)
				delete self.cache.cls[m];
		} else {
			if (value || value === undefined)
				self.cache.cls[m] = 1;
		}
	}
	self.stringifycache();
	return self;
};

HTMLElement.prototype.rclass = function(cls) {
	var self = this;
	self.parsecache();

	var arr = cls.split(/\s|,/);
	for (var m of arr)
		delete self.cache.cls[m];

	self.stringifycache();
	return self;
};

HTMLElement.prototype.css = function(key, value) {
	var self = this;
	self.parsecache();
	if (typeof(key) === 'object') {
		for (var k of key) {
			value = key[k];
			if (value)
				self.cache.css[k] = value;
			else
				delete self.cache.css[k];
		}
	} else {
		if (value)
			self.cache.css[key] = value;
		else
			delete self.cache.css[key];
	}
	self.stringifycache();
	return self;
};

HTMLElement.prototype.remove = function() {
	var self = this;
	if (self.parentNode) {
		var index = self.parentNode.children.indexOf(self);
		if (index !== -1)
			self.parentNode.children.splice(index, 1);
	}
	return self;
};

HTMLElement.prototype.append = function(str) {

	var self = this;
	var dom = parseHTML(str);

	for (var item of dom.children)
		self.children.push(item);

	return dom.children.length === 1 ? dom.children[0] : dom.children;
};

HTMLElement.prototype.prepend = function(str) {

	var self = this;
	var dom = parseHTML(str);

	for (var item of dom.children)
		self.children.unshift(item);

	return dom;
};

HTMLElement.prototype.text = function() {
	return this.html().removeTags();
};

HTMLElement.prototype.toString = HTMLElement.prototype.html = function(formatted) {

	var self = this;
	var builder = [];

	var browse = function(children, level) {

		for (var item of children) {

			var indent = formatted && level ? ''.padLeft(level, '\t') : '';
			var tag = item.tagName.toLowerCase();
			var attrs = [];

			for (var key in item.attrs) {
				var val = item.attrs[key];
				if (!val && (key === 'class' || key.substring(0, 5) === 'data-' || key === 'id'))
					continue;
				attrs.push(key + (val ? ('="' + (val || '') + '"') : ''));
			}

			switch (item.tagName) {
				case 'TEXT':
					if (item.textContent)
						builder.push(indent + item.textContent);
					break;
				default:
					if (item.unpair) {
						builder.push(indent + '<' + tag + (attrs.length ? (' ' + attrs.join(' ')) : '') + ' />');
					} else {
						builder.push(indent + '<' + tag + (attrs.length ? (' ' + attrs.join(' ')) : '') + '>' + (item.children.length ? '' : ('</' + tag + '>')));
						if (item.children.length) {
							browse(item.children, level + 1);
							builder.push(indent + '</' + tag + '>');
						}
					}
					break;
			}
		}
	};

	browse(self.tagName ? [self] : self.children, 0);
	return builder.join(formatted ? '\n' : '');
};

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
		html = html.replacer(comment, '');
		beg = html.indexOf(tagBeg, beg);
	}

	return html;
}

function parseHTML(html, trim, onerror) {

	var makeText = function(parent, str) {
		var obj = new HTMLElement();
		obj.tagName = 'TEXT';
		obj.children = [];
		obj.attrs = {};
		obj.textContent = str;
		obj.parentNode = parent;
		return obj;
	};

	var parseAttrs = function(str) {
		var attrs = str.match(/[a-z-0-9]+(=("|').*?("|'))?/g);
		var obj = {};
		if (attrs) {
			for (var m of attrs) {
				m = m.trim();
				var index = m.indexOf('=');
				var key, val;
				key = (index === -1 ? m : m.substring(0, index)).trim();
				val = index === -1 ? '' : m.substring(m.indexOf('"', index) + 1, m.lastIndexOf('"')).trim();
				obj[key] = val;
			}
		}
		return obj;
	};

	var parseElements = function(str, parent) {

		var counter = 0;
		var count = 0;
		var beg = str.indexOf('<');
		var end = -1;
		var tmp;

		if (beg !== -1)
			end = str.indexOf('>', beg + 1);

		if (beg === -1 || end === -1) {
			if (parent) {
				tmp = str;
				if (trim)
					tmp = tmp.trim();
				tmp && parent.children.push(makeText(parent, tmp));
			}
			return '';
		}


		if (beg > 0) {
			tmp = str.substring(0, beg);

			if (trim)
				tmp = tmp.trim();

			if (tmp)
				parent.children.push(makeText(parent, tmp));
		}

		var node = str.substring(beg + 1, end);
		var dom = new HTMLElement();

		// Doctype?
		if (node[0] === '!')
			return str.substring(end + 1);

		if (node[node.length - 1] === '/') {
			node = node.substring(0, node.length - 1);
			dom.unpair = true;
		}

		var tag = node;
		var index = tag.indexOf(' ');

		if (index > 0) {
			tag = tag.substring(0, index);
			node = node.substring(index + 1);
		} else
			node = '';

		if (tag.indexOf('/') !== -1) {
			onerror && onerror(tag);
			return;
		}

		dom.tagName = tag.toUpperCase();
		dom.children = [];
		dom.attrs = node ? parseAttrs(node) : {};
		dom.raw = tag;
		dom.parentNode = parent;

		parent.children.push(dom);
		str = str.substring(end + 1);

		// Unpair tags
		switch (dom.tagName) {
			case 'BR':
			case 'HR':
			case 'IMG':
			case 'META':
			case 'LINK':
			case 'INPUT':
				dom.unpair = true;
				return str;
		}

		var pos = 0;
		var tagBeg = '<' + dom.raw;
		var tagEnd = '</' + dom.raw + '>';

		while (true) {

			if (counter++ > 10000)
				break;

			beg = str.indexOf(tagBeg, pos);
			end = str.indexOf(tagEnd, pos);

			// Fallback for the non-exists end tag
			if (end === -1) {
				end = str.length;
				pos = end;
				break;
			}

			if (beg !== -1 && beg < end) {
				count++;
				pos = str.indexOf('>', beg);
			}

			if (beg === -1 || end < beg) {

				pos = end + tagEnd.length;

				if (count) {
					count--;
					continue;
				}

				break;
			}
		}

		var inner = str.substring(0, pos - tagEnd.length);

		if (inner.indexOf('<') === -1 || (/script|style|template/).test(tag)) {
			if (trim)
				inner = inner.trim();
			if (inner)
				dom.children.push(makeText(dom, inner));
		} else {
			while (inner)
				inner = parseElements(inner, dom);
		}

		str = str.substring(end + tagEnd.length, str.length);

		if (str && str.indexOf('<') === -1) {
			if (trim)
				str = str.trim();
			if (str)
				parent.children.push(makeText(parent, str));
		}

		return str;
	};

	html = removeComments(html);

	var dom = new HTMLElement();

	while (html)
		html = parseElements(html, dom);

	return dom;
}

exports.parseHTML = parseHTML;