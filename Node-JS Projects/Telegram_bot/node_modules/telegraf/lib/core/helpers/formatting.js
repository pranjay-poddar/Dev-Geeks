"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkOrMention = exports._fmt = exports.join = exports.FmtString = void 0;
const util_1 = require("../../util");
class FmtString {
    constructor(text, entities) {
        this.text = text;
        if (entities) {
            this.entities = entities;
            // force parse_mode to undefined if entities are present
            this.parse_mode = undefined;
        }
    }
    static normalise(content) {
        if (typeof content === 'string')
            return new FmtString(content);
        return content;
    }
}
exports.FmtString = FmtString;
const isArray = Array.isArray;
/** Given a base FmtString and something to append to it, mutates the base */
const _add = (base, next) => {
    var _a;
    const len = base.text.length;
    if (next instanceof FmtString) {
        base.text = `${base.text}${next.text}`;
        // next.entities could be undefined and condition will fail
        for (let i = 0; i < (((_a = next.entities) === null || _a === void 0 ? void 0 : _a.length) || 0); i++) {
            // because of the above condition, next.entities[i] cannot be undefined
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const entity = next.entities[i];
            // base.entities is ensured by caller
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            base.entities.push({ ...entity, offset: entity.offset + len });
        }
    }
    else
        base.text = `${base.text}${next}`;
};
/**
 * Given an `Iterable<FmtString | string | Any>` and a separator, flattens the list into a single FmtString.
 * Analogous to Array#join -> string, but for FmtString
 */
const join = (fragments, separator) => {
    const result = new FmtString('');
    // ensure entities array so loop doesn't need to check
    result.entities = [];
    const iter = fragments[Symbol.iterator]();
    let curr = iter.next();
    while (!curr.done) {
        _add(result, curr.value);
        curr = iter.next();
        if (separator && !curr.done)
            _add(result, separator);
    }
    // set parse_mode: undefined if entities are present
    if (result.entities.length)
        result.parse_mode = undefined;
    // remove entities array if not relevant
    else
        delete result.entities;
    return result;
};
exports.join = join;
function _fmt(kind, opts) {
    return function fmt(parts, ...items) {
        var _a;
        parts = isArray(parts) ? parts : [parts];
        const result = (0, exports.join)((0, util_1.zip)(parts, items));
        if (kind) {
            (_a = result.entities) !== null && _a !== void 0 ? _a : (result.entities = []);
            result.entities.unshift({
                type: kind,
                offset: 0,
                length: result.text.length,
                ...opts,
            });
            result.parse_mode = undefined;
        }
        return result;
    };
}
exports._fmt = _fmt;
const linkOrMention = (content, data) => {
    const { text, entities = [] } = FmtString.normalise(content);
    entities.unshift(Object.assign(data, { offset: 0, length: text.length }));
    return new FmtString(text, entities);
};
exports.linkOrMention = linkOrMention;
