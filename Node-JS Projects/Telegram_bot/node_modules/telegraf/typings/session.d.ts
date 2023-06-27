import { Context } from './context';
import { Any, MaybePromise } from './util';
import { MiddlewareFn } from './middleware';
export interface SessionStore<T> {
    get: (name: string) => MaybePromise<T | undefined>;
    set: (name: string, value: T) => MaybePromise<Any>;
    delete: (name: string) => MaybePromise<Any>;
}
interface SessionOptions<S extends object, C extends Context = Context> {
    getSessionKey?: (ctx: C) => Promise<string | undefined>;
    store?: SessionStore<S>;
    defaultSession?: (ctx: C) => S;
}
export interface SessionContext<S extends object> extends Context {
    session?: S;
}
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
export declare function session<S extends object, C extends Context = Context>(options?: SessionOptions<S, C>): MiddlewareFn<C & {
    session?: S;
}>;
/** @deprecated Use `Map` */
export declare class MemorySessionStore<T> implements SessionStore<T> {
    private readonly ttl;
    private readonly store;
    constructor(ttl?: number);
    get(name: string): T | undefined;
    set(name: string, value: T): void;
    delete(name: string): void;
}
export declare function isSessionContext<S extends object>(ctx: Context): ctx is SessionContext<S>;
export {};
//# sourceMappingURL=session.d.ts.map