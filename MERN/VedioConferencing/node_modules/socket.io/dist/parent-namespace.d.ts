import { Namespace } from "./namespace";
export declare class ParentNamespace extends Namespace {
    private static count;
    private children;
    constructor(server: any);
    _initAdapter(): void;
    emit(...args: any[]): boolean;
    createChild(name: any): Namespace;
}
