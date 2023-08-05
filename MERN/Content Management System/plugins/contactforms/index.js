exports.icon = 'far fa-envelope-open';
exports.name = '@(Contact forms)';
exports.group = '@(Visitors)';
exports.position = 50;

exports.install = function() {
	ROUTE('GET     /admin/api/contactforms/                    *ContactForms --> @query');
	ROUTE('GET     /admin/api/contactforms/{id}/               *ContactForms --> @read');
	ROUTE('DELETE  /admin/api/contactforms/                    *ContactForms --> @remove');
	ROUTE('GET     /admin/api/contactforms/stats/              *ContactForms --> @stats');
	ROUTE('GET     /admin/api/contactforms/clear/              *ContactForms --> @clear');
	ROUTE('POST    /api/contact/                               *ContactForms --> @save');
};