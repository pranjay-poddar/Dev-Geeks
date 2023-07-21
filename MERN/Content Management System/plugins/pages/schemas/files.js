const Fs = require('fs');

NEWSCHEMA('Files', function(schema) {

	schema.setQuery(function($) {
		FILESTORAGE('files').browse($.callback).where('removed', '<>', true);
	});

	schema.addWorkflow('clear', function($) {

		var databases = [PATH.databases('posts.nosql'), PATH.databases('notices.nosql'), PATH.databases('pages.nosql'), PATH.databases('widgets.nosql'), PATH.databases('navigations.nosql'), PATH.databases('newsletters.nosql'), PATH.databases('pagesdata.table'), PATH.databases('postsdata.table'), PATH.databases('newslettersdata.table'), PATH.databases('partsdata.table'), PATH.databases('templates.nosql')];
		var remove = [];
		var storage = FILESTORAGE('files');
		var db = {};
		var count = 0;

		EMIT('files.clear', databases);

		// This can be a longer operation, therefore respond
		$.success();

		var reg = /(\/|\\)+[a-z0-9]+(_draft)?\.html$/;
		var async = [];
		var filter = (path) => reg.test(path);

		async.push(function(next) {
			U.ls(PATH.databases('pages'), function(files) {
				files.length && databases.push.apply(databases, files);
				next();
			}, filter);
		});

		async.push(function(next) {
			U.ls(PATH.databases('posts'), function(files) {
				files.length && databases.push.apply(databases, files);
				next();
			}, filter);
		});

		async.push(function(next) {
			U.ls(PATH.databases('newsletters'), function(files) {
				files.length && databases.push.apply(databases, files);
				next();
			}, filter);
		});

		async.async(function() {

			storage.browse(function(err, files) {

				for (var i = 0; i < files.length; i++) {
					files[i].is = false;
					files[i].buffer = Buffer.from(files[i].id);
				}

				files.limit(50, function(files, next) {
					databases.wait(function(filename, resume) {

						var is = true;

						for (var i = 0; i < files.length; i++) {
							if (!files[i].is) {
								is = false;
								break;
							}
						}

						if (is)
							return resume();

						var tmp = [];

						if (db[filename] == null) {
							try {
								Fs.statSync(filename);
								db[filename] = true;
							} catch (e) {
								// Not found
								db[filename] = false;
								resume();
								return;
							}
						} else if (db[filename] === false) {
							resume();
							return;
						}

						CLEANUP(Fs.createReadStream(filename).on('data', function(chunk) {

							var is = true;

							for (var i = 0; i < files.length; i++) {
								if (!files[i].is) {
									is = false;
									break;
								}
							}

							if (is) {
								this.destroy();
								resume();
								return;
							}

							tmp.push(chunk);
							tmp.length > 2 && tmp.shift();

							if (tmp.length) {
								var buf = Buffer.concat(tmp, tmp[0].length + (tmp[1] ? tmp[1].length : 0));
								for (var i = 0; i < files.length; i++) {
									var file = files[i];
									if (buf.indexOf(file.buffer) !== -1)
										file.is = true;
								}
							}

						}), resume);

					}, function() {

						for (var i = 0; i < files.length; i++) {
							var file = files[i];
							if (!file.is) {
								remove.push(file);
								count++;
							}
						}

						next();
					});

				}, function() {
					remove.wait((item, next) => storage.remove(item.id, next), () => FUNC.notify({ type: 'files/clear', message: count + '' }));
				});
			}).fields('id');
		});
	});

});