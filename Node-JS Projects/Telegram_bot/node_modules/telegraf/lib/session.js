"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSessionContext = exports.MemorySessionStore = exports.session = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('telegraf:session');
/**
 * Returns middleware that adds `ctx.session` for storing arbitrary state per session key.
 *
 * The default `getSessionKey` is `${ctx.from.id}:${ctx.chat.id}`.
 * If either `ctx.from` or `ctx.chat` is `undefined`, default session key and thus `ctx.session` are also `undefined`.
 *
 * > ⚠️ Session data is kept only in memory by default,  which means that all data will be lost when the process is terminated.
 * >
 * > If you want to store data across restarts, or share it among workers, you should use
 * [@telegraf/session](https://www.npmjs.com/package/@telegraf/session), or pass custom `storage`.
 *
 * @see {@link https://github.com/feathers-studio/telegraf-docs/blob/b694bcc36b4f71fb1cd650a345c2009ab4d2a2a5/guide/session.md Telegraf Docs | Session}
 * @see {@link https://github.com/feathers-studio/telegraf-docs/blob/master/examples/session-bot.ts Example}
 */
function session(options) {
    var _a, _b;
    const getSessionKey = (_a = options === null || options === void 0 ? void 0 : options.getSessionKey) !== null && _a !== void 0 ? _a : defaultGetSessionKey;
    const store = (_b = options === null || options === void 0 ? void 0 : options.store) !== null && _b !== void 0 ? _b : new MemorySessionStore();
    // caches value from store in-memory while simultaneous updates share it
    // when counter reaches 0, the cached ref will be freed from memory
    const cache = new Map();
    // temporarily stores concurrent requests
    const concurrents = new Map();
    // this function must be handled with care
    // read full description on the original PR: https://github.com/telegraf/telegraf/pull/1713
    // make sure to update the tests in test/session.js if you make any changes or fix bugs here
    return async (ctx, next) => {
        var _a;
        const updId = ctx.update.update_id;
        // because this is async, requests may still race here, but it will get autocorrected at (1)
        // v5 getSessionKey should probably be synchronous to avoid that
        const key = await getSessionKey(ctx);
        if (!key) {
            ctx.session = undefined;
            return await next();
        }
        let cached = cache.get(key);
        if (cached) {
            debug(`(${updId}) found cached session, reusing from cache`);
            ++cached.counter;
        }
        else {
            debug(`(${updId}) did not find cached session`);
            // if another concurrent request has already sent a store request, fetch that instead
            let promise = concurrents.get(key);
            if (promise)
                debug(`(${updId}) found a concurrent request, reusing promise`);
            else {
                debug(`(${updId}) fetching from upstream store`);
                promise = store.get(key);
            }
            // synchronously store promise so concurrent requests can share response
            concurrents.set(key, promise);
            const upstream = await promise;
            // all concurrent awaits will have promise in their closure, safe to remove now
            concurrents.delete(key);
            debug(`(${updId}) updating cache`);
            // another request may have beaten us to the punch
            const c = cache.get(key);
            if (c) {
                // another request did beat us to the punch
                c.counter++;
                // (1) preserve cached reference; in-memory reference is always newer than from store
                cached = c;
            }
            else {
                // we're the first, so we must cache the reference
                cached = { ref: upstream !== null && upstream !== void 0 ? upstream : (_a = options === null || options === void 0 ? void 0 : options.defaultSession) === null || _a === void 0 ? void 0 : _a.call(options, ctx), counter: 1 };
                cache.set(key, cached);
            }
        }
        // TS already knows cached is always defined by this point, but does not guard cached.
        // It will, however, guard `c` here.
        const c = cached;
        let touched = false;
        Object.defineProperty(ctx, 'session', {
            get() {
                touched = true;
                return c.ref;
            },
            set(value) {
                touched = true;
                c.ref = value;
            },
        });
        try {
            await next();
        }
        finally {
            if (--c.counter === 0) {
                // decrement to avoid memory leak
                debug(`(${updId}) refcounter reached 0, removing cached`);
                cache.delete(key);
            }
            debug(`(${updId}) middlewares completed, checking session`);
            // only update store if ctx.session was touched
            if (touched)
                if (ctx.session == null) {
                    debug(`(${updId}) ctx.session missing, removing from store`);
                    await store.delete(key);
                }
                else {
                    debug(`(${updId}) ctx.session found, updating store`);
                    await store.set(key, ctx.session);
                }
        }
    };
}
exports.session = session;
async function defaultGetSessionKey(ctx) {
    var _a, _b;
    const fromId = (_a = ctx.from) === null || _a === void 0 ? void 0 : _a.id;
    const chatId = (_b = ctx.chat) === null || _b === void 0 ? void 0 : _b.id;
    if (fromId == null || chatId == null) {
        return undefined;
    }
    return `${fromId}:${chatId}`;
}
/** @deprecated Use `Map` */
class MemorySessionStore {
    constructor(ttl = Infinity) {
        this.ttl = ttl;
        this.store = new Map();
    }
    get(name) {
        const entry = this.store.get(name);
        if (entry == null) {
            return undefined;
        }
        else if (entry.expires < Date.now()) {
            this.delete(name);
            return undefined;
        }
        return entry.session;
    }
    set(name, value) {
        const now = Date.now();
        this.store.set(name, { session: value, expires: now + this.ttl });
    }
    delete(name) {
        this.store.delete(name);
    }
}
exports.MemorySessionStore = MemorySessionStore;
function isSessionContext(ctx) {
    return 'session' in ctx;
}
exports.isSessionContext = isSessionContext;
