COMPONENT('loading', function(self, config, cls) {

	var delay;
	var prev;

	self.readonly();
	self.singleton();
	self.nocompile();

	self.make = function() {
		self.aclass(cls + ' ' + cls + '-' + (config.style || 1));
		self.append('<div><div class="' + cls + '-text hellip"></div></div>');
	};

	self.show = function(text) {
		clearTimeout(delay);

		if (prev !== text) {
			prev = text;
			self.find('.' + cls + '-text').html(text || '');
		}

		self.rclass('hidden');
		return self;
	};

	self.hide = function(timeout) {
		clearTimeout(delay);
		delay = setTimeout(function() {
			self.aclass('hidden');
		}, timeout || 1);
		return self;
	};

});

COMPONENT('form', 'zindex:12;scrollbar:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container;
	var csspos = {};

	if (!W.$$form) {

		W.$$form_level = W.$$form_level || 1;
		W.$$form = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			setTimeout2('form', function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'form' && !HIDDEN(com.dom) && com.$ready && !com.$removed)
						com.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			var el = $(e.target);
			if (e.target === this || el.hclass(cls + '-container-padding')) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			if (!(el.hclass(cls + '-container-padding') || el.hclass(cls + '-container')))
				return;

			var form = $(this).find(cls2);
			var c = cls + '-animate-click';
			form.aclass(c);

			setTimeout(function() {
				form.rclass(c);
			}, 300);
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide, self.element);
		else
			self.hide();
	};

	self.cancel = function() {
		config.cancel && self.EXEC(config.cancel, self.hide);
		self.hide();
	};

	self.hide = function() {
		if (config.independent)
			self.hideforce();
		self.esc(false);
		self.set('');
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass(value.icon.indexOf(' ') === -1 ? ('fa fa-' + value.icon) : value.icon);
		el.tclass('hidden', !value.icon);
	};

	self.resize = function() {

		if (self.scrollbar) {
			container.css('height', WH);
			self.scrollbar.resize();
		}

		if (!config.center || self.hclass('hidden'))
			return;

		var ui = self.find(cls2);
		var fh = ui.innerHeight();
		var wh = WH;
		var r = (wh / 2) - (fh / 2);
		csspos.marginTop = (r > 30 ? (r - 15) : 20) + 'px';
		ui.css(csspos);
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}-scrollbar"><div class="{4}-container-padding"><div class="{4}" style="max-width:{1}px"><div data-bind="@config__text span:value.title__change .{4}-icon:@icon" class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="fa fa-times"></i></button><i class="{4}-icon"></i><span></span></div></div></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		if (scr.length)
			scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2)[0];
		container = el.find(cls2 + '-scrollbar');

		if (config.scrollbar) {
			el.css('overflow', 'hidden');
			self.scrollbar = SCROLLBAR(el.find(cls2 + '-scrollbar'), { visibleY: 1, orientation: 'y', shadow: 1 });
		}

		while (self.dom.children.length)
			body.appendChild(self.dom.children[0]);

		self.rclass('hidden invisible');
		self.replace(el, true);

		self.event('scroll', function() {
			EMIT('scroll', self.name);
			EMIT('reflow', self.name);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			switch (t.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (init)
			return;
		switch (key) {
			case 'width':
				value !== prev && self.find(cls2).css('max-width', value + 'px');
				break;
			case 'closebutton':
				self.find(cls2 + '-button-close').tclass('hidden', value !== true);
				break;
		}
	};

	self.esc = function(bind) {
		if (bind) {
			if (!self.$esc) {
				self.$esc = true;
				$(W).on('keydown', self.esc_keydown);
			}
		} else {
			if (self.$esc) {
				self.$esc = false;
				$(W).off('keydown', self.esc_keydown);
			}
		}
	};

	self.esc_keydown = function(e) {
		if (e.which === 27 && !e.isPropagationStopped()) {
			var val = self.get();
			if (!val || config.if === val) {
				e.preventDefault();
				e.stopPropagation();
				self.hide();
			}
		}
	};

	self.hideforce = function() {
		if (!self.hclass('hidden')) {
			self.aclass('hidden');
			self.release(true);
			self.find(cls2).rclass(cls + '-animate');
			W.$$form_level--;
		}
	};

	var allowscrollbars = function() {
		$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
	};

	self.setter = function(value) {

		setTimeout2(self.name + '-noscroll', allowscrollbars, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && self.EXEC(config.reload, self);
				config.default && DEFAULT(self.makepath(config.default), true);
			}
			return;
		}

		setTimeout2(cls, function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			if (!config.independent)
				self.hideforce();
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find(cls2).append(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$form_level < 1)
			W.$$form_level = 1;

		W.$$form_level++;

		self.css('z-index', W.$$form_level * config.zindex);
		self.aclass('invisible');
		self.rclass('hidden');
		self.resize();
		self.release(false);

		if (self.scrollbar)
			self.scrollbar.scrollTop(0);
		else
			self.element.scrollTop(0);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		if (!isMOBILE && config.autofocus) {
			setTimeout(function() {
				self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea').eq(0).focus();
			}, 1000);
		}

		setTimeout(function() {
			self.rclass('invisible');
			if (self.scrollbar)
				self.scrollbar.scrollTop(0);
			else
				self.element.scrollTop(0);
			self.find(cls2).aclass(cls + '-animate');
		}, 200);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$form_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});

COMPONENT('validation', 'delay:100;flags:visible', function(self, config, cls) {

	var path, elements = null;
	var def = 'button[name="submit"]';
	var flags = null;
	var tracked = false;
	var reset = 0;
	var old, track;

	self.readonly();

	self.make = function() {
		elements = self.find(config.selector || def);
		path = self.path.replace(/\.\*$/, '');
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'selector':
				if (!init)
					elements = self.find(value || def);
				break;
			case 'flags':
				if (value) {
					flags = value.split(',');
					for (var i = 0; i < flags.length; i++)
						flags[i] = '@' + flags[i];
				} else
					flags = null;
				break;
			case 'track':
				track = value.split(',').trim();
				break;
		}
	};

	var settracked = function() {
		tracked = 0;
	};

	self.setter = function(value, path, type) {

		var is = path === self.path || path.length < self.path.length;

		if (reset !== is) {
			reset = is;
			self.tclass(cls + '-modified', !reset);
		}

		if ((type === 1 || type === 2) && track && track.length) {
			for (var i = 0; i < track.length; i++) {
				if (path.indexOf(track[i]) !== -1) {
					tracked = 1;
					return;
				}
			}
			if (tracked === 1) {
				tracked = 2;
				setTimeout(settracked, config.delay * 3);
			}
		}
	};

	var check = function() {
		var disabled = tracked ? !VALID(path, flags) : DISABLED(path, flags);
		if (!disabled && config.if)
			disabled = !EVALUATE(self.path, config.if);
		if (disabled !== old) {
			elements.prop('disabled', disabled);
			self.tclass(cls + '-ok', !disabled);
			self.tclass(cls + '-no', disabled);
			old = disabled;
		}
	};

	self.state = function(type, what) {
		if (type === 3 || what === 3)
			tracked = 0;
		setTimeout2(self.ID, check, config.delay);
	};

});

COMPONENT('textarea', 'scrollbar:true', function(self, config, cls) {

	var cls2 = '.' + cls;
	var input, placeholder, content = null;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		if (config.disabled || !config.required || config.readonly)
			return true;
		if (value == null)
			value = '';
		else
			value = value.toString();
		return value.length > 0;
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'readonly':
				self.find('textarea').prop('readonly', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('textarea').prop('disabled', value);
				self.reset();
				break;
			case 'required':
				self.noValid(!value);
				!value && self.state(1, 1);
				self.tclass(cls + '-required', value);
				break;
			case 'placeholder':
				placeholder.html(value || '');
				break;
			case 'maxlength':
				input.prop('maxlength', value || 1000);
				break;
			case 'label':
				redraw = true;
				break;
			case 'autofocus':
				input.focus();
				break;
			case 'monospace':
				self.tclass(cls + '-monospace', value);
				break;
			case 'icon':
				redraw = true;
				break;
			case 'format':
				self.format = value;
				self.refresh();
				break;
			case 'height':
				self.find('textarea').css('height', (value > 0 ? value + 'px' : value));
				break;
		}

		redraw && setTimeout2('redraw' + self.id, function() {
			self.redraw();
			self.refresh();
		}, 100);
	};

	self.redraw = function() {

		var attrs = [];
		var builder = [];
		var placeholderelement = '';

		self.tclass('ui-disabled', !!config.disabled);
		self.tclass(cls + '-monospace', !!config.monospace);
		self.tclass(cls + '-required', !!config.required);

		config.placeholder && (placeholderelement = '<div class="{0}-placeholder">{1}</div>'.format(cls, config.placeholder));
		config.maxlength && attrs.attr('maxlength', config.maxlength);
		config.error && attrs.attr('error');
		attrs.attr('data-jc-bind', '');
		config.height && attrs.attr('style', 'height:{0}px'.format(config.height));
		config.autofocus === 'true' && attrs.attr('autofocus');
		config.disabled && attrs.attr('disabled');
		config.readonly && attrs.attr('readonly');
		builder.push('{1}<textarea {0}></textarea>'.format(attrs.join(' '), placeholderelement));

		var label = config.label || content;

		if (!label.length) {
			config.error && builder.push('<div class="{0}-helper"><i class="fa fa-warning" aria-hidden="true"></i> {1}</div>'.format(cls, config.error));
			self.aclass(cls + ' ' + cls + '-container');
			self.html(builder.join(''));
		} else {
			var html = builder.join('');
			builder = [];
			builder.push('<div class="' + cls + '-label">');
			config.icon && builder.push('<i class="fa fa-{0}"></i>'.format(config.icon));
			builder.push(label);
			builder.push(':</div><div class="{0}">{1}</div>'.format(cls, html));
			config.error && builder.push('<div class="{0}-helper"><i class="fa fa-warning" aria-hidden="true"></i> {1}</div>'.format(cls, config.error));
			self.html(builder.join(''));
			self.rclass(cls);
			self.aclass(cls + '-container');
		}

		input = self.find('textarea');
		placeholder = self.find(cls2 + '-placeholder');

		if (!config.scrollbar) {
			input.noscrollbar();
			input.css('padding-right', (SCROLLBARWIDTH() + 5) + 'px');
		}
	};

	self.make = function() {
		content = self.html();
		self.type = config.type;
		self.format = config.format;
		self.redraw();

		self.event('click', cls2 + '-placeholder', function() {
			if (!config.disabled) {
				placeholder.aclass('hidden');
				input.focus();
			}
		});

		self.event('focus', 'textarea', function() {
			placeholder.aclass('hidden');
		});

		self.event('blur', 'textarea', function() {
			if (!self.get() && config.placeholder)
				placeholder.rclass('hidden');
		});
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
		config.error && self.find( cls2 + '-helper').tclass(cls + '-helper-show', invalid);
	};

	self.setter2 = function(value) {

		if (!config.placeholder)
			return;

		if (value)
			placeholder.aclass('hidden');
		else
			placeholder.rclass('hidden');
	};
});

COMPONENT('checkbox', function(self, config, cls) {

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : (value === true || value === 'true' || value === 'on');
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'label':
				self.find('span').html(value);
				break;
			case 'required':
				self.find('span').tclass(cls + '-label-required', value);
				break;
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'checkicon':
				self.find('i').rclass2('fa-').aclass('fa-' + value);
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		self.html('<div><i class="fa fa-{2}"></i></div><span{1}>{0}</span>'.format(config.label || self.html(), config.required ? (' class="' + cls + '-label-required"') : '', config.checkicon || 'check'));
		config.disabled && self.aclass('ui-disabled');
		self.event('click', function() {
			if (!config.disabled) {
				self.dirty(false);
				self.getter(!self.get());
			}
		});
	};

	self.setter = function(value) {
		var is = config.reverse ? !value : !!value;
		self.tclass(cls + '-checked', is);
	};
});

COMPONENT('dropdowncheckbox', 'checkicon:check;visible:0;alltext:All selected;limit:0;selectedtext:{0} selected', function(self, config, cls) {

	var cls2 = '.' + cls;
	var data = [], render = '';
	var container, values, content, datasource = null;
	var prepared = false;
	var W = window;

	!W.$dropdowncheckboxtemplate && (W.$dropdowncheckboxtemplate = Tangular.compile('<div class="' + cls + '-item" data-index="{{ index }}"><div><i class="fa fa-{{ $.checkicon }}"></i></div><span>{{ text }}</span></div>'));
	var template = W.$dropdowncheckboxtemplate;

	self.nocompile && self.nocompile();

	self.validate = function(value) {
		return config.disabled || !config.required ? true : value && value.length > 0;
	};

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {

			case 'type':
				self.type = value;
				break;

			case 'required':
				self.tclass(cls + '-required', config.required);
				break;

			case 'label':
				content = value;
				redraw = true;
				break;

			case 'disabled':
				self.tclass('ui-disabled', value);
				self.reset();
				break;

			case 'checkicon':
				self.find('i').rclass().aclass(value.indexOf(' ') === -1 ? ('fa fa-' + value) : value);
				break;

			case 'icon':
				redraw = true;
				break;

			case 'datasource':
				self.datasource(value, self.bind);
				datasource && self.refresh();
				datasource = value;
				break;

			case 'items':

				if (value instanceof Array) {
					self.bind('', value);
					return;
				}

				var items = [];
				value.split(',').forEach(function(item) {
					item = item.trim().split('|');
					var val = (item[1] == null ? item[0] : item[1]).trim();
					if (config.type === 'number')
						val = +val;
					items.push({ name: item[0].trim(), id: val });
				});

				self.bind('', items);
				self.refresh();
				break;
		}

		redraw && setTimeout2(self.id + '.redraw', self.redraw, 100);
	};

	self.redraw = function() {

		var html = '<div class="{0}"><i class="fa fa-angle-down"></i><div class="{0}-selected"></div></div><div class="{0}-values hidden">{1}</div>'.format(cls, render);
		if (content.length)
			self.html('<div class="{0}-label">{1}{2}:</div>'.format(cls, config.icon ? ('<i class="' + (config.icon.indexOf(' ') === -1 ? ('fa fa-' + config.icon) : config.icon) + '"></i>') : '', content) + html);
		else
			self.html(html);

		container = self.find(cls2 + '-values');
		values = self.find(cls2 + '-selected');
		prepared && self.refresh();
		self.tclass('ui-disabled', config.disabled === true);
		self.tclass(cls + '-required', config.required === true);
	};

	self.make = function() {

		self.type = config.type;

		content = self.html();
		self.aclass(cls + '-container');
		self.redraw();

		if (config.items)
			self.reconfigure({ items: config.items });
		else if (config.datasource)
			self.reconfigure({ datasource: config.datasource });
		else
			self.bind('', null);

		self.event('click', cls2, function(e) {

			if (config.disabled)
				return;

			container.tclass('hidden');

			if (W.$dropdowncheckboxelement) {
				W.$dropdowncheckboxelement.aclass('hidden');
				W.$dropdowncheckboxelement = null;
			}

			!container.hclass('hidden') && (W.$dropdowncheckboxelement = container);
			e.stopPropagation();
		});

		self.event('click', cls2 + '-item', function(e) {

			e.stopPropagation();

			if (config.disabled)
				return;

			var el = $(this);
			var is = !el.hclass(cls + '-checked');
			var index = +el.attrd('index');
			var value = data[index];

			if (value === undefined)
				return;

			value = value.value;

			var arr = self.get();

			if (!(arr instanceof Array))
				arr = [];

			var index = arr.indexOf(value);

			if (is) {
				if (config.limit && arr.length === config.limit)
					return;
				index === -1 && arr.push(value);
			} else {
				index !== -1 && arr.splice(index, 1);
			}

			self.set(arr);
			self.change(true);
		});
	};

	self.bind = function(path, value) {
		var clsempty = cls + '-values-empty';

		if (value !== undefined)
			prepared = true;

		if (!value || !value.length) {
			var h = config.empty || '&nbsp;';
			if (h === self.old)
				return;
			container.aclass(clsempty).html(h);
			self.old = h;
			return;
		}

		var kv = config.value || 'id';
		var kt = config.text || 'name';

		render = '';
		data = [];

		for (var i = 0, length = value.length; i < length; i++) {
			var isString = typeof(value[i]) === 'string';
			var item = { value: isString ? value[i] : value[i][kv], text: isString ? value[i] : value[i][kt], index: i };
			render += template(item, config);
			data.push(item);
		}

		var h = HASH(render);
		if (h === self.old)
			return;

		self.old = h;

		if (render)
			container.rclass(clsempty).html(render);
		else
			container.aclass(clsempty).html(config.empty);

		self.refresh();
	};

	self.setter = function(value) {

		if (!prepared)
			return;

		var label = '';
		var count = value == null || !value.length ? undefined : value.length;

		if (value && count) {
			var remove = [];
			for (var i = 0; i < count; i++) {
				var selected = value[i];
				var index = 0;
				var is = false;
				while (true) {
					var item = data[index++];
					if (item === undefined)
						break;
					if (item.value != selected)
						continue;
					label += (label ? ', ' : '') + item.text;
					is = true;
				}
				!is && remove.push(selected);
			}

			if (config.cleaner !== false && value) {
				var refresh = false;
				while (true) {
					var item = remove.shift();
					if (item === undefined)
						break;
					value.splice(value.indexOf(item), 1);
					refresh = true;
				}
				refresh && self.set(value);
			}
		}

		container.find(cls2 + '-item').each(function() {
			var el = $(this);
			var index = +el.attrd('index');
			var checked = false;
			if (!value || !value.length)
				checked = false;
			else if (data[index])
				checked = data[index];
			checked && (checked = value.indexOf(checked.value) !== -1);
			el.tclass(cls + '-checked', checked);
		});

		if (!label && value && config.cleaner !== false) {
			// invalid data
			// it updates model without notification
			self.rewrite([]);
		}

		if (!label && config.placeholder) {
			values.rattr('title', '');
			values.html('<span class="{1}-placeholder">{0}</span>'.format(config.placeholder, cls));
		} else {
			if (count == data.length && config.alltext !== 'null' && config.alltext)
				label = config.alltext;
			else if (config.visible && count > config.visible)
				label = config.selectedtext.format(count, data.length);
			values.attr('title', label);
			values.html(label);
		}
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
	};

	if (!W.$dropdowncheckboxevent) {
		W.$dropdowncheckboxevent = true;
		$(document).on('click', function() {
			if (W.$dropdowncheckboxelement) {
				W.$dropdowncheckboxelement.aclass('hidden');
				W.$dropdowncheckboxelement = null;
			}
		});
	}
});

COMPONENT('snackbar', 'timeout:3000;button:Dismiss', function(self, config) {

	var show = true;
	var callback;

	self.readonly();
	self.blind();
	self.nocompile();

	self.make = function() {
		self.aclass('ui-snackbar hidden');
		self.append('<div><a href="javasc' + 'ript:void(0)" class="ui-snackbar-dismiss"></a><div class="ui-snackbar-body"></div></div>');
		self.event('click', '.ui-snackbar-dismiss', function() {
			self.hide();
			callback && callback();
		});
	};

	self.hide = function() {
		self.rclass('ui-snackbar-visible');
		setTimeout(function() {
			self.aclass('hidden');
		}, 1000);
		show = true;
	};

	self.success = function(message, button, close) {
		self.show('<i class="fa fa-check-circle ui-snackbar-icon"></i>' + message, button, close);
	};

	self.warning = function(message, button, close) {
		self.show('<i class="fa fa-times-circle ui-snackbar-icon"></i>' + message, button, close);
	};

	self.show = function(message, button, close) {

		if (typeof(button) === 'function') {
			close = button;
			button = null;
		}

		callback = close;

		self.find('.ui-snackbar-body').html(message);
		self.find('.ui-snackbar-dismiss').html(button || config.button);

		if (show) {
			self.rclass('hidden');
			setTimeout(function() {
				self.aclass('ui-snackbar-visible');
			}, 50);
		}

		setTimeout2(self.ID, self.hide, config.timeout + 50);
		show = false;
	};
});

COMPONENT('crop', 'dragdrop:true;format:{0}', function(self, config, cls) {

	var canvas, context;
	var img = new Image();
	var can = false;
	var is = false;
	var zoom = 100;
	var current = { x: 0, y: 0 };
	var offset = { x: 0, y: 0 };
	var cache = { x: 0, y: 0, zoom: 0 };
	var width = 0;
	var samesize = '';

	self.bindvisible();
	self.novalidate();
	self.nocompile && self.nocompile();
	self.getter = null;

	img.crossOrigin = 'anonymous';
	img.onload = function () {
		can = true;
		zoom = 100;

		var width = config.width;
		var height = config.height;

		samesize = img.width === width && img.height === height && img.src.substring(0, 5) !== 'data:' ? $(img).attr('src') : '';

		var nw = (img.width / 2);
		var nh = (img.height / 2);

		if (img.width > width) {
			var p = (width / (img.width / 100));
			zoom -= zoom - p;
			nh = ((img.height * (p / 100)) / 2);
			nw = ((img.width * (p / 100)) / 2);
		}

		// centering
		cache.x = current.x = (width / 2) - nw;
		cache.y = current.y = (height / 2) - nh;
		cache.zoom = zoom;
		self.redraw();
	};

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'width':
			case 'height':
				cache.x = current.x = cache.y = current.y = 0;
				setTimeout2(self._id + 'resize', self.redraw, 50);
				break;
		}
	};

	self.output = function(type) {
		var canvas2 = document.createElement('canvas');
		var ctx2 = canvas2.getContext('2d');

		canvas2.width = config.width;
		canvas2.height = config.height;

		ctx2.mozImageSmoothingEnabled = true;
		ctx2.imageSmoothingQuality = 'low';
		ctx2.webkitImageSmoothingEnable = true;
		ctx2.msImageSmoothingEnabled = true;
		ctx2.imageSmoothingEnabled = true;
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

		if (config.background) {
			ctx2.fillStyle = config.background;
			ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
		}

		var w = img.width;
		var h = img.height;

		w = ((w / 100) * zoom);
		h = ((h / 100) * zoom);

		ctx2.drawImage(img, current.x || 0, current.y || 0, w, h);
		return type ? canvas2.toDataURL(type) : !config.background && self.isTransparent(canvas2) ? canvas2.toDataURL('image/png') : canvas2.toDataURL('image/jpeg');
	};

	self.grayscale = function() {

		var canvas2 = document.createElement('canvas');
		var ctx2 = canvas2.getContext('2d');

		canvas2.width = config.width;
		canvas2.height = config.height;

		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);

		if (config.background) {
			ctx2.fillStyle = config.background;
			ctx2.fillRect(0, 0, canvas2.width, canvas2.height);
		}

		var w = img.width;
		var h = img.height;

		w = ((w / 100) * zoom);
		h = ((h / 100) * zoom);

		ctx2.drawImage(img, current.x || 0, current.y || 0, w, h);

		var imgdata = ctx2.getImageData(0, 0, canvas2.width, canvas2.height);
		var data = imgdata.data;
		for (var i = 0; i < data.length; i += 4) {
			var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
			data[i] = brightness;
			data[i + 1] = brightness;
			data[i + 2] = brightness;
		}

		ctx2.putImageData(imgdata, 0, 0);
		img.src = canvas2.toDataURL();
		self.redraw();
	};

	self.make = function() {

		self.aclass(cls);
		self.append('<ul><li data-type="upload"><span class="fa fa-folder"></span></li><li data-type="plus"><span class="fa fa-plus"></span></li><li data-type="refresh"><span class="fa fa-refresh"></span></li><li data-type="minus"><span class="fa fa-minus"></span></li><li data-type="grayscale"><span class="fa fa-adjust"></span></li></ul><div>0x0</div><canvas width="200" height="100"></canvas>');

		canvas = self.find('canvas')[0];
		context = canvas.getContext('2d');

		context.mozImageSmoothingEnabled = true;
		context.imageSmoothingQuality = 'low';
		context.webkitImageSmoothingEnable = true;
		context.msImageSmoothingEnabled = true;
		context.imageSmoothingEnabled = true;

		self.event('click', 'li', function(e) {

			e.preventDefault();
			e.stopPropagation();

			var type = $(this).attr('data-type');

			switch (type) {
				case 'grayscale':
					self.grayscale();
					self.change(true);
					break;
				case 'upload':
					cmseditor.instance.filebrowser(img, (/^image\/*/));
					self.change(true);
					break;
				case 'plus':
					zoom += 3;
					if (zoom > 300)
						zoom = 300;
					current.x -= 3;
					current.y -= 3;
					samesize = '';
					self.redraw();
					break;
				case 'minus':
					zoom -= 3;
					if (zoom < 3)
						zoom = 3;
					current.x += 3;
					current.y += 3;
					samesize = '';
					self.redraw();
					break;
				case 'refresh':
					zoom = cache.zoom;
					self.redraw();
					break;
			}

		});

		self.find('input').on('change', function() {
			var file = this.files[0];
			self.load(file);
			this.value = '';
		});

		$(canvas).on('mousedown', function (e) {

			if (self.disabled || !can)
				return;

			is = true;
			var rect = canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			offset.x = x - current.x;
			offset.y = y - current.y;
			samesize = '';
		});

		config.dragdrop && $(canvas).on('dragenter dragover dragexit drop dragleave', function (e) {

			if (self.disabled)
				return;

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					self.rclass('ui-crop-dragdrop');
					break;
				case 'dragenter':
				case 'dragover':
					self.aclass('ui-crop-dragdrop');
					return;
				case 'dragexit':
				case 'dragleave':
				default:
					self.rclass('ui-crop-dragdrop');
					return;
			}

			var files = e.originalEvent.dataTransfer.files;
			files[0] && self.load(files[0]);
		});

		self.load = function(file) {
			self.getOrientation(file, function(orient) {
				var reader = new FileReader();
				reader.onload = function () {
					if (orient < 2) {
						img.src = reader.result;
						setTimeout(function() {
							self.change(true);
						}, 500);
					} else {
						SETTER('loading', 'show');
						self.resetOrientation(reader.result, orient, function(url) {
							SETTER('loading', 'hide', 500);
							img.src = url;
							self.change(true);
						});
					}
				};
				reader.readAsDataURL(file);
			});
		};

		self.event('mousemove mouseup', function (e) {

			if (e.type === 'mouseup') {
				is && self.change();
				is = false;
				return;
			}

			if (self.disabled || !can || !is)
				return;

			var rect = canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			current.x = x - offset.x;
			current.y = y - offset.y;
			samesize = '';
			self.redraw();
		});

		$(W).on('paste', self.paste);
	};

	self.paste = function(e) {

		if (config.disabled)
			return;

		var item = e.originalEvent.clipboardData.items[0];
		if (item.kind !== 'file' || item.type.substring(0, 5) !== 'image')
			return;

		var blob = item.getAsFile();
		self.load(blob);
	};

	self.destroy = function() {
		$(W).off('paste', self.paste);
	};

	self.redraw = function() {

		var ratio = width < config.width ? width / config.width : 1;

		canvas.width = width < config.width ? width : config.width;
		canvas.height = width < config.width ? (config.height / config.width) * width : config.height;

		var w = img.width;
		var h = img.height;

		w = ((w / 100) * zoom);
		h = ((h / 100) * zoom);

		context.clearRect(0, 0, canvas.width, canvas.height);

		if (config.background) {
			context.fillStyle = config.background;
			context.fillRect(0, 0, canvas.width, canvas.height);
		}

		self.find('div').html(config.width + 'x' + config.height);
		context.drawImage(img, (current.x || 0) * ratio, (current.y || 0) * ratio, w * ratio, h * ratio);
	};

	self.setter = function(value) {
		self.filename = '';
		self.width(function(w) {
			width = w;
			if (value)
				img.src = config.format.format(value);
			else
				self.redraw();
		});
	};

	self.getUrl = function() {
		return samesize;
	};

	self.isTransparent = function(canvas) {
		var id = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
		for (var i = 0, length = id.data.length; i < length; i += 4) {
			if (id.data[i + 3] !== 255)
				return true;
		}
		return false;
	};

	// http://stackoverflow.com/a/32490603
	self.getOrientation = function(file, callback) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var view = new DataView(e.target.result);
			if (view.getUint16(0, false) != 0xFFD8)
				return callback(-2);
			var length = view.byteLength;
			var offset = 2;
			while (offset < length) {
				var marker = view.getUint16(offset, false);
				offset += 2;
				if (marker == 0xFFE1) {
					if (view.getUint32(offset += 2, false) != 0x45786966)
						return callback(-1);
					var little = view.getUint16(offset += 6, false) == 0x4949;
					offset += view.getUint32(offset + 4, little);
					var tags = view.getUint16(offset, little);
					offset += 2;
					for (var i = 0; i < tags; i++)
						if (view.getUint16(offset + (i * 12), little) == 0x0112)
							return callback(view.getUint16(offset + (i * 12) + 8, little));
				} else if ((marker & 0xFF00) != 0xFF00)
					break;
				else
					offset += view.getUint16(offset, false);
			}
			return callback(-1);
		};
		reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
	};

	self.resetOrientation = function(src, srcOrientation, callback) {
		var img = new Image();
		img.onload = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			// set proper canvas dimensions before transform & export
			if (4 < srcOrientation && srcOrientation < 9) {
				canvas.width = height;
				canvas.height = width;
			} else {
				canvas.width = width;
				canvas.height = height;
			}
			switch (srcOrientation) {
				case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
				case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
				case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
				case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
				case 7: ctx.transform(0, -1, -1, 0, height, width); break;
				case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
			}
			ctx.drawImage(img, 0, 0);
			callback(canvas.toDataURL());
		};
		img.src = src;
	};
});

COMPONENT('multioptions', function(self) {

	var Tarea = Tangular.compile('<textarea class="ui-moi-save ui-moi-value-inputarea" data-name="{{ name }}"{{ if def }} placeholder="{{ def }}"{{ fi }}{{ if max }} maxlength="{{ max }}"{{ fi }} data-type="text">{{ value }}</textarea>');
	var Tinput = Tangular.compile('<input class="ui-moi-value-inputtext ui-moi-save" data-name="{{ name }}" type="text" value="{{ value }}"{{ if def }} placeholder="{{ def }}"{{ fi }}{{ if max }} maxlength="{{ max }}"{{ fi }} data-type="text" />');
	var Tfile = Tangular.compile('<div class="ui-moi-value-inputfile-buttons"><span class="multioptions-operation" data-name="file"><i class="fa fa-folder"></i></span></div><div class="ui-moi-value-inputfile"><input class="ui-moi-save" data-name="{{ name }}" type="text" value="{{ value }}"{{ if def }} placeholder="{{ def }}"{{ fi }}{{ if max }} maxlength="{{ max }}"{{ fi }} data-type="text" /></div>');
	var Tselect = Tangular.compile('<div class="ui-moi-value-select"><i class="fa fa-chevron-down"></i><select data-name="{{ name }}" class="ui-moi-save ui-multioptions-select">{{ foreach m in values }}<option value="{{ $index }}"{{ if value === m.value }} selected="selected"{{ fi }}>{{ m.text }}</option>{{ end }}</select></div>');
	var Tnumber = Tangular.compile('<div class="ui-moi-value-inputnumber-buttons"><span class="multioptions-operation" data-type="number" data-step="{{ step }}" data-name="plus" data-max="{{ max }}" data-min="{{ min }}"><i class="fa fa-plus"></i></span><span class="multioptions-operation" data-type="number" data-name="minus" data-step="{{ step }}" data-max="{{ max }}" data-min="{{ min }}"><i class="fa fa-minus"></i></span></div><div class="ui-moi-value-inputnumber"><input data-name="{{ name }}" class="ui-moi-save ui-moi-value-numbertext" type="text" value="{{ value }}"{{ if def }} placeholder="{{ def }}"{{ fi }} data-max="{{ max }}" data-min="{{ max }}" data-type="number" /></div>');
	var Tboolean = Tangular.compile('<div data-name="{{ name }}" data-type="boolean" class="ui-moi-save multioptions-operation ui-moi-value-boolean{{ if value }} checked{{ fi }}"><i class="fa fa-check"></i></div>');
	var Tdate = Tangular.compile('<div class="ui-moi-value-inputdate-buttons"><span class="multioptions-operation" data-type="date" data-name="date"><i class="fa fa-calendar"></i></span></div><div class="ui-moi-value-inputdate"><input class="ui-moi-save ui-moi-date" data-name="{{ name }}" type="text" value="{{ value | format(\'yyyy-MM-dd\') }}" placeholder="dd.mm.yyyy" maxlength="10" data-type="date" /></div>');
	var Tcolor = null;
	var skip = false;
	var mapping = null;
	var dep = {};
	var pending = 0;

	self.getter = null;
	self.novalidate();
	self.nocompile();

	self.init = function() {
		window.Tmultioptionscolor = Tangular.compile('<div class="ui-moi-value-colors ui-moi-save" data-name="{{ name }}" data-value="{{ value }}">{0}</div>'.format(['#ED5565', '#DA4453', '#FC6E51', '#E9573F', '#FFCE54', '#F6BB42', '#A0D468', '#8CC152', '#48CFAD', '#37BC9B', '#4FC1E9', '#3BAFDA', '#5D9CEC', '#4A89DC', '#AC92EC', '#967ADC', '#EC87C0', '#D770AD', '#F5F7FA', '#E6E9ED', '#CCD1D9', '#AAB2BD', '#656D78', '#434A54', '#000000'].map(function(n) { return '<span data-value="{0}" data-type="color" class="multioptions-operation" style="background-color:{0}"><i class="fa fa-check-circle"></i></span>'.format(n); }).join('')));
	};

	self.form = function() {};

	self.make = function() {

		Tcolor = window.Tmultioptionscolor;
		self.aclass('ui-multioptions');

		var el = self.find('script');

		if (el.length) {
			self.remap(el.html());
			el.remove();
		}

		self.event('click', '.multioptions-operation', function(e) {
			var el = $(this);
			var name = el.attrd('name');
			var type = el.attrd('type');

			e.stopPropagation();

			if (name === 'file') {
				el = el.parent().parent().find('input');
				cmseditor.instance.filebrowser(function(url) {
					el.val(url);
					self.$save();
				});
				return;
			}

			if (type === 'date') {
				el = el.parent().parent().find('input');
				SETTER('calendar', 'show', el, el.val().parseDate(), function(date) {
					el.val(date.format('yyyy-MM-dd'));
					self.$save();
				});
				return;
			}

			if (type === 'color') {
				el.parent().find('.selected').rclass('selected');
				el.aclass('selected');
				self.$save();
				return;
			}

			if (type === 'boolean') {
				el.tclass('checked');
				self.$save();
				return;
			}

			if (type === 'number') {
				var input = el.parent().parent().find('input');
				var step = (el.attrd('step') || '0').parseInt();
				var min = el.attrd('min');
				var max = el.attrd('max');

				if (!step)
					step = 1;

				if (min)
					min = min.parseInt();

				if (max)
					max = max.parseInt();

				var value;

				if (name === 'plus') {
					value = input.val().parseInt() + step;
					if (max !== 0 && max && value > max)
						value = max;
					input.val(value);
				} else {
					value = input.val().parseInt() - step;
					if (min !== 0 && min && value < min)
						value = min;
					input.val(value);
				}
				self.$save();
				return;
			}

			self.form(type, el.parent().parent().find('input'), name);
			return;
		});

		self.event('change', 'select', self.$save);
		self.event('input', 'input,textarea', self.$save);

		self.event('click', '.ui-moi-date', function(e) {
			e.stopPropagation();
		});

		self.event('focus', '.ui-moi-date', function() {
			var el = $(this);
			SETTER('calendar', 'toggle', el, el.val().parseDate(), function(date) {
				el.val(date.format('yyyy-MM-dd'));
				self.$save();
			});
		});
	};

	self.remapempty = function() {
		mapping = {};
		dep = {};
		pending = 0;
		self.redraw();
	};

	self.remap = function(js) {
		var fn = new Function('option', js);
		mapping = {};
		dep = {};
		pending = 0;
		fn(self.mapping);
		self.redraw();
	};

	self.redraw = function() {

		if (pending > 0) {
			setTimeout(self.redraw, 500);
			return;
		}

		self.refresh();
		self.change(false);
		self.$save();
	};

	self.remap2 = function(callback) {
		mapping = {};
		dep = {};
		pending = 0;
		callback(self.mapping);
		self.redraw();
	};

	self.mapping = function(key, label, def, type, max, min, step, validator) {
		var T = typeof(type);
		if (T === 'number') {
			validator = step;
			step = min;
			min = max;
			max = type;
			type = 'number';
		} else if (!type)
			type = def instanceof Date ? 'date' : typeof(def);

		var values, multiline;

		if (type instanceof Array) {

			values = [];

			type.forEach(function(val) {
				values.push({ text: val.text === undefined ? val : val.text, value: val.value === undefined ? val : val.value });
			});

			type = 'array';
		}

		var external = false;

		if (T === 'string') {
			var tmp = type.substring(0, 6);
			external = type.substring(0, 1) === '/' || tmp === 'http:/' || tmp === 'https:';
			if (type.toLowerCase() === 'multiline') {
				multiline = true;
				type = 'string';
			}
		}

		var t = (type || '').toLowerCase();
		switch (t) {
			case 'posts':
			case 'languages':
			case 'signals':
			case 'notices':
			case 'navigations':
				values = [{ value: '', text: '' }];
				var nav = common.dependencies[t === 'posts' ? 'templatesposts' : t];
				for (var i = 0; i < nav.length; i++) {
					var n = nav[i];
					values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'parts':
				values = [{ value: '', text: '' }];
				var items = GET('%parts');
				for (var i = 0; i < items.length; i++) {
					var n = items[i];
					values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'inlineparts':
				values = [{ value: '', text: '' }];
				var items = GET('%parts');
				for (var i = 0; i < items.length; i++) {
					var n = items[i];
					if (n.category === 'Inline' || n.category === 'Custom')
						values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'newsletterparts':
				values = [{ value: '', text: '' }];
				var items = GET('%parts');
				for (var i = 0; i < items.length; i++) {
					var n = items[i];
					if (n.category === 'Newsletter' || n.category === 'Custom')
						values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'contentparts':
			case 'columnsparts':
				values = [{ value: '', text: '' }];
				var items = GET('%parts');
				for (var i = 0; i < items.length; i++) {
					var n = items[i];
					if (n.category === 'Content' || n.category === 'Columns' || n.category === 'Custom')
						values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'layoutsparts':
				values = [{ value: '', text: '' }];
				var items = GET('%parts');
				for (var i = 0; i < items.length; i++) {
					var n = items[i];
					if (n.category === 'Layouts' || n.category === 'Custom')
						values.push({ value: n.id, text: n.name });
				}
				type = 'array';
				break;

			case 'partial':
				values = [{ value: '', text: '' }];
				var pages = GET('pages.grid.items');
				if (pages && pages.length) {
					for (var i = 0, length = pages.length; i < length; i++) {
						var p = pages[i];
						p.ispartial && values.push({ value: p.id, text: p.name });
					}
				}
				type = 'array';
				break;
		}

		if (validator && typeof(validator) !== 'function')
			validator = null;

		var bindmapping = function(values) {
			dep[key] = values;
			mapping[key] = { name: key, label: label, type: external ? 'array' : type.toLowerCase(), def: def, max: max, min: min, step: step, value: def, values: values, validator: validator, multiline: multiline };
		};

		if (external) {
			pending++;
			AJAX('GET ' + type, function(values) {
				pending--;
				bindmapping(values);
			});
		} else
			bindmapping(values);
	};

	self.dependencies = function() {
		return dep;
	};

	self.$save = function() {
		setTimeout2('multioptions.' + self._id, self.save, 150);
	};

	self.save = function() {
		var obj = self.get();
		var values = self.find('.ui-moi-save');

		Object.keys(mapping).forEach(function(key) {

			var opt = mapping[key];
			var el = values.filter('[data-name="{0}"]'.format(opt.name));

			if (el.hclass('ui-moi-value-colors')) {
				obj[key] = el.find('.selected').attrd('value');
				return;
			}

			if (el.hclass('ui-moi-value-boolean')) {
				obj[key] = el.hclass('checked');
				return;
			}

			if (el.hclass('ui-moi-date')) {
				obj[key] = el.val().parseDate();
				return;
			}

			if (el.hclass('ui-moi-value-inputtext') || el.hclass('ui-moi-value-inputarea')) {
				obj[key] = el.val();
				return;
			}

			if (opt.type === 'file') {
				obj[key] = el.val();
				return;
			}

			if (el.hclass('ui-moi-value-numbertext')) {

				obj[key] = el.val().parseFloat();

				if (opt.max !== null && obj[key] > opt.max) {
					obj[key] = opt.max;
					el.val(opt.max);
				}

				if (opt.min !== null && obj[key] < opt.min) {
					obj[key] = opt.min;
					el.val(opt.min);
				}

				return;
			}

			if (el.hclass('ui-multioptions-select')) {
				var index = el.val().parseInt();
				var val = opt.values[index];
				obj[key] = val ? val.value : null;
				if (obj[key] && obj[key].value)
					obj[key] = obj[key].value;
				return;
			}
		});

		skip = true;
		self.set(obj);
		self.change(true);
	};

	self.setter = function(options) {

		if (!options || skip || !mapping) {
			skip = false;
			return;
		}

		var builder = [];
		Object.keys(mapping).forEach(function(key) {

			var option = mapping[key];

			// option.name
			// option.label
			// option.type (lowercase)
			// option.def
			// option.value
			// option.max
			// option.min
			// option.step

			option.value = options[key] == null ? option.def : options[key];

			var value = '';

			switch (option.type.toLowerCase()) {
				case 'string':
					value = option.multiline ? Tarea(option) : Tinput(option);
					break;
				case 'file':
					value = Tfile(option);
					break;
				case 'number':
					value = Tnumber(option);
					break;
				case 'boolean':
					value = Tboolean(option);
					break;
				case 'color':
					value = Tcolor(option);
					break;
				case 'array':
					value = Tselect(option);
					break;
				case 'date':
					value = Tdate(option);
					break;
			}

			builder.push('<div class="ui-multioptions-item{2}"><div class="ui-moi-name">{0}</div><div class="ui-moi-value">{1}</div></div>'.format(option.label, value, option.multiline ? ' ui-multioptions-multiline' : ''));
		});

		self.empty().html(builder);

		self.find('.ui-moi-value-colors').each(function() {
			var el = $(this);
			var value = el.attrd('value');
			el.find('[data-value="{0}"]'.format(value)).aclass('selected');
		});
	};
});

COMPONENT('fileupload', function(self, config) {

	var id = 'fileupload' + self._id;
	var input = null;

	self.readonly();
	self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				break;
			case 'accept':
				var el = $('#' + id);
				if (value)
					el.prop('accept', value);
				else
					el.removeProp('accept');
				break;
			case 'multiple':
				var el = $('#' + id);
				if (value)
					el.prop('multiple', true);
				else
					el.removeProp('multiple');
				break;
			case 'label':
				self.html(value);
				break;
		}
	};

	self.make = function() {

		config.disabled && self.aclass('ui-disabled');
		$(document.body).append('<input type="file" id="{0}" class="hidden"{1}{2} />'.format(id, config.accept ? ' accept="{0}"'.format(config.accept) : '', config.multiple ? ' multiple="multiple"' : ''));
		input = $('#' + id);

		self.event('click', function() {
			!config.disabled && input.click();
		});

		input.on('change', function(evt) {
			!config.disabled && self.upload(evt.target.files);
		});
	};

	self.upload = function(files) {

		var data = new FormData();
		var el = this;

		for (var i = 0, length = files.length; i < length; i++)
			data.append('file' + i, files[i]);

		SETTER('loading', 'show');
		UPLOAD(config.url, data, function(response, err, output) {

			el.value = '';
			SETTER('loading', 'hide', 500);

			if (err) {
				SETTER('message/warning', err === 431 ? config.error : (output.text || err));
				return;
			}

			self.change();

			if (config.property) {
				for (var i = 0, length = response.length; i < length; i++)
					response[i] = response[i][config.property];
			}

			if (config.array)
				self.push(response);
			else
				self.set(response);
		});
	};

	self.destroy = function() {
		input.off().remove();
	};
});

COMPONENT('suggestion', function(self, config, cls) {

	var container, arrow, timeout, icon, input = null;
	var is = false, selectedindex = 0, resultscount = 0;
	var ajax = null;
	var cls2 = '.' + cls;

	self.items = null;
	self.template = Tangular.compile('<li data-index="{{ $.index }}"{{ if selected }} class="selected"{{ fi }}>{{ name | raw }}</li>');
	self.callback = null;
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {
		if (init)
			return;
		switch (key) {
			case 'placeholder':
				self.find('input').prop('placeholder', value);
				break;
		}
	};

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.append('<span class="{1}-arrow"></span><div class="{1}-body"><div class="{1}-search"><span class="{1}-button"><i class="fa fa-search"></i></span><div><input type="text" placeholder="{0}" class="{1}-search-input" /></div></div><div class="{1}-container"><ul></ul></div></div>'.format(config.placeholder, cls));
		container = self.find('ul');
		arrow = self.find(cls2 + '-arrow');
		input = self.find('input');
		icon = self.find(cls2 + '-button').find('.fa');

		self.event('mouseenter mouseleave', 'li', function() {
			container.find('li.selected').rclass('selected');
			$(this).aclass('selected');
			var arr = container.find('li:visible');
			for (var i = 0; i < arr.length; i++) {
				if ($(arr[i]).hclass('selected')) {
					selectedindex = i;
					break;
				}
			}
		});

		self.event('click', cls2 + '-button', function(e) {
			input.val('');
			self.search();
			e.stopPropagation();
			e.preventDefault();
		});

		self.event('touchstart mousedown', 'li', function(e) {
			self.callback && self.callback(self.items[+this.getAttribute('data-index')], $(self.target));
			self.hide();
			e.preventDefault();
			e.stopPropagation();
		});

		$(document).on('click', function(e) {
			is && !$(e.target).hclass(cls + '-search-input') && self.hide(0);
		});

		$(W).on('resize', function() {
			is && self.hide(0);
		});

		self.event('keydown', 'input', function(e) {
			var o = false;
			switch (e.which) {
				case 27:
					o = true;
					self.hide();
					break;
				case 13:
					o = true;
					var sel = self.find('li.selected');
					if (sel.length && self.callback)
						self.callback(self.items[+sel.attrd('index')]);
					self.hide();
					break;
				case 38: // up
					o = true;
					selectedindex--;
					if (selectedindex < 0)
						selectedindex = 0;
					else
						self.move();
					break;
				case 40: // down
					o = true;
					selectedindex++ ;
					if (selectedindex >= resultscount)
						selectedindex = resultscount;
					else
						self.move();
					break;
			}

			if (o) {
				e.preventDefault();
				e.stopPropagation();
			}

		});

		self.event('input', 'input', function() {
			setTimeout2(self.ID, self.search, 100, null, this.value);
		});

		var fn = function() {
			is && self.hide(1);
		};

		self.on('reflow', fn);
		self.on('scroll', fn);
		$(window).on('scroll', fn);
	};

	self.move = function() {
		var counter = 0;
		var scroller = container.parent();
		var h = scroller.height();
		container.find('li').each(function() {
			var el = $(this);

			if (el.hclass('hidden')) {
				el.rclass('selected');
				return;
			}

			var is = selectedindex === counter;
			el.tclass('selected', is);
			if (is) {
				var t = (h * counter) - h;
				if ((t + h * 4) > h)
					scroller.scrollTop(t - h);
				else
					scroller.scrollTop(0);
			}
			counter++;
		});
	};

	self.search = function(value) {

		icon.tclass('fa-times', !!value).tclass('fa-search', !value);

		if (!value) {
			container.find('li').rclass('hidden');
			resultscount = self.items ? self.items.length : 0;
			selectedindex = 0;
			self.move();
			return;
		}

		value = value.toSearch();
		resultscount = 0;
		selectedindex = 0;

		if (ajax) {
			ajax(value, function(items) {
				var builder = [];
				var indexer = {};
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					indexer.index = i;
					!item.value && (item.value = item.name);
					resultscount++;
					builder.push(self.template(item, indexer));
				}
				self.items = items;
				container.html(builder);
				self.move();
			});
		} else {
			container.find('li').each(function() {
				var el = $(this);
				var val = this.innerHTML.toSearch();
				var is = val.indexOf(value) === -1;
				el.tclass('hidden', is);
				if (!is)
					resultscount++;
			});
			self.move();
		}
	};

	self.show = function(orientation, target, items, callback) {

		if (is) {
			clearTimeout(timeout);
			var obj = target instanceof jQuery ? target[0] : target;
			if (self.target === obj) {
				self.hide(0);
				return;
			}
		}

		ajax = null;
		target = $(target);

		var type = typeof(items);
		var item;

		if (type === 'function' && callback) {
			ajax = items;
			type = '';
			items = null;
		}

		if (type === 'string')
			items = self.get(items);
		else if (type === 'function') {
			callback = items;
			items = (target.attrd('options') || '').split(';');
			for (var i = 0; i < items.length; i++) {
				item = items[i];
				if (item) {
					var val = item.split('|');
					items[i] = { name: val[0], value: val[2] == null ? val[0] : val[2] };
				}
			}
		}

		if (!items && !ajax) {
			self.hide(0);
			return;
		}

		self.items = items;
		self.callback = callback;
		input.val('');

		var builder = [];

		if (!ajax) {
			var indexer = {};
			for (var i = 0; i < items.length; i++) {
				item = items[i];
				indexer.index = i;
				!item.value && (item.value = item.name);
				builder.push(self.template(item, indexer));
			}
		}

		self.target = target[0];
		var offset = target.offset();

		container.html(builder);

		switch (orientation) {
			case 'left':
				arrow.css({ left: '15px' });
				break;
			case 'right':
				arrow.css({ left: '210px' });
				break;
			case 'center':
				arrow.css({ left: '107px' });
				break;
		}

		var options = { left: orientation === 'center' ? Math.ceil((offset.left - self.element.width() / 2) + (target.innerWidth() / 2)) : orientation === 'left' ? offset.left - 8 : (offset.left - self.element.width()) + target.innerWidth(), top: offset.top + target.innerHeight() + 10 };
		self.css(options);

		if (is)
			return;

		selectedindex = 0;
		resultscount = items ? items.length : 0;
		self.move();
		self.search();

		self.rclass('hidden');
		setTimeout(function() {
			self.aclass(cls + '-visible');
			self.emit('suggestion', true, self, self.target);
		}, 100);

		!isMOBILE && setTimeout(function() {
			input.focus();
		}, 500);

		setTimeout(function() {
			is = true;
			container.parent()[0].scrollTop = 0;
		}, 50);
	};

	self.hide = function(sleep) {
		if (!is)
			return;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			self.rclass(cls + '-visible').aclass('hidden');
			self.emit('suggestion', false, self, self.target);
			self.callback = null;
			self.target = null;
			is = false;
		}, sleep ? sleep : 100);
	};

});

COMPONENT('mainprogress', function(self, cls) {

	var old = null;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
	};

	self.setter = function(value) {
		!value && (value = 0);

		if (old === value)
			return;

		if (value > 100)
			value = 100;
		else if (value < 0)
			value = 0;

		old = value >> 0;

		self.element.stop().animate({ width: old + '%' }, 80).show();
		self.tclass('hidden', old === 0 || old === 100);
	};
});

COMPONENT('pictures', function(self, config, cls) {

	self.skip = false;
	self.readonly();
	self.nocompile();

	self.make = function() {
		self.aclass(cls);
	};

	self.setter = function(value) {

		if (typeof(value) === 'string')
			value = value.split(',');

		if (self.skip) {
			self.skip = false;
			return;
		}

		self.find('.fa,img').unbind('click');

		if (!(value instanceof Array) || !value.length) {
			self.empty();
			return;
		}

		var builder = [];

		for (var i = 0, length = value.length; i < length; i++) {
			var id = value[i];
			id && builder.push('<div data-id="{0}" class="col-xs-3 col-lg-2 m"><span class="fa fa-times"></span><img src="/images/small/{0}.jpg" class="img-responsive" alt="" /></div>'.format(id));
		}

		self.html(builder);

		this.element.find('.fa').bind('click', function() {
			var id = [];
			$(this).parent().remove();

			self.find('div').each(function() {
				id.push($(this).attr('data-id'));
			});

			self.skip = true;
			self.set(id);
		});

		this.element.find('img').bind('click', function() {

			var selected = self.find('.selected');
			var el = $(this);

			el.toggleClass('selected');

			if (!selected.length)
				return;

			var parent1 = el.parent();
			var parent2 = selected.parent();
			var id1 = parent1.attrd('id');
			var id2 = parent2.attrd('id');
			var arr = self.get();

			var index1 = arr.indexOf(id1);
			var index2 = arr.indexOf(id2);

			arr[index1] = id2;
			arr[index2] = id1;

			parent1.attrd('id', id2);
			parent2.attrd('id', id1);

			var img1 = parent1.find('img');
			var img2 = parent2.find('img');
			var src1 = img1.attr('src');

			img1.attr('src', img2.attr('src'));
			img2.attr('src', src1);

			setTimeout(function() {
				self.skip = true;
				img1.rclass('selected');
				img2.rclass('selected');
				self.change(true);
				self.set(arr);
			}, 200);
		});
	};
});

COMPONENT('websocket', 'reconnect:3000', function(self, config) {

	var ws, url;
	var queue = [];
	var sending = false;

	self.online = false;
	self.readonly();
	self.nocompile();

	self.make = function() {
		url = (config.url || '').env(true);
		if (!url.match(/^(ws|wss):\/\//))
			url = (location.protocol.length === 6 ? 'wss' : 'ws') + '://' + location.host + (url.substring(0, 1) !== '/' ? '/' : '') + url;
		setTimeout(self.connect, 500);
		self.destroy = self.close;
	};

	self.send = function(obj) {
		queue.push(JSON.stringify(obj));
		self.process();
		return self;
	};

	self.process = function(callback) {

		if (!ws || sending || !queue.length || ws.readyState !== 1) {
			callback && callback();
			return;
		}

		sending = true;
		var async = queue.splice(0, 3);
		async.wait(function(item, next) {
			ws.send(item);
			setTimeout(next, 5);
		}, function() {
			callback && callback();
			sending = false;
			queue.length && self.process();
		});
	};

	self.close = function(isClosed) {
		if (!ws)
			return self;
		self.online = false;
		ws.onopen = ws.onclose = ws.onmessage = null;
		!isClosed && ws.close();
		ws = null;
		EMIT('online', false);
		return self;
	};

	function onClose() {
		self.close(true);
		setTimeout(self.connect, config.reconnect);
	}

	function onMessage(e) {
		var data;
		try {
			data = PARSE(e.data);
		} catch (e) {
			WARN('WebSocket "{0}": {1}'.format(url, e.toString()));
		}
		data && EMIT('message', data);
	}

	function onOpen() {
		self.online = true;
		self.process(function() {
			EMIT('online', true);
		});
	}

	self.connect = function() {
		ws && self.close();
		setTimeout2(self.id, function() {
			ws = new WebSocket(url.env(true));
			ws.onopen = onOpen;
			ws.onclose = onClose;
			ws.onmessage = onMessage;
		}, 100);
		return self;
	};
});

COMPONENT('donutchart', 'format:{{ value | format(0) }};size:0;tooltip:1;presentation:1;animate:0;highlight:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var svg, g, selected, tooltip;
	var strokew = 0;
	var animate = true;
	var indexer = 0;
	var indexerskip = false;
	var force = false;
	var W = $(window);

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<div class="' + cls + '-tooltip"></div><svg></svg>');
		svg = self.find('svg');
		g = svg.asvg('g').attr('class', 'pieces');
		tooltip = self.find(cls2 + '-tooltip');

		W.on('resize', self.resize);

		self.event('mouseenter touchstart', '.piece', function() {
			self.select(+this.getAttribute('data-index'));
			!indexerskip && config.presentation && setTimeout2(self.id + '.skip', self.next, 30000);
			indexerskip = true;
		});
	};

	self.select = function(index) {

		var item = self.get()[index];
		if (item === selected)
			return;

		self.find('.selected').rclass('selected').css('stroke-width', strokew);
		selected = item;

		var el = self.find('.piece' + (index + 1));

		if (config.tooltip) {
			var w = self.width();
			tooltip.css('font-size', w / 15);
			tooltip.html('<b>' + item.name + '</b><br />' + Tangular.render(config.format, item));
		}

		config.select && EXEC(config.select, item);
		config.highlight && el.css('stroke-width', strokew.inc('+15%'));
		el.aclass('selected');
		indexer = index;
	};

	self.destroy = function() {
		W.off('resize', self.resize);
	};

	self.resize = function() {
		setTimeout2('resize.' + self.id, function() {
			animate = false;
			force = true;
			self.refresh();
		}, 100);
	};

	self.next = function() {

		if (self.removed)
			return;

		if (indexerskip) {
			indexerskip = false;
			return;
		}

		indexer++;

		var tmp = self.get();
		if (!tmp)
			return;

		if (!tmp[indexer])
			indexer = 0;

		self.select(indexer);
		setTimeout2(self.id + '.next', self.next, 4000);
	};

	function arcradius(centerX, centerY, radius, degrees) {
		var radians = (degrees - 90) * Math.PI / 180.0;
		return { x: centerX + (radius * Math.cos(radians)), y: centerY + (radius * Math.sin(radians)) };
	}

	function arc(x, y, radius, startAngle, endAngle){
		var start = arcradius(x, y, radius, endAngle);
		var end = arcradius(x, y, radius, startAngle);
		var largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
		var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
		return d;
	}

	self.redraw = function(width, value) {

		var sum = null;

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];

			if (item.value == null)
				item.value = 0;

			var val = item.value + 1;
			sum = sum ? sum + val : val;
		}

		var count = 0;
		var beg = 0;
		var end = 0;
		var items = [];

		for (var i = 0, length = value.length; i < length; i++) {
			var item = value[i];
			var p = (((item.value + 1) / sum) * 100).floor(2);

			count += p;

			if (i === length - 1 && count < 100)
				p = p + (100 - count);

			end = beg + ((360 / 100) * p);
			items.push({ name: item.name, percentage: p, beg: beg, end: end });
			beg = end;
		}

		if (!force && NOTMODIFIED(self.id, items))
			return;

		var size = width;
		var half = size / 2;
		var midpoint = size / 2.4;

		strokew = (size / 6 >> 0).inc('-15%');

		svg.attr('width', size);
		svg.attr('height', size);
		g.empty();

		var pieces = [];

		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];
			if (item.percentage === 0)
				continue;
			if (item.end === 360)
				item.end = 359.99;
			pieces.push(g.asvg('path').attrd('index', i).attrd('beg', item.beg).attrd('end', item.end).attr('stroke-width', strokew).attr('class', 'piece piece' + (i + 1)).attr('d', arc(half, half, midpoint, item.beg, animate ? item.beg : item.end)));
		}

		animate && pieces.wait(function(item, next) {
			var beg = +item.attrd('beg');
			var end = +item.attrd('end');
			var diff = end - beg;

			if (config.animate) {
				item.animate({ end: diff }, { duration: 180, step: function(fx) {
					item.attr('d', arc(half, half, midpoint, beg, beg + fx));
				}, complete: function() {
					next();
				}});
			} else {
				item.attr('d', arc(half, half, midpoint, beg, end));
				next();
			}
		});

		selected = null;
		animate = true;
		force = false;

		config.redraw && EXEC(config.redraw);

		self.select(0);
		if (config.presentation) {
			indexerskip = false;
			setTimeout(self.next, 4000);
		}
	};

	self.setter = function(value) {

		if (!value) {
			g.empty();
			return;
		}

		if (config.size) {
			self.redraw(config.size, value);
		} else {
			self.width(function(width) {
				self.redraw(width, value);
			});
		}
	};
});

COMPONENT('tabmenu', 'class:selected;selector:li', function(self, config) {
	var old, oldtab;

	self.readonly();
	self.nocompile && self.nocompile();
	self.bindvisible();

	self.make = function() {
		self.event('click', config.selector, function() {
			if (!config.disabled) {
				var el = $(this);
				if (!el.hclass(config.class)) {
					var val = el.attrd('value');
					if (config.exec)
						EXEC(self.makepath(config.exec), val);
					else
						self.set(val);
				}
			}
		});
		var scr = self.find('script');
		if (scr.length) {
			self.template = Tangular.compile(scr.html());
			scr.remove();
		}
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
			case 'datasource':
				self.datasource(value, function(path, value) {
					if (value instanceof Array) {
						var builder = [];
						for (var i = 0; i < value.length; i++)
							builder.push(self.template(value[i]));
						old = null;
						self.html(builder.join(''));
						self.refresh();
					}
				}, true);
				break;
		}
	};

	self.setter = function(value) {
		if (old === value)
			return;
		oldtab && oldtab.rclass(config.class);
		oldtab = self.find(config.selector + '[data-value="' + value + '"]').aclass(config.class);
		old = value;
	};
});

COMPONENT('error', function(self, config, cls) {

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls + ' hidden');
	};

	self.setter = function(value) {

		if (!(value instanceof Array) || !value.length) {
			self.tclass('hidden', true);
			return;
		}

		var builder = [];
		for (var i = 0, length = value.length; i < length; i++)
			builder.push('<div><span class="fa {1}"></span>{0}</div>'.format(value[i].error, 'fa-' + (config.icon || 'times-circle')));

		self.html(builder.join(''));
		self.tclass('hidden', false);
	};
});

COMPONENT('barchart', 'pl:20;pt:10;pb:25;prselected:0;axisX:true;axisY:true;paddingbars:5;limit:0;paddinggroup:10;radius:2;offsetX:10;offsetY:10;templateY:{{ value | format(0) }};templateX:{{ value }};height:0', function(self, config, cls) {

	var svg, g, axis, selected;
	var templateX, templateY;
	var W = $(window);

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.empty().append('<svg></svg>');
		svg = self.find('svg');
		axis = svg.asvg('g').attr('class', 'axisy');
		g = svg.asvg('g').attr('class', 'bars');
		selected = svg.asvg('text').attr('class', 'selected').attr('text-anchor', 'end');

		W.on('resize', self.resize);
		self.on('resize', self.resize);

		self.event('click mouseenter', 'rect', function(e) {
			var rect = $(this);
			var index = rect.attrd('index');

			if (index === self.$selectedindex && e.type === 'mouseenter')
				return;

			self.$selectedindex = index;
			var arr = index.split(',');
			var item = self.get()[+arr[0]];
			var value = item.values[+arr[1]];
			selected.text(templateY({ value: value.y }));
			if (e.type === 'mouseenter') {
				setTimeout2(self.id, function() {
					selected.text('');
				}, 2000);
			} else
				clearTimeout2(self.id);
		});

	};

	self.destroy = function() {
		W.off('resize', self.resize);
	};

	self.resize = function() {
		setTimeout2('resize.' + self.id, function() {
			self.refresh();
		}, 500);
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'templateX':
				templateX = Tangular.compile(value);
				break;
			case 'templateY':
				templateY = Tangular.compile(value);
				break;
			default:
				!init && self.resize();
				break;
		}
	};

	self.released = function(is) {
		!is && setTimeout(self.refresh, 1000);
	};

	self.setter = function(value) {

		if (!self.element[0].offsetParent) {
			setTimeout(function() {
				self.refresh();
			}, 1000);
			return;
		}

		if (!value) {
			g.empty();
			return;
		}

		var maxX = 0;
		var maxY = 0;
		var labels = [];
		var paddingbars = config.paddingbars;
		var paddinggroup = config.paddinggroup;
		var len = value.length;
		var size = value[0].values.length;
		var width = config.width ? config.width : self.element.width();
		var height = config.height ? config.height : (width / 100) * 60;
		var barwidth = ((width - paddingbars - paddinggroup - config.pl) / (size * len));
		var lines = {};

		barwidth -= paddingbars + (paddinggroup / len);

		for (var i = 0; i < len; i++) {
			var item = value[i];
			labels.push(item.name);
			for (var j = 0, length = item.values.length; j < length; j++) {
				var val = item.values[j];
				maxX = Math.max(maxX, val.x);
				maxY = Math.max(maxY, val.y);
			}
		}

		if (config.limit)
			maxY = config.limit;

		svg.attr('width', width);
		svg.attr('height', height);

		selected.attr('transform', 'translate({0},30)'.format(width - config.prselected));

		g.empty();
		axis.empty();

		lines.height = height - config.pt - config.pb;

		var T = { value: null };

		for (var i = 5; i > 0; i--) {
			var val = i * 20;
			var y = (((lines.height / 100) * val) + config.pt);
			config.axisY && axis.asvg('line').attr('x1', 0).attr('x2', width).attr('y1', y).attr('y2', y).attr('class', 'axis');
			T.value = (maxY / 100) * (100 - val);
			axis.asvg('text').aclass('ylabel').attr('transform', 'translate({0},{1})'.format(config.offsetX, y - config.offsetY)).text(templateY(T));
		}

		var offsetX = config.pl + paddingbars + paddinggroup;
		var posX = 0;
		var offsetL = (len - 1) === 0 ? 0.5 : len - 1;
		var offsetY =  config.pb;

		for (var i = 0, length = size; i < length; i++) {

			for (var j = 0; j < len; j++) {

				var item = value[j];
				var val = item.values[i];
				var rect = g.asvg('rect');
				var y = ((val.y / maxY) * 100) >> 0;
				var x = posX + (barwidth * j);
				var h = lines.height.inc('{0}%'.format(y));

				x += offsetX + (paddingbars * j);
				T.value = val.y;
				rect.attr('x', x).attr('y', ((lines.height - h) + (offsetY / 2)) - 3).attr('width', barwidth).attr('height', h).attr('class', 'bar bar' + (j + 1)).attr('data-index', j + ',' + i);
				config.radius && rect.attr('rx', config.radius).attr('ry', config.radius);
			}

			T.value = val.x;
			var text = templateX(T);
			var ax = posX + offsetX + (barwidth * len) + (paddingbars * len) + 2;
			config.axisX && axis.asvg('line').attr('x1', ax).attr('x2', ax).attr('y1', 0).attr('y2', height - 25).attr('class', 'axis');
			g.asvg('text').aclass('xlabel').text(text).attr('text-anchor', 'middle').attr('transform', 'translate({0},{1})'.format(posX + offsetX + (barwidth * offsetL), height - 6));

			posX += (len * barwidth) + paddinggroup;
			offsetX += len * paddingbars;
		}
	};
});

COMPONENT('shortcuts', function(self) {

	var items = [];
	var length = 0;
	var keys = {};
	var keys_session = {};
	var issession = false;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	var cb = function(o, e) {
		o.callback(e, o.owner);
	};

	self.make = function() {

		$(W).on('keydown', function(e) {

			var f = e.key;
			var c = e.keyCode;

			if (f.length > 1 && f.charAt(0) === 'F')
				c = 0;
			else
				f = '-';

			// ctrl,alt,shift,meta,fkey,code
			var key = (e.ctrlKey ? 1 : 0) + '' + (e.altKey ? 1 : 0) + '' + (e.shiftKey ? 1 : 0) + '' + (e.metaKey ? 1 : 0) + f + c;

			if (issession) {
				if (!keys_session[key])
					return;
			} else {
				if (!keys[key])
					return;
			}

			if (length && !e.isPropagationStopped()) {
				for (var i = 0; i < length; i++) {
					var o = items[i];
					if (o.fn(e)) {
						if (o.prevent) {
							e.preventDefault();
							e.stopPropagation();
						}
						setTimeout(cb, 100, o, e);
						return;
					}
				}
			}
		});

		ON('component + knockknock', self.refresh);
	};

	self.refreshforce = function() {

		var arr = document.querySelectorAll('.shortcut');
		var index = 0;

		while (true) {
			var item = items[index++];
			if (item == null)
				break;
			if (item.owner) {
				index--;
				items.splice(index, 1);
			}
		}

		for (var i = 0; i < arr.length; i++) {
			var shortcut = arr[i].getAttribute('data-shortcut');
			shortcut && self.register(shortcut, self.execshortcut, true, arr[i]);
		}
	};

	self.session = function(callback) {
		issession = true;
		keys_session = {};
		callback(self.register);
	};

	self.end = function() {
		issession = false;
	};

	self.execshortcut = function(e, owner) {
		$(owner).trigger('click');
	};

	self.refresh = function() {
		setTimeout2(self.ID, self.refreshforce, 500);
	};

	self.exec = function(shortcut) {
		var item = items.findItem('shortcut', shortcut.toLowerCase().replace(/\s/g, ''));
		item && item.callback(EMPTYOBJECT, item.owner);
	};

	self.register = function(shortcut, callback, prevent, owner) {

		var currentkeys = issession ? keys_session : keys;

		shortcut.split(',').trim().forEach(function(shortcut) {

			var builder = [];
			var alias = [];
			var cachekey = [0, 0, 0, 0, '-', 0]; // ctrl,alt,shift,meta,fkey,code

			shortcut.split('+').trim().forEach(function(item) {
				var lower = item.toLowerCase();
				alias.push(lower);

				switch (lower) {
					case 'ctrl':
						cachekey[0] = 1;
						break;
					case 'alt':
						cachekey[1] = 1;
						break;
					case 'shift':
						cachekey[2] = 1;
						break;
					case 'win':
					case 'meta':
					case 'cmd':
						cachekey[3] = 1;
						break;
				}

				switch (lower) {
					case 'ctrl':
					case 'alt':
					case 'shift':
						builder.push('e.{0}Key'.format(lower));
						return;
					case 'win':
					case 'meta':
					case 'cmd':
						builder.push('e.metaKey');
						return;
					case 'ins':
						builder.push('e.keyCode===45');
						cachekey[5] = 45;
						return;
					case 'space':
						builder.push('e.keyCode===32');
						cachekey[5] = 32;
						return;
					case 'tab':
						builder.push('e.keyCode===9');
						cachekey[5] = 9;
						return;
					case 'esc':
						builder.push('e.keyCode===27');
						cachekey[5] = 27;
						return;
					case 'enter':
						builder.push('e.keyCode===13');
						cachekey[5] = 13;
						return;
					case 'backspace':
						builder.push('e.keyCode===8');
						cachekey[5] = 8;
						break;
					case 'del':
					case 'delete':
						builder.push('e.keyCode===46');
						cachekey[5] = 46;
						return;
					case 'save':
						builder.push('(e.metaKey&&e.keyCode===115)');
						cachekey[5] = -1;
						return;
					case 'remove':
						builder.push('((e.metaKey&&e.keyCode===8)||e.keyCode===46)');
						cachekey[5] = -1;
						return;
					case 'up':
						builder.push('e.keyCode===38');
						cachekey[5] = 38;
						return;
					case 'down':
						builder.push('e.keyCode===40');
						cachekey[5] = 40;
						return;
					case 'right':
						builder.push('e.keyCode===39');
						cachekey[5] = 39;
						return;
					case 'left':
						builder.push('e.keyCode===37');
						cachekey[5] = 37;
						return;
					case 'f1':
					case 'f2':
					case 'f3':
					case 'f4':
					case 'f5':
					case 'f6':
					case 'f7':
					case 'f8':
					case 'f9':
					case 'f10':
					case 'f11':
					case 'f12':
						var a = item.toUpperCase();
						builder.push('e.key===\'{0}\''.format(a));
						cachekey[4] = a;
						return;
					case 'capslock':
						builder.push('e.which===20');
						cachekey[5] = 20;
						return;
				}

				var num = item.parseInt();
				if (num) {
					builder.push('e.which===' + num);
					cachekey[5] = num;
				} else {
					num = item.toUpperCase().charCodeAt(0);
					cachekey[5] = num;
					builder.push('e.keyCode==={0}'.format(num));
				}
			});

			items.push({ shortcut: alias.join('+'), fn: new Function('e', 'return ' + builder.join('&&')), callback: callback, prevent: prevent, owner: owner });
			length = items.length;

			var k;

			// Remove
			if (cachekey[5] === -1) {
				cachekey[5] = 8;
				k = cachekey.join('');
				currentkeys[k] = 1;
				cachekey[5] = 46;
			}

			k = cachekey.join('');
			currentkeys[k] = 1;
		});

		if (!owner)
			self.refresh();

		return self;
	};
});

COMPONENT('preview', 'width:200;height:100;background:#FFFFFF;quality:90;customize:1;schema:{file\\:base64,name\\:filename}', function(self, config, cls) {

	var empty, img, canvas, name, content = null;

	self.readonly();
	self.nocompile && self.nocompile();

	self.configure = function(key, value, init) {

		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'width':
			case 'height':
			case 'background':
				setTimeout2(self.id + 'reinit', self.reinit, 50);
				break;
			case 'label':
			case 'icon':
				redraw = true;
				break;
		}

		redraw && setTimeout2(self.id + 'redraw', function() {
			self.redraw();
			self.refresh();
		}, 50);
	};

	self.reinit = function() {
		canvas = document.createElement('canvas');
		canvas.width = config.width;
		canvas.height = config.height;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = config.background;
		ctx.fillRect(0, 0, config.width, config.height);
		empty = canvas.toDataURL('image/png');
		canvas = null;
	};

	var resizewidth = function(w, h, size) {
		return Math.ceil(w * (size / h));
	};

	var resizeheight = function(w, h, size) {
		return Math.ceil(h * (size / w));
	};

	self.resizeforce = function(image) {

		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = config.width;
		canvas.height = config.height;
		ctx.fillStyle = config.background;
		ctx.fillRect(0, 0, config.width, config.height);

		var w = 0;
		var h = 0;
		var x = 0;
		var y = 0;
		var is = false;
		var diff = 0;

		if (config.customize) {
			if (image.width > config.width || image.height > config.height) {
				if (image.width > image.height) {

					w = resizewidth(image.width, image.height, config.height);
					h = config.height;

					if (w < config.width) {
						w = config.width;
						h = resizeheight(image.width, image.height, config.width);
					}

					if (w > config.width) {
						diff = w - config.width;
						x -= (diff / 2) >> 0;
					}

					is = true;
				} else if (image.height > image.width) {

					w = config.width;
					h = resizeheight(image.width, image.height, config.width);

					if (h < config.height) {
						h = config.height;
						w = resizewidth(image.width, image.height, config.height);
					}

					if (h > config.height) {
						diff = h - config.height;
						y -= (diff / 2) >> 0;
					}

					is = true;
				}
			}
		}

		if (!is) {
			if (image.width < config.width && image.height < config.height) {
				w = image.width;
				h = image.height;
				x = (config.width / 2) - (image.width / 2);
				y = (config.height / 2) - (image.height / 2);
			} else if (image.width >= image.height) {
				w = config.width;
				h = image.height * (config.width / image.width);
				y = (config.height / 2) - (h / 2);
			} else {
				h = config.height;
				w = (image.width * (config.height / image.height)) >> 0;
				x = (config.width / 2) - (w / 2);
			}

		}

		ctx.drawImage(image, x, y, w, h);
		var base64 = canvas.toDataURL('image/jpeg', config.quality * 0.01);
		img.attr('src', base64);
		self.upload(base64);
	};

	self.redraw = function() {
		var label = config.label || content;
		self.html((label ? ('<div class="' + cls + '-label">{0}{1}:</div>'.format(config.icon ? '<i class="{0}"></i>'.format(config.icon.indexOf(' ') === -1 ? ('fa fa-' + config.icon) : config.icon) : '', label)) : '') + '<input type="file" accept="image/*" class="hidden" /><img src="{0}" class="img-responsive" alt="" />'.format(empty, config.width, config.height));
		img = self.find('img');
		img.on('click', function() {
			self.find('input').trigger('click');
		});
	};

	self.make = function() {

		content = self.html();
		self.aclass(cls);
		self.reinit();
		self.redraw();

		self.event('change', 'input', function() {
			var file = this.files[0];
			file && self.load(file);
			this.value = '';
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':
					break;
				default:
					return;
			}

			var dt = e.originalEvent.dataTransfer;
			if (dt && dt.files.length) {
				var file = e.originalEvent.dataTransfer.files[0];
				file && self.load(file);
			}
		});
	};

	self.load = function(file) {
		name = file.name;
		self.getOrientation(file, function(orient) {
			var reader = new FileReader();
			reader.onload = function () {
				var img = new Image();
				img.onload = function() {
					self.resizeforce(img);
					self.change(true);
				};
				img.crossOrigin = 'anonymous';
				if (orient < 2) {
					img.src = reader.result;
				} else {
					SETTER('loading', 'show');
					self.resetOrientation(reader.result, orient, function(url) {
						SETTER('loading', 'hide', 500);
						img.src = url;
					});
				}
			};
			reader.readAsDataURL(file);
		});
	};

	self.upload = function(base64) {
		if (base64) {
			var data = (new Function('base64', 'filename', 'return ' + config.schema))(base64, name);
			SETTER('loading', 'show');
			AJAX('POST ' + config.url.env(true), data, function(response, err) {
				SETTER('loading', 'hide', 100);
				if (err) {
					SETTER('snackbar', 'warning', err.toString());
				} else {
					self.change(true);
					self.set(response);
				}
			});
		}
	};

	self.setter = function(value) {
		img.attr('src', value ? value : empty);
	};

	// http://stackoverflow.com/a/32490603
	self.getOrientation = function(file, callback) {
		var reader = new FileReader();
		reader.onload = function(e) {
			var view = new DataView(e.target.result);
			if (view.getUint16(0, false) != 0xFFD8)
				return callback(-2);
			var length = view.byteLength;
			var offset = 2;
			while (offset < length) {
				var marker = view.getUint16(offset, false);
				offset += 2;
				if (marker == 0xFFE1) {
					if (view.getUint32(offset += 2, false) != 0x45786966)
						return callback(-1);
					var little = view.getUint16(offset += 6, false) == 0x4949;
					offset += view.getUint32(offset + 4, little);
					var tags = view.getUint16(offset, little);
					offset += 2;
					for (var i = 0; i < tags; i++)
						if (view.getUint16(offset + (i * 12), little) == 0x0112)
							return callback(view.getUint16(offset + (i * 12) + 8, little));
				} else if ((marker & 0xFF00) != 0xFF00)
					break;
				else
					offset += view.getUint16(offset, false);
			}
			return callback(-1);
		};
		reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
	};

	self.resetOrientation = function(src, srcOrientation, callback) {
		var img = new Image();
		img.onload = function() {
			var width = img.width;
			var height = img.height;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');

			// set proper canvas dimensions before transform & export
			/*
			if (4 < srcOrientation && srcOrientation < 9) {
				canvas.width = height;
				canvas.height = width;
			} else {
				canvas.width = width;
				canvas.height = height;
			}*/

			canvas.width = width;
			canvas.height = height;

			switch (srcOrientation) {
				case 2: ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 3: ctx.transform(-1, 0, 0, -1, width, height); break;
				case 4: ctx.transform(1, 0, 0, -1, 0, height); break;
				case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
				// case 6: ctx.transform(0, 1, -1, 0, height, 0); break;
				case 6: ctx.transform(-1, 0, 0, 1, width, 0); break;
				case 7: ctx.transform(0, -1, -1, 0, height, width); break;
				case 8: ctx.transform(0, -1, 1, 0, 0, width); break;
			}
			ctx.drawImage(img, 0, 0);
			callback(canvas.toDataURL());
		};
		img.src = src;
	};
});

COMPONENT('autocomplete', 'height:200', function(self, config, cls) {

	var clssel = 'selected';

	var container, old, searchtimeout, searchvalue, blurtimeout, datasource, offsetter, scroller;
	var margin = {};
	var skipmouse = false;
	var is = false;
	var prev;

	self.template = Tangular.compile('<li{{ if select }} class="' + clssel + '"{{ fi }} data-index="{{ index }}"><span>{{ name }}</span><span>{{ type }}</span></li>');
	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.aclass(cls + '-container hidden');
		self.html('<div class="' + cls + '"><div class="noscrollbar"><ul></ul></div></div>');

		scroller = self.find('.noscrollbar');
		container = self.find('ul');

		self.event('click', 'li', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if (self.opt.callback) {
				var val = datasource[+$(this).attrd('index')];
				self.opt.scope && M.scope(self.opt.scope);
				if (self.opt.path)
					SET(self.opt.path, val.value === undefined ? val.name : val.value);
				else
					self.opt.callback(val, old);
			}
			self.visible(false);
		});

		self.event('mouseenter mouseleave', 'li', function(e) {
			if (!skipmouse) {
				prev && prev.rclass(clssel);
				prev = $(this).tclass(clssel, e.type === 'mouseenter');
			}
		});

		$(document).on('click', function() {
			is && self.visible(false);
		});

		self.on('scroll + resize + reflow + resize2', function() {
			is && self.visible(false);
		});
	};

	self.prerender = function(value) {
		self.render(value);
	};

	self.configure = function(name, value) {
		switch (name) {
			case 'height':
				value && scroller.css('height', value);
				break;
		}
	};

	function keydown(e) {
		var c = e.which;
		var input = this;
		if (c !== 38 && c !== 40 && c !== 13) {
			if (c !== 8 && c < 32)
				return;
			clearTimeout(searchtimeout);
			searchtimeout = setTimeout(function() {
				var val = input.value || input.innerHTML;
				if (!val)
					return self.render(EMPTYARRAY);
				if (searchvalue === val)
					return;
				searchvalue = val;
				self.resize();
				self.opt.search(val, self.prerender);
			}, 200);
			return;
		}

		if (!datasource || !datasource.length || !is)
			return;

		var current = container.find('.' + clssel);
		if (c === 13) {
			if (prev) {
				prev = null;
				self.visible(false);
				if (current.length) {
					var val = datasource[+current.attrd('index')];
					self.opt.scope && M.scope(self.opt.scope);
					if (self.opt.callback)
						self.opt.callback(val, old);
					else if (self.opt.path)
						SET(self.opt.path, val.value === undefined ? val.name : val.value);
					e.preventDefault();
					e.stopPropagation();
				}
			}
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		if (current.length) {
			current.rclass(clssel);
			current = c === 40 ? current.next() : current.prev();
		}

		skipmouse = true;
		!current.length && (current = self.find('li:{0}-child'.format(c === 40 ? 'first' : 'last')));
		prev && prev.rclass(clssel);
		prev = current.aclass(clssel);
		var index = +current.attrd('index');
		var h = current.innerHeight();
		var offset = ((index + 1) * h) + (h * 2);
		scroller[0].scrollTop = offset > config.height ? offset - config.height : 0;
		setTimeout2(self.ID + 'skipmouse', function() {
			skipmouse = false;
		}, 100);
	}

	function blur() {
		clearTimeout(blurtimeout);
		blurtimeout = setTimeout(function() {
			self.visible(false);
		}, 300);
	}

	self.visible = function(visible) {
		clearTimeout(blurtimeout);
		self.tclass('hidden', !visible);
		is = visible;
	};

	self.resize = function() {

		if (!offsetter || !old)
			return;

		var offset = offsetter.offset();
		offset.top += offsetter.height();
		offset.width = offsetter.width();

		if (margin.left)
			offset.left += margin.left;
		if (margin.top)
			offset.top += margin.top;
		if (margin.width)
			offset.width += margin.width;

		self.css(offset);
	};

	self.show = function(opt) {

		clearTimeout(searchtimeout);
		var selector = 'input,[contenteditable]';

		if (opt.input == null)
			opt.input = opt.element;

		if (opt.input.setter)
			opt.input = opt.input.find(selector);
		else
			opt.input = $(opt.input);

		if (opt.input[0].tagName !== 'INPUT' && !opt.input.attr('contenteditable'))
			opt.input = opt.input.find(selector);

		if (opt.element.setter) {
			if (!opt.callback)
				opt.callback = opt.element.path;
			opt.element = opt.element.element;
		}

		if (old) {
			old.removeAttr('autocomplete');
			old.off('blur', blur);
			old.off('keydown', keydown);
		}

		opt.input.on('keydown', keydown);
		opt.input.on('blur', blur);
		opt.input.attr('autocomplete', 'off');

		old = opt.input;
		margin.left = opt.offsetX;
		margin.top = opt.offsetY;
		margin.width = opt.offsetWidth;
		opt.scope = M.scope ? M.scope() : '';

		offsetter = $(opt.element);
		self.opt = opt;
		self.resize();
		self.refresh();
		searchvalue = '';
		self.visible(false);
	};

	self.attach = function(input, search, callback, left, top, width) {
		self.attachelement(input, input, search, callback, left, top, width);
	};

	self.attachelement = function(element, input, search, callback, left, top, width) {

		if (typeof(callback) === 'number') {
			width = left;
			left = top;
			top = callback;
			callback = null;
		}

		var opt = {};
		opt.offsetX = left;
		opt.offsetY = top;
		opt.offsetWidth = width;

		if (typeof(callback) === 'string')
			opt.path = callback;
		else
			opt.callback = callback;

		opt.search = search;
		opt.element = input;
		opt.input = input;
		self.show(opt);
	};

	self.render = function(arr) {

		datasource = arr;

		if (!arr || !arr.length) {
			self.visible(false);
			return;
		}

		var builder = [];
		for (var i = 0; i < arr.length; i++) {
			var obj = arr[i];

			if (!i && self.opt.autoselect)
				obj.select = true;

			obj.index = i;
			if (!obj.name)
				obj.name = obj.text;
			builder.push(self.template(obj));
		}

		container.empty().append(builder.join(''));
		skipmouse = true;

		setTimeout(function() {
			scroller[0].scrollTop = 0;
			skipmouse = false;
		}, 100);

		prev = container.find('.' + clssel);
		self.visible(true);
		setTimeout(scroller.noscrollbar, 100, true);
	};
});

COMPONENT('datagrid', 'checkbox:true;colwidth:150;rowheight:28;minheight:200;clusterize:true;limit:80;filterlabel:Filter;height:auto;margin:0;resize:true;reorder:true;sorting:true;boolean:true,on,yes;pluralizepages:# pages,# page,# pages,# pages;pluralizeitems:# items,# item,# items,# items;remember:true;highlight:false;unhighlight:true;autoselect:false;buttonapply:Apply;buttonreset:Reset;allowtitles:false;fullwidth_xs:true;clickid:id;dirplaceholder:Search;autoformat:1;controls:1', function(self, config) {

	var opt = { filter: {}, filtercache: {}, filtercl: {}, filtervalues: {}, scroll: false, selected: {}, operation: '' };
	var header, vbody, footer, container, ecolumns, isecolumns = false, ready = false;
	var sheader, sbody, econtrols;
	var Theadercol = Tangular.compile('<div class="dg-hcol dg-col-{{ index }}{{ if sorting }} dg-sorting{{ fi }}" data-index="{{ index }}">{{ if sorting }}<i class="dg-sort fa fa-sort"></i>{{ fi }}<div class="dg-label{{ alignheader }}"{{ if labeltitle }} title="{{ labeltitle }}"{{ fi }}{{ if reorder }} draggable="true"{{ fi }}>{{ label | raw }}</div>{{ if filter }}<div class="dg-filter{{ alignfilter }}{{ if filterval != null && filterval !== \'\' }} dg-filter-selected{{ fi }}"><i class="fa dg-filter-cancel fa-times"></i>{{ if options }}<label data-name="{{ name }}">{{ if filterval }}{{ filterval }}{{ else }}{{ filter }}{{ fi }}</label>{{ else }}<input autocomplete="new-password" type="text" placeholder="{{ filter }}" class="dg-filter-input" name="{{ name }}{{ ts }}" data-name="{{ name }}" value="{{ filterval }}" />{{ fi }}</div>{{ else }}<div class="dg-filter-empty">&nbsp;</div>{{ fi }}</div>');
	var isIE = (/msie|trident/i).test(navigator.userAgent);
	var isredraw = false;
	var forcescroll = '';
	var schemas = {};
	var controls = { el: null, timeout: null, is: false, cache: {} };

	self.meta = opt;

	function Cluster(el) {

		var self = this;
		var dom = el[0];
		var scrollel = el;

		self.row = config.rowheight;
		self.rows = [];
		self.limit = config.limit;
		self.pos = -1;
		self.enabled = !!config.clusterize;
		self.plus = 0;
		self.scrolltop = 0;
		self.prev = 0;

		var seh = '<div style="height:0"></div>';
		var set = $(seh);
		var seb = $(seh);

		var div = document.createElement('DIV');
		dom.appendChild(set[0]);
		dom.appendChild(div);
		dom.appendChild(seb[0]);
		self.el = $(div);

		self.render = function() {

			var t = self.pos * self.frame;
			var b = (self.rows.length * self.row) - (self.frame * 2) - t;
			var pos = self.pos * self.limit;
			var posto = pos + (self.limit * 2);

			set.css('height', t);
			seb.css('height', b < 2 ? isMOBILE ? (config.exec ? (self.row + 1) : (self.row * 2.25)) >> 0 : 3 : b);

			var tmp = self.scrollbar[0].scrollTop;
			var node = self.el[0];
			// node.innerHTML = '';

			var child = node.firstChild;

			while (child) {
				node.removeChild(child);
				child = node.firstChild;
			}

			for (var i = pos; i < posto; i++) {
				if (typeof(self.rows[i]) === 'string')
					self.rows[i] = $(self.rows[i])[0];

				if (self.rows[i])
					node.appendChild(self.rows[i]);
				else
					break;
			}

			if (self.prev < t)
				self.scrollbar[0].scrollTop = t;
			else
				self.scrollbar[0].scrollTop = tmp;

			self.prev = t;

			if (self.grid.selected) {
				var index = opt.rows.indexOf(self.grid.selected);
				if (index !== -1 && (index >= pos || index <= (pos + self.limit)))
					self.el.find('.dg-row[data-index="{0}"]'.format(index)).aclass('dg-selected');
			}
		};

		self.scrolling = function() {

			var y = self.scrollbar[0].scrollTop + 1;
			self.scrolltop = y;

			if (y < 0)
				return;

			var frame = Math.ceil(y / self.frame) - 1;
			if (frame === -1)
				return;

			if (self.pos !== frame) {

				// The content could be modified
				var plus = (self.el[0].offsetHeight / 2) - self.frame;
				if (plus > 0) {
					frame = Math.ceil(y / (self.frame + plus)) - 1;
					if (self.pos === frame)
						return;
				}

				if (self.max && frame >= self.max)
					frame = self.max;

				self.pos = frame;

				if (self.enabled)
					self.render();
				else {

					var node = self.el[0];
					var child = node.firstChild;

					while (child) {
						node.removeChild(child);
						child = node.firstChild;
					}

					for (var i = 0; i < self.rows.length; i++) {
						if (typeof(self.rows[i]) === 'string')
							self.rows[i] = $(self.rows[i])[0];
						self.el[0].appendChild(self.rows[i]);
					}
				}

				self.scroll && self.scroll();
				config.change && self.grid.SEEX(config.change, null, null, self.grid);
			}
		};

		self.update = function(rows, noscroll) {

			if (noscroll != true)
				self.el[0].scrollTop = 0;

			self.limit = config.limit;
			self.pos = -1;
			self.rows = rows;
			self.max = Math.ceil(rows.length / self.limit) - 1;
			self.frame = self.limit * self.row;

			if (!self.enabled) {
				self.frame = 1000000;
			} else if (self.limit * 2 > rows.length) {
				self.limit = rows.length;
				self.frame = self.limit * self.row;
				self.max = 1;
			}

			self.scrolling();
		};

		self.destroy = function() {
			self.el.off('scroll');
			self.rows = null;
		};

		self.scrollbar = scrollel.closest('.ui-scrollbar-area');
		self.scrollbar.on('scroll', self.scrolling);
	}

	self.destroy = function() {
		opt.cluster && opt.cluster.destroy();
	};

	// opt.cols    --> columns
	// opt.rows    --> raw rendered data
	// opt.render  --> for cluster

	self.init = function() {

		ON('resize + resize2', function() {
			setTimeout2('datagridresize', ASETTER('datagrid/resize'), 500);
		});

		Thelpers.ui_datagrid_autoformat = function(val, type) {

			switch (type) {
				case 'email':
					return val && val.length > 2 ? '<a href="mailto:{0}" class="dg-link"><i class="far fa-envelope"></i>{0}</a>'.format(val) : val;
				case 'phone':
					return val && val.length > 2 ? '<a href="tel:{0}" class="dg-link"><i class="fas fa-phone"></i>{0}</a>'.format(val) : val;
				case 'url':
					return val && val.length > 7 && (/http(s):\/\//i).test(val) ? '<a href="{0}" target="_blank" class="dg-link"><i class="fas fa-globe"></i>{0}</a>'.format(val) : val;
			}

			return val;
		};

		Thelpers.ui_datagrid_checkbox = function(val) {
			return '<div class="dg-checkbox' + (val ? ' dg-checked' : '') + '" data-custom="1"><i class="fa fa-check"></i></div>';
		};

		Thelpers.ui_datagrid_colorize = function(val, encode) {
			var hash = HASH(val + '');
			var color = '#';
			for (var i = 0; i < 3; i++) {
				var value = (hash >> (i * 8)) & 0xFF;
				color += ('00' + value.toString(16)).substr(-2);
			}
			return '<span style="background:{0}" class="dg-colorize">{1}</span>'.format(color, encode ? Thelpers.encode(val) : val);
		};
	};

	self.readonly();
	self.bindvisible();
	self.nocompile();

	var reconfig = function() {
		self.tclass('dg-clickable', !!(config.click || config.dblclick));
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'noborder':
				self.tclass('dg-noborder', !!value);
				break;
			case 'checkbox':
			case 'numbering':
				!init && self.cols(NOOP);
				break;
			case 'pluralizepages':
				config.pluralizepages = value.split(',').trim();
				break;
			case 'pluralizeitems':
				config.pluralizeitems = value.split(',').trim();
				break;
			case 'checked':
			case 'button':
			case 'exec':
				if (value && value.SCOPE)
					config[key] = value.SCOPE(self, value);
				break;
			case 'dblclick':
				if (value && value.SCOPE)
					config.dblclick = value.SCOPE(self, value);
				break;
			case 'click':
				if (value && value.SCOPE)
					config.click = value.SCOPE(self, value);
				break;
			case 'columns':
				self.datasource(value, function(path, value, type) {
					if (value) {
						opt.sort = null;
						opt.filter = {};
						opt.scroll = '';
						opt.selected = {};
						self.rebind(value, true);
						type && self.setter(null);
					}
				});
				break;
		}

		setTimeout2(self.ID + 'reconfigure', reconfig);
	};

	self.refresh = function() {
		self.refreshfilter();
	};

	self.applycolumns = function(use) {
		isecolumns = false;
		ecolumns.aclass('hidden');
		if (use) {
			var nothidden = {};
			ecolumns.find('.dg-columns-checkbox-checked').each(function() {
				nothidden[this.getAttribute('data-id')] = true;
			});
			self.cols(function(cols) {
				for (var i = 0; i < cols.length; i++) {
					var col = cols[i];
					col.hidden = nothidden[col.id] !== true;
				}
			});
		}
	};

	self.fn_in_changed = function(arr) {
		config.changed && self.SEEX(config.changed, arr || self.changed(), self);
	};

	self.fn_in_checked = function(arr) {
		config.checked && self.SEEX(config.checked, arr || self.checked(), self);
	};

	self.fn_refresh = function() {
		setTimeout2(self.ID + 'filter', function() {
			if (config.exec)
				self.operation(opt.operation);
			else
				self.refreshfilter(true);
		}, 50);
	};

	self.make = function() {

		self.IDCSS = GUID(5);
		self.aclass('dg dg-noscroll dg-' + self.IDCSS + (config.height === 'fluid' ? ' dg-fluid' : ''));

		self.find('script').each(function() {
			var el = $(this);
			var id = el.attrd('id');

			if (id)
				schemas[id] = el.html();

			if (!schemas.default)
				schemas.default = el.html();

		});

		controls.show = function(dom) {

			if (controls.ishidding || !opt.controls || !config.controls)
				return;

			var el = $(dom);
			var off = el.position();
			var css = {};
			var clshover = 'dg-row-hover';
			var index = el.attrd('index');
			controls.el && controls.el.rclass(clshover);
			controls.el = $(dom).aclass(clshover);

			var div = controls.cache[index];

			if (div === null) {
				controls.hide();
				return;
			}

			if (!div) {
				var html = opt.controls(opt.rows[+index]);
				div = controls.cache[index] = html ? $('<div>' + html + '</div>')[0] : null;
				controls.cache[index] = div;
				if (div === null) {
					controls.hide();
					return;
				}
			}

			while (true) {
				var child = econtrols[0].firstChild;
				if (child)
					econtrols[0].removeChild(child);
				else
					break;
			}

			econtrols[0].appendChild(div);
			css.top = Math.ceil(off.top - ((econtrols.height() / 2) - (config.rowheight / 2))) - 2;
			econtrols.css(css).rclass('hidden').aclass('dg-controls-visible', 50).attrd('index', index);
			controls.timeout = null;
			controls.is = true;
			controls.y = self.scrollbarY.scrollTop();
		};

		controls.hide = function(type) {
			if (controls.is) {

				// scrollbar
				if (type === 1) {
					var y = self.scrollbarY.scrollTop();
					if (controls.y === y)
						return;
				} else if (type === 2) {
					controls.ishidding = true;
					setTimeout(function() {
						controls.ishidding = false;
					}, 1000);
				}

				controls.el.rclass('dg-row-hover');
				controls.el = null;
				controls.is = false;
				econtrols.aclass('hidden').rclass('dg-controls-visible');
			}
		};

		ON('scroll', function() {
			controls.hide(1);
		});

		self.event('mouseenter', '.dg-row', function(e) {
			controls.timeout && clearTimeout(controls.timeout);
			controls.timeout = setTimeout(controls.show, controls.is ? 50 : 500, this, e);
		});

		var pagination = '';
		if (config.exec)
			pagination = '<div class="dg-footer hidden"><div class="dg-pagination-items hidden-xs"></div><div class="dg-pagination"><button name="page-first" disabled><i class="fa fa-angle-double-left"></i></button><button name="page-prev" disabled><i class="fa fa-angle-left"></i></button><div><input type="text" name="page" maxlength="5" class="dg-pagination-input" /></div><button name="page-next" disabled><i class="fa fa-angle-right"></i></button><button name="page-last" disabled><i class="fa fa-angle-double-right"></i></button></div><div class="dg-pagination-pages"></div></div>';

		self.dom.innerHTML = '<div class="dg-btn-columns"><i class="fa fa-caret-left"></i><span class="fa fa-columns"></span></div><div class="dg-columns hidden"><div><div class="dg-columns-body"></div></div><button class="dg-columns-button" name="columns-apply"><i class="fa fa-check-circle"></i>{1}</button><span class="dt-columns-reset">{2}</span></div><div class="dg-container"><div class="dg-controls"></div><span class="dg-resize-line hidden"></span><div class="dg-header-scrollbar"><div class="dg-header"></div><div class="dg-body-scrollbar"><div class="dg-body"></div></div></div></div>{0}'.format(pagination, config.buttonapply, config.buttonreset);

		header = self.find('.dg-header');
		vbody = self.find('.dg-body');
		footer = self.find('.dg-footer');
		container = self.find('.dg-container');
		ecolumns = self.find('.dg-columns');
		sheader = self.find('.dg-header-scrollbar');
		sbody = self.find('.dg-body-scrollbar');
		econtrols = self.find('.dg-controls');

		container.on('mouseleave', function() {
			controls.hide(2);
		});

		self.scrollbarY = config.height !== 'fluid' ? SCROLLBAR(sbody, { visibleY: true, orientation: 'y', controls: container, marginY: isMOBILE ? 0 : 54 }) : null;
		self.scrollbarX = SCROLLBAR(sheader, { visibleX: true, orientation: 'x', controls: container });

		if (schemas.default) {
			self.rebind(schemas.default);
			schemas.$current = 'default';
		}

		var events = {};

		events.mouseup = function(e) {
			if (r.is) {
				r.is = false;
				r.line.aclass('hidden');
				r.el.css('height', r.h);
				var x = r.el.css('left').parseInt();
				var index = +r.el.attrd('index');
				var width = opt.cols[index].width + (x - r.x);
				self.resizecolumn(index, width);
				e.preventDefault();
				e.stopPropagation();
			}
			events.unbind();
		};

		container.on('contextmenu', function(e) {
			if (config.contextmenu) {
				e.preventDefault();
				self.EXEC(config.contextmenu, e, self);
			}
		});

		events.unbind = function() {
			$(W).off('mouseup', events.mouseup).off('mousemove', events.mousemove);
		};

		events.bind = function() {
			$(W).on('mouseup', events.mouseup).on('mousemove', events.mousemove);
		};

		var hidedir = function() {
			ishidedir = true;
			SETTER('!directory', 'hide');
			setTimeout(function() {
				ishidedir = false;
			}, 800);
		};

		var ishidedir = false;
		var r = { is: false };

		self.event('click', '.dg-btn-columns', function(e) {

			e.preventDefault();
			e.stopPropagation();

			controls.hide();

			var cls = 'hidden';
			if (isecolumns) {
				self.applycolumns();
			} else {
				var builder = [];

				for (var i = 0; i < opt.cols.length; i++) {
					var col = opt.cols[i];
					(col.listcolumn && !col.$hidden) && builder.push('<div><label class="dg-columns-checkbox{1}" data-id="{0}"><span><i class="fa fa-check"></i></span>{2}</label></div>'.format(col.id, col.hidden ? '' : ' dg-columns-checkbox-checked', col.text));
				}

				ecolumns.find('.dg-columns-body')[0].innerHTML = builder.join('');
				ecolumns.rclass(cls);
				isecolumns = true;
			}
		});

		header.on('click', 'label', function() {

			var el = $(this);
			var index = +el.closest('.dg-hcol').attrd('index');
			var col = opt.cols[index];
			var opts = col.options instanceof Array ? col.options : GET(self.makepath(col.options));
			var dir = {};

			controls.hide();
			dir.element = el;
			dir.items = opts;
			dir.key = col.otext;
			dir.offsetX = -6;
			dir.offsetY = -2;
			dir.placeholder = config.dirplaceholder;

			dir.callback = function(item) {
				self.applyfilterdirectory(el, col, item);
			};

			SETTER('directory', 'show', dir);
		});

		self.event('dblclick', '.dg-col', function(e) {
			controls.hide();
			e.preventDefault();
			e.stopPropagation();
			self.editcolumn($(this));
		});

		var dblclick = { ticks: 0, id: null, row: null };
		r.line = container.find('.dg-resize-line');

		var findclass = function(node) {
			var count = 0;
			while (true) {
				for (var i = 1; i < arguments.length; i++) {
					if (node.classList.contains(arguments[i]))
						return true;
				}
				node = node.parentNode;
				if ((count++) > 4)
					break;
			}
		};

		self.event('click', '.dg-row', function(e) {

			var now = Date.now();
			var el = $(this);
			var type = e.target.tagName;
			var target = $(e.target);

			if ((type === 'DIV' || type === 'SPAN')) {

				var cls = 'dg-selected';
				var elrow = el.closest('.dg-row');
				var index = +elrow.attrd('index');
				var row = opt.rows[index];
				if (!row)
					return;

				if (config.dblclick && dblclick.ticks && dblclick.ticks > now && dblclick.row === row && !findclass(e.target, 'dg-checkbox', 'dg-editable')) {
					config.dblclick && self.SEEX(config.dblclick, row, self, elrow, target);
					if (config.highlight && self.selected !== row) {
						opt.cluster.el.find('.' + cls).rclass(cls);
						self.selected = row;
						elrow.aclass(cls);
					}
					e.preventDefault();
					return;
				}

				dblclick.row = row;
				dblclick.ticks = now + 300;

				var rowarg = row;

				if (config.highlight) {
					opt.cluster.el.find('.' + cls).rclass(cls);
					if (!config.unhighlight || self.selected !== row) {
						self.selected = row;
						elrow.aclass(cls);
						controls.show(el[0]);
					} else {
						rowarg = self.selected = null;
						controls.is && controls.hide();
					}
				} else {
					if (controls.is)
						controls.hide();
					else if (rowarg)
						controls.show(el[0]);
				}

				config.click && self.SEEX(config.click, rowarg, self, elrow, target);
			}
		});

		self.reload = function() {
			self.operation('refresh');
		};

		self.empty = function() {
			self.set({ page: 1, pages: 0, count: 0, items: [], limit: 0 });
		};

		self.released = function(is) {
			!is && setTimeout(self.resize, 500);
		};

		self.event('click', '.dg-filter-cancel,.dt-columns-reset', function() {
			var el = $(this);

			controls.hide();

			if (el.hclass('dt-columns-reset'))
				self.resetcolumns();
			else {
				var tmp = el.parent();
				var input = tmp.find('input');
				if (input.length) {
					input.val('');
					input.trigger('change');
					return;
				}

				var label = tmp.find('label');
				if (label.length) {
					tmp.rclass('dg-filter-selected');
					var index = +el.closest('.dg-hcol').attrd('index');
					var col = opt.cols[index];
					var k = label.attrd('name');
					label.html(col.filter);
					forcescroll = opt.scroll = 'y';
					opt.operation = 'filter';
					delete opt.filter[k];
					delete opt.filtervalues[col.id];
					delete opt.filtercl[k];
					self.fn_refresh();
				}
			}
		});

		self.event('click', '.dg-label,.dg-sort', function() {

			var el = $(this).closest('.dg-hcol');

			controls.hide();

			if (!el.find('.dg-sort').length)
				return;

			var index = +el.attrd('index');

			for (var i = 0; i < opt.cols.length; i++) {
				if (i !== index)
					opt.cols[i].sort = 0;
			}

			var col = opt.cols[index];
			switch (col.sort) {
				case 0:
					col.sort = 1;
					break;
				case 1:
					col.sort = 2;
					break;
				case 2:
					col.sort = 0;
					break;
			}

			opt.sort = col;
			opt.operation = 'sort';
			forcescroll = '-';

			if (config.exec)
				self.operation(opt.operation);
			else
				self.refreshfilter(true);
		});

		isIE && self.event('keydown', 'input', function(e) {
			if (e.keyCode === 13)
				$(this).blur();
			else if (e.keyCode === 27)
				$(this).val('');
		});

		self.event('mousedown', function(e) {

			var el = $(e.target);

			if (!el.hclass('dg-resize'))
				return;

			controls.hide();
			events.bind();

			var offset = self.element.offset().left;
			r.el = el;
			r.offset = offset; //offset;

			var prev = el.prev();
			r.min = (prev.length ? prev.css('left').parseInt() : (config.checkbox ? 70 : 30)) + 50;
			r.h = el.css('height');
			r.x = el.css('left').parseInt();
			r.line.css('height', opt.height);
			r.is = true;
			r.isline = false;
			e.preventDefault();
			e.stopPropagation();
		});

		header.on('mousemove', function(e) {
			if (r.is) {
				var x = (e.pageX - r.offset - 10);
				var x2 = self.scrollbarX.scrollLeft() + x;
				if (x2 < r.min)
					x2 = r.min;

				r.el.css('left', x2);
				r.line.css('left', x + 9);

				if (!r.isline) {
					r.isline = true;
					r.line.rclass('hidden');
				}

				e.preventDefault();
				e.stopPropagation();
			}
		});

		self.applyfilterdirectory = function(label, col, item) {

			var val = item[col.ovalue];
			var is = val != null && val !== '';
			var name = label.attrd('name');

			opt.filtervalues[col.id] = val;

			if (is) {
				if (opt.filter[name] == val)
					return;
				opt.filter[name] = val;
			} else
				delete opt.filter[name];

			delete opt.filtercache[name];
			opt.filtercl[name] = val;

			forcescroll = opt.scroll = 'y';
			opt.operation = 'filter';
			label.parent().tclass('dg-filter-selected', is);
			label.text(is ? (item[col.otext] || '') : col.filter);
			self.fn_refresh();
		};

		var d = { is: false };

		self.event('dragstart', function(e) {
			!isIE && e.originalEvent.dataTransfer.setData('text/plain', GUID());
		});

		self.event('dragenter dragover dragexit drop dragleave', function (e) {

			e.stopPropagation();
			e.preventDefault();

			switch (e.type) {
				case 'drop':

					if (d.is) {
						var col = opt.cols[+$(e.target).closest('.dg-hcol').attrd('index')];
						col && self.reordercolumn(d.index, col.index);
					}

					d.is = false;
					break;

				case 'dragenter':
					if (!d.is) {
						d.index = +$(e.target).closest('.dg-hcol').attrd('index');
						d.is = true;
					}
					return;
				case 'dragover':
					return;
				default:
					return;
			}
		});

		self.event('change', '.dg-pagination-input', function() {

			var value = self.get();
			var val = +this.value;

			if (isNaN(val))
				return;

			if (val >= value.pages)
				val = value.pages;
			else if (val < 1)
				val = 1;

			value.page = val;
			forcescroll = opt.scroll = 'y';
			self.operation('page');
			controls.hide();
		});

		self.event('change', '.dg-filter-input', function() {

			var input = this;
			var $el = $(this);
			var el = $el.parent();
			var val = $el.val();
			var name = input.getAttribute('data-name');

			var col = opt.cols[+el.closest('.dg-hcol').attrd('index')];
			delete opt.filtercache[name];
			delete opt.filtercl[name];

			if (col.options) {
				if (val)
					val = (col.options instanceof Array ? col.options : GET(self.makepath(col.options)))[+val][col.ovalue];
				else
					val = null;
			}

			var is = val != null && val !== '';

			if (col)
				opt.filtervalues[col.id] = val;

			if (is) {
				if (opt.filter[name] == val)
					return;
				opt.filter[name] = val;
			} else
				delete opt.filter[name];

			forcescroll = opt.scroll = 'y';
			opt.operation = 'filter';
			el.tclass('dg-filter-selected', is);
			self.fn_refresh();
			controls.hide();
		});

		self.select = function(row) {

			var index;

			if (typeof(row) === 'number') {
				index = row;
				row = opt.rows[index];
			} else if (row)
				index = opt.rows.indexOf(row);

			var cls = 'dg-selected';
			if (!row || index === -1) {
				self.selected = null;
				opt.cluster && opt.cluster.el.find('.' + cls).rclass(cls);
				config.highlight && config.click && self.SEEX(config.click, null, self);
				return;
			}

			self.selected = row;

			var elrow = opt.cluster.el.find('.dg-row[data-index="{0}"]'.format(index));
			if (elrow && config.highlight) {
				opt.cluster.el.find('.' + cls).rclass(cls);
				elrow.aclass(cls);
			}

			config.click && self.SEEX(config.click, row, self, elrow, null);
			controls.hide();
		};

		self.event('click', '.dg-checkbox', function() {

			var t = $(this);
			var custom = t.attrd('custom');

			if (custom === '1')
				return;

			t.tclass('dg-checked');

			if (custom === '2')
				return;

			var val = t.attrd('value');
			var checked = t.hclass('dg-checked');

			if (val === '-1') {
				if (checked) {
					opt.checked = {};
					for (var i = 0; i < opt.rows.length; i++)
						opt.checked[opt.rows[i].ROW] = 1;
				} else
					opt.checked = {};
				self.scrolling();
			} else if (checked)
				opt.checked[val] = 1;
			else
				delete opt.checked[val];

			self.fn_in_checked();
		});

		self.event('click', '.dg-columns-checkbox', function() {
			$(this).tclass('dg-columns-checkbox-checked');
		});

		self.event('click', 'button', function(e) {
			switch (this.name) {
				case 'columns-apply':
					self.applycolumns(true);
					break;
				case 'page-first':
					forcescroll = opt.scroll = 'y';
					self.get().page = 1;
					self.operation('page');
					break;
				case 'page-last':
					forcescroll = opt.scroll = 'y';
					var tmp = self.get();
					tmp.page = tmp.pages;
					self.operation('page');
					break;
				case 'page-prev':
					forcescroll = opt.scroll = 'y';
					self.get().page -= 1;
					self.operation('page');
					break;
				case 'page-next':
					forcescroll = opt.scroll = 'y';
					self.get().page += 1;
					self.operation('page');
					break;
				default:
					var el = $(this);
					var index = +el.closest('.dg-row,.dg-controls').attrd('index');
					var row = opt.rows[index];
					config.button && self.SEEX(config.button, this.name, row, el, e);
					break;
			}
		});

		self.scrollbarX.area.on('scroll', function() {
			!ishidedir && hidedir();
			isecolumns && self.applycolumns();
		});

		// config.exec && self.operation('init');
	};

	self.operation = function(type) {

		var value = self.get();

		if (value == null)
			value = {};

		if (type === 'filter' || type === 'init')
			value.page = 1;

		var keys = Object.keys(opt.filter);
		self.SEEX(config.exec, type, keys.length ? opt.filter : null, opt.sort && opt.sort.sort ? [(opt.sort.name + '_' + (opt.sort.sort === 1 ? 'asc' : 'desc'))] : null, value.page, self);

		switch (type) {
			case 'sort':
				self.redrawsorting();
				break;
		}
	};

	function align(type) {
		return type === 1 ? 'center' : type === 2 ? 'right' : type;
	}

	self.clear = function() {
		for (var i = 0; i < opt.rows.length; i++)
			opt.rows[i].CHANGES = undefined;
		self.renderrows(opt.rows, true);
		opt.cluster && opt.cluster.update(opt.render);
		self.fn_in_changed();
	};

	self.editcolumn = function(rindex, cindex) {

		var col;
		var row;

		if (cindex == null) {
			if (rindex instanceof jQuery) {
				cindex = rindex.attr('class').match(/\d+/);
				if (cindex)
					cindex = +cindex[0];
				else
					return;
				col = rindex;
			}
		} else
			row = opt.cluster.el.find('.dg-row-' + (rindex + 1));

		if (!col)
			col = row.find('.dg-col-' + cindex);

		var index = cindex;
		if (index == null)
			return;

		if (!row)
			row = col.closest('.dg-row');

		var data = {};
		data.col = opt.cols[index];
		if (!data.col.editable)
			return;

		data.rowindex = +row.attrd('index');
		data.row = opt.rows[data.rowindex];
		data.colindex = index;
		data.value = data.row[data.col.name];
		data.elrow = row;
		data.elcol = col;

		var clone = col.clone();
		var cb = function(data) {

			if (data == null) {
				col.replaceWith(clone);
				return;
			}

			data.row[data.col.name] = data.value;

			if (opt.rows[data.rowindex] != data.row)
				opt.rows[data.rowindex] = data.row;

			if (!data.row.CHANGES)
				data.row.CHANGES = {};

			data.row.CHANGES[data.col.name] = true;
			opt.render[data.rowindex] = $(self.renderrow(data.rowindex, data.row))[0];
			data.elrow.replaceWith(opt.render[data.rowindex]);
			self.fn_in_changed();

		};

		if (config.change)
			self.EXEC(config.change, data, cb, self);
		else
			self.datagrid_edit(data, cb);
	};

	self.applyfilter = function(obj, add) {


		if (!ready) {
			setTimeout(self.applyfilter, 100, obj, add);
			return;
		}

		if (!add)
			opt.filter = {};

		var keys = Object.keys(obj);

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var col = opt.cols.findItem('name', key);
			if (col.options) {
				var items = col.options instanceof Array ? col.options : GET(self.makepath(col.options));
				if (items instanceof Array) {
					var item = items.findItem(col.ovalue, obj[key]);
					if (item) {
						var el = header.find('.dg-hcol[data-index="{0}"] label'.format(col.index));
						if (el.length)
							self.applyfilterdirectory(el, col, item);
					}
				}
			}
		}

		header.find('input').each(function() {
			var t = this;
			var el = $(t);
			var val = obj[el.attrd('name')];
			if (val !== undefined)
				el.val(val == null ? '' : val);
		}).trigger('change');

	};

	self.rebind = function(code, prerender) {

		if (code.length < 30 && code.indexOf(' ') === -1) {
			schemas.$current = code;
			schemas[code] && self.rebind(schemas[code]);
			return;
		}

		opt.declaration = code;

		var type = typeof(code);
		if (type === 'string') {
			code = code.trim();
			self.gridid = 'dg' + HASH(code);
		} else
			self.gridid = 'dg' + HASH(JSON.stringify(code));

		var cache = config.remember ? W.PREF ? W.PREF.get(self.gridid) : CACHE(self.gridid) : null;
		var cols = type === 'string' ? new Function('return ' + code)() : CLONE(code);
		var tmp;

		opt.rowclasstemplate = null;
		opt.search = false;

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			if (typeof(col) === 'string') {
				opt.rowclasstemplate = Tangular.compile(col);
				cols.splice(i, 1);
				i--;
				continue;
			}

			if (col.type === 'controls' || col.type === 'buttons') {
				opt.controls = col.template ? Tangular.compile(col.template) : null;
				cols.splice(i, 1);
				i--;
				continue;
			}

			col.id = GUID(5);
			col.realindex = i;

			if (!col.name)
				col.name = col.id;

			if (col.listcolumn == null)
				col.listcolumn = true;

			if (col.hidden) {
				col.$hidden = FN(col.hidden)(col) === true;
				col.hidden = true;
			}

			if (col.hide) {
				col.hidden = col.hide === true;
				delete col.hide;
			}

			if (col.options) {
				!col.otext && (col.otext = 'text');
				!col.ovalue && (col.ovalue = 'value');
			}

			// SORT?
			if (col.sort != null)
				col.sorting = col.sort;

			if (cache) {
				var c = cache[i];
				if (c) {
					col.index = c.index;
					col.width = c.width;
					col.hidden = c.hidden;
				}
			}

			if (col.index == null)
				col.index = i;

			if (col.sorting == null)
				col.sorting = config.sorting;

			if (col.alignfilter != null)
				col.alignfilter = ' ' + align(col.alignfilter);

			if (col.alignheader != null)
				col.alignheader = ' ' + align(col.alignheader);

			col.sort = 0;

			if (col.search) {
				opt.search = true;
				col.search = col.search === true ? Tangular.compile(col.template) : Tangular.compile(col.search);
			}

			if (!col.align) {
				switch (col.type) {
					case 'date':
						col.align = 1;
						break;
					case 'number':
						col.align = 2;
						break;
					case 'boolean':
						col.align = 1;
						break;
				}
			}

			if (col.align && col.align !== 'left') {
				col.align = align(col.align);
				col.align = ' ' + col.align;
				if (!col.alignfilter)
					col.alignfilter = ' center';
				if (!col.alignheader)
					col.alignheader = ' center';
			}

			var cls = col.class ? (' ' + col.class) : '';

			if (col.editable) {
				cls += ' dg-editable';
				if (col.required)
					cls += ' dg-required';
			}

			if (config.autoformat) {
				switch (col.type) {
					case 'number':
						if (col.monospace == null)
							col.monospace = true;
						break;
				}
			}

			var isbool = col.type && col.type.substring(0, 4) === 'bool';
			var TC = Tangular.compile;

			if (col.template) {
				col.templatecustom = true;
				col.template = TC((col.template.indexOf('<button') === -1 ? ('<div class="dg-value' + (col.monospace ? ' dg-monospace' : '') + cls + '">{0}</div>') : '{0}').format(col.template));
			} else
				col.template = TC(('<div class="' + (isbool ? 'dg-bool' : ('dg-value' + (col.monospace ? ' dg-monospace' : ''))) + cls + '"' + (config.allowtitles ? ' title="{{ {0} }}"' : '') + '>{{ {0} }}</div>').format(col.name + (col.currency ? ' | currency(\'{0}\')'.format(col.currency) : col.format != null ? ' | format({0})'.format(col.format && typeof(col.format) === 'string' ? ('\'' + col.format + '\'') : col.format) : '') + (col.type && config.autoformat ? ' | ui_datagrid_autoformat(\'{0}\')'.format(col.type) : '') + (col.empty ? ' | def({0})'.format(col.empty === true || col.empty == '1' ? '' : ('\'' + col.empty + '\'')) : '') + (isbool ? ' | ui_datagrid_checkbox' : '') + (col.colorize ? (' | ui_datagrid_colorize(' + (col.currency || col.format ? 0 : 1) + ')') : '')));

			if (col.header)
				col.header = TC(col.header);
			else
				col.header = TC('{{ text | raw }}');

			if (!col.text)
				col.text = col.name;

			if (col.text.substring(0, 1) === '.')
				col.text = '<i class="{0}"></i>'.format(col.text.substring(1));

			if (col.filter !== false && !col.filter)
				col.filter = config.filterlabel;

			if (col.filtervalue != null) {
				tmp = col.filtervalue;
				if (typeof(tmp) === 'function')
					tmp = tmp(col);
				opt.filter[col.name] = opt.filtervalues[col.id] = tmp;
			}
		}

		cols.quicksort('index');
		opt.cols = cols;
		self.rebindcss();
		prerender && self.rendercols();
		controls.hide();

		// self.scrollbar.scroll(0, 0);
	};

	self.rebindcss = function() {

		var cols = opt.cols;
		var css = [];
		var indexes = {};

		opt.width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		for (var i = 0; i < cols.length; i++) {
			var col = cols[i];

			if (!col.width)
				col.width = config.colwidth;

			css.push('.dg-{2} .dg-col-{0}{width:{1}px}'.format(i, col.width, self.IDCSS));

			if (!col.hidden) {
				opt.width += col.width;
				indexes[i] = opt.width;
			}
		}

		CSS(css, self.ID);

		var w = self.width();
		if (w > opt.width)
			opt.width = w - 2;

		if (sheader) {
			css = { width: opt.width };
			header.css(css);
			// vbody.css(css);
		}

		header && header.find('.dg-resize').each(function() {
			var el = $(this);
			el.css('left', indexes[el.attrd('index')] - 39);
		});
	};

	self.cols = function(callback) {
		callback(opt.cols);
		opt.cols.quicksort('index');
		self.rebindcss();
		self.rendercols();
		opt.rows && self.renderrows(opt.rows);
		self.save();
		opt.cluster && opt.cluster.update(opt.render);
		self.resize();
	};

	self.rendercols = function() {

		var Trow = '<div class="dg-hrow dg-row-{0}">{1}</div>';
		var column = config.numbering !== false ? Theadercol({ index: -1, label: config.numbering, filter: false, name: '$', sorting: false }) : '';
		var resize = [];

		opt.width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + 30;

		if (config.checkbox)
			column += Theadercol({ index: -1, label: '<div class="dg-checkbox dg-checkbox-main" data-value="-1"><i class="fa fa-check"></i></div>', filter: false, name: '$', sorting: false });

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			if (!col.hidden) {
				var filteritems = col.options ? col.options instanceof Array ? col.options : GET(self.makepath(col.options)) : null;
				var filtervalue = opt.filtervalues[col.id];
				var obj = { index: i, ts: NOW.getTime(), label: col.header(col), filter: col.filter, reorder: config.reorder, sorting: col.sorting, name: col.name, alignfilter: col.alignfilter, alignheader: col.alignheader, filterval: filtervalue == null ? null : filteritems ? filteritems.findValue(col.ovalue, filtervalue, col.otext, '???') : filtervalue, labeltitle: col.title || col.text, options: filteritems };
				opt.width += col.width;
				config.resize && resize.push('<span class="dg-resize" style="left:{0}px" data-index="{1}"></span>'.format(opt.width - 39, i));
				column += Theadercol(obj);
			}
		}

		column += '<div class="dg-hcol"></div>';
		header[0].innerHTML = resize.join('') + Trow.format(0, column);

		var w = self.width();
		if (w > opt.width)
			opt.width = w;

		self.redrawsorting();
	};

	self.redraw = function(update) {
		var x = self.scrollbarX.scrollLeft();
		var y = self.scrollbarY ? self.scrollbarY.scrollTop() : 0;
		isredraw = update ? 2 : 1;
		self.refreshfilter();
		isredraw = 0;
		self.scrollbarX.scrollLeft(x);
		self.scrollbarY && self.scrollbarY.scrollTop(y);
	};

	self.redrawrow = function(oldrow, newrow) {
		var index = opt.rows.indexOf(oldrow);
		if (index !== -1) {

			controls.cache = {};

			// Replaces old row with a new
			if (newrow) {
				if (self.selected === oldrow)
					self.selected = newrow;
				oldrow = opt.rows[index] = newrow;
			}

			var el = vbody.find('.dg-row[data-index="{0}"]'.format(index));
			if (el.length) {
				opt.render[index] = $(self.renderrow(index, oldrow))[0];
				el[0].parentNode.replaceChild(opt.render[index], el[0]);
			}
		}
	};

	self.appendrow = function(row, scroll, prepend) {

		var index = prepend ? 0 : (opt.rows.push(row) - 1);
		var model = self.get();

		controls.cache = {};

		if (model == null) {
			// bad
			return;
		} else {
			var arr = model.items ? model.items : model;
			if (prepend) {
				arr.unshift(row);
			} else if (model.items)
				arr.push(row);
			else
				arr.push(row);
		}

		if (prepend) {
			var tmp;
			// modifies all indexes
			for (var i = 0; i < opt.render.length; i++) {
				var node = opt.render[i];
				if (typeof(node) === 'string')
					node = opt.render[i] = $(node)[0];
				var el = $(node);
				var tmpindex = i + 1;
				tmp = el.rclass2('dg-row-').aclass('dg-row-' + tmpindex).attrd('index', tmpindex);
				tmp.find('.dg-number').html(tmpindex + 1);
				tmp.find('.dg-checkbox-main').attrd('value', tmpindex);
				if (opt.rows[i])
					opt.rows[i].ROW = tmpindex;
			}
			row.ROW = index;
			tmp = {};
			var keys = Object.keys(opt.checked);
			for (var i = 0; i < keys.length; i++)
				tmp[(+keys[i]) + 1] = 1;
			opt.checked = tmp;
			opt.render.unshift(null);
		}

		opt.render[index] = $(self.renderrow(index, row))[0];
		opt.cluster && opt.cluster.update(opt.render, !opt.scroll || opt.scroll === '-');
		if (scroll) {
			var el = opt.cluster.el[0];
			el.scrollTop = el.scrollHeight;
		}
		self.scrolling();
	};

	self.renderrow = function(index, row, plus) {

		if (plus === undefined && config.exec) {
			// pagination
			var val = self.get();
			plus = (val.page - 1) * val.limit;
		}

		var Trow = '<div><div class="dg-row dg-row-{0}{3}{4}" data-index="{2}">{1}</div></div>';
		var Tcol = '<div class="dg-col dg-col-{0}{2}{3}">{1}</div>';
		var column = '';

		if (config.numbering !== false)
			column += Tcol.format(-1, '<div class="dg-number">{0}</div>'.format(index + 1 + (plus || 0)));

		if (config.checkbox)
			column += Tcol.format(-1, '<div class="dg-checkbox-main dg-checkbox{1}" data-value="{0}"><i class="fa fa-check"></i></div>'.format(row.ROW, opt.checked[row.ROW] ? ' dg-checked' : ''));

		for (var j = 0; j < opt.cols.length; j++) {
			var col = opt.cols[j];
			if (!col.hidden)
				column += Tcol.format(j, col.template(row), col.align, row.CHANGES && row.CHANGES[col.name] ? ' dg-col-changed' : '');
		}

		column += '<div class="dg-col">&nbsp;</div>';
		var rowcustomclass = opt.rowclasstemplate ? opt.rowclasstemplate(row) : '';
		return Trow.format(index + 1, column, index, self.selected === row ? ' dg-selected' : '', (row.CHANGES ? ' dg-row-changed' : '') + (rowcustomclass || ''));
	};

	self.renderrows = function(rows, noscroll) {

		opt.rows = rows;
		controls.cache = {};

		var output = [];
		var plus = 0;

		if (config.exec) {
			// pagination
			var val = self.get();
			plus = (val.page - 1) * val.limit;
		}

		var is = false;

		for (var i = 0, length = rows.length; i < length; i++) {
			var row = rows[i];
			if (!is && self.selected) {
				if (self.selected === row) {
					is = true;
				} else if (config.clickid && self.selected[config.clickid] === row[config.clickid]) {
					self.selected = row;
					is = true;
				}
			}

			output.push(self.renderrow(i, rows[i], plus));
		}

		var min = ((((opt.height || config.minheight) - 120) / config.rowheight) >> 0) + 1;
		var is = output.length < min;
		if (is) {
			for (var i = output.length; i < min + 1; i++)
				output.push('<div class="dg-row-empty">&nbsp;</div>');
		}

		self.tclass('dg-noscroll', is);

		if (noscroll) {
			self.scrollbarX.scrollLeft(0);
			self.scrollbarY && self.scrollbarY.scrollTop(0);
		}

		opt.render = output;
		self.onrenderrows && self.onrenderrows(opt);
	};

	self.exportrows = function(page_from, pages_count, callback, reset_page_to, sleep) {

		var arr = [];
		var source = self.get();

		if (reset_page_to === true)
			reset_page_to = source.page;

		if (page_from === true)
			reset_page_to = source.page;

		pages_count = page_from + pages_count;

		if (pages_count > source.pages)
			pages_count = source.pages;

		for (var i = page_from; i < pages_count; i++)
			arr.push(i);

		!arr.length && arr.push(page_from);

		var index = 0;
		var rows = [];

		arr.wait(function(page, next) {
			opt.scroll = (index++) === 0 ? 'xy' : '';
			self.get().page = page;
			self.operation('page');
			self.onrenderrows = function(opt) {
				rows.push.apply(rows, opt.rows);
				setTimeout(next, sleep || 100);
			};
		}, function() {
			self.onrenderrows = null;
			callback(rows, opt);
			if (reset_page_to > 0) {
				self.get().page = reset_page_to;
				self.operation('page');
			}
		});
	};

	self.reordercolumn = function(index, position) {

		var col = opt.cols[index];
		if (!col)
			return;

		var old = col.index;

		opt.cols[index].index = position + (old < position ? 0.2 : -0.2);
		opt.cols.quicksort('index');

		for (var i = 0; i < opt.cols.length; i++) {
			col = opt.cols[i];
			col.index = i;
		}

		opt.cols.quicksort('index');

		self.rebindcss();
		self.rendercols();
		self.renderrows(opt.rows);
		opt.sort && opt.sort.sort && self.redrawsorting();
		opt.cluster && opt.cluster.update(opt.render, true);
		self.scrolling();

		controls.hide();
		config.remember && self.save();
	};

	self.resizecolumn = function(index, size) {
		opt.cols[index].width = size;
		self.rebindcss();
		config.remember && self.save();
		self.resize();
	};

	self.save = function() {

		var cache = {};

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			col.index = i;
			cache[col.realindex] = { index: col.index, width: col.width, hidden: col.hidden };
		}

		if (W.PREF)
			W.PREF.set(self.gridid, cache, '1 month');
		else
			CACHE(self.gridid, cache, '1 month');
	};

	self.rows = function() {
		return opt.rows.slice(0);
	};

	var resizecache = {};

	self.resize = function() {
		setTimeout2(self.ID + 'resize', self.resizeforce, 100);
	};

	self.resizeforce = function() {

		if (!opt.cols || HIDDEN(self.dom))
			return;

		var el;
		var footerh = opt.footer = footer.length ? footer.height() : 0;

		if (typeof(config.height) === 'string' && config.height.substring(0, 6) === 'parent') {

			el = self.element.parent();

			var count = +config.height.substring(6);
			if (count) {
				for (var i = 0; i < count; i++)
					el = el.parent();
			}

			opt.height = (el.height() - config.margin);

		} else {
			switch (config.height) {
				case 'auto':
					var wh = config.parent ? self.parent(config.parent).height() : WH;
					el = self.element;
					opt.height = (wh - (el.offset().top + config.margin));
					break;
				case 'window':
					opt.height = WH - config.margin;
					break;
				case 'fluid':
					opt.height = (opt.rows ? opt.rows.length : 0) * config.rowheight;
					break;
				default:

					if (config.height > 0) {
						opt.height = config.height;
					} else {
						el = self.element.closest(config.height);
						opt.height = ((el.length ? el.height() : 200) - config.margin);
					}
					break;
			}
		}

		var mr = (vbody.parent().css('margin-right') || '').parseInt();
		var h = opt.height - footerh;
		var sh = SCROLLBARWIDTH();
		controls.hide();

		if (config.height === 'fluid') {
			var mh = config.minheight;
			if (h < mh)
				h = mh;
		} else if (config.height === 'auto') {
			var mh = config.minheight;
			if (h < mh)
				h = mh;
		}

		var ismobile = isMOBILE && isTOUCH;

		if (resizecache.mobile !== ismobile && !config.noborder) {
			resizecache.mobile = ismobile;
			self.tclass('dg-mobile', ismobile);
		}

		if (resizecache.h !== h) {
			resizecache.h = h;
			sheader.css('height', h);
		}

		var tmpsh = h - (sh ? (sh + self.scrollbarX.thinknessX - 2) : (footerh - 2));
		resizecache.tmpsh = h;
		sbody.css('height', tmpsh + self.scrollbarX.marginY + (config.exec && self.scrollbarX.size.empty ? footerh : 0));

		var w;

		if (config.fullwidth_xs && WIDTH() === 'xs' && isMOBILE) {
			var isfrm = false;
			try {
				isfrm = W.self !== W.top;
			} catch (e) {
				isfrm = true;
			}
			if (isfrm) {
				w = screen.width - (self.element.offset().left * 2);
				if (resizecache.wmd !== w) {
					resizecache.wmd = w;
					self.css('width', w);
				}
			}
		}

		if (w == null)
			w = self.width();

		var emptyspace = 50 - mr;
		if (emptyspace < 50)
			emptyspace = 50;

		var width = (config.numbering !== false ? 40 : 0) + (config.checkbox ? 40 : 0) + emptyspace;

		for (var i = 0; i < opt.cols.length; i++) {
			var col = opt.cols[i];
			if (!col.hidden)
				width += col.width + 1;
		}

		if (w > width)
			width = w - 2;

		if (resizecache.hc !== h) {
			resizecache.hc = h;
			container.css('height', h);
		}

		if (resizecache.width !== width) {
			resizecache.width = width;
			header.css('width', width);
			vbody.css('width', width);
			sbody.css('width', width);
			opt.width2 = w;
		}

		opt.height = h + footerh;
		self.scrollbarX.resize();
		self.scrollbarY && self.scrollbarY.resize();

		ready = true;
		// header.parent().css('width', self.scrollbar.area.width());
	};

	self.refreshfilter = function(useraction) {

		// Get data
		var obj = self.get() || EMPTYARRAY;
		var items = (obj instanceof Array ? obj : obj.items) || EMPTYARRAY;
		var output = [];

		if (isredraw) {
			if (isredraw === 2) {
				self.fn_in_checked();
				self.fn_in_changed();
			}
		} else {
			opt.checked = {};
			config.checkbox && header.find('.dg-checkbox-main').rclass('dg-checked');
			self.fn_in_checked(EMPTYARRAY);
		}

		for (var i = 0, length = items.length; i < length; i++) {
			var item = items[i];

			item.ROW = i;

			if (!config.exec) {
				if (opt.filter && !self.filter(item))
					continue;
				if (opt.search) {
					for (var j = 0; j < opt.cols.length; j++) {
						var col = opt.cols[j];
						if (col.search)
							item['$' + col.name] = col.search(item);
					}
				}
			}

			output.push(item);
		}

		if (!isredraw) {

			if (opt.scroll) {

				if (self.scrollbarY && (/y/).test(opt.scroll))
					self.scrollbarY.scrollTop(0);

				if ((/x/).test(opt.scroll)) {
					if (useraction)	{
						var sl = self.scrollbarX.scrollLeft();
						self.scrollbarX.scrollLeft(sl ? sl - 1 : 0);
					} else
						self.scrollbarX.scrollLeft(0);
				}

				opt.scroll = '';
			}

			if (opt.sort != null) {
				if (!config.exec)
					opt.sort.sort && output.quicksort(opt.sort.name, opt.sort.sort === 1);
				self.redrawsorting();
			}
		}

		self.resize();
		self.renderrows(output, isredraw);

		setTimeout(self.resize, 100);
		opt.cluster && opt.cluster.update(opt.render, !opt.scroll || opt.scroll === '-');
		self.scrolling();

		if (isredraw) {
			if (isredraw === 2) {
				// re-update all items
				self.select(self.selected || null);
			}
		} else {
			var sel = self.selected;
			if (config.autoselect && output && output.length) {
				setTimeout(function() {
					var index = sel ? output.indexOf(sel) : 0;
					if (index === -1)
						index = 0;
					self.select(output[index]);
				}, 1);
			} else {
				var index = sel ? output.indexOf(sel) : -1;
				self.select(index === -1 ? null : output[index]);
			}
		}
	};

	self.redrawsorting = function() {
		var arr = self.find('.dg-sorting');
		for(var i = 0; i < arr.length; i++) {
			var el = $(arr[i]);
			var col = opt.cols[+el.attrd('index')];
			if (col) {
				var fa = el.find('.dg-sort').rclass2('fa-');
				switch (col.sort) {
					case 1:
						fa.aclass('fa-arrow-up');
						break;
					case 2:
						fa.aclass('fa-arrow-down');
						break;
					default:
						fa.aclass('fa-sort');
						break;
				}
			}
		}
		controls.hide();
	};

	self.resetcolumns = function() {

		if (W.PREF)
			W.PREF.set(self.gridid);
		else
			CACHE(self.gridid, null, '-1 day');

		self.rebind(opt.declaration);
		self.cols(NOOP);
		ecolumns.aclass('hidden');
		isecolumns = false;
		controls.hide();
	};

	self.resetfilter = function() {
		opt.filter = {};
		opt.filtercache = {};
		opt.filtercl = {};
		opt.filtervalues = {};
		opt.cols && self.rendercols();
		if (config.exec)
			self.operation('refresh');
		else
			self.refresh();
		controls.hide();
	};

	var pagecache = { pages: -1, count: -1 };

	self.redrawpagination = function() {

		if (!config.exec)
			return;

		var value = self.get();

		if (!value.page)
			value.page = 1;

		if (value.pages == null)
			value.pages = 0;

		if (value.count == null)
			value.count = 0;

		var is = false;

		if (value.page === 1 || (value.pages != null && value.count != null)) {
			pagecache.pages = value.pages;
			pagecache.count = value.count;
			is = true;
		}

		footer.find('button').each(function() {

			var el = $(this);
			var dis = true;

			switch (this.name) {
				case 'page-next':
					dis = value.page >= pagecache.pages;
					break;
				case 'page-prev':
					dis = value.page === 1;
					break;
				case 'page-last':
					dis = !value.page || value.page >= pagecache.pages;
					break;
				case 'page-first':
					dis = value.page === 1;
					break;
			}

			el.prop('disabled', dis);
		});

		footer.find('input')[0].value = value.page;

		if (is) {
			var num = pagecache.pages || 0;
			footer.find('.dg-pagination-pages')[0].innerHTML = num.pluralize.apply(num, config.pluralizepages);
			num = pagecache.count || 0;
			footer.find('.dg-pagination-items')[0].innerHTML = num.pluralize.apply(num, config.pluralizeitems);
		}

		footer.rclass('hidden');
	};

	self.setter = function(value, path, type) {

		if (!ready) {
			setTimeout(self.setter, 100, value, path, type);
			return;
		}

		controls.hide();

		if (config.exec && (value == null || value.items == null)) {
			self.operation('refresh');
			if (value && value.items == null)
				value.items = [];
			else
				return;
		}

		if (value && value.schema && schemas.$current !== value.schema) {
			schemas.$current = value.schema;
			self.selected = null;
			self.rebind(schemas[value.schema], true);
			setTimeout(function() {
				self.setter(value, path, type);
			}, 100);
			return;
		}

		if (!opt.cols)
			return;

		opt.checked = {};

		if (forcescroll) {
			opt.scroll = forcescroll;
			forcescroll = '';
		} else
			opt.scroll = type !== 'noscroll' ? 'xy' : '';

		self.applycolumns();
		self.refreshfilter();
		self.redrawsorting();
		self.redrawpagination();
		self.fn_in_changed();
		!config.exec && self.rendercols();
		setTimeout2(self.ID + 'resize', self.resize, 100);

		if (opt.cluster)
			return;

		config.exec && self.rendercols();
		opt.cluster = new Cluster(vbody);
		opt.cluster.grid = self;
		opt.cluster.scroll = self.scrolling;
		opt.render && opt.cluster.update(opt.render);
		self.aclass('dg-visible');
	};

	self.scrolling = function() {
		config.checkbox && setTimeout2(self.ID, function() {
			vbody.find('.dg-checkbox-main').each(function() {
				$(this).tclass('dg-checked', opt.checked[this.getAttribute('data-value')] == 1);
			});
		}, 80, 10);
	};

	var REG_STRING = /\/\|\\|,/;
	var REG_DATE1 = /\s-\s/;
	var REG_DATE2 = /\/|\||\\|,/;
	var REG_SPACE = /\s/g;

	self.filter = function(row) {
		var keys = Object.keys(opt.filter);
		for (var i = 0; i < keys.length; i++) {

			var column = keys[i];
			var filter = opt.filter[column];
			var val2 = opt.filtercache[column];
			var val = row['$' + column] || row[column];
			var type = typeof(val);

			if (val instanceof Array) {
				val = val.join(' ');
				type = 'string';
			} else if (val && type === 'object' && !(val instanceof Date)) {
				val = JSON.stringify(val);
				type = 'string';
			}

			if (type === 'number') {

				if (val2 == null)
					val2 = opt.filtercache[column] = self.parseNumber(filter);

				if (val2.length === 1 && val !== val2[0])
					return false;

				if (val < val2[0] || val > val2[1])
					return false;

			} else if (type === 'string') {

				var is = false;

				if (opt.filtercl[column] != null) {
					is = opt.filtercl[column] == val;
					if (!is)
						return false;
				}

				if (val2 == null) {
					val2 = opt.filtercache[column] = filter.split(REG_STRING).trim();
					for (var j = 0; j < val2.length; j++)
						val2[j] = val2[j].toSearch();
				}

				var s = val.toSearch();

				for (var j = 0; j < val2.length; j++) {
					if (s.indexOf(val2[j]) !== -1) {
						is = true;
						break;
					}
				}

				if (!is)
					return false;

			} else if (type === 'boolean') {
				if (val2 == null)
					val2 = opt.filtercache[column] = typeof(filter) === 'string' ? config.boolean.indexOf(filter.replace(REG_SPACE, '')) !== -1 : filter;
				if (val2 !== val)
					return false;
			} else if (val instanceof Date) {

				val.setHours(0);
				val.setMinutes(0);

				if (val2 == null) {

					val2 = filter.trim().replace(REG_DATE1, '/').split(REG_DATE2).trim();
					var arr = opt.filtercache[column] = [];

					for (var j = 0; j < val2.length; j++) {
						var dt = val2[j].trim();
						var a = self.parseDate(dt, j === 1);
						if (a instanceof Array) {
							if (val2.length === 2) {
								arr.push(j ? a[1] : a[0]);
							} else {
								arr.push(a[0]);
								if (j === val2.length - 1) {
									arr.push(a[1]);
									break;
								}
							}
						} else
							arr.push(a);
					}

					if (val2.length === 2 && arr.length === 2) {
						arr[1].setHours(23);
						arr[1].setMinutes(59);
						arr[1].setSeconds(59);
					}

					val2 = arr;
				}

				if (val2.length === 1) {
					if (val2[0].YYYYMM)
						return val.format('yyyyMM') === val2[0].format('yyyyMM');
					if (val.format('yyyyMMdd') !== val2[0].format('yyyyMMdd'))
						return false;
				}

				if (val < val2[0] || val > val2[1])
					return false;

			} else
				return false;
		}

		return true;
	};

	self.checked = function() {
		var arr = Object.keys(opt.checked);
		var output = [];
		var model = self.get() || EMPTYARRAY;
		var rows = model instanceof Array ? model : model.items;
		for (var i = 0; i < arr.length; i++) {
			var index = +arr[i];
			output.push(rows[index]);
		}
		return output;
	};

	self.readfilter = function() {
		return opt.filter;
	};

	self.changed = function() {
		var output = [];
		var model = self.get() || EMPTYARRAY;
		var rows = model instanceof Array ? model : model.items;
		for (var i = 0; i < rows.length; i++)
			rows[i].CHANGES && output.push(rows[i]);
		return output;
	};

	self.parseDate = function(val, second) {

		var index = val.indexOf('.');
		var m, y, d, a, special, tmp;

		if (index === -1) {
			if ((/[a-z]+/).test(val)) {
				var dt;
				try {
					dt = NOW.add(val);
				} catch (e) {
					return [0, 0];
				}
				return dt > NOW ? [NOW, dt] : [dt, NOW];
			}
			if (val.length === 4)
				return [new Date(+val, 0, 1), new Date(+val + 1, 0, 1)];
		} else if (val.indexOf('.', index + 1) === -1) {
			a = val.split('.');
			if (a[1].length === 4) {
				y = +a[1];
				m = +a[0] - 1;
				d = second ? new Date(y, m, 0).getDate() : 1;
				special = true;
			} else {
				y = NOW.getFullYear();
				m = +a[1] - 1;
				d = +a[0];
			}

			tmp = new Date(y, m, d);
			if (special)
				tmp.YYYYMM = true;
			return tmp;
		}
		index = val.indexOf('-');
		if (index !== -1 && val.indexOf('-', index + 1) === -1) {
			a = val.split('-');
			if (a[0].length === 4) {
				y = +a[0];
				m = +a[1] - 1;
				d = second ? new Date(y, m, 0).getDate() : 1;
				special = true;
			} else {
				y = NOW.getFullYear();
				m = +a[0] - 1;
				d = +a[1];
			}

			tmp = new Date(y, m, d);

			if (special)
				tmp.YYYYMM = true;

			return tmp;
		}

		return val.parseDate();
	};

	var REG_NUM1 = /\s-\s/;
	var REG_COMMA = /,/g;
	var REG_NUM2 = /\/|\|\s-\s|\\/;

	self.parseNumber = function(val) {
		var arr = [];
		var num = val.replace(REG_NUM1, '/').replace(REG_SPACE, '').replace(REG_COMMA, '.').split(REG_NUM2).trim();
		for (var i = 0, length = num.length; i < length; i++) {
			var n = num[i];
			arr.push(+n);
		}
		return arr;
	};

	self.datagrid_cancel = function(meta, force) {
		var current = self.editable;
		if (current && current.is) {
			current.is = false;
			force && current.el.replaceWith(current.backup);
			current.input && current.input.off();
			$(W).off('keydown', current.fn).off('click', current.fn);
		}
	};

	self.datagrid_edit = function(meta, next) {

		if (!meta || !meta.col.editable)
			return;

		if (!self.editable)
			self.editable = {};

		var el = meta.elcol;
		var current = self.editable;
		current.is && self.datagrid_cancel(meta, true);
		current.is = true;

		current.backup = el.find('.dg-editable').aclass('dg-editable').clone();
		el = el.find('.dg-editable');

		if (!meta.col.type) {
			if (meta.value instanceof Date)
				meta.col.type = 'date';
			else
				meta.col.type = typeof(meta.value);
		}

		if (meta.col.options) {
			current.el = el;
			var opt = {};
			opt.element = el;
			opt.items = meta.col.options;

			if (typeof(opt.items) === 'string')
				opt.items = self.makepath(opt.items);

			opt.key = meta.col.otext;
			opt.placeholder = meta.col.dirsearch ? meta.col.dirsearch : '';
			if (meta.col.dirsearch === false)
				opt.search = false;
			opt.callback = function(item) {
				current.is = false;
				meta.value = item[meta.col.ovalue];
				next(meta);
				self.datagrid_cancel(meta);
			};
			SETTER('directory', 'show', opt);
			return;
		}

		var align = meta.col.align;
		el.rclass('dg-value').html(meta.col.type.substring(0, 4) === 'bool' ? '<div{1}><div class="dg-checkbox{0}" data-custom="2"><i class="fa fa-check"></i></div></div>'.format(meta.value ? ' dg-checked' : '', align ? (' class="' + align.trim() + '"') : '') : '<input type="{0}" maxlength="{1}"{2} />'.format(meta.col.ispassword ? 'password' : 'text', meta.col.maxlength || 100, align ? (' class="' + align.trim() + '"') : ''));
		current.el = el;

		var input = meta.elcol.find('input');
		input.val(meta.value instanceof Date ? meta.value.format(meta.col.format) : meta.value);
		input.focus();
		current.input = input;

		if (meta.col.type === 'date') {
			// DATE
			var opt = {};
			opt.element = el;
			opt.value = meta.value;
			opt.callback = function(date) {
				current.is = false;
				meta.value = date;
				next(meta);
				self.datagrid_cancel(meta);
			};
			SETTER('datepicker', 'show', opt);
		}

		current.fn = function(e) {

			if (!current.is)
				return;

			if (e.type === 'click') {
				if (e.target.tagName === 'INPUT')
					return;
				e.preventDefault();
				e.keyCode = 13;
				if (meta.col.type === 'date') {
					e.type = 'keydown';
					setTimeout(current.fn, 800, e);
					return;
				} else if (meta.col.type.substring(0, 4) === 'bool') {
					var tmp = $(e.target);
					var is = tmp.hclass('dg-checkbox');
					if (!is) {
						tmp = tmp.closest('.dg-checkbox');
						is = tmp.length;
					}
					if (is) {
						meta.value = tmp.hclass('dg-checked');
						next(meta);
						self.datagrid_cancel(meta);
						return;
					}
				}
			}

			switch (e.keyCode) {
				case 13: // ENTER
				case 9: // TAB

					var val = input.val();
					if (val == meta.value) {
						next = null;
						self.datagrid_cancel(meta, true);
					} else {

						if (meta.col.type === 'number') {
							val = val.parseFloat();
							if (val == meta.value || (meta.min != null && meta.min > val) || (meta.max != null && meta.max < val)) {
								next = null;
								self.datagrid_cancel(meta, true);
								return;
							}
						} else if (meta.col.type === 'date') {

							val = val.parseDate(meta.format ? meta.format.env() : undefined);

							if (!val || isNaN(val.getTime()))
								val = null;

							if (val && meta.value && val.getTime() === meta.value.getTime()) {
								next = null;
								self.datagrid_cancel(meta, true);
								return;
							}
						}

						if (meta.col.required && (val == null || val === '')) {
							// WRONG VALUE
							self.datagrid_cancel(meta, true);
							return;
						}

						meta.value = val;
						next(meta);
						self.datagrid_cancel(meta);
					}

					if (e.which === 9) {

						// tries to edit another field
						var elcol = meta.elcol;

						while (true) {
							elcol = elcol.next();
							if (!elcol.length)
								break;

							var eledit = elcol.find('.dg-editable');
							if (eledit.length) {
								setTimeout(function(meta, elcol) {
									self.editcolumn(meta.rowindex, +elcol.attr('class').match(/\d+/)[0]);
								}, 200, meta, elcol);
								break;
							}
						}
					}

					break;

				case 27: // ESC
					next = null;
					self.datagrid_cancel(meta, true);
					break;
			}
		};

		$(W).on('keydown', current.fn).on('click', current.fn);
	};
});

COMPONENT('message', 'button:OK', function(self, config, cls) {

	var cls2 = '.' + cls;
	var is, visible = false;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {

		var pls = (config.style === 2 ? (' ' + cls + '2') : '');
		self.aclass(cls + ' hidden' + pls);
		self.event('click', 'button', self.hide);

		$(window).on('keyup', function(e) {
			visible && e.which === 27 && self.hide();
		});
	};

	self.warning = function(message, icon, fn) {
		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}
		self.callback = fn;
		self.content(cls + '-warning', message, icon || 'warning');
	};

	self.info = function(message, icon, fn) {
		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}
		self.callback = fn;
		self.content(cls + '-info', message, icon || 'info-circle');
	};

	self.success = function(message, icon, fn) {

		if (typeof(icon) === 'function') {
			fn = icon;
			icon = undefined;
		}

		self.callback = fn;
		self.content(cls + '-success', message, icon || 'check-circle');
	};

	self.response = function(message, callback, response) {

		var fn;

		if (typeof(message) === 'function') {
			response = callback;
			fn = message;
			message = null;
		} else if (typeof(callback) === 'function')
			fn = callback;
		else {
			response = callback;
			fn = null;
		}

		if (response instanceof Array) {
			var builder = [];
			for (var i = 0; i < response.length; i++) {
				var err = response[i].error;
				err && builder.push(err);
			}
			self.warning(builder.join('<br />'));
			SETTER('!loading/hide');
		} else if (typeof(response) === 'string') {
			self.warning(response);
			SETTER('!loading/hide');
		} else {
			message && self.success(message);
			if (fn)
				fn(response);
			else
				SETTER('!loading/hide');
		}
	};

	FUNC.messageresponse = function(success, callback) {
		return function(response, err) {
			if (err || response instanceof Array) {

				var msg = [];
				var template = '<div class="' + cls + '-error"><i class="fa fa-warning"></i>{0}</div>';

				if (response instanceof Array) {
					for (var i = 0; i < response.length; i++)
						msg.push(template.format(response[i].error));
					msg = msg.join('');
				} else
					msg = template.format(err.toString());

				self.warning(msg);
				SETTER('!loading/hide');
			} else {
				self.success(success);
				if (callback)
					callback(response);
				else
					SETTER('!loading/hide');
			}
		};
	};

	self.hide = function() {
		self.callback && self.callback();
		self.aclass('hidden');
		visible = false;
	};

	self.content = function(classname, text, icon) {

		if (icon.indexOf(' ') === -1)
			icon = 'fa fa-' + icon;

		!is && self.html('<div><div class="{0}-icon"><i class="{1}"></i></div><div class="{0}-body"><div class="{0}-text"></div><hr /><button>{2}</button></div></div>'.format(cls, icon, config.button));
		visible = true;
		self.rclass2(cls + '-').aclass(classname);
		self.find(cls2 + '-body').rclass().aclass(cls + '-body');

		if (is)
			self.find(cls2 + '-icon').find('.fa').rclass2('fa').aclass(icon);

		self.find(cls2 + '-text').html(text);
		self.rclass('hidden');
		is = true;
		setTimeout(function() {
			self.aclass(cls + '-visible');
			setTimeout(function() {
				self.find(cls2 + '-icon').aclass(cls + '-icon-animate');
			}, 300);
		}, 100);
	};
});

COMPONENT('window', 'zindex:80;scrollbar:true', function(self, config, cls) {

	var cls2 = '.' + cls;

	if (!W.$$window) {

		W.$$window_level = W.$$window_level || 1;
		W.$$window = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'window' && com.$ready && !com.$removed && !com.hclass('hidden'))
					com.resize();
			}
		};

		if (W.OP)
			W.OP.on('resize', resize);
		else
			$(W).on('resize', resize);
	}

	self.readonly();

	self.hide = function() {
		self.set('');
	};

	self.resize = function() {
		var el = self.find(cls2 + '-body');
		el.height(WH - self.find(cls2 + '-header').height());
		self.scrollbar && self.scrollbar.resize();
	};

	self.make = function() {

		var scr = self.find('> script');
		self.template = scr.length ? scr.html() : '';

		$(document.body).append('<div id="{0}" class="hidden {3}-container"><div class="{3}"><div data-bind="@config__change .{3}-icon:@icon__html span:value.title" class="{3}-title"><button name="cancel" class="{3}-button-close{2}" data-path="{1}"><i class="fa fa-times"></i></button><i class="{3}-icon"></i><span></span></div><div class="{3}-header"></div><div class="{3}-body"></div></div>'.format(self.ID, self.path, config.closebutton == false ? ' hidden' : '', cls));
		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body');
		body[0].appendChild(self.dom);

		if (config.scrollbar && window.SCROLLBAR) {
			self.scrollbar = SCROLLBAR(body, { visibleY: !!config.scrollbarY });
			self.scrollleft = self.scrollbar.scrollLeft;
			self.scrolltop = self.scrollbar.scrollTop;
			self.scrollright = self.scrollbar.scrollRight;
			self.scrollbottom = self.scrollbar.scrollBottom;
		} else
			body.aclass(cls + '-scroll');

		self.rclass('hidden');
		self.replace(el);
		self.event('click', 'button[name]', function() {
			switch (this.name) {
				case 'cancel':
					self.hide();
					break;
			}
		});
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass('fa fa-' + value.icon);
	};

	self.configure = function(key, value, init) {
		if (!init) {
			switch (key) {
				case 'closebutton':
					self.find(cls2 + '-button-close').tclass(value !== true);
					break;
			}
		}
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden)
			return;

		setTimeout2('windowreflow', function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			self.aclass('hidden');
			self.release(true);
			self.find(cls2).rclass(cls + '-animate');
			W.$$window_level--;
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find('div[data-jc-replaced]').html(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$window_level < 1)
			W.$$window_level = 1;

		W.$$window_level++;

		var body = self.find(cls2 + '-body');

		self.css('z-index', W.$$window_level * config.zindex);
		body[0].scrollTop = 0;
		self.rclass('hidden');
		self.release(false);
		self.resize();

		config.reload && EXEC(config.reload, self);
		config.default && DEFAULT(config.default, true);

		if (!isMOBILE && config.autofocus) {
			var el = self.find(config.autofocus === true ? 'input[type="text"],input[type="password"],select,textarea' : config.autofocus);
			el.length && setTimeout(function() {
				el[0].focus();
			}, 1500);
		}

		setTimeout(function() {
			body[0].scrollTop = 0;
			self.find(cls2 ).aclass(cls + '-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.id, function() {
			self.css('z-index', (W.$$window_level * config.zindex) + 1);
		}, 500);
	};
});

COMPONENT('menu', function(self, config, cls) {

	self.singleton();
	self.readonly();
	self.nocompile && self.nocompile();

	var cls2 = '.' + cls;

	var is = false;
	var issubmenu = false;
	var isopen = false;
	var events = {};
	var ul, children, prevsub, parentclass;

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.append('<div class="{0}-items"><ul></ul></div><div class="{0}-submenu hidden"><ul></ul></div>'.format(cls));
		ul = self.find(cls2 + '-items').find('ul');
		children = self.find(cls2 + '-submenu');

		self.event('click', 'li', function(e) {

			clearTimeout2(self.ID);

			var el = $(this);
			if (!el.hclass(cls + '-divider') && !el.hclass(cls + '-disabled')) {

				var index = el.attrd('index').split('-');
				if (index.length > 1) {
					// submenu
					self.opt.callback(self.opt.items[+index[0]].children[+index[1]]);
					self.hide();
				} else if (!issubmenu) {
					self.opt.callback(self.opt.items[+index[0]]);
					self.hide();
				}
			}

			e.preventDefault();
			e.stopPropagation();
		});

		events.hide = function() {
			is && self.hide();
		};

		self.event('scroll', events.hide);
		self.on('reflow', events.hide);
		self.on('scroll', events.hide);
		self.on('resize', events.hide);

		events.click = function(e) {
			if (is && !isopen && (!self.target || (self.target !== e.target && !self.target.contains(e.target))))
				setTimeout2(self.ID, self.hide, isMOBILE ? 700 : 300);
		};

		events.hidechildren = function() {
			if ($(this.parentNode.parentNode).hclass(cls + '-items')) {
				if (prevsub && prevsub[0] !== this) {
					prevsub.rclass(cls + '-selected');
					prevsub = null;
					children.aclass('hidden');
					issubmenu = false;
				}
			}
		};

		events.children = function() {

			if (prevsub && prevsub[0] !== this) {
				prevsub.rclass(cls + '-selected');
				prevsub = null;
			}

			issubmenu = true;
			isopen = true;

			setTimeout(function() {
				isopen = false;
			}, 500);

			var el = prevsub = $(this);
			var index = +el.attrd('index');
			var item = self.opt.items[index];

			el.aclass(cls + '-selected');

			var html = self.makehtml(item.children, index);
			children.find('ul').html(html);
			children.rclass('hidden');

			var css = {};
			var offset = el.position();

			css.left = ul.width() - 5;
			css.top = offset.top - 5;

			var offsetX = offset.left;

			offset = self.element.offset();

			var w = children.width();
			var left = offset.left + css.left + w;
			if (left > WW + 30)
				css.left = (offsetX - w) + 5;

			children.css(css);
		};
	};

	self.bindevents = function() {
		events.is = true;
		$(document).on('touchstart mouseenter mousedown', cls2 + '-children', events.children);
		$(document).on('touchstart mousedown', events.click);
		$(window).on('scroll', events.hide);
		self.element.on('mouseenter', 'li', events.hidechildren);
	};

	self.unbindevents = function() {
		events.is = false;
		$(document).off('touchstart mouseenter mousedown', cls2 + '-children', events.children);
		$(document).off('touchstart mousedown', events.click);
		$(window).off('scroll', events.hide);
		self.element.off('mouseenter', 'li', events.hidechildren);
	};

	self.showxy = function(x, y, items, callback) {
		var opt = {};
		opt.x = x;
		opt.y = y;
		opt.items = items;
		opt.callback = callback;
		self.show(opt);
	};

	self.makehtml = function(items, index) {
		var builder = [];
		var tmp;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			if (typeof(item) === 'string') {
				// caption or divider
				if (item === '-')
					tmp = '<hr />';
				else
					tmp = '<span>{0}</span>'.format(item);
				builder.push('<li class="{0}-divider">{1}</li>'.format(cls, tmp));
				continue;
			}

			var cn = item.classname || '';
			var icon = '';

			if (item.icon)
				icon = '<i class="{0}"></i>'.format(item.icon.charAt(0) === '!' ? item.icon.substring(1) : item.icon.indexOf('fa-') === -1 ? ('fa fa-' + item.icon) : item.icon);
			else
				cn = (cn ? (cn + ' ') : '') + cls + '-nofa';

			tmp = '';

			if (index == null && item.children && item.children.length) {
				cn += (cn ? ' ' : '') + cls + '-children';
				tmp += '<i class="fa fa-play pull-right"></i>';
			}

			if (item.selected)
				cn += (cn ? ' ' : '') + cls + '-selected';

			if (item.disabled)
				cn += (cn ? ' ' : '') + cls + '-disabled';

			tmp += '<div class="{0}-name">{1}{2}{3}</div>'.format(cls, icon, item.name, item.shortcut ? '<b>{0}</b>'.format(item.shortcut) : '');

			if (item.note)
				tmp += '<div class="ui-menu-note">{0}</div>'.format(item.note);

			builder.push('<li class="{0}" data-index="{2}">{1}</li>'.format(cn, tmp, (index != null ? (index + '-') : '') + i));
		}

		return builder.join('');
	};

	self.show = function(opt) {

		if (typeof(opt) === 'string') {
			// old version
			opt = { align: opt };
			opt.element = arguments[1];
			opt.items = arguments[2];
			opt.callback = arguments[3];
			opt.offsetX = arguments[4];
			opt.offsetY = arguments[5];
		}

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		var tmp;

		self.target = tmp;
		self.opt = opt;

		if (parentclass && opt.classname !== parentclass) {
			self.rclass(parentclass);
			parentclass = null;
		}

		if (opt.large)
			self.aclass('ui-large');
		else
			self.rclass('ui-large');

		isopen = false;
		issubmenu = false;
		prevsub = null;

		var css = {};
		children.aclass('hidden');
		children.find('ul').empty();
		clearTimeout2(self.ID);

		ul.html(self.makehtml(opt.items));

		if (!parentclass && opt.classname) {
			self.aclass(opt.classname);
			parentclass = opt.classname;
		}

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else {
			self.rclass('hidden');
			self.aclass(cls + '-visible', 100);
			is = true;
			if (!events.is)
				self.bindevents();
		}

		var target = $(opt.element);
		var w = self.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		self.element.css(css);
	};

	self.hide = function() {
		events.is && self.unbindevents();
		is = false;
		self.opt && self.opt.hide && self.opt.hide();
		self.target = null;
		self.opt = null;
		self.aclass('hidden');
		self.rclass(cls + '-visible');
	};

});

COMPONENT('layout', 'space:1;border:0;parent:window;margin:0;remember:1;autoresize:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var cache = {};
	var drag = {};
	var s = {};
	var events = {};
	var istop2 = false;
	var isbottom2 = false;
	var isright2 = false;
	var loaded = false;
	var resizecache = '';
	var settings;
	var prefkey = '';
	var prefexpire = '1 month';
	var isreset = false;
	var layout = null;

	self.readonly();

	self.init = function() {
		var obj;
		if (W.OP)
			obj = W.OP;
		else
			obj = $(W);
		obj.on('resize', function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'layout' && com.dom.offsetParent && com.$ready && !com.$removed && com.config.autoresize)
					com.resize();
			}
		});
	};

	self.make = function() {

		self.aclass(cls);
		self.find('> section').each(function() {
			var el = $(this);
			var type = el.attrd('type');

			if (type.charAt(type.length - 1) === '2') {
				type = type.substring(0, type.length - 1);

				switch (type) {
					case 'top':
						istop2 = true;
						break;
					case 'bottom':
						isbottom2 = true;
						break;
					case 'right':
						isright2 = true;
						break;
				}
			}
			el.aclass(cls + '-' + type + ' hidden ui-layout-section');
			el.after('<div class="{0}-resize-{1} {0}-resize" data-type="{1}"></div>'.format(cls, type));
			el.after('<div class="{0}-lock hidden" data-type="{1}"></div>'.format(cls, type));
			s[type] = el;
		});

		self.find('> .{0}-resize'.format(cls)).each(function() {
			var el = $(this);
			s[el.attrd('type') + 'resize'] = el;
		});

		self.find('> .{0}-lock'.format(cls)).each(function() {
			var el = $(this);
			s[el.attrd('type') + 'lock'] = el;
		});

		var tmp = self.find('> script');
		if (tmp.length) {
			self.rebind(tmp.html(), true);
			tmp.remove();
		}

		events.bind = function() {
			var el = self.element;
			el.bind('mousemove', events.mmove);
			el.bind('mouseup', events.mup);
			el.bind('mouseleave', events.mup);
		};

		events.unbind = function() {
			var el = self.element;
			el.unbind('mousemove', events.mmove);
			el.unbind('mouseup', events.mup);
			el.unbind('mouseleave', events.mup);
		};

		events.mdown = function(e) {

			var target = $(e.target);
			var type = target.attrd('type');
			var w = self.width();
			var h = self.height();
			var m = 2; // size of line

			self.element.find('iframe').css('pointer-events', 'none');

			drag.cur = self.element.offset();
			drag.cur.top -= 10;
			drag.cur.left -= 8;
			drag.offset = target.offset();
			drag.el = target;
			drag.x = e.pageX;
			drag.y = e.pageY;
			drag.horizontal = type === 'left' || type === 'right' ? 1 : 0;
			drag.type = type;
			drag.plusX = 10;
			drag.plusY = 10;

			var ch = cache[type];
			var offset = 0;
			var min = ch.minsize ? (ch.minsize.value - 1) : 0;

			target.aclass(cls + '-drag');

			switch (type) {
				case 'top':
					drag.min = min || (ch.size - m);
					drag.max = (h - (cache.bottom ? s.bottom.height() : 0) - 50);
					break;
				case 'right':
					offset = w;
					drag.min = (cache.left ? s.left.width() : 0) + 50 + min;
					drag.max = offset - (min || ch.size);
					break;
				case 'bottom':
					offset = h;
					drag.min = (cache.top ? s.top.height() : 0) + 50;
					drag.max = offset - (min || ch.size);
					break;
				case 'left':
					drag.min = min || (ch.size - m);
					drag.max = w - (cache.right ? s.right.width() : 0) - 50;
					break;
			}

			events.bind();
		};

		events.mmove = function(e) {
			if (drag.horizontal) {
				var x = drag.offset.left + (e.pageX - drag.x) - drag.plusX - drag.cur.left;

				if (x < drag.min)
					x = drag.min + 1;

				if (x > drag.max)
					x = drag.max - 1;

				drag.el.css('left', x + 'px');

			} else {
				var y = drag.offset.top + (e.pageY - drag.y) - drag.plusY;

				if (y < drag.min)
					y = drag.min + 1;
				if (y > drag.max)
					y = drag.max - 1;

				drag.el.css('top', (y - drag.cur.top) + 'px');
			}
		};

		events.mup = function() {

			self.element.find('iframe').css('pointer-events', '');

			var offset = drag.el.offset();
			var d = WIDTH();
			var pk = prefkey + '_' + layout + '_' + drag.type + '_' + d;

			drag.el.rclass(cls + '-drag');

			if (drag.horizontal) {

				offset.left -= drag.cur.left;

				if (offset.left < drag.min)
					offset.left = drag.min;

				if (offset.left > drag.max)
					offset.left = drag.max;

				var w = offset.left - (drag.offset.left - drag.cur.left);

				if (!isright2 && drag.type === 'right')
					w = w * -1;

				drag.el.css('left', offset.left);
				w = s[drag.type].width() + w;
				s[drag.type].css('width', w);
				config.remember && PREF.set(pk, w, prefexpire);

			} else {

				offset.top -= drag.cur.top;

				if (offset.top < drag.min)
					offset.top = drag.min;
				if (offset.top > drag.max)
					offset.top = drag.max;

				drag.el.css('top', offset.top);

				var h = offset.top - (drag.offset.top - drag.cur.top);
				if (drag.type === 'bottom' || drag.type === 'preview')
					h = h * -1;

				h = s[drag.type].height() + h;
				s[drag.type].css('height', h);
				config.remember && PREF.set(pk, h, prefexpire);
			}

			events.unbind();
			self.refresh();
		};

		self.find('> ' + cls2 + '-resize').on('mousedown', events.mdown);
	};

	self.lock = function(type, b) {
		var el = s[type + 'lock'];
		el && el.tclass('hidden', b == null ? b : !b);
	};

	self.rebind = function(code, noresize) {
		code = code.trim();
		prefkey = 'L' + HASH(code);
		resizecache = '';
		settings = new Function('return ' + code)();
		!noresize && self.resize();
	};

	var getSize = function(display, data) {

		var obj = data[display];
		if (obj)
			return obj;

		switch (display) {
			case 'md':
				return getSize('lg', data);
			case 'sm':
				return getSize('md', data);
			case 'xs':
				return getSize('sm', data);
		}

		return data;
	};

	self.resize = function() {

		if (self.dom.offsetParent == null) {
			setTimeout(self.resize, 100);
			return;
		}

		if (settings == null)
			return;

		var d = WIDTH();
		var el = self.parent(config.parent);
		var width = el.width();
		var height = el.height();
		var key = d + 'x' + width + 'x' + height;

		if (resizecache === key)
			return;

		var tmp = layout ? settings[layout] : settings;

		if (tmp == null) {
			WARN('j-Layout: layout "{0}" not found'.format(layout));
			tmp = settings;
		}

		var size = getSize(d, tmp);
		var keys = Object.keys(s);

		height -= config.margin;
		resizecache = key;
		self.css({ width: width, height: height });

		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			el = s[key];
			self.update(key, size[key] ? size[key] : settings[key]);
		}

		config.resize && EXEC(config.resize, d, width, height);
	};

	var parseSize = function(val, size) {
		var str = typeof(val) === 'string';
		var obj = { raw : str ? val.parseFloat() : val, percentage: str ? val.charAt(val.length - 1) === '%' : false };
		obj.value = obj.percentage ? ((((size / 100) * obj.raw) >> 0) - config.space) : obj.raw;
		return obj;
	};

	self.reset = function() {
		isreset = true;
		resizecache = '';
		self.resize();
	};

	self.layout = function(name) {

		if (name == null)
			name = '';

		if (layout != name) {
			layout = name;
			resizecache = '';
			self.resize();
		}
	};

	self.update = function(type, opt) {

		if (opt == null)
			return;

		if (typeof(opt) === 'string')
			opt = opt.parseConfig();

		if (s[type] == null)
			return;

		var el = s[type];
		var css = {};
		var is = 0;
		var size = null;
		var d = WIDTH();

		var c = cache[type];
		if (c == null)
			c = cache[type] = {};

		var w = self.width();
		var h = self.height();
		var pk = prefkey + '_' + layout + '_' + type + '_' + d;
		var cached = PREF.get(pk, prefexpire);

		if (isreset) {
			cached && PREF.set(pk); // remove value
			cached = 0;
		}

		c.minsize = opt.minwidth ? parseSize(opt.minwidth, w) : opt.minsize ? parseSize(opt.minsize, w) : 0;

		var def = getSize(d, settings);
		var width = (opt.size || opt.width) || (def[type] ? def[type].width : 0);
		var height = (opt.size || opt.height) || (def[type] ? def[type].height : 0);

		if (width && (type === 'left' || type === 'right')) {
			size = parseSize(width, w);
			c.size = size.value;
			css.width = cached ? cached : size.value;
			is = 1;
		}

		c.minsize = opt.minheight ? parseSize(opt.minheight, w) : opt.minsize ? parseSize(opt.minsize, w) : 0;
		if (height && (type === 'top' || type === 'bottom')) {
			size = parseSize(height, h);
			c.size = size.value;
			css.height = (cached ? cached : size.value);
			is = 1;
		}

		if (opt.show == null)
			opt.show = true;

		el.tclass('hidden', !opt.show);
		c.show = !!opt.show;
		c.resize = opt.resize == null ? false : !!opt.resize;
		el.tclass(cls + '-resizable', c.resize);
		s[type + 'resize'].tclass('hidden', !c.show || !c.resize);

		is && el.css(css);
		setTimeout2(self.ID + 'refresh', self.refresh, 50);
	};

	var getWidth = function(el) {
		return el.hclass('hidden') ? 0 : el.width();
	};

	var getHeight = function(el) {
		return el.hclass('hidden') ? 0 : el.height();
	};

	self.refresh = function() {

		var top = 0;
		var bottom = 0;
		var right = 0;
		var left = 0;
		var hidden = 'hidden';
		var top2 = 0;
		var bottom2 = 0;
		var space = 2;
		var topbottomoffset = 0;
		var right2visible = isright2 && !s.right.hclass(hidden);

		if (s.top)
			top = top2 = getHeight(s.top);

		if (s.bottom)
			bottom = bottom2 = getHeight(s.bottom);

		var width = self.width() - (config.border * 2);
		var height = self.height() - (config.border * 2);

		if (istop2) {
			topbottomoffset++;
			top2 = 0;
		}

		if (isbottom2) {
			topbottomoffset--;
			bottom2 = 0;
		}

		if (s.left && !s.left.hclass(hidden)) {
			var cssleft = {};
			space = top && bottom ? 2 : top || bottom ? 1 : 0;
			cssleft.left = 0;
			cssleft.top = istop2 ? config.border : (top ? (top + config.space) : 0);
			cssleft.height = isbottom2 ? (height - top2 - config.border) : (height - top2 - bottom2 - (config.space * space));
			cssleft.height += topbottomoffset;
			s.left.css(cssleft);
			cssleft.width = s.left.width();
			s.leftlock.css(cssleft);
			delete cssleft.width;
			left = s.left.width();
			cssleft.left = s.left.width();
			s.leftresize.css(cssleft);
			s.leftresize.tclass(hidden, !s.left.hclass(cls + '-resizable'));
		}

		if (s.right && !s.right.hclass(hidden)) {
			right = s.right.width();
			space = top && bottom ? 2 : top || bottom ? 1 : 0;
			var cssright = {};
			cssright.left = right2visible ? (getWidth(s.left) + config.border + config.space) : (width - right);
			cssright.top = istop2 ? config.border : (top ? (top + config.space) : 0);
			cssright.height = isbottom2 ? (height - top2 - config.border) : (height - top2 - bottom2 - (config.space * space));
			cssright.height += topbottomoffset;

			s.right.css(cssright);
			cssright.width = s.right.width();

			if ((cssright.width + cssright.left) === width) {
				s.right.css('left', 0);
				cssright.width++;
			}

			s.rightlock.css(cssright);
			delete cssright.width;

			if (right2visible)
				cssright.left += s.right.width();
			else
				cssright.left = width - right - 2;

			s.rightresize.css(cssright);
			s.rightresize.tclass(hidden, !s.right.hclass(cls + '-resizable'));
		}

		if (s.top) {
			var csstop = {};
			space = left ? config.space : 0;
			csstop.left = istop2 ? (left + space) : 0;

			if (right2visible && istop2)
				csstop.left += getWidth(s.right) + config.space;

			space = left && right ? 2 : left || right ? 1 : 0;
			csstop.width = istop2 ? (width - right - left - (config.space * space)) : width;
			csstop.top = 0;
			s.top.css(csstop);
			s.topresize.css(csstop);
			csstop.height = s.top.height();
			s.toplock.css(csstop);
			delete csstop.height;
			csstop.top = s.top.height();
			s.topresize.css(csstop);
			s.topresize.tclass(hidden, !s.top.hclass(cls + '-resizable'));
		}

		if (s.bottom) {
			var cssbottom = {};
			cssbottom.top = height - bottom;
			space = left ? config.space : 0;
			cssbottom.left = isbottom2 ? (left + space) : 0;

			if (right2visible && isbottom2)
				cssbottom.left += getWidth(s.right) + config.space;

			space = left && right ? 2 : left || right ? 1 : 0;
			cssbottom.width = isbottom2 ? (width - right - left - (config.space * space)) : width;
			s.bottom.css(cssbottom);
			cssbottom.height = s.bottom.height();
			s.bottomlock.css(cssbottom);
			delete cssbottom.height;
			cssbottom.top = cssbottom.top - 2;
			s.bottomresize.css(cssbottom);
			s.bottomresize.tclass(hidden, !s.bottom.hclass(cls + '-resizable'));
		}

		var space = left && right ? 2 : left ? 1 : right ? 1 : 0;
		var css = {};
		css.left = left ? left + config.space : 0;

		if (right2visible)
			css.left += getWidth(s.right) + config.space;

		css.width = (width - left - right - (config.space * space));
		css.top = top ? top + config.space : 0;

		space = top && bottom ? 2 : top || bottom ? 1 : 0;
		css.height = height - top - bottom - (config.space * space);

		s.main && s.main.css(css);
		s.mainlock && s.mainlock.css(css);

		self.element.SETTER('*', 'resize');

		if (loaded == false) {
			loaded = true;
			self.rclass('invisible');
		}

		isreset = false;
	};

	self.setter = function(value) {
		self.layout(value);
	};

});

COMPONENT('faiconsbutton', 'default:#FFFFFF;align:left;position:top;empty:1', function(self, config) {

	var cls = 'ui-faiconsbutton';
	var icon;

	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<span class="{0}-arrow"><i class="fa fa-angle-down"></i></span><div class="{0}-icon"></div>'.format(cls));
		icon = self.find('.' + cls + '-icon');

		self.event('click', function() {
			if (config.disabled)
				return;
			var opt = {};
			opt.align = config.align;
			opt.position = config.position;
			opt.offsetX = config.offsetX;
			opt.offsetY = config.offsetY;
			opt.element = self.element;
			opt.empty = config.empty;
			opt.callback = function(icon) {
				self.set(icon);
				self.change(true);
			};
			SETTER('faicons', 'show', opt);
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
		}
	};

	self.setter = function(value) {
		icon.html(value ? '<i class="{0}"></i>'.format(value) : '');
	};
});

COMPONENT('faicons', 'search:Search', function(self, config) {

	var icons = 'ad,address-book,address-card,adjust,air-freshener,align-center,align-justify,align-left,align-right,allergies,ambulance,american-sign-language-interpreting,anchor,angle-double-down,angle-double-left,angle-double-right,angle-double-up,angle-down,angle-left,angle-right,angle-up,angry,ankh,apple-alt,archive,archway,arrow-alt-circle-down,arrow-alt-circle-left,arrow-alt-circle-right,arrow-alt-circle-up,arrow-circle-down,arrow-circle-left,arrow-circle-right,arrow-circle-up,arrow-down,arrow-left,arrow-right,arrow-up,arrows-alt,arrows-alt-h,arrows-alt-v,assistive-listening-systems,asterisk,at,atlas,atom,audio-description,award,baby,baby-carriage,backspace,backward,bacon,bahai,balance-scale,balance-scale-left,balance-scale-right,ban,band-aid,barcode,bars,baseball-ball,basketball-ball,bath,battery-empty,battery-full,battery-half,battery-quarter,battery-three-quarters,bed,beer,bell,bell-slash,bezier-curve,bible,bicycle,biking,binoculars,biohazard,birthday-cake,blender,blender-phone,blind,blog,bold,bolt,bomb,bone,bong,book,book-dead,book-medical,book-open,book-reader,bookmark,border-all,border-none,border-style,bowling-ball,box,box-open,boxes,braille,brain,bread-slice,briefcase,briefcase-medical,broadcast-tower,broom,brush,bug,building,bullhorn,bullseye,burn,bus,bus-alt,business-time,calculator,calendar,calendar-alt,calendar-check,calendar-day,calendar-minus,calendar-plus,calendar-times,calendar-week,camera,camera-retro,campground,candy-cane,cannabis,capsules,car,car-alt,car-battery,car-crash,car-side,caravan,caret-down,caret-left,caret-right,caret-square-down,caret-square-left,caret-square-right,caret-square-up,caret-up,carrot,cart-arrow-down,cart-plus,cash-register,cat,certificate,chair,chalkboard,chalkboard-teacher,charging-station,chart-area,chart-bar,chart-line,chart-pie,check,check-circle,check-double,check-square,cheese,chess,chess-bishop,chess-board,chess-king,chess-knight,chess-pawn,chess-queen,chess-rook,chevron-circle-down,chevron-circle-left,chevron-circle-right,chevron-circle-up,chevron-down,chevron-left,chevron-right,chevron-up,child,church,circle,circle-notch,city,clinic-medical,clipboard,clipboard-check,clipboard-list,clock,clone,closed-captioning,cloud,cloud-download-alt,cloud-meatball,cloud-moon,cloud-moon-rain,cloud-rain,cloud-showers-heavy,cloud-sun,cloud-sun-rain,cloud-upload-alt,cocktail,code,code-branch,coffee,cog,cogs,coins,columns,comment,comment-alt,comment-dollar,comment-dots,comment-medical,comment-slash,comments,comments-dollar,compact-disc,compass,compress,compress-alt,compress-arrows-alt,concierge-bell,cookie,cookie-bite,copy,copyright,couch,credit-card,crop,crop-alt,cross,crosshairs,crow,crown,crutch,cube,cubes,cut,database,deaf,democrat,desktop,dharmachakra,diagnoses,dice,dice-d20,dice-d6,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,digital-tachograph,directions,divide,dizzy,dna,dog,dollar-sign,dolly,dolly-flatbed,donate,door-closed,door-open,dot-circle,dove,download,drafting-compass,dragon,draw-polygon,drum,drum-steelpan,drumstick-bite,dumbbell,dumpster,dumpster-fire,dungeon,edit,egg,eject,ellipsis-h,ellipsis-v,envelope,envelope-open,envelope-open-text,envelope-square,equals,eraser,ethernet,euro-sign,exchange-alt,exclamation,exclamation-circle,exclamation-triangle,expand,expand-alt,expand-arrows-alt,external-link-alt,external-link-square-alt,eye,eye-dropper,eye-slash,fan,fast-backward,fast-forward,fax,feather,feather-alt,female,fighter-jet,file,file-alt,file-archive,file-audio,file-code,file-contract,file-csv,file-download,file-excel,file-export,file-image,file-import,file-invoice,file-invoice-dollar,file-medical,file-medical-alt,file-pdf,file-powerpoint,file-prescription,file-signature,file-upload,file-video,file-word,fill,fill-drip,film,filter,fingerprint,fire,fire-alt,fire-extinguisher,first-aid,fish,fist-raised,flag,flag-checkered,flag-usa,flask,flushed,folder,folder-minus,folder-open,folder-plus,font,football-ball,forward,frog,frown,frown-open,funnel-dollar,futbol,gamepad,gas-pump,gavel,gem,genderless,ghost,gift,gifts,glass-cheers,glass-martini,glass-martini-alt,glass-whiskey,glasses,globe,globe-africa,globe-americas,globe-asia,globe-europe,golf-ball,gopuram,graduation-cap,greater-than,greater-than-equal,grimace,grin,grin-alt,grin-beam,grin-beam-sweat,grin-hearts,grin-squint,grin-squint-tears,grin-stars,grin-tears,grin-tongue,grin-tongue-squint,grin-tongue-wink,grin-wink,grip-horizontal,grip-lines,grip-lines-vertical,grip-vertical,guitar,h-square,hamburger,hammer,hamsa,hand-holding,hand-holding-heart,hand-holding-usd,hand-lizard,hand-middle-finger,hand-paper,hand-peace,hand-point-down,hand-point-left,hand-point-right,hand-point-up,hand-pointer,hand-rock,hand-scissors,hand-spock,hands,hands-helping,handshake,hanukiah,hard-hat,hashtag,hat-cowboy,hat-cowboy-side,hat-wizard,hdd,heading,headphones,headphones-alt,headset,heart,heart-broken,heartbeat,helicopter,highlighter,hiking,hippo,history,hockey-puck,holly-berry,home,horse,horse-head,hospital,hospital-alt,hospital-symbol,hot-tub,hotdog,hotel,hourglass,hourglass-end,hourglass-half,hourglass-start,house-damage,hryvnia,i-cursor,ice-cream,icicles,icons,id-badge,id-card,id-card-alt,igloo,image,images,inbox,indent,industry,infinity,info,info-circle,italic,jedi,joint,journal-whills,kaaba,key,keyboard,khanda,kiss,kiss-beam,kiss-wink-heart,kiwi-bird,landmark,language,laptop,laptop-code,laptop-medical,laugh,laugh-beam,laugh-squint,laugh-wink,layer-group,leaf,lemon,less-than,less-than-equal,level-down-alt,level-up-alt,life-ring,lightbulb,link,lira-sign,list,list-alt,list-ol,list-ul,location-arrow,lock,lock-open,long-arrow-alt-down,long-arrow-alt-left,long-arrow-alt-right,long-arrow-alt-up,low-vision,luggage-cart,magic,magnet,mail-bulk,male,map,map-marked,map-marked-alt,map-marker,map-marker-alt,map-pin,map-signs,marker,mars,mars-double,mars-stroke,mars-stroke-h,mars-stroke-v,mask,medal,medkit,meh,meh-blank,meh-rolling-eyes,memory,menorah,mercury,meteor,microchip,microphone,microphone-alt,microphone-alt-slash,microphone-slash,microscope,minus,minus-circle,minus-square,mitten,mobile,mobile-alt,money-bill,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,monument,moon,mortar-pestle,mosque,motorcycle,mountain,mouse,mouse-pointer,mug-hot,music,network-wired,neuter,newspaper,not-equal,notes-medical,object-group,object-ungroup,oil-can,om,otter,outdent,pager,paint-brush,paint-roller,palette,pallet,paper-plane,paperclip,parachute-box,paragraph,parking,passport,pastafarianism,paste,pause,pause-circle,paw,peace,pen,pen-alt,pen-fancy,pen-nib,pen-square,pencil-alt,pencil-ruler,people-carry,pepper-hot,percent,percentage,person-booth,phone,phone-alt,phone-slash,phone-square,phone-square-alt,phone-volume,photo-video,piggy-bank,pills,pizza-slice,place-of-worship,plane,plane-arrival,plane-departure,play,play-circle,plug,plus,plus-circle,plus-square,podcast,poll,poll-h,poo,poo-storm,poop,portrait,pound-sign,power-off,pray,praying-hands,prescription,prescription-bottle,prescription-bottle-alt,print,procedures,project-diagram,puzzle-piece,qrcode,question,question-circle,quidditch,quote-left,quote-right,quran,radiation,radiation-alt,rainbow,random,receipt,record-vinyl,recycle,redo,redo-alt,registered,remove-format,reply,reply-all,republican,restroom,retweet,ribbon,ring,road,robot,rocket,route,rss,rss-square,ruble-sign,ruler,ruler-combined,ruler-horizontal,ruler-vertical,running,rupee-sign,sad-cry,sad-tear,satellite,satellite-dish,save,school,screwdriver,scroll,sd-card,search,search-dollar,search-location,search-minus,search-plus,seedling,server,shapes,share,share-alt,share-alt-square,share-square,shekel-sign,shield-alt,ship,shipping-fast,shoe-prints,shopping-bag,shopping-basket,shopping-cart,shower,shuttle-van,sign,sign-in-alt,sign-language,sign-out-alt,signal,signature,sim-card,sitemap,skating,skiing,skiing-nordic,skull,skull-crossbones,slash,sleigh,sliders-h,smile,smile-beam,smile-wink,smog,smoking,smoking-ban,sms,snowboarding,snowflake,snowman,snowplow,socks,solar-panel,sort,sort-alpha-down,sort-alpha-down-alt,sort-alpha-up,sort-alpha-up-alt,sort-amount-down,sort-amount-down-alt,sort-amount-up,sort-amount-up-alt,sort-down,sort-numeric-down,sort-numeric-down-alt,sort-numeric-up,sort-numeric-up-alt,sort-up,spa,space-shuttle,spell-check,spider,spinner,splotch,spray-can,square,square-full,square-root-alt,stamp,star,star-and-crescent,star-half,star-half-alt,star-of-david,star-of-life,step-backward,step-forward,stethoscope,sticky-note,stop,stop-circle,stopwatch,store,store-alt,stream,street-view,strikethrough,stroopwafel,subscript,subway,suitcase,suitcase-rolling,sun,superscript,surprise,swatchbook,swimmer,swimming-pool,synagogue,sync,sync-alt,syringe,table,table-tennis,tablet,tablet-alt,tablets,tachometer-alt,tag,tags,tape,tasks,taxi,teeth,teeth-open,temperature-high,temperature-low,tenge,terminal,text-height,text-width,th,th-large,th-list,theater-masks,thermometer,thermometer-empty,thermometer-full,thermometer-half,thermometer-quarter,thermometer-three-quarters,thumbs-down,thumbs-up,thumbtack,ticket-alt,times,times-circle,tint,tint-slash,tired,toggle-off,toggle-on,toilet,toilet-paper,toolbox,tools,tooth,torah,torii-gate,tractor,trademark,traffic-light,trailer,train,tram,transgender,transgender-alt,trash,trash-alt,trash-restore,trash-restore-alt,tree,trophy,truck,truck-loading,truck-monster,truck-moving,truck-pickup,tshirt,tty,tv,umbrella,umbrella-beach,underline,undo,undo-alt,universal-access,university,unlink,unlock,unlock-alt,upload,user,user-alt,user-alt-slash,user-astronaut,user-check,user-circle,user-clock,user-cog,user-edit,user-friends,user-graduate,user-injured,user-lock,user-md,user-minus,user-ninja,user-nurse,user-plus,user-secret,user-shield,user-slash,user-tag,user-tie,user-times,users,users-cog,utensil-spoon,utensils,vector-square,venus,venus-double,venus-mars,vial,vials,video,video-slash,vihara,voicemail,volleyball-ball,volume-down,volume-mute,volume-off,volume-up,vote-yea,vr-cardboard,walking,wallet,warehouse,water,wave-square,weight,weight-hanging,wheelchair,wifi,wind,window-close,window-maximize,window-minimize,window-restore,wine-bottle,wine-glass,wine-glass-alt,won-sign,wrench,x-ray,yen-sign,yin-yang,r address-book,r address-card,r angry,r arrow-alt-circle-down,r arrow-alt-circle-left,r arrow-alt-circle-right,r arrow-alt-circle-up,r bell,r bell-slash,r bookmark,r building,r calendar,r calendar-alt,r calendar-check,r calendar-minus,r calendar-plus,r calendar-times,r caret-square-down,r caret-square-left,r caret-square-right,r caret-square-up,r chart-bar,r check-circle,r check-square,r circle,r clipboard,r clock,r clone,r closed-captioning,r comment,r comment-alt,r comment-dots,r comments,r compass,r copy,r copyright,r credit-card,r dizzy,r dot-circle,r edit,r envelope,r envelope-open,r eye,r eye-slash,r file,r file-alt,r file-archive,r file-audio,r file-code,r file-excel,r file-image,r file-pdf,r file-powerpoint,r file-video,r file-word,r flag,r flushed,r folder,r folder-open,r frown,r frown-open,r futbol,r gem,r grimace,r grin,r grin-alt,r grin-beam,r grin-beam-sweat,r grin-hearts,r grin-squint,r grin-squint-tears,r grin-stars,r grin-tears,r grin-tongue,r grin-tongue-squint,r grin-tongue-wink,r grin-wink,r hand-lizard,r hand-paper,r hand-peace,r hand-point-down,r hand-point-left,r hand-point-right,r hand-point-up,r hand-pointer,r hand-rock,r hand-scissors,r hand-spock,r handshake,r hdd,r heart,r hospital,r hourglass,r id-badge,r id-card,r image,r images,r keyboard,r kiss,r kiss-beam,r kiss-wink-heart,r laugh,r laugh-beam,r laugh-squint,r laugh-wink,r lemon,r life-ring,r lightbulb,r list-alt,r map,r meh,r meh-blank,r meh-rolling-eyes,r minus-square,r money-bill-alt,r moon,r newspaper,r object-group,r object-ungroup,r paper-plane,r pause-circle,r play-circle,r plus-square,r question-circle,r registered,r sad-cry,r sad-tear,r save,r share-square,r smile,r smile-beam,r smile-wink,r snowflake,r square,r star,r star-half,r sticky-note,r stop-circle,r sun,r surprise,r thumbs-down,r thumbs-up,r times-circle,r tired,r trash-alt,r user,r user-circle,r window-close,r window-maximize,r window-minimize,r window-restore,b 500px,b accessible-icon,b accusoft,b acquisitions-incorporated,b adn,b adobe,b adversal,b affiliatetheme,b airbnb,b algolia,b alipay,b amazon,b amazon-pay,b amilia,b android,b angellist,b angrycreative,b angular,b app-store,b app-store-ios,b apper,b apple,b apple-pay,b artstation,b asymmetrik,b atlassian,b audible,b autoprefixer,b avianex,b aviato,b aws,b bandcamp,b battle-net,b behance,b behance-square,b bimobject,b bitbucket,b bitcoin,b bity,b black-tie,b blackberry,b blogger,b blogger-b,b bluetooth,b bluetooth-b,b bootstrap,b btc,b buffer,b buromobelexperte,b buy-n-large,b buysellads,b canadian-maple-leaf,b cc-amazon-pay,b cc-amex,b cc-apple-pay,b cc-diners-club,b cc-discover,b cc-jcb,b cc-mastercard,b cc-paypal,b cc-stripe,b cc-visa,b centercode,b centos,b chrome,b chromecast,b cloudscale,b cloudsmith,b cloudversify,b codepen,b codiepie,b confluence,b connectdevelop,b contao,b cotton-bureau,b cpanel,b creative-commons,b creative-commons-by,b creative-commons-nc,b creative-commons-nc-eu,b creative-commons-nc-jp,b creative-commons-nd,b creative-commons-pd,b creative-commons-pd-alt,b creative-commons-remix,b creative-commons-sa,b creative-commons-sampling,b creative-commons-sampling-plus,b creative-commons-share,b creative-commons-zero,b critical-role,b css3,b css3-alt,b cuttlefish,b d-and-d,b d-and-d-beyond,b dashcube,b delicious,b deploydog,b deskpro,b dev,b deviantart,b dhl,b diaspora,b digg,b digital-ocean,b discord,b discourse,b dochub,b docker,b draft2digital,b dribbble,b dribbble-square,b dropbox,b drupal,b dyalog,b earlybirds,b ebay,b edge,b elementor,b ello,b ember,b empire,b envira,b erlang,b ethereum,b etsy,b evernote,b expeditedssl,b facebook,b facebook-f,b facebook-messenger,b facebook-square,b fantasy-flight-games,b fedex,b fedora,b figma,b firefox,b firefox-browser,b first-order,b first-order-alt,b firstdraft,b flickr,b flipboard,b fly,b font-awesome,b font-awesome-alt,b font-awesome-flag,b fonticons,b fonticons-fi,b fort-awesome,b fort-awesome-alt,b forumbee,b foursquare,b free-code-camp,b freebsd,b fulcrum,b galactic-republic,b galactic-senate,b get-pocket,b gg,b gg-circle,b git,b git-alt,b git-square,b github,b github-alt,b github-square,b gitkraken,b gitlab,b gitter,b glide,b glide-g,b gofore,b goodreads,b goodreads-g,b google,b google-drive,b google-play,b google-plus,b google-plus-g,b google-plus-square,b google-wallet,b gratipay,b grav,b gripfire,b grunt,b gulp,b hacker-news,b hacker-news-square,b hackerrank,b hips,b hire-a-helper,b hooli,b hornbill,b hotjar,b houzz,b html5,b hubspot,b ideal,b imdb,b instagram,b intercom,b internet-explorer,b invision,b ioxhost,b itch-io,b itunes,b itunes-note,b java,b jedi-order,b jenkins,b jira,b joget,b joomla,b js,b js-square,b jsfiddle,b kaggle,b keybase,b keycdn,b kickstarter,b kickstarter-k,b korvue,b laravel,b lastfm,b lastfm-square,b leanpub,b less,b line,b linkedin,b linkedin-in,b linode,b linux,b lyft,b magento,b mailchimp,b mandalorian,b markdown,b mastodon,b maxcdn,b mdb,b medapps,b medium,b medium-m,b medrt,b meetup,b megaport,b mendeley,b microblog,b microsoft,b mix,b mixcloud,b mizuni,b modx,b monero,b napster,b neos,b nimblr,b node,b node-js,b npm,b ns8,b nutritionix,b odnoklassniki,b odnoklassniki-square,b old-republic,b opencart,b openid,b opera,b optin-monster,b orcid,b osi,b page4,b pagelines,b palfed,b patreon,b paypal,b penny-arcade,b periscope,b phabricator,b phoenix-framework,b phoenix-squadron,b php,b pied-piper,b pied-piper-alt,b pied-piper-hat,b pied-piper-pp,b pied-piper-square,b pinterest,b pinterest-p,b pinterest-square,b playstation,b product-hunt,b pushed,b python,b qq,b quinscape,b quora,b r-project,b raspberry-pi,b ravelry,b react,b reacteurope,b readme,b rebel,b red-river,b reddit,b reddit-alien,b reddit-square,b redhat,b renren,b replyd,b researchgate,b resolving,b rev,b rocketchat,b rockrms,b safari,b salesforce,b sass,b schlix,b scribd,b searchengin,b sellcast,b sellsy,b servicestack,b shirtsinbulk,b shopware,b simplybuilt,b sistrix,b sith,b sketch,b skyatlas,b skype,b slack,b slack-hash,b slideshare,b snapchat,b snapchat-ghost,b snapchat-square,b soundcloud,b sourcetree,b speakap,b speaker-deck,b spotify,b squarespace,b stack-exchange,b stack-overflow,b stackpath,b staylinked,b steam,b steam-square,b steam-symbol,b sticker-mule,b strava,b stripe,b stripe-s,b studiovinari,b stumbleupon,b stumbleupon-circle,b superpowers,b supple,b suse,b swift,b symfony,b teamspeak,b telegram,b telegram-plane,b tencent-weibo,b the-red-yeti,b themeco,b themeisle,b think-peaks,b trade-federation,b trello,b tripadvisor,b tumblr,b tumblr-square,b twitch,b twitter,b twitter-square,b typo3,b uber,b ubuntu,b uikit,b umbraco,b uniregistry,b unity,b untappd,b ups,b usb,b usps,b ussunnah,b vaadin,b viacoin,b viadeo,b viadeo-square,b viber,b vimeo,b vimeo-square,b vimeo-v,b vine,b vk,b vnv,b vuejs,b waze,b weebly,b weibo,b weixin,b whatsapp,b whatsapp-square,b whmcs,b wikipedia-w,b windows,b wix,b wizards-of-the-coast,b wolf-pack-battalion,b wordpress,b wordpress-simple,b wpbeginner,b wpexplorer,b wpforms,b wpressr,b xbox,b xing,b xing-square,b y-combinator,b yahoo,b yammer,b yandex,b yandex-international,b yarn,b yelp,b yoast,b youtube,b youtube-square,b zhihu'.split(',');
	var iconspro = 'abacus,acorn,ad,address-book,address-card,adjust,air-conditioner,air-freshener,alarm-clock,alarm-exclamation,alarm-plus,alarm-snooze,album,album-collection,alicorn,alien,alien-monster,align-center,align-justify,align-left,align-right,align-slash,allergies,ambulance,american-sign-language-interpreting,amp-guitar,analytics,anchor,angel,angle-double-down,angle-double-left,angle-double-right,angle-double-up,angle-down,angle-left,angle-right,angle-up,angry,ankh,apple-alt,apple-crate,archive,archway,arrow-alt-circle-down,arrow-alt-circle-left,arrow-alt-circle-right,arrow-alt-circle-up,arrow-alt-down,arrow-alt-from-bottom,arrow-alt-from-left,arrow-alt-from-right,arrow-alt-from-top,arrow-alt-left,arrow-alt-right,arrow-alt-square-down,arrow-alt-square-left,arrow-alt-square-right,arrow-alt-square-up,arrow-alt-to-bottom,arrow-alt-to-left,arrow-alt-to-right,arrow-alt-to-top,arrow-alt-up,arrow-circle-down,arrow-circle-left,arrow-circle-right,arrow-circle-up,arrow-down,arrow-from-bottom,arrow-from-left,arrow-from-right,arrow-from-top,arrow-left,arrow-right,arrow-square-down,arrow-square-left,arrow-square-right,arrow-square-up,arrow-to-bottom,arrow-to-left,arrow-to-right,arrow-to-top,arrow-up,arrows,arrows-alt,arrows-alt-h,arrows-alt-v,arrows-h,arrows-v,assistive-listening-systems,asterisk,at,atlas,atom,atom-alt,audio-description,award,axe,axe-battle,baby,baby-carriage,backpack,backspace,backward,bacon,badge,badge-check,badge-dollar,badge-percent,badge-sheriff,badger-honey,bags-shopping,bahai,balance-scale,balance-scale-left,balance-scale-right,ball-pile,ballot,ballot-check,ban,band-aid,banjo,barcode,barcode-alt,barcode-read,barcode-scan,bars,baseball,baseball-ball,basketball-ball,basketball-hoop,bat,bath,battery-bolt,battery-empty,battery-full,battery-half,battery-quarter,battery-slash,battery-three-quarters,bed,bed-alt,bed-bunk,bed-empty,beer,bell,bell-exclamation,bell-on,bell-plus,bell-school,bell-school-slash,bell-slash,bells,betamax,bezier-curve,bible,bicycle,biking,biking-mountain,binoculars,biohazard,birthday-cake,blanket,blender,blender-phone,blind,blinds,blinds-open,blinds-raised,blog,bold,bolt,bomb,bone,bone-break,bong,book,book-alt,book-dead,book-heart,book-medical,book-open,book-reader,book-spells,book-user,bookmark,books,books-medical,boombox,boot,booth-curtain,border-all,border-bottom,border-center-h,border-center-v,border-inner,border-left,border-none,border-outer,border-right,border-style,border-style-alt,border-top,bow-arrow,bowling-ball,bowling-pins,box,box-alt,box-ballot,box-check,box-fragile,box-full,box-heart,box-open,box-up,box-usd,boxes,boxes-alt,boxing-glove,brackets,brackets-curly,braille,brain,bread-loaf,bread-slice,briefcase,briefcase-medical,bring-forward,bring-front,broadcast-tower,broom,browser,brush,bug,building,bullhorn,bullseye,bullseye-arrow,bullseye-pointer,burger-soda,burn,burrito,bus,bus-alt,bus-school,business-time,cabinet-filing,cactus,calculator,calculator-alt,calendar,calendar-alt,calendar-check,calendar-day,calendar-edit,calendar-exclamation,calendar-minus,calendar-plus,calendar-star,calendar-times,calendar-week,camcorder,camera,camera-alt,camera-home,camera-movie,camera-polaroid,camera-retro,campfire,campground,candle-holder,candy-cane,candy-corn,cannabis,capsules,car,car-alt,car-battery,car-building,car-bump,car-bus,car-crash,car-garage,car-mechanic,car-side,car-tilt,car-wash,caravan,caravan-alt,caret-circle-down,caret-circle-left,caret-circle-right,caret-circle-up,caret-down,caret-left,caret-right,caret-square-down,caret-square-left,caret-square-right,caret-square-up,caret-up,carrot,cars,cart-arrow-down,cart-plus,cash-register,cassette-tape,cat,cat-space,cauldron,cctv,certificate,chair,chair-office,chalkboard,chalkboard-teacher,charging-station,chart-area,chart-bar,chart-line,chart-line-down,chart-network,chart-pie,chart-pie-alt,chart-scatter,check,check-circle,check-double,check-square,cheese,cheese-swiss,cheeseburger,chess,chess-bishop,chess-bishop-alt,chess-board,chess-clock,chess-clock-alt,chess-king,chess-king-alt,chess-knight,chess-knight-alt,chess-pawn,chess-pawn-alt,chess-queen,chess-queen-alt,chess-rook,chess-rook-alt,chevron-circle-down,chevron-circle-left,chevron-circle-right,chevron-circle-up,chevron-double-down,chevron-double-left,chevron-double-right,chevron-double-up,chevron-down,chevron-left,chevron-right,chevron-square-down,chevron-square-left,chevron-square-right,chevron-square-up,chevron-up,child,chimney,church,circle,circle-notch,city,clarinet,claw-marks,clinic-medical,clipboard,clipboard-check,clipboard-list,clipboard-list-check,clipboard-prescription,clipboard-user,clock,clone,closed-captioning,cloud,cloud-download,cloud-download-alt,cloud-drizzle,cloud-hail,cloud-hail-mixed,cloud-meatball,cloud-moon,cloud-moon-rain,cloud-music,cloud-rain,cloud-rainbow,cloud-showers,cloud-showers-heavy,cloud-sleet,cloud-snow,cloud-sun,cloud-sun-rain,cloud-upload,cloud-upload-alt,clouds,clouds-moon,clouds-sun,club,cocktail,code,code-branch,code-commit,code-merge,coffee,coffee-pot,coffee-togo,coffin,cog,cogs,coin,coins,columns,comet,comment,comment-alt,comment-alt-check,comment-alt-dollar,comment-alt-dots,comment-alt-edit,comment-alt-exclamation,comment-alt-lines,comment-alt-medical,comment-alt-minus,comment-alt-music,comment-alt-plus,comment-alt-slash,comment-alt-smile,comment-alt-times,comment-check,comment-dollar,comment-dots,comment-edit,comment-exclamation,comment-lines,comment-medical,comment-minus,comment-music,comment-plus,comment-slash,comment-smile,comment-times,comments,comments-alt,comments-alt-dollar,comments-dollar,compact-disc,compass,compass-slash,compress,compress-alt,compress-arrows-alt,compress-wide,computer-classic,computer-speaker,concierge-bell,construction,container-storage,conveyor-belt,conveyor-belt-alt,cookie,cookie-bite,copy,copyright,corn,couch,cow,cowbell,cowbell-more,credit-card,credit-card-blank,credit-card-front,cricket,croissant,crop,crop-alt,cross,crosshairs,crow,crown,crutch,crutches,cube,cubes,curling,cut,dagger,database,deaf,debug,deer,deer-rudolph,democrat,desktop,desktop-alt,dewpoint,dharmachakra,diagnoses,diamond,dice,dice-d10,dice-d12,dice-d20,dice-d4,dice-d6,dice-d8,dice-five,dice-four,dice-one,dice-six,dice-three,dice-two,digging,digital-tachograph,diploma,directions,disc-drive,disease,divide,dizzy,dna,do-not-enter,dog,dog-leashed,dollar-sign,dolly,dolly-empty,dolly-flatbed,dolly-flatbed-alt,dolly-flatbed-empty,donate,door-closed,door-open,dot-circle,dove,download,drafting-compass,dragon,draw-circle,draw-polygon,draw-square,dreidel,drone,drone-alt,drum,drum-steelpan,drumstick,drumstick-bite,dryer,dryer-alt,duck,dumbbell,dumpster,dumpster-fire,dungeon,ear,ear-muffs,eclipse,eclipse-alt,edit,egg,egg-fried,eject,elephant,ellipsis-h,ellipsis-h-alt,ellipsis-v,ellipsis-v-alt,empty-set,engine-warning,envelope,envelope-open,envelope-open-dollar,envelope-open-text,envelope-square,equals,eraser,ethernet,euro-sign,exchange,exchange-alt,exclamation,exclamation-circle,exclamation-square,exclamation-triangle,expand,expand-alt,expand-arrows,expand-arrows-alt,expand-wide,external-link,external-link-alt,external-link-square,external-link-square-alt,eye,eye-dropper,eye-evil,eye-slash,fan,fan-table,farm,fast-backward,fast-forward,faucet,faucet-drip,fax,feather,feather-alt,female,field-hockey,fighter-jet,file,file-alt,file-archive,file-audio,file-certificate,file-chart-line,file-chart-pie,file-check,file-code,file-contract,file-csv,file-download,file-edit,file-excel,file-exclamation,file-export,file-image,file-import,file-invoice,file-invoice-dollar,file-medical,file-medical-alt,file-minus,file-music,file-pdf,file-plus,file-powerpoint,file-prescription,file-search,file-signature,file-spreadsheet,file-times,file-upload,file-user,file-video,file-word,files-medical,fill,fill-drip,film,film-alt,film-canister,filter,fingerprint,fire,fire-alt,fire-extinguisher,fire-smoke,fireplace,first-aid,fish,fish-cooked,fist-raised,flag,flag-alt,flag-checkered,flag-usa,flame,flashlight,flask,flask-poison,flask-potion,flower,flower-daffodil,flower-tulip,flushed,flute,flux-capacitor,fog,folder,folder-minus,folder-open,folder-plus,folder-times,folder-tree,folders,font,font-case,football-ball,football-helmet,forklift,forward,fragile,french-fries,frog,frosty-head,frown,frown-open,function,funnel-dollar,futbol,galaxy,game-board,game-board-alt,game-console-handheld,gamepad,gamepad-alt,garage,garage-car,garage-open,gas-pump,gas-pump-slash,gavel,gem,genderless,ghost,gift,gift-card,gifts,gingerbread-man,glass,glass-champagne,glass-cheers,glass-citrus,glass-martini,glass-martini-alt,glass-whiskey,glass-whiskey-rocks,glasses,glasses-alt,globe,globe-africa,globe-americas,globe-asia,globe-europe,globe-snow,globe-stand,golf-ball,golf-club,gopuram,graduation-cap,gramophone,greater-than,greater-than-equal,grimace,grin,grin-alt,grin-beam,grin-beam-sweat,grin-hearts,grin-squint,grin-squint-tears,grin-stars,grin-tears,grin-tongue,grin-tongue-squint,grin-tongue-wink,grin-wink,grip-horizontal,grip-lines,grip-lines-vertical,grip-vertical,guitar,guitar-electric,guitars,h-square,h1,h2,h3,h4,hamburger,hammer,hammer-war,hamsa,hand-heart,hand-holding,hand-holding-box,hand-holding-heart,hand-holding-magic,hand-holding-seedling,hand-holding-usd,hand-holding-water,hand-lizard,hand-middle-finger,hand-paper,hand-peace,hand-point-down,hand-point-left,hand-point-right,hand-point-up,hand-pointer,hand-receiving,hand-rock,hand-scissors,hand-spock,hands,hands-heart,hands-helping,hands-usd,handshake,handshake-alt,hanukiah,hard-hat,hashtag,hat-chef,hat-cowboy,hat-cowboy-side,hat-santa,hat-winter,hat-witch,hat-wizard,hdd,head-side,head-side-brain,head-side-headphones,head-side-medical,head-vr,heading,headphones,headphones-alt,headset,heart,heart-broken,heart-circle,heart-rate,heart-square,heartbeat,heat,helicopter,helmet-battle,hexagon,highlighter,hiking,hippo,history,hockey-mask,hockey-puck,hockey-sticks,holly-berry,home,home-alt,home-heart,home-lg,home-lg-alt,hood-cloak,horizontal-rule,horse,horse-head,horse-saddle,hospital,hospital-alt,hospital-symbol,hospital-user,hospitals,hot-tub,hotdog,hotel,hourglass,hourglass-end,hourglass-half,hourglass-start,house,house-damage,house-day,house-flood,house-leave,house-night,house-return,house-signal,hryvnia,humidity,hurricane,i-cursor,ice-cream,ice-skate,icicles,icons,icons-alt,id-badge,id-card,id-card-alt,igloo,image,image-polaroid,images,inbox,inbox-in,inbox-out,indent,industry,industry-alt,infinity,info,info-circle,info-square,inhaler,integral,intersection,inventory,island-tropical,italic,jack-o-lantern,jedi,joint,journal-whills,joystick,jug,kaaba,kazoo,kerning,key,key-skeleton,keyboard,keynote,khanda,kidneys,kiss,kiss-beam,kiss-wink-heart,kite,kiwi-bird,knife-kitchen,lambda,lamp,lamp-desk,lamp-floor,landmark,landmark-alt,language,laptop,laptop-code,laptop-medical,lasso,laugh,laugh-beam,laugh-squint,laugh-wink,layer-group,layer-minus,layer-plus,leaf,leaf-heart,leaf-maple,leaf-oak,lemon,less-than,less-than-equal,level-down,level-down-alt,level-up,level-up-alt,life-ring,light-ceiling,light-switch,light-switch-off,light-switch-on,lightbulb,lightbulb-dollar,lightbulb-exclamation,lightbulb-on,lightbulb-slash,lights-holiday,line-columns,line-height,link,lips,lira-sign,list,list-alt,list-music,list-ol,list-ul,location,location-arrow,location-circle,location-slash,lock,lock-alt,lock-open,lock-open-alt,long-arrow-alt-down,long-arrow-alt-left,long-arrow-alt-right,long-arrow-alt-up,long-arrow-down,long-arrow-left,long-arrow-right,long-arrow-up,loveseat,low-vision,luchador,luggage-cart,lungs,mace,magic,magnet,mail-bulk,mailbox,male,mandolin,map,map-marked,map-marked-alt,map-marker,map-marker-alt,map-marker-alt-slash,map-marker-check,map-marker-edit,map-marker-exclamation,map-marker-minus,map-marker-plus,map-marker-question,map-marker-slash,map-marker-smile,map-marker-times,map-pin,map-signs,marker,mars,mars-double,mars-stroke,mars-stroke-h,mars-stroke-v,mask,meat,medal,medkit,megaphone,meh,meh-blank,meh-rolling-eyes,memory,menorah,mercury,meteor,microchip,microphone,microphone-alt,microphone-alt-slash,microphone-slash,microphone-stand,microscope,microwave,mind-share,minus,minus-circle,minus-hexagon,minus-octagon,minus-square,mistletoe,mitten,mobile,mobile-alt,mobile-android,mobile-android-alt,money-bill,money-bill-alt,money-bill-wave,money-bill-wave-alt,money-check,money-check-alt,money-check-edit,money-check-edit-alt,monitor-heart-rate,monkey,monument,moon,moon-cloud,moon-stars,mortar-pestle,mosque,motorcycle,mountain,mountains,mouse,mouse-alt,mouse-pointer,mp3-player,mug,mug-hot,mug-marshmallows,mug-tea,music,music-alt,music-alt-slash,music-slash,narwhal,network-wired,neuter,newspaper,not-equal,notes-medical,object-group,object-ungroup,octagon,oil-can,oil-temp,om,omega,ornament,otter,outdent,outlet,oven,overline,page-break,pager,paint-brush,paint-brush-alt,paint-roller,palette,pallet,pallet-alt,paper-plane,paperclip,parachute-box,paragraph,paragraph-rtl,parking,parking-circle,parking-circle-slash,parking-slash,passport,pastafarianism,paste,pause,pause-circle,paw,paw-alt,paw-claws,peace,pegasus,pen,pen-alt,pen-fancy,pen-nib,pen-square,pencil,pencil-alt,pencil-paintbrush,pencil-ruler,pennant,people-carry,pepper-hot,percent,percentage,person-booth,person-carry,person-dolly,person-dolly-empty,person-sign,phone,phone-alt,phone-laptop,phone-office,phone-plus,phone-rotary,phone-slash,phone-square,phone-square-alt,phone-volume,photo-video,pi,piano,piano-keyboard,pie,pig,piggy-bank,pills,pizza,pizza-slice,place-of-worship,plane,plane-alt,plane-arrival,plane-departure,planet-moon,planet-ringed,play,play-circle,plug,plus,plus-circle,plus-hexagon,plus-octagon,plus-square,podcast,podium,podium-star,police-box,poll,poll-h,poll-people,poo,poo-storm,poop,popcorn,portal-enter,portal-exit,portrait,pound-sign,power-off,pray,praying-hands,prescription,prescription-bottle,prescription-bottle-alt,presentation,print,print-search,print-slash,procedures,project-diagram,projector,pumpkin,puzzle-piece,qrcode,question,question-circle,question-square,quidditch,quote-left,quote-right,quran,rabbit,rabbit-fast,racquet,radar,radiation,radiation-alt,radio,radio-alt,rainbow,raindrops,ram,ramp-loading,random,raygun,receipt,record-vinyl,rectangle-landscape,rectangle-portrait,rectangle-wide,recycle,redo,redo-alt,refrigerator,registered,remove-format,repeat,repeat-1,repeat-1-alt,repeat-alt,reply,reply-all,republican,restroom,retweet,retweet-alt,ribbon,ring,rings-wedding,road,robot,rocket,rocket-launch,route,route-highway,route-interstate,router,rss,rss-square,ruble-sign,ruler,ruler-combined,ruler-horizontal,ruler-triangle,ruler-vertical,running,rupee-sign,rv,sack,sack-dollar,sad-cry,sad-tear,salad,sandwich,satellite,satellite-dish,sausage,save,sax-hot,saxophone,scalpel,scalpel-path,scanner,scanner-image,scanner-keyboard,scanner-touchscreen,scarecrow,scarf,school,screwdriver,scroll,scroll-old,scrubber,scythe,sd-card,search,search-dollar,search-location,search-minus,search-plus,seedling,send-back,send-backward,sensor,sensor-alert,sensor-fire,sensor-on,sensor-smoke,server,shapes,share,share-all,share-alt,share-alt-square,share-square,sheep,shekel-sign,shield,shield-alt,shield-check,shield-cross,ship,shipping-fast,shipping-timed,shish-kebab,shoe-prints,shopping-bag,shopping-basket,shopping-cart,shovel,shovel-snow,shower,shredder,shuttle-van,shuttlecock,sickle,sigma,sign,sign-in,sign-in-alt,sign-language,sign-out,sign-out-alt,signal,signal-1,signal-2,signal-3,signal-4,signal-alt,signal-alt-1,signal-alt-2,signal-alt-3,signal-alt-slash,signal-slash,signal-stream,signature,sim-card,siren,siren-on,sitemap,skating,skeleton,ski-jump,ski-lift,skiing,skiing-nordic,skull,skull-cow,skull-crossbones,slash,sledding,sleigh,sliders-h,sliders-h-square,sliders-v,sliders-v-square,smile,smile-beam,smile-plus,smile-wink,smog,smoke,smoking,smoking-ban,sms,snake,snooze,snow-blowing,snowboarding,snowflake,snowflakes,snowman,snowmobile,snowplow,socks,solar-panel,solar-system,sort,sort-alpha-down,sort-alpha-down-alt,sort-alpha-up,sort-alpha-up-alt,sort-alt,sort-amount-down,sort-amount-down-alt,sort-amount-up,sort-amount-up-alt,sort-circle,sort-circle-down,sort-circle-up,sort-down,sort-numeric-down,sort-numeric-down-alt,sort-numeric-up,sort-numeric-up-alt,sort-shapes-down,sort-shapes-down-alt,sort-shapes-up,sort-shapes-up-alt,sort-size-down,sort-size-down-alt,sort-size-up,sort-size-up-alt,sort-up,soup,spa,space-shuttle,space-station-moon,space-station-moon-alt,spade,sparkles,speaker,speakers,spell-check,spider,spider-black-widow,spider-web,spinner,spinner-third,splotch,spray-can,sprinkler,square,square-full,square-root,square-root-alt,squirrel,staff,stamp,star,star-and-crescent,star-christmas,star-exclamation,star-half,star-half-alt,star-of-david,star-of-life,star-shooting,starfighter,starfighter-alt,stars,starship,starship-freighter,steak,steering-wheel,step-backward,step-forward,stethoscope,sticky-note,stocking,stomach,stop,stop-circle,stopwatch,store,store-alt,stream,street-view,stretcher,strikethrough,stroopwafel,subscript,subway,suitcase,suitcase-rolling,sun,sun-cloud,sun-dust,sun-haze,sunglasses,sunrise,sunset,superscript,surprise,swatchbook,swimmer,swimming-pool,sword,sword-laser,sword-laser-alt,swords,swords-laser,synagogue,sync,sync-alt,syringe,table,table-tennis,tablet,tablet-alt,tablet-android,tablet-android-alt,tablet-rugged,tablets,tachometer,tachometer-alt,tachometer-alt-average,tachometer-alt-fast,tachometer-alt-fastest,tachometer-alt-slow,tachometer-alt-slowest,tachometer-average,tachometer-fast,tachometer-fastest,tachometer-slow,tachometer-slowest,taco,tag,tags,tally,tanakh,tape,tasks,tasks-alt,taxi,teeth,teeth-open,telescope,temperature-down,temperature-frigid,temperature-high,temperature-hot,temperature-low,temperature-up,tenge,tennis-ball,terminal,text,text-height,text-size,text-width,th,th-large,th-list,theater-masks,thermometer,thermometer-empty,thermometer-full,thermometer-half,thermometer-quarter,thermometer-three-quarters,theta,thumbs-down,thumbs-up,thumbtack,thunderstorm,thunderstorm-moon,thunderstorm-sun,ticket,ticket-alt,tilde,times,times-circle,times-hexagon,times-octagon,times-square,tint,tint-slash,tire,tire-flat,tire-pressure-warning,tire-rugged,tired,toggle-off,toggle-on,toilet,toilet-paper,toilet-paper-alt,tombstone,tombstone-alt,toolbox,tools,tooth,toothbrush,torah,torii-gate,tornado,tractor,trademark,traffic-cone,traffic-light,traffic-light-go,traffic-light-slow,traffic-light-stop,trailer,train,tram,transgender,transgender-alt,transporter,transporter-1,transporter-2,transporter-3,transporter-empty,trash,trash-alt,trash-restore,trash-restore-alt,trash-undo,trash-undo-alt,treasure-chest,tree,tree-alt,tree-christmas,tree-decorated,tree-large,tree-palm,trees,triangle,triangle-music,trophy,trophy-alt,truck,truck-container,truck-couch,truck-loading,truck-monster,truck-moving,truck-pickup,truck-plow,truck-ramp,trumpet,tshirt,tty,turkey,turntable,turtle,tv,tv-alt,tv-music,tv-retro,typewriter,ufo,ufo-beam,umbrella,umbrella-beach,underline,undo,undo-alt,unicorn,union,universal-access,university,unlink,unlock,unlock-alt,upload,usb-drive,usd-circle,usd-square,user,user-alien,user-alt,user-alt-slash,user-astronaut,user-chart,user-check,user-circle,user-clock,user-cog,user-cowboy,user-crown,user-edit,user-friends,user-graduate,user-hard-hat,user-headset,user-injured,user-lock,user-md,user-md-chat,user-minus,user-music,user-ninja,user-nurse,user-plus,user-robot,user-secret,user-shield,user-slash,user-tag,user-tie,user-times,user-visor,users,users-class,users-cog,users-crown,users-medical,utensil-fork,utensil-knife,utensil-spoon,utensils,utensils-alt,vacuum,vacuum-robot,value-absolute,vector-square,venus,venus-double,venus-mars,vhs,vial,vials,video,video-plus,video-slash,vihara,violin,voicemail,volcano,volleyball-ball,volume,volume-down,volume-mute,volume-off,volume-slash,volume-up,vote-nay,vote-yea,vr-cardboard,wagon-covered,walker,walkie-talkie,walking,wallet,wand,wand-magic,warehouse,warehouse-alt,washer,watch,watch-calculator,watch-fitness,water,water-lower,water-rise,wave-sine,wave-square,wave-triangle,waveform,waveform-path,webcam,webcam-slash,weight,weight-hanging,whale,wheat,wheelchair,whistle,wifi,wifi-1,wifi-2,wifi-slash,wind,wind-turbine,wind-warning,window,window-alt,window-close,window-frame,window-frame-open,window-maximize,window-minimize,window-restore,windsock,wine-bottle,wine-glass,wine-glass-alt,won-sign,wreath,wrench,x-ray,yen-sign,yin-yang,b 500px,b accessible-icon,b accusoft,b acquisitions-incorporated,b adn,b adobe,b adversal,b affiliatetheme,b airbnb,b algolia,b alipay,b amazon,b amazon-pay,b amilia,b android,b angellist,b angrycreative,b angular,b app-store,b app-store-ios,b apper,b apple,b apple-pay,b artstation,b asymmetrik,b atlassian,b audible,b autoprefixer,b avianex,b aviato,b aws,b bandcamp,b battle-net,b behance,b behance-square,b bimobject,b bitbucket,b bitcoin,b bity,b black-tie,b blackberry,b blogger,b blogger-b,b bluetooth,b bluetooth-b,b bootstrap,b btc,b buffer,b buromobelexperte,b buy-n-large,b buysellads,b canadian-maple-leaf,b cc-amazon-pay,b cc-amex,b cc-apple-pay,b cc-diners-club,b cc-discover,b cc-jcb,b cc-mastercard,b cc-paypal,b cc-stripe,b cc-visa,b centercode,b centos,b chrome,b chromecast,b cloudscale,b cloudsmith,b cloudversify,b codepen,b codiepie,b confluence,b connectdevelop,b contao,b cotton-bureau,b cpanel,b creative-commons,b creative-commons-by,b creative-commons-nc,b creative-commons-nc-eu,b creative-commons-nc-jp,b creative-commons-nd,b creative-commons-pd,b creative-commons-pd-alt,b creative-commons-remix,b creative-commons-sa,b creative-commons-sampling,b creative-commons-sampling-plus,b creative-commons-share,b creative-commons-zero,b critical-role,b css3,b css3-alt,b cuttlefish,b d-and-d,b d-and-d-beyond,b dashcube,b delicious,b deploydog,b deskpro,b dev,b deviantart,b dhl,b diaspora,b digg,b digital-ocean,b discord,b discourse,b dochub,b docker,b draft2digital,b dribbble,b dribbble-square,b dropbox,b drupal,b dyalog,b earlybirds,b ebay,b edge,b elementor,b ello,b ember,b empire,b envira,b erlang,b ethereum,b etsy,b evernote,b expeditedssl,b facebook,b facebook-f,b facebook-messenger,b facebook-square,b fantasy-flight-games,b fedex,b fedora,b figma,b firefox,b firefox-browser,b first-order,b first-order-alt,b firstdraft,b flickr,b flipboard,b fly,b font-awesome,b font-awesome-alt,b font-awesome-flag,b fonticons,b fonticons-fi,b fort-awesome,b fort-awesome-alt,b forumbee,b foursquare,b free-code-camp,b freebsd,b fulcrum,b galactic-republic,b galactic-senate,b get-pocket,b gg,b gg-circle,b git,b git-alt,b git-square,b github,b github-alt,b github-square,b gitkraken,b gitlab,b gitter,b glide,b glide-g,b gofore,b goodreads,b goodreads-g,b google,b google-drive,b google-play,b google-plus,b google-plus-g,b google-plus-square,b google-wallet,b gratipay,b grav,b gripfire,b grunt,b gulp,b hacker-news,b hacker-news-square,b hackerrank,b hips,b hire-a-helper,b hooli,b hornbill,b hotjar,b houzz,b html5,b hubspot,b ideal,b imdb,b instagram,b intercom,b internet-explorer,b invision,b ioxhost,b itch-io,b itunes,b itunes-note,b java,b jedi-order,b jenkins,b jira,b joget,b joomla,b js,b js-square,b jsfiddle,b kaggle,b keybase,b keycdn,b kickstarter,b kickstarter-k,b korvue,b laravel,b lastfm,b lastfm-square,b leanpub,b less,b line,b linkedin,b linkedin-in,b linode,b linux,b lyft,b magento,b mailchimp,b mandalorian,b markdown,b mastodon,b maxcdn,b mdb,b medapps,b medium,b medium-m,b medrt,b meetup,b megaport,b mendeley,b microblog,b microsoft,b mix,b mixcloud,b mizuni,b modx,b monero,b napster,b neos,b nimblr,b node,b node-js,b npm,b ns8,b nutritionix,b odnoklassniki,b odnoklassniki-square,b old-republic,b opencart,b openid,b opera,b optin-monster,b orcid,b osi,b page4,b pagelines,b palfed,b patreon,b paypal,b penny-arcade,b periscope,b phabricator,b phoenix-framework,b phoenix-squadron,b php,b pied-piper,b pied-piper-alt,b pied-piper-hat,b pied-piper-pp,b pied-piper-square,b pinterest,b pinterest-p,b pinterest-square,b playstation,b product-hunt,b pushed,b python,b qq,b quinscape,b quora,b r-project,b raspberry-pi,b ravelry,b react,b reacteurope,b readme,b rebel,b red-river,b reddit,b reddit-alien,b reddit-square,b redhat,b renren,b replyd,b researchgate,b resolving,b rev,b rocketchat,b rockrms,b safari,b salesforce,b sass,b schlix,b scribd,b searchengin,b sellcast,b sellsy,b servicestack,b shirtsinbulk,b shopware,b simplybuilt,b sistrix,b sith,b sketch,b skyatlas,b skype,b slack,b slack-hash,b slideshare,b snapchat,b snapchat-ghost,b snapchat-square,b soundcloud,b sourcetree,b speakap,b speaker-deck,b spotify,b squarespace,b stack-exchange,b stack-overflow,b stackpath,b staylinked,b steam,b steam-square,b steam-symbol,b sticker-mule,b strava,b stripe,b stripe-s,b studiovinari,b stumbleupon,b stumbleupon-circle,b superpowers,b supple,b suse,b swift,b symfony,b teamspeak,b telegram,b telegram-plane,b tencent-weibo,b the-red-yeti,b themeco,b themeisle,b think-peaks,b trade-federation,b trello,b tripadvisor,b tumblr,b tumblr-square,b twitch,b twitter,b twitter-square,b typo3,b uber,b ubuntu,b uikit,b umbraco,b uniregistry,b unity,b untappd,b ups,b usb,b usps,b ussunnah,b vaadin,b viacoin,b viadeo,b viadeo-square,b viber,b vimeo,b vimeo-square,b vimeo-v,b vine,b vk,b vnv,b vuejs,b waze,b weebly,b weibo,b weixin,b whatsapp,b whatsapp-square,b whmcs,b wikipedia-w,b windows,b wix,b wizards-of-the-coast,b wolf-pack-battalion,b wordpress,b wordpress-simple,b wpbeginner,b wpexplorer,b wpforms,b wpressr,b xbox,b xing,b xing-square,b y-combinator,b yahoo,b yammer,b yandex,b yandex-international,b yarn,b yelp,b yoast,b youtube,b youtube-square,b zhihu'.split(',');

	var cls = 'ui-faicons';
	var cls2 = '.' + cls;
	var template = '<span data-search="{0}"><i class="{1}"></i></span>';
	var events = {};
	var container;
	var is = false;
	var ispro = false;
	var cachekey;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile();

	self.redraw = function() {
		self.html('<div class="{0}"><div class="{0}-header"><div class="{0}-search"><span><i class="fa fa-search clearsearch"></i></span><div><input type="text" placeholder="{1}" class="{0}-search-input"></div></div></div><div class="{0}-content noscrollbar"></div></div>'.format(cls, config.search));
		container = self.find(cls2 + '-content');
	};

	self.rendericons = function(empty) {

		var key = empty ? '1' : '0';
		if (cachekey === key)
			return;

		cachekey = key;
		var builder = [];

		empty && builder.push(template.format('', ''));

		var arr = ispro ? iconspro : icons;
		for (var i = 0; i < arr.length; i++)
			builder.push(template.format(arr[i].replace(/^.*?-/, '').replace(/-/g, ' ').toSearch(), arr[i]));
		self.find(cls2 + '-content').html(builder.join(''));
	};

	self.search = function(value) {

		var search = self.find('.clearsearch');
		search.rclass2('fa-');

		if (!value.length) {
			search.aclass('fa-search');
			container.find('.hidden').rclass('hidden');
			return;
		}

		value = value.toSearch();
		search.aclass('fa-times');
		container[0].scrollTop = 0;
		var icons = container.find('span');
		for (var i = 0; i < icons.length; i++) {
			var el = $(icons[i]);
			el.tclass('hidden', el.attrd('search').indexOf(value) === -1);
		}
	};

	self.make = function() {

		var links = $(document.head).find('link');
		for (var i = 0; i < links.length; i++) {
			var href = links[i].getAttribute('href');
			if (href.indexOf('pro.css') !== -1) {
				ispro = true;
				break;
			}
		}

		var txt = ' fa-';

		if (ispro) {
			var tmp = [];
			for (var i = 0; i < iconspro.length; i++) {
				var icon = iconspro[i];
				if (icon.charAt(1) === ' ') {
					tmp.push('fa' + icon.replace(' ', txt));
				} else {
					tmp.push('fas fa-' + icon.replace(' ', txt));
					tmp.push('far fa-' + icon.replace(' ', txt));
					tmp.push('fal fa-' + icon.replace(' ', txt));
					tmp.push('fad fa-' + icon.replace(' ', txt));
				}
			}
			iconspro = tmp;
			icons = null;
		} else {
			iconspro = null;
			for (var i = 0; i < icons.length; i++) {
				var icon = icons[i];
				if (icon.charAt(1) === ' ')
					icons[i] = 'fa' + icon.replace(' ', txt);
				else
					icons[i] = 'fa fa-' + icons[i];
			}
		}

		self.aclass(cls + '-container hidden');

		self.event('keydown', 'input', function() {
			var t = this;
			setTimeout2(self.ID, function() {
				self.search(t.value);
			}, 300);
		});

		self.event('click', '.fa-times', function() {
			self.find('input').val('');
			self.search('');
		});

		self.event('click', cls2 + '-content span', function() {
			self.opt.callback && self.opt.callback($(this).find('i').attr('class'));
			self.hide();
		});

		events.click = function(e) {
			var el = e.target;
			var parent = self.dom;
			do {
				if (el == parent)
					return;
				el = el.parentNode;
			} while (el);
			self.hide();
		};

		self.on('reflow + scroll + resize', self.hide);
		self.redraw();
	};

	self.bindevents = function() {
		if (!events.is) {
			events.is = true;
			$(document).on('click', events.click);
		}
	};

	self.unbindevents = function() {
		if (events.is) {
			events.is = false;
			$(document).off('click', events.click);
		}
	};

	self.show = function(opt) {

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		var search = self.find(cls2 + '-search-input');
		search.val('');
		self.find('.clearsearch').rclass2('fa-').aclass('fa-search');

		self.target = tmp;
		self.opt = opt;
		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.css(css);
		} else
			self.rclass('hidden');

		var target = $(opt.element);
		var w = self.element.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		is = true;
		self.rendericons(opt.empty);
		var scrollarea = self.find('.noscrollbar').noscrollbar();
		self.css(css);
		if (opt.scrolltop == null || opt.scrolltop)
			scrollarea[0].scrollTop = 0;
		search.focus();
		setTimeout(self.bindevents, 50);
		clearTimeout2(self.ID);
	};

	self.clear = function() {
		container.empty();
		cachekey = null;
	};

	self.hide = function() {
		is = false;
		self.target = null;
		self.opt = null;
		self.unbindevents();
		self.aclass('hidden');
		container.find('.hidden').rclass('hidden');
		setTimeout2(self.ID, self.clear, 1000 * 10);
	};
});

COMPONENT('viewbox', 'margin:0;scroll:true;delay:100;scrollbar:0;visibleY:1;height:100;invisible:1', function(self, config, cls) {

	var eld, elb;
	var scrollbar;
	var cls2 = '.' + cls;
	var init = false;
	var cache;
	var scrolltoforce;

	self.readonly();

	self.init = function() {

		var resize = function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'viewbox' && com.dom.offsetParent && com.$ready && !com.$removed)
					com.resizeforce();
			}
		};

		ON('resize2', function() {
			setTimeout2('viewboxresize', resize, 200);
		});
	};

	self.destroy = function() {
		scrollbar && scrollbar.destroy();
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				eld.tclass('hidden', !value);
				break;
			case 'minheight':
			case 'margin':
			case 'marginxs':
			case 'marginsm':
			case 'marginmd':
			case 'marginlg':
				!init && self.resize();
				break;
			case 'selector': // backward compatibility
				config.parent = value;
				self.resize();
				break;
		}
	};

	self.scrollbottom = function(val) {
		if (val == null)
			return elb[0].scrollTop;
		elb[0].scrollTop = (elb[0].scrollHeight - self.dom.clientHeight) - (val || 0);
		return elb[0].scrollTop;
	};

	self.scrolltop = function(val) {
		if (val == null)
			return elb[0].scrollTop;
		elb[0].scrollTop = (val || 0);
		return elb[0].scrollTop;
	};

	self.make = function() {
		config.invisible && self.aclass('invisible');
		config.scroll && MAIN.version > 17 && self.element.wrapInner('<div class="' + cls + '-body"></div>');
		self.element.prepend('<div class="' + cls + '-disabled hidden"></div>');
		eld = self.find('> .{0}-disabled'.format(cls)).eq(0);
		elb = self.find('> .{0}-body'.format(cls)).eq(0);
		self.aclass('{0} {0}-hidden'.format(cls));
		if (config.scroll) {
			if (config.scrollbar) {
				if (MAIN.version > 17) {
					scrollbar = W.SCROLLBAR(self.find(cls2 + '-body'), { shadow: config.scrollbarshadow, visibleY: config.visibleY, visibleX: config.visibleX, orientation: config.visibleX ? null : 'y', parent: self.element });
					self.scrolltop = scrollbar.scrollTop;
					self.scrollbottom = scrollbar.scrollBottom;
				} else
					self.aclass(cls + '-scroll');
			} else {
				self.aclass(cls + '-scroll');
				self.find(cls2 + '-body').aclass('noscrollbar');
			}
		}
		self.resize();
	};

	self.released = function(is) {
		!is && self.resize();
	};

	var css = {};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 200);
	};

	self.resizeforce = function() {

		var el = self.parent(config.parent);
		var h = el.height();
		var w = el.width();
		var width = WIDTH();
		var mywidth = self.element.width();

		var key = width + 'x' + mywidth + 'x' + w + 'x' + h;
		if (cache === key) {
			scrollbar && scrollbar.resize();
			if (scrolltoforce) {
				if (scrolltoforce ==='bottom')
					self.scrollbottom(0);
				else
					self.scrolltop(0);
				scrolltoforce = null;
			}
			return;
		}

		cache = key;

		var margin = config.margin;
		var responsivemargin = config['margin' + width];

		if (responsivemargin != null)
			margin = responsivemargin;

		if (margin === 'auto')
			margin = self.element.offset().top;

		if (h === 0 || w === 0) {
			self.$waiting && clearTimeout(self.$waiting);
			self.$waiting = setTimeout(self.resize, 234);
			return;
		}

		h = ((h / 100) * config.height) - margin;

		if (config.minheight && h < config.minheight)
			h = config.minheight;

		css.height = h;
		css.width = mywidth;
		eld.css(css);

		css.width = null;
		self.css(css);
		elb.length && elb.css(css);
		self.element.SETTER('*', 'resize');
		var c = cls + '-hidden';
		self.hclass(c) && self.rclass(c, 100);
		scrollbar && scrollbar.resize();

		if (scrolltoforce) {
			if (scrolltoforce ==='bottom')
				self.scrollbottom(0);
			else
				self.scrolltop(0);
			scrolltoforce = null;
		}

		if (!init) {
			self.rclass('invisible', 250);
			init = true;
		}
	};

	self.resizescrollbar = function() {
		scrollbar && scrollbar.resize();
	};

	self.setter = function() {
		scrolltoforce = config.scrollto || config.scrolltop;
		if (scrolltoforce) {
			if (scrolltoforce ==='bottom')
				self.scrollbottom(0);
			else
				self.scrolltop(0);
			scrolltoforce = null;
		}
		setTimeout(self.resize, config.delay, scrolltoforce);
	};
});

COMPONENT('datepicker', 'today:Set today;firstday:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var skip = false;
	var visible = false;
	var current;
	var elyears, elmonths, elbody;

	self.days = EMPTYARRAY;
	self.days_short = EMPTYARRAY;
	self.months = EMPTYARRAY;
	self.months_short = EMPTYARRAY;
	self.years_from;
	self.years_to;

	self.singleton();
	self.readonly();
	self.nocompile();

	self.configure = function(key, value) {
		switch (key) {
			case 'days':

				if (value instanceof Array)
					self.days = value;
				else
					self.days = value.split(',').trim();

				self.days_short = [];

				for (var i = 0; i < DAYS.length; i++) {
					DAYS[i] = self.days[i];
					self.days_short[i] = DAYS[i].substring(0, 2).toUpperCase();
				}

				break;

			case 'months':
				if (value instanceof Array)
					self.months = value;
				else
					self.months = value.split(',').trim();

				self.months_short = [];

				for (var i = 0, length = self.months.length; i < length; i++) {
					var m = self.months[i];
					MONTHS[i] = m;
					if (m.length > 4)
						m = m.substring(0, 3) + '.';
					self.months_short.push(m);
				}
				break;

			case 'yearfrom':
				if (value.indexOf('current') !== -1)
					self.years_from = +(NOW.format('yyyy'));
				else
					self.years_from = +(NOW.add(value).format('yyyy'));
				break;

			case 'yearto':
				if (value.indexOf('current') !== -1)
					self.years_to = +(NOW.format('yyyy'));
				else
					self.years_to = +(NOW.add(value).format('yyyy'));
				break;
		}
	};

	function getMonthDays(dt) {

		var m = dt.getMonth();
		var y = dt.getFullYear();

		if (m === -1) {
			m = 11;
			y--;
		}

		return (32 - new Date(y, m, 32).getDate());
	}

	self.calculate = function(year, month, selected) {

		var d = new Date(year, month, 1, 12, 0);
		var output = { header: [], days: [], month: month, year: year };
		var firstday = config.firstday;
		var firstcount = 0;
		var frm = d.getDay() - firstday;
		var today = NOW;
		var ty = today.getFullYear();
		var tm = today.getMonth();
		var td = today.getDate();
		var sy = selected ? selected.getFullYear() : -1;
		var sm = selected ? selected.getMonth() : -1;
		var sd = selected ? selected.getDate() : -1;
		var days = getMonthDays(d);

		if (frm < 0)
			frm = 7 + frm;

		while (firstcount++ < 7) {
			output.header.push({ index: firstday, name: self.days_short[firstday] });
			firstday++;
			if (firstday > 6)
				firstday = 0;
		}

		var index = 0;
		var indexEmpty = 0;
		var count = 0;
		var prev = getMonthDays(new Date(year, month - 1, 1, 12, 0)) - frm;
		var cur;

		for (var i = 0; i < days + frm; i++) {

			var obj = { today: false, selected: false, empty: false, future: false, number: 0, index: ++count };

			if (i >= frm) {
				obj.number = ++index;
				obj.selected = sy === year && sm === month && sd === index;
				obj.today = ty === year && tm === month && td === index;
				obj.future = ty < year;
				if (!obj.future && year === ty) {
					if (tm < month)
						obj.future = true;
					else if (tm === month)
						obj.future = td < index;
				}

			} else {
				indexEmpty++;
				obj.number = prev + indexEmpty;
				obj.empty = true;
				cur = d.add('-' + indexEmpty + ' days');
			}

			if (!obj.empty)
				cur = d.add(i + ' days');

			obj.month = i >= frm && obj.number <= days ? d.getMonth() : cur.getMonth();
			obj.year = i >= frm && obj.number <= days ? d.getFullYear() : cur.getFullYear();
			obj.date = cur;
			output.days.push(obj);
		}

		indexEmpty = 0;

		for (var i = count; i < 42; i++) {
			var cur = d.add(i + ' days');
			var obj = { today: false, selected: false, empty: true, future: true, number: ++indexEmpty, index: ++count };
			obj.month = cur.getMonth();
			obj.year = cur.getFullYear();
			obj.date = cur;
			output.days.push(obj);
		}

		return output;
	};

	self.hide = function() {
		if (visible) {
			self.unbindevents();
			self.opt.close && self.opt.close();
			self.opt = null;
			self.older = null;
			self.target = null;
			self.aclass('hidden');
			self.rclass(cls + '-visible');
			visible = false;
		}
		return self;
	};

	self.show = function(opt) {

		setTimeout(function() {
			clearTimeout2('datepickerhide');
		}, 5);

		var el = $(opt.element);
		var dom = el[0];

		if (self.target === dom) {
			self.hide();
			return;
		}

		if (self.opt && self.opt.close)
			self.opt.close();

		var off = el.offset();
		var w = el.innerWidth();
		var h = el.innerHeight();
		var l = 0;
		var t = 0;
		var height = 305 + (opt.cancel ? 25 : 0);
		var s = 250;

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					l = Math.ceil((off.left - s / 2) + (w / 2));
					break;
				case 'right':
					l = (off.left + w) - s;
					break;
				default:
					l = off.left;
					break;
			}

			t = opt.position === 'bottom' ? (off.top - height) : (off.top + h + 12);
		}

		if (opt.offsetX)
			l += opt.offsetX;

		if (opt.offsetY)
			t += opt.offsetY;

		if (l + s > WW)
			l = (l + w) - s;

		if (t + height > WH)
			t = (t + h) - height;

		var dt = typeof(opt.value) === 'string' ? GET(opt.value) : opt.value;
		if ((!(dt instanceof Date)) || isNaN(dt.getTime()))
			dt = NOW;

		opt.scope = M.scope ? M.scope() : '';
		self.opt = opt;
		self.time = dt.format('HH:mm:ss');
		self.css({ left: l, top: t });
		self.rclass('hidden');
		self.date(dt);
		self.aclass(cls + '-visible', 50);
		self.bindevents();
		self.target = dom;
		visible = true;
	};

	self.setdate = function(dt) {

		var time = self.time.split(':');

		if (time.length > 1) {
			dt.setHours(+(time[0] || '0'));
			dt.setMinutes(+(time[1] || '0'));
			dt.setSeconds(+(time[2] || '0'));
		}

		self.opt.scope && M.scope(self.opt.scope);

		if (typeof(self.opt.value) === 'string')
			SET2(self.opt.value, dt);
		else
			self.opt.callback(dt);
	};

	self.make = function() {

		self.aclass(cls + ' hidden');

		var conf = {};
		var reconfigure = false;

		if (!config.days) {
			conf.days = [];
			for (var i = 0; i < DAYS.length; i++)
				conf.days.push(DAYS[i]);
			reconfigure = true;
		}

		if (!config.months) {
			conf.months = MONTHS;
			reconfigure = true;
		}

		reconfigure && self.reconfigure(conf);
		W.$datepicker = self;

		self.event('click', function(e) {
			e.stopPropagation();
		});

		var hide = function() {
			visible && W.$datepicker && W.$datepicker.hide();
		};

		var hide2 = function() {
			visible && setTimeout2('datepickerhide', function() {
				W.$datepicker && W.$datepicker.hide();
			}, 20);
		};

		self.bindevents = function() {
			if (!visible)
				$(W).on('scroll click', hide2);
		};

		self.unbindevents = function() {
			if (visible)
				$(W).off('scroll click', hide2);
		};

		self.on('reflow + scroll + resize + resize2', hide);
	};

	self.makehtml = function() {
		var builder = [];
		builder.push('<div class="{0}-header"><span class="{0}-next"><i class="fa fa-angle-right"></i></span><span class="{0}-prev"><i class="fa fa-angle-left"></i></span><div class="{0}-info"><span class="{0}-month">---</span><span class="{0}-year">---</span></div></div><div class="{0}-years hidden"></div><div class="{0}-months"></div><div class="{0}-body hidden"><div class="{0}-week">'.format(cls));
		for (var i = 0; i < 7; i++)
			builder.push('<div></div>');
		builder.push('</div><div class="{0}-days">'.format(cls));

		for (var i = 0; i < 42; i++)
			builder.push('<div class="{0}-date"><div></div></div>'.format(cls, i));
		builder.push('</div></div><div class="{0}-footer"><span class="{0}-now">{2}</span></div>'.format(cls, config.close, config.today));
		self.html(builder.join(''));

		builder = [];
		elbody = self.find(cls2 + '-body');
		elmonths = self.find(cls2 + '-months');
		for (var i = 0; i < 12; i++)
			builder.push('<div class="{0}-month" data-index="{1}"><div></div></div>'.format(cls, i));
		elmonths.html(builder.join(''));

		builder = [];
		elyears = self.find(cls2 + '-years');
		for (var i = 0; i < 25; i++)
			builder.push('<div class="{0}-year"><div></div></div>'.format(cls));
		elyears.html(builder.join(''));

		self.makehtml = null;

		self.find(cls2 + '-month').on('click', function(e) {

			var el = $(this);
			var index = el.attrd('index');
			var h = 'hidden';

			if (index) {
				current.setMonth(+index);
				self.date(current, true);
			} else if (!elmonths.hclass(h))
				index = 1;

			elyears.aclass(h);

			if (index)
				elmonths.aclass(h);
			else {
				elmonths.find(cls2 + '-today').rclass(cls + '-today');
				elmonths.find(cls2 + '-month').eq(current.getMonth()).aclass(cls + '-today');
				elmonths.rclass(h);
			}

			elbody.tclass(h, !elmonths.hclass(h));
			e.preventDefault();
			e.stopPropagation();

		});

		self.find(cls2 + '-year').on('click', function(e) {
			var el = $(this);
			var year = el.attrd('year');
			var h = 'hidden';

			if (year) {
				current.setFullYear(+year);
				self.date(current, true);
			} else if (!elyears.hclass(h))
				year = 1;

			elmonths.aclass(h);

			if (year)
				elyears.aclass(h);
			else {
				self.years();
				elyears.rclass(h);
			}

			elbody.tclass(h, !elyears.hclass(h));
			e.preventDefault();
			e.stopPropagation();
		});

		self.years = function() {
			var dom = self.find(cls2 + '-years').find(cls2 + '-year');
			var year = current.getFullYear();
			var index = 12;
			for (var i = 0; i < 25; i++) {
				var val = year - (index--);
				$(dom[i]).tclass(cls + '-today', val === year).attrd('year', val).find('div')[0].innerHTML = val;
			}
		};

		self.find(cls2 + '-date').on('click', function() {
			var dt = $(this).attrd('date').split('-');
			self.setdate(new Date(+dt[0], +dt[1], +dt[2], 12, 0, 0));
			self.hide();
		});

		self.find(cls2 + '-now').on('click', function() {
			self.setdate(new Date());
			self.hide();
		});

		self.find(cls2 + '-next').on('click', function(e) {

			if (elyears.hclass('hidden')) {
				current.setMonth(current.getMonth() + 1);
				self.date(current, true);
			} else {
				current.setFullYear(current.getFullYear() + 25);
				self.years();
			}

			e.preventDefault();
			e.stopPropagation();
		});

		self.find(cls2 + '-prev').on('click', function(e) {

			if (elyears.hclass('hidden')) {
				current.setMonth(current.getMonth() - 1);
				self.date(current, true);
			} else {
				current.setFullYear(current.getFullYear() - 25);
				self.years();
			}

			e.preventDefault();
			e.stopPropagation();
		});
	};

	self.date = function(value, skipday) {

		var clssel = cls + '-selected';

		self.makehtml && self.makehtml();

		if (typeof(value) === 'string')
			value = value.parseDate();

		var year = value == null ? null : value.getFullYear();
		if (year && (year < self.years_from || year > self.years_to))
			return;

		if (!value || isNaN(value.getTime())) {
			self.find('.' + clssel).rclass(clssel);
			value = NOW;
		}

		var empty = !value;

		if (skipday) {
			skipday = false;
			empty = true;
		}

		if (skip) {
			skip = false;
			return;
		}

		value = new Date((value || NOW).getTime());

		var output = self.calculate(value.getFullYear(), value.getMonth(), value);
		var dom = self.find(cls2 + '-date');

		self.find(cls2 + '-body').rclass('hidden');
		self.find(cls2 + '-months,' + cls2 + '-years').aclass('hidden');

		current = value;

		for (var i = 0; i < 42; i++) {

			var item = output.days[i];
			var classes = [cls + '-date'];

			if (item.empty)
				classes.push(cls + '-disabled');

			if (!empty && item.selected)
				classes.push(cls + '-selected');

			if (item.today)
				classes.push(cls + '-day-today');

			var el = $(dom[i]);
			el.attrd('date', item.year + '-' + item.month + '-' + item.number);
			el.find('div').html(item.number);
			el.find('i').remove();
			el.rclass().aclass(classes.join(' '));
		}

		if (!skipday) {

			dom = self.find(cls2 + '-week').find('div');
			for (var i = 0; i < 7; i++)
				dom[i].innerHTML = output.header[i].name;

			dom = self.find(cls2 + '-months').find(cls2 + '-month');
			for (var i = 0; i < 12; i++)
				$(dom[i]).find('div').attrd('index', i)[0].innerHTML = self.months_short[i];
		}

		self.opt.badges && self.opt.badges(current, function(date) {

			if (!(date instanceof Array))
				date = [date];

			for (var i = 0; i < date.length; i++) {
				var dt = date[i].getFullYear() + '-' + date[i].getMonth() + '-' + date[i].getDate();
				var el = self.find(cls2 + '-date[data-date="{0}"]'.format(dt));
				if (el.length && !el.find('i').length)
					el.append('<i class="fa fa-circle"></i>');
			}

		});

		var info = self.find(cls2 + '-info');
		info.find(cls2 + '-month').html(self.months[current.getMonth()]);
		info.find(cls2 + '-year').html(current.getFullYear());

	};
});

COMPONENT('stats24', 'height:120;tooltiplarge:0;tooltip:1;tooltiptext:{0};border:1', function(self, config, cls) {

	var old = '';
	var bars = [];
	var binded = false;
	var cls2 = '.' + cls;
	var smallsize = false;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.aclass(cls);

		var builder = [];
		for (var i = 0; i < 24; i++)
			builder.push('<div class="{0}-bar"><div><span></span></div><span>{1}</span></div>'.format(cls, i));

		self.append('<div class="ui-stats24-body"><div class="{0}-container hidden">{1}</div></div>'.format(cls, builder.join('')));
		self.find(cls2 + '-bar').each(function() {
			bars.push($(this).find('div').eq(0));
		});

		self.event('mouseenter touchstart', cls2 + '-bar', function() {
			if ((smallsize && config.tooltip) || (!smallsize && config.tooltiplarge && config.tooltip)) {
				var opt = {};
				var val = self.get();
				opt.element = $(this);
				var index = opt.element.index();
				var toindex = index + 1;
				if (toindex === 24)
					toindex = 0;
				opt.html = '<b>' + config.tooltiptext.format(val[index] || 0).format(0) + '</b><br /><i class="far fa-clock"></i> ' + index.padLeft(2, '0') + ':00 - ' + (toindex).padLeft(2, '0') + ':00';
				opt.align = 'bottom';
				opt.timeout = 2000;
				SETTER('tooltip', 'show', opt);
			}
		});
	};

	self.configure = function(key, value) {
		if (key === 'border')
			self.tclass(cls + '-border', !!value);
	};

	self.setter = function(value) {

		var sum = value ? value.join(',') : '';
		if (sum === old)
			return;

		var container = self.find(cls2 + '-container');

		if (!binded) {
			container.rclass('hidden');
			binded = true;
		}

		container.css('height', config.height);

		self.width(function(width) {

			old = sum;
			var max = config.max;

			smallsize = width < 400;
			self.tclass(cls + '-smallsize', smallsize);

			if (!max) {
				max = 0;
				for (var i = 0; i < 24; i++) {
					if (value[i] > max)
						max = value[i];
				}
			}

			for (var i = 0; i < 24; i++) {

				var num = value[i];

				if (num > max)
					num = max;

				var p = (num / max) * 100;

				if (isNaN(p))
					p = 0;

				var h = ((config.height / 100) * p) - (smallsize ? 2 : 17);
				if (h < 18)
					h = 18;

				if (smallsize && h === 18)
					h = 5;

				var val = value[i];
				if (val > 1000)
					val = (val / 1000).floor(1) + ' K';

				bars[i].css('height', h + 'px').tclass('online', value[i] > 0).find('span').html(smallsize ? '' : val);
			}
		});
	};
});

COMPONENT('statsbarsimple', 'tooltip:1;animate:1;value:value;colors:#2e67c5,#83c83c,#cccb41,#b9261a,#b92ec5,#bd6b27,#808080', function(self, config, cls) {

	var cls2 = '.' + cls;
	var templatetooltip, container, items;
	var sum, old;

	self.readonly();
	self.nocompile();

	self.make = function() {

		self.find('script').each(function(index) {
			var ta =  Tangular.compile(this.innerHTML);
			if (index)
				templatetooltip = ta;
			else
				self.template = ta;
		});

		if (!templatetooltip)
			templatetooltip = self.template;

		self.aclass(cls);
		self.append('<div class="{0}-table"></div>'.format(cls));

		config.tooltip && self.event('mouseenter touchstart', cls2 + '-bar', function() {
			var opt = {};
			opt.element = $(this);
			var index = +opt.element.attrd('index');
			var val = items[index];
			opt.html = templatetooltip(val);
			opt.align = 'bottom';
			opt.timeout = 2000;
			SETTER('tooltip', 'show', opt);
		});

		container = self.find(cls2 + '-table');
	};

	self.configure = function(key, value) {
		if (key === 'colors')
			config[key] = value.split(',');
	};

	self.setter = function(value) {

		if (!value) {
			container.empty();
			old = null;
			return;
		}

		var tmp = STRINGIFY(value, true);
		if (old == tmp)
			return;

		old = tmp;
		sum = 0;
		var builder = [];

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			sum += item[config.value];
		}

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			var p = !item[config.value] && !sum ? 0 : ((item[config.value] / sum) * 100).floor(1);
			item.percentage = p;
			builder.push(('<div style="width:' + (config.animate ? '100%' : '{4}') + ';background-color:{3}" class="{0}-bar" data-index="{4}" data-percentage="{2}"><span>{1}</span></div>').format(cls, self.template(item).trim(), sum === 0 ? (100 / value.length).floor(2) : p === 0 ? 5 : p, item.color || config.colors[i], i));
		}

		items = value;
		container.html(builder.join(''));

		var bars = self.find(cls2 + '-bar');

		if (config.animate) {
			bars.each(function(index) {
				var el = $(this);
				setTimeout(function(el) {
					el.animate({ width: +el.attrd('percentage') + '%' }, 200).aclass(cls + '-show');
				}, index * 100, el);
			});
		} else
			bars.aclass(cls + '-show');
	};
});

COMPONENT('importer', function(self, config) {

	var init = false;
	var clid = null;
	var pending = false;
	var content = '';

	self.readonly();

	self.make = function() {
		var scr = self.find('script');
		content = scr.length ? scr.html() : '';
	};

	self.reload = function(recompile) {
		config.reload && EXEC(config.reload);
		recompile && COMPILE();
		setTimeout(function() {
			pending = false;
			init = true;
		}, 1000);
	};

	self.setter = function(value) {

		if (pending)
			return;

		if (config.if !== value) {
			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);
			return;
		}

		pending = true;

		if (clid) {
			clearTimeout(clid);
			clid = null;
		}

		if (init) {
			self.reload();
			return;
		}

		if (content) {
			self.html(content);
			setTimeout(self.reload, 50, true);
		} else
			self.import(config.url, self.reload);
	};

	self.clean = function() {
		config.clean && EXEC(config.clean);
		setTimeout(function() {
			self.empty();
			init = false;
			clid = null;
		}, 1000);
	};
});

COMPONENT('tooltip', function(self, config, cls) {

	var is = false;
	var can = true;

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile && self.nocompile();

	self.enable = function() {
		can = true;
	};

	self.hideforce = function() {
		self.aclass('hidden');
		self.rclass(cls + '-visible');
		is = false;
	};

	self.make = function() {
		self.aclass(cls + ' hidden');
		self.on('scroll + resize + reflow + resize2', function() {
			self.hide(true);
			can = false;
			setTimeout2(self.ID + 'can', self.enable, 1000);
		});
	};

	self.hide = function(force) {
		is && setTimeout2(self.ID, self.hideforce, force ? 1 : 200);
	};

	self.show = function(opt) {

		if (!can)
			return;

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		clearTimeout2(self.ID);

		self.target = tmp;
		self.opt = opt;
		self.html('<div class="' + cls + '-body">' + opt.html + '</div>');

		var b = self.find('.' + cls + '-body');
		b.rclass2(cls + '-arrow-');
		b.aclass(cls + '-arrow-' + opt.align);

		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else {
			self.rclass('hidden');
			self.aclass(cls + '-visible', 100);
			is = true;
		}

		var target = $(opt.element);
		var w = self.width();
		var h = self.height();
		var offset = target.offset();

		switch (opt.align) {
			case 'left':
			case 'right':
				css.top = offset.top + (opt.center ? (h / 2 >> 0) : 0);
				css.left = opt.align === 'left' ? (offset.left - w - 10) : (offset.left + target.innerWidth() + 10);
				break;
			default:
				css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
				css.top = opt.align === 'bottom' ? (offset.top + target.innerHeight() + 10) : (offset.top - h - 10);
				break;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		opt.timeout && setTimeout2(self.ID, self.hide, opt.timeout - 200);
		self.element.css(css);
	};

});

COMPONENT('avatar', function(self) {

	var backgrounds = '#1abc9c,#2ecc71,#3498db,#9b59b6,#34495e,#16a085,#2980b9,#8e44ad,#2c3e50,#f1c40f,#e67e22,#e74c3c,#d35400,#c0392b'.split(',');
	var themes = {};

	self.readonly();
	self.singleton();

	window.avatarerror = function(image) {
		var img = $(image);
		var el = img.parent()[0];
		el.$avatar = false;
		el.$avatarerror = true;
		el = $(el);
		el.attr('title', img.attr('title'));
		self.create(el);
	};

	self.rebind = function(el) {
		var jq = el ? el.find('.avatar') : $('.avatar');
		jq.each(function() {
			!this.$avatar && self.create($(this));
		});
	};

	self.create = function(el) {

		var theme = el.attrd('a') || el.attrd('avatar') || 'default';
		var options = themes[theme];
		if (!options)
			return false;

		var url = el.attrd('a-url') || el.attrd('avatar-url');
		var dom = el[0];
		var name = dom.$avatarerror ? el.attr('title') : el.text();

		dom.$avatar = true;

		if (dom.$avatarerror) {
			url = '';
		} else {
			var cls = el.attrd('a-class') || el.attrd('avatar-class') || options.class;
			cls && el.tclass(cls);
		}

		el.aclass('ui-avatar-theme-' + theme);

		if (url) {
			el.html('<img src="{0}" alt="{1}" title="{1}" border="0" onerror="avatarerror(this)" />'.format(url, name));
		} else {

			var arr = name.trim().split(' ');
			var initials = ((arr[0] || '').substring(0, 1) + (arr[1] || '').substring(0, 1)).toUpperCase();

			var css = {};
			var can = false;

			if (!options.background) {
				css.background = backgrounds[name.length % backgrounds.length];
				can = true;
			}

			if (!options.color) {
				can = true;
				css.color = self.colorize(backgrounds[name.length % backgrounds.length], options.lighten);
			}

			can && el.css(css);
			el.attr('title', name);
			el.html(initials);
		}
	};

	self.register = function(id, options) {
		options = options.parseConfig('lighten:80;size:50;radius:100;weight:bold;font:Arial');
		themes[id] = options;
		var builder = [];
		var name = '.ui-avatar-theme-' + id;
		builder.push('display:block;width:{0}px;height:{0}px;text-align:center;vertical-align:middle;font-style:normal;font-size:{1}px;line-height:{2}px'.format(options.size, Math.floor(options.size / 2.5), (options.size + Math.floor(options.size / 20))));
		options.radius && builder.push('border-radius:{0}px'.format(options.radius));
		options.weight && builder.push('font-weight:' + options.weight);
		options.font && builder.push('font-family:' + options.font);
		options.background && builder.push('background:' + options.background);
		options.weight && builder.push('font-weight:{0}'.format(options.weight));
		options.color && builder.push('color:' + options.color);
		var css = name + '{' + builder.join(';') + '}';
		builder = [];
		builder.push('width:{0}px;height:{0}px;'.format(options.size));
		options.radius && builder.push('border-radius:{0}px'.format(options.radius));
		css += '\n' + name + ' img{' + builder.join(';') + '}';
		CSS(css, 'avatar-' + id);
		setTimeout2(self.id + 'rebind', self.rebind, 100, 5);
	};

	self.refresh = self.rebind;

	self.make = function() {
		self.register('default', '');
		self.on('component', function(component) {
			setTimeout2(self._id, function() {
				component.element && self.rebind(component.element);
			}, 150);
		});
		setTimeout2(self._id + 'rebind', self.rebind, 100, 5);
	};

	// Thank to Chris Coyier (https://css-tricks.com/snippets/javascript/lighten-darken-color/)
	// LightenDarkenColor
	self.colorize = function(col, amt) {
		var pound = false;
		if (col[0] == '#') {
			col = col.slice(1);
			pound = true;
		}
		var num = parseInt(col,16);
		var r = (num >> 16) + amt;
		if (r > 255)
			r = 255;
		else if (r < 0) r = 0;
		var b = ((num >> 8) & 0x00FF) + amt;
		if (b > 255)
			b = 255;
		else if (b < 0)
			b = 0;
		var g = (num & 0x0000FF) + amt;
		if (g > 255)
			g = 255;
		else if (g < 0)
			g = 0;
		return (pound ? '#': '') + (g | (b << 8) | (r << 16)).toString(16);
	};
});

COMPONENT('colorpicker', function(self) {

	var cls = 'ui-colorpicker';
	var cls2 = '.' + cls;
	var is = false;
	var events = {};
	var colors = [['e73323', 'ec8632', 'fffd54', '7bfa4c', '7cfbfd', '041ef5', 'e73cf7', '73197b', '91683c', 'ffffff', '808080', '000000'],['ffffff', 'e8e8e8', 'd1d1d1', 'b9b9b9', 'a2a2a2', '8b8b8b', '747474', '5d5d5d', '464646', '2e2e2e', '171717', '000000'],['5c0e07', '5e350f', '66651c', '41641a', '2d6419', '2d6438', '2d6465', '133363', '000662', '2d0962', '5c1262', '5c0f32', '8a1a11', '8e501b', '99982f', '62962b', '47962a', '479654', '479798', '214d94', '010e93', '451393', '8a2094', '8a1c4c', 'b9261a', 'bd6b27', 'cccb41', '83c83c', '61c83b', '61c871', '62c9ca', '2e67c5', '0216c4', '5c1dc4', 'b92ec5', 'b92865', 'e73323', 'ec8632', 'fffd54', 'a4fb4e', '7bfa4c', '7bfa8d', '7cfbfd', '3b80f7', '041ef5', '7327f5', 'e73cf7', 'e7357f', 'e8483f', 'ef9d4b', 'fffe61', 'b4fb5c', '83fa5a', '83faa2', '83fbfd', '5599f8', '343cf5', '8c42f6', 'e84ff7', 'e84a97', 'ea706b', 'f2b573', 'fffe7e', 'c5fc7c', '96fa7a', '96fbb9', '96fcfd', '7bb2f9', '666af6', 'a76ef7', 'eb73f8', 'ea71b0', 'f6cecd', 'fae6cf', 'fffed1', 'ebfed1', 'd7fdd0', 'd7fde7', 'd8fefe', 'd1e5fd', 'cccdfb', 'e1cefb', 'f6cffc', 'f6cee4']];

	self.singleton();
	self.readonly();
	self.blind();
	self.nocompile();

	self.make = function() {

		var html = '';
		for (var i = 0; i < colors.length; i++) {
			html += '<div>';
			for (var j = 0; j < colors[i].length; j++) {
				html += '<span class="{0}-cell"><span style="background-color:#{1}"></span></span>'.format(cls, colors[i][j]);
			}
			html += '</div>';
		}

		self.html('<div class="{0}"><div class="{0}-body">{1}</div></div>'.format(cls, html));
		self.aclass(cls + '-container hidden');

		self.event('click', cls2 + '-cell', function() {
			var el = $(this);
			self.opt.callback && self.opt.callback(el.find('span').attr('style').replace('background-color:', ''));
			self.hide();
		});

		events.click = function(e) {
			var el = e.target;
			var parent = self.dom;
			do {
				if (el == parent)
					return;
				el = el.parentNode;
			} while (el);
			self.hide();
		};

		self.on('scroll + reflow', self.hide);
	};

	self.bindevents = function() {
		if (!events.is) {
			events.is = true;
			$(document).on('click', events.click);
		}
	};

	self.unbindevents = function() {
		if (events.is) {
			events.is = false;
			$(document).off('click', events.click);
		}
	};

	self.show = function(opt) {

		var tmp = opt.element ? opt.element instanceof jQuery ? opt.element[0] : opt.element.element ? opt.element.dom : opt.element : null;

		if (is && tmp && self.target === tmp) {
			self.hide();
			return;
		}

		events.is && self.unbindevents();
		self.target = tmp;
		self.opt = opt;
		var css = {};

		if (is) {
			css.left = 0;
			css.top = 0;
			self.element.css(css);
		} else
			self.rclass('hidden');

		var target = $(opt.element);
		var w = self.element.width();
		var offset = target.offset();

		if (opt.element) {
			switch (opt.align) {
				case 'center':
					css.left = Math.ceil((offset.left - w / 2) + (target.innerWidth() / 2));
					break;
				case 'right':
					css.left = (offset.left - w) + target.innerWidth();
					break;
				default:
					css.left = offset.left;
					break;
			}

			css.top = opt.position === 'bottom' ? (offset.top - self.element.height() - 10) : (offset.top + target.innerHeight() + 10);

		} else {
			css.left = opt.x;
			css.top = opt.y;
		}

		if (opt.offsetX)
			css.left += opt.offsetX;

		if (opt.offsetY)
			css.top += opt.offsetY;

		is = true;
		self.element.css(css);
		setTimeout(self.bindevents, 10);
	};

	self.hide = function() {
		if (is) {
			is = false;
			self.target = null;
			self.opt = null;
			setTimeout(self.unbindevents, 50);
			self.aclass('hidden');
		}
	};
});

COMPONENT('colorpickerbutton', 'default:#FFFFFF;align:left;position:top', function(self, config, cls) {

	var cls2 = '.' + cls;

	self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<span class="{0}-arrow"><i class="fa fa-angle-down"></i></span><div class="{0}-color"></div>'.format(cls));
		self.event('click', function() {
			if (config.disabled)
				return;
			var opt = {};
			opt.align = config.align;
			opt.position = config.position;
			opt.offsetX = config.offsetX;
			opt.offsetY = config.offsetY;
			opt.element = self.element;
			opt.callback = function(color) {
				self.set(color.toUpperCase());
				self.change(true);
			};
			SETTER('colorpicker', 'show', opt);
		});
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', !!value);
				break;
		}
	};

	self.setter = function(value) {
		self.find(cls2 + '-color').css('background-color', value || config.default);
	};
});

COMPONENT('mobilecarousel', 'count:1;selector:.col-sm-4;margin:15;snapping:true;animate:5000;marginwidth:0', function(self, config, cls) {

	var cls2 = '.' + cls;
	var width = 0;
	var count = 0;
	var index = 0;
	var increment = 1;
	var skip = false;
	var move = false;
	var anim;
	var container;
	var old;

	self.readonly();
	self.blind();

	self.make = function() {
		self.element.wrapInner('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		$(W).on('resize', self.resize);
		setTimeout(self.resize, 50);
		setTimeout(self.resize, 500);
		setTimeout(self.resize, 2000);
		CSS('.{3} .{3}-{0} {1}{margin:0 0 0 {2}px;padding:0;float:left;vertical-align:top;display:inline-block}.{3} .{3}-{0} {1}:first-child{margin-left:0}'.format(self.id, config.selector, config.margin, cls));
		container = self.find(cls2 + '-container').aclass(cls + '-' + self.id);
		config.snapping && container.on('scroll', function() {
			!skip && setTimeout2(self.id, self.snap, 200);
		}).on('touchmove', function() {
			clearTimeout(anim);
		});
		config.animate && (anim = setTimeout(self.animate, config.animate));
	};

	self.animate = function() {

		if (!count || move)
			return;

		index += increment;

		if (index === count - 1)
			increment = -1;
		else if (index === 0)
			increment = 1;

		skip = true;
		anim = true;
		container.animate({ scrollLeft: index * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
			anim = false;
		}, 400);

		anim = setTimeout(self.animate, 2000);
	};

	self.snap = function() {
		var x = container.prop('scrollLeft');
		var off = Math.round(x / width);
		skip = true;
		move = true;
		container.stop().animate({ scrollLeft: off * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
		}, 500);
	};

	self.resize = function() {

		if (WIDTH() !== 'xs') {

			if (old === '1')
				return;

			old = '1';
			count = 0;
			width = 0;
			self.rclass(cls);
			self.css('height', '');
			self.find(cls2 + '-body').css('width', '');
			self.find(config.selector).css('width', '');
			return;
		}

		self.aclass(cls);

		self.width(function(w) {

			var sum = 0;
			var height = 0;

			width = w / config.count;
			count = 0;

			self.find(config.selector).each(function(index) {
				var el = $(this);
				sum += width + (index ? 15 : 0);
				height = Math.max(el.innerHeight(), height);
				el.css('width', width);
				count++;
			});

			var k = sum + 'x' + height;
			if (old === k)
				return;

			old = k;
			self.css('height', (height >> 0) + 15);
			self.find(cls2 + '-body').css('width', sum);
		});
	};
});

COMPONENT('progress', 'animate:true', function(self, config, cls) {

	var container, old = null;

	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<div style="width:10%">0%</div>');
		container = self.find('div');
	};

	self.setter = function(value) {
		!value && (value = 0);
		if (old === value)
			return;

		if (value > 100)
			value = 100;
		else if (value < 0)
			value = 0;

		old = value >> 0;
		if (config.animate)
			container.stop().animate({ width: old + '%' }, 80).show();
		else
			container.css({ width: old + '%' });

		container.html(old + '%');
	};
});

COMPONENT('largeform', 'zindex:12;padding:30;scrollbar:1;scrolltop:1;style:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};
	var nav = false;
	var init = false;

	if (!W.$$largeform) {

		W.$$largeform_level = W.$$largeform_level || 1;
		W.$$largeform = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			setTimeout2(self.name, function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'largeform' && !HIDDEN(com.dom) && com.$ready && !com.$removed)
						com.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			if (e.target === this) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			var el = $(e.target);
			if (el.hclass(cls + '-container') && !el.hclass(cls + '-style-2')) {
				var form = el.find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c);
				setTimeout(function() {
					form.rclass(c);
				}, 300);
			}
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide, self.element);
		else
			self.hide();
	};

	self.cancel = function() {
		config.cancel && self.EXEC(config.cancel, self.hide);
		self.hide();
	};

	self.hide = function() {
		if (config.independent)
			self.hideforce();
		self.esc(false);
		self.set('');
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass(value.icon.indexOf(' ') === -1 ? ('fa fa-' + value.icon) : value.icon);
	};

	self.resize = function() {

		if (self.hclass('hidden'))
			return;

		var padding = isMOBILE ? 0 : config.padding;
		var ui = self.find(cls2);

		csspos.height = WH - (config.style == 1 ? (padding * 2) : padding);
		csspos.top = padding;
		ui.css(csspos);

		var el = self.find(cls2 + '-title');
		var th = el.height();
		var w = ui.width();

		if (w > WW)
			w = WW;

		csspos = { height: csspos.height - th, width: w };

		if (nav)
			csspos.height -= nav.height();

		self.find(cls2 + '-body').css(csspos);
		self.scrollbar && self.scrollbar.resize();
		self.element.SETTER('*', 'resize');
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}" style="max-width:{1}px"><div data-bind="@config__text span:value.title__change .{4}-icon:@icon" class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="fa fa-times"></i></button><i class="{4}-icon"></i><span></span></div><div class="{4}-body"></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		scr.length && scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body')[0];

		while (self.dom.children.length) {
			var child = self.dom.children[0];
			if (child.tagName === 'NAV') {
				nav = $(child);
				body.parentNode.appendChild(child);
			} else
				body.appendChild(child);
		}

		self.rclass('hidden invisible');
		self.replace(el, true);

		if (config.scrollbar)
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-body'), { visibleY: config.visibleY, orientation: 'y' });

		if (config.style === 2)
			self.aclass(cls + '-style-2');

		self.event('scroll', function() {
			EMIT('scroll', self.name);
			EMIT('reflow', self.name);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			switch (t.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (!init) {
			switch (key) {
				case 'width':
					value !== prev && self.find(cls2).css('max-width', value + 'px');
					break;
				case 'closebutton':
					self.find(cls2 + '-button-close').tclass('hidden', value !== true);
					break;
			}
		}
	};

	self.esc = function(bind) {
		if (bind) {
			if (!self.$esc) {
				self.$esc = true;
				$(W).on('keydown', self.esc_keydown);
			}
		} else {
			if (self.$esc) {
				self.$esc = false;
				$(W).off('keydown', self.esc_keydown);
			}
		}
	};

	self.esc_keydown = function(e) {
		if (e.which === 27 && !e.isPropagationStopped()) {
			var val = self.get();
			if (!val || config.if === val) {
				e.preventDefault();
				e.stopPropagation();
				self.hide();
			}
		}
	};

	self.hideforce = function() {
		if (!self.hclass('hidden')) {
			self.aclass('hidden');
			self.release(true);
			self.find(cls2).rclass(cls + '-animate');
			W.$$largeform_level--;
		}
	};

	var allowscrollbars = function() {
		$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
	};

	self.setter = function(value) {

		setTimeout2(self.name + '-noscroll', allowscrollbars, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && self.EXEC(config.reload, self);
				config.default && DEFAULT(self.makepath(config.default), true);
				config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);
			}
			return;
		}

		setTimeout2(cls, function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			if (!config.independent)
				self.hideforce();
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find(cls2).append(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$largeform_level < 1)
			W.$$largeform_level = 1;

		W.$$largeform_level++;

		self.css('z-index', W.$$largeform_level * config.zindex);
		self.rclass('hidden');

		self.release(false);
		config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		if (!isMOBILE && config.autofocus) {
			setTimeout(function() {
				self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea').eq(0).focus();
			}, 1000);
		}

		self.resize();

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
			if (!init && isMOBILE) {
				$('body').aclass('hidden');
				setTimeout(function() {
					$('body').rclass('hidden');
				}, 50);
			}
			init = true;
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$largeform_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});

COMPONENT('layout2', 'scrollbar:1;parent:window;autoresize:1;margin:0', function(self, config, cls) {

	var top;
	var bottom;
	var left;
	var right;
	var main;
	var cachesize;
	var init = false;

	self.init = function() {
		var obj;
		if (W.OP)
			obj = W.OP;
		else
			obj = $(W);
		obj.on('resize', function() {
			for (var i = 0; i < M.components.length; i++) {
				var com = M.components[i];
				if (com.name === 'layout2' && com.dom.offsetParent && com.$ready && !com.$removed && com.config.autoresize)
					com.resize();
			}
		});
	};

	self.parse_number = function(value, total) {
		var tmp = value.parseInt();
		return value.indexOf('%') === -1 ? tmp : ((total / 100) * tmp);
	};

	self.parse_size = function(el) {
		var size = (el.attrd('size') || '').split(',').trim();
		var obj = { lg: size[0] || '0' };
		obj.md = size[1] == null ? obj.lg : size[1];
		obj.sm = size[2] == null ? obj.md : size[2];
		obj.xs = size[3] == null ? obj.sm : size[3];

		var keys = Object.keys(obj);
		var reg = /px|%/;
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var val = obj[key];
			if (!reg.test(val))
				obj[key] += 'px';
		}

		return obj;
	};

	self.parse_item = function(el) {
		var scrollbar = el.attrd('scrollbar');
		var type = el.attrd('type');
		var item = {};
		item.el = el;
		item.size = type ? self.parse_size(el) : null;
		item.type = type || 'main';
		item.css = {};
		item.scrollbar = scrollbar ? scrollbar.parseConfig() : null;

		if (item.scrollbar) {

			var screl;

			if (item.scrollbar.selector)
				screl = el.find(item.scrollbar.selector);
			else {
				var dom = el[0];
				var div = document.createElement('DIV');
				while (dom.children.length)
					div.appendChild(dom.children[0]);
				dom.appendChild(div);
				$(div).aclass(cls + '-scrollbar');
				screl = $(div);
			}

			var opt = { visibleY: item.scrollbar.visible || item.scrollbar.visibleY, orientation: 'y', parent: el };
			item.scrollbarcontainer = screl;
			item.scrollbar.instance = SCROLLBAR(screl, opt);
			item.scrollbar.resize = function(h) {
				var t = this;
				item.scrollbarcontainer.css('height', h - t.margin);
				item.scrollbar.instance.resize();
			};
		}

		el.aclass(cls + '-section ' + cls + '-' + type.replace('2', ''));
		return item;
	};

	self.parse_cache = function(tmp) {
		return (tmp.left || 0) + 'x' + (tmp.top || 0) + 'x' + (tmp.width || 0) + 'x' + (tmp.height || 0) + 'x';
	};

	self.make = function() {
		self.find('> *').each(function() {
			var el = $(this);
			var type = el.attrd('type');
			switch (type) {
				case 'top':
				case 'top2':
					top = self.parse_item(el);
					break;
				case 'bottom':
				case 'bottom2':
					bottom = self.parse_item(el);
					break;
				case 'right':
					right = self.parse_item(el);
					break;
				case 'left':
					left = self.parse_item(el);
					break;
				default:
					main = self.parse_item(el);
					break;
			}
		});

		self.resize();
	};

	self.resize = function() {
		setTimeout2(self.ID, self.resize2, 80);
	};

	self.show = function(type) {
		if (isMOBILE) {
			switch (type) {
				case 'left':
					left && left.el.css('width', WW).rclass('hidden');
					right && right.el.aclass('hidden');
					break;
				case 'right':
					left && left.el.aclass('hidden');
					right && right.el.css({ left: 0, width: WW }).rclass('hidden');
					break;
				case 'main':
					right && right.el.aclass('hidden');
					left && left.el.aclass('hidden');
					break;
			}
		} else
			self.resize2();
	};

	self.resize2 = function() {

		var parent = self.parent(config.parent);
		var d = WIDTH();
		var w = parent.width();
		var h = parent.height();
		var tmp = d + '_' + w + 'x' + h;

		if (cachesize === tmp)
			return;

		var m = config['margin' + d] || config.margin || 0;

		h -= m;

		cachesize = tmp;
		main.w = w;
		main.h = h;

		var sizetop = top ? self.parse_number(top.size[d], h) : 0;
		var sizebottom = bottom ? self.parse_number(bottom.size[d], h) : 0;
		var sizeleft = left ? self.parse_number(left.size[d], w) : 0;
		var sizeright = right ? self.parse_number(right.size[d], w) : 0;

		if (top) {

			if (top.type === 'top2') {
				top.css.left = sizeleft;
				top.css.width = w - sizeright - sizeleft;
			} else {
				top.css.left = 0;
				top.css.width = w;
			}

			top.css.top = 0;
			top.css.height = sizetop;
			tmp = self.parse_cache(top.css);
			if (tmp !== top.sizecache) {
				top.sizecache = tmp;
				top.el.tclass('hidden', !sizetop);
				if (!sizetop)
					delete top.css.height;
				top.el.css(top.css);
				top.scrollbar && top.scrollbar.resize(sizetop);
			}
		}

		if (bottom) {

			if (bottom.type === 'bottom2') {
				bottom.css.left = sizeleft;
				bottom.css.width = w - sizeright - sizeleft;
			} else {
				bottom.css.left = 0;
				bottom.css.width = w;
			}

			bottom.css.top = h - sizebottom;
			bottom.css.height = sizebottom;
			tmp = self.parse_cache(bottom.css);
			if (tmp !== bottom.sizecache) {
				bottom.el.tclass('hidden', !sizebottom);
				if (!sizebottom)
					delete bottom.css.height;
				bottom.sizecache = tmp;
				bottom.el.css(bottom.css);
				bottom.scrollbar && bottom.scrollbar.resize(sizebottom);
			}
		}

		if (left) {

			if (top && top.type === 'top')
				left.css.top = sizetop;
			else
				left.css.top = 0;

			if (bottom && bottom.type === 'bottom')
				left.css.height = h - sizebottom;
			else
				left.css.height = h;

			if (top && top.type === 'top')
				left.css.height -= sizetop;

			left.css.left = 0;
			left.css.width = sizeleft;
			tmp = self.parse_cache(left.css);
			if (tmp !== left.sizecache) {
				left.el.tclass('hidden', !sizeleft);
				if (!sizeleft)
					delete left.css.width;
				left.sizecache = tmp;
				left.el.css(left.css);
				left.scrollbar && left.scrollbar.resize(left.css.height);
			}
		}

		if (right) {

			if (top && top.type === 'top')
				right.css.top = sizetop;
			else
				right.css.top = 0;

			if (bottom && bottom.type === 'bottom')
				right.css.height = h - sizebottom;
			else
				right.css.height = h;

			if (top && top.type === 'top')
				right.css.height -= sizetop;

			right.css.left = w - sizeright;
			right.css.width = sizeright;
			tmp = self.parse_cache(right.css);
			if (tmp !== right.sizecache) {
				right.el.tclass('hidden', !sizeright);
				if (!sizeright)
					delete right.css.width;
				right.sizecache = tmp;
				right.el.css(right.css);
				right.scrollbar && right.scrollbar.resize(right.css.height);
			}
		}

		if (main) {
			main.css.top = sizetop;
			main.css.left = sizeleft;
			main.css.width = w - sizeleft - sizeright;
			main.css.height = h - sizetop - sizebottom;
			tmp = self.parse_cache(main.css);
			if (tmp !== main.sizecache) {
				main.sizecache = tmp;
				main.el.css(main.css);
				main.scrollbar && main.scrollbar.resize(main.css.height);
			}
		}

		self.element.SETTER('*/resize');

		if (!init) {
			self.rclass('invisible hidden');
			init = true;
		}
	};

	self.resizescrollbars = function() {
		top && top.scrollbar && top.scrollbar.instance.resize();
		bottom && bottom.scrollbar && bottom.scrollbar.instance.resize();
		left && left.scrollbar && left.scrollbar.instance.resize();
		right && right.scrollbar && right.scrollbar.instance.resize();
		main && main.scrollbar && main.scrollbar.instance.resize();
	};

	self.resizescrollbar = function(type) {
		if (type === 'top')
			top && top.scrollbar && top.scrollbar.instance.resize();
		else if (type === 'bottom')
			bottom && bottom.scrollbar && bottom.scrollbar.instance.resize();
		else if (type === 'left')
			left && left.scrollbar && left.scrollbar.instance.resize();
		else if (type === 'right')
			right && right.scrollbar && right.scrollbar.instance.resize();
		else if (type === 'main')
			main && main.scrollbar && main.scrollbar.instance.resize();
	};

	self.scrolltop = function(type) {
		if (type === 'top')
			top && top.scrollbar && top.scrollbar.instance.scrollTop(0);
		else if (type === 'bottom')
			bottom && bottom.scrollbar && bottom.scrollbar.instance.scrollTop(0);
		else if (type === 'left')
			left && left.scrollbar && left.scrollbar.instance.scrollTop(0);
		else if (type === 'right')
			right && right.scrollbar && right.scrollbar.instance.scrollTop(0);
		else if (type === 'main')
			main && main.scrollbar && main.scrollbar.instance.scrollTop(0);
	};

});

COMPONENT('approve', 'cancel:Cancel', function(self, config, cls) {

	var cls2 = '.' + cls;
	var events = {};
	var buttons;
	var oldcancel;

	self.readonly();
	self.singleton();
	self.nocompile && self.nocompile();

	self.make = function() {

		self.aclass(cls + ' hidden');
		self.html('<div><div class="{0}-body"><span class="{0}-close"><i class="fa fa-times"></i></span><div class="{0}-content"></div><div class="{0}-buttons"><button data-index="0"></button><button data-index="1"></button></div></div></div>'.format(cls));

		buttons = self.find(cls2 + '-buttons').find('button');

		self.event('click', 'button', function() {
			self.hide(+$(this).attrd('index'));
		});

		self.event('click', cls2 + '-close', function() {
			self.callback = null;
			self.hide(-1);
		});

		self.event('click', function(e) {
			var t = e.target.tagName;
			if (t !== 'DIV')
				return;
			var el = self.find(cls2 + '-body');
			el.aclass(cls + '-click');
			setTimeout(function() {
				el.rclass(cls + '-click');
			}, 300);
		});
	};

	events.keydown = function(e) {
		var index = e.which === 13 ? 0 : e.which === 27 ? 1 : null;
		if (index != null) {
			self.find('button[data-index="{0}"]'.format(index)).trigger('click');
			e.preventDefault();
			e.stopPropagation();
			events.unbind();
		}
	};

	events.bind = function() {
		$(W).on('keydown', events.keydown);
	};

	events.unbind = function() {
		$(W).off('keydown', events.keydown);
	};

	self.show = function(message, a, b, fn) {

		if (typeof(b) === 'function') {
			fn = b;
			b = config.cancel;
		}

		if (M.scope)
			self.currscope = M.scope();

		self.callback = fn;

		var icon = a.match(/"[a-z0-9-\s]+"/);
		if (icon) {

			var tmp = icon + '';
			if (tmp.indexOf(' ') == -1)
				tmp = 'fa fa-' + tmp;

			a = a.replace(icon, '').trim();
			icon = '<i class="{0}"></i>'.format(tmp.replace(/"/g, ''));
		} else
			icon = '';

		var color = a.match(/#[0-9a-f]+/i);
		if (color)
			a = a.replace(color, '').trim();

		buttons.eq(0).css('background-color', color || '').html(icon + a);

		if (oldcancel !== b) {
			oldcancel = b;
			buttons.eq(1).html(b);
		}

		self.find(cls2 + '-content').html(message.replace(/\n/g, '<br />'));
		$('html').aclass(cls + '-noscroll');
		self.rclass('hidden');
		events.bind();
		self.aclass(cls + '-visible', 5);
	};

	self.hide = function(index) {

		if (!index) {
			self.currscope && M.scope(self.currscope);
			self.callback && self.callback(index);
		}

		self.rclass(cls + '-visible');
		events.unbind();
		setTimeout2(self.id, function() {
			$('html').rclass(cls + '-noscroll');
			self.aclass('hidden');
		}, 1000);
	};
});

COMPONENT('part', 'hide:1;loading:1', function(self, config) {

	var init = false;
	var clid = null;
	var downloading = false;
	var cls = 'ui-' + self.name;
	var isresizing = false;

	self.releasemode && self.releasemode('true');
	self.readonly();

	self.make = function() {
		self.aclass(cls);
	};

	self.resize = function() {
		if (config.absolute) {
			var pos = self.element.position();
			var obj = {};
			obj.width = WW - pos.left;
			obj.height = WH - pos.top;
			self.css(obj);
		}
	};

	self.destroy = function() {
		isresizing && $(W).off('resize', self.resize);
	};

	self.setter = function(value) {

		if (config.if !== value) {

			if (!self.hclass('hidden')) {
				config.hidden && EXEC(self.makepath(config.hidden));
				config.hide && self.aclass('hidden');
				self.release(true);
			}

			if (config.cleaner && init && !clid)
				clid = setTimeout(self.clean, config.cleaner * 60000);

			return;
		}

		if (config.absolute && !isresizing) {
			$(W).on('resize', self.resize);
			isresizing = true;
		}

		config.hide && self.rclass('hidden');

		if (self.dom.hasChildNodes()) {

			if (clid) {
				clearTimeout(clid);
				clid = null;
			}

			self.release(false);
			config.reload && EXEC(self.makepath(config.reload));
			config.default && DEFAULT(self.makepath(config.default), true);
			isresizing && setTimeout(self.resize, 50);
			setTimeout(self.emitresize, 200);

		} else {

			if (downloading)
				return;

			config.loading && SETTER('loading', 'show');
			downloading = true;
			setTimeout(function() {

				var preparator = config.path == null ? null : function(content) {
					return content.replace(/~PATH~/g, config.path);
				};

				if (preparator == null && config.replace)
					preparator = GET(self.makepath(config.replace));

				self.import(config.url, function() {
					downloading = false;

					if (!init) {
						config.init && EXEC(self.makepath(config.init));
						init = true;
					}

					self.release(false);
					config.reload && EXEC(self.makepath(config.reload), true);
					config.default && DEFAULT(self.makepath(config.default), true);
					config.loading && SETTER('loading', 'hide', 500);
					EMIT('parts.' + config.if, self.element, self);
					self.hclass('invisible') && self.rclass('invisible', 500);
					isresizing && setTimeout(self.resize, 50);
					setTimeout(self.emitresize, 200);

				}, true, preparator);

			}, 200);
		}
	};

	self.emitresize = function() {
		self.element.SETTER('*', 'resize');
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'if':
				config.if = value + '';
				break;
			case 'absolute':
				var is = !!value;
				self.tclass(cls + '-absolute', is);
				break;
		}
	};

	self.clean = function() {
		if (self.hclass('hidden')) {
			config.clean && EXEC(self.makepath(config.clean));
			setTimeout(function() {
				self.empty();
				init = false;
				clid = null;
				setTimeout(FREE, 1000);
			}, 1000);
		}
	};
});

COMPONENT('selected', 'class:selected;selector:a;attr:if', function(self, config) {

	self.readonly();

	self.configure = function(key, value) {
		switch (key) {
			case 'datasource':
				self.datasource(value, function() {
					self.refresh();
				});
				break;
		}
	};

	self.setter = function(value) {
		var cls = config.class;
		self.find(config.selector).each(function() {
			var el = $(this);
			if (el.attrd(config.attr) === value)
				el.aclass(cls);
			else
				el.hclass(cls) && el.rclass(cls);
		});
	};
});

COMPONENT('animation', 'style:2;delay:200;init:1000;cleaner:1000;visible:0;offset:50', function(self, config, cls) {

	self.readonly();

	if (!config.if)
		self.blind();

	self.destroy = function() {
		self.visibleinterval && clearInterval(self.interval);
	};

	self.make = function() {
		if (config.visible) {
			self.visibleinterval = setInterval(function() {
				if (VISIBLE(self.dom, config.offset)) {
					self.visibleinterval = null;
					clearInterval(self.visibleinterval);
					self.animate();
				}
			}, 500);
		} else
			setTimeout2(self.ID, self.animate, config.init);

		config.datasource && self.datasource(config.datasource, function() {
			setTimeout2(self.ID, self.animate, config.init);
		});
	};

	self.restore = function() {
		self.find('.animated').aclass('animation').rclass('animated');
	};

	self.animate = function() {

		var el = self.find('.animation');
		var arr = [];

		for (var i = 0; i < el.length; i++) {

			var t = el[i];

			if (!t.$anim) {
				var $t = $(t);

				if (!t.$animopt) {
					var opt = ($t.attrd('animation') || '').parseConfig();
					t.$animopt = opt;
				}

				t.$anim = cls + '-' + (t.$animopt.style || config.style);
				$t.aclass(t.$anim + '-init animating');
				arr.push($t);
			}
		}

		if (!arr.length)
			return;

		setTimeout(function(arr) {

			if (self.removed)
				return;

			var maxdelay = 500;

			if (config.together) {

				for (var i = 0; i < arr.length; i++) {
					var el = arr[i];
					var c = el[0].$anim;
					var opt = el[0].$animopt;
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + c + '-init');
						else
							el.rclass('animation').aclass(c + '-run');
					}
				}

				setTimeout(function() {
					if (!self.removed) {
						for (var i = 0; i < arr.length; i++) {
							var c = arr[i][0].$anim;
							arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
							delete arr[i][0].$anim;
						}
						config.exec && self.EXEC(config.exec, self.element);
					}
				}, 1500);

				return;
			}

			arr.wait(function(el, next, index) {

				var opt = el[0].$animopt;
				var delay = (opt.order || index) * (opt.delay || config.delay);
				var clsname = cls + '-' + (opt.style || config.style);

				if (maxdelay < delay)
					maxdelay = delay;

				if (el.hclass('hidden') || el.hclass('invisible')) {
					el.rclass('animation ' + clsname + '-init').aclass('animated');
					next();
					return;
				}

				el[0].$animtime = setTimeout(function(el) {
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + clsname + '-init');
						else
							el.rclass('animation').aclass(clsname + '-run');
					}
				}, delay, el);

				next();

			}, function() {

				setTimeout(function() {
					for (var i = 0; i < arr.length; i++) {
						var c = arr[i][0].$anim;
						arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
						delete arr[i][0].$anim;
					}
					config.exec && self.EXEC(config.exec, self.element);
				}, maxdelay + 1000);
			});

		}, config.init / 10 >> 0, arr);
	};

	self.setter = function(value) {
		if (config.if) {
			if (value === config.if)
				setTimeout2(self.ID, self.animate, config.init);
			else
				self.restore();
		}
	};

});

COMPONENT('fullform', 'zindex:12;padding:20;scrollbar:1;scrolltop:1;style:1', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};
	var nav = false;
	var init = false;

	if (!W.$$fullform) {

		W.$$fullform_level = W.$$fullform_level || 1;
		W.$$fullform = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			setTimeout2(self.name, function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'fullform' && !HIDDEN(com.dom) && com.$ready && !com.$removed)
						com.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			if (e.target === this) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			var el = $(e.target);
			if (el.hclass(cls + '-container') && !el.hclass(cls + '-style-2')) {
				var form = el.find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c);
				setTimeout(function() {
					form.rclass(c);
				}, 300);
			}
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide, self.element);
		else
			self.hide();
	};

	self.cancel = function() {
		config.cancel && self.EXEC(config.cancel, self.hide);
		self.hide();
	};

	self.hide = function() {
		if (config.independent)
			self.hideforce();
		self.esc(false);
		self.set('');
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass(value.icon.indexOf(' ') === -1 ? ('fa fa-' + value.icon) : value.icon);
	};

	self.resize = function() {

		if (self.hclass('hidden'))
			return;

		var padding = isMOBILE ? 0 : config.style === 1 ? config.padding : 0;
		var ui = self.find(cls2);
		var p = (config.style == 1 ? (padding * 2) : 0);

		csspos.height = WH - (config.style == 1 ? (padding * 2) : padding);
		csspos.top = padding;
		ui.css(csspos);

		var el = self.find(cls2 + '-title');
		var th = el.height();

		csspos = { height: csspos.height - th, width: WW - p };

		if (nav)
			csspos.height -= nav.height();

		self.find(cls2 + '-body').css(csspos);
		self.scrollbar && self.scrollbar.resize();
		self.element.SETTER('*', 'resize');
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}"><div data-bind="@config__text span:value.title__change .{4}-icon:@icon" class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="fa fa-times"></i></button><i class="{4}-icon"></i><span></span></div><div class="{4}-body"></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		scr.length && scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2 + '-body')[0];

		while (self.dom.children.length) {
			var child = self.dom.children[0];
			if (child.tagName === 'NAV') {
				nav = $(child);
				body.parentNode.appendChild(child);
			} else
				body.appendChild(child);
		}

		self.rclass('hidden invisible');
		self.replace(el, true);

		if (config.scrollbar)
			self.scrollbar = SCROLLBAR(self.find(cls2 + '-body'), { visibleY: config.visibleY, orientation: 'y' });

		if (config.style === 2)
			self.aclass(cls + '-style-2');

		self.event('scroll', function() {
			EMIT('scroll', self.name);
			EMIT('reflow', self.name);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			switch (t.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (!init) {
			switch (key) {
				case 'width':
					value !== prev && self.find(cls2).css('max-width', value + 'px');
					break;
				case 'closebutton':
					self.find(cls2 + '-button-close').tclass('hidden', value !== true);
					break;
			}
		}
	};

	self.esc = function(bind) {
		if (bind) {
			if (!self.$esc) {
				self.$esc = true;
				$(W).on('keydown', self.esc_keydown);
			}
		} else {
			if (self.$esc) {
				self.$esc = false;
				$(W).off('keydown', self.esc_keydown);
			}
		}
	};

	self.esc_keydown = function(e) {
		if (e.which === 27 && !e.isPropagationStopped()) {
			var val = self.get();
			if (!val || config.if === val) {
				e.preventDefault();
				e.stopPropagation();
				self.hide();
			}
		}
	};

	self.hideforce = function() {
		if (!self.hclass('hidden')) {
			self.aclass('hidden');
			self.release(true);
			self.find(cls2).rclass(cls + '-animate');
			W.$$fullform_level--;
		}
	};

	var allowscrollbars = function() {
		$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
	};

	self.setter = function(value) {

		setTimeout2(self.name + '-noscroll', allowscrollbars, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && self.EXEC(config.reload, self);
				config.default && DEFAULT(self.makepath(config.default), true);
				config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);
			}
			return;
		}

		setTimeout2(cls, function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			if (!config.independent)
				self.hideforce();
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find(cls2).append(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$fullform_level < 1)
			W.$$fullform_level = 1;

		W.$$fullform_level++;

		self.css('z-index', W.$$fullform_level * config.zindex);
		self.rclass('hidden');

		self.release(false);
		config.scrolltop && self.scrollbar && self.scrollbar.scrollTop(0);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		if (!isMOBILE && config.autofocus) {
			setTimeout(function() {
				self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea').eq(0).focus();
			}, 1000);
		}

		self.resize();

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
			if (!init && isMOBILE) {
				$('body').aclass('hidden');
				setTimeout(function() {
					$('body').rclass('hidden');
				}, 50);
			}
			init = true;
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$fullform_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});

COMPONENT('miniform', 'zindex:12', function(self, config, cls) {

	var cls2 = '.' + cls;
	var csspos = {};

	if (!W.$$miniform) {

		W.$$miniform_level = W.$$miniform_level || 1;
		W.$$miniform = true;

		$(document).on('click', cls2 + '-button-close', function() {
			SET($(this).attrd('path'), '');
		});

		var resize = function() {
			setTimeout2(self.name, function() {
				for (var i = 0; i < M.components.length; i++) {
					var com = M.components[i];
					if (com.name === 'miniform' && !HIDDEN(com.dom) && com.$ready && !com.$removed)
						com.resize();
				}
			}, 200);
		};

		ON('resize2', resize);

		$(document).on('click', cls2 + '-container', function(e) {

			if (e.target === this) {
				var com = $(this).component();
				if (com && com.config.closeoutside) {
					com.set('');
					return;
				}
			}

			var el = $(e.target);

			if (el.hclass(cls + '-container-cell')) {
				var form = $(this).find(cls2);
				var c = cls + '-animate-click';
				form.aclass(c).rclass(c, 300);
				var com = el.parent().component();
				if (com && com.config.closeoutside)
					com.set('');
			}
		});
	}

	self.readonly();
	self.submit = function() {
		if (config.submit)
			self.EXEC(config.submit, self.hide, self.element);
		else
			self.hide();
	};

	self.cancel = function() {
		config.cancel && self.EXEC(config.cancel, self.hide);
		self.hide();
	};

	self.hide = function() {
		if (config.independent)
			self.hideforce();
		self.esc(false);
		self.set('');
	};

	self.esc = function(bind) {
		if (bind) {
			if (!self.$esc) {
				self.$esc = true;
				$(W).on('keydown', self.esc_keydown);
			}
		} else {
			if (self.$esc) {
				self.$esc = false;
				$(W).off('keydown', self.esc_keydown);
			}
		}
	};

	self.esc_keydown = function(e) {
		if (e.which === 27 && !e.isPropagationStopped()) {
			var val = self.get();
			if (!val || config.if === val) {
				e.preventDefault();
				e.stopPropagation();
				self.hide();
			}
		}
	};

	self.hideforce = function() {
		if (!self.hclass('hidden')) {
			self.aclass('hidden');
			self.release(true);
			self.find(cls2).rclass(cls + '-animate');
			W.$$miniform_level--;
		}
	};

	self.icon = function(value) {
		var el = this.rclass2('fa');
		value.icon && el.aclass(value.icon.indexOf(' ') === -1 ? ('fa fa-' + value.icon) : value.icon);
		this.tclass('hidden', !value.icon);
	};

	self.resize = function() {

		if (!config.center || self.hclass('hidden'))
			return;

		var ui = self.find(cls2);
		var fh = ui.innerHeight();
		var wh = WH;
		var r = (wh / 2) - (fh / 2);
		csspos.marginTop = (r > 30 ? (r - 15) : 20) + 'px';
		ui.css(csspos);
	};

	self.make = function() {

		$(document.body).append('<div id="{0}" class="hidden {4}-container invisible"><div class="{4}-container-table"><div class="{4}-container-cell"><div class="{4}" style="max-width:{1}px"><div data-bind="@config__text span:value.title__change .{4}-icon:@icon" class="{4}-title"><button name="cancel" class="{4}-button-close{3}" data-path="{2}"><i class="fa fa-times"></i></button><i class="{4}-icon"></i><span></span></div></div></div></div>'.format(self.ID, config.width || 800, self.path, config.closebutton == false ? ' hidden' : '', cls));

		var scr = self.find('> script');
		self.template = scr.length ? scr.html().trim() : '';
		if (scr.length)
			scr.remove();

		var el = $('#' + self.ID);
		var body = el.find(cls2)[0];

		while (self.dom.children.length)
			body.appendChild(self.dom.children[0]);

		self.rclass('hidden invisible');
		self.replace(el, true);

		self.event('scroll', function() {
			EMIT('scroll', self.name);
			EMIT('reflow', self.name);
		});

		self.event('click', 'button[name]', function() {
			var t = this;
			switch (t.name) {
				case 'submit':
					self.submit(self.hide);
					break;
				case 'cancel':
					!t.disabled && self[t.name](self.hide);
					break;
			}
		});

		config.enter && self.event('keydown', 'input', function(e) {
			e.which === 13 && !self.find('button[name="submit"]')[0].disabled && setTimeout(self.submit, 800);
		});
	};

	self.configure = function(key, value, init, prev) {
		if (!init) {
			switch (key) {
				case 'width':
					value !== prev && self.find(cls2).css('max-width', value + 'px');
					break;
				case 'closebutton':
					self.find(cls2 + '-button-close').tclass('hidden', value !== true);
					break;
			}
		}
	};

	self.setter = function(value) {

		setTimeout2(cls + '-noscroll', function() {
			$('html').tclass(cls + '-noscroll', !!$(cls2 + '-container').not('.hidden').length);
		}, 50);

		var isHidden = value !== config.if;

		if (self.hclass('hidden') === isHidden) {
			if (!isHidden) {
				config.reload && self.EXEC(config.reload, self);
				config.default && DEFAULT(self.makepath(config.default), true);
			}
			return;
		}

		setTimeout2(cls, function() {
			EMIT('reflow', self.name);
		}, 10);

		if (isHidden) {
			if (!config.independent)
				self.hideforce();
			return;
		}

		if (self.template) {
			var is = self.template.COMPILABLE();
			self.find(cls2).append(self.template);
			self.template = null;
			is && COMPILE();
		}

		if (W.$$miniform_level < 1)
			W.$$miniform_level = 1;

		W.$$miniform_level++;

		self.css('z-index', W.$$miniform_level * config.zindex);
		self.rclass('hidden');

		self.resize();
		self.release(false);

		config.reload && self.EXEC(config.reload, self);
		config.default && DEFAULT(self.makepath(config.default), true);

		if (!isMOBILE && config.autofocus) {
			setTimeout(function() {
				self.find(typeof(config.autofocus) === 'string' ? config.autofocus : 'input[type="text"],select,textarea').eq(0).focus();
			}, 1000);
		}

		setTimeout(function() {
			self.rclass('invisible');
			self.find(cls2).aclass(cls + '-animate');
		}, 300);

		// Fixes a problem with freezing of scrolling in Chrome
		setTimeout2(self.ID, function() {
			self.css('z-index', (W.$$miniform_level * config.zindex) + 1);
		}, 500);

		config.closeesc && self.esc(true);
	};
});

COMPONENT('codemirror', 'linenumbers:true;required:false;trim:false;tabs:true', function(self, config, cls) {

	var editor, container;
	var cls2 = '.' + cls;
	var HSM = { annotateScrollbar: true, delay: 100 };

	self.getter = null;
	self.bindvisible();
	self.nocompile();

	self.reload = function() {
		editor.refresh();
		editor.display.scrollbars.update(true);
	};

	self.validate = function(value) {
		return (config.disabled || !config.required ? true : value && value.length > 0) === true;
	};

	self.insert = function(value) {
		editor.replaceSelection(value);
		self.change(true);
	};

	self.configure = function(key, value, init) {
		if (init)
			return;

		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				editor.readOnly = value;
				editor.refresh();
				break;
			case 'required':
				self.find(cls2 + '-label').tclass(cls + '-label-required', value);
				self.state(1, 1);
				break;
			case 'icon':
				self.find('i').rclass().aclass(value.indexOf(' ') === -1 ? ('fa fa-' + value) : value);
				break;
		}

	};

	self.resize = function() {
		setTimeout2(self.ID, self.resizeforce, 300);
	};

	self.resizeforce = function() {
		if (config.parent) {
			var parent = self.parent(config.parent);
			var h = parent.height();

			if (h < config.minheight)
				h = config.minheight;
			editor.setSize('100%', (h - config.margin) - 24);
			self.css('height', h - config.margin);
		} else
			editor.setSize('100%', config.height);
	};

	self.make = function() {

		var findmatch = function() {

			if (config.mode === 'todo') {
				self.todo_done();
				return;
			}

			var sel = editor.getSelections()[0];
			var cur = editor.getCursor();
			var count = editor.lineCount();
			var before = editor.getLine(cur.line).substring(cur.ch, cur.ch + sel.length) === sel;
			var beg = cur.ch + (before ? sel.length : 0);
			for (var i = cur.line; i < count; i++) {
				var ch = editor.getLine(i).indexOf(sel, beg);
				if (ch !== -1) {
					editor.doc.addSelection({ line: i, ch: ch }, { line: i, ch: ch + sel.length });
					break;
				}
				beg = 0;
			}
		};

		var content = config.label || self.html();
		self.html(((content ? '<div class="{0}-label' + (config.required ? ' {0}-label-required' : '') + '">' + (config.icon ? '<i class="fa fa-' + config.icon + '"></i> ' : '') + content + ':</div>' : '') + '<div class="{0}"></div>').format(cls));
		container = self.find(cls2);

		var options = {};

		options.lineNumbers = config.linenumbers;
		options.mode = config.type || 'htmlmixed';
		options.indentUnit = 4;
		// options.autoRefresh = true;
		options.scrollbarStyle = 'simple';
		options.scrollPastEnd = true;
		options.extraKeys = { 'Cmd-D': findmatch, 'Ctrl-D': findmatch };
		options.matchBrackets = true;
		options.rulers = [{ column: 130, lineStyle: 'dashed' }];
		options.viewportMargin = 1000;
		options.foldGutter = true;
		options.highlightSelectionMatches = HSM;
		options.matchTags = { bothTags: true };
		options.autoCloseTags = true;
		options.doubleIndentSwitch = false;
		options.showCursorWhenSelecting = true;
		options.blastCode = true;
		options.autoCloseBrackets = true;

		if (config.tabs)
			options.indentWithTabs = true;

		if (config.type === 'markdown') {
			options.styleActiveLine = true;
			options.lineWrapping = true;
		}

		options.showTrailingSpace = false;

		editor = CodeMirror(container[0], options);
		self.editor = editor;

		editor.on('keydown', function(editor, e) {

			if (e.shiftKey && e.ctrlKey && (e.keyCode === 40 || e.keyCode === 38)) {
				var tmp = editor.getCursor();
				editor.doc.addSelection({ line: tmp.line + (e.keyCode === 40 ? 1 : -1), ch: tmp.ch });
				e.stopPropagation();
				e.preventDefault();
			}

			if (e.keyCode === 13) {
				var tmp = editor.getCursor();
				var line = editor.lineInfo(tmp.line);
				if ((/^\t+$/).test(line.text))
					editor.replaceRange('', { line: tmp.line, ch: 0 }, { line: tmp.line, ch: line.text.length });
				return;
			}

			if (e.keyCode === 27)
				e.stopPropagation();

		});

		if (config.disabled) {
			self.aclass('ui-disabled');
			editor.readOnly = true;
			editor.refresh();
		}

		var can = {};
		can['+input'] = can['+delete'] = can.undo = can.redo = can.paste = can.cut = can.clear = true;

		editor.on('change', function(a, b) {

			if (config.disabled || !can[b.origin])
				return;

			setTimeout2(self.id, function() {
				var val = editor.getValue();

				if (config.trim) {
					var lines = val.split('\n');
					for (var i = 0, length = lines.length; i < length; i++)
						lines[i] = lines[i].replace(/\s+$/, '');
					val = lines.join('\n').trim();
				}

				self.getter2 && self.getter2(val);
				self.change(true);
				self.rewrite(val, 2);
				config.required && self.validate2();
			}, 200);

		});

		self.resize();
		self.on('resize + resize2', self.resize);
	};

	self.refreshcode = function() {
		var el = self.element[0];
		var is = el.parentNode && el.parentNode.tagName === 'body' ? false : W.isIE ? (!el.offsetWidth && !el.offsetHeight) : !el.offsetParent;
		if (is)
			setTimeout(self.refreshcode, 500);
		else
			editor.refresh();
	};

	self.setter = function(value, path, type) {

		self.refreshcode();

		editor.setValue(value || '');
		editor.refresh();

		setTimeout(function() {
			editor.refresh();
			editor.scrollTo(0, 0);
			type && editor.setCursor(0);
		}, 200);
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		container.tclass(cls + '-invalid', invalid);
	};
}, [function(next) {

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {
		CodeMirror.overlayMode = function(base, overlay, combine) {
			return {
				startState: function() {
					return {
						base: CodeMirror.startState(base),
						overlay: CodeMirror.startState(overlay),
						basePos: 0, baseCur: null,
						overlayPos: 0, overlayCur: null,
						streamSeen: null
					};
				},
				copyState: function(state) {
					return {
						base: CodeMirror.copyState(base, state.base),
						overlay: CodeMirror.copyState(overlay, state.overlay),
						basePos: state.basePos, baseCur: null,
						overlayPos: state.overlayPos, overlayCur: null
					};
				},
				token: function(stream, state) {
					if (stream != state.streamSeen || Math.min(state.basePos, state.overlayPos) < stream.start) {
						state.streamSeen = stream;
						state.basePos = state.overlayPos = stream.start;
					}

					if (stream.start == state.basePos) {
						state.baseCur = base.token(stream, state.base);
						state.basePos = stream.pos;
					}

					if (stream.start == state.overlayPos) {
						stream.pos = stream.start;
						state.overlayCur = overlay.token(stream, state.overlay);
						state.overlayPos = stream.pos;
					}

					stream.pos = Math.min(state.basePos, state.overlayPos);

					// state.overlay.combineTokens always takes precedence over combine,
					// unless set to null
					if (state.overlayCur == null)
						return state.baseCur;
					else if (state.baseCur != null && state.overlay.combineTokens || combine && state.overlay.combineTokens == null)
						return state.baseCur + ' ' + state.overlayCur;
					else
						return state.overlayCur;
				},
				indent: base.indent && function(state, textAfter) {
					return base.indent(state.base, textAfter);
				},
				electricChars: base.electricChars, innerMode: function(state) {
					return { state: state.base, mode: base };
				},
				blankLine: function(state) {
					var baseToken, overlayToken;
					if (base.blankLine)
						baseToken = base.blankLine(state.base);
					if (overlay.blankLine)
						overlayToken = overlay.blankLine(state.overlay);
					return overlayToken == null ? baseToken : (combine && baseToken != null ? baseToken + ' ' + overlayToken : overlayToken);
				}
			};
		};
	});

	CodeMirror.defineMode('totaljs', function(config) {
		var htmlbase = CodeMirror.getMode(config, 'text/html');
		var totaljsinner = CodeMirror.getMode(config, 'totaljs:inner');
		return CodeMirror.overlayMode(htmlbase, totaljsinner);
	});

	CodeMirror.defineMode('totaljs:inner', function() {
		return {
			token: function(stream) {

				if (stream.match(/@{.*?}/, true))
					return 'variable-T';

				if (stream.match(/@\(.*?\)/, true))
					return 'variable-L';

				if (stream.match(/\{\{.*?\}\}/, true))
					return 'variable-A';

				if (stream.match(/data-scope=/, true))
					return 'variable-S';

				if (stream.match(/data-released=/, true))
					return 'variable-R';

				if (stream.match(/data-bind=/, true))
					return 'variable-B';

				if (stream.match(/data-jc=|data-{2,4}=|data-bind=/, true))
					return 'variable-J';

				if (stream.match(/data-import|(data-jc-(url|scope|import|cache|path|config|id|type|init|class))=/, true))
					return 'variable-E';

				stream.next();
				return null;
			}
		};
	});

	CodeMirror.defineMode('totaljsresources', function() {
		var REG_KEY = /^[a-z0-9_\-.#]+/i;
		return {

			startState: function() {
				return { type: 0, keyword: 0 };
			},

			token: function(stream, state) {

				var m;

				if (stream.sol()) {

					var line = stream.string;
					if (line.substring(0, 2) === '//') {
						stream.skipToEnd();
						return 'comment';
					}

					state.type = 0;
				}

				m = stream.match(REG_KEY, true);
				if (m)
					return 'tag';

				if (!stream.string) {
					stream.next();
					return '';
				}

				var count = 0;

				while (true) {

					count++;
					if (count > 5000)
						break;

					var c = stream.peek();
					if (c === ':') {
						stream.skipToEnd();
						return 'def';
					}

					if (c === '(') {
						if (stream.skipTo(')')) {
							stream.eat(')');
							return 'variable-L';
						}
					}

				}

				stream.next();
				return '';
			}
		};
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		var defaults = {
			style: 'matchhighlight',
			minChars: 2,
			delay: 100,
			wordsOnly: false,
			annotateScrollbar: false,
			showToken: false,
			trim: true
		};

		var countel = null;

		function refreshcount() {
			if (!countel)
				countel = $('.search').find('.count');
			setTimeout2(defaults.style, function() {
				if (countel) {
					var tmp = document.querySelectorAll('.cm-matchhighlight').length;
					countel.text(tmp + 'x').tclass('hidden', !tmp);
				}
			}, 100);
		}

		function State(options) {
			this.options = {};
			for (var name in defaults)
				this.options[name] = (options && options.hasOwnProperty(name) ? options : defaults)[name];
			this.overlay = this.timeout = null;
			this.matchesonscroll = null;
			this.active = false;
		}

		CodeMirror.defineOption('highlightSelectionMatches', false, function(cm, val, old) {
			if (old && old != CodeMirror.Init) {
				removeOverlay(cm);
				clearTimeout(cm.state.matchHighlighter.timeout);
				cm.state.matchHighlighter = null;
				cm.off('cursorActivity', cursorActivity);
				cm.off('focus', onFocus);
			}

			if (val) {
				var state = cm.state.matchHighlighter = new State(val);
				if (cm.hasFocus()) {
					state.active = true;
					highlightMatches(cm);
				} else {
					cm.on('focus', onFocus);
				}
				cm.on('cursorActivity', cursorActivity);
			}
		});

		function cursorActivity(cm) {
			var state = cm.state.matchHighlighter;
			if (state.active || cm.hasFocus())
				scheduleHighlight(cm, state);
		}

		function onFocus(cm) {
			var state = cm.state.matchHighlighter;
			if (!state.active) {
				state.active = true;
				scheduleHighlight(cm, state);
			}
		}

		function scheduleHighlight(cm, state) {
			clearTimeout(state.timeout);
			state.timeout = setTimeout(highlightMatches, 300, cm);
			// }, state.options.delay);
		}

		function addOverlay(cm, query, hasBoundary, style) {
			var state = cm.state.matchHighlighter;
			cm.addOverlay(state.overlay = makeOverlay(query, hasBoundary, style));
			if (state.options.annotateScrollbar && cm.showMatchesOnScrollbar) {
				var searchFor = hasBoundary ? new RegExp('\\b' + query.replace(/[\\[.+*?(){|^$]/g, '\\$&') + '\\b') : query;
				state.matchesonscroll = cm.showMatchesOnScrollbar(searchFor, false, { className: 'CodeMirror-selection-highlight-scrollbar' });
			}
		}

		function removeOverlay(cm) {
			var state = cm.state.matchHighlighter;
			if (state.overlay) {
				cm.removeOverlay(state.overlay);
				state.overlay = null;
				if (state.matchesonscroll) {
					state.matchesonscroll.clear();
					state.matchesonscroll = null;
				}
				refreshcount();
			}
		}

		function checkstr(str) {
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if (!((c > 47 && c < 58) || (c > 64 && c < 123) || (c > 128)))
					return false;
			}
			return true;
		}

		function highlightMatches(cm) {

			cm.operation(function() {

				var state = cm.state.matchHighlighter;
				removeOverlay(cm);

				if (!cm.somethingSelected() && state.options.showToken) {
					var re = state.options.showToken === true ? /[^\W\s$]/ : state.options.showToken;
					var cur = cm.getCursor(), line = cm.getLine(cur.line), start = cur.ch, end = start;
					while (start && re.test(line.charAt(start - 1))) --start;
					while (end < line.length && re.test(line.charAt(end))) ++end;
					if (start < end)
						addOverlay(cm, line.slice(start, end), re, state.options.style);
					return;
				}

				var from = cm.getCursor('from'), to = cm.getCursor('to');
				var diff = Math.abs(from.ch - to.ch);

				if (from.line != to.line || diff < 2)
					return;

				if (state.options.wordsOnly && !isWord(cm, from, to))
					return;

				var selection = cm.getRange(from, to);

				if (!checkstr(selection))
					return;

				if (state.options.trim) selection = selection.replace(/^\s+|\s+$/g, '');
				if (selection.length >= state.options.minChars) {
					addOverlay(cm, selection, false, state.options.style);
				}
			});
			refreshcount();
		}

		function isWord(cm, from, to) {
			var str = cm.getRange(from, to);
			if (str.match(/^\w+$/) !== null) {
				if (from.ch > 0) {
					var pos = {line: from.line, ch: from.ch - 1};
					var chr = cm.getRange(pos, from);
					if (chr.match(/\W/) === null)
						return false;
				}
				if (to.ch < cm.getLine(from.line).length) {
					var pos = {line: to.line, ch: to.ch + 1};
					var chr = cm.getRange(to, pos);
					if (chr.match(/\W/) === null)
						return false;
				}
				return true;
			} else
				return false;
		}

		function boundariesAround(stream, re) {
			return (!stream.start || !re.test(stream.string.charAt(stream.start - 1))) && (stream.pos == stream.string.length || !re.test(stream.string.charAt(stream.pos)));
		}

		function makeOverlay(query, hasBoundary, style) {
			return { token: function(stream) {
				if (stream.match(query) && (!hasBoundary || boundariesAround(stream, hasBoundary)))
					return style;
				stream.next();
				stream.skipTo(query.charAt(0)) || stream.skipToEnd();
			}};
		}

		CodeMirror.commands.countMatches = function() { refreshcount(); };
		CodeMirror.commands.clearMatches = function(cm) { removeOverlay(cm); };
	});

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: https://codemirror.net/LICENSE
	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		CodeMirror.defineOption('rulers', false, function(cm, val) {

			cm.state.redrawrulers = drawRulers;

			if (cm.state.rulerDiv) {
				cm.state.rulerDiv.parentElement.removeChild(cm.state.rulerDiv);
				cm.state.rulerDiv = null;
				cm.off('refresh', drawRulers);
			}

			if (val && val.length) {
				cm.state.rulerDiv = cm.display.lineSpace.parentElement.insertBefore(document.createElement('div'), cm.display.lineSpace);
				cm.state.rulerDiv.className = 'CodeMirror-rulers';
				drawRulers(cm);
				cm.on('refresh', drawRulers);
			}
		});

		function drawRulers(cm) {
			cm.state.rulerDiv.textContent = '';
			var val = cm.getOption('rulers');
			var cw = cm.defaultCharWidth();
			var left = cm.charCoords(CodeMirror.Pos(cm.firstLine(), 0), 'div').left;
			cm.state.rulerDiv.style.minHeight = (cm.display.scroller.offsetHeight + 30) + 'px';
			for (var i = 0; i < val.length; i++) {
				var elt = document.createElement('div');
				elt.className = 'CodeMirror-ruler';
				var col, conf = val[i];
				if (typeof(conf) == 'number') {
					col = conf;
				} else {
					col = conf.column;
					if (conf.className) elt.className += ' ' + conf.className;
					if (conf.color) elt.style.borderColor = conf.color;
					if (conf.lineStyle) elt.style.borderLeftStyle = conf.lineStyle;
					if (conf.width) elt.style.borderLeftWidth = conf.width;
				}
				elt.style.left = (left + col * cw) + 'px';
				cm.state.rulerDiv.appendChild(elt);
			}
		}
	});

	// CodeMirror, copyright (c) by Marijn Haverbeke and others
	// Distributed under an MIT license: https://codemirror.net/LICENSE
	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		var reg_skip = (/[a-zA-Z'"`0-9/$\-{@]/);
		var delay;
		var defaults = {
			pairs: '()[]{}\'\'""',
			triples: '',
			explode: '[]{}'
		};

		var Pos = CodeMirror.Pos;

		CodeMirror.defineOption('autoCloseBrackets', false, function(cm, val, old) {

			cm.on('keydown', function() {
				if (delay) {
					clearTimeout(delay);
					delay = 0;
				}
			});

			if (old && old != CodeMirror.Init) {
				cm.removeKeyMap(keyMap);
				cm.state.closeBrackets = null;
			}

			if (val) {
				ensureBound(getOption(val, 'pairs'));
				cm.state.closeBrackets = val;
				cm.addKeyMap(keyMap);
			}
		});

		function getOption(conf, name) {
			if (name == 'pairs' && typeof conf == 'string')
				return conf;
			if (typeof(conf) == 'object' && conf[name] != null)
				return conf[name];
			return defaults[name];
		}

		var keyMap = { Backspace: handleBackspace, Enter: handleEnter };

		function ensureBound(chars) {
			for (var i = 0; i < chars.length; i++) {
				var ch = chars.charAt(i), key = '\'' + ch + '\'';
				!keyMap[key] && (keyMap[key] = handler(ch));
			}
		}

		ensureBound(defaults.pairs + '`');

		function handler(ch) {
			return function(cm) {
				return handleChar(cm, ch);
			};
		}

		function getConfig(cm) {
			var deflt = cm.state.closeBrackets;
			if (!deflt || deflt.override)
				return deflt;
			return cm.getModeAt(cm.getCursor()).closeBrackets || deflt;
		}

		function handleBackspace() {
			return CodeMirror.Pass;
		}

		function handleEnter(cm) {
			var conf = getConfig(cm);
			var explode = conf && getOption(conf, 'explode');
			if (!explode || cm.getOption('disableInput'))
				return CodeMirror.Pass;

			var ranges = cm.listSelections();
			for (var i = 0; i < ranges.length; i++) {
				if (!ranges[i].empty())
					return CodeMirror.Pass;
				var around = charsAround(cm, ranges[i].head);
				if (!around || explode.indexOf(around) % 2 != 0)
					return CodeMirror.Pass;
			}

			cm.operation(function() {
				var linesep = cm.lineSeparator() || '\n';
				cm.replaceSelection(linesep + linesep, null);
				cm.execCommand('goCharLeft');
				ranges = cm.listSelections();
				for (var i = 0; i < ranges.length; i++) {
					var line = ranges[i].head.line;
					cm.indentLine(line, null, true);
					cm.indentLine(line + 1, null, true);
				}
			});
		}

		function handleChar(cm, ch) {

			delay && clearTimeout(delay);

			var conf = getConfig(cm);
			if (!conf || cm.getOption('disableInput'))
				return CodeMirror.Pass;

			var pairs = getOption(conf, 'pairs');
			var pos = pairs.indexOf(ch);
			if (pos == -1)
				return CodeMirror.Pass;

			var triples = getOption(conf, 'triples');
			var identical = pairs.charAt(pos + 1) == ch;
			var ranges = cm.listSelections();
			var opening = pos % 2 == 0;
			var type;
			var left = pos % 2 ? pairs.charAt(pos - 1) : ch;

			for (var i = 0; i < ranges.length; i++) {
				var range = ranges[i], cur = range.head, curType;
				var next = cm.getRange(cur, Pos(cur.line, cur.ch + 1));
				if (opening && !range.empty()) {
					curType = 'surround';
				} else if ((identical || !opening) && next == ch) {
					cm.replaceSelection(next, null);
					return CodeMirror.pass;
				} else if (identical && cur.ch > 1 && triples.indexOf(ch) >= 0 && cm.getRange(Pos(cur.line, cur.ch - 2), cur) == ch + ch) {
					if (cur.ch > 2 && /\bstring/.test(cm.getTokenTypeAt(Pos(cur.line, cur.ch - 2))))
						return CodeMirror.Pass;
					curType = 'addFour';
				} else if (identical) {
					var prev = cur.ch == 0 ? ' ' : cm.getRange(Pos(cur.line, cur.ch - 1), cur);
					if (reg_skip.test(next) || reg_skip.test(prev))
						return CodeMirror.Pass;
					if (!CodeMirror.isWordChar(next) && prev != ch && !CodeMirror.isWordChar(prev))
						curType = 'both';
					else
						return CodeMirror.Pass;
				} else if (opening) {
					if (reg_skip.test(next))
						return CodeMirror.Pass;
					curType = 'both';
				} else
					return CodeMirror.Pass;
				if (!type)
					type = curType;
				else if (type != curType)
					return CodeMirror.Pass;
			}

			var right = pos % 2 ? ch : pairs.charAt(pos + 1);

			if (type == 'both') {
				cm.operation(function() {
					cm.replaceSelection(left, null);
					delay && clearTimeout(delay);
					delay = setTimeout(function() {
						cm.operation(function() {
							cm.replaceSelection(right, 'before');
							cm.triggerElectric(right);
						});
					}, 350);
				});
			}
		}

		function charsAround(cm, pos) {
			var str = cm.getRange(Pos(pos.line, pos.ch - 1),
				Pos(pos.line, pos.ch + 1));
			return str.length == 2 ? str : null;
		}
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		var defaults = {
			style: 'matchhighlight',
			minChars: 2,
			delay: 100,
			wordsOnly: false,
			annotateScrollbar: false,
			showToken: false,
			trim: true
		};

		var countel = null;

		function refreshcount() {
			if (!countel)
				countel = $('.search').find('.count');
			setTimeout2(defaults.style, function() {
				if (countel) {
					var tmp = document.querySelectorAll('.cm-matchhighlight').length;
					countel.text(tmp + 'x').tclass('hidden', !tmp);
				}
			}, 100);
		}

		function State(options) {
			this.options = {};
			for (var name in defaults)
				this.options[name] = (options && options.hasOwnProperty(name) ? options : defaults)[name];
			this.overlay = this.timeout = null;
			this.matchesonscroll = null;
			this.active = false;
		}

		CodeMirror.defineOption('highlightSelectionMatches', false, function(cm, val, old) {
			if (old && old != CodeMirror.Init) {
				removeOverlay(cm);
				clearTimeout(cm.state.matchHighlighter.timeout);
				cm.state.matchHighlighter = null;
				cm.off('cursorActivity', cursorActivity);
				cm.off('focus', onFocus);
			}

			if (val) {
				var state = cm.state.matchHighlighter = new State(val);
				if (cm.hasFocus()) {
					state.active = true;
					highlightMatches(cm);
				} else {
					cm.on('focus', onFocus);
				}
				cm.on('cursorActivity', cursorActivity);
			}
		});

		function cursorActivity(cm) {
			var state = cm.state.matchHighlighter;
			if (state.active || cm.hasFocus())
				scheduleHighlight(cm, state);
		}

		function onFocus(cm) {
			var state = cm.state.matchHighlighter;
			if (!state.active) {
				state.active = true;
				scheduleHighlight(cm, state);
			}
		}

		function scheduleHighlight(cm, state) {
			clearTimeout(state.timeout);
			state.timeout = setTimeout(highlightMatches, 300, cm);
			// }, state.options.delay);
		}

		function addOverlay(cm, query, hasBoundary, style) {
			var state = cm.state.matchHighlighter;
			cm.addOverlay(state.overlay = makeOverlay(query, hasBoundary, style));
			if (state.options.annotateScrollbar && cm.showMatchesOnScrollbar) {
				var searchFor = hasBoundary ? new RegExp('\\b' + query.replace(/[\\[.+*?(){|^$]/g, '\\$&') + '\\b') : query;
				state.matchesonscroll = cm.showMatchesOnScrollbar(searchFor, false, { className: 'CodeMirror-selection-highlight-scrollbar' });
			}
		}

		function removeOverlay(cm) {
			var state = cm.state.matchHighlighter;
			if (state.overlay) {
				cm.removeOverlay(state.overlay);
				state.overlay = null;
				if (state.matchesonscroll) {
					state.matchesonscroll.clear();
					state.matchesonscroll = null;
				}
				refreshcount();
			}
		}

		function checkstr(str) {
			for (var i = 0; i < str.length; i++) {
				var c = str.charCodeAt(i);
				if (!((c > 47 && c < 58) || (c > 64 && c < 123) || (c > 128)))
					return false;
			}
			return true;
		}

		function highlightMatches(cm) {

			cm.operation(function() {

				var state = cm.state.matchHighlighter;
				removeOverlay(cm);

				if (!cm.somethingSelected() && state.options.showToken) {
					var re = state.options.showToken === true ? /[^\W\s$]/ : state.options.showToken;
					var cur = cm.getCursor(), line = cm.getLine(cur.line), start = cur.ch, end = start;
					while (start && re.test(line.charAt(start - 1))) --start;
					while (end < line.length && re.test(line.charAt(end))) ++end;
					if (start < end)
						addOverlay(cm, line.slice(start, end), re, state.options.style);
					return;
				}

				var from = cm.getCursor('from'), to = cm.getCursor('to');
				var diff = Math.abs(from.ch - to.ch);

				if (from.line != to.line || diff < 2)
					return;

				if (state.options.wordsOnly && !isWord(cm, from, to))
					return;

				var selection = cm.getRange(from, to);

				if (!checkstr(selection))
					return;

				if (state.options.trim) selection = selection.replace(/^\s+|\s+$/g, '');
				if (selection.length >= state.options.minChars) {
					addOverlay(cm, selection, false, state.options.style);
				}
			});
			refreshcount();
		}

		function isWord(cm, from, to) {
			var str = cm.getRange(from, to);
			if (str.match(/^\w+$/) !== null) {
				if (from.ch > 0) {
					var pos = {line: from.line, ch: from.ch - 1};
					var chr = cm.getRange(pos, from);
					if (chr.match(/\W/) === null)
						return false;
				}
				if (to.ch < cm.getLine(from.line).length) {
					var pos = {line: to.line, ch: to.ch + 1};
					var chr = cm.getRange(to, pos);
					if (chr.match(/\W/) === null)
						return false;
				}
				return true;
			} else
				return false;
		}

		function boundariesAround(stream, re) {
			return (!stream.start || !re.test(stream.string.charAt(stream.start - 1))) && (stream.pos == stream.string.length || !re.test(stream.string.charAt(stream.pos)));
		}

		function makeOverlay(query, hasBoundary, style) {
			return { token: function(stream) {
				if (stream.match(query) && (!hasBoundary || boundariesAround(stream, hasBoundary)))
					return style;
				stream.next();
				stream.skipTo(query.charAt(0)) || stream.skipToEnd();
			}};
		}

		CodeMirror.commands.countMatches = function() { refreshcount(); };
		CodeMirror.commands.clearMatches = function(cm) { removeOverlay(cm); };
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {
		CodeMirror.defineOption('showTrailingSpace', false, function(cm, val, prev) {
			if (prev == CodeMirror.Init)
				prev = false;
			if (prev && !val)
				cm.removeOverlay('trailingspace');
			else if (!prev && val) {
				cm.addOverlay({ token: function(stream) {
					for (var l = stream.string.length, i = l; i; --i) {
						if (stream.string.charCodeAt(i - 1) !== 32)
							break;
					}
					if (i > stream.pos) {
						stream.pos = i;
						return null;
					}
					stream.pos = l;
					return 'trailingspace';
				}, name: 'trailingspace' });
			}
		});
	});

	CodeMirror.defineMode('totaljsresources', function() {
		var REG_KEY = /^[a-z0-9_\-.#]+/i;
		return {

			startState: function() {
				return { type: 0, keyword: 0 };
			},

			token: function(stream, state) {

				var m;

				if (stream.sol()) {

					var line = stream.string;
					if (line.substring(0, 2) === '//') {
						stream.skipToEnd();
						return 'comment';
					}

					state.type = 0;
				}

				m = stream.match(REG_KEY, true);
				if (m)
					return 'tag';

				if (!stream.string) {
					stream.next();
					return '';
				}

				var count = 0;

				while (true) {

					count++;
					if (count > 5000)
						break;

					var c = stream.peek();
					if (c === ':') {
						stream.skipToEnd();
						return 'def';
					}

					if (c === '(') {
						if (stream.skipTo(')')) {
							stream.eat(')');
							return 'variable-L';
						}
					}

				}

				stream.next();
				return '';
			}
		};
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		function Bar(cls, orientation, scroll) {
			var self = this;
			self.orientation = orientation;
			self.scroll = scroll;
			self.screen = self.total = self.size = 1;
			self.pos = 0;
			self.node = document.createElement('div');
			self.node.className = cls + '-' + orientation;
			self.inner = self.node.appendChild(document.createElement('div'));

			CodeMirror.on(self.inner, 'mousedown', function(e) {

				if (e.which != 1)
					return;

				CodeMirror.e_preventDefault(e);
				var axis = self.orientation == 'horizontal' ? 'pageX' : 'pageY';
				var start = e[axis], startpos = self.pos;

				function done() {
					CodeMirror.off(document, 'mousemove', move);
					CodeMirror.off(document, 'mouseup', done);
				}

				function move(e) {
					if (e.which != 1)
						return done();
					self.moveTo(startpos + (e[axis] - start) * (self.total / self.size));
				}

				CodeMirror.on(document, 'mousemove', move);
				CodeMirror.on(document, 'mouseup', done);
			});

			CodeMirror.on(self.node, 'click', function(e) {
				CodeMirror.e_preventDefault(e);
				var innerBox = self.inner.getBoundingClientRect(), where;
				if (self.orientation == 'horizontal')
					where = e.clientX < innerBox.left ? -1 : e.clientX > innerBox.right ? 1 : 0;
				else
					where = e.clientY < innerBox.top ? -1 : e.clientY > innerBox.bottom ? 1 : 0;
				self.moveTo(self.pos + where * self.screen);
			});

			function onWheel(e) {
				var moved = CodeMirror.wheelEventPixels(e)[self.orientation == 'horizontal' ? 'x' : 'y'];
				var oldPos = self.pos;
				self.moveTo(self.pos + moved);
				if (self.pos != oldPos) CodeMirror.e_preventDefault(e);
			}
			CodeMirror.on(self.node, 'mousewheel', onWheel);
			CodeMirror.on(self.node, 'DOMMouseScroll', onWheel);
		}

		Bar.prototype.setPos = function(pos, force) {
			var t = this;
			if (pos < 0)
				pos = 0;
			if (pos > t.total - t.screen)
				pos = t.total - t.screen;
			if (!force && pos == t.pos)
				return false;
			t.pos = pos;
			t.inner.style[t.orientation == 'horizontal' ? 'left' : 'top'] = (pos * (t.size / t.total)) + 'px';
			return true;
		};

		Bar.prototype.moveTo = function(pos) {
			var t = this;
			t.setPos(pos) && t.scroll(pos, t.orientation);
		};

		var minButtonSize = 10;

		Bar.prototype.update = function(scrollSize, clientSize, barSize) {
			var t = this;
			var sizeChanged = t.screen != clientSize || t.total != scrollSize || t.size != barSize;

			if (sizeChanged) {
				t.screen = clientSize;
				t.total = scrollSize;
				t.size = barSize;
			}

			var buttonSize = t.screen * (t.size / t.total);
			if (buttonSize < minButtonSize) {
				t.size -= minButtonSize - buttonSize;
				buttonSize = minButtonSize;
			}

			t.inner.style[t.orientation == 'horizontal' ? 'width' : 'height'] = buttonSize + 'px';
			t.setPos(t.pos, sizeChanged);
		};

		function SimpleScrollbars(cls, place, scroll) {
			var t = this;
			t.addClass = cls;
			t.horiz = new Bar(cls, 'horizontal', scroll);
			place(t.horiz.node);
			t.vert = new Bar(cls, 'vertical', scroll);
			place(t.vert.node);
			t.width = null;
		}

		SimpleScrollbars.prototype.update = function(measure) {
			var t = this;
			if (t.width == null) {
				var style = window.getComputedStyle ? window.getComputedStyle(t.horiz.node) : t.horiz.node.currentStyle;
				if (style)
					t.width = parseInt(style.height);
			}

			var width = t.width || 0;
			var needsH = measure.scrollWidth > measure.clientWidth + 1;
			var needsV = measure.scrollHeight > measure.clientHeight + 1;

			t.vert.inner.style.display = needsV ? 'block' : 'none';
			t.horiz.inner.style.display = needsH ? 'block' : 'none';

			if (needsV) {
				t.vert.update(measure.scrollHeight, measure.clientHeight, measure.viewHeight - (needsH ? width : 0));
				t.vert.node.style.bottom = needsH ? width + 'px' : '0';
			}

			if (needsH) {
				var l = 0; // measure.barLeft;
				t.horiz.update(measure.scrollWidth, measure.clientWidth, measure.viewWidth - (needsV ? width : 0) - l);
				t.horiz.node.style.right = needsV ? width + 'px' : '0';
				t.horiz.node.style.left = l + 'px';
			}

			return { right: needsV ? width : 0, bottom: needsH ? width : 0 };
		};

		SimpleScrollbars.prototype.setScrollTop = function(pos) {
			this.vert.setPos(pos);
		};

		SimpleScrollbars.prototype.setScrollLeft = function(pos) {
			this.horiz.setPos(pos);
		};

		SimpleScrollbars.prototype.clear = function() {
			var parent = this.horiz.node.parentNode;
			parent.removeChild(this.horiz.node);
			parent.removeChild(this.vert.node);
		};

		CodeMirror.scrollbarModel.simple = function(place, scroll) {
			return new SimpleScrollbars('CodeMirror-simplescroll', place, scroll);
		};

		CodeMirror.scrollbarModel.overlay = function(place, scroll) {
			return new SimpleScrollbars('CodeMirror-overlayscroll', place, scroll);
		};
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {
		CodeMirror.defineOption('showTrailingSpace', false, function(cm, val, prev) {
			if (prev == CodeMirror.Init)
				prev = false;
			if (prev && !val)
				cm.removeOverlay('trailingspace');
			else if (!prev && val) {
				cm.addOverlay({ token: function(stream) {
					for (var l = stream.string.length, i = l; i; --i) {
						if (stream.string.charCodeAt(i - 1) !== 32)
							break;
					}
					if (i > stream.pos) {
						stream.pos = i;
						return null;
					}
					stream.pos = l;
					return 'trailingspace';
				}, name: 'trailingspace' });
			}
		});
	});

	(function(mod) {
		mod(CodeMirror);
	})(function(CodeMirror) {

		CodeMirror.defineOption('scrollPastEnd', false, function(cm, val, old) {
			if (old && old != CodeMirror.Init) {
				cm.off('change', onChange);
				cm.off('refresh', updateBottomMargin);
				cm.display.lineSpace.parentNode.style.paddingBottom = '';
				cm.state.scrollPastEndPadding = null;
			}
			if (val) {
				cm.on('change', onChange);
				cm.on('refresh', updateBottomMargin);
				updateBottomMargin(cm);
			}
		});

		function onChange(cm, change) {
			if (CodeMirror.changeEnd(change).line == cm.lastLine())
				updateBottomMargin(cm);
		}

		function updateBottomMargin(cm) {
			var padding = '';

			if (cm.lineCount() > 1) {
				var totalH = cm.display.scroller.clientHeight - 30;
				var lastLineH = cm.getLineHandle(cm.lastLine()).height;
				padding = (totalH - lastLineH) + 'px';
			}

			if (cm.state.scrollPastEndPadding != padding) {
				cm.state.scrollPastEndPadding = padding;
				cm.display.lineSpace.parentNode.style.paddingBottom = padding;
				cm.off('refresh', updateBottomMargin);
				cm.setSize();
				cm.on('refresh', updateBottomMargin);
			}

		}
	});

	next();
}]);

COMPONENT('nosqlcounter', 'count:0;height:80', function(self, config, cls) {

	var cls2 = '.' + cls;
	var months = MONTHS;
	var container, labels;

	self.bindvisible();
	self.readonly();
	self.nocompile && self.nocompile();

	self.make = function() {
		self.aclass(cls);
		self.append('<div class="{1}-table"{0}><div class="{1}-cell"></div></div><div class="ui-nosqlcounter-labels"></div>'.format(config.height ? ' style="height:{0}px"'.format(config.height) : '', cls));
		container = self.find(cls2 + '-cell');
		labels = self.find(cls2 + '-labels');
	};

	self.configure = function(key, value) {
		switch (key) {
			case 'months':
				if (value instanceof Array)
					months = value;
				else
					months = value.split(',').trim();
				break;
		}
	};

	self.redraw = function(maxbars) {

		var value = self.get();
		if (!value)
			value = [];

		var dt = new Date();
		dt.setDate(1);
		var current = dt.format('yyyyMM');
		var stats = null;

		for (var i = 0; i < value.length; i++) {
			var item = value[i];
			if (item.value == null) {
				item.id = item.date;
				item.value = value[i].sum;
			}
		}

		if (config.lastvalues) {
			var max = value.length - maxbars;
			if (max < 0)
				max = 0;
			stats = value.slice(max, value.length);
		} else {
			stats = [];
			for (var i = 0; i < maxbars; i++) {
				var id = dt.format('yyyyMM');
				var item = value.findItem('id', id);
				stats.push(item ? item : { id: id, month: dt.getMonth() + 1, year: dt.getFullYear(), value: 0 });
				dt = dt.add('-1 month');
			}
			stats.reverse();
		}

		var max = null;
		for (var i = 0; i < stats.length; i++) {
			if (max == null)
				max = stats[i].value;
			else
				max = Math.max(stats[i].value, max);
		}

		var bar = 100 / maxbars;
		var builder = [];
		var dates = [];
		var cls = '';
		var min = ((20 / config.height) * 100) >> 0;
		var sum = '';

		for (var i = 0; i < stats.length; i++) {
			var item = stats[i];
			var val = item.value;

			if (val > 999)
				val = (val / 1000).format(1, 2) + 'K';

			sum += val + ',';

			var h = max === 0 ? 0 : ((item.value / max) * (100 - min));
			h += min;

			cls = item.value ? '' : 'empty';

			if (item.id === current)
				cls += (cls ? ' ' : '') + 'current';

			if (i === maxbars - 1)
				cls += (cls ? ' ' : '') + 'last';

			var w = bar.format(2, '');

			builder.push('<div style="width:{0}%" title="{3}" class="{4}"><div style="height:{1}%"><span>{2}</span></div></div>'.format(w, h.format(0, ''), val, months[item.month - 1] + ' ' + item.year, cls));
			dates.push('<div style="width:{0}%">{1}</div>'.format(w, months[item.month - 1].substring(0, 3)));
		}

		if (self.old !== sum) {
			self.old = sum;
			labels.html(dates.join(''));
			container.html(builder.join(''));
		}
	};

	self.setter = function(value) {
		if (config.count === 0) {
			self.width(function(width) {
				self.redraw(width / 30 >> 0);
			});
		} else
			self.redraw(WIDTH() === 'xs' ? config.count / 2 : config.count, value);
	};
});

COMPONENT('keyvalue', 'maxlength:100', function(self, config, cls) {

	var cls2 = '.' + cls;
	var container, content = null;
	var cempty = 'empty';
	var skip = false;
	var empty = {};

	self.nocompile && self.nocompile();
	self.template = Tangular.compile('<div class="{0}-item"><div class="{0}-item-remove"><i class="fa fa-times"></i></div><div class="{0}-item-key"><input type="text" name="key" maxlength="{{ max }}"{{ if disabled }} disabled="disabled"{{ fi }} placeholder="{{ placeholder_key }}" value="{{ key }}" autocomplete="new-password" /></div><div class="{0}-item-value"><input type="text" maxlength="{{ max }}" placeholder="{{ placeholder_value }}" value="{{ value }}" autocomplete="new-password" /></div></div>'.format(cls));

	self.binder = function(fn) {
		self.binder2 = fn;
	};

	self.binder2 = function(type, value) {
		return value;
	};

	self.configure = function(key, value, init, prev) {
		if (init)
			return;

		var redraw = false;

		switch (key) {
			case 'disabled':
				self.tclass('ui-disabled', value);
				self.find('input').prop('disabled', value);
				empty.disabled = value;
				break;
			case 'maxlength':
				self.find('input').prop('maxlength', value);
				break;
			case 'placeholderkey':
				self.find('input[name="key"]').prop('placeholder', value);
				break;
			case 'placeholdervalue':
				self.find('input[name="value"]').prop('placeholder', value);
				break;
			case 'icon':
				if (value && prev)
					self.find('i').rclass2('fa').aclass(value.indexOf(' ') === -1 ? ('fa fa-' + value) : value);
				else
					redraw = true;
				break;

			case 'label':
				redraw = true;
				break;
		}

		if (redraw) {
			self.redraw();
			self.refresh();
		}
	};

	self.redraw = function() {

		var icon = config.icon;
		var label = config.label || content;

		if (icon) {
			if (icon.indexOf(' ') === -1)
				icon = 'fa fa-' + icon;
			icon = '<i class="{0}"></i>'.format(icon);
		}

		empty.value = '';
		self.html((label ? '<div class="' + cls + '-label">{1}{0}:</div>'.format(label, icon) : '') + '<div class="' + cls + '-items"></div>' + self.template(empty).replace('-item"', '-item ' + cls + '-base"'));
		container = self.find(cls2 + '-items');
	};

	self.make = function() {

		empty.max = config.maxlength;
		empty.placeholder_key = config.placeholderkey;
		empty.placeholder_value = config.placeholdervalue;
		empty.value = '';
		empty.disabled = config.disabled;

		content = self.html();

		self.aclass(cls);
		self.disabled && self.aclass('ui-disabled');
		self.redraw();

		self.event('click', '.fa-times', function() {

			if (config.disabled)
				return;

			var el = $(this);
			var parent = el.closest(cls2 + '-item');
			var inputs = parent.find('input');
			var obj = self.get();
			!obj && (obj = {});
			var key = inputs[0].value;
			parent.remove();
			delete obj[key];

			SET(self.path, obj, 2);
			self.change(true);
		});

		self.event('focus', 'input', function() {
			config.autocomplete && self.EXEC(config.autocomplete, $(this), self);
		});

		self.event('change keypress', 'input', function(e) {

			if (config.disabled || (e.type !== 'change' && e.which !== 13))
				return;

			var el = $(this);
			var inputs = el.closest(cls2 + '-item').find('input');
			var key = self.binder2('key', inputs[0].value);
			var value = self.binder2('value', inputs.get(1).value);

			if (!key || !value)
				return;

			var base = el.closest(cls2 + '-base').length > 0;
			if (base && e.type === 'change')
				return;

			if (base) {
				var tmp = self.get();
				!tmp && (tmp = {});
				tmp[key] = value;
				self.set(tmp);
				self.change(true);
				inputs.val('');
				inputs.eq(0).focus();
				return;
			}

			var keyvalue = {};
			var k;

			container.find('input').each(function() {
				if (this.name === 'key') {
					k = this.value.trim();
				} else if (k) {
					keyvalue[k] = this.value.trim();
					k = '';
				}
			});

			skip = true;
			SET(self.path, keyvalue, 2);
			self.change(true);
		});
	};

	self.setter = function(value) {

		if (skip) {
			skip = false;
			return;
		}

		if (!value) {
			container.empty();
			self.aclass(cempty);
			return;
		}

		var builder = [];
		var keys = Object.keys(value);

		for (var i = 0; i < keys.length; i++) {
			empty.key = keys[i];
			empty.value = value[empty.key];
			builder.push(self.template(empty));
		}

		self.tclass(cempty, !builder.length);
		container.empty().append(builder.join(''));
	};
});

// Component: j-ToggleButton
// Version: 1
// Updated: 2019-10-04 20:07
COMPONENT('togglebutton', function(self, config, cls) {

	var icon;

	self.nocompile();

	self.validate = function(value) {
		return (config.disabled || !config.required) ? true : value === true;
	};

	self.configure = function(key, value, init) {
		switch (key) {
			case 'disabled':
				!init && self.tclass('ui-disabled', value);
				break;
			case 'icontrue':
			case 'iconfalse':
				if (value.indexOf(' ') === -1)
					config[key] = 'fa fa-' + value;
				break;
		}
	};

	self.make = function() {
		self.aclass(cls);
		self.append('<button><i></i></button>');
		icon = self.find('i');
		self.event('click', function() {
			if (!config.disabled) {
				self.dirty(false);
				self.getter(!self.get());
			}
		});
	};

	self.setter = function(value) {
		self.tclass(cls + '-selected', value === true);
		icon.rclass();
		if (value === true) {
			if (config.icontrue)
				icon.aclass(config.icontrue);
		} else {
			if (config.iconfalse)
				icon.aclass(config.iconfalse);
		}
	};

	self.state = function(type) {
		if (!type)
			return;
		var invalid = config.required ? self.isInvalid() : false;
		if (invalid === self.$oldstate)
			return;
		self.$oldstate = invalid;
		self.tclass(cls + '-invalid', invalid);
	};
});
// End: j-ToggleButton

// Component: j-Input
// Version: 1
// Updated: 2021-06-22 12:52
COMPONENT('input','maxlength:200;dirkey:name;dirvalue:id;increment:1;autovalue:name;direxclude:false;checkicon:fa fa-check;forcevalidation:1;searchalign:1;height:80;after:\\:',function(self,config,cls){var cls2='.'+cls,input,placeholder,dirsource,binded,customvalidator,mask,rawvalue,isdirvisible=false,nobindcamouflage=false,focused=false;self.nocompile();self.bindvisible(20);self.init=function(){Thelpers.ui_input_icon=function(val){return val.charAt(0)==='!'||val.indexOf(' ')!==-1?('<span class="ui-input-icon-custom">'+(val.charAt(0)==='!'?val.substring(1):('<i class="'+val)+'"></i>')+'</span>'):('<i class="fa fa-'+val+'"></i>')};W.ui_input_template=Tangular.compile(('{{ if label}}<div class="{0}-label">{{ if icon}}<i class="{{ icon}}"></i>{{ fi}}{{ label | raw}}{{ after | raw}}</div>{{ fi}}<div class="{0}-control{{ if licon}} {0}-licon{{ fi}}{{ if ricon || (type === \'number\' && increment) }} {0}-ricon{{ fi}}">{{ if ricon || (type === \'number\' && increment) }}<div class="{0}-icon-right{{ if type === \'number\' && increment && !ricon}} {0}-increment{{ else if riconclick || type === \'date\' || type === \'time\' || (type === \'search\' && searchalign === 1) || type === \'password\' }} {0}-click{{ fi}}">{{ if type === \'number\' && !ricon}}<i class="fa fa-caret-up"></i><i class="fa fa-caret-down"></i>{{ else}}{{ ricon | ui_input_icon}}{{ fi}}</div>{{ fi}}{{ if licon}}<div class="{0}-icon-left{{ if liconclick || (type === \'search\' && searchalign !== 1) }} {0}-click{{ fi}}">{{ licon | ui_input_icon}}</div>{{ fi}}<div class="{0}-input{{ if align === 1 || align === \'center\' }} center{{ else if align === 2 || align === \'right\' }} right{{ fi}}">{{ if placeholder && !innerlabel}}<div class="{0}-placeholder">{{ placeholder}}</div>{{ fi}}{{ if dirsource || type === \'icon\' || type === \'emoji\' || type === \'color\' }}<div class="{0}-value" tabindex="0"></div>{{ else}}{{ if type === \'multiline\' }}<textarea data-jc-bind="" style="height:{{ height}}px"></textarea>{{ else}}<input type="{{ if type === \'password\' }}password{{ else}}text{{ fi}}"{{ if autofill}} autocomplete="on" name="{{ PATH}}"{{ else}} name="input'+Date.now()+'" autocomplete="new-password"{{ fi}} data-jc-bind=""{{ if maxlength > 0}} maxlength="{{ maxlength}}"{{ fi}}{{ if autofocus}} autofocus{{ fi}} />{{ fi}}{{ fi}}</div></div>{{ if error}}<div class="{0}-error hidden"><i class="fa fa-warning"></i> {{ error}}</div>{{ fi}}').format(cls))};self.make=function(){if(!config.label)config.label=self.html();if(isMOBILE&&config.autofocus)config.autofocus=false;config.PATH=self.path.replace(/\./g,'_');self.aclass(cls+' invisible');self.rclass('invisible',100);self.redraw();self.event('input change',function(){if(nobindcamouflage)nobindcamouflage=false;else self.check()});self.event('click',cls2+'-checkbox',function(){if(config.disabled){$(this).blur();return}self.change(true);self.set(!self.get(),2)});self.event('focus','input,'+cls2+'-value',function(){if(config.disabled){$(this).blur();return}focused=true;self.camouflage(false);self.aclass(cls+'-focused');config.autocomplete&&EXEC(self.makepath(config.autocomplete),self,input.parent());if(config.autosource){var opt={};opt.element=self.element;opt.search=GET(self.makepath(config.autosource));opt.callback=function(value){var val=typeof(value)==='string'?value:value[config.autovalue];if(config.autoexec){EXEC(self.makepath(config.autoexec),value,function(val){self.set(val,2);self.change();self.bindvalue()})}else{self.set(val,2);self.change();self.bindvalue()}};SETTER('autocomplete','show',opt)}else if(config.mask){setTimeout(function(input){input.selectionStart=input.selectionEnd=0},50,this)}else if(config.dirsource&&(config.autofocus!=false&&config.autofocus!=0)){if(!isdirvisible)self.find(cls2+'-control').trigger('click')}else if(config.type==='date'||config.type==='time'){setTimeout(function(){self.element.find(cls2+'-icon-right').trigger('click')},300)}});self.event('paste','input',function(e){if(config.mask){var val=(e.originalEvent.clipboardData||window.clipboardData).getData('text');self.set(val.replace(/\s|\t/g,''));e.preventDefault()}self.check()});self.event('keydown','input',function(e){var t=this,code=e.which;if(t.readOnly||config.disabled){if(e.keyCode!==9){if(config.dirsource){self.find(cls2+'-control').trigger('click');return}e.preventDefault();e.stopPropagation()}return}if(!config.disabled&&config.dirsource&&(code===13||code>30)){self.find(cls2+'-control').trigger('click');return}if(config.mask){if(e.metaKey){if(code===8||code===127){e.preventDefault();e.stopPropagation()}return}if(code===32){e.preventDefault();e.stopPropagation();return}var beg=e.target.selectionStart,end=e.target.selectionEnd,val=t.value,c;if(code===8||code===127){if(beg===end){c=config.mask.substring(beg-1,beg);t.value=val.substring(0,beg-1)+c+val.substring(beg);self.curpos(beg-1)}else{for(var i=beg;i<=end;i++){c=config.mask.substring(i-1,i);val=val.substring(0,i-1)+c+val.substring(i)}t.value=val;self.curpos(beg)}e.preventDefault();return}if(code>40){var cur=String.fromCharCode(code);if(mask&&mask[beg]){if(!mask[beg].test(cur)){e.preventDefault();return}}c=config.mask.charCodeAt(beg);if(c!==95){beg++;while(true){c=config.mask.charCodeAt(beg);if(c===95||isNaN(c))break;else beg++}}if(c===95){val=val.substring(0,beg)+cur+val.substring(beg+1);t.value=val;beg++;while(beg<config.mask.length){c=config.mask.charCodeAt(beg);if(c===95)break;else beg++}self.curpos(beg)}else self.curpos(beg+1);e.preventDefault();e.stopPropagation()}}});self.event('blur','input,'+cls2+'-value',function(){focused=false;self.camouflage(true);self.rclass(cls+'-focused')});self.event('click',cls2+'-control',function(){if(config.disabled||isdirvisible)return;if(config.type==='icon'){opt={};opt.element=self.element;opt.value=self.get();opt.empty=true;opt.callback=function(val){self.change(true);self.set(val,2);self.check();rawvalue.focus()};SETTER('faicons','show',opt);return}else if(config.type==='color'){opt={};opt.element=self.element;opt.value=self.get();opt.empty=true;opt.callback=function(al){self.change(true);self.set(al,2);self.check();rawvalue.focus()};SETTER('colorpicker','show',opt);return}else if(config.type==='emoji'){opt={};opt.element=self.element;opt.value=self.get();opt.empty=true;opt.callback=function(al){self.change(true);self.set(al,2);self.check();rawvalue.focus()};SETTER('emoji','show',opt);return}if(!config.dirsource)return;isdirvisible=true;setTimeout(function(){isdirvisible=false},500);var opt={};opt.element=self.find(cls2+'-control');opt.items=dirsource||GET(self.makepath(config.dirsource));opt.offsetY=-1+(config.diroffsety||0);opt.offsetX=0+(config.diroffsetx||0);opt.placeholder=config.dirplaceholder;opt.render=config.dirrender?GET(self.makepath(config.dirrender)):null;opt.custom=!!config.dircustom;opt.offsetWidth=2;opt.minwidth=config.dirminwidth||200;opt.maxwidth=config.dirmaxwidth;opt.key=config.dirkey||config.key;opt.empty=config.dirempty;opt.checkbox=!!config.multiple;var val=self.get();if(config.multiple){for(var i=0;i<opt.items.length;i++){var item=opt.items[i];if(val instanceof Array)item.selected=val.indexOf(item[config.dirvalue||config.value])!==-1;else item.selected=false}}else opt.selected=val;if(config.dirraw)opt.raw=true;if(config.dirsearch!=null)opt.search=config.dirsearch;if(dirsource&&config.direxclude==false&&!config.multiple){for(var i=0;i<dirsource.length;i++){var item=dirsource[i];if(item)item.selected=typeof(item)==='object'&&item[config.dirvalue]===val}}else if(config.direxclude){opt.exclude=function(item){return item?item[config.dirvalue]===val:false}}opt.callback=function(item,el,custom){if(item==null||(config.multiple&&!item.length)){rawvalue.html('');self.set(config.multiple?[]:null,2);self.change();self.check();return}if(config.multiple){var arr=[];for(var i=0;i<item.length;i++){var m=item[i];arr.push(m[config.dirvalue||config.value])}self.set(arr,2);self.change(true);return}var val=custom||typeof(item)==='string'?item:item[config.dirvalue||config.value];if(custom&&typeof(config.dircustom)==='string'){var fn=GET(config.dircustom);fn(val,function(val){self.set(val,2);self.change(true);self.bindvalue()})}else if(custom){if(val){self.set(val,2);self.change(true);if(dirsource)self.bindvalue();else input.val(val)}}else{self.set(val,2);self.change(true);if(dirsource)self.bindvalue();else input.val(val)}rawvalue.focus()};SETTER('directory','show',opt)});self.event('click',cls2+'-placeholder,'+cls2+'-label',function(e){if(!config.disabled){if(config.dirsource){e.preventDefault();e.stopPropagation();self.find(cls2+'-control').trigger('click')}else if(!config.camouflage||$(e.target).hclass(cls+'-placeholder')){if(input.length)input.focus();else rawvalue.focus()}}});self.event('click',cls2+'-icon-left,'+cls2+'-icon-right',function(e){if(config.disabled)return;var el=$(this);var left=el.hclass(cls+'-icon-left');var opt;if(config.dirsource&&left&&config.liconclick){e.preventDefault();e.stopPropagation()}if(!left&&!config.riconclick){if(config.type==='date'){opt={};opt.element=self.element;opt.value=self.get();opt.callback=function(val){self.change(true);self.set(val)};SETTER('datepicker','show',opt)}else if(config.type==='time'){opt={};opt.element=self.element;opt.value=self.get();opt.callback=function(val){self.change(true);self.set(val)};SETTER('timepicker','show',opt)}else if(config.type==='search')self.set('');else if(config.type==='password')self.password();else if(config.type==='number'){var tmp=$(e.target);if(tmp.attr('class').indexOf('fa-')!==-1){var n=tmp.hclass('fa-caret-up')?1:-1;self.change(true);var val=self.preparevalue((self.get()||0)+(config.increment*n));self.set(val,2)}}return}if(left&&config.liconclick)EXEC(self.makepath(config.liconclick),self,el);else if(config.riconclick)EXEC(self.makepath(config.riconclick),self,el);else if(left&&config.type==='search')self.set('')})};self.camouflage=function(is){if(config.camouflage){if(is){var t=input[0],arr=t.value.split('');for(var i=0;i<arr.length;i++)arr[i]=typeof(config.camouflage)==='string'?config.camouflage:'•';nobindcamouflage=true;t.value=arr.join('')}else{nobindcamouflage=true;var val=self.get();input[0].value=val==null?'':val}self.tclass(cls+'-camouflaged',is)}};self.curpos=function(pos){var el=input[0];if(el.createTextRange){var range=el.createTextRange();range.move('character',pos);range.select()}else if(el.selectionStart){el.focus();el.setSelectionRange(pos,pos)}};self.validate=function(value){if((!config.required||config.disabled)&&!self.forcedvalidation())return true;if(config.disabled)return true;if(config.dirsource)return!!value;if(customvalidator)return customvalidator(value);if(config.type==='date')return value instanceof Date&&!isNaN(value.getTime());if(config.type==='checkbox')return value===true;if(value==null)value='';else value=value.toString();if(config.mask&&typeof(value)==='string'&&value.indexOf('_')!==-1)return false;if(config.minlength&&value.length<config.minlength)return false;switch(config.type){case'email':return value.isEmail();case'phone':return value.isPhone();case'url':return value.isURL();case'zip':return(/^\d{5}(?:[-\s]\d{4})?$/).test(value);case'currency':case'number':value=value.parseFloat();if((config.minvalue!=null&&value<config.minvalue)||(config.maxvalue!=null&&value>config.maxvalue))return false;return config.minvalue==null?value>0:true}return value.length>0};self.offset=function(){var offset=self.element.offset();var control=self.find(cls2+'-control');var width=control.width()+2;return{left:offset.left,top:control.offset().top+control.height(),width:width}};self.password=function(show){var visible=show==null?input.attr('type')==='text':show;input.attr('type',visible?'password':'text');self.find(cls2+'-icon-right').find('i').tclass(config.ricon,visible).tclass('fa-eye-slash',!visible)};self.preparevalue=function(value){if(config.type==='number'&&(config.minvalue!=null||config.maxvalue!=null)){var tmp=typeof(value)==='string'?+value.replace(',','.'):value;if(config.minvalue>tmp)value=config.minvalue;if(config.maxvalue<tmp)value=config.maxvalue}return value};self.getterin=self.getter;self.getter=function(value,realtime,nobind){if(nobindcamouflage)return;if(config.mask&&config.masktidy){var val=[];for(var i=0;i<value.length;i++){if(config.mask.charAt(i)==='_')val.push(value.charAt(i))}value=val.join('')}self.getterin(self.preparevalue(value),realtime,nobind)};self.setterin=self.setter;self.setter=function(value,path,type){if(config.mask){if(value){if(config.masktidy){var index=0,val=[];for(var i=0;i<config.mask.length;i++){var c=config.mask.charAt(i);val.push(c==='_'?(value.charAt(index++)||'_'):c)}value=val.join('')}if(mask){var arr=[];for(var i=0;i<mask.length;i++){var c=value.charAt(i);if(mask[i]&&mask[i].test(c))arr.push(c);else arr.push(config.mask.charAt(i))}value=arr.join('')}}else value=config.mask}self.setterin(value,path,type);self.bindvalue();config.camouflage&&!focused&&setTimeout(self.camouflage,type==='show'?2000:1,true);if(config.type==='password')self.password(true)};self.check=function(){var is=false;if(config.dirsource)is=!!rawvalue.text();else is=input&&input.length?!!input[0].value:!!self.get();if(binded===is)return;binded=is;placeholder&&placeholder.tclass('hidden',is);self.tclass(cls+'-binded',is);if(config.type==='search')self.find(cls2+'-icon-'+(config.searchalign===1?'right':'left')).find('i').tclass(config.searchalign===1?config.ricon:config.licon,!is).tclass('fa-times',is)};self.bindvalue=function(){var value=self.get();if(dirsource){var item,text=[];for(var i=0;i<dirsource.length;i++){item=dirsource[i];if(typeof(item)==='string'){if(item===value)break;item=null}else if(config.multiple){var v=item[config.dirvalue||config.value],index=value instanceof Array?value.indexOf(v):-1;if(index!==-1)text.push(item[config.dirkey||config.key])}else if(item[config.dirvalue||config.value]===value){item=item[config.dirkey||config.key];break}else item=null}if(config.multiple){item=text.join(', ')}else if(value&&item==null&&config.dircustom)item=value;if(config.dirraw)rawvalue.html(item||'');else rawvalue.text(item||'')}else if(config.dirsource){if(config.dirraw)rawvalue.html(value||'');else rawvalue.text(value||'')}else{switch(config.type){case'color':rawvalue.css('background-color',value||'');break;case'icon':rawvalue.html('<i class="{0}"></i>'.format(value||''));break;case'emoji':rawvalue.html(value);break;case'checkbox':self.tclass(cls+'-checked',value===true);break}}self.check()};self.redraw=function(){if(!config.ricon){if(config.dirsource)config.ricon='angle-down';else if(config.type==='date'){config.ricon='calendar';if(!config.align&&!config.innerlabel)config.align=1}else if(config.type==='icon'||config.type==='color'||config.type==='emoji'){config.ricon='angle-down';if(!config.align&&!config.innerlabel)config.align=1}else if(config.type==='time'){config.ricon='clock-o';if(!config.align&&!config.innerlabel)config.align=1}else if(config.type==='search')if(config.searchalign===1)config.ricon='search';else config.licon='search';else if(config.type==='password')config.ricon='eye';else if(config.type==='number'){if(!config.align&&!config.innerlabel)config.align=1}}self.tclass(cls+'-masked',!!config.mask);self.rclass2(cls+'-type-');if(config.type)self.aclass(cls+'-type-'+config.type);var html,is=false;if(config.type==='checkbox'){html='<div class="{0}-checkbox"><span><i class="{checkicon}"></i></span><label>{label}</label></div>'.format(cls).arg(config)}else{is=true;html=W.ui_input_template(config)}self.html(html);if(is){input=self.find('input,textarea');rawvalue=self.find(cls2+'-value');placeholder=self.find(cls2+'-placeholder')}else input=rawvalue=placeholder=null};self.configure=function(key,value){switch(key){case'icon':if(value&&value.indexOf(' ')===-1)config.icon='fa fa-'+value;break;case'dirsource':if(config.dirajax||value.indexOf('/')!==-1){dirsource=null;self.bindvalue()}else{if(value.indexOf(',')!==-1){dirsource=self.parsesource(value);self.bindvalue()}else{self.datasource(value,function(path,value){dirsource=value;self.bindvalue()})}}self.tclass(cls+'-dropdown',!!value);input.prop('readonly',!!config.disabled||!!config.dirsource);break;case'disabled':self.tclass('ui-disabled',!!value);input&&input.prop('readonly',!!value||!!config.dirsource);self.reset();break;case'required':self.tclass(cls+'-required',!!value);self.reset();break;case'type':self.type=value;break;case'validate':customvalidator=value?(/\(|=|>|<|\+|-|\)/).test(value)?FN('value=>'+value):(function(path){path=self.makepath(path);return function(value){return GET(path)(value)}})(value):null;break;case'innerlabel':self.tclass(cls+'-inner',!!value);break;case'monospace':self.tclass(cls+'-monospace',!!value);break;case'maskregexp':if(value){mask=value.toLowerCase().split(',');for(var i=0;i<mask.length;i++){var m=mask[i];if(!m||m==='null')mask[i]='';else mask[i]=new RegExp(m)}}else mask=null;break;case'mask':config.mask=value.replace(/#/g,'_');break}};self.formatter(function(path,value){if(value){switch(config.type){case'lower':return(value+'').toLowerCase();case'upper':return(value+'').toUpperCase();case'phone':return(value+'').replace(/\s/g,'');case'email':return(value+'').toLowerCase();case'date':return value.format(config.format||DEF.dateformat||'yyyy-MM-dd');case'time':return value.format(config.format||'HH:mm');case'number':return config.format?value.format(config.format):value}}return value});self.parser(function(path,value){if(value){var tmp;switch(config.type){case'date':tmp=self.get();if(tmp)tmp=tmp.format('HH:mm');else tmp='';return value+(tmp?(' '+tmp):'');case'lower':case'email':value=value.toLowerCase();break;case'upper':value=value.toUpperCase();break;case'phone':value=value.replace(/\s/g,'');break;case'time':tmp=value.split(':');var dt=self.get();value=dt?new Date(dt.getTime()):new Date();value.setHours((tmp[0]||'0').parseInt());value.setMinutes((tmp[1]||'0').parseInt());value.setSeconds((tmp[2]||'0').parseInt());break}}return value?config.spaces===false?value.replace(/\s/g,''):value:value});self.state=function(type,what){if(type){if(type===1&&what===4){self.rclass(cls+'-ok '+cls+'-invalid');self.$oldstate=null;return}var invalid=config.required?self.isInvalid():self.forcedvalidation()?self.isInvalid():false;if(invalid!==self.$oldstate){self.$oldstate=invalid;self.tclass(cls+'-invalid',invalid);self.tclass(cls+'-ok',!invalid);config.error&&self.find(cls2+'-error').tclass('hidden',!invalid)}}};self.forcedvalidation=function(){if(!config.forcevalidation)return false;if(config.type==='number')return false;var val=self.get();if(config.type==='checkbox')return val===true;return(config.type==='phone'||config.type==='email')&&(val!=null&&(typeof(val)==='string'&&val.length!==0))}});
// End: j-Input

// Component: j-Exec
// Version: 1
// Updated: 2021-05-26 15:05
COMPONENT('exec',function(self,config){var regparent=/\?\d/;self.readonly();self.blind();self.make=function(){var scope=null,scopepath=function(el,val){if(!scope)scope=el.scope();return val==null?scope:scope?scope.makepath?scope.makepath(val):val.replace(/\?/g,el.scope().path):val};var fn=function(plus,forceprevent){return function(e){var el=$(this);var attr=el.attrd('exec'+plus);var path=el.attrd('path'+plus);var href=el.attrd('href'+plus);var def=el.attrd('def'+plus);var reset=el.attrd('reset'+plus);scope=null;var prevent=forceprevent?'1':el.attrd('prevent'+plus);if(prevent==='true'||prevent==='1'){e.preventDefault();e.stopPropagation()}if(attr){if(attr.indexOf('?')!==-1){var tmp=scopepath(el);if(tmp){var isparent=regparent.test(attr);attr=tmp.makepath?tmp.makepath(attr):attr.replace(/\?/g,tmp.path);if(isparent&&attr.indexOf('/')!==-1)M.scope(attr.split('/')[0]);else M.scope(tmp.path)}}EXEC(attr,el,e)}href&&NAV.redirect(href);if(def){if(def.indexOf('?')!==-1)def=scopepath(el,def);DEFAULT(def)}if(reset){if(reset.indexOf('?')!==-1)reset=scopepath(el,reset);RESET(reset)}if(path){var val=el.attrd('value');if(val){if(path.indexOf('?')!==-1)path=scopepath(el,path);var v=GET(path);SET(path,new Function('value','return '+val)(v),true)}}}};self.event('contextmenu',config.selector3||'.exec3',fn('3',true));self.event('dblclick',config.selector2||'.exec2',fn('2'));self.event('click',config.selector||'.exec',fn(''))}});
// End: j-Exec

// Component: j-Directory
// Version: 1
// Updated: 2021-06-17 01:52
COMPONENT('directory','minwidth:200',function(self,config,cls){var cls2='.'+cls,container,timeout,icon,plus,skipreset=false,skipclear=false,ready=false,input=null,issearch=false,is=false,selectedindex=0,resultscount=0,skiphide=false,templateE='{{ name | encode | ui_directory_helper}}',templateR='{{ name | raw}}',template='<li data-index="{{ $.index}}" data-search="{{ $.search}}" {{ if selected}} class="current selected{{ if classname}} {{ classname}}{{ fi}}"{{ else if classname}} class="{{ classname}}"{{ fi}}>{{ if $.checkbox}}<span class="'+cls+'-checkbox"><i class="fa fa-check"></i></span>{{ fi}}{0}</li>',templateraw=template.format(templateR);var regstrip=/(&nbsp;|<([^>]+)>)/ig;var parentclass;template=template.format(templateE);Thelpers.ui_directory_helper=function(val){var t=this;return t.template?(typeof(t.template)==='string'?t.template.indexOf('{{')===-1?t.template:Tangular.render(t.template,this):t.render(this,val)):self.opt.render?self.opt.render(this,val):val};self.template=Tangular.compile(template);self.templateraw=Tangular.compile(templateraw);self.readonly();self.singleton();self.nocompile&&self.nocompile();self.configure=function(key,value,init){if(init)return;switch(key){case'placeholder':self.find('input').prop('placeholder',value);break}};self.make=function(){self.aclass(cls+' hidden');self.append('<div class="{1}-search"><span class="{1}-add hidden"><i class="fa fa-plus"></i></span><span class="{1}-button"><i class="fa fa-search"></i></span><div><input type="text" placeholder="{0}" class="{1}-search-input" name="dir{2}" autocomplete="new-password" /></div></div><div class="{1}-container"><ul></ul></div>'.format(config.placeholder,cls,Date.now()));container=self.find('ul');input=self.find('input');icon=self.find(cls2+'-button').find('.fa');plus=self.find(cls2+'-add');self.event('mouseenter mouseleave','li',function(){if(ready&&!issearch){container.find('li.current').rclass('current');$(this).aclass('current');var arr=container.find('li:visible');for(var i=0;i<arr.length;i++){if($(arr[i]).hclass('current')){selectedindex=i;break}}}});self.event('focus','input',function(){if(self.opt.search===false)$(this).blur()});self.event('click',cls2+'-button',function(e){skipclear=false;input.val('');self.search();e.stopPropagation();e.preventDefault()});self.event('click',cls2+'-add',function(){if(self.opt.custom&&self.opt.callback){self.opt.scope&&M.scope(self.opt.scope);self.opt.callback(input.val(),self.opt.element,true);self.hide()}});self.event('click','li',function(e){if(self.opt.callback){self.opt.scope&&M.scope(self.opt.scope);var item=self.opt.items[+this.getAttribute('data-index')];if(self.opt.checkbox){item.selected=!item.selected;$(this).tclass('selected',item.selected);var response=[];for(var i=0;i<self.opt.items.length;i++){var m=self.opt.items[i];if(m.selected)response.push(m)}self.opt.callback(response,self.opt.element,false,e);skiphide=true}else self.opt.callback(item,self.opt.element,false,e)}is=true;if(!self.opt.checkbox){self.hide(0);e.preventDefault();e.stopPropagation()}});var e_click=function(e){if(skiphide){skiphide=false;return}var node=e.target,count=0;if(is){while(true){var c=node.getAttribute('class')||'';if(c.indexOf(cls+'-search-input')!==-1)return;node=node.parentNode;if(!node||!node.tagName||node.tagName==='BODY'||count>3)break;count++}}else{is=true;while(true){var c=node.getAttribute('class')||'';if(c.indexOf(cls)!==-1){is=false;break}node=node.parentNode;if(!node||!node.tagName||node.tagName==='BODY'||count>4)break;count++}}is&&self.hide(0)};var e_resize=function(){is&&self.hide(0)};self.bindedevents=false;self.bindevents=function(){if(!self.bindedevents){$(document).on('click',e_click);$(W).on('resize',e_resize);self.bindedevents=true}};self.unbindevents=function(){if(self.bindedevents){self.bindedevents=false;$(document).off('click',e_click);$(W).off('resize',e_resize)}};self.event('keydown','input',function(e){var o=false;switch(e.which){case 8:skipclear=false;break;case 27:o=true;self.hide();break;case 13:o=true;var sel=self.find('li.current');if(self.opt.callback){self.opt.scope&&M.scope(self.opt.scope);var index=+sel.attrd('index');if(self.opt.custom&&(!sel.length||index===-1))self.opt.callback(this.value,self.opt.element,true);else self.opt.callback(self.opt.items[index],self.opt.element)}self.hide();break;case 38:o=true;selectedindex--;if(selectedindex<0)selectedindex=0;self.move();break;case 40:o=true;selectedindex++;if(selectedindex>=resultscount)selectedindex=resultscount;self.move();break}if(o){e.preventDefault();e.stopPropagation()}});self.event('input','input',function(){issearch=true;setTimeout2(self.ID,self.search,100,null,this.value)});var fn=function(){is&&self.hide(1)};self.on('reflow + scroll + resize + resize2',fn);$(W).on('scroll',fn)};self.move=function(){var counter=0,scroller=container.parent();var li=container.find('li');var hli=0,was=false,last=-1,lastselected=0,plus=0;for(var i=0;i<li.length;i++){var el=$(li[i]);if(el.hclass('hidden')){el.rclass('current');continue}var is=selectedindex===counter;el.tclass('current',is);if(is){hli=(el.innerHeight()||30)+1;plus=(hli*2);was=true;var t=(hli*(counter||1));scroller[0].scrollTop=t-plus}counter++;last=i;lastselected++}if(!was&&last>=0){selectedindex=lastselected;li.eq(last).aclass('current')}};var nosearch=function(){issearch=false};self.nosearch=function(){setTimeout2(self.ID+'nosearch',nosearch,500)};self.search=function(value){if(!self.opt)return;icon.tclass('fa-times',!!value).tclass('fa-search',!value);self.opt.custom&&plus.tclass('hidden',!value);if(!value&&!self.opt.ajax){if(!skipclear)container.find('li').rclass('hidden');if(!skipreset)selectedindex=0;resultscount=self.opt.items?self.opt.items.length:0;self.move();self.nosearch();return}resultscount=0;selectedindex=0;if(self.opt.ajax){var val=value||'';if(self.ajaxold!==val){self.ajaxold=val;setTimeout2(self.ID,function(val){self.opt&&self.opt.ajax(val,function(items){var builder=[],indexer={},item,key=(self.opt.search==true?self.opt.key:(self.opt.search||self.opt.key))||'name';for(var i=0;i<items.length;i++){item=items[i];if(self.opt.exclude&&self.opt.exclude(item))continue;indexer.index=i;indexer.search=item[key]?item[key].replace(regstrip,''):'';indexer.checkbox=self.opt.checkbox===true;resultscount++;builder.push(self.opt.ta(item,indexer))}if(self.opt.empty){item={};var tmp=self.opt.raw?'<b>{0}</b>'.format(self.opt.empty):self.opt.empty;item[self.opt.key||'name']=tmp;if(!self.opt.raw)item.template='<b>{0}</b>'.format(self.opt.empty);indexer.index=-1;builder.unshift(self.opt.ta(item,indexer))}skipclear=true;self.opt.items=items;container.html(builder);self.move();self.nosearch()})},300,null,val)}}else if(value){value=value.toSearch().split(' ');var arr=container.find('li');for(var i=0;i<arr.length;i++){var el=$(arr[i]);var val=el.attrd('search').toSearch();var is=false;for(var j=0;j<value.length;j++){if(val.indexOf(value[j])===-1){is=true;break}}el.tclass('hidden',is);if(!is)resultscount++}skipclear=true;self.move();self.nosearch()}};self.show=function(opt){var el=opt.element instanceof jQuery?opt.element[0]:opt.element;if(opt.items==null)opt.items=EMPTYARRAY;self.tclass(cls+'-default',!opt.render);if(parentclass){self.rclass(parentclass);parentclass=null}if(opt.classname){self.aclass(opt.classname);parentclass=opt.classname}if(!opt.minwidth)opt.minwidth=200;if(is){clearTimeout(timeout);if(self.target===el){self.hide(1);return}}self.initializing=true;self.target=el;opt.ajax=null;self.ajaxold=null;var element=$(opt.element);var callback=opt.callback,items=opt.items,type=typeof(items);var item;if(type==='string'){items=opt.items=GET(items);type=typeof(items)}if(type==='function'&&callback){type='';opt.ajax=items;items=null}if(!items&&!opt.ajax){self.hide(0);return}setTimeout(self.bindevents,500);self.tclass(cls+'-search-hidden',opt.search===false);self.opt=opt;opt.class&&self.aclass(opt.class);input.val('');var builder=[],selected=null;opt.ta=opt.key?Tangular.compile((opt.raw?templateraw:template).replace(/\{\{\sname/g,'{{ '+opt.key)):opt.raw?self.templateraw:self.template;if(!opt.ajax){var indexer={},key=(opt.search==true?opt.key:(opt.search||opt.key))||'name';for(var i=0;i<items.length;i++){item=items[i];if(typeof(item)==='string')item={name:item,id:item,selected:item===opt.selected};if(opt.exclude&&opt.exclude(item))continue;if(item.selected||opt.selected===item){selected=i;skipreset=true;item.selected=true}else item.selected=false;indexer.checkbox=opt.checkbox===true;indexer.index=i;indexer.search=item[key]?item[key].replace(regstrip,''):'';builder.push(opt.ta(item,indexer))}if(opt.empty){item={};var tmp=opt.raw?'<b>{0}</b>'.format(opt.empty):opt.empty;item[opt.key||'name']=tmp;if(!opt.raw)item.template='<b>{0}</b>'.format(opt.empty);indexer.index=-1;builder.unshift(opt.ta(item,indexer))}}self.target=element[0];var w=element.width();var offset=element.offset();var width=w+(opt.offsetWidth||0);if(opt.minwidth&&width<opt.minwidth)width=opt.minwidth;else if(opt.maxwidth&&width>opt.maxwidth)width=opt.maxwidth;ready=false;opt.ajaxold=null;plus.aclass('hidden');self.find('input').prop('placeholder',opt.placeholder||config.placeholder);var scroller=self.find(cls2+'-container').css('width',width+30);container.html(builder);var options={left:0,top:0,width:width};switch(opt.align){case'center':options.left=Math.ceil((offset.left-width/2)+(opt.element.innerWidth()/2));break;case'right':options.left=(offset.left-width)+opt.element.innerWidth();break;default:options.left=offset.left;break}options.top=opt.position==='bottom'?((offset.top-self.height())+element.height()):offset.top;options.scope=M.scope?M.scope():'';if(opt.offsetX)options.left+=opt.offsetX;if(opt.offsetY)options.top+=opt.offsetY;var mw=width,mh=self.height();if(options.left<0)options.left=10;else if((mw+options.left)>WW)options.left=(WW-mw)-10;var dom=opt.element[0].parentNode,restrict=true;while(dom){if(dom.tagName==='BODY'){restrict=false;break}if(dom.classList.contains('ui-scrollbar-area'))break;dom=dom.parentNode}if(options.top<0)options.top=10;else if(restrict&&(mh+options.top)>WH)options.top=(WH-mh)-10;self.css(options);!isMOBILE&&setTimeout(function(){ready=true;if(opt.search!==false)input.focus()},200);setTimeout(function(){self.initializing=false;is=true;if(selected==null)scroller[0].scrollTop=0;else{var h=container.find('li:first-child').innerHeight()+1;var y=(container.find('li.selected').index()*h)-(h*2);scroller[0].scrollTop=y<0?0:y}},100);if(is){self.search();return}selectedindex=selected||0;resultscount=items?items.length:0;skipclear=true;self.search();self.rclass('hidden');setTimeout(function(){if(self.opt&&self.target&&self.target.offsetParent)self.aclass(cls+'-visible');else self.hide(1)},100);skipreset=false};self.hide=function(sleep){if(!is||self.initializing)return;clearTimeout(timeout);timeout=setTimeout(function(){self.unbindevents();self.rclass(cls+'-visible').aclass('hidden');if(self.opt){self.opt.close&&self.opt.close();self.opt.class&&self.rclass(self.opt.class);self.opt=null}is=false},sleep?sleep:100)}});
// End: j-Directory

