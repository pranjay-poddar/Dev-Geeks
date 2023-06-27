import { InlineKeyboardMarkup } from "./markup";
import { Chat, File, User } from "./manage";
import { PassportData } from "./passport";
import { Invoice, SuccessfulPayment } from "./payment";

export namespace Message {
  interface ServiceMessage {
    /** Unique message identifier inside this chat */
    message_id: number;
    /** Unique identifier of a message thread or a forum topic to which the message belongs; for supergroups only */
    message_thread_id?: number;
    /** Sender of the message; empty for messages sent to channels. For backward compatibility, the field contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
    from?: User;
    /** Sender of the message, sent on behalf of a chat. For example, the channel itself for channel posts, the supergroup itself for messages from anonymous group administrators, the linked channel for messages automatically forwarded to the discussion group. For backward compatibility, the field from contains a fake sender user in non-channel chats, if the message was sent on behalf of a chat. */
    sender_chat?: Chat;
    /** Date the message was sent in Unix time */
    date: number;
    /** Conversation the message belongs to */
    chat: Chat;
    /** True, if the message is sent to a forum topic */
    is_topic_message?: boolean;
  }
  interface CommonMessage extends ServiceMessage {
    /** For forwarded messages, sender of the original message */
    forward_from?: User;
    /** For messages forwarded from channels or from anonymous administrators, information about the original sender chat */
    forward_from_chat?: Chat;
    /** For messages forwarded from channels, identifier of the original message in the channel */
    forward_from_message_id?: number;
    /** For forwarded messages that were originally sent in channels or by an anonymous chat administrator, signature of the message sender if present */
    forward_signature?: string;
    /** Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages */
    forward_sender_name?: string;
    /** For forwarded messages, date the original message was sent in Unix time */
    forward_date?: number;
    /** True, if the message is a channel post that was automatically forwarded to the connected discussion group */
    is_automatic_forward?: true;
    /** For replies, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
    reply_to_message?: ReplyMessage;
    /** Bot through which the message was sent */
    via_bot?: User;
    /** Date the message was last edited in Unix time */
    edit_date?: number;
    /** True, if the message can't be forwarded */
    has_protected_content?: true;
    /** Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
    author_signature?: string;
    /** Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
    reply_markup?: InlineKeyboardMarkup;
  }
  export interface TextMessage extends CommonMessage {
    /** For text messages, the actual UTF-8 text of the message */
    text: string;
    /** For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
    entities?: MessageEntity[];
  }
  interface CaptionableMessage extends CommonMessage {
    /** Caption for the animation, audio, document, photo, video or voice */
    caption?: string;
    /** For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
    caption_entities?: MessageEntity[];
  }
  interface MediaMessage extends CaptionableMessage {
    /** The unique identifier of a media message group this message belongs to */
    media_group_id?: string;
    /** True, if the message media is covered by a spoiler animation */
    has_media_spoiler?: true;
  }
  export interface AudioMessage extends MediaMessage {
    /** Message is an audio file, information about the file */
    audio: Audio;
  }
  export interface DocumentMessage extends MediaMessage {
    /** Message is a general file, information about the file */
    document: Document;
  }
  export interface AnimationMessage extends DocumentMessage {
    /** Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set */
    animation: Animation;
  }
  export interface PhotoMessage extends MediaMessage {
    /** Message is a photo, available sizes of the photo */
    photo: PhotoSize[];
  }
  export interface StickerMessage extends CommonMessage {
    /** Message is a sticker, information about the sticker */
    sticker: Sticker;
  }
  export interface VideoMessage extends MediaMessage {
    /** Message is a video, information about the video */
    video: Video;
  }
  export interface VideoNoteMessage extends CommonMessage {
    /** Message is a video note, information about the video message */
    video_note: VideoNote;
  }
  export interface VoiceMessage extends CaptionableMessage {
    /** Message is a voice message, information about the file */
    voice: Voice;
  }
  export interface ContactMessage extends CommonMessage {
    /** Message is a shared contact, information about the contact */
    contact: Contact;
  }
  export interface DiceMessage extends CommonMessage {
    /** Message is a dice with random value */
    dice: Dice;
  }
  export interface GameMessage extends CommonMessage {
    /** Message is a game, information about the game. More about games » */
    game: Game;
  }
  export interface PollMessage extends CommonMessage {
    /** Message is a native poll, information about the poll */
    poll: Poll;
  }
  export interface LocationMessage extends CommonMessage {
    /** Message is a shared location, information about the location */
    location: Location;
  }
  export interface VenueMessage extends LocationMessage {
    /** Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set */
    venue: Venue;
  }
  export interface NewChatMembersMessage extends ServiceMessage {
    /** New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
    new_chat_members: User[];
  }
  export interface LeftChatMemberMessage extends ServiceMessage {
    /** A member was removed from the group, information about them (this member may be the bot itself) */
    left_chat_member: User;
  }
  export interface NewChatTitleMessage extends ServiceMessage {
    /** A chat title was changed to this value */
    new_chat_title: string;
  }
  export interface NewChatPhotoMessage extends ServiceMessage {
    /** A chat photo was change to this value */
    new_chat_photo: PhotoSize[];
  }
  export interface DeleteChatPhotoMessage extends ServiceMessage {
    /** Service message: the chat photo was deleted */
    delete_chat_photo: true;
  }
  export interface GroupChatCreatedMessage extends ServiceMessage {
    /** Service message: the group has been created */
    group_chat_created: true;
  }
  export interface SupergroupChatCreated extends ServiceMessage {
    /** Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
    supergroup_chat_created: true;
  }
  export interface ChannelChatCreatedMessage extends ServiceMessage {
    /** Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
    channel_chat_created: true;
  }
  export interface MessageAutoDeleteTimerChangedMessage extends ServiceMessage {
    /** Service message: auto-delete timer settings changed in the chat */
    message_auto_delete_timer_changed: MessageAutoDeleteTimerChanged;
  }
  export interface MigrateToChatIdMessage extends ServiceMessage {
    /** The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
    migrate_to_chat_id: number;
  }
  export interface MigrateFromChatIdMessage extends ServiceMessage {
    /** The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
    migrate_from_chat_id: number;
  }
  export interface PinnedMessageMessage extends ServiceMessage {
    /** Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply. */
    pinned_message: ReplyMessage;
  }
  export interface InvoiceMessage extends ServiceMessage {
    /** Message is an invoice for a payment, information about the invoice. More about payments » */
    invoice: Invoice;
  }
  export interface SuccessfulPaymentMessage extends ServiceMessage {
    /** Message is a service message about a successful payment, information about the payment. More about payments » */
    successful_payment: SuccessfulPayment;
  }
  export interface UserSharedMessage extends ServiceMessage {
    /** Service message: a user was shared with the bot */
    user_shared: UserShared;
  }
  export interface ChatSharedMessage extends ServiceMessage {
    /** Service message: a chat was shared with the bot */
    chat_shared?: ChatShared;
  }
  export interface ConnectedWebsiteMessage extends ServiceMessage {
    /** The domain name of the website on which the user has logged in. More about Telegram Login » */
    connected_website: string;
  }
  export interface WriteAccessAllowedMessage extends ServiceMessage {
    /** Service message: the user allowed the bot added to the attachment menu to write messages */
    write_access_allowed?: WriteAccessAllowed;
  }
  export interface PassportDataMessage extends ServiceMessage {
    /** Telegram Passport data */
    passport_data: PassportData;
  }
  export interface ProximityAlertTriggeredMessage extends ServiceMessage {
    /** Service message. A user in the chat triggered another user's proximity alert while sharing Live Location. */
    proximity_alert_triggered: ProximityAlertTriggered;
  }
  export interface ForumTopicCreatedMessage extends ServiceMessage {
    /** Service message: forum topic created */
    forum_topic_created: ForumTopicCreated;
  }
  export interface ForumTopicEditedMessage extends ServiceMessage {
    /** Service message: forum topic edited */
    forum_topic_edited?: ForumTopicEdited;
  }
  export interface ForumTopicClosedMessage extends ServiceMessage {
    /** Service message: forum topic closed */
    forum_topic_closed: ForumTopicClosed;
  }
  export interface ForumTopicReopenedMessage extends ServiceMessage {
    /** Service message: forum topic reopened */
    forum_topic_reopened: ForumTopicReopened;
  }
  export interface GeneralForumTopicHiddenMessage extends ServiceMessage {
    /** Service message: the 'General' forum topic hidden */
    general_forum_topic_hidden?: GeneralForumTopicHidden;
  }
  export interface GeneralForumTopicUnhiddenMessage extends ServiceMessage {
    /** Service message: the 'General' forum topic unhidden */
    general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
  }
  export interface VideoChatScheduledMessage extends ServiceMessage {
    /** Service message: video chat scheduled */
    video_chat_scheduled: VideoChatScheduled;
  }
  export interface VideoChatStartedMessage extends ServiceMessage {
    /** Service message: video chat started */
    video_chat_started: VideoChatStarted;
  }
  export interface VideoChatEndedMessage extends ServiceMessage {
    /** Service message: video chat ended */
    video_chat_ended: VideoChatEnded;
  }
  export interface VideoChatParticipantsInvitedMessage extends ServiceMessage {
    /** Service message: new participants invited to a video chat */
    video_chat_participants_invited: VideoChatParticipantsInvited;
  }
  export interface WebAppDataMessage extends ServiceMessage {
    /** Service message: data sent by a Web App */
    web_app_data: WebAppData;
  }
}

/** Helper type that bundles all possible `Message.ServiceMessage`s. More specifically, bundles all messages that do not have a `reply_to_message` field, i.e. are not a `Message.CommonMessage`. */
export type ServiceMessageBundle =
  | Message.ChannelChatCreatedMessage
  | Message.ChatSharedMessage
  | Message.ConnectedWebsiteMessage
  | Message.DeleteChatPhotoMessage
  | Message.GroupChatCreatedMessage
  | Message.InvoiceMessage
  | Message.LeftChatMemberMessage
  | Message.MessageAutoDeleteTimerChangedMessage
  | Message.MigrateFromChatIdMessage
  | Message.MigrateToChatIdMessage
  | Message.NewChatMembersMessage
  | Message.NewChatPhotoMessage
  | Message.NewChatTitleMessage
  | Message.PassportDataMessage
  | Message.ProximityAlertTriggeredMessage
  | Message.ForumTopicCreatedMessage
  | Message.ForumTopicClosedMessage
  | Message.ForumTopicReopenedMessage
  | Message.PinnedMessageMessage
  | Message.SuccessfulPaymentMessage
  | Message.SupergroupChatCreated
  | Message.UserSharedMessage
  | Message.VideoChatScheduledMessage
  | Message.VideoChatStartedMessage
  | Message.VideoChatEndedMessage
  | Message.VideoChatParticipantsInvitedMessage
  | Message.WebAppDataMessage;

/** Helper type that bundles all possible `Message.CommonMessage`s. More specifically, bundles all messages that do have a `reply_to_message` field, i.e. are a `Message.CommonMessage`. */
export type CommonMessageBundle =
  | Message.AnimationMessage
  | Message.AudioMessage
  | Message.ContactMessage
  | Message.DiceMessage
  | Message.DocumentMessage
  | Message.GameMessage
  | Message.LocationMessage
  | Message.PhotoMessage
  | Message.PollMessage
  | Message.StickerMessage
  | Message.TextMessage
  | Message.VenueMessage
  | Message.VideoMessage
  | Message.VideoNoteMessage
  | Message.VoiceMessage;

/** Helper type that represents a message which occurs in a `reply_to_message` field. */
type ReplyMessage =
  | ServiceMessageBundle
  | (CommonMessageBundle & { reply_to_message: undefined });

/** This object represents a message. */
export type Message = ServiceMessageBundle | CommonMessageBundle;

/** This object represents a unique message identifier. */
export interface MessageId {
  /** Unique message identifier */
  message_id: number;
}

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
  /** Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
  inline_message_id: string;
}

/** The Bot API supports basic formatting for messages. You can use bold, italic, underlined, strikethrough, and spoiler text, as well as inline links and pre-formatted code in your bots' messages. Telegram clients will render them accordingly. You can use either markdown-style or HTML-style formatting.

Note that Telegram clients will display an **alert** to the user before opening an inline link ('Open this link?' together with the full URL).

Message entities can be nested, providing following restrictions are met:
- If two entities have common characters, then one of them is fully contained inside another.
- bold, italic, underline, strikethrough, and spoiler entities can contain and can be part of any other entities, except pre and code.
- All other entities can't contain each other.

Links `tg://user?id=<user_id>` can be used to mention a user by their ID without using a username. Please note:

- These links will work only if they are used inside an inline link or in an inline keyboard button. For example, they will not work, when used in a message text.
- Unless the user is a member of the chat where they were mentioned, these mentions are only guaranteed to work if the user has contacted the bot in private in the past or has sent a callback query to the bot via an inline button and doesn't have Forwarded Messages privacy enabled for the bot.

#### MarkdownV2 style
To use this mode, pass *MarkdownV2* in the *parse_mode* field. Use the following syntax in your message:

```
  *bold \*text*
_italic \*text_
__underline__
~strikethrough~
||spoiler||
*bold _italic bold ~italic bold strikethrough ||italic bold strikethrough spoiler||~ __underline italic bold___ bold*
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
```
Please note:

- Any character with code between 1 and 126 inclusively can be escaped anywhere with a preceding '\' character, in which case it is treated as an ordinary character and not a part of the markup. This implies that '\' character usually must be escaped with a preceding '\' character.
- Inside `pre` and `code` entities, all '`' and '\' characters must be escaped with a preceding '\' character.
- Inside `(...)` part of inline link definition, all ')' and '\' must be escaped with a preceding '\' character.
- In all other places characters '_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!' must be escaped with the preceding character '\'.
- In case of ambiguity between `italic` and `underline` entities `__` is always greadily treated from left to right as beginning or end of `underline` entity, so instead of `___italic underline___` use `___italic underline_\r__`, where `\r` is a character with code 13, which will be ignored.

#### HTML style
To use this mode, pass *HTML* in the *parse_mode* field. The following tags are currently supported:

```html
<b>bold</b>, <strong>bold</strong>
<i>italic</i>, <em>italic</em>
<u>underline</u>, <ins>underline</ins>
<s>strikethrough</s>, <strike>strikethrough</strike>, <del>strikethrough</del>
<span class="tg-spoiler">spoiler</span>, <tg-spoiler>spoiler</tg-spoiler>
<b>bold <i>italic bold <s>italic bold strikethrough <span class="tg-spoiler">italic bold strikethrough spoiler</span></s> <u>underline italic bold</u></i> bold</b>
<a href="http://www.example.com/">inline URL</a>
<a href="tg://user?id=123456789">inline mention of a user</a>
<code>inline fixed-width code</code>
<pre>pre-formatted fixed-width code block</pre>
<pre><code class="language-python">pre-formatted fixed-width code block written in the Python programming language</code></pre>
```
Please note:

- Only the tags mentioned above are currently supported.
- All `<`, `>` and `&` symbols that are not a part of a tag or an HTML entity must be replaced with the corresponding HTML entities (`<` with `&lt;`, `>` with `&gt;` and `&` with `&amp;`).
- All numerical HTML entities are supported.
- The API currently supports only the following named HTML entities: `&lt;`, `&gt;`, `&amp;` and `&quot;`.
- Use nested `pre` and `code` tags, to define programming language for pre entity.
- Programming language can't be specified for standalone `code` tags.

#### Markdown style
This is a legacy mode, retained for backward compatibility. To use this mode, pass *Markdown* in the *parse_mode* field. Use the following syntax in your message:

```
  *bold text*
_italic text_
[inline URL](http://www.example.com/)
[inline mention of a user](tg://user?id=123456789)
`inline fixed-width code`
`​`​`
pre-formatted fixed-width code block
`​`​`
`​`​`python
pre-formatted fixed-width code block written in the Python programming language
`​`​`
```
Please note:

- Entities must not be nested, use parse mode MarkdownV2 instead.
- There is no way to specify underline and strikethrough entities, use parse mode MarkdownV2 instead.
- To escape characters '_', '*', '`', '[' outside of an entity, prepend the characters '\' before them.
- Escaping inside entities is not allowed, so entity must be closed first and reopened again: use `_snake_\__case_` for italic `snake_case` and `*2*\**2=4*` for bold `2*2=4`. */
export type ParseMode = "Markdown" | "MarkdownV2" | "HTML";

export namespace MessageEntity {
  interface AbstractMessageEntity {
    /** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag), “cashtag” ($USD), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers) */
    type: string;
    /** Offset in UTF-16 code units to the start of the entity */
    offset: number;
    /** Length of the entity in UTF-16 code units */
    length: number;
  }
  export interface CommonMessageEntity extends AbstractMessageEntity {
    type:
      | "mention"
      | "hashtag"
      | "cashtag"
      | "bot_command"
      | "url"
      | "email"
      | "phone_number"
      | "bold"
      | "italic"
      | "underline"
      | "strikethrough"
      | "spoiler"
      | "code";
  }
  export interface PreMessageEntity extends AbstractMessageEntity {
    type: "pre";
    /** For “pre” only, the programming language of the entity text */
    language?: string;
  }
  export interface TextLinkMessageEntity extends AbstractMessageEntity {
    type: "text_link";
    /** For “text_link” only, URL that will be opened after user taps on the text */
    url: string;
  }
  export interface TextMentionMessageEntity extends AbstractMessageEntity {
    type: "text_mention";
    /** For “text_mention” only, the mentioned user */
    user: User;
  }
  export interface CustomEmojiMessageEntity extends AbstractMessageEntity {
    type: "custom_emoji";
    /** For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker */
    custom_emoji_id: string;
  }
}

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export type MessageEntity =
  | MessageEntity.CommonMessageEntity
  | MessageEntity.CustomEmojiMessageEntity
  | MessageEntity.PreMessageEntity
  | MessageEntity.TextLinkMessageEntity
  | MessageEntity.TextMentionMessageEntity;

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Photo width */
  width: number;
  /** Photo height */
  height: number;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video width as defined by sender */
  width: number;
  /** Video height as defined by sender */
  height: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Animation thumbnail as defined by sender */
  thumb?: PhotoSize;
  /** Original animation filename as defined by sender */
  file_name?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** Performer of the audio as defined by sender or by audio tags */
  performer?: string;
  /** Title of the audio as defined by sender or by audio tags */
  title?: string;
  /** Original filename as defined by sender */
  file_name?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size in bytes */
  file_size?: number;
  /** Thumbnail of the album cover to which the music file belongs */
  thumb?: PhotoSize;
}

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Document thumbnail as defined by sender */
  thumb?: PhotoSize;
  /** Original filename as defined by sender */
  file_name?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents a video file. */
export interface Video {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video width as defined by sender */
  width: number;
  /** Video height as defined by sender */
  height: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Video thumbnail */
  thumb?: PhotoSize;
  /** Original filename as defined by sender */
  file_name?: string;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents a video message (available in Telegram apps as of v.4.0). */
export interface VideoNote {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Video width and height (diameter of the video message) as defined by sender */
  length: number;
  /** Duration of the video in seconds as defined by sender */
  duration: number;
  /** Video thumbnail */
  thumb?: PhotoSize;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents a voice note. */
export interface Voice {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Duration of the audio in seconds as defined by sender */
  duration: number;
  /** MIME type of the file as defined by sender */
  mime_type?: string;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents a phone contact. */
export interface Contact {
  /** Contact's phone number */
  phone_number: string;
  /** Contact's first name */
  first_name: string;
  /** Contact's last name */
  last_name?: string;
  /** Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  user_id?: number;
  /** Additional data about the contact in the form of a vCard */
  vcard?: string;
}

/** This object represents an animated emoji that displays a random value. */
export interface Dice {
  /** Emoji on which the dice throw animation is based */
  emoji: string;
  /** Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji */
  value: number;
}

/** This object contains information about one answer option in a poll. */
export interface PollOption {
  /** Option text, 1-100 characters */
  text: string;
  /** Number of users that voted for this option */
  voter_count: number;
}

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
  /** Unique poll identifier */
  poll_id: string;
  /** The user, who changed the answer to the poll */
  user: User;
  /** 0-based identifiers of answer options, chosen by the user. May be empty if the user retracted their vote. */
  option_ids: number[];
}

/** This object contains information about a poll. */
export interface Poll {
  /** Unique poll identifier */
  id: string;
  /** Poll question, 1-300 characters */
  question: string;
  /** List of poll options */
  options: PollOption[];
  /** Total number of users that voted in the poll */
  total_voter_count: number;
  /** True, if the poll is closed */
  is_closed: boolean;
  /** True, if the poll is anonymous */
  is_anonymous: boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  type: "regular" | "quiz";
  /** True, if the poll allows multiple answers */
  allows_multiple_answers: boolean;
  /** 0-based identifier of the correct answer option. Available only for polls in the quiz mode, which are closed, or was sent (not forwarded) by the bot or to the private chat with the bot. */
  correct_option_id?: number;
  /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  explanation?: string;
  /** Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
  explanation_entities?: MessageEntity[];
  /** Amount of time in seconds the poll will be active after creation */
  open_period?: number;
  /** Point in time (Unix timestamp) when the poll will be automatically closed */
  close_date?: number;
}

export namespace Location {
  export interface CommonLocation {
    /** Longitude as defined by sender */
    longitude: number;
    /** Latitude as defined by sender */
    latitude: number;
    /** The radius of uncertainty for the location, measured in meters; 0-1500 */
    horizontal_accuracy?: number;
  }
  export interface LiveLocation extends CommonLocation {
    /** Time relative to the message sending date, during which the location can be updated, in seconds. For active live locations only. */
    live_period: number;
    /** The direction in which user is moving, in degrees; 1-360. For active live locations only. */
    heading: number;
    /** The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
    proximity_alert_radius?: number;
  }
}

/** This object represents a point on the map. */
export type Location = Location.CommonLocation | Location.LiveLocation;

/** This object represents a venue. */
export interface Venue {
  /** Venue location. Can't be a live location */
  location: Location;
  /** Name of the venue */
  title: string;
  /** Address of the venue */
  address: string;
  /** Foursquare identifier of the venue */
  foursquare_id?: string;
  /** Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  foursquare_type?: string;
  /** Google Places identifier of the venue */
  google_place_id?: string;
  /** Google Places type of the venue. (See supported types.) */
  google_place_type?: string;
}

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface ProximityAlertTriggered {
  /** User that triggered the alert */
  traveler: User;
  /** User that set the alert */
  watcher: User;
  /** The distance between the users */
  distance: number;
}

/** This object represents a service message about a change in auto-delete timer settings. */
export interface MessageAutoDeleteTimerChanged {
  /** New auto-delete time for messages in the chat; in seconds */
  message_auto_delete_time: number;
}

/** This object represents a service message about a new forum topic created in the chat. */
export interface ForumTopicCreated {
  /** Name of the topic */
  name: string;
  /** Color of the topic icon in RGB format */
  icon_color: number;
  /** Unique identifier of the custom emoji shown as the topic icon */
  icon_custom_emoji_id?: string;
}

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
  /** New name of the topic, if it was edited */
  name?: string;
  /** New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
  icon_custom_emoji_id?: string;
}

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface ForumTopicClosed {}

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export interface ForumTopicReopened {}

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export interface GeneralForumTopicHidden {}

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export interface GeneralForumTopicUnhidden {}

/** This object contains information about the user whose identifier was shared with the bot using a KeyboardButtonRequestUser button. */
export interface UserShared {
  /** Identifier of the request */
  request_id: number;
  /** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
  user_id: number;
}

/** This object contains information about the chat whose identifier was shared with the bot using a KeyboardButtonRequestChat button. */
export interface ChatShared {
  /** Identifier of the request */
  request_id: number;
  /** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
  chat_id: number;
}

/** This object represents a service message about a user allowing a bot added to the attachment menu to write messages. Currently holds no information. */
export interface WriteAccessAllowed {}

/** This object represents a service message about a video chat scheduled in the chat. */
export interface VideoChatScheduled {
  /** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
  start_date: number;
}

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export interface VideoChatStarted {}

/** This object represents a service message about a video chat ended in the chat. */
export interface VideoChatEnded {
  /** Video chat duration in seconds */
  duration: number;
}

/** This object represents a service message about new members invited to a video chat. */
export interface VideoChatParticipantsInvited {
  /** New members that were invited to the video chat */
  users: User[];
}

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
  /** The data. Be aware that a bad client can send arbitrary data in this field. */
  data: string;
  /** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
  button_text: string;
}

/** This object represents a sticker. */
export interface Sticker {
  /** Identifier for this file, which can be used to download or reuse the file */
  file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  file_unique_id: string;
  /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
  type: "regular" | "mask" | "custom_emoji";
  /** Sticker width */
  width: number;
  /** Sticker height */
  height: number;
  /** True, if the sticker is animated */
  is_animated: boolean;
  /** True, if the sticker is a video sticker */
  is_video: boolean;
  /** Sticker thumbnail in the .WEBP or .JPG format */
  thumb?: PhotoSize;
  /** Emoji associated with the sticker */
  emoji?: string;
  /** Name of the sticker set to which the sticker belongs */
  set_name?: string;
  /** For premium regular stickers, premium animation for the sticker */
  premium_animation?: File;
  /** For mask stickers, the position where the mask should be placed */
  mask_position?: MaskPosition;
  /** For custom emoji stickers, unique identifier of the custom emoji */
  custom_emoji_id?: string;
  /** File size in bytes */
  file_size?: number;
}

/** This object represents a sticker set. */
export interface StickerSet {
  /** Sticker set name */
  name: string;
  /** Sticker set title */
  title: string;
  /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
  sticker_type: "regular" | "mask" | "custom_emoji";
  /** True, if the sticker set contains animated stickers */
  is_animated: boolean;
  /** True, if the sticker set contains video stickers */
  is_video: boolean;
  /** List of all set stickers */
  stickers: Sticker[];
  /** Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
  thumb?: PhotoSize;
}

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
  /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
  point: "forehead" | "eyes" | "mouth" | "chin";
  /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
  x_shift: number;
  /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
  y_shift: number;
  /** Mask scaling coefficient. For example, 2.0 means double size. */
  scale: number;
}

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface Game {
  /** Title of the game */
  title: string;
  /** Description of the game */
  description: string;
  /** Photo that will be displayed in the game message in chats. */
  photo: PhotoSize[];
  /** Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
  text: string;
  /** Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
  text_entities: MessageEntity[];
  /** Animation that will be displayed in the game message in chats. Upload via BotFather */
  animation: Animation;
}

/** This object represents one row of the high scores table for a game. */
export interface GameHighScore {
  /** Position in high score table for the game */
  position: number;
  /** User */
  user: User;
  /** Score */
  score: number;
}
