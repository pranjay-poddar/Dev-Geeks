exports.icon = 'fa fa-cog';
exports.name = '@(Settings)';
exports.position = 150;

exports.install = function() {
	ROUTE('GET     /admin/api/settings/    *Settings           --> @read');
	ROUTE('POST    /admin/api/settings/    *Settings           --> @smtp @save (response) @load');
	ROUTE('GET     /admin/api/profile/     *Profile            --> @read');
	ROUTE('POST    /admin/api/profile/     *Profile            --> @update');
	ROUTE('POST    /admin/api/totalapi/    *Settings/TotalAPI  --> @exec');
};