// ===================================================
// Total.js start script
// https://www.totaljs.com
// ===================================================

const options = {};

// options.ip = '127.0.0.1';
// options.port = parseInt(process.argv[2]);
// options.config = { name: 'Total.js' };
// options.sleep = 3000;
// options.inspector = 9229;
// options.watch = ['private'];
// options.livereload = true;

if (process.argv.indexOf('--release', 1) !== -1 || process.argv.indexOf('release', 1) !== -1)
	require('total4').http('release', options);
else
	require('total4/debug')(options);