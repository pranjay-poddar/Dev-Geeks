// Cron utility
// The MIT License
// Copyright 2023 (c) Peter Širka <petersirka@gmail.com>

const Days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

// The method compares date with parsed cron data
function cronexec(output, date) {

	var m = date.getMinutes();
	var h = date.getHours();
	var d = date.getDate();
	var M = date.getMonth() + 1;
	var day = date.getDay();
	var is = true;
	var values = [m, h, d, M, day];

	for (var i = 0; i < output.length; i++) {

		var val = values[i];
		var m = output[i];

		if (m.type === 'equal') {
			if (m.value !== val) {
				is = false;
				break;
			}
		} else if (m.type === 'every') {
			if (m.value % val !== 0) {
				is = false;
				break;
			}
		} else if (m.type === 'in') {
			if (!m.value.includes(val)) {
				is = false;
				break;
			}
		} else if (m.type === 'between') {
			if (val < m.value[0] || val > m.value[1]) {
				is = false;
				break;
			}
		}
	}

	return is;
}

// A parser that returns "function(date)" that returns {Boolean}
exports.make = function(line) {

	// */15 = every 15
	// 1-2  = BETWEEN
	// 1,2  = IN

	var arr = line.toLowerCase().replace(/[a-z]+/g, text => Days.indexOf(text.substring(0, 2))).split(/\s|\t/).trim();
	var output = [];

	for (var m of arr) {

		var obj = {};
		var tmp = null;

		if (m === '*') {
			obj.type = '*';
		} else if (m.indexOf('/') !== -1) {
			tmp = m.split('/');
			obj.type = 'every';
			for (let i = 0; i < tmp.length; i++) {
				if (tmp[i] !== '*')
					tmp[i] = +tmp[i];
			}
			obj.value = tmp;
		} else if (m.indexOf(',') !== -1) {
			tmp = m.split(',');
			obj.type = 'in';
			for (let i = 0; i < tmp.length; i++)
				tmp[i] = +tmp[i];
			obj.value = tmp;
		} else if (m.indexOf('-') !== -1) {
			tmp = m.split('-');
			obj.type = 'between';
			for (let i = 0; i < tmp.length; i++)
				tmp[i] = +tmp[i];
			obj.value = tmp;
		} else {
			obj.type = 'equal';
			obj.value = +m;
		}

		output.push(obj);
	}

	return function(date) {
		return cronexec(output, date);
	};
};