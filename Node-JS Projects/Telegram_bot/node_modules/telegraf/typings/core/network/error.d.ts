import { ResponseParameters } from '../types/typegram';
interface ErrorPayload {
    error_code: number;
    description: string;
    parameters?: ResponseParameters;
}
export declare class TelegramError extends Error {
    readonly response: ErrorPayload;
    readonly on: {};
    constructor(response: ErrorPayload, on?: {});
    get code(): number;
    get description(): string;
    get parameters(): ResponseParameters | undefined;
}
export default TelegramError;
//# sourceMappingURL=error.d.ts.map