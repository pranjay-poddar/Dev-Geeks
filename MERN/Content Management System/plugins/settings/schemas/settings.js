const COOKIE_OPTIONS = { security: 'strict', httponly: true };

var localization = null;

LOCALIZE(function(req) {
	return localization ? localization(req) : '';
});

NEWSCHEMA('SettingsKeyValue', function(schema) {
	schema.define('id', 'String(50)', true);
	schema.define('name', 'String(50)', true);
});

NEWSCHEMA('Settings/SuperUser', function(schema) {
	schema.define('id', 'String(15)');
	schema.define('name', String, true);
	schema.define('login', String, true);
	schema.define('password', String, true);
	schema.define('permissions', '[String]');
	schema.define('sa', Boolean);
});

NEWSCHEMA('Settings', function(schema) {

	schema.define('name', 'String(50)', true);
	schema.define('author', 'String(50)');
	schema.define('emailcontactform', 'Email', true);
	schema.define('emailreply', 'Email', true);
	schema.define('emailsender', 'Email', true);
	schema.define('url', 'Url', true);
	schema.define('users', '[Settings/SuperUser]');
	schema.define('signals', '[SettingsKeyValue]');
	schema.define('languages', '[SettingsKeyValue]');
	schema.define('smtp', String);
	schema.define('smtpoptions', 'JSON');
	schema.define('componentator', Boolean);
	schema.define('cookie', 'String(30)', true);
	schema.define('cdn', String, true);
	schema.define('memorizeall', 'Boolean');
	schema.define('localization', 'String');
	schema.define('allow_tms', Boolean);
	schema.define('allow_totalapi', Boolean);
	schema.define('secret_tms', String);
	schema.define('totalapi', String);
	schema.define('mail_api', Boolean);

	schema.setGet(function($) {
		$.callback(PREF);
	});

	// Saves settings into the file
	schema.setSave(function($, model) {

		var keys = Object.keys(model);

		if (model.url.endsWith('/'))
			model.url = model.url.substring(0, model.url.length - 1);

		for (var i = 0; i < model.users.length; i++) {
			var usr = model.users[i];
			if (usr.password[0] === '#')
				usr.password = usr.password.substring(1).sha256(CONF.admin_secret);
		}

		for (var i = 0; i < keys.length; i++)
			PREF.set(keys[i], model[keys[i]]);

		model.dtbackup = NOW;
		NOSQL('settings_backup').insert(JSON.parse(JSON.stringify(model)));
		model.dtbackup = undefined;

		EMIT('settings.save', PREF);
		$SAVE('Events', { type: 'settings', id: model.id, user: $.user.name, admin: true }, NOOP, $);
		$.success();
	});

	schema.addWorkflow('dependencies', function($) {

		var obj = $.model;
		var keys = Object.keys(obj);

		// Clean default values in model
		for (var i = 0; i < keys.length; i++)
			obj[keys[i]] = undefined;

		obj.navigations = PREF.navigations;
		obj.signals = PREF.signals;
		obj.templatespages = PREF.templates;
		obj.templatesposts = PREF.templatesposts;
		obj.templatesnewsletters = PREF.templatesnewsletters;
		obj.notices = PREF.notices;
		obj.languages = PREF.languages || EMPTYARRAY;
		$.callback();
	});

	// Tests SMTP
	schema.addWorkflow('smtp', function($) {
		var model = $.model;
		if (model.smtp && !model.mail_api)
			Mail.use(model.smtp, model.smtpoptions ? model.smtpoptions.parseJSON() : '', err => err ? $.invalid(err) : $.success());
		else
			$.success();
	});

	// Loads settings + rewrites framework configuration
	schema.addWorkflow('load', function($) {

		if (!PREF.url)
			PREF.url = 'http://{0}:{1}'.format(F.ip, F.port);

		if (PREF.componentator == null)
			PREF.componentator = true;

		if (!PREF.cdn)
			PREF.cdn = '//cdn.componentator.com';

		CONF.url = PREF.url;
		MAIN.users = [];

		if (!PREF.cookie)
			PREF.cookie = U.random_string(10);

		CONF.admin_cookie = PREF.cookie;
		CONF.totalapi = PREF.totalapi;
		CONF.allow_totalapi = PREF.allow_totalapi;
		CONF.secret_tms = PREF.secret_tms;
		CONF.allow_tms = PREF.allow_tms;
		CONF.mail_api = PREF.mail_api;

		FUNC.refresh_users($);

		if (PREF.name)
			CONF.name = PREF.name;

		if (PREF.author)
			CONF.author = PREF.author;

		// Rewrites internal framework settings
		CONF.mail_address_from = PREF.emailsender;
		CONF.mail_address_reply = PREF.emailreply;
		CONF.cdn = PREF.cdn;

		!PREF.signals && PREF.set('signals', []);
		!PREF.languages && PREF.set('languages', []);
		!PREF.navigations && PREF.set('navigations', {});
		!PREF.templatespages && PREF.set('templates', []);
		!PREF.templatesposts && PREF.set('templatesposts', []);
		!PREF.templatesnewsletters && PREF.set('templatesnewsletters', []);
		!PREF.posts && PREF.set('posts', []);
		!PREF.notices && PREF.set('notices', []);

		delete F.temporary.mail_settings;

		if (PREF.smtp && !CONF.mail_api)
			Mail.use(PREF.smtp, PREF.smtpoptions.parseJSON());

		if (PREF.localization) {
			try {
				localization = new Function('req', PREF.localization.indexOf('return ') === -1 ? ('return ' + PREF.localization) : PREF.localization);
			} catch (e) {
				localization = null;
			}
		} else
			localization = null;

		EMIT('settings', PREF);
		CMD('refresh_tms');
		CMD('refresh_cms');
		$.success();
	});
});

function meta(model) {
	return { id: model.id, stamp: model.stamp, userid: this.id, user: this.name, sa: this.sa };
}

FUNC.refresh_users = function($) {

	MAIN.users = [];

	// Refreshes internal informations
	if (PREF.users && PREF.users.length)
		MAIN.users.push.apply(MAIN.users, PREF.users);

	// Adds an admin (service) account
	if (!MAIN.users.length) {
		var pwd = GUID(10);
		MAIN.users.push({ id: GUID(15), name: 'Administrator', login: GUID(10), password: pwd.sha256(CONF.admin_secret), permissions: [], sa: true, passwordinit: pwd });
		PREF.set('users', MAIN.users);
		PREF.set('usersinitialized', false);
	}

	// Optimized for the performance
	var users = {};
	for (var i = 0, length = MAIN.users.length; i < length; i++) {
		var user = MAIN.users[i];
		var key = (user.login + ':' + user.password + ':' + CONF.secret + (user.login + ':' + user.password).hash()).sha256(CONF.admin_secret);

		if (user.roles) {
			user.permissions = user.roles;
			delete user.roles;
		}

		if ($.controller && $.user.id === user.id)
			$.cookie(CONF.admin_cookie, key, '1 month', COOKIE_OPTIONS);

		users[key] = user;
		user.meta = meta;
	}

	MAIN.users = users;
};

NEWSCHEMA('Settings/TotalAPI', function(schema) {

	schema.define('totalapi', 'String(100)', true);

	schema.addWorkflow('exec', function($, model) {
		TotalAPI(model.totalapi, 'check', EMPTYOBJECT, $.callback);
	});
});

setTimeout(function() {
	$WORKFLOW('Settings', 'load');
}, 500);