exports.icon = 'far fa-clock-o';
exports.name = '@(Events)';
exports.group = '@(Common)';
exports.position = 20;

exports.install = function() {
	ROUTE('GET     /admin/api/events/                         *Events --> @query');
	ROUTE('GET     /admin/api/events/clear/                   *Events --> @clear');
};