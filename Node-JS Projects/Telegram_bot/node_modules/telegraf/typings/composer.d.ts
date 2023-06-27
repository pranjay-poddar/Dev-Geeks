/** @format */
import * as tg from './core/types/typegram';
import * as tt from './telegram-types';
import { Middleware, MiddlewareFn, MiddlewareObj } from './middleware';
import Context, { FilteredContext, NarrowedContext } from './context';
import { MaybeArray, NonemptyReadonlyArray, MaybePromise, Guard } from './util';
import { type CallbackQuery } from './core/types/typegram';
export type Triggers<C> = MaybeArray<string | RegExp | ((value: string, ctx: C) => RegExpExecArray | null)>;
export type Predicate<T> = (t: T) => boolean;
export type AsyncPredicate<T> = (t: T) => Promise<boolean>;
export type MatchedMiddleware<C extends Context, T extends tt.UpdateType | tt.MessageSubType = 'message' | 'channel_post'> = NonemptyReadonlyArray<Middleware<NarrowedContext<C & {
    match: RegExpExecArray;
}, tt.MountMap[T]>>>;
export declare class Composer<C extends Context> implements MiddlewareObj<C> {
    private handler;
    constructor(...fns: ReadonlyArray<Middleware<C>>);
    /**
     * Registers a middleware.
     */
    use(...fns: ReadonlyArray<Middleware<C>>): this;
    /**
     * Registers middleware for handling updates
     * matching given type guard function.
     * @deprecated use `Composer::on`
     */
    guard<U extends tg.Update>(guardFn: (update: tg.Update) => update is U, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, U>>>): this;
    /**
     * Registers middleware for handling updates narrowed by update types or filter queries.
     */
    on<Filter extends tt.UpdateType | Guard<C['update']>>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<C, Filter>>>): this;
    /**
     * Registers middleware for handling updates narrowed by update types or message subtypes.
     * @deprecated Use filter utils instead. Support for Message subtype in `Composer::on` will be removed in Telegraf v5.
     */
    on<Filter extends tt.UpdateType | tt.MessageSubType>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap[Filter]>>>): this;
    /**
     * Registers middleware for handling matching text messages.
     */
    hears(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'text'>): this;
    /**
     * Registers middleware for handling specified commands.
     */
    command(command: Triggers<C>, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap['text']>>>): this;
    /**
     * Registers middleware for handling matching callback queries.
     */
    action(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'callback_query'>): this;
    /**
     * Registers middleware for handling matching inline queries.
     */
    inlineQuery(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'inline_query'>): this;
    /**
     * Registers middleware for handling game queries
     */
    gameQuery(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tg.Update.CallbackQueryUpdate<CallbackQuery.GameQuery>>>>): this;
    /**
     * Registers middleware for dropping matching updates.
     */
    drop(predicate: Predicate<C>): this;
    /** @deprecated use `Composer::drop` */
    filter(predicate: Predicate<C>): this;
    private entity;
    email(email: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    url(url: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    textLink(link: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    textMention(mention: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    mention(mention: MaybeArray<string>, ...fns: MatchedMiddleware<C>): this;
    phone(number: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    hashtag(hashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C>): this;
    cashtag(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C>): this;
    spoiler(text: Triggers<C>, ...fns: MatchedMiddleware<C>): this;
    /**
     * Registers a middleware for handling /start
     */
    start(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap['text']> & {
        startPayload: string;
    }>>): this;
    /**
     * Registers a middleware for handling /help
     */
    help(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap['text']>>>): this;
    /**
     * Registers a middleware for handling /settings
     */
    settings(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap['text']>>>): this;
    middleware(): MiddlewareFn<C>;
    static reply(...args: Parameters<Context['reply']>): MiddlewareFn<Context>;
    static catch<C extends Context>(errorHandler: (err: unknown, ctx: C) => void, ...fns: ReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware that runs in the background.
     */
    static fork<C extends Context>(middleware: Middleware<C>): MiddlewareFn<C>;
    static tap<C extends Context>(middleware: Middleware<C>): MiddlewareFn<C>;
    /**
     * Generates middleware that gives up control to the next middleware.
     */
    static passThru(): MiddlewareFn<Context>;
    static lazy<C extends Context>(factoryFn: (ctx: C) => MaybePromise<Middleware<C>>): MiddlewareFn<C>;
    static log(logFn?: (s: string) => void): MiddlewareFn<Context>;
    /**
     * @param trueMiddleware middleware to run if the predicate returns true
     * @param falseMiddleware middleware to run if the predicate returns false
     */
    static branch<C extends Context>(predicate: Predicate<C> | AsyncPredicate<C>, trueMiddleware: Middleware<C>, falseMiddleware: Middleware<C>): MiddlewareFn<C>;
    /**
     * Generates optional middleware.
     * @param predicate predicate to decide on a context object whether to run the middleware
     * @param middleware middleware to run if the predicate returns true
     */
    static optional<C extends Context>(predicate: Predicate<C> | AsyncPredicate<C>, ...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /** @deprecated use `Composer.drop` */
    static filter<C extends Context>(predicate: Predicate<C>): MiddlewareFn<C>;
    /**
     * Generates middleware for dropping matching updates.
     */
    static drop<C extends Context>(predicate: Predicate<C>): MiddlewareFn<C>;
    static dispatch<C extends Context, Handlers extends Record<string | number | symbol, Middleware<C>>>(routeFn: (ctx: C) => MaybePromise<keyof Handlers>, handlers: Handlers): Middleware<C>;
    /**
     * Generates optional middleware based on a predicate that only operates on `ctx.update`.
     *
     * Example:
     * ```ts
     * import { Composer, Update } from 'telegraf'
     *
     * const predicate = (u): u is Update.MessageUpdate => 'message' in u
     * const middleware = Composer.guard(predicate, (ctx) => {
     *   const message = ctx.update.message
     * })
     * ```
     *
     * Note that `Composer.on('message')` is preferred over this.
     *
     * @param guardFn predicate to decide whether to run the middleware based on the `ctx.update` object
     * @param fns middleware to run if the predicate returns true
     * @see `Composer.optional` for a more generic version of this method that allows the predicate to operate on `ctx` itself
     * @deprecated use `Composer.on`
     */
    static guard<C extends Context, U extends tg.Update>(guardFn: (u: tg.Update) => u is U, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, U>>>): MiddlewareFn<C>;
    /**
     * Generates middleware for handling updates narrowed by update types or filter queries.
     */
    static on<Ctx extends Context, Filter extends tt.UpdateType | Guard<Ctx['update']>>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<FilteredContext<Ctx, Filter>>>): MiddlewareFn<Ctx>;
    /**
     * Generates middleware for handling updates narrowed by update types or message subtype.
     * @deprecated Use filter utils instead. Support for Message subtype in `Composer.on` will be removed in Telegraf v5.
     */
    static on<Ctx extends Context, Filter extends tt.UpdateType | tt.MessageSubType>(filters: MaybeArray<Filter>, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<Ctx, tt.MountMap[Filter]>>>): MiddlewareFn<Ctx>;
    /**
     * Generates middleware for handling provided update types.
     * @deprecated use `Composer.on` instead
     */
    static mount: typeof Composer.on;
    private static entity;
    static entityText<C extends Context>(entityType: MaybeArray<string>, predicate: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static email<C extends Context>(email: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static phone<C extends Context>(number: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static url<C extends Context>(url: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static textLink<C extends Context>(link: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static textMention<C extends Context>(mention: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static mention<C extends Context>(mention: MaybeArray<string>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static hashtag<C extends Context>(hashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static cashtag<C extends Context>(cashtag: MaybeArray<string>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    static spoiler<C extends Context>(text: Triggers<C>, ...fns: MatchedMiddleware<C>): MiddlewareFn<C>;
    private static match;
    /**
     * Generates middleware for handling matching text messages.
     */
    static hears<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'text'>): MiddlewareFn<C>;
    /**
     * Generates middleware for handling specified commands.
     */
    static command<C extends Context>(command: Triggers<C>, ...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tt.MountMap['text']>>>): MiddlewareFn<C>;
    /**
     * Generates middleware for handling matching callback queries.
     */
    static action<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'callback_query'>): MiddlewareFn<C>;
    /**
     * Generates middleware for handling matching inline queries.
     */
    static inlineQuery<C extends Context>(triggers: Triggers<C>, ...fns: MatchedMiddleware<C, 'inline_query'>): MiddlewareFn<C>;
    /**
     * Generates middleware responding only to specified users.
     */
    static acl<C extends Context>(userId: MaybeArray<number>, ...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    private static memberStatus;
    /**
     * Generates middleware responding only to chat admins and chat creator.
     */
    static admin<C extends Context>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware responding only to chat creator.
     */
    static creator<C extends Context>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware running only in specified chat types.
     */
    static chatType<C extends Context>(type: MaybeArray<tg.Chat['type']>, ...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware running only in private chats.
     */
    static privateChat<C extends Context>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware running only in groups and supergroups.
     */
    static groupChat<C extends Context>(...fns: NonemptyReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
    /**
     * Generates middleware for handling game queries.
     */
    static gameQuery<C extends Context>(...fns: NonemptyReadonlyArray<Middleware<NarrowedContext<C, tg.Update.CallbackQueryUpdate<CallbackQuery.GameQuery>>>>): MiddlewareFn<C>;
    static unwrap<C extends Context>(handler: Middleware<C>): MiddlewareFn<C>;
    static compose<C extends Context>(middlewares: ReadonlyArray<Middleware<C>>): MiddlewareFn<C>;
}
export default Composer;
//# sourceMappingURL=composer.d.ts.map