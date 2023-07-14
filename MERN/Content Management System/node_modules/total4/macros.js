// Supported:
// - condition: IF, ELSE, ELSE IF, FI
// - custom helpers: HELPERNAME(arg1, arg2)
// - user defined values: "1" (number), "TEXT" (text), "TRUE" (boolean), "FALSE" boolean, "YES" boolean, "NO" boolean
// - returning via return keyword
// - supports lower/upper case (but properties in the model/helpers must be in the lower case)
// - #temporary
/*
	IF something >= 10
		RETURN something * 10;
	FI
*/

const AsyncFunction = async function () {}.constructor;

function findkeywords(line, keywords, replace, allowedbeg, allowedend) {

	var white = [' ', '\t', ';'];

	for (var keyword of keywords) {

		var reg = new RegExp(keyword, 'gi');
		var match = line.match(reg);

		if (!match)
			continue;

		var index = 0;

		for (var m of match) {

			index = line.indexOf(m);

			if (index === -1)
				break;

			var beg = line.substring(index - 1, index);

			if (index === 0 || white.includes(beg) || (allowedbeg && allowedbeg.includes(beg))) {
				var length = index + m.length;
				var end = line.substring(length, length + 1);

				if (!end || white.includes(end) || (allowedend && allowedend.includes(end))) {
					var output = replace(m);
					line = line.substring(0, index) + output + line.substring(length);
				}
			}
		}
	}
	return line;
}

function prepareline(str, meta, isasync) {

	str = str.trim();

	if (str.substring(0, 2) === '//')
		return;

	// User defined values
	str = str.replace(/(".*?")|('.*?')/g, function(text) {

		var key = '@' + meta.indexer + '@';

		text = text.substring(1, text.length - 1);
		if ((/^[0-9.,]+$/).test(text)) {
			text = text.parseFloat();
		} else {
			var boolean = text.toLowerCase();
			if (boolean === 'true' || boolean === 'false')
				text = boolean === 'true';
			else
				text = '"' + text + '"';
		}

		meta.keywords[key] = text;
		meta.indexer++;
		return key;
	});

	if (str.indexOf(';') !== -1) {
		var lines = str.split(';');
		for (var m of lines)
			m = prepareline(m, meta, isasync);
		return lines.join('\n');
	}

	// Return
	str = findkeywords(str, ['return'], function(text) {
		var key = '@' + meta.indexer + '@';
		meta.keywords[key] = text.toLowerCase();
		meta.indexer++;
		return key;
	});

	// End condition
	str = findkeywords(str, ['fi'], function() {
		return '}';
	});

	// Boolean
	str = findkeywords(str, ['true', 'false', 'yes', 'no', 'ok'], function(text) {
		text = text.toLowerCase();
		return text === 'yes' || text === 'true' || text === 'ok';
	}, ['('], [')']);

	// AND OR
	str = findkeywords(str, ['and', 'or'], function(text) {
		return text.toLowerCase().replace(/and/g, '&&').replace(/or/g, '||');
	});

	// Conditions
	var lower = str.toLowerCase();
	var index = lower.indexOf('else');
	if (index !== -1) {
		var tmp = str.substring(index);
		var tmplower = tmp.toLowerCase();
		str = str.substring(0, index) + '}' + tmp + (tmplower.indexOf('else if') === -1 ? '{' : '');
	}

	if (lower.indexOf('if ') !== -1) {
		str = str.replace(/.=./g, function(text) {
			if (text[0] === '>' || text[0] === '<' || text[0] === '=' || (text[1] === '=' && text[2] === '='))
				return text;
			if (text[2] === '>' || text[2] === '<')
				return text[2] + text[1] + text[0];
			if (text[1] === '=')
				return text[0] + '=' + text[1] + text[2];
			return text;
		}) + '){';
	}

	// Conditions
	str = str.replace(/(\s)?(else|else\sif|if)(\s)?/ig, function(text) {
		var key = '@' + meta.indexer + '@';
		meta.keywords[key] = text.replace(/if(\s)/i, 'if(').replace(/else/i, 'else');
		meta.indexer++;
		return key;
	});

	// Conditions
	str = findkeywords(str, ['else', 'else if', 'if'], function(text) {
		text = text.toLowerCase();
		var key = '@' + meta.indexer + '@';
		meta.keywords[key] = text.replace(/if(\s)/i, 'if(').replace(/else/i, 'else');
		meta.indexer++;
		return key;
	});

	// Null
	str = findkeywords(str, ['null'], function(text) {
		var key = '@' + meta.indexer + '@';
		text = text.toLowerCase();
		meta.keywords[key] = text.replace(/null/i, 'null');
		meta.indexer++;
		return key;
	});

	// Helpers
	str = str.replace(/[a-z0-9_]+\((\))?/ig, function(text) {
		var key = '@' + meta.indexer + '@';
		var index = text.indexOf('(');
		meta.keywords[key] = (isasync ? 'await ' : '') + 'helpers.' + (text.substring(0, index) + '.call(model' + (text.substring(index) === '()' ? ')' : ',')).toLowerCase();
		meta.indexer++;
		return key;
	});

	// Temporary variables
	str = str.replace(/#[a-z0-9_.]+./ig, function(text) {

		var last = text[text.length - 1];
		if (last === '@')
			text = text.substring(0, text.length - 1);
		else
			last = '';

		var key = '@' + meta.indexer + '@';
		meta.keywords[key] = text.substring(1).toLowerCase().replace(/[a-z]/i, text => 'tmp.' + text);
		meta.indexer++;
		return key + last;
	});

	// Properties & fixed values
	str = str.replace(/.[a-z0-9_.]+./ig, function(text) {

		if ((/@[0-9]+@|true|false(\))?/).test(text))
			return text;

		if ((/^[0-9.]+$/i).test(text)) {
			return text;
		}

		text = text.toLowerCase().replace(/[a-z]/i, function(text) {
			return 'model.' + text;
		});

		return text;
	});

	if (str)
		meta.builder.push(str.replace(/(\s)?(=|>|<|\+|-)(\s)?/g, n => n.trim()) + ';');

}

exports.compile = function(str, nocompile, isasync) {

	var meta = {};
	meta.keywords = {};
	meta.indexer = 0;
	meta.builder = [];

	var lines = str.split('\n');

	for (var line of lines)
		prepareline(line, meta, isasync);

	var compiled = meta.builder.join('\n').replace(/@\d+@/gi, function(text) {
		return meta.keywords[text];
	});

	return nocompile ? compiled : new (isasync ? AsyncFunction : Function)('model', 'helpers', 'var tmp={};\n' + compiled);
};