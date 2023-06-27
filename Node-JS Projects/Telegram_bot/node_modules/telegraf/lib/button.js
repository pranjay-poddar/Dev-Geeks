"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webApp = exports.login = exports.pay = exports.game = exports.switchToCurrentChat = exports.switchToChat = exports.callback = exports.url = exports.channelRequest = exports.groupRequest = exports.botRequest = exports.userRequest = exports.pollRequest = exports.locationRequest = exports.contactRequest = exports.text = void 0;
function text(text, hide = false) {
    return { text, hide };
}
exports.text = text;
function contactRequest(text, hide = false) {
    return { text, request_contact: true, hide };
}
exports.contactRequest = contactRequest;
function locationRequest(text, hide = false) {
    return { text, request_location: true, hide };
}
exports.locationRequest = locationRequest;
function pollRequest(text, type, hide = false) {
    return { text, request_poll: { type }, hide };
}
exports.pollRequest = pollRequest;
function userRequest(text, 
/** Must fit in a signed 32 bit int */
request_id, user_is_premium, hide = false) {
    return { text, request_user: { request_id, user_is_premium }, hide };
}
exports.userRequest = userRequest;
function botRequest(text, 
/** Must fit in a signed 32 bit int */
request_id, hide = false) {
    return { text, request_user: { request_id, user_is_bot: true }, hide };
}
exports.botRequest = botRequest;
function groupRequest(text, 
/** Must fit in a signed 32 bit int */
request_id, extra, hide = false) {
    return {
        text,
        request_chat: { request_id, chat_is_channel: false, ...extra },
        hide,
    };
}
exports.groupRequest = groupRequest;
function channelRequest(text, 
/** Must fit in a signed 32 bit int */
request_id, extra, hide = false) {
    return {
        text,
        request_chat: { request_id, chat_is_channel: true, ...extra },
        hide,
    };
}
exports.channelRequest = channelRequest;
function url(text, url, hide = false) {
    return { text, url, hide };
}
exports.url = url;
function callback(text, data, hide = false) {
    return { text, callback_data: data, hide };
}
exports.callback = callback;
function switchToChat(text, value, hide = false) {
    return { text, switch_inline_query: value, hide };
}
exports.switchToChat = switchToChat;
function switchToCurrentChat(text, value, hide = false) {
    return { text, switch_inline_query_current_chat: value, hide };
}
exports.switchToCurrentChat = switchToCurrentChat;
function game(text, hide = false) {
    return { text, callback_game: {}, hide };
}
exports.game = game;
function pay(text, hide = false) {
    return { text, pay: true, hide };
}
exports.pay = pay;
function login(text, url, opts = {}, hide = false) {
    return {
        text,
        login_url: { ...opts, url },
        hide,
    };
}
exports.login = login;
function webApp(text, url, hide = false
// works as both InlineKeyboardButton and KeyboardButton
) {
    return {
        text,
        web_app: { url },
        hide,
    };
}
exports.webApp = webApp;
