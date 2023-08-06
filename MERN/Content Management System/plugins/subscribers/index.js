exports.icon = 'far fa-address-card';
exports.name = '@(Subscribers)';
exports.group = '@(Visitors)';
exports.position = 70;

exports.install = function() {
	ROUTE('GET     /admin/api/subscribers/                    *Subscribers --> @query');
	ROUTE('GET     /admin/api/subscribers/{id}/               *Subscribers --> @read');
	ROUTE('POST    /admin/api/subscribers/                    *Subscribers --> @save');
	ROUTE('DELETE  /admin/api/subscribers/                    *Subscribers --> @remove');
	ROUTE('GET     /admin/api/subscribers/download/           *Subscribers --> @download');
	ROUTE('GET     /admin/api/subscribers/stats/              *Subscribers --> @stats');
	ROUTE('GET     /admin/api/subscribers/toggle/             *Subscribers --> @toggle');
	ROUTE('POST    /api/subscribers/                          *Subscribers --> @save');
	ROUTE('GET     /api/unsubscribe/',                        unsubscribe, ['*Subscribers']);
};

function unsubscribe() {
	var self = this;
	self.$workflow('unsubscribe', () => self.plain(TRANSLATOR(self.language, '@(You have been successfully unsubscribed.\nThank you)')));
}