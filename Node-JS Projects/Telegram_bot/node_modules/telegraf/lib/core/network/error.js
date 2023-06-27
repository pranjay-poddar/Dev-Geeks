"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramError = void 0;
class TelegramError extends Error {
    constructor(response, on = {}) {
        super(`${response.error_code}: ${response.description}`);
        this.response = response;
        this.on = on;
    }
    get code() {
        return this.response.error_code;
    }
    get description() {
        return this.response.description;
    }
    get parameters() {
        return this.response.parameters;
    }
}
exports.TelegramError = TelegramError;
exports.default = TelegramError;
