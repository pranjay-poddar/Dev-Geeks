const Fs = require('fs');

NEWSCHEMA('Common', function(schema) {

	// Reads backuped items
	schema.addWorkflow('backup', function($) {
		var req = $.controller.req;
		var name = req.split[req.split.length - 3];

		NOSQL(name).backups().where('id', $.id).fields('id,user,stamp,date').take(20).callback(function(err, response) {

			if (name === 'widgets') {
				$.callback(response);
				return;
			}

			response.wait(function(item, next) {
				FUNC.read(name, item.id + '_' + item.stamp, function(err, body) {
					item.body = body;
					next();
				});
			}, () => $.callback(response));
		});
	});

	schema.addWorkflow('backup_clear', function($) {

		var clean = function(name) {
			return function(next) {
				TABLE(name).remove().search('id', '_').callback(function() {
					TABLE(name).clean();
					next();
				});
			};
		};

		var remove = function(name) {
			return function(next) {
				Fs.unlink(PATH.databases(name + '.nosql.bk'), next);
			};
		};

		var arr = [];
		arr.push(clean('pagesdata'));
		arr.push(clean('postsdata'));
		arr.push(clean('partsdata'));
		arr.push(clean('newslettersdata'));
		arr.push(remove('notices'));
		arr.push(remove('pages'));
		arr.push(remove('posts'));
		arr.push(remove('widgets'));
		arr.push(remove('newsletters'));
		arr.async();

		$.success();
	});

	schema.addWorkflow('backup_read', function($) {
		FUNC.read($.params.type, $.params.id, $.callback);
	});

});