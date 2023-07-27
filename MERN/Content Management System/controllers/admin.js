const MSG_NOTIFY = { TYPE: 'notify' };
const MSG_ALERT = { TYPE: 'alert' };
const COOKIE_OPTIONS = { security: 'strict', httponly: true };
const ALLOW = { GET: ['/api/dependencies/', '/api/pages/preview/', '/api/profile/', '/api/nav/', '/api/files/', '/stats/', '/live/', '/api/widgets/', '/logout/', '/api/parts/'], POST: ['/api/upload/', '/api/parts/', '/api/profile/'] };
const ADMINURL = '/admin/';

var DDOS = {};
var WS = null;

FUNC.notify = function(value) {
	if (WS) {
		MSG_NOTIFY.type = value instanceof Object ? value.type : value;
		MSG_NOTIFY.message = value instanceof Object ? value.message : '';
		WS.send(MSG_NOTIFY);
	}
};

FUNC.send = function(value) {
	WS && WS.send(value);
};

FUNC.alert = function(user, type, value) {
	if (user && WS) {
		MSG_ALERT.type = type;
		MSG_ALERT.message = value;
		MSG_ALERT.user = user.name;
		WS.send(MSG_ALERT);
	}
};

ON('visitor', function(obj) {
	if (WS) {
		MSG_NOTIFY.type = 'visitor';
		MSG_NOTIFY.message = obj;
		WS.send(MSG_NOTIFY);
	}
});

exports.install = function() {

	// Internal
	ROUTE('GET     /admin',                                   admin);
	ROUTE('GET     /admin/logout/',                           logout);
	ROUTE('POST    /api/login/admin/',                        login);
	ROUTE('POST    /admin/api/upload/',                       upload, ['upload', 10000], 20480); // 20 MB
	ROUTE('POST    /admin/api/upload/base64/',                upload_base64, [10000], 2048); // 2 MB
	ROUTE('GET     /admin/api/dependencies/                   *Settings --> @dependencies');

	// MODEL: /schema/common.js
	ROUTE('GET     /admin/api/backups/clear/                  *Common --> @backup_clear');
	ROUTE('GET     /admin/api/backups/{type}/{id}/            *Common --> @backup_read');

	// Websocket
	ROUTE('SOCKET  /admin/live/', socket, ['json']);

	// Files
	ROUTE('FILE    /download/', file_read);
	FILE(pluginfiles);
};

function admin() {

	var self = this;
	var user = self.user;
	var model = [];

	for (var i = 0; i < MAIN.pluginsgroups.length; i++) {
		var group = MAIN.pluginsgroups[i];
		var index = -1;
		for (var j = 0; j < group.plugins.length; j++) {
			var item = group.plugins[j];
			if (user.sa || (user.permissions && user.permissions.indexOf(item.id) !== -1)) {
				if (item.id === 'settings' && !user.sa)
					continue;
				if (index == -1)
					index = model.push({ name: group.name ? TRANSLATOR(user.language, group.name) : null, plugins: [] }) - 1;
				model[index].plugins.push({ id: item.id, name: TRANSLATOR(user.language, item.name), icon: item.icon });
			}
		}
	}

	model.quicksort('name');
	self.view('admin', model);
}

ON('controller', function(controller) {

	if (controller.url.substring(0, ADMINURL.length) !== ADMINURL)
		return;

	var ddos = DDOS[controller.ip];

	// 5 failed attempts
	if (ddos > 5) {
		controller.cancel();
		controller.throw401();
		return;
	}

	/*
	if (CONF.admin_token && controller.req.headers['x-token'] === CONF.admin_token) {
		controller.user = SYSUSER;
		return;
	}*/

	var cookie = controller.cookie(CONF.admin_cookie);
	if (!cookie || !cookie.length) {
		DDOS[controller.ip] = ddos ? ddos + 1 : 1;
		controller.cancel();
		controller.view('admin-login');
		return;
	}

	var user = MAIN.users[cookie];
	if (user == null) {
		DDOS[controller.ip] = ddos ? ddos + 1 : 1;
		controller.cancel();
		controller.view('admin-login');
		return;
	}

	// Permissions
	if (!user.sa && user.permissions.length && controller.url !== ADMINURL) {

		var cancel = true;

		for (var i = 0, length = user.permissions.length; i < length; i++) {
			var role = user.permissions[i];

			if (controller.url.indexOf(role.toLowerCase()) !== -1) {
				cancel = false;
				break;
			}
		}

		// Allowed URL
		if (cancel) {

			var allow = ALLOW[controller.req.method];

			for (var i = 0, length = allow.length; i < length; i++) {
				if (controller.url.indexOf(allow[i]) !== -1) {
					cancel = false;
					break;
				}
			}

			if (cancel) {
				controller.cancel();
				controller.throw401();
				return;
			}
		}
	}

	controller.name = 'admin';
	controller.user = user;
});

function pluginfiles(req, res, is) {

	if (is)
		return req.url[1] === '_';

	var path = req.uri.pathname;
	var index = path.indexOf('/', 2);
	var name = path.substring(2, index);

	for (var i = 0; i < MAIN.plugins.length; i++) {
		var plugin = MAIN.plugins[i];
		if (plugin.id === name) {
			var file = path.substring(index + 1);
			var filename = PATH.root('/plugins/' + name + '/public/' + file);
			res.file(filename);
			return;
		}
	}

	res.throw404();
}

const ISIMAGE = { jpg: 1, jpeg: 1, png: 1, gif: 1 };

// Reads a specific file from database
// For images (jpg, gif, png) supports percentual resizing according "?s=NUMBER" argument in query string e.g.: .jpg?s=50, .jpg?s=80 (for image galleries)
// URL: /download/*.*
function file_read(req, res) {

	var id = req.split[1].replace('.' + req.extension, '');

	if (!req.query.s || !ISIMAGE[req.extension]) {
		res.filefs('files', id, !ISIMAGE[req.extension] && (req.extension !== 'pdf' && req.extension !== 'txt'));
		return;
	}

	// Custom image resizing
	var size;

	// Small hack for the file cache.
	// F.exists() uses req.uri.pathname for creating temp identificator and skips all query strings by creating (because this hack).
	if (req.query.s) {
		size = req.query.s.parseInt();
		if (size < 1 || size > 100) {
			res.throw400();
			return;
		}
		req.uri.pathname = req.uri.pathname.replace('.', size + '.');
	}

	res.imagefs('files', id, function(image) {
		image.output(req.extension);
		req.extension === 'jpg' && image.quality(85);
		size && image.resize(size + '%');
		image.minify();
	});
}

ON('service', function(counter) {
	if (counter % 15 === 0)
		DDOS = {};
});

function socket() {
	var self = this;
	WS = self;
	self.autodestroy(() => WS = null);
	self.on('message', (client, message) => self.send(message, c => c !== client));
}

function logout() {
	var self = this;
	self.cookie(CONF.admin_cookie, '', '-1 day');
	self.redirect('/admin/');
}

function login() {
	var self = this;
	var pwd = self.body.password.sha256(CONF.admin_secret);
	var key = (self.body.name + ':' + pwd + ':' + CONF.secret + (self.body.name + ':' + pwd).hash()).sha256(CONF.admin_secret);
	if (MAIN.users[key]) {

		if (!PREF.usersinitialized)
			PREF.set('usersinitialized', true);

		$SAVE('Event', { type: 'system/login', user: self.body.name, admin: true }, NOOP, self);
		self.cookie(CONF.admin_cookie, key, '1 month', COOKIE_OPTIONS);
		self.success();
	} else
		self.invalid('error-users-credentials');
}

// Upload (multiple) pictures
function upload() {

	var files = [];
	var self = this;

	self.files.wait(function(file, next) {
		var id = UID();
		FILESTORAGE('files').save(id, file.filename, file.path, function(err) {
			if (!err)
				files.push({ id: id, name: file.filename, size: file.length, width: file.width, height: file.height, type: file.type, ctime: NOW, mtime: NOW, extension: file.extension, download: '/download/' + id + '.' + file.extension });
			setImmediate(next);
		});
	}, () => self.json(files));
}

// Upload base64
function upload_base64() {
	var self = this;

	if (!self.body.file) {
		self.json(null);
		return;
	}

	var type = self.body.file.base64ContentType();
	var ext;

	switch (type) {
		case 'image/png':
			ext = '.png';
			break;
		case 'image/jpeg':
			ext = '.jpg';
			break;
		case 'image/gif':
			ext = '.gif';
			break;
		default:
			self.json(null);
			return;
	}

	var data = self.body.file.base64ToBuffer();
	var id = UID();
	FILESTORAGE('files').save(id, (self.body.name || 'base64').replace(/\.[0-9a-z]+$/i, '').max(40) + ext, data, () => self.json('/download/' + id + ext));
}