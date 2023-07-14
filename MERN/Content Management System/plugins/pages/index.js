exports.icon = 'far fa-file-text-o';
exports.name = '@(Pages)';
exports.position = 30;
exports.group = '@(Content)';

exports.install = function() {
	// Pages
	ROUTE('GET     /admin/api/pages/                          *Pages --> @query');
	ROUTE('GET     /admin/api/pages/{id}/                     *Pages --> @read');
	ROUTE('POST    /admin/api/pages/                          *Pages --> @url @save (response)');
	ROUTE('DELETE  /admin/api/pages/                          *Pages --> @remove');
	ROUTE('GET     /admin/api/pages/stats/                    *Pages --> @stats');
	ROUTE('GET     /admin/api/pages/{id}/stats/               *Pages --> @stats');
	ROUTE('GET     /admin/api/pages/{id}/backups/             *Common --> @backup');
	ROUTE('POST    /admin/api/pages/preview/',                preview, ['json'], 512);
	ROUTE('POST    /admin/preview/'           ,               preview2, 512);
	ROUTE('GET     /admin/api/pages/dependencies/',           dependencies);
	ROUTE('POST    /admin/api/pages/css/',                    css, ['json'], 512);

	// Page globals
	ROUTE('GET     /admin/api/pages/globals/                  *Pages/Globals --> @read');
	ROUTE('POST    /admin/api/pages/globals/                  *Pages/Globals --> @save', 30);
	ROUTE('GET     /admin/api/pages/redirects/                *Pages/Redirects --> @read');
	ROUTE('POST    /admin/api/pages/redirects/                *Pages/Redirects --> @save', 30);

	ROUTE('GET     /admin/api/templates/{id}                  *Templates --> @read');
	ROUTE('DELETE  /admin/api/templates/{id}                  *Templates --> @remove');
	ROUTE('POST    /admin/api/templates/                      *Templates --> @save', 30);

	// Navigations
	ROUTE('GET     /admin/api/nav/{id}/                       *Navigations --> @read');
	ROUTE('POST    /admin/api/nav/                            *Navigations --> @save');

	// Redirects
	ROUTE('GET     /admin/api/redirects/{id}/                 *Redirects --> @read');
	ROUTE('POST    /admin/api/redirects/                      *Redirects --> @save');

	// Parts & Tracking
	ROUTE('POST    /admin/api/parts/                          *Parts    --> @save');
	ROUTE('POST    /admin/api/tracking/                       *Tracking --> @save');
	ROUTE('GET     /admin/api/tracking/                       *Tracking --> @query');
	ROUTE('GET     /admin/api/tracking/{id}/                  *Tracking --> @stats');
	ROUTE('DELETE  /admin/api/tracking/{id}/                  *Tracking --> @remove');

	// Public
	ROUTE('GET     /api/track/{id}/                           *Tracking --> @exec');

	// Files
	ROUTE('GET     /admin/api/files/                          *Files --> @query');
	ROUTE('GET     /admin/api/files/clear/                    *Files --> @clear');

	// Files
	FILE('/sitemap.xml', sitemap);
};

function sitemap(req, res) {

	var arr = MAIN.pages;
	var builder = ['<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
	var lng = F.onLocale ? F.onLocale(req, res) : null;

	for (var i = 0; i < arr.length; i++) {
		var item = arr[i];
		if (!lng || item.language === lng)
			builder.push('<url><loc>{0}</loc><lastmod>{1}</lastmod></url>'.format(CONF.url + item.url, (item.dtupdated ? item.dtupdated : item.dtcreated).format('yyyy-MM-dd')));
	}

	OPERATION('sitemap.xml', builder, function() {
		builder.push('</urlset>');
		res.content(200, builder.join(''), 'text/xml');
	});
}

function preview() {
	var self = this;
	self.layout('');
	self.repository.preview = true;
	self.repository.page = self.body;
	self.view('cms' + self.body.template);
}

function preview2() {
	var self = this;
	var data;

	try {
		data = decodeURIComponent(Buffer.from(self.body.base64 || '', 'base64').toString('utf8')).parseJSON();
	} catch (e) {}

	if (!data) {
		self.content('', 'text/html');
		return;
	}

	$MAKE('Pages', data, function(err, response) {

		if (err) {
			self.content('', 'text/html');
			return;
		}

		self.layout('');
		self.CMSpagemodel(response);
	});
}

function dependencies() {
	var self = this;
	var arr = [];

	for (var i = 0, length = MAIN.pages.length; i < length; i++) {
		var item = MAIN.pages[i];
		arr.push({ url: item.url, name: item.name, parent: item.parent });
	}

	var output = {};
	output.links = arr;

	NOSQL('parts').find().fields('id,name,category').callback(function(err, response) {
		output.parts = response;
		self.json(output);
	});
}

function css() {
	var self = this;
	self.content(U.minify_css('/*auto*/\n' + (self.body.css || '')), 'text/css');
}