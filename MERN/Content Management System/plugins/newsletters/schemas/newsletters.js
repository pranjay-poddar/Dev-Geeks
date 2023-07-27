const REG_URL = /href="\/|src="\//g;

MAIN.newsletter = { id: null, sending: false, percentage: 0 };

NEWSCHEMA('Newsletters', function(schema) {

	schema.define('id', 'UID');
	schema.define('template', 'String(50)', true);
	schema.define('name', 'String(80)', true);
	schema.define('search', 'String(1000)', true);
	schema.define('body', String);
	schema.define('send', Boolean);
	schema.define('limit', Number);
	schema.define('widgets', '[Object]');

	// Gets listing
	schema.setQuery(function($) {

		var opt = $.options === EMPTYOBJECT ? $.query : {};
		var filter = NOSQL('newsletters').list();

		filter.paginate(opt.page, opt.limit, 70);
		opt.name && filter.gridfilter('name', opt, String);
		opt.count && filter.gridfilter('count', opt, Number);
		opt.dtcreated && filter.gridfilter('dtcreated', opt, Date);

		filter.fields('id,name,count,issent,issending,dtupdated,dtsent,dtcreated');
		filter.gridsort(opt.sort || 'dtcreated_desc');
		filter.callback($.callback);
	});

	// Gets a specific post
	schema.setGet(function($) {
		var id = $.options.id || $.id;
		var filter = NOSQL('newsletters').one();
		filter.where('id', id);
		filter.callback(function(err, response) {

			if (err) {
				$.callback();
				return;
			}

			FUNC.read('newsletters', response.id, function(err, body) {
				response.body = body;
				$.callback(response);
			});

		}, 'error-newsletters-404');
	});

	// Removes a specific post
	schema.setRemove(function($) {
		var id = $.id;
		FUNC.remove('newsletters', id);
		NOSQL('newsletters').remove().id(id).callback(() => $.success());
		NOSQL('parts').remove().where('ownerid', id).where('type', 'newsletter');
	});

	// Saves the post into the database
	schema.setSave(function($, model) {

		var user = $.user.name;
		var isUpdate = !!model.id;
		var nosql = NOSQL('newsletters');

		if (isUpdate) {
			model.dtupdated = NOW;
			model.adminupdated = user;
		} else {
			model.id = UID();
			model.admincreated = user;
			model.dtcreated = NOW;
			model.count = 0;
			model.issending = false;
			model.issent = false;
		}

		var body = U.minify_html(model.body);
		!model.dtcreated && (model.dtcreated = NOW);
		model.stamp = model.stamp = new Date().format('yyyyMMddHHmm');
		model.linker = model.dtcreated.format('yyyyMMdd') + '-' + model.name.slug();
		model.search = ((model.name || '') + ' ' + (model.search || '')).keywords(true, true).join(' ').max(1000);

		FUNC.write('newsletters', model.id + '_' + model.stamp, body); // backup
		FUNC.write('newsletters', model.id, body, isUpdate);

		model.body = undefined;

		var db = isUpdate ? nosql.modify(model).id(model.id).backup($.user.meta(model)) : nosql.insert(model);

		db.callback(function() {
			$SAVE('Events', { type: 'newsletters/save', user: user, id: model.id, body: model.name, admin: true }, NOOP, $);
			EMIT('newsletter.save', model);
			if ($.model.send) {
				$.model.body = body;
				EXEC('+Newsletters --> send', $.model, $.callback);
			} else
				$.success(model.id);
		});
	});

	// Clears database
	schema.addWorkflow('clear', function($) {
		FUNC.remove('newsletters');
		NOSQL('newsletters').clear();
		$.success();
	});

	schema.addWorkflow('stats', function($) {
		COUNTER('newsletters').monthly($.id || $.options.id || 'all', $.callback);
	});

	schema.addWorkflow('test', function($, model) {

		var newsletter = model;

		newsletter.body.CMSrender(newsletter.widgets, function(body) {

			var repository = {};
			repository.page = {};
			repository.page.id = newsletter.id;
			repository.page.name = newsletter.name;
			repository.page.body = body;
			repository.preview = false;
			newsletter.body = VIEW('cms' + newsletter.template, null, repository);
			newsletter.unsubscribe = PREF.url + '/api/unsubscribe/?email=';

			var message = new Mail.Message(newsletter.name, prepare_urladdress(newsletter.body.replace(/@@@/g, $.query.email)));
			message.to($.query.email);
			message.from(PREF.emailsender, CONF.name);
			message.reply(PREF.emailreply);
			message.unsubscribe(newsletter.unsubscribe + $.query.email);
			message.callback = internal_notvalidaddress;
			Mail.send2(message);
			$.success();
		}, $.controller);

	});

	schema.addWorkflow('send', function($, model) {

		if (MAIN.newsletter.sending) {
			$.invalid('error-newsletters-sending');
			return;
		}

		var newsletter = model;
		MAIN.newsletter.sending = true;
		MAIN.newsletter.percentage = 0;
		MAIN.newsletter.id = $.model.id;

		$.success();

		newsletter.body.CMSrender(newsletter.widgets, function(body) {

			var repository = {};
			var cache = PREF.newsletters;

			repository.page = {};
			repository.page.id = newsletter.id;
			repository.page.name = newsletter.name;
			repository.preview = false;
			repository.page.body = body;

			newsletter.body = VIEW('cms' + newsletter.template, null, repository);
			newsletter.unsubscribe = PREF.url + '/api/unsubscribe/?email=';

			NOSQL('subscribers').find().where('unsubscribed', false).skip(cache ? cache.count : 0).callback(function(err, response) {

				var count = response.length;
				var sum = cache ? cache.count : 0;
				var old = 0;

				count += sum;

				response.limit(10, function(items, next) {

					var messages = [];

					for (var i = 0, length = items.length; i < length; i++) {
						var message = new Mail.Message(newsletter.name, prepare_urladdress(newsletter.body.replace('@@@', items[i].email)));
						message.to(items[i].email);
						message.from(PREF.emailsender, CONF.name);
						message.reply(PREF.emailreply);
						message.unsubscribe(newsletter.unsubscribe + items[i].email);
						message.callback = internal_notvalidaddress;
						messages.push(message);
					}

					sum += items.length;
					MAIN.newsletter.percentage = ((sum / count) * 100) >> 0;

					// Updates cache
					PREF.set('newsletters', { id: MAIN.newsletter.id, count: sum });

					if (MAIN.newsletter.percentage !== old)
						$SAVE('Event', { type: 'newsletters/percentage', body: MAIN.newsletter.percentage.toString() + '%', admin: true }, NOOP, $);

					old = MAIN.newsletter.percentage;

					// Sends email
					if (sum % newsletter.limit === 0) {
						// Each "limit" it waits 24 hours
						setTimeout(() => Mail.send2(messages, next), 60000 * 1440);
					} else if (sum % 100 === 0) {

						// Each 100 email waits 1 minute ....
						setTimeout(() => Mail.send2(messages, next), 60000);

						// Updates DB
						NOSQL('newsletters').modify({ issending: true, count: sum, dtsent: NOW }).first().id(MAIN.newsletter.id);

					} else
						Mail.send2(messages, () => setTimeout(next, 2000));

				}, function() {
					PREF.set('newsletters', null);
					$SAVE('Event', { type: 'newsletters/sent', body: repository.page.name, admin: true }, NOOP, $);
					NOSQL('newsletters').modify({ issending: false, issent: true, count: sum, dtsent: NOW }).first().id(MAIN.newsletter.id);
					MAIN.newsletter.sending = false;
					MAIN.newsletter.percentage = 0;
					MAIN.newsletter.id = null;
				});
			});

		}, $.controller);
	});

	// Loads unsent newsletter
	ON('settings', function() {
		var cache = PREF.newsletters;
		cache && setTimeout(function() {
			schema.get({ id: cache.id }, function(err, response) {
				response && schema.workflow('send', response);
			});
		}, 5000);
	});
});

function prepare_urladdress(body) {
	return body.replace(REG_URL, (text) => text[0] === 'h' ? ('href="' + PREF.url + '/') : ('src="' + PREF.url + '/'));
}

function internal_notvalidaddress(err, message) {
	err && console.log('Newsletter error:', message.addressTo, err);
}
