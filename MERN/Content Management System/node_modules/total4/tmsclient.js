exports.create = function(url, token, callback) {

	if (typeof(token) === 'function') {
		callback = token;
		token = undefined;
	}

	return WEBSOCKETCLIENT(function(client) {

		var publishers = {};
		var subscribers = {};
		var callbacks = {};
		var isopen = false;
		var callbackid = 0;
		var timeout;

		if (token)
			client.headers['x-token'] = token;

		client.options.reconnectserver = true;
		client.connect(url.replace(/^http/, 'ws'));
		client.ready = false;

		client.on('destroy', function() {
			publishers = null;
			subscribers = null;

			for (var key in callbacks) {
				var item = callbacks[key];
				clearTimeout(item.timeout);
				item.callback && item.callback('TMS has been destroyed');
			}

			callbacks = null;

			timeout && clearTimeout(timeout);
			timeout = null;
		});

		client.on('close', function() {
			isopen = false;
			client.ready = false;
		});

		client.on('message', function(msg) {

			if (msg.type === 'call') {
				if (callbacks[msg.callbackid]) {
					var tmp = callbacks[msg.callbackid];
					tmp.callback(msg.error ? ErrorBuilder.assign(msg.data) : null, msg.success ? msg.data : null);
					tmp.timeout && clearTimeout(tmp.timeout);
					delete callbacks[msg.callbackid];
				}
			} else if (msg.type === 'publish' && subscribers[msg.id] && publishers[msg.id]) {
				var err = new ErrorBuilder();
				var data = framework_jsonschema.transform(publishers[msg.id], err, msg.data, true);
				if (data) {
					for (var fn of subscribers[msg.id])
						fn(data);
				}
			} else if (msg.type === 'meta') {
				publishers = {};
				for (var item of msg.publish)
					publishers[item.id] = item.schema;
				sync_subscribers();
				isopen = true;
				client.ready = true;
				client.meta = msg;
				if (callback) {
					setImmediate(callback, null, client, client.meta);
					callback = null;
				}
				client.emit('meta', msg);
				client.emit('ready');
			}
		});

		var timeouthandler = function(id) {
			var obj = callbacks[id];
			obj.callback && obj.callback('408: Timeout');
			delete callbacks[id];
		};

		client.call = function(name, data, callback, timeout) {
			if (callback)
				client._call(name, data, callback, timeout);
			else
				return new Promise((resolve, reject) => client._call(name, data, (err, res) => err ? reject(err) : resolve(res), timeout));
		};

		client._call = function(name, data, callback, timeout) {
			if (isopen) {
				var key = (callbackid++) + '';
				var obj = {};
				obj.callback = callback;
				obj.timeout = setTimeout(timeouthandler, timeout || 10000, key);
				callbacks[key] = obj;
				client.send({ type: 'call', id: name, data: data, callbackid: key });
			} else
				callback('TMS is offline');
		};

		client.subscribe = function(name, callback) {
			timeout && clearTimeout(timeout);
			timeout = setTimeout(sync_subscribers, 50, true);
			if (subscribers[name])
				subscribers[name].push(callback);
			else
				subscribers[name] = [callback];
		};

		client.publish = function(name, data) {
			isopen && client.send({ type: 'subscribe', id: name, data: data });
		};

		var sync_subscribers = function(force) {
			timeout && clearTimeout(timeout);
			timeout = null;
			var keys = Object.keys(subscribers);
			if (force || keys.length)
				client.send({ type: 'subscribers', subscribers: keys });
		};

	});

};