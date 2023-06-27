/// <reference types="node" />
/// <reference types="node" />
import SandwichStream from 'sandwich-stream';
interface Part {
    headers: {
        [key: string]: string;
    };
    body: NodeJS.ReadStream | NodeJS.ReadableStream | string;
}
declare class MultipartStream extends SandwichStream {
    constructor(boundary: string);
    addPart(part: Part): void;
    static isStream(stream: unknown): stream is {
        pipe: MultipartStream['pipe'];
    };
}
export default MultipartStream;
//# sourceMappingURL=multipart-stream.d.ts.map