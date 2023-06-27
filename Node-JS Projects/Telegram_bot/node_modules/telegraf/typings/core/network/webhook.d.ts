/// <reference types="node" />
import * as http from 'http';
import { type Update } from '../types/typegram';
export default function generateWebhook(filter: (req: http.IncomingMessage) => boolean, updateHandler: (update: Update, res: http.ServerResponse) => Promise<void>): (req: http.IncomingMessage & {
    body?: Update;
}, res: http.ServerResponse, next?: () => void) => Promise<void>;
//# sourceMappingURL=webhook.d.ts.map