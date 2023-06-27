import * as tg from './core/types/typegram';
import * as tt from './telegram-types';
import { Deunionize, PropOr, UnionKeys } from './deunionize';
import ApiClient from './core/network/client';
import { Guard, Guarded, MaybeArray } from './util';
import Telegram from './telegram';
import { FmtString } from './format';
type Tail<T> = T extends [unknown, ...infer U] ? U : never;
type Shorthand<FName extends Exclude<keyof Telegram, keyof ApiClient>> = Tail<Parameters<Telegram[FName]>>;
/**
 * Narrows down `C['update']` (and derived getters)
 * to specific update type `U`.
 *
 * Used by [[`Composer`]],
 * possibly useful for splitting a bot into multiple files.
 */
export type NarrowedContext<C extends Context, U extends tg.Update> = Context<U> & Omit<C, keyof Context>;
export type FilteredContext<Ctx extends Context, Filter extends tt.UpdateType | Guard<Ctx['update']>> = Filter extends tt.UpdateType ? NarrowedContext<Ctx, Extract<tg.Update, Record<Filter, object>>> : NarrowedContext<Ctx, Guarded<Filter>>;
export declare class Context<U extends Deunionize<tg.Update> = tg.Update> {
    readonly update: U;
    readonly telegram: Telegram;
    readonly botInfo: tg.UserFromGetMe;
    readonly state: Record<string | symbol, any>;
    constructor(update: U, telegram: Telegram, botInfo: tg.UserFromGetMe);
    get updateType(): Extract<UnionKeys<U>, tt.UpdateType>;
    get me(): string;
    /**
     * @deprecated Use ctx.telegram instead
     */
    get tg(): Telegram;
    get message(): PropOr<U, "message", undefined>;
    get editedMessage(): PropOr<U, "edited_message", undefined>;
    get inlineQuery(): PropOr<U, "inline_query", undefined>;
    get shippingQuery(): PropOr<U, "shipping_query", undefined>;
    get preCheckoutQuery(): PropOr<U, "pre_checkout_query", undefined>;
    get chosenInlineResult(): PropOr<U, "chosen_inline_result", undefined>;
    get channelPost(): PropOr<U, "channel_post", undefined>;
    get editedChannelPost(): PropOr<U, "edited_channel_post", undefined>;
    get callbackQuery(): PropOr<U, "callback_query", undefined>;
    get poll(): PropOr<U, "poll", undefined>;
    get pollAnswer(): PropOr<U, "poll_answer", undefined>;
    get myChatMember(): PropOr<U, "my_chat_member", undefined>;
    get chatMember(): PropOr<U, "chat_member", undefined>;
    get chatJoinRequest(): PropOr<U, "chat_join_request", undefined>;
    get chat(): Getter<U, 'chat'>;
    get senderChat(): PropOr<GetUpdateContent<U>, "sender_chat", undefined>;
    get from(): PropOr<GetUpdateContent<U>, "from", undefined>;
    get inlineMessageId(): string | undefined;
    get passportData(): tg.PassportData | undefined;
    get webAppData(): {
        data: {
            json<T>(): T;
            text(): string;
        };
        button_text: string;
    } | undefined;
    /**
     * @deprecated use {@link Telegram.webhookReply}
     */
    get webhookReply(): boolean;
    set webhookReply(enable: boolean);
    has<Filter extends tt.UpdateType | Guard<Context['update']>>(filters: MaybeArray<Filter>): this is FilteredContext<Context, Filter>;
    /**
     * @see https://core.telegram.org/bots/api#answerinlinequery
     */
    answerInlineQuery(...args: Shorthand<'answerInlineQuery'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerCbQuery(...args: Shorthand<'answerCbQuery'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#answercallbackquery
     */
    answerGameQuery(...args: Shorthand<'answerGameQuery'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#answershippingquery
     */
    answerShippingQuery(...args: Shorthand<'answerShippingQuery'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#answerprecheckoutquery
     */
    answerPreCheckoutQuery(...args: Shorthand<'answerPreCheckoutQuery'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#editmessagetext
     */
    editMessageText(text: string, extra?: tt.ExtraEditMessageText): Promise<true | (tg.Update.Edited & tg.Message.TextMessage)>;
    /**
     * @see https://core.telegram.org/bots/api#editmessagecaption
     */
    editMessageCaption(caption: string | FmtString | undefined, extra?: tt.ExtraEditMessageCaption): Promise<true | (tg.Update.Edited & tg.Message.CaptionableMessage)>;
    /**
     * @see https://core.telegram.org/bots/api#editmessagemedia
     */
    editMessageMedia(media: tt.WrapCaption<tg.InputMedia>, extra?: tt.ExtraEditMessageMedia): Promise<true | (tg.Update.Edited & tg.Message)>;
    /**
     * @see https://core.telegram.org/bots/api#editmessagereplymarkup
     */
    editMessageReplyMarkup(markup: tg.InlineKeyboardMarkup | undefined): Promise<true | (tg.Update.Edited & tg.Message)>;
    /**
     * @see https://core.telegram.org/bots/api#editmessagelivelocation
     */
    editMessageLiveLocation(latitude: number, longitude: number, extra?: tt.ExtraEditMessageLiveLocation): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    /**
     * @see https://core.telegram.org/bots/api#stopmessagelivelocation
     */
    stopMessageLiveLocation(markup?: tg.InlineKeyboardMarkup): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    sendMessage(text: string | FmtString, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    reply(...args: Shorthand<'sendMessage'>): Promise<tg.Message.TextMessage>;
    /**
     * @see https://core.telegram.org/bots/api#getchat
     */
    getChat(...args: Shorthand<'getChat'>): Promise<tg.ChatFromGetChat>;
    /**
     * @see https://core.telegram.org/bots/api#exportchatinvitelink
     */
    exportChatInviteLink(...args: Shorthand<'exportChatInviteLink'>): Promise<string>;
    /**
     * @see https://core.telegram.org/bots/api#createchatinvitelink
     */
    createChatInviteLink(...args: Shorthand<'createChatInviteLink'>): Promise<tg.ChatInviteLink>;
    /**
     * @see https://core.telegram.org/bots/api#editchatinvitelink
     */
    editChatInviteLink(...args: Shorthand<'editChatInviteLink'>): Promise<tg.ChatInviteLink>;
    /**
     * @see https://core.telegram.org/bots/api#revokechatinvitelink
     */
    revokeChatInviteLink(...args: Shorthand<'revokeChatInviteLink'>): Promise<tg.ChatInviteLink>;
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     */
    banChatMember(...args: Shorthand<'banChatMember'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#banchatmember
     * @deprecated since API 5.3. Use {@link Context.banChatMember}
     */
    get kickChatMember(): (userId: number, untilDate?: number | undefined, extra?: Omit<{
        chat_id: string | number;
        user_id: number;
        until_date?: number | undefined;
        revoke_messages?: boolean | undefined;
    }, "chat_id" | "user_id" | "until_date"> | undefined) => Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#unbanchatmember
     */
    unbanChatMember(...args: Shorthand<'unbanChatMember'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#restrictchatmember
     */
    restrictChatMember(...args: Shorthand<'restrictChatMember'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#promotechatmember
     */
    promoteChatMember(...args: Shorthand<'promoteChatMember'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#setchatadministratorcustomtitle
     */
    setChatAdministratorCustomTitle(...args: Shorthand<'setChatAdministratorCustomTitle'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#setchatphoto
     */
    setChatPhoto(...args: Shorthand<'setChatPhoto'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#deletechatphoto
     */
    deleteChatPhoto(...args: Shorthand<'deleteChatPhoto'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#setchattitle
     */
    setChatTitle(...args: Shorthand<'setChatTitle'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#setchatdescription
     */
    setChatDescription(...args: Shorthand<'setChatDescription'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#pinchatmessage
     */
    pinChatMessage(...args: Shorthand<'pinChatMessage'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#unpinchatmessage
     */
    unpinChatMessage(...args: Shorthand<'unpinChatMessage'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#unpinallchatmessages
     */
    unpinAllChatMessages(...args: Shorthand<'unpinAllChatMessages'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#leavechat
     */
    leaveChat(...args: Shorthand<'leaveChat'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#setchatpermissions
     */
    setChatPermissions(...args: Shorthand<'setChatPermissions'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#getchatadministrators
     */
    getChatAdministrators(...args: Shorthand<'getChatAdministrators'>): Promise<(tg.ChatMemberOwner | tg.ChatMemberAdministrator)[]>;
    /**
     * @see https://core.telegram.org/bots/api#getchatmember
     */
    getChatMember(...args: Shorthand<'getChatMember'>): Promise<tg.ChatMember>;
    /**
     * @see https://core.telegram.org/bots/api#getchatmembercount
     */
    getChatMembersCount(...args: Shorthand<'getChatMembersCount'>): Promise<number>;
    /**
     * @see https://core.telegram.org/bots/api#setpassportdataerrors
     */
    setPassportDataErrors(errors: readonly tg.PassportElementError[]): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#sendphoto
     */
    sendPhoto(photo: string | tg.InputFile, extra?: tt.ExtraPhoto): Promise<tg.Message.PhotoMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendphoto
     */
    replyWithPhoto(...args: Shorthand<'sendPhoto'>): Promise<tg.Message.PhotoMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendmediagroup
     */
    sendMediaGroup(media: tt.MediaGroup, extra?: tt.ExtraMediaGroup): Promise<(tg.Message.DocumentMessage | tg.Message.AudioMessage | tg.Message.PhotoMessage | tg.Message.VideoMessage)[]>;
    /**
     * @see https://core.telegram.org/bots/api#sendmediagroup
     */
    replyWithMediaGroup(...args: Shorthand<'sendMediaGroup'>): Promise<(tg.Message.DocumentMessage | tg.Message.AudioMessage | tg.Message.PhotoMessage | tg.Message.VideoMessage)[]>;
    /**
     * @see https://core.telegram.org/bots/api#sendaudio
     */
    sendAudio(audio: string | tg.InputFile, extra?: tt.ExtraAudio): Promise<tg.Message.AudioMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendaudio
     */
    replyWithAudio(...args: Shorthand<'sendAudio'>): Promise<tg.Message.AudioMessage>;
    /**
     * @see https://core.telegram.org/bots/api#senddice
     */
    sendDice(extra?: tt.ExtraDice): Promise<tg.Message.DiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#senddice
     */
    replyWithDice(...args: Shorthand<'sendDice'>): Promise<tg.Message.DiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#senddocument
     */
    sendDocument(document: string | tg.InputFile, extra?: tt.ExtraDocument): Promise<tg.Message.DocumentMessage>;
    /**
     * @see https://core.telegram.org/bots/api#senddocument
     */
    replyWithDocument(...args: Shorthand<'sendDocument'>): Promise<tg.Message.DocumentMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendsticker
     */
    sendSticker(sticker: string | tg.InputFile, extra?: tt.ExtraSticker): Promise<tg.Message.StickerMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendsticker
     */
    replyWithSticker(...args: Shorthand<'sendSticker'>): Promise<tg.Message.StickerMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvideo
     */
    sendVideo(video: string | tg.InputFile, extra?: tt.ExtraVideo): Promise<tg.Message.VideoMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvideo
     */
    replyWithVideo(...args: Shorthand<'sendVideo'>): Promise<tg.Message.VideoMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendanimation
     */
    sendAnimation(animation: string | tg.InputFile, extra?: tt.ExtraAnimation): Promise<tg.Message.AnimationMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendanimation
     */
    replyWithAnimation(...args: Shorthand<'sendAnimation'>): Promise<tg.Message.AnimationMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    sendVideoNote(videoNote: string | tg.InputFileVideoNote, extra?: tt.ExtraVideoNote): Promise<tg.Message.VideoNoteMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvideonote
     */
    replyWithVideoNote(...args: Shorthand<'sendVideoNote'>): Promise<tg.Message.VideoNoteMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendinvoice
     */
    sendInvoice(invoice: tt.NewInvoiceParameters, extra?: tt.ExtraInvoice): Promise<tg.Message.InvoiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendinvoice
     */
    replyWithInvoice(...args: Shorthand<'sendInvoice'>): Promise<tg.Message.InvoiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendgame
     */
    sendGame(game: string, extra?: tt.ExtraGame): Promise<tg.Message.GameMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendgame
     */
    replyWithGame(...args: Shorthand<'sendGame'>): Promise<tg.Message.GameMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvoice
     */
    sendVoice(voice: string | tg.InputFile, extra?: tt.ExtraVoice): Promise<tg.Message.VoiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvoice
     */
    replyWithVoice(...args: Shorthand<'sendVoice'>): Promise<tg.Message.VoiceMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    sendPoll(poll: string, options: readonly string[], extra?: tt.ExtraPoll): Promise<tg.Message.PollMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    replyWithPoll(...args: Shorthand<'sendPoll'>): Promise<tg.Message.PollMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    sendQuiz(quiz: string, options: readonly string[], extra?: tt.ExtraPoll): Promise<tg.Message.PollMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendpoll
     */
    replyWithQuiz(...args: Shorthand<'sendQuiz'>): Promise<tg.Message.PollMessage>;
    /**
     * @see https://core.telegram.org/bots/api#stoppoll
     */
    stopPoll(...args: Shorthand<'stopPoll'>): Promise<tg.Poll>;
    /**
     * @see https://core.telegram.org/bots/api#sendchataction
     */
    sendChatAction(action: Shorthand<'sendChatAction'>[0], extra?: tt.ExtraSendChatAction): Promise<true>;
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
    persistentChatAction(action: Shorthand<'sendChatAction'>[0], callback: () => Promise<void>, { intervalDuration, ...extra }?: tt.ExtraSendChatAction & {
        intervalDuration?: number;
    }): Promise<void>;
    /**
     * @deprecated use {@link Context.sendChatAction} instead
     * @see https://core.telegram.org/bots/api#sendchataction
     */
    replyWithChatAction(...args: Shorthand<'sendChatAction'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#sendlocation
     */
    sendLocation(latitude: number, longitude: number, extra?: tt.ExtraLocation): Promise<tg.Message.LocationMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendlocation
     */
    replyWithLocation(...args: Shorthand<'sendLocation'>): Promise<tg.Message.LocationMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    sendVenue(latitude: number, longitude: number, title: string, address: string, extra?: tt.ExtraVenue): Promise<tg.Message.VenueMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendvenue
     */
    replyWithVenue(...args: Shorthand<'sendVenue'>): Promise<tg.Message.VenueMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendcontact
     */
    sendContact(phoneNumber: string, firstName: string, extra?: tt.ExtraContact): Promise<tg.Message.ContactMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendcontact
     */
    replyWithContact(...args: Shorthand<'sendContact'>): Promise<tg.Message.ContactMessage>;
    /**
     * @deprecated use {@link Telegram.getStickerSet}
     * @see https://core.telegram.org/bots/api#getstickerset
     */
    getStickerSet(setName: string): Promise<tg.StickerSet>;
    /**
     * @see https://core.telegram.org/bots/api#setchatstickerset
     */
    setChatStickerSet(setName: string): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#deletechatstickerset
     */
    deleteChatStickerSet(): Promise<true>;
    /**
     * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
     * to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a
     * ForumTopic object.
     *
     * @see https://core.telegram.org/bots/api#createforumtopic
     */
    createForumTopic(...args: Shorthand<'createForumTopic'>): Promise<tg.ForumTopic>;
    /**
     * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
     * topic. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#editforumtopic
     */
    editForumTopic(extra: tt.ExtraEditForumTopic): Promise<true>;
    /**
     * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#closeforumtopic
     */
    closeForumTopic(): Promise<true>;
    /**
     * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#reopenforumtopic
     */
    reopenForumTopic(): Promise<true>;
    /**
     * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
     * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
     * Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#deleteforumtopic
     */
    deleteForumTopic(): Promise<true>;
    /**
     * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
     * for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
     */
    unpinAllForumTopicMessages(): Promise<true>;
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator
     * in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#editgeneralforumtopic
     */
    editGeneralForumTopic(name: string): Promise<true>;
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#closegeneralforumtopic
     */
    closeGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically
     * unhidden if it was hidden. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
     */
    reopenGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed
     * if it was open. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
     */
    hideGeneralForumTopic(): Promise<true>;
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
     */
    unhideGeneralForumTopic(): Promise<true>;
    /**
     * @deprecated use {@link Telegram.setStickerPositionInSet}
     * @see https://core.telegram.org/bots/api#setstickerpositioninset
     */
    setStickerPositionInSet(sticker: string, position: number): Promise<true>;
    /**
     * @deprecated use {@link Telegram.setStickerSetThumb}
     * @see https://core.telegram.org/bots/api#setstickersetthumb
     */
    setStickerSetThumb(...args: Parameters<Telegram['setStickerSetThumb']>): Promise<true>;
    /**
     * @deprecated use {@link Telegram.deleteStickerFromSet}
     * @see https://core.telegram.org/bots/api#deletestickerfromset
     */
    deleteStickerFromSet(sticker: string): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#uploadstickerfile
     */
    uploadStickerFile(...args: Shorthand<'uploadStickerFile'>): Promise<tg.File>;
    /**
     * @see https://core.telegram.org/bots/api#createnewstickerset
     */
    createNewStickerSet(...args: Shorthand<'createNewStickerSet'>): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#addstickertoset
     */
    addStickerToSet(...args: Shorthand<'addStickerToSet'>): Promise<true>;
    /**
     * @deprecated use {@link Telegram.getMyCommands}
     * @see https://core.telegram.org/bots/api#getmycommands
     */
    getMyCommands(): Promise<tg.BotCommand[]>;
    /**
     * @deprecated use {@link Telegram.setMyCommands}
     * @see https://core.telegram.org/bots/api#setmycommands
     */
    setMyCommands(commands: readonly tg.BotCommand[]): Promise<true>;
    /**
     * @deprecated use {@link Context.replyWithMarkdownV2}
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdown(markdown: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithMarkdownV2(markdown: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    /**
     * @see https://core.telegram.org/bots/api#sendmessage
     */
    replyWithHTML(html: string, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    /**
     * @see https://core.telegram.org/bots/api#deletemessage
     */
    deleteMessage(messageId?: number): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#forwardmessage
     */
    forwardMessage(chatId: string | number, extra?: Shorthand<'forwardMessage'>[2]): Promise<tg.Message>;
    /**
     * @see https://core.telegram.org/bots/api#copymessage
     */
    copyMessage(chatId: string | number, extra?: tt.ExtraCopyMessage): Promise<tg.MessageId>;
    /**
     * @see https://core.telegram.org/bots/api#approvechatjoinrequest
     */
    approveChatJoinRequest(userId: number): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#declinechatjoinrequest
     */
    declineChatJoinRequest(userId: number): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#banchatsenderchat
     */
    banChatSenderChat(senderChatId: number): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#unbanchatsenderchat
     */
    unbanChatSenderChat(senderChatId: number): Promise<true>;
    /**
     * Use this method to change the bot's menu button in the current private chat. Returns true on success.
     * @see https://core.telegram.org/bots/api#setchatmenubutton
     */
    setChatMenuButton(menuButton?: tg.MenuButton): Promise<true>;
    /**
     * Use this method to get the current value of the bot's menu button in the current private chat. Returns MenuButton on success.
     * @see https://core.telegram.org/bots/api#getchatmenubutton
     */
    getChatMenuButton(): Promise<tg.MenuButton>;
    /**
     * @see https://core.telegram.org/bots/api#setmydefaultadministratorrights
     */
    setMyDefaultAdministratorRights(extra?: Parameters<Telegram['setMyDefaultAdministratorRights']>[0]): Promise<true>;
    /**
     * @see https://core.telegram.org/bots/api#getmydefaultadministratorrights
     */
    getMyDefaultAdministratorRights(extra?: Parameters<Telegram['getMyDefaultAdministratorRights']>[0]): Promise<tg.ChatAdministratorRights>;
}
export default Context;
type UpdateTypes<U extends Deunionize<tg.Update>> = Extract<UnionKeys<U>, tt.UpdateType>;
export type GetUpdateContent<U extends tg.Update> = U extends tg.Update.CallbackQueryUpdate ? U['callback_query']['message'] : U[UpdateTypes<U>];
type Getter<U extends Deunionize<tg.Update>, P extends string> = PropOr<GetUpdateContent<U>, P>;
//# sourceMappingURL=context.d.ts.map