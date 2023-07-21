exports.icon = 'fa fa-bullhorn';
exports.name = '@(Notices)';
exports.position = 60;
exports.group = '@(Content)';

exports.install = function() {
	ROUTE('GET     /admin/api/notices/                        *Notices --> @query');
	ROUTE('GET     /admin/api/notices/{id}/                   *Notices --> @read');
	ROUTE('POST    /admin/api/notices/                        *Notices --> @save');
	ROUTE('DELETE  /admin/api/notices/{id}/                   *Notices --> @remove');
	ROUTE('GET     /admin/api/notices/toggle/                 *Notices --> @toggle');
	ROUTE('POST    /admin/api/notices/preview/',              preview, ['json']);
};

function preview() {
	var self = this;
	var body = self.body.body;
	if (body) {
		$WORKFLOW('Notices', 'preview', body, (err, response) => self.content(response, 'text/html'));
	} else
		self.content('', 'text/html');
}
