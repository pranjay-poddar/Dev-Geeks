global.TEMPLATE = function(body, model, $) {
	return new Promise(function(resolve, reject) {

		var cache = TEMP;
		var id = 'Ttemplate' + HASH(body);
		var data = cache[id];

		if (data) {
			try {
				resolve(data.template({ value: model || data.model }, null, data.helpers));
			} catch (e) {
				if ($ && $.invalid)
					$.invalid(e);
				else
					reject(e);
			}
			return;
		}

		if (body.indexOf('{{') === -1) {

			// URL address or filename
			data = cache[id];

			var start = body.substring(0, 7);
			// http://
			// https:/

			if (start === 'http://' || start === 'https:/') {
				// download template
				var opt = {};
				opt.url = body;
				opt.method = 'GET';
				opt.$ = function(err, response) {

					if (err) {
						if ($ && $.invalid)
							$.invalid(err);
						else
							reject(err);
						return;
					}

					data = parse(response.body);
					cache[id] = data;

					try {
						resolve(data.template({ value: model || data.model }, null, data.helpers));
					} catch (e) {
						if ($ && $.invalid)
							$.invalid(e);
						else
							reject(e);
					}
				};
				REQUEST(opt);
				return;
			} else {

				if (body[0] === '~') {
					body = body.substring(1);
				} else {
					body = PATH.templates(body);
					if (body.indexOf('.html') === -1)
						body += '.html';
				}

				F.Fs.readFile(body, function(err, response) {

					if (err) {
						if ($ && $.invalid)
							$.invalid(err);
						else
							reject(err);
						return;
					}

					data = parse(response.toString('utf8'));

					if (!DEBUG)
						cache[id] = data;

					try {
						resolve(data.template({ value: model || data.model }, null, data.helpers));
					} catch (e) {
						if ($ && $.invalid)
							$.invalid(e);
						else
							reject(e);
					}

				});
				return;
			}
		}

		data = cache[id] = parse(body);

		try {
			resolve(data.template({ value: model || data.model }, null, data.helpers));
		} catch (e) {
			if ($ && $.invalid)
				$.invalid(e);
			else
				reject(e);
		}
	});
};

function parse(body) {

	var helpers = {};
	var model = EMPTYOBJECT;
	var strhelpers = '';
	var beg = body.indexOf('<scr' + 'ipt>');
	var end;

	// helpers
	if (beg !== -1) {
		end = body.indexOf('</scr' + 'ipt>', beg + 8);
		strhelpers = body.substring(beg + 8, end).trim();
		body = body.substring(0, beg) + body.substring(end + 9);
	}

	// model
	beg = body.indexOf('<scr' + 'ipt type="text/json">');
	if (beg !== -1) {
		end = body.indexOf('</scr' + 'ipt>', beg + 8);
		model = body.substring(beg + 25, end).trim().parseJSON(true);
		body = body.substring(0, beg) + body.substring(end + 9);
	}

	if (strhelpers)
		new Function('Thelpers', strhelpers)(helpers);

	var output = {};
	output.helpers = helpers;
	output.template = Tangular.compile(body);
	output.model = model;
	return output;
}