const Fs = require('fs');

NEWSCHEMA('Templates', function(schema) {

	schema.define('id', UID);
	schema.define('type', ['page', 'post', 'newsletter'], true);
	schema.define('name', 'String(50)', true);
	schema.define('body', String, true);

	schema.setGet(function($) {
		NOSQL('templates').read().id($.id).callback($.callback, 'error-templates-404');
	});

	schema.setSave(function($, model) {

		var db = NOSQL('templates');
		var id = model.id ? model.id : UID();

		var done = function() {
			refresh($.done(model.id));
		};

		if (model.id) {
			model.id = undefined;
			model.dtupdated = NOW;
			db.modify(model).id(id).callback(done);
		} else {
			model.id = id;
			model.dtcreated = NOW;
			model.dtupdated = NOW;
			db.insert(model).callback(done);
		}
	});

	schema.setRemove(function($) {
		NOSQL('templates').remove().id($.id).callback(function() {

			NOSQL('pages').modify({ template: '' }).where('template', $.id);
			NOSQL('posts').modify({ template: '' }).where('template', $.id);
			NOSQL('newsletter').modify({ template: '' }).where('template', $.id);

			var file = 'cms' + $.id;
			Fs.unlink(PATH.views(file + '.html'), NOOP);
			Fs.unlink(PATH.public(file + '.css'), NOOP);
			Fs.unlink(PATH.public(file + '.js'), NOOP);
			refresh($.done());
		});
	});
});

function refresh(callback) {

	var pages = [];
	var newsletters = [];
	var posts = [];

	NOSQL('templates').find().sort('name_asc').callback(function(err, response) {

		var hash = Date.now();
		var navigations = {};

		Fs.readFile(PATH.public('/js/cms.js'), function(err, js) {
			js = (js || '').toString('utf8');

			Fs.readFile(PATH.public('/css/cms.css'), function(err, css) {
				css = (css || '').toString('utf8');

				response.wait(function(item, next) {

					var compiled = compile(item.body);
					item.file = 'cms' + item.id;

					compiled.html = '@{nocompress html}' + compiled.html.replace('</body>', item.type === 'newsletter' ? '@{if repository.preview}<script src="@{\'%cdn\'}/jquery.min@341.js"></script><script src="@{MAIN.jseditor}"></script>@{fi}</body>' : ('@{if repository.preview}<script src="@{\'%cdn\'}/jquery.min@341.js"></script><script src="@{MAIN.jseditor}"></script>@{else}<script src="@{MAIN.js}"></script><script src="/' + item.file + '.js?ts=' + hash + '"></script>@{fi}</body>'));

					if (item.type === 'newsletter')
						compiled.html = compiled.html.replace('</head>', '@{if repository.preview}<link rel="stylesheet" href="@{\'%cdn\'}/spa.min@18.css" /><link rel="stylesheet" href="/css/admin-editor.css" />@{fi}</head>');
					else
						compiled.html = compiled.html.replace('<html>', '<html@{if repository.preview} class="CMS_preview"@{fi}>').replace('</head>', '<link rel="stylesheet" href="@{\'%cdn\'}/spa.min@18.css" /><link rel="stylesheet" href="/' + item.file + '.css?ts=' + hash + '" /><link rel="stylesheet" href="@{MAIN.css}" />@{if repository.preview}<link rel="stylesheet" href="/css/admin-editor.css" />@{else}<script src="@{\'%cdn\'}/spa.min@18.js"></script>@{fi}@{import(\'meta\', \'head\')}</head>');

					if (CONF.proicons)
						compiled.html = compiled.html.replace(/@18\.css/g, '@18pro.css');

					if (CONF.jcomponent >= 19)
						compiled.html = compiled.html.replace(/@18/g, '@19');

					compiled.id = item.id;
					compiled.name = item.name;
					EMIT('templates.compile', compiled);

					Fs.writeFile(PATH.views(item.file + '.html'), U.minify_html(compiled.html), function() {
						Fs.writeFile(PATH.public(item.file + '.js'), U.minify_js(js + '\n' + compiled.js), function() {
							Fs.writeFile(PATH.public(item.file + '.css'), U.minify_css('/*auto*/\n' + css + '\n' + compiled.css), function() {
								item.body = undefined;
								switch (item.type) {
									case 'page':
										pages.push(item);
										break;
									case 'post':
										posts.push(item);
										break;
									case 'newsletter':
										newsletters.push(item);
										break;
								}

								for (var i = 0; i < compiled.navigations.length; i++) {
									var nav = compiled.navigations[i];
									if (!navigations[nav.id])
										navigations[nav.id] = nav;
								}

								// HACK: clears Total.js ViewEngine cache
								delete F.temporary.views['view#/cms-default/' + item.file + '.html'];
								delete F.temporary.views['view#' + item.file + '.html'];

								TOUCH('/' + item.file + '.js');
								TOUCH('/' + item.file + '.css');
								next();
							});
						});
					});
				}, function() {
					var keys = Object.keys(navigations);
					var navs = [];

					for (var i = 0; i < keys.length; i++) {
						var nav = navigations[keys[i]];
						navs.push(nav);
						FUNC.makenavigation(nav.id, nav.name);
					}

					PREF.set('navigations', navs);
					PREF.templates = pages;
					PREF.templatesposts = posts;
					PREF.templatesnewsletters = newsletters;

					F.cache.removeAll('cachecms');
					CMD('clear_viewscache');
					callback && callback();
				});
			});
		});
	});
}

function compile(html) {

	var beg = -1;
	var end = -1;
	var body_script = '';
	var body_style = '';
	var body_html = '';
	var navigations = [];

	html = html.replace(/@\{navigation.*?\}/g, function(text) {
		var str = text.substring(13, text.length - 1).trim();
		var beg = str.indexOf(':');
		var name = '';
		var id = '';

		if (beg === -1) {
			name = str.trim();
			id = HASH(name).toString(36);
		} else {
			name = str.substring(beg + 1).trim();
			id = str.substring(0, beg).trim();
		}

		navigations.push({ id: id, name: name });
		return '';
	});

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

		if (!(/html|plain|src/i).test(type)) {
			body = body.substring(beg);
			raw = raw.replace(type + body + '</script>', '');
			body = body.trim();
			body_script = body;
		}

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
	obj.css = body_style;
	obj.html = body_html;
	obj.navigations = navigations;
	return obj;
}

ON('settings', function() {
	refresh();
});