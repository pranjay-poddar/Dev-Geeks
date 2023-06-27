import Context from './context';
import { Middleware } from './middleware';
/**
 * Sets up Context to use the new reply methods.
 * This middleware makes `ctx.reply()` and `ctx.replyWith*()` methods will actually reply to the message they are replying to.
 * Use `ctx.sendMessage()` to send a message in chat without replying to it.
 *
 * If the message to reply is deleted, `reply()` will send a normal message.
 * If the update is not a message and we are unable to reply, `reply()` will send a normal message.
 */
export declare function useNewReplies<C extends Context>(): Middleware<C>;
//# sourceMappingURL=future.d.ts.map