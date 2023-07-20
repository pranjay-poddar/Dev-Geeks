NEWSCHEMA('ContactForms', function(schema) {

	schema.define('source', 'String(50)');
	schema.define('name', 'String(60)', true);
	schema.define('firstname', 'Capitalize(40)', true);
	schema.define('lastname', 'Capitalize(40)', true);
	schema.define('email', 'Email', true);
	schema.define('body', String, true);
	schema.define('phone', 'Phone');

	// TMS
	schema.jsonschema_define('id', 'String');
	schema.jsonschema_define('ip', 'String');
	schema.jsonschema_define('browser', 'String');
	schema.jsonschema_define('dtcreated', 'Date');

	schema.required('firstname, lastname', m => !m.name);
	schema.required('name', m => !m.firstname && !m.lastname);

	schema.setQuery(function($) {
		var opt = $.options === EMPTYOBJECT ? $.query : $.options;
		var filter = NOSQL('contactforms').list();
		filter.paginate(opt.page, opt.limit, 100);
		opt.source && filter.gridfilter('source', opt, String);
		opt.email && filter.gridfilter('email', opt, String);
		opt.firstname && filter.gridfilter('firstname', opt, String);
		opt.lastname && filter.gridfilter('lastname', opt, String);
		opt.phone && filter.gridfilter('phone', opt, String);
		opt.dtcreated && filter.gridfilter('dtcreated', opt, Date);
		filter.fields('-body');
		filter.gridsort(opt.sort || 'dtcreated_desc');
		filter.callback($.callback);
	});

	schema.setGet(function($) {
		NOSQL('contactforms').read().id($.id).callback($.callback, 'error-contacforms-404');
	});

	schema.setRemove(function($) {
		var id = ($.query.id || '').split(',');
		if (id.length)
			NOSQL('contactforms').remove().in('id', id).callback($.done());
		else
			$.success();
	});

	schema.setSave(function($, model) {

		model.id = UID();
		model.ip = $.ip;
		model.browser = $.req.useragent();
		model.dtcreated = NOW;

		if (!model.name)
			model.name = model.lastname + ' ' + model.firstname;

		var nosql = NOSQL('contactforms');
		nosql.insert(model);
		COUNTER('contactforms').hit('all');
		$.success();

		EMIT('contacts.save', model);

		PUBLISH('contactforms_save', model);

		var builder = [];

		builder.push('<b>' + model.name.encode() + (model.source ? (' - &quot;' + model.source.encode() + '&quot;') : '') + '</b>');
		builder.push(model.email);
		model.phone && builder.push(model.phone);
		builder.push('');
		builder.push(model.body);

		// Sends email
		LOGMAIL(PREF.emailcontactform, '📩 ' + CONF.name, builder.join('\n')).reply(model.email, true);

		// Events
		$SAVE('Events', { type: 'contactforms/add', user: $.user ? $.user.name : '', body: model.name, id: model.id }, NOOP, $);
	});

	// Stats
	schema.addWorkflow('stats', function($) {
		COUNTER('contactforms').monthly('all', $.callback);
	});
});