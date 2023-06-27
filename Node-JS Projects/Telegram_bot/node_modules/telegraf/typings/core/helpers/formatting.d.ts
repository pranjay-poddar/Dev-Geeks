import { MessageEntity, User } from 'typegram';
export interface FmtString {
    text: string;
    entities?: MessageEntity[];
    parse_mode?: undefined;
}
export declare class FmtString implements FmtString {
    text: string;
    constructor(text: string, entities?: MessageEntity[]);
    static normalise(content: string | FmtString): FmtString;
}
export declare namespace Types {
    type Containers = 'bold' | 'italic' | 'spoiler' | 'strikethrough' | 'underline';
    type NonContainers = 'code' | 'pre';
    type Text = Containers | NonContainers;
}
type TemplateParts = string | FmtString | readonly (FmtString | string)[];
type Any = {} | undefined | null;
/**
 * Given an `Iterable<FmtString | string | Any>` and a separator, flattens the list into a single FmtString.
 * Analogous to Array#join -> string, but for FmtString
 */
export declare const join: (fragments: Iterable<FmtString | string | Any>, separator?: string | FmtString) => FmtString;
/** Internal constructor for all fmt helpers */
export declare function _fmt(kind?: Types.Containers): (parts: TemplateParts, ...items: (Any | FmtString)[]) => FmtString;
export declare function _fmt(kind: Types.NonContainers): (parts: TemplateParts, ...items: Any[]) => FmtString;
export declare function _fmt(kind: 'pre', opts: {
    language: string;
}): (parts: TemplateParts, ...items: Any[]) => FmtString;
export declare const linkOrMention: (content: string | FmtString, data: {
    type: 'text_link';
    url: string;
} | {
    type: 'text_mention';
    user: User;
}) => FmtString;
export {};
//# sourceMappingURL=formatting.d.ts.map