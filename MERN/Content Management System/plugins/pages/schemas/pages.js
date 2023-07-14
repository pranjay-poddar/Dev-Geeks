const Fs = require('fs');
const REGEXP_HTML_CLASS = /(\s)class=".*?"/g;
const REGEXP_HTML_ATTR = /(\s)data-cms-id="[a-z0-9]+"|data-cms-widget="[a-z0-9]+"/g;
const REGEXP_HTML_DIV = /<div\s>/g;
const REGEXP_GLOBAL = /\$[0-9a-z-_]+/gi;

var loaded = false;

MAIN.pages = [];
MAIN.sitemap = {};
MAIN.variables = {};
MAIN.redirects = {};
MAIN.wildcard = [];

NEWSCHEMA('Pages', function(schema) {

	schema.define('id', UID);
	schema.define('body', String);                      // RAW html
	schema.define('bodywidgets', '[String(22)]');       // List of all used widgets
	schema.define('icon', 'Lower(40)');                 // Font-Awesome icon name
	schema.define('ispartial', Boolean);                // Is only partial page (the page will be shown in another page)
	schema.define('keywords', 'String(200)');           // Meta keywords
	schema.define('description', 'String(200)');        // Meta description
	schema.define('name', String, true);                // Name in admin
	schema.define('parent', UID);                       // Parent page for breadcrumb
	schema.define('partial', '[UID]');                  // A partial content
	schema.define('summary', 'String(1000)');           // Short page description generated according to the "CMS_summary" class in CMS editor
	schema.define('pictures', '[String]');              // URL addresses for first 5 pictures
	schema.define('search', 'String(1000)');            // Search pharses
	schema.define('template', UID);                     // Render template views/*.html
	schema.define('title', 'String(100)');              // Meta title
	schema.define('url', 'String(200)');                // URL (can be realive for showing content or absolute for redirects)
	schema.define('oldurl', 'String(200)');             // Temporary: old URL
	schema.define('widgets', '[Object]');               // List of dynamic widgets, contains Array of ID widget
	schema.define('signals', '[String(30)]');           // Registered signals
	schema.define('navigations', '[String]');           // List of navigation ID (optional, for side rendering)
	schema.define('navigations2', '[String]');          // List of navigation ID
	schema.define('language', String);                  // Only information
	schema.define('redirects', '[String]');             // Temporary
	schema.define('css', String);                       // Custom page styles

	schema.define('nocache', Boolean);                  // Disables cache
	schema.define('pinned', Boolean);                   // Pin the page of the top of sorting
	schema.define('draft', Boolean);                    // Determines draft
	schema.define('navicon', Boolean);                  // Can replace the item icon in navigation
	schema.define('navname', Boolean);                  // Can replace the item name in navigation
	schema.define('replacelink', Boolean);              // Can replace the link in the whole content

	schema.define('lockedtemplate', Boolean);           // Disables choosing templates
	schema.define('lockedcontent', Boolean);            // Locks a content for editing
	schema.define('usedefault', Boolean);               // Doesn't save a content, still shows a default content from the template

	// Gets listing
	schema.setQuery(function($) {
		var filter = NOSQL('pages').list();
		filter.fields('id,name,title,url,ispartial,icon,parent,template,language,draft,dtupdated,dtcreated,pinned');
		filter.sort('dtcreated_asc');
		filter.callback($.callback);
	});

	// Gets a specific page
	schema.setGet(function($) {

		var opt = $.options;
		var filter = NOSQL('pages').one();
		opt.url && filter.where('url', opt.url);
		opt.id && filter.id(opt.id);
		$.id && filter.id($.id);

		filter.callback(function(err, response) {

			if (err) {
				$.invalid(err);
				return;
			}

			FUNC.alert($.user, 'pages/edit', response.id);

			var redirects = Object.keys(MAIN.redirects);
			response.redirects = [];

			for (var i = 0, length = redirects.length; i < length; i++) {
				var key = redirects[i];
				if (MAIN.redirects[key] === response.url)
					response.redirects.push(key);
			}

			FUNC.read('pages', response.id, function(err, body) {
				response.body = body;
				if (response.draft) {
					FUNC.read('pages', response.id + '_draft', function(err, body) {
						response.bodydraft = body;
						$.callback(response);
					});
				} else
					$.callback(response);
			});

		}, 'error-pages-404');
	});

	// Removes a specific page
	schema.setRemove(function($) {
		var id = $.body.id;
		var db = NOSQL('pages');

		db.remove().id(id).callback(function(err, count) {
			$.success();
			if (count) {
				FUNC.remove('pages', id);
				COUNTER('pages').remove(id);
				setTimeout2('pages', refresh, 1000);
			}
		});

		NOSQL('parts').remove().where('ownerid', id).where('type', 'page');
	});

	// Saves a page into the database
	schema.setSave(function($, model) {

		var user = $.user.name;
		var oldurl = model.oldurl;
		var update = !!model.id;
		var nosql = NOSQL('pages');
		var navigations2 = model.ispartial ? null : model.navigations2;

		!model.title && (model.title = model.name);

		if (update) {
			model.dtupdated = NOW;
			model.adminupdated = user;
		} else {
			model.id = UID();
			model.dtcreated = NOW;
			model.admincreated = user;
		}

		if (model.id === model.parent)
			model.parent = null;

		var redirectsmod = false;
		var redirects = Object.keys(MAIN.redirects);
		for (var i = 0, length = redirects.length; i < length; i++) {
			var key = redirects[i];
			if (MAIN.redirects[key] === model.oldurl || MAIN.redirects[key] === model.url) {
				delete MAIN.redirects[key];
				redirectsmod = true;
			}
		}

		if (model.redirects && model.redirects.length) {
			for (var i = 0, length = model.redirects.length; i < length; i++) {
				MAIN.redirects[model.redirects[i]] = model.url;
				redirectsmod = true;
			}
		}

		redirectsmod && $WORKFLOW('Pages/Redirects', 'update');

		if (!model.navigations.length || model.ispartial)
			model.navigations = null;

		model.stamp = new Date().format('yyyyMMddHHmm');
		model.redirects = undefined;
		model.body = U.minify_html(model.body);
		model.search = ((model.title || '') + ' ' + (model.keywords || '') + ' ' + model.search).keywords(true, true).join(' ').max(1000);

		// Sanitizes URL
		if (!model.ispartial && !model.url.startsWith('http:') && !model.url.startsWith('https:')) {
			model.url = U.path(model.url);
			if (model.url[0] !== '/')
				model.url = '/' + model.url;
		}

		model.oldurl = undefined;
		model.navigations2 = undefined;

		if (model.draft) {
			// Draft can have another widgets
			// Therefore we must create a helper values
			model.dwidgets = model.widgets;
			model.dbodywidgets = model.widgets;
			model.widgets = undefined;
			model.bodywidgets = undefined;
			FUNC.write('pages', model.id + '_draft', model.body, update);
		} else {
			// Removes helper values
			model.dwidgets = null;
			model.dbodywidgets = null;
			FUNC.write('pages', model.id + '_' + model.stamp, model.body); // backup
			FUNC.write('pages', model.id, model.body, update);
		}

		model.body = undefined;
		var db = update ? nosql.modify(model).id(model.id).backup($.user.meta(model)) : nosql.insert(model);

		// Update a URL in all navigations where this page is used
		if (!model.ispartial)
			$WORKFLOW('Navigations', 'page', { page: model }, NOOP, $);

		db.callback(function() {

			$SAVE('Events', { type: 'pages/save', id: model.id, user: user, body: model.name, admin: true }, NOOP, $);
			EMIT('pages.save', model);

			if (!model.ispartial && model.replacelink && model.url !== oldurl && oldurl)
				$WORKFLOW('Pages', 'replacelinks', { url: model.url.replace(/\*\//g, ''), oldurl: oldurl });
			else
				setTimeout2('pages', refresh, 1000);

			if (!model.ispartial && navigations2.length)
				$WORKFLOW('Navigations', 'addpage', { page: model, navigations: navigations2 }, NOOP, $);

			$.success(model.id);
		});
	});

	// Generates URL according to the parents
	schema.addWorkflow('url', function($) {

		var model = $.model;

		if (model.ispartial) {
			$.callback();
			return;
		}

		if (!model.url || model.url === '---') {
			if (model.parent) {
				var parent = MAIN.pages.findItem('id', model.parent);
				model.url = parent ? (parent.url + model.name.slug() + '/') : model.name.slug();
			} else
				model.url = model.name.slug();
		}

		$.callback();
	});

	// Replaces all older links to a new
	schema.addWorkflow('replacelinks', function($) {

		var opt = $.options;
		var reg = new RegExp(opt.oldurl.replace(/\//, '\\/'), 'gi');

		NOSQL('pages').find().fields('id').callback(function(err, docs) {
			// Updates files
			// doc.body.replace(reg, opt.url);
			docs.wait(function(item, next) {
				FUNC.read('pages', item.id, function(err, body) {
					if (body)
						FUNC.write('pages', item.id, body.replace(reg, opt.url), next, true);
					else
						next();
				});
			}, refresh);
		}).where('ispartial', false);

		$.success();
	});

	// Stats
	schema.addWorkflow('stats', function($) {
		COUNTER('pages').monthly($.id || 'all', $.callback);
	});

	schema.addWorkflow('trending', function($) {

		var year = $.filter.year || NOW.getFullYear();

		COUNTER('pages').scalar('group', 'id', 'sum', function(err, response) {

			var arr = [];
			for (var m in response)
				arr.push({ id: m, count: response[m] });

			arr.quicksort('count_desc');
			arr = arr.take(50);

			NOSQL('pages').find().fields('id,name,url').where('ispartial', false).in('id', arr, 'id').callback(function(err, items) {

				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					item.count = arr.findValue('id', item.id, 'count', 0);
				}

				items.quicksort('count_desc');
				$.callback(items.take(28));
			});

		}).where('year', year);

	}, 'year:number');

});

NEWSCHEMA('Pages/Globals', function(schema) {

	var pending = [];

	schema.define('body', 'String');

	schema.setSave(function($, model) {
		Fs.writeFile(PATH.databases('pagesglobals.json'), JSON.stringify(model), function() {
			refresh();
			$.success();
		});
	});

	schema.setGet(function($) {
		Fs.readFile(PATH.databases('pagesglobals.json'), function(err, data) {

			if (data) {
				data = data.toString('utf8').parseJSON(true);
				$.model.body = data.body;
			}

			$.callback();
		});
	});

	schema.addWorkflow('add', function($) {

		if (MAIN.variables[$.options.name]) {
			$.success();
			return;
		}

		pending.push($.options);

		// For multiple usage at the time
		setTimeout2('pageglobalsadd', function() {

			if (!pending.length)
				return;

			WAIT(() => loaded, function() {
				schema.get(function(err, response) {

					if (!response.body)
						response.body = '';

					var arr = pending.slice(0);
					var is = false;
					for (var i = 0; i < arr.length; i++) {
						if (!MAIN.variables[arr[i].name]) {
							response.body += '\n' + arr[i].name.padRight(25) + ': ' + arr[i].value;
							is = true;
						}
					}
					is && $SAVE(schema.name, response, NOOP);
				});
			});

		}, 1000);

		$.success();
	});
});

NEWSCHEMA('Pages/Redirects', function(schema) {

	schema.define('body', 'String');

	schema.setSave(function($, model) {
		Fs.writeFile(PATH.databases('pagesredirects.json'), JSON.stringify(model), function() {
			refresh_redirects();
			$.success();
		});
	});

	schema.setGet(function($) {

		Fs.readFile(PATH.databases('pagesredirects.json'), function(err, data) {

			if (data) {
				data = data.toString('utf8').parseJSON(true);
				$.model.body = data.body;
			}

			$.callback();
		});
	});

	schema.addWorkflow('update', function($) {

		var redirects = Object.keys(MAIN.redirects);
		var builder = [];

		for (var i = 0; i < redirects.length; i++) {
			var key = redirects[i];
			builder.push(key.padRight(40) + ' : ' + MAIN.redirects[key]);
		}

		var model = schema.create();
		model.body = builder.join('\n');
		$SAVE(schema.name, model, NOOP);
		$.success();
	});
});

function refresh_redirects() {
	$GET('Pages/Redirects', function(err, response) {
		var lines = (response.body || '').split('\n');
		MAIN.redirects = {};
		for (var i = 0, length = lines.length; i < length; i++) {
			var line = lines[i].trim();
			var beg = line.indexOf(':');
			if (beg === -1 || !line || (line[0] === '/' && line[1] === '/'))
				continue;
			var a = U.path(line.substring(0, beg - 1).trim());
			var b = U.path(line.substring(beg + 1).trim());

			if (a[0] !== '/')
				a = '/' + a;

			if (b[0] !== '/' && b[0] !== 'h')
				b = '/' + b;

			MAIN.redirects[a] = b;
		}
	});
}

// Refreshes internal information (sitemap)
function refresh() {

	NOSQL('pages').find().fields('id,url,name,title,parent,icon,language,ispartial,nocache,dtcreated,dtupdated').callback(function(err, response) {

		var sitemap = {};
		var helper = {};
		var partial = [];
		var pages = [];
		var wildcard = [];

		for (var i = 0, length = response.length; i < length; i++) {
			var doc = response[i];

			// A partial content is skipped from the sitemap
			if (doc.ispartial) {
				partial.push({ id: doc.id, url: doc.url, name: doc.name, title: doc.title, icon: doc.icon, language: doc.language, nocache: doc.nocache });
				continue;
			}

			var wild = doc.url.indexOf('*/') !== -1;
			if (wild)
				doc.url = doc.url.replace('*/', '');

			var key = doc.url.toLowerCase();
			var lng = doc.language;
			var obj = { id: doc.id, url: doc.url, name: doc.name, title: doc.title, parent: doc.parent, icon: doc.icon, links: [], language: doc.language, dtcreated: doc.dtcreated, dtupdated: doc.dtupdated, wildcard: wild, nocache: doc.nocache };

			helper[doc.id] = key;
			sitemap[key] = obj;

			if (wild)
				wildcard.push(obj);

			if (lng) {
				key = lng + ' ' + key;
				sitemap[key] = CLONE(obj);
				helper[lng + '_' + doc.id] = key;
			}

			pages.push(obj);
		}

		// Pairs parents by URL
		var keys = Object.keys(sitemap);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var parent = sitemap[key].parent;
			if (parent) {
				var tmp = sitemap[key];
				tmp.parent = helper[parent] || helper[tmp.language + '_' + parent];
				tmp.parent && sitemap[tmp.parent] && sitemap[tmp.parent].links.push(sitemap[key]);
			}
		}

		MAIN.sitemap = sitemap;
		MAIN.partial = partial;
		MAIN.pages = pages;
		MAIN.wildcard = wildcard;

		$GET('Pages/Globals', function(err, response) {
			response.body && parseGlobals(response.body);
			F.cache.removeAll('cachecms');
			loaded = true;
		});

	});
}

function parseGlobals(val) {
	MAIN.variables = {};
	var arr = val.split('\n');
	for (var i = 0, length = arr.length; i < length; i++) {
		var str = arr[i];
		if (!str || str[0] === '#' || str.substring(0, 2) === '//')
			continue;

		var index = str.indexOf(' :');
		if (index === -1) {
			index = str.indexOf('\t:');
			if (index === -1)
				continue;
		}

		var name = str.substring(0, index).trim();

		if (name[0] === '$')
			name = name.substring(1);

		var value = str.substring(index + 2).trim();
		if (name && value)
			MAIN.variables[name] = value;
	}
}

String.prototype.CMSrender = function(settings, callback, controller) {
	var body = this;

	if (!settings || !settings.length) {
		callback(body.CMStidy());
		return;
	}

	if (!MAIN.widgets.$ready) {
		// Widget are not ready
		setTimeout((body, settings, callback) => body.CMSrender(settings, callback, controller), 500, body, settings, callback);
		return;
	}

	settings.wait(function(item, next) {

		var widget = MAIN.widgets[item.idwidget];

		var index = body.indexOf('data-cms-id="{0}"'.format(item.id));
		if (index === -1)
			return next();

		var eindex = body.indexOf('>', index);
		if (!widget || !widget.total || !widget.total.render)
			return next();

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
		widget.total.render.call(controller || EMPTYCONTROLLER, widgetsettings(widget, item.options), content, function(response) {
			body = body.replace(content, response);
			next();
		}, widget.template);

	}, () => callback(body.CMSglobals().CMStidy()));
};

Controller.prototype.widget = function(id, options, callback) {

	if (typeof(options) === 'function') {
		callback = options;
		options = EMPTYOBJECT;
	}

	var widget = MAIN.widgets[id];
	if (!widget) {
		callback('');
		return;
	}

	if (!widget.total || !widget.total.render) {
		callback(widget.html);
		return;
	}

	widget.total.render.call(this, options, widget.html, callback, widget.template);
};

function widgetsettings(widget, settings) {
	var keys = Object.keys(widget.def);
	var obj = {};
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];
		if (settings[key] == null)
			obj[key] = widget.def[key];
		else
			obj[key] = settings[key];
	}
	return obj;
}

function globalsreplacer(text) {
	var val = MAIN.variables[text.substring(1)];
	return val == null ? text : val;
}

String.prototype.CMSglobals = function() {
	return this.replace(REGEXP_GLOBAL, globalsreplacer);
};

// Cleans CMS markup
String.prototype.CMStidy = function() {

	var body = this;
	var beg;
	var end;
	var index = 0;
	var count = 0;
	var b = ' data-cms-theme="';
	var c = 'CMS_unwrap';
	var tag;
	var tagend;

	body = U.minify_html(body).replace(/\sclass="CMS_template CMS_remove"/gi, '');

	while (true) {
		beg = body.indexOf(b, beg);
		if (beg === -1)
			break;
		index = body.indexOf('"', beg + b.length);
		if (index === -1)
			break;
		body = body.substring(0, beg) + body.substring(index + 1);
	}

	b = ' data-cms-category="';
	while (true) {
		beg = body.indexOf(b, beg);
		if (beg === -1)
			break;
		index = body.indexOf('"', beg + b.length);
		if (index === -1)
			break;
		body = body.substring(0, beg) + body.substring(index + 1);
	}

	b = ' data-cms-part="';
	while (true) {
		beg = body.indexOf(b, beg);
		if (beg === -1)
			break;
		index = body.indexOf('"', beg + b.length);
		if (index === -1)
			break;
		body = body.substring(0, beg) + body.substring(index + 1);
	}

	b = ' data-cms-info="';
	while (true) {
		beg = body.indexOf(b, beg);
		if (beg === -1)
			break;
		index = body.indexOf('"', beg + b.length);
		if (index === -1)
			break;
		body = body.substring(0, beg) + body.substring(index + 1);
	}

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

	return body.replace(REGEXP_HTML_ATTR, '').replace(REGEXP_HTML_CLASS, function(text) {

		var is = text[0] === ' ';
		var arr = text.substring(is ? 8 : 7, text.length - 1).split(' ');
		var builder = '';

		for (var i = 0, length = arr.length; i < length; i++) {
			var cls = arr[i];
			if (cls[0] === 'C' && cls[1] === 'M' && cls[2] === 'S' && cls !== 'CMS_hidden')
				continue;
			builder += (builder ? ' ' : '') + cls;
		}

		return builder ? (is ? ' ' : '') + 'class="' + builder + '"' : '';
	}).replace(REGEXP_HTML_DIV, '<div>');
};

function loadpartial(page, callback, controller) {

	var output = {};

	if (!page.partial || !page.partial.length)
		return callback(output);

	NOSQL('pages').find().in('id', page.partial).callback(function(err, response) {
		response.wait(function(item, next) {


			var obj = {};

			if (item.signals && item.signals.length) {
				for (var i = 0; i < item.signals.length; i++)
					obj[item.signals[i]] = 1;
			}

			item.signals = obj;

			COUNTER('pages').hit(item.id);
			output[item.id] = item;
			output[item.url] = item;

			FUNC.read('pages', item.id, function(err, body) {
				body.CMSrender(item.widgets, function(body) {
					item.body = body;
					next();
				}, controller);
			});

		}, () => callback(output));
	});
}

Controller.prototype.CMSpage = function(callback, cache) {

	var self = this;
	var is = false;
	var page;
	var url = self.url.toLowerCase();

	if (self.language) {
		page = MAIN.sitemap[self.language + ' ' + url];
		!page && (page = MAIN.sitemap[url]);
	} else
		page = MAIN.sitemap[url];

	if (!page) {

		if (MAIN.redirects && MAIN.redirects[url]) {
			self.redirect(MAIN.redirects[url], RELEASE);
			COUNTER('pages').hit('redirect');
		} else {

			for (var i = 0; i < MAIN.wildcard.length; i++) {
				page = MAIN.wildcard[i];
				if (url.substring(0, page.url.length) === page.url) {
					is = true;
					break;
				}
			}

			// tries to redirect to admin
			if (!is) {
				if (url === '/')
					self.redirect('/admin/');
				else
					self.throw404();
			}
		}

		if (!is)
			return self;
	}

	if (typeof(callback) === 'boolean') {
		cache = callback;
		callback = null;
	}

	if (self.query.DRAFT)
		cache = false;

	if (self.query.DEBUG && DEBUG)
		cache = false;

	var pluscache = '';

	if (page.nocache && self.uri.search)
		pluscache = self.uri.search.hash() + '';

	var DRAFT = !!self.query.DRAFT;

	self.memorize('cachecms' + (self.language || '') + '_' + url + pluscache, cache || '1 minute', cache === false, function() {

		NOSQL('pages').one().id(page.id).callback(function(err, response) {

			if (!response || !response.template) {
				self.invalid('error-pages-template');
				return;
			}

			var repo = self.repository;
			self.meta(response.title, response.description, response.keywords);

			repo.sitemap = [];

			// Sitemap
			var tmp = page;
			var processed = {};

			while (tmp) {
				repo.sitemap.unshift(tmp);
				tmp = MAIN.sitemap[tmp.parent];

				if (tmp) {
					if (processed[tmp.url]) {
						// infinite loop
						break;
					} else
						processed[tmp.url] = 1;
					if (tmp.url === tmp.parent)
						break;
				}
			}

			var counter = COUNTER('pages').hit('all').hit(response.id);

			if (response.language && !DRAFT)
				counter.hit(response.language);

			if (response.css) {
				response.css = U.minify_css('/*auto*/\n' + response.css);
				self.head('<style type="text/css">' + response.css + '</style>');
			}

			if (response.parent) {
				tmp = MAIN.sitemap[response.parent];
				response.parenturl = tmp ? tmp.url : '';
			} else
				response.parenturl = '';

			repo.page = response;

			if (PREF.memorizeall)
				self.layoutName = '';
			else
				self.layoutName = 'cms' + repo.page.template;

			var obj = {};

			if (repo.page.signals && repo.page.signals.length) {
				for (var i = 0; i < repo.page.signals.length; i++)
					obj[repo.page.signals[i]] = 1;
			}

			repo.page.signals = obj;

			FUNC.read('pages', response.id + (DRAFT ? '_draft' : ''), function(err, body) {
				response.body = body;
				response.body.CMSrender(DRAFT ? (response.dwidgets || response.widgets) : response.widgets, function(body) {
					response.body = body;
					loadpartial(repo.page, function(partial) {
						repo.page.partial = partial;
						if (callback) {
							callback.call(self, function(model) {
								if (PREF.memorizeall)
									self.view('cms' + repo.page.template, model);
								else
									self.view_compile(repo.page.body, model);
							});
						} else {
							if (PREF.memorizeall)
								self.view('cms' + repo.page.template);
							else
								self.view_compile(repo.page.body);
						}
					}, self);
				}, self);
			});
		});
	}, function() {
		if (self.repository.page && !DRAFT)
			COUNTER('pages').hit('all').hit(self.repository.page.id);
	});

	return self;
};

Controller.prototype.CMSpagemodel = function(model) {

	var self = this;

	if (!model.template) {
		self.invalid('error-pages-template');
		return;
	}

	self.meta(model.title, model.description, model.keywords);

	var repo = self.repository;
	var DRAFT = !!self.query.DRAFT;

	repo.sitemap = [];

	// Sitemap
	var tmp = model;
	while (tmp) {
		repo.sitemap.unshift(tmp);
		tmp = MAIN.sitemap[tmp.parent];
	}

	if (model.css) {
		model.css = U.minify_css('/*auto*/\n' + model.css);
		self.head('<style type="text/css">' + model.css + '</style>');
	}

	repo.page = model;

	var obj = {};

	if (repo.page.signals && repo.page.signals.length) {
		for (var i = 0; i < repo.page.signals.length; i++)
			obj[repo.page.signals[i]] = 1;
	}


	if (model.parent) {
		tmp = MAIN.sitemap[model.parent];
		model.parenturl = tmp ? tmp.url : '';
	} else
		model.parenturl = '';

	repo.page.signals = obj;
	self.layoutName = '';

	model.body.CMSrender(DRAFT ? (model.dwidgets || model.widgets) : model.widgets, function(body) {
		model.body = body;
		loadpartial(repo.page, function(partial) {
			repo.page.partial = partial;
			self.view('cms' + repo.page.template);
			repo.page.body = null;
			repo.page.pictures = EMPTYARRAY;
			repo.page.search = null;
		}, self);
	}, self);

	return self;
};

Controller.prototype.CMSrender = function(url, callback) {

	var self = this;
	var page;

	if (self.language) {
		page = MAIN.sitemap[self.language + ' ' + url];
		!page && (page = MAIN.sitemap[url]);
	} else
		page = MAIN.sitemap[url];

	if (!page) {
		callback('404');
		return self;
	}

	NOSQL('pages').one().id(page.id).callback(function(err, response) {

		var repo = self.repository;
		self.title(response.title);
		self.sitemap('homepage');

		// Sitemap
		var tmp = page;
		while (tmp && tmp.url !== '/') {
			self.sitemap_add('homepage', tmp.name, tmp.url);
			tmp = MAIN.sitemap[tmp.parent];
		}

		if (response.css) {
			response.css = U.minify_css('/*auto*/\n' + response.css);
			self.head('<style type="text/css">' + response.css + '</style>');
		}

		repo.page = response;

		var obj = {};

		if (repo.page.signals && repo.page.signals.length) {
			for (var i = 0; i < repo.page.signals.length; i++)
				obj[repo.page.signals[i]] = 1;
		}

		repo.page.signals = obj;

		FUNC.read('pages', response.id, function(err, body) {
			response.body = body;
			response.body.CMSrender(response.widgets, function(body) {
				response.body = body;
				loadpartial(repo.page.partial, function(partial) {
					repo.page.partial = partial;
					callback(null, repo.page);
				}, self);
			}, self);
		});
	});

	return self;
};

Controller.prototype.CMSpartial = function(url, callback) {

	var self = this;
	var prop = url.isUID() ? 'id' : 'url';
	var page = MAIN.partial.findItem(function(item) {
		return item[prop] === url && (!self.language || self.language === item.language);
	});

	if (!page) {
		callback('404');
		return self;
	}

	COUNTER('pages').hit(page.id);
	NOSQL('pages').one().id(page.id).callback(function(err, response) {

		if (response.css) {
			response.css = U.minify_css('/*auto*/\n' + response.css);
			self.head('<style type="text/css">' + response.css + '</style>');
		}

		FUNC.read('pages', response.id, function(err, body) {
			response.body = body;
			response.body.CMSrender(response.widgets, function(body) {
				response.body = body;
				callback(null, response);
			}, self);
		});
	});

	return self;
};

ON('settings', function() {
	refresh();
	refresh_redirects();
});