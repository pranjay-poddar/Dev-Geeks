import { InlineKeyboardButton, KeyboardButton, KeyboardButtonRequestChat } from './core/types/typegram';
type Hideable<B> = B & {
    hide: boolean;
};
export declare function text(text: string, hide?: boolean): Hideable<KeyboardButton.CommonButton>;
export declare function contactRequest(text: string, hide?: boolean): Hideable<KeyboardButton.RequestContactButton>;
export declare function locationRequest(text: string, hide?: boolean): Hideable<KeyboardButton.RequestLocationButton>;
export declare function pollRequest(text: string, type?: 'quiz' | 'regular', hide?: boolean): Hideable<KeyboardButton.RequestPollButton>;
export declare function userRequest(text: string, 
/** Must fit in a signed 32 bit int */
request_id: number, user_is_premium?: boolean, hide?: boolean): Hideable<KeyboardButton.RequestUserButton>;
export declare function botRequest(text: string, 
/** Must fit in a signed 32 bit int */
request_id: number, hide?: boolean): Hideable<KeyboardButton.RequestUserButton>;
type KeyboardButtonRequestGroup = Omit<KeyboardButtonRequestChat, 'request_id' | 'chat_is_channel'>;
export declare function groupRequest(text: string, 
/** Must fit in a signed 32 bit int */
request_id: number, extra?: KeyboardButtonRequestGroup, hide?: boolean): Hideable<KeyboardButton.RequestChatButton>;
type KeyboardButtonRequestChannel = Omit<KeyboardButtonRequestChat, 'request_id' | 'chat_is_channel' | 'chat_is_forum'>;
export declare function channelRequest(text: string, 
/** Must fit in a signed 32 bit int */
request_id: number, extra?: KeyboardButtonRequestChannel, hide?: boolean): Hideable<KeyboardButton.RequestChatButton>;
export declare function url(text: string, url: string, hide?: boolean): Hideable<InlineKeyboardButton.UrlButton>;
export declare function callback(text: string, data: string, hide?: boolean): Hideable<InlineKeyboardButton.CallbackButton>;
export declare function switchToChat(text: string, value: string, hide?: boolean): Hideable<InlineKeyboardButton.SwitchInlineButton>;
export declare function switchToCurrentChat(text: string, value: string, hide?: boolean): Hideable<InlineKeyboardButton.SwitchInlineCurrentChatButton>;
export declare function game(text: string, hide?: boolean): Hideable<InlineKeyboardButton.GameButton>;
export declare function pay(text: string, hide?: boolean): Hideable<InlineKeyboardButton.PayButton>;
export declare function login(text: string, url: string, opts?: {
    forward_text?: string;
    bot_username?: string;
    request_write_access?: boolean;
}, hide?: boolean): Hideable<InlineKeyboardButton.LoginButton>;
export declare function webApp(text: string, url: string, hide?: boolean): Hideable<InlineKeyboardButton.WebAppButton>;
export {};
//# sourceMappingURL=button.d.ts.map