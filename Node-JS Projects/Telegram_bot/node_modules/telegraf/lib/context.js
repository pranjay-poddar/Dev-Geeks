"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const debug_1 = __importDefault(require("debug"));
const debug = (0, debug_1.default)('telegraf:context');
class Context {
    constructor(update, telegram, botInfo) {
        this.update = update;
        this.telegram = telegram;
        this.botInfo = botInfo;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.state = {};
    }
    get updateType() {
        for (const key in this.update) {
            if (typeof this.update[key] === 'object')
                return key;
        }
        throw new Error(`Cannot determine \`updateType\` of ${JSON.stringify(this.update)}`);
    }
    get me() {
        var _a;
        return (_a = this.botInfo) === null || _a === void 0 ? void 0 : _a.username;
    }
    /**
     * @deprecated Use ctx.telegram instead
     */
    get tg() {
        return this.telegram;
    }
    get message() {
        return this.update.message;
    }
    get editedMessage() {
        return this.update.edited_message;
    }
    get inlineQuery() {
        return this.update.inline_query;
    }
    get shippingQuery() {
        return this.update.shipping_query;
    }
    get preCheckoutQuery() {
        return this.update.pre_checkout_query;
    }
    get chosenInlineResult() {
        return this.update.chosen_inline_result;
    }
    get channelPost() {
        return this.update.channel_post;
    }
    get editedChannelPost() {
        return this.update.edited_channel_post;
    }
    get callbackQuery() {
        return this.update.callback_query;
    }
    get poll() {
        return this.update.poll;
    }
    get pollAnswer() {
        return this.update.poll_answer;
    }
    get myChatMember() {
        return this.update.my_chat_member;
    }
    get chatMember() {
        return this.update.chat_member;
    }
    get chatJoinRequest() {
        return this.update.chat_join_request;
    }
    get chat() {
        var _a, _b, _c, _d;
        return (_d = ((_c = (_b = (_a = this.chatMember) !== null && _a !== void 0 ? _a : this.myChatMember) !== null && _b !== void 0 ? _b : this.chatJoinRequest) !== null && _c !== void 0 ? _c : getMessageFromAnySource(this))) === null || _d === void 0 ? void 0 : _d.chat;
    }
    get senderChat() {
        var _a;
        return (_a = getMessageFromAnySource(this)) === null || _a === void 0 ? void 0 : _a.sender_chat;
    }
    get from() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        return (_j = ((_h = (_g = (_f = (_e = (_d = (_c = (_b = (_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineQuery) !== null && _b !== void 0 ? _b : this.shippingQuery) !== null && _c !== void 0 ? _c : this.preCheckoutQuery) !== null && _d !== void 0 ? _d : this.chosenInlineResult) !== null && _e !== void 0 ? _e : this.chatMember) !== null && _f !== void 0 ? _f : this.myChatMember) !== null && _g !== void 0 ? _g : this.chatJoinRequest) !== null && _h !== void 0 ? _h : getMessageFromAnySource(this))) === null || _j === void 0 ? void 0 : _j.from;
    }
    get inlineMessageId() {
        var _a, _b;
        return (_b = ((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.chosenInlineResult)) === null || _b === void 0 ? void 0 : _b.inline_message_id;
    }
    get passportData() {
        var _a;
        if (this.message == null)
            return undefined;
        // @ts-expect-error Bug in TS 4.9+, fix will land in 5.0 https://github.com/microsoft/TypeScript/pull/51502
        if (!('passport_data' in this.message))
            return undefined;
        return (_a = this.message) === null || _a === void 0 ? void 0 : _a.passport_data;
    }
    get webAppData() {
        if (!('message' in this.update &&
            this.update.message &&
            'web_app_data' in this.update.message))
            return undefined;
        const { data, button_text } = this.update.message.web_app_data;
        return {
            data: {
                json() {
                    return JSON.parse(data);
                },
                text() {
                    return data;
                },
            },
            button_text,
        };
    }
    /**
     * @deprecated use {@link Telegram.webhookReply}
     */
    get webhookReply() {
        return this.telegram.webhookReply;
    }
    set webhookReply(enable) {
        this.telegram.webhookReply = enable;
    }
    /**
     * @internal
     */
    assert(value, method) {
        if (value === undefined) {
            throw new TypeError(`Telegraf: "${method}" isn't available for "${this.updateType}"`);
        }
    }
    has(filters) {
        if (!Array.isArray(filters))
            filters = [filters];
        for (const filter of filters)
            if (
            // TODO: this should change to === 'function' once TS bug is fixed
            // https://github.com/microsoft/TypeScript/pull/51502
            typeof filter !== 'string'
                ? // filter is a type guard
                    filter(this.update)
                : // check if filter is the update type
                    filter in this.update)
                return true;
        return false;
    }
    /**
     * @see https://core.telegram.org/bots/api#answerinlinequery
     */
    answerInlineQuery(...args) {
        this.assert(this.inlineQuery, 'answerInlineQuery');
        return this.telegram.answerInlineQuery(this.inlineQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerCbQuery(...args) {
        this.assert(this.callbackQuery, 'answerCbQuery');
        return this.telegram.answerCbQuery(this.callbackQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerGameQuery(...args) {
        this.assert(this.callbackQuery, 'answerGameQuery');
        return this.telegram.answerGameQuery(this.callbackQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answershippingquery
     */
    answerShippingQuery(...args) {
        this.assert(this.shippingQuery, 'answerShippingQuery');
        return this.telegram.answerShippingQuery(this.shippingQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#answerprecheckoutquery
     */
    answerPreCheckoutQuery(...args) {
        this.assert(this.preCheckoutQuery, 'answerPreCheckoutQuery');
        return this.telegram.answerPreCheckoutQuery(this.preCheckoutQuery.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    editMessageText(text, extra) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'editMessageText');
        return this.telegram.editMessageText((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, text, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagecaption
     */
    editMessageCaption(caption, extra) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'editMessageCaption');
        return this.telegram.editMessageCaption((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, caption, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagemedia
     */
    editMessageMedia(media, extra) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'editMessageMedia');
        return this.telegram.editMessageMedia((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, media, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagereplymarkup
     */
    editMessageReplyMarkup(markup) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'editMessageReplyMarkup');
        return this.telegram.editMessageReplyMarkup((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, markup);
    }
    /**
     * @see https://core.telegram.org/bots/api#editmessagelivelocation
     */
    editMessageLiveLocation(latitude, longitude, extra) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'editMessageLiveLocation');
        return this.telegram.editMessageLiveLocation((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, latitude, longitude, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#stopmessagelivelocation
     */
    stopMessageLiveLocation(markup) {
        var _a, _b, _c, _d;
        this.assert((_a = this.callbackQuery) !== null && _a !== void 0 ? _a : this.inlineMessageId, 'stopMessageLiveLocation');
        return this.telegram.stopMessageLiveLocation((_b = this.chat) === null || _b === void 0 ? void 0 : _b.id, (_d = (_c = this.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) === null || _d === void 0 ? void 0 : _d.message_id, this.inlineMessageId, markup);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    sendMessage(text, extra) {
        this.assert(this.chat, 'sendMessage');
        return this.telegram.sendMessage(this.chat.id, text, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    reply(...args) {
        return this.sendMessage(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchat
     */
    getChat(...args) {
        this.assert(this.chat, 'getChat');
        return this.telegram.getChat(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#exportchatinvitelink
     */
    exportChatInviteLink(...args) {
        this.assert(this.chat, 'exportChatInviteLink');
        return this.telegram.exportChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#createchatinvitelink
     */
    createChatInviteLink(...args) {
        this.assert(this.chat, 'createChatInviteLink');
        return this.telegram.createChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#editchatinvitelink
     */
    editChatInviteLink(...args) {
        this.assert(this.chat, 'editChatInviteLink');
        return this.telegram.editChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#revokechatinvitelink
     */
    revokeChatInviteLink(...args) {
        this.assert(this.chat, 'revokeChatInviteLink');
        return this.telegram.revokeChatInviteLink(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     */
    banChatMember(...args) {
        this.assert(this.chat, 'banChatMember');
        return this.telegram.banChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     * @deprecated since API 5.3. Use {@link Context.banChatMember}
     */
    get kickChatMember() {
        return this.banChatMember;
    }
    /**
     * @see https://core.telegram.org/bots/api#unbanchatmember
     */
    unbanChatMember(...args) {
        this.assert(this.chat, 'unbanChatMember');
        return this.telegram.unbanChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#restrictchatmember
     */
    restrictChatMember(...args) {
        this.assert(this.chat, 'restrictChatMember');
        return this.telegram.restrictChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#promotechatmember
     */
    promoteChatMember(...args) {
        this.assert(this.chat, 'promoteChatMember');
        return this.telegram.promoteChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
     */
    setChatAdministratorCustomTitle(...args) {
        this.assert(this.chat, 'setChatAdministratorCustomTitle');
        return this.telegram.setChatAdministratorCustomTitle(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatphoto
     */
    setChatPhoto(...args) {
        this.assert(this.chat, 'setChatPhoto');
        return this.telegram.setChatPhoto(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatphoto
     */
    deleteChatPhoto(...args) {
        this.assert(this.chat, 'deleteChatPhoto');
        return this.telegram.deleteChatPhoto(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchattitle
     */
    setChatTitle(...args) {
        this.assert(this.chat, 'setChatTitle');
        return this.telegram.setChatTitle(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatdescription
     */
    setChatDescription(...args) {
        this.assert(this.chat, 'setChatDescription');
        return this.telegram.setChatDescription(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#pinchatmessage
     */
    pinChatMessage(...args) {
        this.assert(this.chat, 'pinChatMessage');
        return this.telegram.pinChatMessage(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinchatmessage
     */
    unpinChatMessage(...args) {
        this.assert(this.chat, 'unpinChatMessage');
        return this.telegram.unpinChatMessage(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#unpinallchatmessages
     */
    unpinAllChatMessages(...args) {
        this.assert(this.chat, 'unpinAllChatMessages');
        return this.telegram.unpinAllChatMessages(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#leavechat
     */
    leaveChat(...args) {
        this.assert(this.chat, 'leaveChat');
        return this.telegram.leaveChat(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatpermissions
     */
    setChatPermissions(...args) {
        this.assert(this.chat, 'setChatPermissions');
        return this.telegram.setChatPermissions(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatadministrators
     */
    getChatAdministrators(...args) {
        this.assert(this.chat, 'getChatAdministrators');
        return this.telegram.getChatAdministrators(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmember
     */
    getChatMember(...args) {
        this.assert(this.chat, 'getChatMember');
        return this.telegram.getChatMember(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#getchatmembercount
     */
    getChatMembersCount(...args) {
        this.assert(this.chat, 'getChatMembersCount');
        return this.telegram.getChatMembersCount(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#setpassportdataerrors
     */
    setPassportDataErrors(errors) {
        this.assert(this.from, 'setPassportDataErrors');
        return this.telegram.setPassportDataErrors(this.from.id, errors);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendphoto
     */
    sendPhoto(photo, extra) {
        this.assert(this.chat, 'sendPhoto');
        return this.telegram.sendPhoto(this.chat.id, photo, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendphoto
     */
    replyWithPhoto(...args) {
        return this.sendPhoto(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmediagroup
     */
    sendMediaGroup(media, extra) {
        this.assert(this.chat, 'sendMediaGroup');
        return this.telegram.sendMediaGroup(this.chat.id, media, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmediagroup
     */
    replyWithMediaGroup(...args) {
        return this.sendMediaGroup(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendaudio
     */
    sendAudio(audio, extra) {
        this.assert(this.chat, 'sendAudio');
        return this.telegram.sendAudio(this.chat.id, audio, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendaudio
     */
    replyWithAudio(...args) {
        return this.sendAudio(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#senddice
     */
    sendDice(extra) {
        this.assert(this.chat, 'sendDice');
        return this.telegram.sendDice(this.chat.id, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#senddice
     */
    replyWithDice(...args) {
        return this.sendDice(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#senddocument
     */
    sendDocument(document, extra) {
        this.assert(this.chat, 'sendDocument');
        return this.telegram.sendDocument(this.chat.id, document, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#senddocument
     */
    replyWithDocument(...args) {
        return this.sendDocument(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendsticker
     */
    sendSticker(sticker, extra) {
        this.assert(this.chat, 'sendSticker');
        return this.telegram.sendSticker(this.chat.id, sticker, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendsticker
     */
    replyWithSticker(...args) {
        return this.sendSticker(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideo
     */
    sendVideo(video, extra) {
        this.assert(this.chat, 'sendVideo');
        return this.telegram.sendVideo(this.chat.id, video, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideo
     */
    replyWithVideo(...args) {
        return this.sendVideo(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendanimation
     */
    sendAnimation(animation, extra) {
        this.assert(this.chat, 'sendAnimation');
        return this.telegram.sendAnimation(this.chat.id, animation, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendanimation
     */
    replyWithAnimation(...args) {
        return this.sendAnimation(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    sendVideoNote(videoNote, extra) {
        this.assert(this.chat, 'sendVideoNote');
        return this.telegram.sendVideoNote(this.chat.id, videoNote, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    replyWithVideoNote(...args) {
        return this.sendVideoNote(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendinvoice
     */
    sendInvoice(invoice, extra) {
        this.assert(this.chat, 'sendInvoice');
        return this.telegram.sendInvoice(this.chat.id, invoice, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendinvoice
     */
    replyWithInvoice(...args) {
        return this.sendInvoice(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendgame
     */
    sendGame(game, extra) {
        this.assert(this.chat, 'sendGame');
        return this.telegram.sendGame(this.chat.id, game, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendgame
     */
    replyWithGame(...args) {
        return this.sendGame(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvoice
     */
    sendVoice(voice, extra) {
        this.assert(this.chat, 'sendVoice');
        return this.telegram.sendVoice(this.chat.id, voice, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvoice
     */
    replyWithVoice(...args) {
        return this.sendVoice(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    sendPoll(poll, options, extra) {
        this.assert(this.chat, 'sendPoll');
        return this.telegram.sendPoll(this.chat.id, poll, options, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    replyWithPoll(...args) {
        return this.sendPoll(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    sendQuiz(quiz, options, extra) {
        this.assert(this.chat, 'sendQuiz');
        return this.telegram.sendQuiz(this.chat.id, quiz, options, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    replyWithQuiz(...args) {
        return this.sendQuiz(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#stoppoll
     */
    stopPoll(...args) {
        this.assert(this.chat, 'stopPoll');
        return this.telegram.stopPoll(this.chat.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendchataction
     */
    sendChatAction(action, extra) {
        this.assert(this.chat, 'sendChatAction');
        return this.telegram.sendChatAction(this.chat.id, action, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendchataction
     *
     * Sends the sendChatAction request repeatedly, with a delay between requests,
     * as long as the provided callback function is being processed.
     *
     * The sendChatAction errors should be ignored, because the goal is the actual long process completing and performing an action.
     *
     * @param action - chat action type.
     * @param callback - a function to run along with the chat action.
     * @param extra - extra parameters for sendChatAction.
     * @param {number} [extra.intervalDuration=8000] - The duration (in milliseconds) between subsequent sendChatAction requests.
     */
    async persistentChatAction(action, callback, { intervalDuration, ...extra } = {}) {
        await this.sendChatAction(action, { ...extra });
        const timer = setInterval(() => this.sendChatAction(action, { ...extra }).catch((err) => {
            debug('Ignored error while persisting sendChatAction:', err);
        }), intervalDuration !== null && intervalDuration !== void 0 ? intervalDuration : 4000);
        try {
            await callback();
        }
        finally {
            clearInterval(timer);
        }
    }
    /**
     * @deprecated use {@link Context.sendChatAction} instead
     * @see https://core.telegram.org/bots/api#sendchataction
     */
    replyWithChatAction(...args) {
        return this.sendChatAction(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendlocation
     */
    sendLocation(latitude, longitude, extra) {
        this.assert(this.chat, 'sendLocation');
        return this.telegram.sendLocation(this.chat.id, latitude, longitude, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendlocation
     */
    replyWithLocation(...args) {
        return this.sendLocation(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    sendVenue(latitude, longitude, title, address, extra) {
        this.assert(this.chat, 'sendVenue');
        return this.telegram.sendVenue(this.chat.id, latitude, longitude, title, address, { message_thread_id: getThreadId(this), ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    replyWithVenue(...args) {
        return this.sendVenue(...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#sendcontact
     */
    sendContact(phoneNumber, firstName, extra) {
        this.assert(this.chat, 'sendContact');
        return this.telegram.sendContact(this.chat.id, phoneNumber, firstName, {
            message_thread_id: getThreadId(this),
            ...extra,
        });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendcontact
     */
    replyWithContact(...args) {
        return this.sendContact(...args);
    }
    /**
     * @deprecated use {@link Telegram.getStickerSet}
     * @see https://core.telegram.org/bots/api#getstickerset
     */
    getStickerSet(setName) {
        return this.telegram.getStickerSet(setName);
    }
    /**
     * @see https://core.telegram.org/bots/api#setchatstickerset
     */
    setChatStickerSet(setName) {
        this.assert(this.chat, 'setChatStickerSet');
        return this.telegram.setChatStickerSet(this.chat.id, setName);
    }
    /**
     * @see https://core.telegram.org/bots/api#deletechatstickerset
     */
    deleteChatStickerSet() {
        this.assert(this.chat, 'deleteChatStickerSet');
        return this.telegram.deleteChatStickerSet(this.chat.id);
    }
    /**
     * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
     * to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a
     * ForumTopic object.
     *
     * @see https://core.telegram.org/bots/api#createforumtopic
     */
    createForumTopic(...args) {
        this.assert(this.chat, 'createForumTopic');
        return this.telegram.createForumTopic(this.chat.id, ...args);
    }
    /**
     * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
     * topic. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#editforumtopic
     */
    editForumTopic(extra) {
        var _a;
        this.assert(this.chat, 'editForumTopic');
        this.assert((_a = this.message) === null || _a === void 0 ? void 0 : _a.message_thread_id, 'editForumTopic');
        return this.telegram.editForumTopic(this.chat.id, this.message.message_thread_id, extra);
    }
    /**
     * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#closeforumtopic
     */
    closeForumTopic() {
        var _a;
        this.assert(this.chat, 'closeForumTopic');
        this.assert((_a = this.message) === null || _a === void 0 ? void 0 : _a.message_thread_id, 'closeForumTopic');
        return this.telegram.closeForumTopic(this.chat.id, this.message.message_thread_id);
    }
    /**
     * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#reopenforumtopic
     */
    reopenForumTopic() {
        var _a;
        this.assert(this.chat, 'reopenForumTopic');
        this.assert((_a = this.message) === null || _a === void 0 ? void 0 : _a.message_thread_id, 'reopenForumTopic');
        return this.telegram.reopenForumTopic(this.chat.id, this.message.message_thread_id);
    }
    /**
     * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
     * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#deleteforumtopic
     */
    deleteForumTopic() {
        var _a;
        this.assert(this.chat, 'deleteForumTopic');
        this.assert((_a = this.message) === null || _a === void 0 ? void 0 : _a.message_thread_id, 'deleteForumTopic');
        return this.telegram.deleteForumTopic(this.chat.id, this.message.message_thread_id);
    }
    /**
     * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
     * for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
     */
    unpinAllForumTopicMessages() {
        var _a;
        this.assert(this.chat, 'unpinAllForumTopicMessages');
        this.assert((_a = this.message) === null || _a === void 0 ? void 0 : _a.message_thread_id, 'unpinAllForumTopicMessages');
        return this.telegram.unpinAllForumTopicMessages(this.chat.id, this.message.message_thread_id);
    }
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator
     * in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#editgeneralforumtopic
     */
    editGeneralForumTopic(name) {
        this.assert(this.chat, 'editGeneralForumTopic');
        return this.telegram.editGeneralForumTopic(this.chat.id, name);
    }
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#closegeneralforumtopic
     */
    closeGeneralForumTopic() {
        this.assert(this.chat, 'closeGeneralForumTopic');
        return this.telegram.closeGeneralForumTopic(this.chat.id);
    }
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically
     * unhidden if it was hidden. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
     */
    reopenGeneralForumTopic() {
        this.assert(this.chat, 'reopenGeneralForumTopic');
        return this.telegram.reopenGeneralForumTopic(this.chat.id);
    }
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed
     * if it was open. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
     */
    hideGeneralForumTopic() {
        this.assert(this.chat, 'hideGeneralForumTopic');
        return this.telegram.hideGeneralForumTopic(this.chat.id);
    }
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
     */
    unhideGeneralForumTopic() {
        this.assert(this.chat, 'unhideGeneralForumTopic');
        return this.telegram.unhideGeneralForumTopic(this.chat.id);
    }
    /**
     * @deprecated use {@link Telegram.setStickerPositionInSet}
     * @see https://core.telegram.org/bots/api#setstickerpositioninset
     */
    setStickerPositionInSet(sticker, position) {
        return this.telegram.setStickerPositionInSet(sticker, position);
    }
    /**
     * @deprecated use {@link Telegram.setStickerSetThumb}
     * @see https://core.telegram.org/bots/api#setstickersetthumb
     */
    setStickerSetThumb(...args) {
        return this.telegram.setStickerSetThumb(...args);
    }
    /**
     * @deprecated use {@link Telegram.deleteStickerFromSet}
     * @see https://core.telegram.org/bots/api#deletestickerfromset
     */
    deleteStickerFromSet(sticker) {
        return this.telegram.deleteStickerFromSet(sticker);
    }
    /**
     * @see https://core.telegram.org/bots/api#uploadstickerfile
     */
    uploadStickerFile(...args) {
        this.assert(this.from, 'uploadStickerFile');
        return this.telegram.uploadStickerFile(this.from.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#createnewstickerset
     */
    createNewStickerSet(...args) {
        this.assert(this.from, 'createNewStickerSet');
        return this.telegram.createNewStickerSet(this.from.id, ...args);
    }
    /**
     * @see https://core.telegram.org/bots/api#addstickertoset
     */
    addStickerToSet(...args) {
        this.assert(this.from, 'addStickerToSet');
        return this.telegram.addStickerToSet(this.from.id, ...args);
    }
    /**
     * @deprecated use {@link Telegram.getMyCommands}
     * @see https://core.telegram.org/bots/api#getmycommands
     */
    getMyCommands() {
        return this.telegram.getMyCommands();
    }
    /**
     * @deprecated use {@link Telegram.setMyCommands}
     * @see https://core.telegram.org/bots/api#setmycommands
     */
    setMyCommands(commands) {
        return this.telegram.setMyCommands(commands);
    }
    /**
     * @deprecated use {@link Context.replyWithMarkdownV2}
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdown(markdown, extra) {
        return this.reply(markdown, { parse_mode: 'Markdown', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdownV2(markdown, extra) {
        return this.reply(markdown, { parse_mode: 'MarkdownV2', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithHTML(html, extra) {
        return this.reply(html, { parse_mode: 'HTML', ...extra });
    }
    /**
     * @see https://core.telegram.org/bots/api#deletemessage
     */
    deleteMessage(messageId) {
        this.assert(this.chat, 'deleteMessage');
        if (typeof messageId !== 'undefined') {
            return this.telegram.deleteMessage(this.chat.id, messageId);
        }
        const message = getMessageFromAnySource(this);
        this.assert(message, 'deleteMessage');
        return this.telegram.deleteMessage(this.chat.id, message.message_id);
    }
    /**
     * @see https://core.telegram.org/bots/api#forwardmessage
     */
    forwardMessage(chatId, extra) {
        const message = getMessageFromAnySource(this);
        this.assert(message, 'forwardMessage');
        return this.telegram.forwardMessage(chatId, message.chat.id, message.message_id, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#copymessage
     */
    copyMessage(chatId, extra) {
        const message = getMessageFromAnySource(this);
        this.assert(message, 'copyMessage');
        return this.telegram.copyMessage(chatId, message.chat.id, message.message_id, extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approveChatJoinRequest(userId) {
        this.assert(this.chat, 'approveChatJoinRequest');
        return this.telegram.approveChatJoinRequest(this.chat.id, userId);
    }
    /**
     * @see https://core.telegram.org/bots/api#declinechatjoinrequest
     */
    declineChatJoinRequest(userId) {
        this.assert(this.chat, 'declineChatJoinRequest');
        return this.telegram.declineChatJoinRequest(this.chat.id, userId);
    }
    /**
     * @see https://core.telegram.org/bots/api#banchatsenderchat
     */
    banChatSenderChat(senderChatId) {
        this.assert(this.chat, 'banChatSenderChat');
        return this.telegram.banChatSenderChat(this.chat.id, senderChatId);
    }
    /**
     * @see https://core.telegram.org/bots/api#unbanchatsenderchat
     */
    unbanChatSenderChat(senderChatId) {
        this.assert(this.chat, 'unbanChatSenderChat');
        return this.telegram.unbanChatSenderChat(this.chat.id, senderChatId);
    }
    /**
     * Use this method to change the bot's menu button in the current private chat. Returns true on success.
     * @see https://core.telegram.org/bots/api#setchatmenubutton
     */
    setChatMenuButton(menuButton) {
        this.assert(this.chat, 'setChatMenuButton');
        return this.telegram.setChatMenuButton({ chatId: this.chat.id, menuButton });
    }
    /**
     * Use this method to get the current value of the bot's menu button in the current private chat. Returns MenuButton on success.
     * @see https://core.telegram.org/bots/api#getchatmenubutton
     */
    getChatMenuButton() {
        this.assert(this.chat, 'getChatMenuButton');
        return this.telegram.getChatMenuButton({ chatId: this.chat.id });
    }
    /**
     * @see https://core.telegram.org/bots/api#setmydefaultadministratorrights
     */
    setMyDefaultAdministratorRights(extra) {
        return this.telegram.setMyDefaultAdministratorRights(extra);
    }
    /**
     * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
     */
    getMyDefaultAdministratorRights(extra) {
        return this.telegram.getMyDefaultAdministratorRights(extra);
    }
}
exports.Context = Context;
exports.default = Context;
function getMessageFromAnySource(ctx) {
    var _a, _b, _c, _d, _e;
    return ((_e = (_d = (_b = (_a = ctx.message) !== null && _a !== void 0 ? _a : ctx.editedMessage) !== null && _b !== void 0 ? _b : (_c = ctx.callbackQuery) === null || _c === void 0 ? void 0 : _c.message) !== null && _d !== void 0 ? _d : ctx.channelPost) !== null && _e !== void 0 ? _e : ctx.editedChannelPost);
}
const getThreadId = (ctx) => {
    const msg = getMessageFromAnySource(ctx);
    return (msg === null || msg === void 0 ? void 0 : msg.is_topic_message) ? msg.message_thread_id : undefined;
};
