const REG_SPACE = /\s/g;

NEWSCHEMA('Subscribers', function(schema) {

	schema.define('email', String, true);
	schema.define('source', 'String(100)');

	// TMS
	schema.jsonschema_define('ip', 'String');
	schema.jsonschema_define('language', 'String');
	schema.jsonschema_define('unsubscribed', 'Boolean');
	schema.jsonschema_define('browser', 'String');
	schema.jsonschema_define('dtcreated', 'Date');

	// Saves the model into the database
	schema.setSave(function($) {

		var model = $.model;
		var db = NOSQL('subscribers');
		var email = model.email.split(',');
		var ua = $.ua;

		email.wait(function(email, next) {

			if (!email || !email.isEmail()) {
				next();
				return;
			}

			var obj = {};
			obj.dtcreated = NOW;
			obj.ip = $.ip;
			obj.language = $.language;
			obj.unsubscribed = false;
			obj.source = model.source;
			obj.email = email.toLowerCase().replace(REG_SPACE, '');
			obj.browser = ua;

			db.modify(obj, obj).where('email', obj.email).callback(function(err, count) {
				if (count) {
					if (email.length === 1)
						$SAVE('Events', { id: obj.email.hash(true) + '', type: 'subscribers/add', user: $.user ? $.user.name : '', body: obj.email }, NOOP, $);
					EMIT('subscribers.save', obj);
					PUBLISH('subscribers_save', obj);
					COUNTER('subscribers').hit('all', 1);
				}
			});

			next();
		});

		$.success();
	});

	// Gets listing
	schema.setQuery(function($) {

		var opt = $.options === EMPTYOBJECT ? $.query : $.options;
		var filter = NOSQL('subscribers').list();

		filter.paginate(opt.page, opt.limit, 100);
		opt.email && filter.gridfilter('email', opt, String);
		opt.language && filter.gridfilter('language', opt, String);
		opt.dtcreated && filter.gridfilter('dtcreated', opt, Date);
		opt.unsubscribed && filter.gridfilter('unsubscribed', opt, Boolean);
		filter.gridsort(opt.sort || 'dtcreated_desc');
		filter.callback($.callback);
	});

	// Removes user from DB
	schema.setRemove(function($) {
		NOSQL('subscribers').remove().where('email', $.model.email || '@').callback($.done());
	});

	// Performs download
	schema.addWorkflow('download', function($) {
		NOSQL('subscribers').find().fields('email').take(1000000).callback(function(err, response) {

			var builder = [];
			for (var i = 0, length = response.length; i < length; i++)
				builder.push('"' + response[i].email + '"');

			$.controller.content(builder.join('\n'), U.getContentType('csv'), { 'Content-Disposition': 'attachment; filename="subscribers.csv"' });
			$.cancel();
		});
	});

	schema.addWorkflow('toggle', function($) {
		var arr = $.options.id ? $.options.id : $.query.id.split(',');
		NOSQL('subscribers').update({ '!unsubscribed': 1 }).in('email', arr).callback($.done());
	});

	schema.addWorkflow('unsubscribe', function($) {
		NOSQL('subscribers').modify({ unsubscribed: true, dtupdated: NOW }).where('email', $.query.email);
		$SAVE('Events', { type: 'subscribers/rem', user: $.user ? $.user.name : '', body: $.query.email }, NOOP, $);
		$.success();
	});

	// Clears DB
	schema.addWorkflow('clear', function($) {
		NOSQL('subscribers').clear();
		$.success();
	});

	schema.addWorkflow('stats', function($) {
		COUNTER('subscribers').monthly('all', $.callback);
	});
});