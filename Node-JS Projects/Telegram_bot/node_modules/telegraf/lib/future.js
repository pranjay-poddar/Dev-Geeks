"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNewReplies = void 0;
function makeReply(ctx, extra) {
    var _a;
    const reply_to_message_id = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.message_id;
    return { reply_to_message_id, ...extra };
}
const replyContext = {
    replyWithChatAction: function () {
        throw new TypeError('ctx.replyWithChatAction has been removed, use ctx.sendChatAction instead');
    },
    reply(text, extra) {
        this.assert(this.chat, 'reply');
        return this.telegram.sendMessage(this.chat.id, text, makeReply(this, extra));
    },
    replyWithAnimation(animation, extra) {
        this.assert(this.chat, 'replyWithAnimation');
        return this.telegram.sendAnimation(this.chat.id, animation, makeReply(this, extra));
    },
    replyWithAudio(audio, extra) {
        this.assert(this.chat, 'replyWithAudio');
        return this.telegram.sendAudio(this.chat.id, audio, makeReply(this, extra));
    },
    replyWithContact(phoneNumber, firstName, extra) {
        this.assert(this.chat, 'replyWithContact');
        return this.telegram.sendContact(this.chat.id, phoneNumber, firstName, makeReply(this, extra));
    },
    replyWithDice(extra) {
        this.assert(this.chat, 'replyWithDice');
        return this.telegram.sendDice(this.chat.id, makeReply(this, extra));
    },
    replyWithDocument(document, extra) {
        this.assert(this.chat, 'replyWithDocument');
        return this.telegram.sendDocument(this.chat.id, document, makeReply(this, extra));
    },
    replyWithGame(gameName, extra) {
        this.assert(this.chat, 'replyWithGame');
        return this.telegram.sendGame(this.chat.id, gameName, makeReply(this, extra));
    },
    replyWithHTML(html, extra) {
        var _a;
        this.assert(this.chat, 'replyWithHTML');
        return this.telegram.sendMessage(this.chat.id, html, {
            parse_mode: 'HTML',
            reply_to_message_id: (_a = this.message) === null || _a === void 0 ? void 0 : _a.message_id,
            ...extra,
        });
    },
    replyWithInvoice(invoice, extra) {
        this.assert(this.chat, 'replyWithInvoice');
        return this.telegram.sendInvoice(this.chat.id, invoice, makeReply(this, extra));
    },
    replyWithLocation(latitude, longitude, extra) {
        this.assert(this.chat, 'replyWithLocation');
        return this.telegram.sendLocation(this.chat.id, latitude, longitude, makeReply(this, extra));
    },
    replyWithMarkdown(markdown, extra) {
        var _a;
        this.assert(this.chat, 'replyWithMarkdown');
        return this.telegram.sendMessage(this.chat.id, markdown, {
            parse_mode: 'Markdown',
            reply_to_message_id: (_a = this.message) === null || _a === void 0 ? void 0 : _a.message_id,
            ...extra,
        });
    },
    replyWithMarkdownV2(markdown, extra) {
        var _a;
        this.assert(this.chat, 'replyWithMarkdownV2');
        return this.telegram.sendMessage(this.chat.id, markdown, {
            parse_mode: 'MarkdownV2',
            reply_to_message_id: (_a = this.message) === null || _a === void 0 ? void 0 : _a.message_id,
            ...extra,
        });
    },
    replyWithMediaGroup(media, extra) {
        this.assert(this.chat, 'replyWithMediaGroup');
        return this.telegram.sendMediaGroup(this.chat.id, media, makeReply(this, extra));
    },
    replyWithPhoto(photo, extra) {
        this.assert(this.chat, 'replyWithPhoto');
        return this.telegram.sendPhoto(this.chat.id, photo, makeReply(this, extra));
    },
    replyWithPoll(question, options, extra) {
        this.assert(this.chat, 'replyWithPoll');
        return this.telegram.sendPoll(this.chat.id, question, options, makeReply(this, extra));
    },
    replyWithQuiz(question, options, extra) {
        this.assert(this.chat, 'replyWithQuiz');
        return this.telegram.sendQuiz(this.chat.id, question, options, makeReply(this, extra));
    },
    replyWithSticker(sticker, extra) {
        this.assert(this.chat, 'replyWithSticker');
        return this.telegram.sendSticker(this.chat.id, sticker, makeReply(this, extra));
    },
    replyWithVenue(latitude, longitude, title, address, extra) {
        this.assert(this.chat, 'replyWithVenue');
        return this.telegram.sendVenue(this.chat.id, latitude, longitude, title, address, makeReply(this, extra));
    },
    replyWithVideo(video, extra) {
        this.assert(this.chat, 'replyWithVideo');
        return this.telegram.sendVideo(this.chat.id, video, makeReply(this, extra));
    },
    replyWithVideoNote(videoNote, extra) {
        this.assert(this.chat, 'replyWithVideoNote');
        return this.telegram.sendVideoNote(this.chat.id, videoNote, makeReply(this, extra));
    },
    replyWithVoice(voice, extra) {
        this.assert(this.chat, 'replyWithVoice');
        return this.telegram.sendVoice(this.chat.id, voice, makeReply(this, extra));
    },
};
/**
 * Sets up Context to use the new reply methods.
 * This middleware makes `ctx.reply()` and `ctx.replyWith*()` methods will actually reply to the message they are replying to.
 * Use `ctx.sendMessage()` to send a message in chat without replying to it.
 *
 * If the message to reply is deleted, `reply()` will send a normal message.
 * If the update is not a message and we are unable to reply, `reply()` will send a normal message.
 */
function useNewReplies() {
    return (ctx, next) => {
        ctx.reply = replyContext.reply;
        ctx.replyWithPhoto = replyContext.replyWithPhoto;
        ctx.replyWithMediaGroup = replyContext.replyWithMediaGroup;
        ctx.replyWithAudio = replyContext.replyWithAudio;
        ctx.replyWithDice = replyContext.replyWithDice;
        ctx.replyWithDocument = replyContext.replyWithDocument;
        ctx.replyWithSticker = replyContext.replyWithSticker;
        ctx.replyWithVideo = replyContext.replyWithVideo;
        ctx.replyWithAnimation = replyContext.replyWithAnimation;
        ctx.replyWithVideoNote = replyContext.replyWithVideoNote;
        ctx.replyWithInvoice = replyContext.replyWithInvoice;
        ctx.replyWithGame = replyContext.replyWithGame;
        ctx.replyWithVoice = replyContext.replyWithVoice;
        ctx.replyWithPoll = replyContext.replyWithPoll;
        ctx.replyWithQuiz = replyContext.replyWithQuiz;
        ctx.replyWithChatAction = replyContext.replyWithChatAction;
        ctx.replyWithLocation = replyContext.replyWithLocation;
        ctx.replyWithVenue = replyContext.replyWithVenue;
        ctx.replyWithContact = replyContext.replyWithContact;
        ctx.replyWithMarkdown = replyContext.replyWithMarkdown;
        ctx.replyWithMarkdownV2 = replyContext.replyWithMarkdownV2;
        ctx.replyWithHTML = replyContext.replyWithHTML;
        return next();
    };
}
exports.useNewReplies = useNewReplies;
