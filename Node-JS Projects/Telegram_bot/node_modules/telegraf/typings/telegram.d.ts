/// <reference types="node" />
import * as tg from './core/types/typegram';
import * as tt from './telegram-types';
import ApiClient from './core/network/client';
import { URL } from 'url';
import { FmtString } from './format';
export declare class Telegram extends ApiClient {
    /**
     * Get basic information about the bot
     */
    getMe(): Promise<tg.UserFromGetMe>;
    /**
     * Get basic info about a file and prepare it for downloading.
     * @param fileId Id of file to get link to
     */
    getFile(fileId: string): Promise<tg.File>;
    /**
     * Get download link to a file.
     */
    getFileLink(fileId: string | tg.File): Promise<URL>;
    /**
     * Directly request incoming updates.
     * You should probably use `Telegraf::launch` instead.
     */
    getUpdates(timeout: number, limit: number, offset: number, allowedUpdates: readonly tt.UpdateType[] | undefined): Promise<tg.Update[]>;
    getWebhookInfo(): Promise<tg.WebhookInfo>;
    getGameHighScores(userId: number, inlineMessageId: string | undefined, chatId: number | undefined, messageId: number | undefined): Promise<tg.GameHighScore[]>;
    setGameScore(userId: number, score: number, inlineMessageId: string | undefined, chatId: number | undefined, messageId: number | undefined, editMessage?: boolean, force?: boolean): Promise<true | (tg.Update.Edited & tg.Message.GameMessage)>;
    /**
     * Specify a url to receive incoming updates via an outgoing webhook.
     * @param url HTTPS url to send updates to. Use an empty string to remove webhook integration
     */
    setWebhook(url: string, extra?: tt.ExtraSetWebhook): Promise<true>;
    /**
     * Remove webhook integration.
     */
    deleteWebhook(extra?: {
        drop_pending_updates?: boolean;
    }): Promise<true>;
    /**
     * Send a text message.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param text Text of the message to be sent
     */
    sendMessage(chatId: number | string, text: string | FmtString, extra?: tt.ExtraReplyMessage): Promise<tg.Message.TextMessage>;
    /**
     * Forward existing message.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
     * @param messageId Message identifier in the chat specified in from_chat_id
     */
    forwardMessage(chatId: number | string, fromChatId: number | string, messageId: number, extra?: tt.ExtraForwardMessage): Promise<tg.Message>;
    /**
     * Use this method when you need to tell the user that something is happening on the bot's side.
     * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendChatAction(chat_id: number | string, action: tt.ChatAction, extra?: tt.ExtraSendChatAction): Promise<true>;
    getUserProfilePhotos(userId: number, offset?: number, limit?: number): Promise<tg.UserProfilePhotos>;
    /**
     * Send point on the map.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendLocation(chatId: number | string, latitude: number, longitude: number, extra?: tt.ExtraLocation): Promise<tg.Message.LocationMessage>;
    sendVenue(chatId: number | string, latitude: number, longitude: number, title: string, address: string, extra?: tt.ExtraVenue): Promise<tg.Message.VenueMessage>;
    /**
     * @param chatId Unique identifier for the target private chat
     */
    sendInvoice(chatId: number | string, invoice: tt.NewInvoiceParameters, extra?: tt.ExtraInvoice): Promise<tg.Message.InvoiceMessage>;
    sendContact(chatId: number | string, phoneNumber: string, firstName: string, extra?: tt.ExtraContact): Promise<tg.Message.ContactMessage>;
    /**
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendPhoto(chatId: number | string, photo: tg.Opts<'sendPhoto'>['photo'], extra?: tt.ExtraPhoto): Promise<tg.Message.PhotoMessage>;
    /**
     * Send a dice, which will have a random value from 1 to 6.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendDice(chatId: number | string, extra?: tt.ExtraDice): Promise<tg.Message.DiceMessage>;
    /**
     * Send general files. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendDocument(chatId: number | string, document: tg.Opts<'sendDocument'>['document'], extra?: tt.ExtraDocument): Promise<tg.Message.DocumentMessage>;
    /**
     * Send audio files, if you want Telegram clients to display them in the music player.
     * Your audio must be in the .mp3 format.
     * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendAudio(chatId: number | string, audio: tg.Opts<'sendAudio'>['audio'], extra?: tt.ExtraAudio): Promise<tg.Message.AudioMessage>;
    /**
     * Send .webp, animated .tgs, or video .webm stickers
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendSticker(chatId: number | string, sticker: tg.Opts<'sendSticker'>['sticker'], extra?: tt.ExtraSticker): Promise<tg.Message.StickerMessage>;
    /**
     * Send video files, Telegram clients support mp4 videos (other formats may be sent as Document).
     * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVideo(chatId: number | string, video: tg.Opts<'sendVideo'>['video'], extra?: tt.ExtraVideo): Promise<tg.Message.VideoMessage>;
    /**
     * Send .gif animations.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendAnimation(chatId: number | string, animation: tg.Opts<'sendAnimation'>['animation'], extra?: tt.ExtraAnimation): Promise<tg.Message.AnimationMessage>;
    /**
     * Send video messages.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVideoNote(chatId: number | string, videoNote: string | tg.InputFileVideoNote, extra?: tt.ExtraVideoNote): Promise<tg.Message.VideoNoteMessage>;
    /**
     * Send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    sendVoice(chatId: number | string, voice: tg.Opts<'sendVoice'>['voice'], extra?: tt.ExtraVoice): Promise<tg.Message.VoiceMessage>;
    /**
     * @param chatId Unique identifier for the target chat
     * @param gameShortName Short name of the game, serves as the unique identifier for the game. Set up your games via Botfather.
     */
    sendGame(chatId: number, gameName: string, extra?: tt.ExtraGame): Promise<tg.Message.GameMessage>;
    /**
     * Send a group of photos or videos as an album.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param media A JSON-serialized array describing photos and videos to be sent, must include 2–10 items
     */
    sendMediaGroup(chatId: number | string, media: tt.MediaGroup, extra?: tt.ExtraMediaGroup): Promise<(tg.Message.DocumentMessage | tg.Message.AudioMessage | tg.Message.PhotoMessage | tg.Message.VideoMessage)[]>;
    /**
     * Send a native poll.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param question Poll question, 1-255 characters
     * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
     */
    sendPoll(chatId: number | string, question: string, options: readonly string[], extra?: tt.ExtraPoll): Promise<tg.Message.PollMessage>;
    /**
     * Send a native quiz.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param question Poll question, 1-255 characters
     * @param options A JSON-serialized list of answer options, 2-10 strings 1-100 characters each
     */
    sendQuiz(chatId: number | string, question: string, options: readonly string[], extra: tt.ExtraPoll): Promise<tg.Message.PollMessage>;
    /**
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Identifier of the original message with the poll
     */
    stopPoll(chatId: number | string, messageId: number, extra?: tt.ExtraStopPoll): Promise<tg.Poll>;
    /**
     * Get up to date information about the chat (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChat(chatId: number | string): Promise<tg.ChatFromGetChat>;
    /**
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChatAdministrators(chatId: number | string): Promise<(tg.ChatMemberOwner | tg.ChatMemberAdministrator)[]>;
    /**
     * Get information about a member of a chat.
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     * @param userId Unique identifier of the target user
     */
    getChatMember(chatId: string | number, userId: number): Promise<tg.ChatMember>;
    /**
     * Get the number of members in a chat.
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    getChatMembersCount(chatId: string | number): Promise<number>;
    /**
     * Send answers to an inline query.
     * No more than 50 results per query are allowed.
     */
    answerInlineQuery(inlineQueryId: string, results: readonly tg.InlineQueryResult[], extra?: tt.ExtraAnswerInlineQuery): Promise<true>;
    setChatPermissions(chatId: number | string, permissions: tg.ChatPermissions, extra?: tt.ExtraSetChatPermissions): Promise<true>;
    /**
     * Kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     * @param untilDate Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
     */
    banChatMember(chatId: number | string, userId: number, untilDate?: number, extra?: tt.ExtraBanChatMember): Promise<true>;
    /**
     * Kick a user from a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     * @param untilDate Date when the user will be unbanned, unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever
     * @deprecated since API 5.3. Use {@link Telegram.banChatMember}
     */
    get kickChatMember(): (chatId: string | number, userId: number, untilDate?: number | undefined, extra?: Omit<{
        chat_id: string | number;
        user_id: number;
        until_date?: number | undefined;
        revoke_messages?: boolean | undefined;
    }, "chat_id" | "user_id" | "until_date"> | undefined) => Promise<true>;
    /**
     * Promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Pass False for all boolean parameters to demote a user.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
     */
    promoteChatMember(chatId: number | string, userId: number, extra: tt.ExtraPromoteChatMember): Promise<true>;
    /**
     * Restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights. Pass True for all boolean parameters to lift restrictions from a user.
     * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     */
    restrictChatMember(chatId: string | number, userId: number, extra: tt.ExtraRestrictChatMember): Promise<true>;
    setChatAdministratorCustomTitle(chatId: number | string, userId: number, title: string): Promise<true>;
    /**
     * Export an invite link to a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    exportChatInviteLink(chatId: number | string): Promise<string>;
    createChatInviteLink(chatId: number | string, extra?: tt.ExtraCreateChatInviteLink): Promise<tg.ChatInviteLink>;
    createInvoiceLink(invoice: tt.NewInvoiceLinkParameters): Promise<string>;
    editChatInviteLink(chatId: number | string, inviteLink: string, extra?: tt.ExtraEditChatInviteLink): Promise<tg.ChatInviteLink>;
    revokeChatInviteLink(chatId: number | string, inviteLink: string): Promise<tg.ChatInviteLink>;
    setChatPhoto(chatId: number | string, photo: tg.Opts<'setChatPhoto'>['photo']): Promise<true>;
    deleteChatPhoto(chatId: number | string): Promise<true>;
    /**
     * Change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
     * @param title New chat title, 1-255 characters
     */
    setChatTitle(chatId: number | string, title: string): Promise<true>;
    setChatDescription(chatId: number | string, description?: string): Promise<true>;
    /**
     * Pin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel.
     * @param chatId Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     */
    pinChatMessage(chatId: number | string, messageId: number, extra?: {
        disable_notification?: boolean;
    }): Promise<true>;
    /**
     * Unpin a message in a group, a supergroup, or a channel. The bot must be an administrator in the chat for this to work and must have the 'can_pin_messages' admin right in the supergroup or 'can_edit_messages' admin right in the channel.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    unpinChatMessage(chatId: number | string, messageId?: number): Promise<true>;
    /**
     * Clear the list of pinned messages in a chat.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    unpinAllChatMessages(chatId: number | string): Promise<true>;
    /**
     * Use this method for your bot to leave a group, supergroup or channel.
     * @param chatId Unique identifier for the target chat or username of the target supergroup or channel (in the format @channelusername)
     */
    leaveChat(chatId: number | string): Promise<true>;
    /**
     * Unban a user from a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
     * @param chatId Unique identifier for the target group or username of the target supergroup or channel (in the format @username)
     * @param userId Unique identifier of the target user
     */
    unbanChatMember(chatId: number | string, userId: number, extra?: {
        only_if_banned?: boolean;
    }): Promise<true>;
    answerCbQuery(callbackQueryId: string, text?: string, extra?: tt.ExtraAnswerCbQuery): Promise<true>;
    answerGameQuery(callbackQueryId: string, url: string): Promise<true>;
    /**
     * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified,
     * the Bot API will send an Update with a shipping_query field to the bot.
     * Reply to shipping queries.
     * @param ok  Specify True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible)
     * @param shippingOptions Required if ok is True. A JSON-serialized array of available shipping options.
     * @param errorMessage Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. "Sorry, delivery to your desired address is unavailable'). Telegram will display this message to the user.
     */
    answerShippingQuery(shippingQueryId: string, ok: boolean, shippingOptions: readonly tg.ShippingOption[] | undefined, errorMessage: string | undefined): Promise<true>;
    /**
     * Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
     * Respond to such pre-checkout queries. On success, True is returned.
     * Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
     * @param ok  Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems.
     * @param errorMessage Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user.
     */
    answerPreCheckoutQuery(preCheckoutQueryId: string, ok: boolean, errorMessage?: string): Promise<true>;
    answerWebAppQuery(webAppQueryId: string, result: tg.InlineQueryResult): Promise<tg.SentWebAppMessage>;
    /**
     * Edit text and game messages sent by the bot or via the bot (for inline bots).
     * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param text New text of the message
     */
    editMessageText(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, text: string | FmtString, extra?: tt.ExtraEditMessageText): Promise<true | (tg.Update.Edited & tg.Message.TextMessage)>;
    /**
     * Edit captions of messages sent by the bot or via the bot (for inline bots).
     * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param caption New caption of the message
     * @param markup A JSON-serialized object for an inline keyboard.
     */
    editMessageCaption(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, caption: string | FmtString | undefined, extra?: tt.ExtraEditMessageCaption): Promise<true | (tg.Update.Edited & tg.Message.CaptionableMessage)>;
    /**
     * Edit animation, audio, document, photo, or video messages.
     * If a message is a part of a message album, then it can be edited only to a photo or a video.
     * Otherwise, message type can be changed arbitrarily.
     * When inline message is edited, new file can't be uploaded.
     * Use previously uploaded file via its file_id or specify a URL.
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param media New media of message
     * @param markup Markup of inline keyboard
     */
    editMessageMedia(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, media: tt.WrapCaption<tg.InputMedia>, extra?: tt.ExtraEditMessageMedia): Promise<true | (tg.Update.Edited & tg.Message)>;
    /**
     * Edit only the reply markup of messages sent by the bot or via the bot (for inline bots).
     * @param chatId Required if inlineMessageId is not specified. Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param messageId Required if inlineMessageId is not specified. Identifier of the sent message
     * @param inlineMessageId Required if chatId and messageId are not specified. Identifier of the inline message
     * @param markup A JSON-serialized object for an inline keyboard.
     * @returns If edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
     */
    editMessageReplyMarkup(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, markup: tg.InlineKeyboardMarkup | undefined): Promise<true | (tg.Update.Edited & tg.Message)>;
    editMessageLiveLocation(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, latitude: number, longitude: number, extra?: tt.ExtraEditMessageLiveLocation): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    stopMessageLiveLocation(chatId: number | string | undefined, messageId: number | undefined, inlineMessageId: string | undefined, markup?: tg.InlineKeyboardMarkup): Promise<true | (tg.Update.Edited & tg.Message.LocationMessage)>;
    /**
     * Delete a message, including service messages, with the following limitations:
     * - A message can only be deleted if it was sent less than 48 hours ago.
     * - Bots can delete outgoing messages in groups and supergroups.
     * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
     * - If the bot is an administrator of a group, it can delete any message there.
     * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     */
    deleteMessage(chatId: number | string, messageId: number): Promise<true>;
    setChatStickerSet(chatId: number | string, setName: string): Promise<true>;
    deleteChatStickerSet(chatId: number | string): Promise<true>;
    /**
     * Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user.
     * Requires no parameters. Returns an Array of Sticker objects.
     *
     * @see https://core.telegram.org/bots/api#getforumtopiciconstickers
     */
    getForumTopicIconStickers(): Promise<tg.Sticker[]>;
    /**
     * Use this method to create a topic in a forum supergroup chat. The bot must be an administrator in the chat for this
     * to work and must have the can_manage_topics administrator rights. Returns information about the created topic as a
     * ForumTopic object.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param name Topic name, 1-128 characters
     *
     * @see https://core.telegram.org/bots/api#createforumtopic
     */
    createForumTopic(chat_id: number | string, name: string, extra?: tt.ExtraCreateForumTopic): Promise<tg.ForumTopic>;
    /**
     * Use this method to edit name and icon of a topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have can_manage_topics administrator rights, unless it is the creator of the
     * topic. Returns True on success.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message_thread_id Unique identifier for the target message thread of the forum topic
     *
     * @see https://core.telegram.org/bots/api#editforumtopic
     */
    editForumTopic(chat_id: number | string, message_thread_id: number, extra: tt.ExtraEditForumTopic): Promise<true>;
    /**
     * Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message_thread_id Unique identifier for the target message thread of the forum topic
     *
     * @see https://core.telegram.org/bots/api#closeforumtopic
     */
    closeForumTopic(chat_id: number | string, message_thread_id: number): Promise<true>;
    /**
     * Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic.
     * Returns True on success.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message_thread_id Unique identifier for the target message thread of the forum topic
     *
     * @see https://core.telegram.org/bots/api#reopenforumtopic
     */
    reopenForumTopic(chat_id: number | string, message_thread_id: number): Promise<true>;
    /**
     * Use this method to delete a forum topic along with all its messages in a forum supergroup chat. The bot must be an
     * administrator in the chat for this to work and must have the can_delete_messages administrator rights.
     * Returns True on success.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message_thread_id Unique identifier for the target message thread of the forum topic
     *
     * @see https://core.telegram.org/bots/api#deleteforumtopic
     */
    deleteForumTopic(chat_id: number | string, message_thread_id: number): Promise<true>;
    /**
     * Use this method to clear the list of pinned messages in a forum topic. The bot must be an administrator in the chat
     * for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success.
     *
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message_thread_id Unique identifier for the target message thread of the forum topic
     *
     * @see https://core.telegram.org/bots/api#unpinallforumtopicmessages
     */
    unpinAllForumTopicMessages(chat_id: number | string, message_thread_id: number): Promise<true>;
    /**
     * Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator
     * in the chat for this to work and must have can_manage_topics administrator rights. Returns True on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     * @param name New topic name, 1-128 characters
     *
     * @see https://core.telegram.org/bots/api#editgeneralforumtopic
     */
    editGeneralForumTopic(chat_id: number | string, name: string): Promise<true>;
    /**
     * Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     *
     * @see https://core.telegram.org/bots/api#closegeneralforumtopic
     */
    closeGeneralForumTopic(chat_id: number | string): Promise<true>;
    /**
     * Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in
     * the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically
     * unhidden if it was hidden. Returns True on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     *
     * @see https://core.telegram.org/bots/api#reopengeneralforumtopic
     */
    reopenGeneralForumTopic(chat_id: number | string): Promise<true>;
    /**
     * Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat
     * for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed
     * if it was open. Returns True on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     *
     * @see https://core.telegram.org/bots/api#hidegeneralforumtopic
     */
    hideGeneralForumTopic(chat_id: number | string): Promise<true>;
    /**
     * Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the
     * chat for this to work and must have the can_manage_topics administrator rights. Returns True on success.
     *
     * @param chat_id Unique identifier for the target chat or username of the target supergroup (in the format @supergroupusername)
     *
     * @see https://core.telegram.org/bots/api#unhidegeneralforumtopic
     */
    unhideGeneralForumTopic(chat_id: number | string): Promise<true>;
    getStickerSet(name: string): Promise<tg.StickerSet>;
    /**
     * Upload a .png file with a sticker for later use in createNewStickerSet and addStickerToSet methods (can be used multiple times).
     * https://core.telegram.org/bots/api#sending-files
     * @param ownerId User identifier of sticker file owner
     * @param stickerFile Png image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and either width or height must be exactly 512px.
     */
    uploadStickerFile(ownerId: number, stickerFile: tg.Opts<'uploadStickerFile'>['png_sticker']): Promise<tg.File>;
    /**
     * Create new sticker set owned by a user. The bot will be able to edit the created sticker set.
     * @param ownerId User identifier of created sticker set owner
     * @param name Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only english letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
     * @param title Sticker set title, 1-64 characters
     */
    createNewStickerSet(ownerId: number, name: string, title: string, stickerData: tt.ExtraCreateNewStickerSet): Promise<true>;
    /**
     * Add a new sticker to a set created by the bot.
     * @param ownerId User identifier of sticker set owner
     * @param name Sticker set name
     */
    addStickerToSet(ownerId: number, name: string, stickerData: tt.ExtraAddStickerToSet): Promise<true>;
    /**
     * Move a sticker in a set created by the bot to a specific position.
     * @param sticker File identifier of the sticker
     * @param position New sticker position in the set, zero-based
     */
    setStickerPositionInSet(sticker: string, position: number): Promise<true>;
    setStickerSetThumb(name: string, userId: number, thumb?: tg.Opts<'setStickerSetThumb'>['thumb']): Promise<true>;
    /**
     * Delete a sticker from a set created by the bot.
     * @param sticker File identifier of the sticker
     */
    deleteStickerFromSet(sticker: string): Promise<true>;
    getCustomEmojiStickers(custom_emoji_ids: string[]): Promise<tg.Sticker[]>;
    /**
     * Get the current list of the bot's commands.
     */
    getMyCommands(extra?: tg.Opts<'getMyCommands'>): Promise<tg.BotCommand[]>;
    /**
     * Change the list of the bot's commands.
     * @param commands A list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified.
     */
    setMyCommands(commands: readonly tg.BotCommand[], extra?: tt.ExtraSetMyCommands): Promise<true>;
    deleteMyCommands(extra?: tg.Opts<'deleteMyCommands'>): Promise<true>;
    setPassportDataErrors(userId: number, errors: readonly tg.PassportElementError[]): Promise<true>;
    /**
     * Send copy of existing message.
     * @deprecated use `copyMessage` instead
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param message Received message object
     */
    sendCopy(chatId: number | string, message: tg.Message, extra?: tt.ExtraCopyMessage): Promise<tg.MessageId>;
    /**
     * Send copy of existing message.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param fromChatId Unique identifier for the chat where the original message was sent (or channel username in the format @channelusername)
     * @param messageId Message identifier in the chat specified in from_chat_id
     */
    copyMessage(chatId: number | string, fromChatId: number | string, messageId: number, extra?: tt.ExtraCopyMessage): Promise<tg.MessageId>;
    /**
     * Approve a chat join request.
     * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param userId Unique identifier of the target user
     */
    approveChatJoinRequest(chatId: number | string, userId: number): Promise<true>;
    /**
     * Decline a chat join request.
     * The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param userId Unique identifier of the target user
     */
    declineChatJoinRequest(chatId: number | string, userId: number): Promise<true>;
    /**
     * Ban a channel chat in a supergroup or a channel. The owner of the chat will not be able to send messages and join live streams on behalf of the chat, unless it is unbanned first.
     * The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param senderChatId Unique identifier of the target sender chat
     */
    banChatSenderChat(chatId: number | string, senderChatId: number, extra?: tt.ExtraBanChatSenderChat): Promise<true>;
    /**
     * Unban a previously banned channel chat in a supergroup or channel.
     * The bot must be an administrator for this to work and must have the appropriate administrator rights.
     * @param chatId Unique identifier for the target chat or username of the target channel (in the format @channelusername)
     * @param senderChatId Unique identifier of the target sender chat
     */
    unbanChatSenderChat(chatId: number | string, senderChatId: number): Promise<true>;
    /**
     * Use this method to change the bot's menu button in a private chat, or the default menu button. Returns true on success.
     * @param chatId Unique identifier for the target private chat. If not specified, default bot's menu button will be changed.
     * @param menuButton An object for the bot's new menu button.
     */
    setChatMenuButton({ chatId, menuButton, }?: {
        chatId?: number | undefined;
        menuButton?: tg.MenuButton | undefined;
    }): Promise<true>;
    /**
     * Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success.
     * @param chatId Unique identifier for the target private chat. If not specified, default bot's menu button will be returned.
     */
    getChatMenuButton({ chatId }?: {
        chatId?: number;
    }): Promise<tg.MenuButton>;
    /**
     * Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels.
     * These rights will be suggested to users, but they are are free to modify the list before adding the bot.
     */
    setMyDefaultAdministratorRights({ rights, forChannels, }?: {
        rights?: tg.ChatAdministratorRights;
        forChannels?: boolean;
    }): Promise<true>;
    /**
     * Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success.
     * @param forChannels Pass true to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned.
     */
    getMyDefaultAdministratorRights({ forChannels, }?: {
        forChannels?: boolean;
    }): Promise<tg.ChatAdministratorRights>;
    /**
     * Log out from the cloud Bot API server before launching the bot locally.
     */
    logOut(): Promise<true>;
    /**
     * Close the bot instance before moving it from one local server to another.
     */
    close(): Promise<true>;
}
export default Telegram;
//# sourceMappingURL=telegram.d.ts.map