/// <reference types="node" />
import { IncomingMessage } from "http";
import { Server } from "./index";
import { Socket } from "./socket";
export declare class Client {
    readonly conn: any;
    private readonly id;
    private readonly server;
    private readonly encoder;
    private readonly decoder;
    private sockets;
    private nsps;
    private connectTimeout;
    /**
     * Client constructor.
     *
     * @param {Server} server instance
     * @param {Socket} conn
     * @package
     */
    constructor(server: Server, conn: any);
    /**
     * @return the reference to the request that originated the Engine.IO connection
     *
     * @public
     */
    get request(): IncomingMessage;
    /**
     * Sets up event listeners.
     *
     * @private
     */
    private setup;
    /**
     * Connects a client to a namespace.
     *
     * @param {String} name - the namespace
     * @param {Object} auth - the auth parameters
     * @private
     */
    private connect;
    /**
     * Connects a client to a namespace.
     *
     * @param {String} name - the namespace
     * @param {Object} auth - the auth parameters
     *
     * @private
     */
    private doConnect;
    /**
     * Disconnects from all namespaces and closes transport.
     *
     * @private
     */
    _disconnect(): void;
    /**
     * Removes a socket. Called by each `Socket`.
     *
     * @private
     */
    _remove(socket: Socket): void;
    /**
     * Closes the underlying connection.
     *
     * @private
     */
    private close;
    /**
     * Writes a packet to the transport.
     *
     * @param {Object} packet object
     * @param {Object} opts
     * @private
     */
    _packet(packet: any, opts?: any): void;
    /**
     * Called with incoming transport data.
     *
     * @private
     */
    private ondata;
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    private ondecoded;
    /**
     * Handles an error.
     *
     * @param {Object} err object
     * @private
     */
    private onerror;
    /**
     * Called upon transport close.
     *
     * @param reason
     * @private
     */
    private onclose;
    /**
     * Cleans up event listeners.
     * @private
     */
    private destroy;
}
