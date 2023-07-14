var EVALUATOR = {};
var cache = {};

// Registers a new API type
exports.evaluate = function(type, callback) {

	if (typeof(type) === 'function') {
		callback = type;
		type = 'default';
	}

	if (type.indexOf(',') !== -1) {
		var arr = type.split(',').trim();
		for (var m of arr)
			exports.evaluate(m, callback);
		return;
	}

	// It can be "camel case"
	var lower = type.toLowerCase();
	cache[type] = lower;
	cache[lower] = lower;

	if (callback)
		EVALUATOR[lower] = callback;
	else
		delete EVALUATOR[lower];

};

function APICall() {
	var t = this;
	t.options = {};
}

const APICallProto = APICall.prototype;

APICallProto.output = function(type) {
	this.options.output = type;
	return this;
};

APICallProto.promise = function($) {
	var t = this;
	var promise = new Promise(function(resolve, reject) {
		t.$callback = function(err, response) {
			if (err) {
				if ($ && $.invalid) {
					$.invalid(err);
				} else {
					err.name = 'API(' + t.options.name + ' --> ' + t.options.schema + ')';
					reject(err);
				}
			} else
				resolve(response);
		};
	});

	return promise;
};

APICallProto.audit = function($, message, type) {
	var t = this;
	t.$audit = function() {
		// Dynamic arguments
		if (message)
			message = $.variables(message, t.options.data);
		$.audit(message, type);
	};
	return t;
};

APICallProto.done = function($, callback) {
	var t = this;
	t.$callback = function(err, response) {
		if (err)
			$.invalid(err);
		else
			callback && callback(response);
		t.free();
	};
	return t;
};

APICallProto.debug = function() {
	this.$debug = true;
	return this;
};

APICallProto.fail = function(cb) {
	this.$callback_fail = cb;
	return this;
};

APICallProto.data = function(cb) {
	this.$callback_data = cb;
	return this;
};

APICallProto.controller = function($) {
	this.options.controller = $.controller || $;
	return this;
};

APICallProto.error = APICallProto.err = function(err, reverse) {
	this.$error = err + '';
	this.$error_reverse = reverse;
	return this;
};

APICallProto.callback = function($) {
	var t = this;
	t.$callback = typeof($) === 'function' ? $ : $.callback;
	return t;
};

APICallProto.evaluate = function(err, response) {

	var t = this;
	if (!err && t.$error) {
		if (t.$error_reverse) {
			if (response)
				err = t.$error;
			else if (response instanceof Array && response.length)
				err = t.$error;
		} else if (!response)
			err = t.$error;
		else if (response instanceof Array && !response.length)
			err = t.$error;
	}

	if (err) {
		t.$callback_fail && t.$callback_fail(err);
	} else {
		if (t.$audit) {
			t.$audit();
			t.$audit = null;
		}
		t.$callback_data && t.$callback_data(response);
	}

	t.$debug && console.log('--DEBUG-- API: ' + t.options.name + ' --> ' + t.options.schema, '|', 'Error:', err, '|', 'Response:', response);
	t.$callback && t.$callback(err, response);
};

function execapi(api) {
	var conn = EVALUATOR[cache[api.options.name]] || EVALUATOR['*'];
	if (conn)
		conn.call(api, api.options, (err, response) => api.evaluate(err, response));
	else
		api.evaluate('API is not initialized');
}

// Makes a new instances of API call
exports.make = function(name, schema, data, $) {
	var api = new APICall();
	api.options.name = cache[name] || name;
	api.options.schema = schema;
	api.options.data = data;
	api.options.controller = $;
	setImmediate(execapi, api);
	return api;
};