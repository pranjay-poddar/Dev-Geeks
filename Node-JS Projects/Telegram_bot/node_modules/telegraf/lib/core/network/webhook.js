"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('telegraf:webhook');
function generateWebhook(filter, updateHandler) {
    return async (req, res, next = () => {
        res.statusCode = 403;
        debug('Replying with status code', res.statusCode);
        res.end();
    }) => {
        debug('Incoming request', req.method, req.url);
        if (!filter(req)) {
            debug('Webhook filter failed', req.method, req.url);
            return next();
        }
        let update;
        try {
            if (req.body != null) {
                /* If req.body is already set, we expect it to be the parsed
                 request body (update object) received from Telegram
                 However, some libraries such as `serverless-http` set req.body to the
                 raw buffer, so we'll handle that additionally */
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let body = req.body;
                // if body is Buffer, parse it into string
                if (body instanceof Buffer)
                    body = String(req.body);
                // if body is string, parse it into object
                if (typeof body === 'string')
                    body = JSON.parse(body);
                update = body;
            }
            else {
                let body = '';
                // parse each buffer to string and append to body
                for await (const chunk of req)
                    body += String(chunk);
                // parse body to object
                update = JSON.parse(body);
            }
        }
        catch (error) {
            // if any of the parsing steps fails, give up and respond with error
            res.writeHead(415).end();
            debug('Failed to parse request body:', error);
            return;
        }
        return await updateHandler(update, res);
    };
}
exports.default = generateWebhook;
