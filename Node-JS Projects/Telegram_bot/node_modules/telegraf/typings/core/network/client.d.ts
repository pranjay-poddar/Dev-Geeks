/// <reference types="node" />
/// <reference types="node" />
import * as http from 'http';
import { Opts, Telegram } from '../types/typegram';
import { AbortSignal } from 'abort-controller';
import { URL } from 'url';
declare namespace ApiClient {
    type Agent = http.Agent | ((parsedUrl: URL) => http.Agent) | undefined;
    interface Options {
        /**
         * Agent for communicating with the bot API.
         */
        agent?: http.Agent;
        /**
         * Agent for attaching files via URL.
         * 1. Not all agents support both `http:` and `https:`.
         * 2. When passing a function, create the agents once, outside of the function.
         *    Creating new agent every request probably breaks `keepAlive`.
         */
        attachmentAgent?: Agent;
        apiRoot: string;
        /**
         * @default 'bot'
         * @see https://github.com/tdlight-team/tdlight-telegram-bot-api#user-mode
         */
        apiMode: 'bot' | 'user';
        webhookReply: boolean;
        testEnv: boolean;
    }
    interface CallApiOptions {
        signal?: AbortSignal;
    }
}
type Response = http.ServerResponse;
declare class ApiClient {
    readonly token: string;
    private readonly response?;
    readonly options: ApiClient.Options;
    constructor(token: string, options?: Partial<ApiClient.Options>, response?: Response | undefined);
    /**
     * If set to `true`, first _eligible_ call will avoid performing a POST request.
     * Note that such a call:
     * 1. cannot report errors or return meaningful values,
     * 2. resolves before bot API has a chance to process it,
     * 3. prematurely confirms the update as processed.
     *
     * https://core.telegram.org/bots/faq#how-can-i-make-requests-in-response-to-updates
     * https://github.com/telegraf/telegraf/pull/1250
     */
    set webhookReply(enable: boolean);
    get webhookReply(): boolean;
    callApi<M extends keyof Telegram>(method: M, payload: Opts<M>, { signal }?: ApiClient.CallApiOptions): Promise<ReturnType<Telegram[M]>>;
}
export default ApiClient;
//# sourceMappingURL=client.d.ts.map