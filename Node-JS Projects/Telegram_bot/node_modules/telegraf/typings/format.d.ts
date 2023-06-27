import { User } from 'typegram';
import { FmtString, join } from './core/helpers/formatting';
export { FmtString };
declare const fmt: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const bold: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const italic: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const spoiler: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const strikethrough: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const underline: (parts: string | FmtString | readonly (string | FmtString)[], ...items: (FmtString | ({} | null | undefined))[]) => FmtString;
declare const code: (parts: string | FmtString | readonly (string | FmtString)[], ...items: ({} | null | undefined)[]) => FmtString;
declare const pre: (language: string) => (parts: string | FmtString | readonly (string | FmtString)[], ...items: ({} | null | undefined)[]) => FmtString;
declare const link: (content: string | FmtString, url: string) => FmtString;
declare const mention: (name: string | FmtString, user: number | User) => FmtString;
export { fmt, bold, italic, spoiler, strikethrough, underline, code, pre, link, mention, join, };
//# sourceMappingURL=format.d.ts.map