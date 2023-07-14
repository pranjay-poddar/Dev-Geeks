// This file creates a simple helper for storing content from Pages, Posts and Newsletters
// Reduces size of main DB for listing (for Pages, Posts, Newsletters) and increases the performance

const ReadCache = {};

// DECLARATION
CONF.table_pagesdata = 'id:string|body:string|dtcreated:date';
CONF.table_partsdata = 'id:string|body:string|dtcreated:date';
CONF.table_postsdata = 'id:string|body:string|dtcreated:date';
CONF.table_newslettersdata = 'id:string|body:string|dtcreated:date';

TABLE('pagesdata').memory(1);
TABLE('partsdata').memory(1);
TABLE('postsdata').memory(1);
TABLE('newslettersdata').memory(1);

// Pages, Posts, Parts and Newsletter us .write() and .read() functions
FUNC.write = function(type, id, content, callback, exists) {

	if (typeof(callback) === 'boolean') {
		exists = callback;
		callback = null;
	}

	var db = TABLE(type + 'data');
	if (exists) {
		db.modify({ body: content }, true).id(id).insert(function(doc) {
			doc.id = id;
			doc.dtcreated = NOW;
		}).callback(callback);
	} else
		db.insert({ id: id, body: content, dtcreated: NOW }).callback(callback);
};

FUNC.read = function(type, id, callback) {

	var key = 'FUNCread_' + type + '_' + id;
	var tmp = ReadCache[key];
	if (tmp) {
		if (tmp.loaded) {
			tmp.pending--;

			if (tmp.pending <= 0)
				delete ReadCache[key];

			callback(null, tmp.body);
		} else {
			tmp.pending++;
			setTimeout(FUNC.read, 500, type, id, callback);
		}
		return;
	}

	tmp = ReadCache[key] = { loaded: 0, pending: 0 };

	TABLE(type + 'data').read().id(id).fields('body').callback(function(err, doc) {
		tmp.loaded = 1;
		tmp.body = doc ? doc.body : '';
		callback(null, tmp.body);
	});
};

FUNC.remove = function(type, id) {
	// if id == null there is need to clear all content
	var builder = TABLE(type + 'data').remove();
	id && builder.search('id', id);
};

ON('service', function() {

	for (var key in ReadCache) {
		var tmp = ReadCache[key];
		if (tmp.loaded && tmp.pending <= 0)
			delete ReadCache[key];
	}

});