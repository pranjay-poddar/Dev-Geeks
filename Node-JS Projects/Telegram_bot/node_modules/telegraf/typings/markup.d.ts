import { ForceReply, InlineKeyboardButton, InlineKeyboardMarkup, KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove } from './core/types/typegram';
type Hideable<B> = B & {
    hide?: boolean;
};
type HideableKBtn = Hideable<KeyboardButton>;
type HideableIKBtn = Hideable<InlineKeyboardButton>;
export declare class Markup<T extends InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply> {
    readonly reply_markup: T;
    constructor(reply_markup: T);
    selective<T extends ForceReply | ReplyKeyboardMarkup>(this: Markup<T>, value?: boolean): Markup<T>;
    placeholder<T extends ForceReply | ReplyKeyboardMarkup>(this: Markup<T>, placeholder: string): Markup<T>;
    resize(this: Markup<ReplyKeyboardMarkup>, value?: boolean): Markup<ReplyKeyboardMarkup>;
    oneTime(this: Markup<ReplyKeyboardMarkup>, value?: boolean): Markup<ReplyKeyboardMarkup>;
}
export * as button from './button';
export declare function removeKeyboard(): Markup<ReplyKeyboardRemove>;
export declare function forceReply(): Markup<ForceReply>;
export declare function keyboard(buttons: HideableKBtn[][]): Markup<ReplyKeyboardMarkup>;
export declare function keyboard(buttons: HideableKBtn[], options?: Partial<KeyboardBuildingOptions<HideableKBtn>>): Markup<ReplyKeyboardMarkup>;
export declare function inlineKeyboard(buttons: HideableIKBtn[][]): Markup<InlineKeyboardMarkup>;
export declare function inlineKeyboard(buttons: HideableIKBtn[], options?: Partial<KeyboardBuildingOptions<HideableIKBtn>>): Markup<InlineKeyboardMarkup>;
interface KeyboardBuildingOptions<B extends HideableKBtn | HideableIKBtn> {
    wrap?: (btn: B, index: number, currentRow: B[]) => boolean;
    columns: number;
}
//# sourceMappingURL=markup.d.ts.map