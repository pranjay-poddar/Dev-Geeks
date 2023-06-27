"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Composer = void 0;
const context_1 = __importDefault(require("./context"));
const filters_1 = require("./filters");
function always(x) {
    return () => x;
}
const anoop = always(Promise.resolve());
class Composer {
    constructor(...fns) {
        this.handler = Composer.compose(fns);
    }
    /**
     * Registers a middleware.
     */
    use(...fns) {
        this.handler = Composer.compose([this.handler, ...fns]);
        return this;
    }
    /**
     * Registers middleware for handling updates
     * matching given type guard function.
     * @deprecated use `Composer::on`
     */
    guard(guardFn, ...fns) {
        return this.use(Composer.guard(guardFn, ...fns));
    }
    on(filters, ...fns) {
        // @ts-expect-error This should get resolved when the overloads are removed in v5
        return this.use(Composer.on(filters, ...fns));
    }
    /**
     * Registers middleware for handling matching text messages.
     */
    hears(triggers, ...fns) {
        return this.use(Composer.hears(triggers, ...fns));
    }
    /**
     * Registers middleware for handling specified commands.
     */
    command(command, ...fns) {
        return this.use(Composer.command(command, ...fns));
    }
    /**
     * Registers middleware for handling matching callback queries.
     */
    action(triggers, ...fns) {
        return this.use(Composer.action(triggers, ...fns));
    }
    /**
     * Registers middleware for handling matching inline queries.
     */
    inlineQuery(triggers, ...fns) {
        return this.use(Composer.inlineQuery(triggers, ...fns));
    }
    /**
     * Registers middleware for handling game queries
     */
    gameQuery(...fns) {
        return this.use(Composer.gameQuery(...fns));
    }
    /**
     * Registers middleware for dropping matching updates.
     */
    drop(predicate) {
        return this.use(Composer.drop(predicate));
    }
    /** @deprecated use `Composer::drop` */
    filter(predicate) {
        return this.use(Composer.filter(predicate));
    }
    entity(predicate, ...fns) {
        return this.use(Composer.entity(predicate, ...fns));
    }
    email(email, ...fns) {
        return this.use(Composer.email(email, ...fns));
    }
    url(url, ...fns) {
        return this.use(Composer.url(url, ...fns));
    }
    textLink(link, ...fns) {
        return this.use(Composer.textLink(link, ...fns));
    }
    textMention(mention, ...fns) {
        return this.use(Composer.textMention(mention, ...fns));
    }
    mention(mention, ...fns) {
        return this.use(Composer.mention(mention, ...fns));
    }
    phone(number, ...fns) {
        return this.use(Composer.phone(number, ...fns));
    }
    hashtag(hashtag, ...fns) {
        return this.use(Composer.hashtag(hashtag, ...fns));
    }
    cashtag(cashtag, ...fns) {
        return this.use(Composer.cashtag(cashtag, ...fns));
    }
    spoiler(text, ...fns) {
        return this.use(Composer.spoiler(text, ...fns));
    }
    /**
     * Registers a middleware for handling /start
     */
    start(...fns) {
        const handler = Composer.compose(fns);
        return this.command('start', (ctx, next) => {
            // First entity is the /start bot_command itself
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const entity = ctx.message.entities[0];
            const startPayload = ctx.message.text.slice(entity.length + 1);
            return handler(Object.assign(ctx, { startPayload }), next);
        });
    }
    /**
     * Registers a middleware for handling /help
     */
    help(...fns) {
        return this.command('help', ...fns);
    }
    /**
     * Registers a middleware for handling /settings
     */
    settings(...fns) {
        return this.command('settings', ...fns);
    }
    middleware() {
        return this.handler;
    }
    static reply(...args) {
        return (ctx) => ctx.reply(...args);
    }
    static catch(errorHandler, ...fns) {
        const handler = Composer.compose(fns);
        // prettier-ignore
        return (ctx, next) => Promise.resolve(handler(ctx, next))
            .catch((err) => errorHandler(err, ctx));
    }
    /**
     * Generates middleware that runs in the background.
     */
    static fork(middleware) {
        const handler = Composer.unwrap(middleware);
        return async (ctx, next) => {
            await Promise.all([handler(ctx, anoop), next()]);
        };
    }
    static tap(middleware) {
        const handler = Composer.unwrap(middleware);
        return (ctx, next) => Promise.resolve(handler(ctx, anoop)).then(() => next());
    }
    /**
     * Generates middleware that gives up control to the next middleware.
     */
    static passThru() {
        return (ctx, next) => next();
    }
    static lazy(factoryFn) {
        if (typeof factoryFn !== 'function') {
            throw new Error('Argument must be a function');
        }
        return (ctx, next) => Promise.resolve(factoryFn(ctx)).then((middleware) => Composer.unwrap(middleware)(ctx, next));
    }
    static log(logFn = console.log) {
        return (ctx, next) => {
            logFn(JSON.stringify(ctx.update, null, 2));
            return next();
        };
    }
    /**
     * @param trueMiddleware middleware to run if the predicate returns true
     * @param falseMiddleware middleware to run if the predicate returns false
     */
    static branch(predicate, trueMiddleware, falseMiddleware) {
        if (typeof predicate !== 'function') {
            return Composer.unwrap(predicate ? trueMiddleware : falseMiddleware);
        }
        return Composer.lazy((ctx) => Promise.resolve(predicate(ctx)).then((value) => value ? trueMiddleware : falseMiddleware));
    }
    /**
     * Generates optional middleware.
     * @param predicate predicate to decide on a context object whether to run the middleware
     * @param middleware middleware to run if the predicate returns true
     */
    static optional(predicate, ...fns) {
        return Composer.branch(predicate, Composer.compose(fns), Composer.passThru());
    }
    /** @deprecated use `Composer.drop` */
    static filter(predicate) {
        return Composer.branch(predicate, Composer.passThru(), anoop);
    }
    /**
     * Generates middleware for dropping matching updates.
     */
    static drop(predicate) {
        return Composer.branch(predicate, anoop, Composer.passThru());
    }
    static dispatch(routeFn, handlers) {
        return Composer.lazy((ctx) => Promise.resolve(routeFn(ctx)).then((value) => handlers[value]));
    }
    // EXPLANATION FOR THE ts-expect-error ANNOTATIONS
    // The annotations around function invocations with `...fns` are there
    // whenever we perform validation logic that the flow analysis of TypeScript
    // cannot comprehend. We always make sure that the middleware functions are
    // only invoked with properly constrained context objects, but this cannot be
    // determined automatically.
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
    static guard(guardFn, ...fns) {
        return Composer.optional((ctx) => guardFn(ctx.update), 
        // @ts-expect-error see explanation above
        ...fns);
    }
    static on(updateType, ...fns) {
        const filters = Array.isArray(updateType) ? updateType : [updateType];
        const predicate = (update) => {
            for (const filter of filters) {
                if (
                // TODO: this should change to === 'function' once TS bug is fixed
                // https://github.com/microsoft/TypeScript/pull/51502
                typeof filter !== 'string'
                    ? // filter is a type guard
                        filter(update)
                    : // check if filter is the update type
                        filter in update ||
                            // check if filter is the msg type
                            // TODO: remove in v5!
                            ('message' in update && filter in update.message)) {
                    return true;
                }
            }
            return false;
        };
        return Composer.optional((ctx) => predicate(ctx.update), ...fns);
    }
    static entity(predicate, ...fns) {
        if (typeof predicate !== 'function') {
            const entityTypes = normalizeTextArguments(predicate);
            return Composer.entity(({ type }) => entityTypes.includes(type), ...fns);
        }
        return Composer.optional((ctx) => {
            var _a;
            const msg = (_a = ctx.message) !== null && _a !== void 0 ? _a : ctx.channelPost;
            if (msg === undefined) {
                return false;
            }
            const text = getText(msg);
            const entities = getEntities(msg);
            if (text === undefined)
                return false;
            return entities.some((entity) => predicate(entity, text.substring(entity.offset, entity.offset + entity.length), ctx));
            // @ts-expect-error see explanation above
        }, ...fns);
    }
    static entityText(entityType, predicate, ...fns) {
        if (fns.length === 0) {
            // prettier-ignore
            return Array.isArray(predicate)
                // @ts-expect-error predicate is really the middleware
                ? Composer.entity(entityType, ...predicate)
                // @ts-expect-error predicate is really the middleware
                : Composer.entity(entityType, predicate);
        }
        const triggers = normalizeTriggers(predicate);
        return Composer.entity(({ type }, value, ctx) => {
            if (type !== entityType) {
                return false;
            }
            for (const trigger of triggers) {
                // @ts-expect-error define so far unknown property `match`
                if ((ctx.match = trigger(value, ctx))) {
                    return true;
                }
            }
            return false;
            // @ts-expect-error see explanation above
        }, ...fns);
    }
    static email(email, ...fns) {
        return Composer.entityText('email', email, ...fns);
    }
    static phone(number, ...fns) {
        return Composer.entityText('phone_number', number, ...fns);
    }
    static url(url, ...fns) {
        return Composer.entityText('url', url, ...fns);
    }
    static textLink(link, ...fns) {
        return Composer.entityText('text_link', link, ...fns);
    }
    static textMention(mention, ...fns) {
        return Composer.entityText('text_mention', mention, ...fns);
    }
    static mention(mention, ...fns) {
        return Composer.entityText('mention', normalizeTextArguments(mention, '@'), ...fns);
    }
    static hashtag(hashtag, ...fns) {
        return Composer.entityText('hashtag', normalizeTextArguments(hashtag, '#'), ...fns);
    }
    static cashtag(cashtag, ...fns) {
        return Composer.entityText('cashtag', normalizeTextArguments(cashtag, '$'), ...fns);
    }
    static spoiler(text, ...fns) {
        return Composer.entityText('spoiler', text, ...fns);
    }
    static match(triggers, ...fns) {
        const handler = Composer.compose(fns);
        return (ctx, next) => {
            var _a, _b, _c, _d;
            const text = (_c = (_b = (_a = getText(ctx.message)) !== null && _a !== void 0 ? _a : getText(ctx.channelPost)) !== null && _b !== void 0 ? _b : getText(ctx.callbackQuery)) !== null && _c !== void 0 ? _c : (_d = ctx.inlineQuery) === null || _d === void 0 ? void 0 : _d.query;
            if (text === undefined)
                return next();
            for (const trigger of triggers) {
                // @ts-expect-error Trust me, TS!
                const match = trigger(text, ctx);
                if (match) {
                    // @ts-expect-error define so far unknown property `match`
                    return handler(Object.assign(ctx, { match }), next);
                }
            }
            return next();
        };
    }
    /**
     * Generates middleware for handling matching text messages.
     */
    static hears(triggers, ...fns) {
        return Composer.on('text', Composer.match(normalizeTriggers(triggers), ...fns));
    }
    /**
     * Generates middleware for handling specified commands.
     */
    static command(command, ...fns) {
        if (fns.length === 0)
            // @ts-expect-error command is really the middleware
            return Composer.entity('bot_command', command);
        const triggers = normalizeTriggers(command);
        const filter = (0, filters_1.message)('text');
        return Composer.on(filter, (ctx, next) => {
            var _a;
            const first = (_a = ctx.message.entities) === null || _a === void 0 ? void 0 : _a[0];
            if ((first === null || first === void 0 ? void 0 : first.type) !== 'bot_command')
                return next();
            if (first.offset > 0)
                return next();
            const [cmdPart, to] = ctx.message.text.slice(0, first.length).split('@');
            if (!cmdPart)
                return next();
            // always check for bot's own username case-insensitively
            if (to && to.toLowerCase() !== ctx.me.toLowerCase())
                return next();
            const cmd = cmdPart.slice(1);
            for (const trigger of triggers)
                if (trigger(cmd, ctx))
                    return Composer.compose(fns)(ctx, next);
            return next();
        });
    }
    /**
     * Generates middleware for handling matching callback queries.
     */
    static action(triggers, ...fns) {
        return Composer.on('callback_query', Composer.match(normalizeTriggers(triggers), ...fns));
    }
    /**
     * Generates middleware for handling matching inline queries.
     */
    static inlineQuery(triggers, ...fns) {
        return Composer.on('inline_query', Composer.match(normalizeTriggers(triggers), ...fns));
    }
    /**
     * Generates middleware responding only to specified users.
     */
    static acl(userId, ...fns) {
        if (typeof userId === 'function') {
            return Composer.optional(userId, ...fns);
        }
        const allowed = Array.isArray(userId) ? userId : [userId];
        // prettier-ignore
        return Composer.optional((ctx) => !ctx.from || allowed.includes(ctx.from.id), ...fns);
    }
    static memberStatus(status, ...fns) {
        const statuses = Array.isArray(status) ? status : [status];
        return Composer.optional(async (ctx) => {
            if (ctx.message === undefined)
                return false;
            const member = await ctx.getChatMember(ctx.message.from.id);
            return statuses.includes(member.status);
        }, ...fns);
    }
    /**
     * Generates middleware responding only to chat admins and chat creator.
     */
    static admin(...fns) {
        return Composer.memberStatus(['administrator', 'creator'], ...fns);
    }
    /**
     * Generates middleware responding only to chat creator.
     */
    static creator(...fns) {
        return Composer.memberStatus('creator', ...fns);
    }
    /**
     * Generates middleware running only in specified chat types.
     */
    static chatType(type, ...fns) {
        const types = Array.isArray(type) ? type : [type];
        return Composer.optional((ctx) => {
            const chat = ctx.chat;
            return chat !== undefined && types.includes(chat.type);
        }, ...fns);
    }
    /**
     * Generates middleware running only in private chats.
     */
    static privateChat(...fns) {
        return Composer.chatType('private', ...fns);
    }
    /**
     * Generates middleware running only in groups and supergroups.
     */
    static groupChat(...fns) {
        return Composer.chatType(['group', 'supergroup'], ...fns);
    }
    /**
     * Generates middleware for handling game queries.
     */
    static gameQuery(...fns) {
        return Composer.guard((0, filters_1.callbackQuery)('game_short_name'), ...fns);
    }
    static unwrap(handler) {
        if (!handler) {
            throw new Error('Handler is undefined');
        }
        return 'middleware' in handler ? handler.middleware() : handler;
    }
    static compose(middlewares) {
        if (!Array.isArray(middlewares)) {
            throw new Error('Middlewares must be an array');
        }
        if (middlewares.length === 0) {
            return Composer.passThru();
        }
        if (middlewares.length === 1) {
            // Quite literally asserted in the above condition
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return Composer.unwrap(middlewares[0]);
        }
        return (ctx, next) => {
            let index = -1;
            return execute(0, ctx);
            async function execute(i, context) {
                var _a;
                if (!(context instanceof context_1.default)) {
                    throw new Error('next(ctx) called with invalid context');
                }
                if (i <= index) {
                    throw new Error('next() called multiple times');
                }
                index = i;
                const handler = Composer.unwrap((_a = middlewares[i]) !== null && _a !== void 0 ? _a : next);
                await handler(context, async (ctx = context) => {
                    await execute(i + 1, ctx);
                });
            }
        };
    }
}
exports.Composer = Composer;
/**
 * Generates middleware for handling provided update types.
 * @deprecated use `Composer.on` instead
 */
Composer.mount = Composer.on;
function escapeRegExp(s) {
    // $& means the whole matched string
    return s.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
}
function normalizeTriggers(triggers) {
    if (!Array.isArray(triggers))
        triggers = [triggers];
    return triggers.map((trigger) => {
        if (!trigger)
            throw new Error('Invalid trigger');
        if (typeof trigger === 'function')
            return trigger;
        if (trigger instanceof RegExp)
            return (value = '') => {
                trigger.lastIndex = 0;
                return trigger.exec(value);
            };
        const regex = new RegExp(`^${escapeRegExp(trigger)}$`);
        return (value) => regex.exec(value);
    });
}
function getEntities(msg) {
    var _a, _b;
    if (msg == null)
        return [];
    if ('caption_entities' in msg)
        return (_a = msg.caption_entities) !== null && _a !== void 0 ? _a : [];
    if ('entities' in msg)
        return (_b = msg.entities) !== null && _b !== void 0 ? _b : [];
    return [];
}
function getText(msg) {
    if (msg == null)
        return undefined;
    if ('caption' in msg)
        return msg.caption;
    if ('text' in msg)
        return msg.text;
    if ('data' in msg)
        return msg.data;
    if ('game_short_name' in msg)
        return msg.game_short_name;
    return undefined;
}
function normalizeTextArguments(argument, prefix = '') {
    const args = Array.isArray(argument) ? argument : [argument];
    // prettier-ignore
    return args
        .filter(Boolean)
        .map((arg) => prefix && typeof arg === 'string' && !arg.startsWith(prefix) ? `${prefix}${arg}` : arg);
}
exports.default = Composer;
