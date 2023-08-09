NEWSCHEMA('Profile', function(schema) {

	schema.define('name', 'String(30)', true);
	schema.define('login', 'String(120)', true);
	schema.define('password', 'String(30)');

	schema.addWorkflow('check', function($) {
		var model = $.model;
		var builder = DBMS().check('tbl_admin');
		builder.error('error-email', true);
		builder.where('email', model.email);
		builder.where('id', '<>', $.user.id);
		builder.callback($.done());
	});

	schema.setRead(function($) {
		var model = {};
		model.name = $.user.name;
		model.login = $.user.login;
		$.callback(model);
	});

	schema.setUpdate(function($) {

		var model = $.model;

		if (model.password)
			model.password = model.password.sha256(CONF.admin_secret);
		else
			delete model.password;

		for (var i = 0; i < PREF.users.length; i++) {
			var usr = PREF.users[i];
			if (usr.id === $.user.id) {
				usr.name = model.name;
				if (model.password)
					usr.password = model.password;
				usr.login = model.login;
				PREF.set('users', PREF.users);
				FUNC.refresh_users($);
				break;
			}
		}

		$.success();
	});

});