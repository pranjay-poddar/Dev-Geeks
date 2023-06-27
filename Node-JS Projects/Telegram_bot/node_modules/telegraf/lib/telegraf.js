"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Telegraf = void 0;
const crypto = __importStar(require("crypto"));
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const composer_1 = require("./composer");
const compact_1 = require("./core/helpers/compact");
const context_1 = __importDefault(require("./context"));
const debug_1 = __importDefault(require("debug"));
const webhook_1 = __importDefault(require("./core/network/webhook"));
const polling_1 = require("./core/network/polling");
const p_timeout_1 = __importDefault(require("p-timeout"));
const telegram_1 = __importDefault(require("./telegram"));
const url_1 = require("url");
const safeCompare = require("safe-compare");
const debug = (0, debug_1.default)('telegraf:main');
const DEFAULT_OPTIONS = {
    telegram: {},
    handlerTimeout: 90000,
    contextType: context_1.default,
};
function always(x) {
    return () => x;
}
const anoop = always(Promise.resolve());
const TOKEN_HEADER = 'x-telegram-bot-api-secret-token';
class Telegraf extends composer_1.Composer {
    constructor(token, options) {
        super();
        this.context = {};
        /** Assign to this to customise the webhook filter middleware.
         * `{ hookPath, secretToken }` will be bound to this rather than the Telegraf instance.
         * Remember to assign a regular function and not an arrow function so it's bindable.
         */
        this.webhookFilter = function (req) {
            const debug = (0, debug_1.default)('telegraf:webhook');
            if (req.method === 'POST') {
                if (safeCompare(this.hookPath, req.url)) {
                    // no need to check if secret_token was not set
                    if (!this.secretToken)
                        return true;
                    else {
                        const token = req.headers[TOKEN_HEADER];
                        if (safeCompare(this.secretToken, token))
                            return true;
                        else
                            debug('Secret token does not match:', token, this.secretToken);
                    }
                }
                else
                    debug('Path does not match:', req.url, this.hookPath);
            }
            else
                debug('Unexpected request method, not POST. Received:', req.method);
            return false;
        };
        this.handleError = (err, ctx) => {
            // set exit code to emulate `warn-with-error-code` behavior of
            // https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode
            // to prevent a clean exit despite an error being thrown
            process.exitCode = 1;
            console.error('Unhandled error while processing', ctx.update);
            throw err;
        };
        // @ts-expect-error Trust me, TS
        this.options = {
            ...DEFAULT_OPTIONS,
            ...(0, compact_1.compactOptions)(options),
        };
        this.telegram = new telegram_1.default(token, this.options.telegram);
        debug('Created a `Telegraf` instance');
    }
    get token() {
        return this.telegram.token;
    }
    /** @deprecated use `ctx.telegram.webhookReply` */
    set webhookReply(webhookReply) {
        this.telegram.webhookReply = webhookReply;
    }
    /** @deprecated use `ctx.telegram.webhookReply` */
    get webhookReply() {
        return this.telegram.webhookReply;
    }
    /**
     * _Override_ error handling
     */
    catch(handler) {
        this.handleError = handler;
        return this;
    }
    /**
     * You must call `bot.telegram.setWebhook` for this to work.
     * You should probably use {@link Telegraf.createWebhook} instead.
     */
    webhookCallback(hookPath = '/', opts = {}) {
        const { secretToken } = opts;
        return (0, webhook_1.default)(this.webhookFilter.bind({ hookPath, secretToken }), (update, res) => this.handleUpdate(update, res));
    }
    getDomainOpts(opts) {
        var _a;
        const protocol = opts.domain.startsWith('https://') || opts.domain.startsWith('http://');
        if (protocol)
            debug('Unexpected protocol in domain, telegraf will use https:', opts.domain);
        const domain = protocol ? new url_1.URL(opts.domain).host : opts.domain;
        const path = (_a = opts.path) !== null && _a !== void 0 ? _a : `/telegraf/${this.secretPathComponent()}`;
        const url = `https://${domain}${path}`;
        return { domain, path, url };
    }
    /**
     * Specify a url to receive incoming updates via webhook.
     * Returns an Express-style middleware you can pass to app.use()
     */
    async createWebhook(opts) {
        const { domain, path, ...extra } = opts;
        const domainOpts = this.getDomainOpts({ domain, path });
        await this.telegram.setWebhook(domainOpts.url, extra);
        debug(`Webhook set to ${domainOpts.url}`);
        return this.webhookCallback(domainOpts.path, {
            secretToken: extra.secret_token,
        });
    }
    startPolling(allowedUpdates = []) {
        this.polling = new polling_1.Polling(this.telegram, allowedUpdates);
        return this.polling.loop(async (update) => {
            await this.handleUpdate(update);
        });
    }
    startWebhook(hookPath, tlsOptions, port, host, cb, secretToken) {
        const webhookCb = this.webhookCallback(hookPath, { secretToken });
        const callback = typeof cb === 'function'
            ? (req, res) => webhookCb(req, res, () => cb(req, res))
            : webhookCb;
        this.webhookServer =
            tlsOptions != null
                ? https.createServer(tlsOptions, callback)
                : http.createServer(callback);
        this.webhookServer.listen(port, host, () => {
            debug('Webhook listening on port: %s', port);
        });
        return this;
    }
    secretPathComponent() {
        return crypto
            .createHash('sha3-256')
            .update(this.token)
            .update(process.version) // salt
            .digest('hex');
    }
    /**
     * @see https://github.com/telegraf/telegraf/discussions/1344#discussioncomment-335700
     */
    async launch(config = {}) {
        var _a;
        debug('Connecting to Telegram');
        (_a = this.botInfo) !== null && _a !== void 0 ? _a : (this.botInfo = await this.telegram.getMe());
        debug(`Launching @${this.botInfo.username}`);
        if (config.webhook === undefined) {
            await this.telegram.deleteWebhook({
                drop_pending_updates: config.dropPendingUpdates,
            });
            debug('Bot started with long polling');
            await this.startPolling(config.allowedUpdates);
            return;
        }
        const domainOpts = this.getDomainOpts({
            domain: config.webhook.domain,
            path: config.webhook.hookPath,
        });
        const { tlsOptions, port, host, cb, secretToken } = config.webhook;
        this.startWebhook(domainOpts.path, tlsOptions, port, host, cb, secretToken);
        await this.telegram.setWebhook(domainOpts.url, {
            drop_pending_updates: config.dropPendingUpdates,
            allowed_updates: config.allowedUpdates,
            ip_address: config.webhook.ipAddress,
            max_connections: config.webhook.maxConnections,
            secret_token: config.webhook.secretToken,
            certificate: config.webhook.certificate,
        });
        debug(`Bot started with webhook @ ${domainOpts.url}`);
    }
    stop(reason = 'unspecified') {
        var _a, _b;
        debug('Stopping bot... Reason:', reason);
        // https://github.com/telegraf/telegraf/pull/1224#issuecomment-742693770
        if (this.polling === undefined && this.webhookServer === undefined) {
            throw new Error('Bot is not running!');
        }
        (_a = this.webhookServer) === null || _a === void 0 ? void 0 : _a.close();
        (_b = this.polling) === null || _b === void 0 ? void 0 : _b.stop();
    }
    async handleUpdate(update, webhookResponse) {
        var _a, _b;
        (_a = this.botInfo) !== null && _a !== void 0 ? _a : (this.botInfo = (debug('Update %d is waiting for `botInfo` to be initialized', update.update_id),
            await ((_b = this.botInfoCall) !== null && _b !== void 0 ? _b : (this.botInfoCall = this.telegram.getMe()))));
        debug('Processing update', update.update_id);
        const tg = new telegram_1.default(this.token, this.telegram.options, webhookResponse);
        const TelegrafContext = this.options.contextType;
        const ctx = new TelegrafContext(update, tg, this.botInfo);
        Object.assign(ctx, this.context);
        try {
            await (0, p_timeout_1.default)(Promise.resolve(this.middleware()(ctx, anoop)), this.options.handlerTimeout);
        }
        catch (err) {
            return await this.handleError(err, ctx);
        }
        finally {
            if ((webhookResponse === null || webhookResponse === void 0 ? void 0 : webhookResponse.writableEnded) === false) {
                webhookResponse.end();
            }
            debug('Finished processing update', update.update_id);
        }
    }
}
exports.Telegraf = Telegraf;
