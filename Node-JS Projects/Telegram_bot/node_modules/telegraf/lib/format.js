"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.join = exports.mention = exports.link = exports.pre = exports.code = exports.underline = exports.strikethrough = exports.spoiler = exports.italic = exports.bold = exports.fmt = exports.FmtString = void 0;
const formatting_1 = require("./core/helpers/formatting");
Object.defineProperty(exports, "FmtString", { enumerable: true, get: function () { return formatting_1.FmtString; } });
Object.defineProperty(exports, "join", { enumerable: true, get: function () { return formatting_1.join; } });
const fmt = (0, formatting_1._fmt)();
exports.fmt = fmt;
const bold = (0, formatting_1._fmt)('bold');
exports.bold = bold;
const italic = (0, formatting_1._fmt)('italic');
exports.italic = italic;
const spoiler = (0, formatting_1._fmt)('spoiler');
exports.spoiler = spoiler;
const strikethrough = (0, formatting_1._fmt)('strikethrough');
exports.strikethrough = strikethrough;
const underline = (0, formatting_1._fmt)('underline');
exports.underline = underline;
const code = (0, formatting_1._fmt)('code');
exports.code = code;
const pre = (language) => (0, formatting_1._fmt)('pre', { language });
exports.pre = pre;
const link = (content, url) => (0, formatting_1.linkOrMention)(content, { type: 'text_link', url });
exports.link = link;
const mention = (name, user) => typeof user === 'number'
    ? link(name, 'tg://user?id=' + user)
    : (0, formatting_1.linkOrMention)(name, { type: 'text_mention', user });
exports.mention = mention;
