NEWSCHEMA('Parts/Data', function(schema) {

	// Id generated on client-side
	schema.define('id', 'String(20)');

	// List of dynamic widgets in this part
	schema.define('widgets', '[Object]');

	// Data
	schema.define('name', 'String(50)', true);
	schema.define('body', 'String', true);

	// Widget container category
	schema.define('category', 'Capitalize');

});

NEWSCHEMA('Parts', function(schema) {

	// Owner
	schema.define('ownerid', 'UID');

	// page, post
	schema.define('type', 'Lower');

	// List of dynamic widgets in this part
	schema.define('items', '[Parts/Data]');

	schema.setSave(function($) {
		var model = $.model;
		model.dtupdated = NOW;
		NOSQL('parts').remove().where('ownerid', model.ownerid).callback(function() {
			for (var i = 0; i < model.items.length; i++) {
				var item = model.items[i];
				item.ownerid = model.ownerid;
				item.type = model.type;
				FUNC.write('parts', item.id, U.minify_html(item.body), true);
				item.body = undefined;
				NOSQL('parts').update(item, true).id(item.id);
			}
			$.success();
		});
	});

	schema.addWorkflow('render', function($) {
		NOSQL('parts').find().id($.options.id).first().callback(function(err, response) {
			if (response) {
				FUNC.read('parts', response.id, function(err, body) {
					response.body = body;
					response.body.CMSrender(response.widgets, $.callback, $.controller);
				});
			} else
				$.callback('');
		});
	});

});