exports.icon = 'far fa-envelope-o';
exports.name = '@(Newsletters)';
exports.group = '@(Visitors)';
exports.position = 60;

exports.install = function() {

	ROUTE('GET     /admin/api/newsletters/                    *Newsletters --> @query');
	ROUTE('GET     /admin/api/newsletters/{id}/               *Newsletters --> @read');
	ROUTE('POST    /admin/api/newsletters/                    *Newsletters --> @save');
	ROUTE('DELETE  /admin/api/newsletters/                    *Newsletters --> @remove');
	ROUTE('POST    /admin/api/newsletters/test/               *Newsletters --> @test');
	ROUTE('GET     /admin/api/newsletters/toggle/             *Newsletters --> @toggle');
	ROUTE('GET     /admin/api/newsletters/stats/              *Newsletters --> @stats');
	ROUTE('GET     /admin/api/newsletters/{id}/stats/         *Newsletters --> @stats');
	ROUTE('GET     /admin/api/newsletters/{id}/backups/       *Common      --> @backup');
	ROUTE('GET     /admin/api/newsletters/state/',            state);

	FILE('/newsletter.gif', stats);
};

function state() {
	this.json(MAIN.newsletter);
}

function stats_tms(req, item) {
	PUBLISH('newsletters_view', { id: req.query.id || '', ip: req.ip, ua: req.ua, name: item.name, dtcreated: NOW });
}

function stats(req, res) {

	var id = req.query.id;

	COUNTER('newsletters').hit('all');

	res.binary('R0lGODdhAQABAIAAAAAAAAAAACH5BAEAAAEALAAAAAABAAEAAAICTAEAOw==', 'image/gif', 'base64');

	if (id) {

		COUNTER('newsletters').hit(id);

		var key = 'newsletter_' + id;
		if (TEMP[key]) {
			stats_tms(req, TEMP[key]);
			return;
		}

		if (TEMP[key] === null)
			return;

		NOSQL('newsletter').one('newsletters').fields('name').id(id).callback(function(err, item) {
			if (item) {
				TEMP[key] = item;
				stats_tms(req, item);
			} else
				TEMP[key] = null;
		});
	}


}