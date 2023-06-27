"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polling = void 0;
const abort_controller_1 = __importDefault(require("abort-controller"));
const debug_1 = __importDefault(require("debug"));
const util_1 = require("util");
const error_1 = require("./error");
const debug = (0, debug_1.default)('telegraf:polling');
const wait = (0, util_1.promisify)(setTimeout);
function always(x) {
    return () => x;
}
const noop = always(Promise.resolve());
class Polling {
    constructor(telegram, allowedUpdates) {
        this.telegram = telegram;
        this.allowedUpdates = allowedUpdates;
        this.abortController = new abort_controller_1.default();
        this.skipOffsetSync = false;
        this.offset = 0;
    }
    async *[Symbol.asyncIterator]() {
        var _a, _b;
        debug('Starting long polling');
        do {
            try {
                const updates = await this.telegram.callApi('getUpdates', {
                    timeout: 50,
                    offset: this.offset,
                    allowed_updates: this.allowedUpdates,
                }, this.abortController);
                const last = updates[updates.length - 1];
                if (last !== undefined) {
                    this.offset = last.update_id + 1;
                }
                yield updates;
            }
            catch (error) {
                const err = error;
                if (err.name === 'AbortError')
                    return;
                if (err.name === 'FetchError' ||
                    (err instanceof error_1.TelegramError && err.code === 429) ||
                    (err instanceof error_1.TelegramError && err.code >= 500)) {
                    const retryAfter = (_b = (_a = err.parameters) === null || _a === void 0 ? void 0 : _a.retry_after) !== null && _b !== void 0 ? _b : 5;
                    debug('Failed to fetch updates, retrying after %ds.', retryAfter, err);
                    await wait(retryAfter * 1000);
                    continue;
                }
                if (err instanceof error_1.TelegramError &&
                    // Unauthorized      Conflict
                    (err.code === 401 || err.code === 409)) {
                    this.skipOffsetSync = true;
                    throw err;
                }
                throw err;
            }
        } while (!this.abortController.signal.aborted);
    }
    async syncUpdateOffset() {
        if (this.skipOffsetSync)
            return;
        debug('Syncing update offset...');
        await this.telegram.callApi('getUpdates', { offset: this.offset, limit: 1 });
    }
    async loop(handleUpdate) {
        if (this.abortController.signal.aborted)
            throw new Error('Polling instances must not be reused!');
        try {
            for await (const updates of this)
                await Promise.all(updates.map(handleUpdate));
        }
        finally {
            debug('Long polling stopped');
            // prevent instance reuse
            this.stop();
            await this.syncUpdateOffset().catch(noop);
        }
    }
    stop() {
        this.abortController.abort();
    }
}
exports.Polling = Polling;
