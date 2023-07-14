require('./index');

// Total.js Module: NoSQL embedded

const REG_NULLABLE = /\./g;
const REG_LANGUAGE = /[a-z0-9]+§/gi;
const CANSTATS = global.F ? (global.F.stats && global.F.stats.performance && global.F.stats.performance.dbrm != null) : false;
const LOGGER = '-- NoSQL -->';
const FILTER = { find: 1, read: 1, count: 1, scalar: 1, check: 1, list: 1, update: 1, remove: 1, query: 1 };
const Open = {};

function db_where(where, opt, filter, operator, args) {

	var tmp;

	for (var item of filter) {

		if (item.comparer) {
			switch (item.comparer) {
				case '=':
					item.comparer = '==';
					break;
				case '<>':
					item.comparer = '!=';
					break;
			}
		}

		if (opt.language != null && item.name && item.name[item.name.length - 1] === '§')
			item.name = item.name.substring(0, item.name.length - 1) + opt.language;

		switch (item.type) {
			case 'or':
				tmp = [];
				db_where(tmp, opt, item.value, '||', args);
				where.length && where.push(operator);
				where.push('(' + tmp.join(' ') + ')');
				break;
			case 'in':
			case 'notin':
				where.length && where.push(operator);
				where.push((item.type === 'notin' ? '!' : '') + 'func.in(doc.' + item.name.replace(REG_NULLABLE, '?.') + ',arg.params[' + args(item.value) + '])');
				break;
			case 'query':
				where.length && where.push(operator);
				where.push('(' + item.value + ')');
				break;
			case 'where':
				where.length && where.push(operator);
				where.push('doc.' + item.name.replace(REG_NULLABLE, '?.') + item.comparer + 'arg.params[' + args(item.value) + ']');
				break;
			case 'contains':
				where.length && where.push(operator);
				where.push('(doc.{0} instanceof Array?!!doc.{0}.length:!!doc.{0})'.format(item.name.replace(REG_NULLABLE, '?.')));
				break;
			case 'search':
				var paramindex = args(item.value.replace(/%/g, ''));
				where.length && where.push(operator);
				where.push('func.search(doc.' + item.name.replace(REG_NULLABLE, '?.') + ',arg.params[' + paramindex + ']' + (item.comparer == 'beg' ? ',1' : item.comparer == 'end' ? ',2' : '') + ')');
				break;
			case 'month':
			case 'year':
			case 'day':
			case 'hour':
			case 'minute':
				where.length && where.push(operator);
				where.push(compare_datetype(item.type, item.name, args(item.value), item.comparer));
				break;
			case 'empty':
				where.length && where.push(operator);
				where.push('(doc.{0} instanceof Array?!doc.{0}.length:!doc.{0})'.format(item.name.replace(REG_NULLABLE, '?.')));
				break;
			case 'between':
				var ia = args(item.a);
				var ib = args(item.b);
				where.length && where.push(operator);
				where.push('(doc.' + item.name.replace(REG_NULLABLE, '?.') + '>=arg.params[' + ia + ']&&doc.' + item.name + '<=arg.params[' + ib + '])');
				break;
		}
	}
}

function db_insertupdate(filter, insert) {

	var query = insert ? null : [];
	var params = {};

	for (var key in filter.payload) {
		var val = filter.payload[key];
		var c = key[0];

		switch (c) {
			case '-':
			case '+':
			case '*':
			case '/':
				key = key.substring(1);
				params[key] = val ? val : 0;
				if (!insert)
					query.push('doc.{0}=(doc.{0}==null?0:doc.{0})+arg.{0}'.format(key));
				break;
			case '>':
			case '<':
				key = key.substring(1);
				params[key] = val ? val : 0;
				if (!insert)
					query.push('doc.{0}=(doc.{0}==null?arg.{0}:doc.{0}' + (c === '>' ? '<' : '>') + 'arg.{0}?arg.{0}:doc.{0})'.format(key));
				break;
			case '!':
				// toggle
				key = key.substring(1);
				if (insert)
					params[key] = true;
				else
					query.push('doc.{0}=!doc.{0}'.format(key));
				break;
			case '=':
			case '#':
				// raw
				key = key.substring(1);
				if (insert)
					params[key] = val;
				else
					query.push('doc.' + key + '=' + val);
				break;
			default:
				params[key] = val;
				if (!insert)
					query.push('doc.{0}=arg.{0}'.format(key));
				break;
		}
	}

	return { query, params };
}

function makefilter(db, opt, callback) {

	var where = [];
	var model = {};
	var isread = false;
	var args = [];
	var exec = opt.exec;

	db_where(where, opt, opt.filter, '&&', val => args.push(val) - 1);

	var builder = {};
	var insert = exec === 'insert';

	if (insert || exec === 'update') {
		var iu = db_insertupdate(opt, insert);
		if (iu) {
			if (insert) {
				builder.payload = iu.params;
			} else {
				builder.modify = iu.query ? iu.query.join(';') : null;
				builder.modifyarg = iu.params;
			}
		}
	}

	if (FILTER[exec]) {
		builder.filter = where.join('') || 'true';
		builder.filterarg = { params: args };
		builder.take = opt.take;
		builder.skip = opt.skip;
		builder.first = opt.first;
		if (opt.sort && opt.sort.length) {
			builder.sort = opt.sort.join(',');
			if (opt.language != null)
				builder.sort = builder.sort.replace(REG_LANGUAGE, val => (val.substring(0, val.length - 1) + opt.language));
		}
	}

	if (opt.fields) {
		builder.fields = opt.fields.join(',');
		if (opt.language != null && builder.fields) {
			builder.fields = builder.fields.replace(REG_LANGUAGE, function(val) {
				val = val.substring(0, val.length - 1);
				return val + (opt.language ? (opt.language + ' as ' + val) : '');
			});
		}
	}

	switch (exec) {
		case 'find':
			isread = true;
			db.find().assign(builder).$callback = callback;
			break;
		case 'count':
			isread = true;
			builder.scalar = 'arg.count+=1';
			builder.scalararg = { count: 0 };
			db.find().assign(builder).$callback = callback;
			break;
		case 'check':
			builder.first = true;
			isread = true;
			db.find().assign(builder).$callback = (err, response) => callback(err, !!response);
			break;
		case 'list':
			db.find().assign(builder).$callback = (err, response, meta) => callback(err, err ? null : { items: response, count: meta.count });
			isread = true;
			break;
		case 'read':
			db.find2().assign(builder).$callback = callback;
			isread = true;
			break;
		case 'insert':
			db.insert().assign(builder).$callback = callback;
			break;
		case 'update':
			db.update().assign(builder).$callback = callback;
			break;
		case 'remove':
			db.remove().assign(builder).$callback = callback;
			break;
		case 'truncate':
			db.clear(callback);
			break;
		case 'drop':
			db.drop(callback);
			delete Open[db.$qbkey];
			break;
		case 'scalar':
			switch (opt.scalar.type) {
				case 'avg':
				case 'min':
				case 'sum':
				case 'max':
				case 'count':
					if (opt.scalar.key2) {
						builder.scalar = 'var k=doc.' + opt.scalar.key + '+\'\';if (arg[k]){tmp.bk=doc.' + opt.scalar.key2 + '||0;' + (opt.scalar.type === 'max' ? 'if(tmp.bk>arg[k])arg[k]=tmp.bk' : opt.scalar.type === 'min' ? 'if(tmp.bk<arg[k])arg[k]=tmp.bk' : 'arg[k]+=tmp.bk') + '}else{arg[k]=doc.' + opt.scalar.key2 + '||0}';
					} else {
						builder.scalar = 'if (doc.{0}!=null){tmp.val=doc.{0};arg.count+=1;arg.min=arg.min==null?tmp.val:arg.min>tmp.val?tmp.val:arg.min;arg.max=arg.max==null?tmp.val:arg.max<tmp.val?tmp.val:arg.max;if(!(tmp.val instanceof Date))arg.sum+=tmp.val}'.format(opt.scalar.key);
						builder.scalararg = { count: 0, sum: 0 };
					}
					db.find().assign(builder).$callback = function(err, response) {
						var output = {};
						if (response)
							output.value = opt.scalar.type === 'avg' ? ((response.min + response.max) / 2) : response[opt.scalar.type];
						callback(err, output);
					};
					break;
				case 'group':
					builder.scalar = opt.scalar.key2 ? 'if (doc.{0}!=null){tmp.val=doc.{0};arg[tmp.val]=(arg[tmp.val]||0)+(doc.{1}||0)}'.format(opt.scalar.key, opt.scalar.key2) : 'if (doc.{0}!=null){tmp.val=doc.{0};arg[tmp.val]=(arg[tmp.val]||0)+1}'.format(opt.scalar.key);
					builder.scalararg = {};
					db.find().assign(builder).$callback = function(err, response) {
						var output = [];
						for (var key in response) {
							var val = response[key];
							var mod = {};
							mod[opt.scalar.key] = key;
							mod.value = val;
							output.push(mod);
						}
						callback(err, output);
					};
					break;
			}
			isread = true;
			break;
	}

	if (opt.debug)
		console.log(LOGGER, db.filename, exec, builder);

	if (CANSTATS) {
		if (isread)
			F.stats.performance.dbrm++;
		else
			F.stats.performance.dbwm++;
	}

	return model;
}

function compare_datetype(type, key, paramindex, operator) {
	switch (operator) {
		case '=':
			operator = '==';
			break;
		case '<>':
			operator = '!=';
			break;
	}
	switch (type) {
		case 'day':
			type = 'getDate()';
			break;
		case 'month':
			type = 'getMonth()+1';
			break;
		case 'year':
			type = 'getFullYear()';
			break;
		case 'hour':
			type = 'getHour()';
			break;
		case 'minute':
			type = 'getMinute()';
			break;
	}
	return 'doc.{0}&&doc.{0}.getTime?doc.{0}.{3}{2}arg.params[{1}]:false'.format(key.replace(REG_NULLABLE, '?.'), paramindex, operator, type);
}

NEWDB('nosql', function($, next) {

	var type = 'nosql';
	var key = type + '_' + $.table;

	if (!Open[key]) {
		var filename = $.table[0] === '~' ? $.table.substring(1) : PATH.databases($.table + '.' + type);
		Open[key] = require('./textdb').JsonDB(filename, false);
		Open[key].$qbkey = key;
	}

	makefilter(Open[key], $, next);
});

NEWDB('inmemory', function($, next) {

	var type = 'inmemory';
	var key = type + '_' + $.table;

	if (!Open[key]) {
		var filename = $.table[0] === '~' ? $.table.substring(1) : PATH.databases($.table + '.' + type);
		Open[key] = require('./inmemory').load(filename);
		Open[key].$qbkey = key;
	}

	makefilter(Open[key], $, next);
});