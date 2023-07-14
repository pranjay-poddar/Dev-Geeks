exports.icon = 'fa fa-dashboard';
exports.name = '@(Dashboard)';
exports.group = '@(Common)';
exports.position = 0;

exports.install = function() {
	ROUTE('GET    /admin/api/dashboard/',                    stats);
	ROUTE('GET    /admin/api/dashboard/referrers/',          referrers);
	ROUTE('GET    /admin/api/dashboard/online/',             online);
	ROUTE('GET    /admin/api/dashboard/tracking/             *Tracking --> @stats');
	ROUTE('GET    /admin/api/dashboard/trending/             *Pages --> @trending');
};

function online() {
	var self = this;
	var data = MODULE('visitors').today();
	data.memory = process.memoryUsage();
	data.performance = F.stats.performance;
	self.json(data);
}

function stats() {
	var self = this;
	var module = MODULE('visitors');
	module.monthly(function(response) {
		response.visitors = module.instance.visitors;
		self.json(response);
	});
}

function referrers() {
	var self = this;

	var year = self.query.year;

	if (year)
		year = year.parseInt();
	else
		year = NOW.getFullYear();

	COUNTER('visitors').summarize('yearly').where('year', year).callback(function(err, response) {
		response.quicksort('sum', true);
		self.json(response.take(24));
	});
}
