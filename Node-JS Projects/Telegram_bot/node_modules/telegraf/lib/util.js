"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.fmtCaption = exports.env = void 0;
exports.env = process.env;
function fmtCaption(extra) {
    if (!extra)
        return;
    const caption = extra.caption;
    if (!caption || typeof caption === 'string')
        return extra;
    const { text, entities } = caption;
    return {
        ...extra,
        caption: text,
        ...(entities && {
            caption_entities: entities,
            parse_mode: undefined,
        }),
    };
}
exports.fmtCaption = fmtCaption;
function* zip(xs, ys) {
    const x = xs[Symbol.iterator]();
    const y = ys[Symbol.iterator]();
    let x1 = x.next();
    let y1 = y.next();
    while (!x1.done) {
        yield x1.value;
        if (!y1.done)
            yield y1.value;
        x1 = x.next();
        y1 = y.next();
    }
    while (!y1.done) {
        yield y1.value;
        y1 = y.next();
    }
}
exports.zip = zip;
