declare class TimeoutErrorClass extends Error {
	readonly name: 'TimeoutError';
	constructor(message?: string);
}

declare namespace pTimeout {
	type TimeoutError = TimeoutErrorClass;

	type Options = {
		/**
		Custom implementations for the `setTimeout` and `clearTimeout` functions.

		Useful for testing purposes, in particular to work around [`sinon.useFakeTimers()`](https://sinonjs.org/releases/latest/fake-timers/).

		@example
		```
		import pTimeout = require('p-timeout');
		import sinon = require('sinon');

		(async () => {
			const originalSetTimeout = setTimeout;
			const originalClearTimeout = clearTimeout;

			sinon.useFakeTimers();

			// Use `pTimeout` without being affected by `sinon.useFakeTimers()`:
			await pTimeout(doSomething(), 2000, undefined, {
				customTimers: {
					setTimeout: originalSetTimeout,
					clearTimeout: originalClearTimeout
				}
			});
		})();
		```
		*/
		readonly customTimers?: {
			setTimeout: typeof global.setTimeout;
			clearTimeout: typeof global.clearTimeout;
		};
	};
}

interface ClearablePromise<T> extends Promise<T>{
	/**
	Clear the timeout.
	*/
	clear: () => void;
}

declare const pTimeout: {
	TimeoutError: typeof TimeoutErrorClass;

	default: typeof pTimeout;

	/**
	Timeout a promise after a specified amount of time.

	If you pass in a cancelable promise, specifically a promise with a `.cancel()` method, that method will be called when the `pTimeout` promise times out.

	@param input - Promise to decorate.
	@param milliseconds - Milliseconds before timing out.
	@param message - Specify a custom error message or error. If you do a custom error, it's recommended to sub-class `pTimeout.TimeoutError`. Default: `'Promise timed out after 50 milliseconds'`.
	@returns A decorated `input` that times out after `milliseconds` time. It has a `.clear()` method that clears the timeout.

	@example
	```
	import delay = require('delay');
	import pTimeout = require('p-timeout');

	const delayedPromise = delay(200);

	pTimeout(delayedPromise, 50).then(() => 'foo');
	//=> [TimeoutError: Promise timed out after 50 milliseconds]
	```
	*/
	<ValueType>(
		input: PromiseLike<ValueType>,
		milliseconds: number,
		message?: string | Error,
		options?: pTimeout.Options
	): ClearablePromise<ValueType>;

	/**
	Timeout a promise after a specified amount of time.

	If you pass in a cancelable promise, specifically a promise with a `.cancel()` method, that method will be called when the `pTimeout` promise times out.

	@param input - Promise to decorate.
	@param milliseconds - Milliseconds before timing out. Passing `Infinity` will cause it to never time out.
	@param fallback - Do something other than rejecting with an error on timeout. You could for example retry.
	@returns A decorated `input` that times out after `milliseconds` time. It has a `.clear()` method that clears the timeout.

	@example
	```
	import delay = require('delay');
	import pTimeout = require('p-timeout');

	const delayedPromise = () => delay(200);

	pTimeout(delayedPromise(), 50, () => {
		return pTimeout(delayedPromise(), 300);
	});
	```
	*/
	<ValueType, ReturnType>(
		input: PromiseLike<ValueType>,
		milliseconds: number,
		fallback: () => ReturnType | Promise<ReturnType>,
		options?: pTimeout.Options
	): ClearablePromise<ValueType | ReturnType>;
};

export = pTimeout;
