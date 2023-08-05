var common = {};

SETTER(true, 'avatar', 'register', 'widget', 'size:80');

ON('ready', function() {
	refresh_height();
	refresh_dependencies();
	setTimeout(refresh_height, 100);
});

Array.prototype.limit = function(take, fn, callback) {
	var self = this;
	if (!self.length) {
		callback && callback();
		return;
	}
	var arr = self.splice(0, take);
	fn(arr, function() {
		self.limit(take, fn, callback);
	});
};

function refresh_dependencies() {
	AJAX('GET [url]api/dependencies/', 'common.dependencies');
}

function refresh_height() {
	var h = $(window).height();
	var el = $('.fullheight');

	setTimeout2('resize', function() {

		el.length && el.each(function() {
			var el = $(this);
			var t = el.offset().top;
			t && el.css('height', h - (t + 20 + (+(el.attrd('margin') || ''))));
		});

		EMIT('resize');
		SETTER('grid', 'resize');
	}, 50);
}

function refresh_filebrowser_files(clear, callback) {
	AJAXCACHE('GET [url]api/files/', function(response, is) {
		if (!is) {
			response.reverse();
			for (var i = 0; i < response.length; i++) {
				var file = response[i];
				file.id = file.id + file.name.substring(file.name.lastIndexOf('.'));
			}
		}
		SET('filebrowser.files', response);
		callback && callback(response);
	}, 'session', clear);
}

function refresh_filebrowser(target, type, clear) {

	var item = filebrowser;
	item.target = target;
	item.id = '';
	item.filename = null;
	item.type = type;

	if (clear === true)
		item.clear = clear;

	refresh_filebrowser_files(item.clear, function() {
		item.clear = false;
		SET('common.form3', 'filebrowser');
	});
}

$(W).on('resize', refresh_height);

// Tangular helpers
Thelpers.join = function(value, delimiter) {
	return value instanceof Array ? value.join(delimiter || ', ') : '';
};

Thelpers.filesize = function(value, decimals, type) {
	return value ? value.filesize(decimals, type) : '...';
};

Number.prototype.filesize = function(decimals, type) {

	if (typeof(decimals) === 'string') {
		var tmp = type;
		type = decimals;
		decimals = tmp;
	}

	var value;

	// this === bytes
	switch (type) {
		case 'bytes':
			value = this;
			break;
		case 'KB':
			value = this / 1024;
			break;
		case 'MB':
			value = filesizehelper(this, 2);
			break;
		case 'GB':
			value = filesizehelper(this, 3);
			break;
		case 'TB':
			value = filesizehelper(this, 4);
			break;
		default:

			type = 'bytes';
			value = this;

			if (value > 1023) {
				value = value / 1024;
				type = 'KB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'MB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'GB';
			}

			if (value > 1023) {
				value = value / 1024;
				type = 'TB';
			}

			break;
	}

	type = ' ' + type;
	return (decimals === undefined ? value.format(2).replace('.00', '') : value.format(decimals)) + type;
};

function filesizehelper(number, count) {
	while (count--) {
		number = number / 1024;
		if (number.toFixed(3) === '0.000')
			return 0;
	}
	return number;
}

Thelpers.counter = function(value) {
	if (value > 999999)
		return (value / 100000).format(2) + ' M';
	if (value > 9999)
		return (value / 1000).format(2) + ' K';
	return value.format(0);
};

Thelpers.default = function(value, def) {
	return value == null || value === '' ? def : value;
};

Thelpers.language = function(value) {
	if (!value)
		return '';
	var colors = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#d35400','#c0392b'];
	var num = 0;
	for (var i = 0; i < value.length; i++)
		num += value.charCodeAt(i);
	return '<span class="badge badge-small mr5" style="background-color:{0}">{1}</span>'.format(colors[num % colors.length], value);
};

FUNC.loading = function(show, timeout) {
	SETTER('loading', show ? 'show' : 'hide', timeout);
};

var TTIC = ['#1abc9c','#2ecc71','#3498db','#9b59b6','#34495e','#16a085','#2980b9','#8e44ad','#2c3e50','#f1c40f','#e67e22','#e74c3c','#d35400','#c0392b'];

Thelpers.initials = function(value) {
	var index = value.indexOf('.');
	var arr = value.substring(index + 1).replace(/\s{2,}/g, ' ').trim().split(' ');
	var initials = ((arr[0].substring(0, 1) + (arr[1] || '').substring(0, 1))).toUpperCase();
	var sum = 0;
	for (var i = 0; i < value.length; i++)
		sum += value.charCodeAt(i);
	return '<span class="initials" style="background-color:{1}" title="{2}">{0}</span>'.format(initials, TTIC[sum % TTIC.length], value);
};

Thelpers.initialsbase64 = function(value, width, height) {

	var index = value.indexOf('.');
	var arr = value.substring(index + 1).replace(/\s{2,}/g, ' ').trim().split(' ');
	var initials = ((arr[0].substring(0, 1) + (arr[1] || '').substring(0, 1))).toUpperCase();
	var sum = 0;

	for (var i = 0; i < value.length; i++)
		sum += value.charCodeAt(i);

	var canvas = W.$initialscanvas;
	if (!canvas)
		canvas = W.$initialscanvas = document.createElement('CANVAS');

	if (canvas.width != width)
		canvas.width = width;

	if (canvas.height != height)
		canvas.height = height;

	var color = TTIC[sum % TTIC.length];
	var ctx = canvas.getContext('2d');
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, width, height);
	ctx.font = 'bold ' + ((width / 2) >> 0) + 'px Arial';
	ctx.fillStyle = '#FFFFFF';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle';
	ctx.fillText(initials, (width / 2), (height / 2 >> 0) + 5);
	return canvas.toDataURL('image/png');
};