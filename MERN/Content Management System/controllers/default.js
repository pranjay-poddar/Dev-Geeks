exports.install = function() {
	// Enable CORS for API
	CORS();
	ROUTE('/*', view_cms);
};

function view_cms() {
	this.CMSpage();
}