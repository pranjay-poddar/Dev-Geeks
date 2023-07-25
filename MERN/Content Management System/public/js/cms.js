DEF.fallbackcache = '1 day';

// Link tracking
$(document).on('mousedown touchstart', 'a[data-cms-track]', function(e) {
	var target = $(e.target);
	if (e.target.nodeName !== 'A')
		target = target.closest('a');
	var id = target.attrd('cms-track');
	id && AJAX('GET /api/track/' + id, NOOP);
}).on('click', '#mobilemenu', function() {
	$('body').tclass('mobilemenu-visible');
});

$(document).ready(function() {

	// Online statistics for visitors
	var visitors = function() {

		var n = navigator;
		var W = window;
		var LS = W.localStorage;

		if ((n.onLine != null && !n.onLine) || !LS || NAV.query.DRAFT)
			return;

		var key = 'cmsvisitor';
		var options = {};
		var ticks = LS.getItem('cmsvisitor') || '';

		options.type = 'GET';
		options.headers = { 'x-ping': location.pathname, 'x-referrer': document.referrer };

		var url = '/$visitors/';

		try {
			var key2 = key + 'test';
			localStorage.setItem(key2, '1');
			var is = LS.getItem(key2) === '1';
			LS.removeItem(key2);
			if (!is)
				return;
		} catch (e) {
			// disabled localStorage (skip user)
			return;
		}

		options.success = function(r) {

			ticks = r;
			r && LS.setItem(key, r);

			if (W.$visitorscounter)
				W.$visitorscounter++;
			else
				W.$visitorscounter = 1;

			// 3 minutes
			if (W.$visitorscounter === 6)
				clearInterval(W.$visitorsinterval);
		};

		options.error = function() {
			// Maybe a broken network
			clearInterval(W.$visitorsinterval);
		};

		var params = '?id=' + ticks;
		var un;

		if (NAV.query.utm_medium || NAV.query.utm_source || NAV.query.campaign_id)
			params += '&utm_medium=1';

		if (W.user) {
			if (W.user.name)
				un = W.user.name + '';
			else if (W.user.nick)
				un = W.user.nick + '';
		} else if (W.username)
			un = W.username + '';
		else if (NAV.query.utm_user)
			un = NAV.query.utm_user;

		if (un)
			params += '&utm_user=' + encodeURIComponent(un);

		$.ajax(url + params, options);

		W.$visitorsinterval = setInterval(function() {
			if (document.hasFocus()) {
				options.headers['x-ping'] = location.pathname;
				options.headers['x-reading'] = '1';
				$.ajax(url + '?id=' + ticks + (un ? ('&utm_user=' + encodeURIComponent(un)) : ''), options);
			}
		}, 30000);
	};

	// Determines OpenPlatform
	if (W.OP && W.OP.init) {
		W.OP.init(function(err, profile) {
			if (profile)
				W.username = profile.username;
			visitors();
		});
	} else
		visitors();

	setTimeout(function() {
		var cls = 'jcomponent';
		$('.' + cls).rclass(cls);
	}, 1000);

});

COMPONENT('exec', function(self, config) {
	self.readonly();
	self.blind();
	self.make = function() {

		var scope = null;

		var scopepath = function(el, val) {
			if (!scope)
				scope = el.scope();
			return val == null ? scope : scope ? scope.makepath ? scope.makepath(val) : val.replace(/\?/g, el.scope().path) : val;
		};

		var fn = function(plus) {
			return function(e) {

				var el = $(this);
				var attr = el.attrd('exec' + plus);
				var path = el.attrd('path' + plus);
				var href = el.attrd('href' + plus);
				var def = el.attrd('def' + plus);
				var reset = el.attrd('reset' + plus);

				scope = null;

				var prevent = el.attrd('prevent' + plus);

				if (prevent === 'true' || prevent === '1') {
					e.preventDefault();
					e.stopPropagation();
				}

				if (attr) {
					if (attr.indexOf('?') !== -1) {
						var tmp = scopepath(el);
						if (tmp) {
							M.scope(tmp.path);
							attr = tmp.makepath ? tmp.makepath(attr) : attr.replace(/\?/g, tmp.path);
						}
					}
					EXEC(attr, el, e);
				}

				href && NAV.redirect(href);

				if (def) {
					if (def.indexOf('?') !== -1)
						def = scopepath(el, def);
					DEFAULT(def);
				}

				if (reset) {
					if (reset.indexOf('?') !== -1)
						reset = scopepath(el, reset);
					RESET(reset);
				}

				if (path) {
					var val = el.attrd('value');
					if (val) {
						if (path.indexOf('?') !== -1)
							path = scopepath(el, path);
						var v = GET(path);
						SET(path, new Function('value', 'return ' + val)(v), true);
					}
				}
			};
		};

		self.event('dblclick', config.selector2 || '.exec2', fn('2'));
		self.event('click', config.selector || '.exec', fn(''));
	};
});

COMPONENT('animation', 'style:2;delay:200;init:1000;cleaner:1000;visible:0;offset:50', function(self, config, cls) {

	self.readonly();

	if (!config.if)
		self.blind();

	self.destroy = function() {
		self.visibleinterval && clearInterval(self.interval);
	};

	self.make = function() {
		if (config.visible) {
			self.visibleinterval = setInterval(function() {
				if (VISIBLE(self.dom, config.offset)) {
					self.visibleinterval = null;
					clearInterval(self.visibleinterval);
					self.animate();
				}
			}, 500);
		} else
			setTimeout2(self.ID, self.animate, config.init);

		config.datasource && self.datasource(config.datasource, function() {
			setTimeout2(self.ID, self.animate, config.init);
		});
	};

	self.restore = function() {
		self.find('.animated').aclass('animation').rclass('animated');
	};

	self.animate = function() {

		var el = self.find('.animation');
		var arr = [];

		for (var i = 0; i < el.length; i++) {

			var t = el[i];

			if (!t.$anim) {
				var $t = $(t);

				if (!t.$animopt) {
					var opt = ($t.attrd('animation') || '').parseConfig();
					t.$animopt = opt;
				}

				t.$anim = cls + '-' + (t.$animopt.style || config.style);
				$t.aclass(t.$anim + '-init animating');
				arr.push($t);
			}
		}

		if (!arr.length)
			return;

		setTimeout(function(arr) {

			if (self.removed)
				return;

			var maxdelay = 500;

			if (config.together) {

				for (var i = 0; i < arr.length; i++) {
					var el = arr[i];
					var c = el[0].$anim;
					var opt = el[0].$animopt;
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + c + '-init');
						else
							el.rclass('animation').aclass(c + '-run');
					}
				}

				setTimeout(function() {
					if (!self.removed) {
						for (var i = 0; i < arr.length; i++) {
							var c = arr[i][0].$anim;
							arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
							delete arr[i][0].$anim;
						}
						config.exec && self.EXEC(config.exec, self.element);
					}
				}, 1500);

				return;
			}

			arr.wait(function(el, next, index) {

				var opt = el[0].$animopt;
				var delay = (opt.order || index) * (opt.delay || config.delay);
				var clsname = cls + '-' + (opt.style || config.style);

				if (maxdelay < delay)
					maxdelay = delay;

				if (el.hclass('hidden') || el.hclass('invisible')) {
					el.rclass('animation ' + clsname + '-init').aclass('animated');
					next();
					return;
				}

				el[0].$animtime = setTimeout(function(el) {
					if (!self.removed) {
						if (opt.noanimation)
							el.rclass('animation ' + clsname + '-init');
						else
							el.rclass('animation').aclass(clsname + '-run');
					}
				}, delay, el);

				next();

			}, function() {

				setTimeout(function() {
					for (var i = 0; i < arr.length; i++) {
						var c = arr[i][0].$anim;
						arr[i].rclass(c + '-init ' + c + '-run animating').aclass('animated');
						delete arr[i][0].$anim;
					}
					config.exec && self.EXEC(config.exec, self.element);
				}, maxdelay + 1000);
			});

		}, config.init / 10 >> 0, arr);
	};

	self.setter = function(value) {
		if (config.if) {
			if (value === config.if)
				setTimeout2(self.ID, self.animate, config.init);
			else
				self.restore();
		}
	};

});

COMPONENT('mobilecarousel', 'count:1;selector:.col-sm-4;margin:15;snapping:true;animate:5000', function(self, config, cls) {

	var cls2 = '.' + cls;
	var width = 0;
	var count = 0;
	var index = 0;
	var increment = 1;
	var skip = false;
	var move = false;
	var anim;
	var container;
	var old;

	self.readonly();
	self.blind();

	if (W.mobilecarouselindex)
		W.mobilecarouselindex++;
	else
		W.mobilecarouselindex = 1;

	self.make = function() {
		self.element.wrapInner('<div class="{0}-container"><div class="{0}-body"></div></div>'.format(cls));
		$(W).on('resize', self.resize);
		setTimeout(self.resize, 50);
		setTimeout(self.resize, 500);
		setTimeout(self.resize, 2000);
		CSS('.{3} .{3}-{0} {1}{margin:0 0 0 {2}px;padding:0;float:left;vertical-align:top;display:inline-block}.{3} .{3}-{0} {1}:first-child{margin-left:0}'.format(self.id, config.selector, config.margin, cls));
		container = self.find(cls2 + '-container').aclass(cls + '-' + self.id);
		config.snapping && container.on('scroll', function() {
			!skip && setTimeout2(self.id, self.snap, 200);
		}).on('touchmove', function() {
			clearTimeout(anim);
		});
		config.animate && (anim = setTimeout(self.animate, config.animate * (W.mobilecarouselindex + 0.1)));
	};

	self.animate = function() {

		if (!count || move)
			return;

		if (!document.hasFocus()) {
			anim = setTimeout(self.animate, config.animate);
			return;
		}

		index += increment;

		if (index === count - 1)
			increment = -1;
		else if (index === 0)
			increment = 1;

		skip = true;
		anim = true;

		container.animate({ scrollLeft: index * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
			anim = false;
		}, 400);

		anim = setTimeout(self.animate, config.animate);
	};

	self.snap = function() {
		var x = container.prop('scrollLeft');
		var off = Math.round(x / width);
		skip = true;
		move = true;
		container.stop().animate({ scrollLeft: off * (width + config.margin) }, 200);
		setTimeout(function() {
			skip = false;
		}, 500);
	};

	self.resize = function() {

		if (WIDTH() !== 'xs') {

			if (old === '1')
				return;

			old = '1';
			count = 0;
			width = 0;
			self.rclass(cls);
			self.css('height', '');
			self.find(cls2 + '-body').css('width', '');
			self.find(config.selector).css('width', '');
			return;
		}

		self.aclass(cls);

		self.width(function(w) {

			var sum = 0;
			var height = 0;

			width = w / config.count;
			count = 0;

			self.find(config.selector).each(function(index) {
				var el = $(this);
				sum += width + (index ? 15 : 0);
				height = Math.max(el.innerHeight(), height);
				el.css('width', width);
				count++;
			});

			var k = sum + 'x' + height;
			if (old === k)
				return;

			old = k;
			self.css('height', (height >> 0) + 15);
			self.find(cls2 + '-body').css('width', sum);
		});
	};
});

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

Thelpers.color = function(value) {
	var hash = HASH(value, true);
	var color = '#';
	for (var i = 0; i < 3; i++) {
		var value = (hash >> (i * 8)) & 0xFF;
		color += ('00' + value.toString(16)).substr(-2);
	}
	return color;
};

Thelpers.counter = function(value, decimals) {

	if (decimals == null)
		decimals = 0;

	if (value > 999999)
		return (value / 1000000).format(decimals) + ' M';
	if (value > 9999)
		return (value / 10000).format(decimals) + ' K';
	return value.format(decimals);
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
	var t = this;

	// this === bytes
	switch (type) {
		case 'bytes':
			value = t;
			break;
		case 'KB':
			value = t / 1024;
			break;
		case 'MB':
			value = filesizehelper(t, 2);
			break;
		case 'GB':
			value = filesizehelper(t, 3);
			break;
		case 'TB':
			value = filesizehelper(t, 4);
			break;
		default:

			type = 'bytes';
			value = t;

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