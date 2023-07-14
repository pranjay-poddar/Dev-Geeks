exports.sort = function(builder, item) {
	var length = builder.response.length;
	if (length <= builder.$take2) {
		length = builder.response.push(item);
		if (length >= builder.$take2) {
			builder.response.sort(builder.$sort);
			builder.$sorted = true;
		}
		return true;
	} else
		return chunkysort(builder, item);
};

exports.sortfinal = function(builder) {
	builder.response.sort(builder.$sort);
};

function chunkysort(builder, item) {

	var beg = 0;
	var length = builder.response.length;
	var tmp = length - 1;

	var sort = builder.$sort(item, builder.response[tmp]);
	if (sort !== -1)
		return;

	tmp = length / 2 >> 0;
	sort = builder.$sort(item, builder.response[tmp]);
	if (sort !== -1)
		beg = tmp + 1;

	for (var i = beg; i < length; i++) {
		var old = builder.response[i];
		var sort = builder.$sort(item, old);
		if (sort !== 1) {
			for (var j = length - 1; j > i; j--)
				builder.response[j] = builder.response[j - 1];
			builder.response[i] = item;
			return true;
		}
	}
}