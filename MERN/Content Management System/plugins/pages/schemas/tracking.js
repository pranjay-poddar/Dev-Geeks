NEWSCHEMA('Tracking', function(schema) {

	schema.define('id', 'String(10)', true);
	schema.define('name', 'String(50)', true);

	schema.addWorkflow('exec', function($) {
		PREF.tracking && PREF.tracking[$.id] && COUNTER('tracking').hit($.id);
		$.success();
	});

	schema.setSave(function($) {
		var obj = PREF.tracking || {};
		obj[$.model.id] = $.model.name;
		PREF.set('tracking', obj);
		$.success();
	});

	schema.setQuery(function($) {
		var obj = PREF.tracking;
		var output = [];

		if (obj) {
			var arr = Object.keys(obj);
			for (var i = 0, length = arr.length; i < length; i++)
				output.push({ id: arr[i], name: obj[arr[i]] });
		}

		$.callback(output);
	});

	schema.setRemove(function($) {
		var obj = PREF.tracking;
		if (obj) {
			delete obj[$.id];
			PREF.set('tracking', obj);
			COUNTER('tracking').remove($.id);
		}
		$.success();
	});

	schema.addWorkflow('stats', function($) {
		COUNTER('tracking').summarize('monthly', function(err, response) {
			var tracking = PREF.tracking || EMPTYARRAY;
			if (tracking) {
				for (var i = 0; i < response.length; i++) {
					var item = response[i];
					item.id = tracking[item.id];
				}
			}
			$.callback(err, response);
		});
	});

});
