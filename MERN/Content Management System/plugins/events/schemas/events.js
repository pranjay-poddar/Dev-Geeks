var WSDATA = { TYPE: 'event' };

NEWSCHEMA('Events', function(schema) {

	schema.define('id', 'String(50)', true);
	schema.define('type', 'String(50)', true);
	schema.define('body', String);
	schema.define('user', String);
	schema.define('admin', Boolean);

	schema.setSave(function($) {
		var model = {};

		model.id = $.model.id;
		model.type = $.model.type;
		model.dtcreated = NOW;

		if ($.model.body)
			model.body = $.model.body;

		if ($.controller) {
			model.ip = $.ip;
			model.ua = ($.headers['user-agent'] || '').parseUA();
		}

		if ($.model.user)
			model.user = $.model.user;
		else if ($.user && $.user.name)
			model.user = $.user.name;

		if (model.admin)
			model.admin = true;

		NOSQL('events').insert(model);

		WSDATA.user = model.user;
		WSDATA.message = model.body;
		WSDATA.type = model.type;

		FUNC.send(WSDATA);
		$.success();
	});

	schema.setQuery(function($) {
		NOSQL('events').find2().take(100).callback($.callback);
	});

	schema.addWorkflow('clear', function($) {
		NOSQL('events').clear($.done());
	});

});