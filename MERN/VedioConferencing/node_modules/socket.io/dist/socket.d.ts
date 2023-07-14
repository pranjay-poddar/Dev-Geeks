/// <reference types="node" />
import { EventEmitter } from "events";
import { Client } from "./client";
import { Namespace } from "./namespace";
import { IncomingMessage } from "http";
import { Room, SocketId } from "socket.io-adapter";
export declare const RESERVED_EVENTS: Set<string>;
/**
 * The handshake details
 */
export interface Handshake {
    /**
     * The headers sent as part of the handshake
     */
    headers: object;
    /**
     * The date of creation (as string)
     */
    time: string;
    /**
     * The ip of the client
     */
    address: string;
    /**
     * Whether the connection is cross-domain
     */
    xdomain: boolean;
    /**
     * Whether the connection is secure
     */
    secure: boolean;
    /**
     * The date of creation (as unix timestamp)
     */
    issued: number;
    /**
     * The request URL string
     */
    url: string;
    /**
     * The query object
     */
    query: object;
    /**
     * The auth object
     */
    auth: object;
}
export declare class Socket extends EventEmitter {
    readonly nsp: Namespace;
    readonly client: Client;
    readonly id: SocketId;
    readonly handshake: Handshake;
    connected: boolean;
    disconnected: boolean;
    private readonly server;
    private readonly adapter;
    private acks;
    private fns;
    private flags;
    private _rooms;
    private _anyListeners;
    /**
     * Interface to a `Client` for a given `Namespace`.
     *
     * @param {Namespace} nsp
     * @param {Client} client
     * @param {Object} auth
     * @package
     */
    constructor(nsp: Namespace, client: Client, auth: object);
    /**
     * Builds the `handshake` BC object
     *
     * @private
     */
    private buildHandshake;
    /**
     * Emits to this client.
     *
     * @return {Boolean} Always true
     * @public
     */
    emit(ev: string, ...args: any[]): boolean;
    /**
     * Targets a room when broadcasting.
     *
     * @param {String} name
     * @return {Socket} self
     * @public
     */
    to(name: Room): this;
    /**
     * Targets a room when broadcasting.
     *
     * @param {String} name
     * @return {Socket} self
     * @public
     */
    in(name: Room): Socket;
    /**
     * Sends a `message` event.
     *
     * @return {Socket} self
     * @public
     */
    send(...args: any[]): Socket;
    /**
     * Sends a `message` event.
     *
     * @return {Socket} self
     * @public
     */
    write(...args: any[]): Socket;
    /**
     * Writes a packet.
     *
     * @param {Object} packet - packet object
     * @param {Object} opts - options
     * @private
     */
    private packet;
    /**
     * Joins a room.
     *
     * @param {String|Array} rooms - room or array of rooms
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    join(rooms: Room | Array<Room>): Promise<void> | void;
    /**
     * Leaves a room.
     *
     * @param {String} room
     * @return a Promise or nothing, depending on the adapter
     * @public
     */
    leave(room: string): Promise<void> | void;
    /**
     * Leave all rooms.
     *
     * @private
     */
    private leaveAll;
    /**
     * Called by `Namespace` upon successful
     * middleware execution (ie: authorization).
     * Socket is added to namespace array before
     * call to join, so adapters can access it.
     *
     * @private
     */
    _onconnect(): void;
    /**
     * Called with each packet. Called by `Client`.
     *
     * @param {Object} packet
     * @private
     */
    _onpacket(packet: any): void;
    /**
     * Called upon event packet.
     *
     * @param {Object} packet - packet object
     * @private
     */
    private onevent;
    /**
     * Produces an ack callback to emit with an event.
     *
     * @param {Number} id - packet id
     * @private
     */
    private ack;
    /**
     * Called upon ack packet.
     *
     * @private
     */
    private onack;
    /**
     * Called upon client disconnect packet.
     *
     * @private
     */
    private ondisconnect;
    /**
     * Handles a client error.
     *
     * @private
     */
    _onerror(err: any): void;
    /**
     * Called upon closing. Called by `Client`.
     *
     * @param {String} reason
     * @throw {Error} optional error object
     *
     * @private
     */
    _onclose(reason: string): this;
    /**
     * Produces an `error` packet.
     *
     * @param {Object} err - error object
     *
     * @private
     */
    _error(err: any): void;
    /**
     * Disconnects this client.
     *
     * @param {Boolean} close - if `true`, closes the underlying connection
     * @return {Socket} self
     *
     * @public
     */
    disconnect(close?: boolean): Socket;
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Socket} self
     * @public
     */
    compress(compress: boolean): Socket;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return {Socket} self
     * @public
     */
    get volatile(): Socket;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to every sockets but the
     * sender.
     *
     * @return {Socket} self
     * @public
     */
    get broadcast(): Socket;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return {Socket} self
     * @public
     */
    get local(): Socket;
    /**
     * A reference to the request that originated the underlying Engine.IO Socket.
     *
     * @public
     */
    get request(): IncomingMessage;
    /**
     * A reference to the underlying Client transport connection (Engine.IO Socket object).
     *
     * @public
     */
    get conn(): any;
    /**
     * @public
     */
    get rooms(): Set<Room>;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @param listener
     * @public
     */
    onAny(listener: (...args: any[]) => void): Socket;
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @param listener
     * @public
     */
    prependAny(listener: (...args: any[]) => void): Socket;
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param listener
     * @public
     */
    offAny(listener?: (...args: any[]) => void): Socket;
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     *
     * @public
     */
    listenersAny(): ((...args: any[]) => void)[];
}
