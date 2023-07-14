// Tester module v1

// Documentation: https://docs.totaljs.com/total4/40842001ok51c/
// Example: https://github.com/totaljs/examples/blob/master/tester/tests/test.js

exports.make = function(callback, options) {

	var tester = {};
	tester.options = options || {};
	tester.dtbeg = new Date();
	tester.dtend = null;
	tester.groups = [];
	tester.callback = null;

	tester.group = function(name, test) {
		tester.groups.push({ name: name, callback: test, fallback: null, tests: [] });
	};

	tester.start = function(callback) {

		tester.callback = callback;

		tester.groups.wait(function(group, next_group) {

			// Add test to queue
			group.callback(function(test_name, test_callback) {

				// Optional test name
				if (typeof(test_name) === 'function') {
					test_callback = test_name;
					test_name = null;
				}

				group.tests.push({ name: test_name, callback: test_callback });

			}, function(cleanup) {
				group.cleanup = cleanup;
			});

			// Start tests
			group.tests.wait(function(test, next_test) {

				// Evaluate test
				test.callback(function(err) {

					if (err) {

						if (err instanceof ErrorBuilder)
							err = err.toString();
						else if (err instanceof Array && err[0].error)
							err = err[0].error;

						var obj = { group: group.name, test: test.name, err: err };

						// Run group cleanup after failed test
						group.cleanup && group.cleanup(obj);

						// Global cleanup (callback)
						tester.callback && tester.callback(obj);

						throw new Error(group.name + ' - ' + test.name + (err instanceof Error || typeof(err) === 'string' ? (' (' + err + ')') : ''));
					}

					if (test.name)
						tester.options.silent || console.log('[OK]', group.name, '-',  test.name);

					next_test();
				});
			}, function() {
				// Run group cleanup and go to next group
				group.cleanup && group.cleanup();
				next_group();
			});

		}, function() {
			tester.dtend = new Date();
			tester.duration = tester.dtend.getTime() - tester.dtbeg.getTime();
			tester.options.silent || console.log('[DONE] in', tester.duration, 'ms');

			callback && callback();
		});
	};

	callback && callback(tester.group, tester.start);

	return tester;
};