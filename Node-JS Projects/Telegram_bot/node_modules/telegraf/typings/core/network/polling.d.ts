import * as tg from '../types/typegram';
import * as tt from '../../telegram-types';
import ApiClient from './client';
export declare class Polling {
    private readonly telegram;
    private readonly allowedUpdates;
    private readonly abortController;
    private skipOffsetSync;
    private offset;
    constructor(telegram: ApiClient, allowedUpdates: readonly tt.UpdateType[]);
    private [Symbol.asyncIterator];
    private syncUpdateOffset;
    loop(handleUpdate: (updates: tg.Update) => Promise<void>): Promise<void>;
    stop(): void;
}
//# sourceMappingURL=polling.d.ts.map