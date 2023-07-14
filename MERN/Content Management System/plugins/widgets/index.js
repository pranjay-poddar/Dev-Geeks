exports.icon = 'fa fa-plug';
exports.name = '@(Widgets)';
exports.group = '@(Content)';
exports.position = 80;

exports.install = function() {

	// Widgets
	ROUTE('GET     /admin/api/widgets/                        *Widgets --> @query');
	ROUTE('GET     /admin/api/widgets/{id}/                   *Widgets --> @read');
	ROUTE('POST    /admin/api/widgets/                        *Widgets --> @save');
	ROUTE('DELETE  /admin/api/widgets/{id}/                   *Widgets --> @remove');
	ROUTE('GET     /admin/api/widgets/{id}/editor/            *Widgets --> @editor');
	ROUTE('GET     /admin/api/widgets/dependencies/           *Widgets --> @dependencies');
	ROUTE('GET     /admin/api/widgets/{id}/settings/          *Widgets', settings);
	ROUTE('GET     /admin/api/widgets/{id}/backups/           *Common --> @backup');

	// Widget globals
	ROUTE('GET     /admin/api/widgets/globals/                *Widgets/Globals --> @read');
	ROUTE('POST    /admin/api/widgets/globals/                *Widgets/Globals --> @save', 30);
};

function settings(id) {
	var self = this;
	var item = MAIN.widgets[id];
	self.json(item ? item.editor : null);
}