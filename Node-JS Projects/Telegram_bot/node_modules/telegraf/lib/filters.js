"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.either = exports.callbackQuery = exports.editedChannelPost = exports.channelPost = exports.editedMessage = exports.message = void 0;
const message = (...keys) => (update) => {
    if (!('message' in update))
        return false;
    for (const key of keys) {
        if (!(key in update.message))
            return false;
    }
    return true;
};
exports.message = message;
const editedMessage = (...keys) => (update) => {
    if (!('edited_message' in update))
        return false;
    for (const key of keys) {
        if (!(key in update.edited_message))
            return false;
    }
    return true;
};
exports.editedMessage = editedMessage;
const channelPost = (...keys) => (update) => {
    if (!('channel_post' in update))
        return false;
    for (const key of keys) {
        if (!(key in update.channel_post))
            return false;
    }
    return true;
};
exports.channelPost = channelPost;
const editedChannelPost = (...keys) => (update) => {
    if (!('edited_channel_post' in update))
        return false;
    for (const key of keys) {
        if (!(key in update.edited_channel_post))
            return false;
    }
    return true;
};
exports.editedChannelPost = editedChannelPost;
const callbackQuery = (...keys) => (update) => {
    if (!('callback_query' in update))
        return false;
    for (const key of keys) {
        if (!(key in update.callback_query))
            return false;
    }
    return true;
};
exports.callbackQuery = callbackQuery;
const either = (...filters) => (update) => {
    for (const filter of filters) {
        if (filter(update))
            return true;
    }
    return false;
};
exports.either = either;
