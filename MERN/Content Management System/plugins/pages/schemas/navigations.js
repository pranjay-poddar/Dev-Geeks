const REG_WILDCARD = /\*\//g;

NEWSCHEMA('Navigations/Items', function(schema) {
	schema.define('id', 'String(20)');
	schema.define('pageid', UID); // Page ID
	schema.define('name', 'String(50)', true);
	schema.define('url', 'String(500)', true);
	schema.define('title', 'String(100)');
	schema.define('icon', 'Lower(40)');
	schema.define('language', 'Lower(2)');
	schema.define('target', ['_self', '_blank']);
	schema.define('children', '[Navigations/Items]');
	schema.define('behaviour', ['default', 'info', 'warn', 'highlight', 'special']);
});

NEWSCHEMA('Navigations', function(schema) {

	schema.define('id', 'String(50)', true);
	schema.define('name', 'String(70)');
	schema.define('icon', 'String(30)');
	schema.define('body', 'String');
	schema.define('children', '[Navigations/Items]');

	schema.setGet(function($) {
		FUNC.alert($.user, 'navigations/edit', $.id);
		NOSQL('navigations').read().id($.id).callback(function(err, response) {
			if (response) {
				$.callback(response);
			} else {
				$.model.id = $.id;
				$.callback($.model);
			}
		});
	});

	function addpagechildren(child) {
		var obj = {};
		obj.id = child.id;
		obj.pageid = child.pageid;
		obj.url = child.url.replace(REG_WILDCARD, '');
		obj.icon = child.icon;
		obj.language = child.language;
		obj.target = child.target;
		obj.name = child.name;
		obj.title = child.title;
		obj.behaviour = child.behaviour;
		obj.children = [];
		for (var i = 0; i < child.children.length; i++)
			obj.children.push(addpagechildren(child.children[i]));
		return obj;
	}

	schema.addWorkflow('addpage', function($) {
		// $.options.navigations
		// $.options.page

		var navigations = $.options.navigations;
		var page = $.options.page;
		var count = 0;

		navigations.wait(function(navid, next) {
			var nav = MAIN.navigations[navid];

			// Determines if the page exists
			var item = nav.children.findItem('url', page.url);
			if (item) {
				next();
				return;
			}

			var children = [];
			var obj;

			for (var j = 0; j < nav.children.length; j++)
				children.push(addpagechildren(nav.children[j]));

			obj = {};
			obj.id = GUID(10);
			obj.pageid = page.id;
			obj.url = page.url.replace(REG_WILDCARD, '');
			obj.icon = page.icon;
			obj.language = page.language;
			obj.target = '_self';
			obj.children = [];
			obj.name = page.name;
			obj.title = page.title;
			obj.behaviour = 'default';
			children.push(obj);

			count++;
			NOSQL('navigations').modify({ children: children }).id(navid).callback(next);

		}, function() {

			if (count) {
				F.cache.removeAll('cachecms');
				refresh();
			}

			$.success(count);
		});

	});

	schema.setSave(function($, model) {

		var user = $.user.name;
		var db = NOSQL('navigations');

		var nav = PREF.navigations.findItem('id', model.id);
		if (nav) {
			model.dtupdated = NOW;
		} else {
			$.invalid('error-navigations-404');
			return;
		}

		db.update(model, model).id(model.id).callback(function() {
			$SAVE('Events', { type: 'navigations/save', user: user, id: model.id, body: model.name, admin: true }, NOOP, $);
			EMIT('navigations.save', model);
			refresh();
			$.success();
		});
	});

	// A page is changed
	schema.addWorkflow('page', function($) {

		var db = NOSQL('navigations');
		var page = $.options.page;
		var done = () => setTimeout2('navigations', refresh, 500);

		db.find().callback(function(err, response) {
			for (var i = 0, length = response.length; i < length; i++) {
				var nav = response[i];
				var item = findByPage(page.id, nav.children);
				if (item) {

					nav.dtupdated = NOW;
					item.url = page.url;
					page.navicon && (item.icon = page.icon);

					if (page.navname) {
						item.name = page.name;
						item.title = page.title;
						item.language = page.language;
					}

					item.dtupdated = NOW;
					db.update(nav).id(nav.id).callback(done);
				}
			}
			$.success();
		});
	});
});

function findByPage(id, items) {
	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		if (item.pageid === id)
			return item;
		if (item.children) {
			item = findByPage(id, item.children);
			if (item)
				return item;
		}
	}
}

function prepare(main, children, parent, level) {
	for (var i = 0; i < children.length; i++) {
		var item = children[i];
		item.url = item.url.replace(REG_WILDCARD, '');
		main.pages[item.id] = item;
		main.url[item.url] = item;
		item.parent = parent;
		item.level = level;
		item.children && item.children.length && prepare(main, item.children, item, level + 1);
		item.contains = function(url, absolute) {

			if (this.url === url)
				return true;

			if (!absolute) {
				if (this.url.length > 1 && url.substring(1, this.url.length) === this.url.substring(1))
					return true;
			}

			for (var i = 0; i < this.children.length; i++) {
				if (this.children[i].url === url)
					return true;
			}
		};
	}
}

function empty() {
	return '';
}

FUNC.makenavigation = function(id, name) {
	if (!MAIN.navigations[id]) {
		MAIN.navigations[id] = { url: {}, children: [], id: id, name: name, stringify: empty };
		NOSQL('navigations').insert({ id: id, children: [], name: name, dtupdated: NOW });
	}
};

function refresh() {
	NOSQL('navigations').find().callback(function(err, response) {
		MAIN.navigations = {};

		var nav = PREF.navigations;
		var rem = [];

		for (var i = 0; i < nav.length; i++)
			MAIN.navigations[nav[i].id] = { url: {}, children: [], id: nav[i].id, name: nav[i].name };

		for (var i = 0, length = response.length; i < length; i++) {

			var item = response[i];
			var tmp = MAIN.navigations[item.id];

			// Navigation doesn't exist
			if (!tmp) {
				rem.push(item.id);
				continue;
			}

			MAIN.navigations[item.id] = item;

			if (!item.name)
				item.name = tmp.name;

			item.url = {};
			item.pages = {};
			item.stringify = function() {
				var skip = { parent: true, url: true };
				return JSON.stringify(this, (k, v) => skip[k] ? undefined : v);
			};

			prepare(MAIN.navigations[item.id], item.children, null, 0);
		}

		if (rem.length)
			NOSQL('navigations').remove().in('id', rem);

		F.cache.removeAll('cachecms');
		CMD('clear_viewscache');
	});
}

ON('settings', refresh);