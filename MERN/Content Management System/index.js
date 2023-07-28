

const options = {};



if (process.argv.indexOf('--release', 1) !== -1 || process.argv.indexOf('release', 1) !== -1)
	require('total4').http('release', options);
else
	require('total4/debug')(options);