const Fs = require('fs');
const CSS = 'widgets.css';
const JS = 'widgets.js';
const JSEDITOR = 'editor.js';
const INSTALLED = {};
const WARNING = { type: 'warning' };

MAIN.widgets = {};

function WidgetInstace() {
}

WidgetInstace.prototype.globals = WidgetInstace.prototype.variables = WidgetInstace.prototype.variable = function(name, value) {
	$WORKFLOW('Pages/Globals', 'add', { name: name, value: value }, NOOP);
};

NEWSCHEMA('Widgets', function(schema) {

	schema.define('id', UID);
	schema.define('name', String, true);
	schema.define('category', 'String(50)');
	schema.define('body', String);
	schema.define('picture', 'String(50)'); // A preview
	schema.define('icon', 'Lower(40)');
	schema.define('reference', 'String(50)');
	schema.define('replace', Boolean);

	// Gets listing
	schema.setQuery(function($) {
		var filter = NOSQL('widgets').list();
		filter.sort('dtcreated_desc');
		filter.fields('id,picture,name,icon,category,dtcreated,reference,dtupdated');
		filter.callback($.callback);
	});

	// Gets widget detail
	schema.setGet(function($) {
		var opt = $.options;
		var filter = NOSQL('widgets').one();
		var id = opt.id || $.controller.id;
		opt.url && filter.where('url', opt.url);
		filter.id(id);
		filter.callback($.callback, 'error-widgets-404');
		FUNC.alert($.user, 'widgets/edit', id);
	});

	schema.setSave(function($) {

		var nosql = NOSQL('widgets');
		var user = $.user.name;
		var model = $.model;

		// Importing ...
		// It tries to find existing widget according to the reference
		if (model.reference && !model.id) {
			var keys = Object.keys(MAIN.widgets);
			for (var i = 0; i < keys.length; i++) {
				if (MAIN.widgets[keys[i]].reference === model.reference)
					model.id = keys[i];
			}
		}

		var update = !!model.id;

		if (update) {
			model.dtupdated = NOW;
		} else {
			model.id = UID();
			model.dtcreated = NOW;
			model.dtupdated = NOW;
		}

		var replace = model.replace;
		model.replace = undefined;
		var db = update ? nosql.modify(model).id(model.id).backup($.user.meta(model)) : nosql.insert(model);

		db.callback(function() {
			$SAVE('Events', { type: 'widgets/save', id: model.id, user: user, body: model.name, admin: true }, NOOP, $);
			EMIT('widgets_save', model);
			refresh(() => replace && $WORKFLOW('Widgets', 'replace', { id: model.id }, ERROR('widgets.save')));
			$.success();
		});
	});

	// Removes a specific widget
	schema.setRemove(function($) {
		NOSQL('widgets').remove().id($.id).callback(function(err, count) {

			if (INSTALLED[$.id]) {
				var w = MAIN.widgets[$.id];
				w && w.total && w.total.uninstall && w.total.uninstall();
				delete INSTALLED[$.id];
			}

			$.success();
			count && setTimeout2('widgets', () => refresh(null, true), 1000);
		});
	});

	schema.addWorkflow('editor', function($) {
		var body = MAIN.widgets[$.id];
		$.callback({ body: body ? body.html : '', category: body ? body.category : '' });
	});

	schema.addWorkflow('import', function($) {

		// $.options.filename;
		var keys = Object.keys(MAIN.widgets);
		var meta = $.options.filename.match(/(\/|\\)(layouts|content|columns|inline|newsletter)(\/|\\)\w+.html$/gi);

		if (meta)
			meta = meta.toString().replace(/\\/g, '/');
		else {
			$.success(false);
			return;
		}

		console.log('Updated widget --->', meta);

		for (var i = 0; i < keys.length; i++) {
			var widget = MAIN.widgets[keys[i]];
			if (widget.reference === meta) {

				// updating
				// loads file content
				Fs.readFile($.options.filename, function(err, data) {
					NOSQL('widgets').modify({ body: data.toString('utf8'), dtupdated: NOW }).id(widget.id).callback(function() {
						setTimeout2('widgets', refresh, 300);
					});
				});

				$.success();
				return;
			}
		}

		var category = meta.match(/\w+/).toString().capitalize();
		Fs.readFile($.options.filename, function(err, data) {
			NOSQL('widgets').insert({ id: UID(), name: U.getName(meta).replace('.' + U.getExtension(meta), '').capitalize(), reference: meta, body: data.toString('utf8'), dtcreated: NOW, picture: '', icon: '', category: category }).callback(function() {
				setTimeout2('widgets', refresh, 300);
			});
		});
		$.success();
	});

	schema.addWorkflow('replace', function($) {

		var id = $.options.id;
		var databases = ['pages', 'posts', 'newsletters'];
		var widgetbody = MAIN.widgets[id].html;
		var count = 0;

		databases.wait(function(name, next) {
			NOSQL(name).find().in('bodywidgets', id).fields('id,widgets,bodywidgets').callback(function(err, response) {
				response.wait(function(item, next) {
					var is = false;
					FUNC.read(name, item.id, function(err, body) {
						response.body = body;
						response.body && findwidget(id, body, function(content, html) {
							response.body = response.body.replace(html, html.replace(content, widgetbody));
							count++;
							is = true;
						});
						is && FUNC.write(name, item.id, U.minify_html(response.body), true);
						next();
					});
				}, next);
			});
		}, () => $.success(true, count));

	});
});

NEWSCHEMA('Widgets/Globals', function(schema) {

	schema.define('css', 'String');
	schema.define('js', 'String');

	schema.setSave(function($, model) {
		Fs.writeFile(PATH.databases('widgetsglobals.json'), JSON.stringify(model), function() {
			refresh(null, true);
			$.success();
		});
	});

	schema.setGet(function($) {
		Fs.readFile(PATH.databases('widgetsglobals.json'), function(err, data) {

			if (data) {
				data = data.toString('utf8').parseJSON(true);
				$.model.css = data.css;
				$.model.js = data.js;
			}

			$.callback();
		});
	});
});

function compile(html) {

	var beg = -1;
	var end = -1;

	var body_script = '';
	var body_editor = '';
	var body_style = '';
	var body_html = '';
	var body_total = '';
	var body_template = '';
	var raw = html;

	while (true) {

		beg = html.indexOf('<script', end);
		if (beg === -1)
			break;

		end = html.indexOf('</script>', beg);
		if (end === -1)
			break;

		var body = html.substring(beg, end);
		var beg = body.indexOf('>') + 1;
		var type = body.substring(0, beg);

		body = body.substring(beg);
		raw = raw.replace(type + body + '</script>', '');

		body = body.trim();

		if (type.indexOf('html') !== -1 || type.indexOf('plain') !== -1)
			body_template = body;
		else if (type.indexOf('total') !== -1 || type.indexOf('totaljs') !== -1)
			body_total = body;
		else if (type.indexOf('editor') !== -1)
			body_editor = body;
		else
			body_script = body;

		end += 9;
	}

	beg = raw.indexOf('<style');
	if (beg !== -1) {
		end = raw.indexOf('</style>');
		var tmp = raw.substring(raw.indexOf('>', beg) + 1, end);
		raw = raw.replace(raw.substring(beg, end + 8), '');
		body_style = tmp.trim();
	}

	if (!body_html) {
		raw = raw.trim();
		raw && (body_html = raw);
	}

	var obj = {};
	obj.js = body_script;
	obj.jschecksum = obj.js.hash();
	obj.editor = body_editor;
	obj.editorchecksum = obj.editor.hash();
	obj.css = body_style;
	obj.csschecksum = obj.css.hash();
	obj.html = body_html;
	obj.htmlchecksum = obj.html.hash();
	obj.template = body_template;

	if (body_total) {
		obj.total = body_total;
		obj.totalchecksum = obj.total.hash();
	} else
		obj.totalchecksum = 0;

	return obj;
}

function refresh(callback, force) {
	NOSQL('widgets').find().fields('id,name,reference,body,category').callback(function(err, items) {

		var css = [];
		var js = [];
		var jseditor = [];
		var exports = {};
		var old = MAIN.widgets;

		MAIN.widgets = {};
		MAIN.widgets.$ready = false;

		var rebuildcss = !!force;
		var rebuildjs = !!force;
		var rebuildeditor = !!force;
		var rebuildhtml = false;
		var replace = [];

		for (var i = 0, length = items.length; i < length; i++) {

			var item = items[i];
			var meta = INSTALLED[item.id];
			var prev = old ? old[item.id] : null;
			var type = 1;
			var rebuild = false;

			if (!meta) {
				meta = {};
				type = 0;
			}

			var obj = compile(item.body);

			obj.name = item.name;
			obj.category = item.category;
			obj.css && css.push(obj.css);

			if (obj.csschecksum !== meta.csschecksum) {
				meta.csschecksum = obj.csschecksum;
				rebuildcss = true;
			}

			obj.css = undefined;
			obj.js && js.push(obj.js);

			if (obj.jschecksum !== meta.jschecksum) {
				meta.jschecksum = obj.jschecksum;
				rebuildjs = true;
			}

			obj.js = undefined;
			obj.editor && jseditor.push('widget' + item.id + '=function(option,exports){' + obj.editor + '};');

			if (obj.editorchecksum !== meta.editorchecksum) {

				obj.def = {};
				meta.editorchecksum = obj.editorchecksum;

				// Applies default settings
				if (obj.editor) {
					var fn = new Function('option', 'exports', obj.editor);
					fn((name, label, value) => obj.def[name] = value, exports);
				}

				rebuildeditor = true;
			} else if (prev)
				obj.def = prev.def;

			obj.id = item.id;
			obj.reference = item.reference;
			obj.istemplate = !(obj.total && obj.total.render);

			if (obj.totalchecksum !== meta.totalchecksum) {

				if (obj.total) {
					var o = new WidgetInstace();
					try {
						(new Function('exports', obj.total))(o);
					} catch (e) {
						WARNING.message = 'Widget "{0}" exception: "{1}"'.format(item.name, e.message);
						FUNC.notify(WARNING);
					}
					obj.total = o;
					rebuild = true;
				}

				meta.totalchecksum = obj.totalchecksum;

				// Widget exists but it was modified
				if (type === 1) {
					var e = MAIN.widgets[obj.id];
					e && e.total && e.total.uninstall && e.total.uninstall();
				}
			}

			MAIN.widgets[obj.id] = obj;
			INSTALLED[obj.id] = meta;

			if (rebuild) {
				try {
					obj.total && obj.total.install && obj.total.install();
				} catch (e) {
					ERROR(e, 'Widget {0}: install'.format(obj.name));
				}
			} else if (prev)
				obj.total = prev.total;

			if (obj.htmlchecksum !== meta.htmlchecksum) {
				if (obj.total && obj.total.replace) {
					replace.push(obj.id);
					if (prev)
						rebuildhtml = true;
				}
				meta.htmlchecksum = obj.htmlchecksum;
			}
		}

		if (rebuildcss || rebuildjs || rebuildeditor) {

			$GET('Widgets/Globals', function(err, response) {

				var version = U.GUID(5);

				if (rebuildcss) {
					Fs.writeFile(PATH.temp(CSS), U.minify_css('/*auto*/\n' + (response.css ? response.css + '\n' : '') + css.join('\n')), NOOP);
					TOUCH('/' + CSS);
					MAIN.css = '/' + CSS + '?ts=' + version;
				}

				if (rebuildjs) {
					Fs.writeFile(PATH.temp(JS), U.minify_js((response.js ? response.js + ';\n' : '') + js.join('\n')), NOOP);
					TOUCH('/' + JS);
					MAIN.js = '/' + JS + '?ts=' + version;
				}

				if (rebuildeditor) {
					Fs.writeFile(PATH.temp(JSEDITOR), U.minify_js(jseditor.join('\n')), NOOP);
					TOUCH('/' + JSEDITOR);
					MAIN.jseditor = '/' + JSEDITOR + '?ts=' + version;
				}

				if (typeof(callback) === 'function')
					callback();

				rebuildhtml && replace.length && replaceContent(replace);
				MAIN.widgets.$ready = true;
				F.cache.removeAll('cachecms');

				if (rebuildcss || rebuildjs)
					F.temporary.views = {};
			});

		} else {

			if (typeof(callback) === 'function')
				callback();

			rebuildhtml && replace.length && replaceContent(replace);
			MAIN.widgets.$ready = true;
			F.cache.removeAll('cachecms');
			F.temporary.views = {};
		}

		if (!MAIN.css) {
			MAIN.css = '/' + CSS + '?ts=' + GUID(5);
			Fs.writeFile(PATH.temp(CSS), '', NOOP);
		}

	});
}

function replaceContent(arr) {
	var options = {};
	arr.wait(function(item, next) {
		options.id = item;
		$WORKFLOW('Widgets', 'replace', options, next);
	});
}

// Finds the entire body of widgets in some HTML code
// This method is used in "replace" workflow
function findwidget(id, body, fn, index) {

	index = body.indexOf('data-cms-widget="{0}"'.format(id), index || -1);

	if (index === -1)
		return;

	var eindex = body.indexOf('>', index);
	var beg = '<div';
	var end = '</div>';
	var pos = eindex + 1;
	var count = 0;
	var counter = 0;

	while (true) {

		if (counter++ > 100)
			break;

		var a = body.indexOf(beg, pos);
		var b = body.indexOf(end, pos);

		if (a !== -1 && a < b) {
			count++;
			pos = body.indexOf('>', a);
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

	var content = body.substring(eindex + 1, pos - end.length);
	fn(content, body.substring(body.lastIndexOf('<', index), pos));
	findwidget(id, body, fn, pos - end.length);
}

// Watches /widgets/ directory
// Works in DEBUG mode only
// It reloads changed widgets automatically
function watcher() {

	var db = {};

	var watch = function() {

		if (!MAIN.widgets.$ready) {
			setTimeout(watch, 3500);
			return;
		}

		var path = PATH.root('widgets');
		var changes = [];
		U.ls2(path, function(files) {
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				var time = file.stats.mtime.getTime();
				if (db[file.filename]) {
					if (db[file.filename] !== time) {
						db[file.filename] = time;
						changes.push(file.filename);
					}
				} else {
					db[file.filename] = time;
					changes.push(file.filename);
				}
			}

			if (changes.length) {
				for (var i = 0, length = changes.length; i < length; i++)
					$WORKFLOW('Widgets', 'import', { filename: changes[i] }, NOOP);
			}

			setTimeout(watch, 3500);
		});
	};

	setTimeout(watch, 3500);
}

DEBUG && watcher();

FILE('/' + CSS, (req, res) => res.file(PATH.temp(CSS)));
FILE('/' + JS, (req, res) => res.file(PATH.temp(JS)));
FILE('/' + JSEDITOR, (req, res) => res.file(PATH.temp(JSEDITOR)));

ON('settings', refresh);