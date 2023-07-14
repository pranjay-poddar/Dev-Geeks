/// <reference types="node" />
import { Socket } from "./socket";
import { Server } from "./index";
import { Client } from "./client";
import { EventEmitter } from "events";
import { Adapter, Room, SocketId } from "socket.io-adapter";
export interface ExtendedError extends Error {
    data?: any;
}
export declare class Namespace extends EventEmitter {
    readonly name: string;
    readonly sockets: Map<SocketId, Socket>;
    adapter: Adapter;
    /** @private */
    readonly server: Server;
    /** @private */
    _fns: Array<(socket: Socket, next: (err: ExtendedError) => void) => void>;
    /** @private */
    _rooms: Set<Room>;
    /** @private */
    _flags: any;
    /** @private */
    _ids: number;
    /**
     * Namespace constructor.
     *
     * @param {Server} server instance
     * @param {string} name
     */
    constructor(server: Server, name: string);
    /**
     * Initializes the `Adapter` for this nsp.
     * Run upon changing adapter by `Server#adapter`
     * in addition to the constructor.
     *
     * @private
     */
    _initAdapter(): void;
    /**
     * Sets up namespace middleware.
     *
     * @return {Namespace} self
     * @public
     */
    use(fn: (socket: Socket, next: (err?: ExtendedError) => void) => void): Namespace;
    /**
     * Executes the middleware for an incoming client.
     *
     * @param {Socket} socket - the socket that will get added
     * @param {Function} fn - last fn call in the middleware
     * @private
     */
    private run;
    /**
     * Targets a room when emitting.
     *
     * @param {String} name
     * @return {Namespace} self
     * @public
     */
    to(name: Room): Namespace;
    /**
     * Targets a room when emitting.
     *
     * @param {String} name
     * @return {Namespace} self
     * @public
     */
    in(name: Room): Namespace;
    /**
     * Adds a new client.
     *
     * @return {Socket}
     * @private
     */
    _add(client: Client, query: any, fn?: () => void): Socket;
    /**
     * Removes a client. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket: Socket): void;
    /**
     * Emits to all clients.
     *
     * @return {Boolean} Always true
     * @public
     */
    emit(ev: string, ...args: any[]): boolean;
    /**
     * Sends a `message` event to all clients.
     *
     * @return {Namespace} self
     * @public
     */
    send(...args: any[]): Namespace;
    /**
     * Sends a `message` event to all clients.
     *
     * @return {Namespace} self
     * @public
     */
    write(...args: any[]): Namespace;
    /**
     * Gets a list of clients.
     *
     * @return {Namespace} self
     * @public
     */
    allSockets(): Promise<Set<SocketId>>;
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Namespace} self
     * @public
     */
    compress(compress: boolean): Namespace;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return {Namespace} self
     * @public
     */
    get volatile(): Namespace;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return {Namespace} self
     * @public
     */
    get local(): Namespace;
}
