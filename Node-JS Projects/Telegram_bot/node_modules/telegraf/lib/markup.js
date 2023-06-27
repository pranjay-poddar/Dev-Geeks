"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inlineKeyboard = exports.keyboard = exports.forceReply = exports.removeKeyboard = exports.button = exports.Markup = void 0;
const check_1 = require("./core/helpers/check");
class Markup {
    constructor(reply_markup) {
        this.reply_markup = reply_markup;
    }
    selective(value = true) {
        return new Markup({ ...this.reply_markup, selective: value });
    }
    placeholder(placeholder) {
        return new Markup({
            ...this.reply_markup,
            input_field_placeholder: placeholder,
        });
    }
    resize(value = true) {
        return new Markup({
            ...this.reply_markup,
            resize_keyboard: value,
        });
    }
    oneTime(value = true) {
        return new Markup({
            ...this.reply_markup,
            one_time_keyboard: value,
        });
    }
}
exports.Markup = Markup;
exports.button = __importStar(require("./button"));
function removeKeyboard() {
    return new Markup({ remove_keyboard: true });
}
exports.removeKeyboard = removeKeyboard;
function forceReply() {
    return new Markup({ force_reply: true });
}
exports.forceReply = forceReply;
function keyboard(buttons, options) {
    const keyboard = buildKeyboard(buttons, {
        columns: 1,
        ...options,
    });
    return new Markup({ keyboard });
}
exports.keyboard = keyboard;
function inlineKeyboard(buttons, options) {
    const inlineKeyboard = buildKeyboard(buttons, {
        columns: buttons.length,
        ...options,
    });
    return new Markup({ inline_keyboard: inlineKeyboard });
}
exports.inlineKeyboard = inlineKeyboard;
function buildKeyboard(buttons, options) {
    const result = [];
    if (!Array.isArray(buttons)) {
        return result;
    }
    if ((0, check_1.is2D)(buttons)) {
        return buttons.map((row) => row.filter((button) => !button.hide));
    }
    const wrapFn = options.wrap !== undefined
        ? options.wrap
        : (_btn, _index, currentRow) => currentRow.length >= options.columns;
    let currentRow = [];
    let index = 0;
    for (const btn of buttons.filter((button) => !button.hide)) {
        if (wrapFn(btn, index, currentRow) && currentRow.length > 0) {
            result.push(currentRow);
            currentRow = [];
        }
        currentRow.push(btn);
        index++;
    }
    if (currentRow.length > 0) {
        result.push(currentRow);
    }
    return result;
}
