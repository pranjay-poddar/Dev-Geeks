const REGEXP_GLOBAL = /\$[0-9a-z-_]+/gi;

NEWSCHEMA('Posts', function(schema) {

	schema.define('id', UID);
	schema.define('template', 'String(30)', true);
	schema.define('type', ['html', 'markdown']);
	schema.define('name', String, true);
	schema.define('author', 'String(30)', true);
	schema.define('description', 'String(300)');
	schema.define('summary', 'String(500)');
	schema.define('keywords', 'String(200)');
	schema.define('language', String);              // Only information
	schema.define('search', 'String(1000)');
	schema.define('pictures', '[String]');  		// URL addresses for first 5 pictures
	schema.define('body', String);
	schema.define('bodywidgets', '[String(22)]');   // List of all used widgets
	schema.define('ispublished', Boolean);
	schema.define('date', Date);
	schema.define('widgets', '[Object]');           // List of dynamic widgets, contains Array of ID widget
	schema.define('signals', '[String(30)]');

	// Gets listing
	schema.setQuery(function($) {

		var opt = $.options === EMPTYOBJECT ? $.query : $.options;
		var isAdmin = $.controller ? $.controller.name === 'admin' : false;
		var filter = NOSQL('posts').list();

		filter.paginate(opt.page, opt.limit, 70);

		if (isAdmin) {
			opt.category && filter.gridfilter('category', opt, String);
			opt.author && filter.gridfilter('author', opt, String);
			opt.name && filter.gridfilter('name', opt, String);
			opt.type && filter.gridfilter('type', opt, String);
			opt.template && filter.gridfilter('template', opt, String);
			opt.language && filter.gridfilter('language', opt, String);
		} else {
			opt.author && filter.where('author', opt.author);
			opt.language && filter.where('language', opt.language);
			opt.template && filter.where('template', opt.template);
			opt.published && filter.where('ispublished', true).where('date', '<=', NOW);
			opt.search && filter.like('search', opt.search.keywords(true, true));
		}

		filter.fields('id,template,category,name,dtcreated,dtupdated,date,linker,pictures,summary,ispublished,signals,author,template,type,language,description');
		filter.gridsort(opt.sort || 'date_desc');
		filter.callback($.callback);
	});

	// Gets a specific post
	schema.setGet(function($) {

		var options = $.options;
		var filter = NOSQL('posts').one();

		options.category && filter.where('linker_category', options.category);
		options.linker && filter.where('linker', options.linker);
		options.id && filter.id(options.id);
		options.template && filter.where('template', options.template);
		$.id && filter.id($.id);

		filter.callback(function(err, response) {

			if (err) {
				$.callback();
				return;
			}

			FUNC.alert($.user, 'posts/edit', response.id);

			FUNC.read('posts', response.id, function(err, body) {
				response.body = dynamicvalues(body, response);
				$.callback(response);
			});

		}, 'error-posts-404');
	});

	schema.addWorkflow('render', function($) {

		var filter = NOSQL('posts').one();

		$.id && filter.id($.id);
		$.options.linker && filter.where('linker', $.options.linker);
		$.options.template && filter.where('template', $.options.template);
		filter.where('ispublished', true);

		filter.callback(function(err, response) {
			if (response) {
				$.controller && ($.controller.repository.post = $.controller.repository.page = response);
				FUNC.read('posts', response.id, function(err, body) {

					if (response.type === 'markdown') {
						response.body = dynamicvalues(body.markdown(), response);
						COUNTER('posts').hit('all').hit(response.id);
						$.callback(response);
					} else {
						response.body = body;
						response.body = response.body.CMSrender(response.widgets, function(body) {
							response.body = dynamicvalues(body, response);
							COUNTER('posts').hit('all').hit(response.id);
							$.callback(response);
						}, $.controller);
					}
				});
			} else
				$.invalid('error-posts-404');
		});
	});

	// Removes a specific post
	schema.setRemove(function($) {
		var id = $.id;
		NOSQL('posts').remove().id(id).callback(function() {
			FUNC.remove('posts', id);
			$.success();
			refresh_cache();
		});
		NOSQL('parts').remove().where('ownerid', id).where('type', 'post');
	});

	// Saves the post into the database
	schema.setSave(function($, model) {

		var user = $.user.name;
		var isUpdate = !!model.id;
		var nosql = NOSQL('posts');

		if (isUpdate) {
			model.dtupdated = NOW;
			model.adminupdated = user;
		} else {
			model.id = UID();
			model.admincreated = user;
			model.dtcreated = NOW;
		}

		!model.date && (model.date = NOW);
		model.linker = model.date.format('yyyyMMdd') + '-' + model.name.slug();
		model.stamp = new Date().format('yyyyMMddHHmm');

		var template = PREF.templatesposts.findItem('id', model.template);
		if (template)
			model.category = template.name;
		else
			model.category = '';

		model.search = ((model.name || '') + ' ' + (model.keywords || '') + ' ' + (model.search || '')).keywords(true, true).join(' ').max(1000);

		if (model.type === 'html')
			model.body = U.minify_html(model.body);

		FUNC.write('posts', model.id + '_' + model.stamp, model.body); // backup
		FUNC.write('posts', model.id, model.body, isUpdate);

		model.body = undefined;

		var db = isUpdate ? nosql.modify(model).id(model.id).backup($.user.meta(model)) : nosql.insert(model);

		db.callback(function() {
			$SAVE('Events', { type: 'posts/save', id: model.id, user: user, body: model.name, admin: true }, NOOP, $);
			EMIT('posts.save', model);
			$.success(model.id);
			refresh_cache();
		});

	});

	schema.addWorkflow('toggle', function($) {
		var arr = $.options.id ? $.options.id : $.query.id.split(',');
		NOSQL('posts').update({ '!ispublished': 1 }).in('id', arr).callback(function() {
			refresh_cache();
			$.success();
		});
	});

	// Clears database
	schema.addWorkflow('clear', function($) {
		NOSQL('posts').clear(function() {
			FUNC.remove('posts');
			$.success();
			refresh_cache();
		});
	});

	// Stats
	schema.addWorkflow('stats', function($) {
		COUNTER('posts').monthly($.id || $.options.id || 'all', $.callback);
	});

});

function dynamicvalues(body, obj) {
	return body.replace(REGEXP_GLOBAL, function(text) {
		var val = obj[text.substring(1)];
		return typeof(val) === 'string' ? val : text;
	});
}

// Refreshes internal informations (sitemap and navigations)
function refresh() {

	var categories = {};

	PREF.posts && PREF.posts.forEach(item => categories[item.id] = 0);

	NOSQL('posts').find().fields('ispublished,category').callback(function(err, response) {

		for (var i = 0, length = response.length; i < length; i++) {
			var doc = response[i];
			if (doc.ispublished && categories[doc.category])
				categories[doc.category] += 1;
		}

		var output = [];
		Object.keys(categories).forEach(function(key) {
			var category = PREF.posts.findItem('id', key);
			category && output.push({ id: key, name: category.name, linker: key.slug(), count: categories[key] });
		});

		MAIN.posts = output;
		F.cache.removeAll('cachecms');
	});
}

function refresh_cache() {
	setTimeout2('posts', refresh, 1000);
}

ON('settings', refresh);
