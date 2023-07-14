/// <reference types="node" />
import http = require("http");
import { EventEmitter } from "events";
import { ExtendedError, Namespace } from "./namespace";
import { Room, SocketId } from "socket.io-adapter";
import { Encoder } from "socket.io-parser";
import { Socket } from "./socket";
import { CookieSerializeOptions } from "cookie";
import { CorsOptions } from "cors";
declare type Transport = "polling" | "websocket";
interface EngineOptions {
    /**
     * how many ms without a pong packet to consider the connection closed
     * @default 5000
     */
    pingTimeout: number;
    /**
     * how many ms before sending a new ping packet
     * @default 25000
     */
    pingInterval: number;
    /**
     * how many ms before an uncompleted transport upgrade is cancelled
     * @default 10000
     */
    upgradeTimeout: number;
    /**
     * how many bytes or characters a message can be, before closing the session (to avoid DoS).
     * @default 1e5 (100 KB)
     */
    maxHttpBufferSize: number;
    /**
     * A function that receives a given handshake or upgrade request as its first parameter,
     * and can decide whether to continue or not. The second argument is a function that needs
     * to be called with the decided information: fn(err, success), where success is a boolean
     * value where false means that the request is rejected, and err is an error code.
     */
    allowRequest: (req: http.IncomingMessage, fn: (err: string | null | undefined, success: boolean) => void) => void;
    /**
     * the low-level transports that are enabled
     * @default ["polling", "websocket"]
     */
    transports: Transport[];
    /**
     * whether to allow transport upgrades
     * @default true
     */
    allowUpgrades: boolean;
    /**
     * parameters of the WebSocket permessage-deflate extension (see ws module api docs). Set to false to disable.
     * @default false
     */
    perMessageDeflate: boolean | object;
    /**
     * parameters of the http compression for the polling transports (see zlib api docs). Set to false to disable.
     * @default true
     */
    httpCompression: boolean | object;
    /**
     * what WebSocket server implementation to use. Specified module must
     * conform to the ws interface (see ws module api docs). Default value is ws.
     * An alternative c++ addon is also available by installing uws module.
     */
    wsEngine: string;
    /**
     * an optional packet which will be concatenated to the handshake packet emitted by Engine.IO.
     */
    initialPacket: any;
    /**
     * configuration of the cookie that contains the client sid to send as part of handshake response headers. This cookie
     * might be used for sticky-session. Defaults to not sending any cookie.
     * @default false
     */
    cookie: CookieSerializeOptions | boolean;
    /**
     * the options that will be forwarded to the cors module
     */
    cors: CorsOptions;
}
interface AttachOptions {
    /**
     * name of the path to capture
     * @default "/engine.io"
     */
    path: string;
    /**
     * destroy unhandled upgrade requests
     * @default true
     */
    destroyUpgrade: boolean;
    /**
     * milliseconds after which unhandled requests are ended
     * @default 1000
     */
    destroyUpgradeTimeout: number;
}
interface EngineAttachOptions extends EngineOptions, AttachOptions {
}
interface ServerOptions extends EngineAttachOptions {
    /**
     * name of the path to capture
     * @default "/socket.io"
     */
    path: string;
    /**
     * whether to serve the client files
     * @default true
     */
    serveClient: boolean;
    /**
     * the adapter to use
     * @default the in-memory adapter (https://github.com/socketio/socket.io-adapter)
     */
    adapter: any;
    /**
     * the parser to use
     * @default the default parser (https://github.com/socketio/socket.io-parser)
     */
    parser: any;
    /**
     * how many ms before a client without namespace is closed
     * @default 45000
     */
    connectTimeout: number;
}
export declare class Server extends EventEmitter {
    readonly sockets: Namespace;
    /** @private */
    readonly _parser: any;
    /** @private */
    readonly encoder: Encoder;
    /**
     * @private
     */
    _nsps: Map<string, Namespace>;
    private parentNsps;
    private _adapter;
    private _serveClient;
    private eio;
    private engine;
    private _path;
    private clientPathRegex;
    /**
     * @private
     */
    _connectTimeout: number;
    private httpServer;
    /**
     * Server constructor.
     *
     * @param {http.Server|Number|Object} srv http server, port or options
     * @param {Object} [opts]
     * @public
     */
    constructor(opts?: Partial<ServerOptions>);
    constructor(srv: http.Server, opts?: Partial<ServerOptions>);
    constructor(srv: number, opts?: Partial<ServerOptions>);
    /**
     * Sets/gets whether client code is being served.
     *
     * @param {Boolean} v - whether to serve client code
     * @return {Server|Boolean} self when setting or value when getting
     * @public
     */
    serveClient(v: boolean): Server;
    serveClient(): boolean;
    /**
     * Executes the middleware for an incoming namespace not already created on the server.
     *
     * @param {String} name - name of incoming namespace
     * @param {Object} auth - the auth parameters
     * @param {Function} fn - callback
     *
     * @private
     */
    _checkNamespace(name: string, auth: object, fn: (nsp: Namespace | boolean) => void): void;
    /**
     * Sets the client serving path.
     *
     * @param {String} v pathname
     * @return {Server|String} self when setting or value when getting
     * @public
     */
    path(v: string): Server;
    path(): string;
    /**
     * Set the delay after which a client without namespace is closed
     * @param v
     * @public
     */
    connectTimeout(v: number): Server;
    connectTimeout(): number;
    /**
     * Sets the adapter for rooms.
     *
     * @param {Adapter} v pathname
     * @return {Server|Adapter} self when setting or value when getting
     * @public
     */
    adapter(): any;
    adapter(v: any): any;
    /**
     * Attaches socket.io to a server or port.
     *
     * @param {http.Server|Number} srv - server or port
     * @param {Object} opts - options passed to engine.io
     * @return {Server} self
     * @public
     */
    listen(srv: http.Server, opts?: Partial<ServerOptions>): Server;
    listen(srv: number, opts?: Partial<ServerOptions>): Server;
    /**
     * Attaches socket.io to a server or port.
     *
     * @param {http.Server|Number} srv - server or port
     * @param {Object} opts - options passed to engine.io
     * @return {Server} self
     * @public
     */
    attach(srv: http.Server, opts?: Partial<ServerOptions>): Server;
    attach(port: number, opts?: Partial<ServerOptions>): Server;
    /**
     * Initialize engine
     *
     * @param srv - the server to attach to
     * @param opts - options passed to engine.io
     * @private
     */
    private initEngine;
    /**
     * Attaches the static file serving.
     *
     * @param {Function|http.Server} srv http server
     * @private
     */
    private attachServe;
    /**
     * Handles a request serving of client source and map
     *
     * @param {http.IncomingMessage} req
     * @param {http.ServerResponse} res
     * @private
     */
    private serve;
    /**
     * @param filename
     * @param req
     * @param res
     * @private
     */
    private static sendFile;
    /**
     * Binds socket.io to an engine.io instance.
     *
     * @param {engine.Server} engine engine.io (or compatible) server
     * @return {Server} self
     * @public
     */
    bind(engine: any): Server;
    /**
     * Called with each incoming transport connection.
     *
     * @param {engine.Socket} conn
     * @return {Server} self
     * @private
     */
    private onconnection;
    /**
     * Looks up a namespace.
     *
     * @param {String|RegExp|Function} name nsp name
     * @param {Function} [fn] optional, nsp `connection` ev handler
     * @public
     */
    of(name: string | RegExp | ((name: string, query: object, fn: (err: Error, success: boolean) => void) => void), fn?: (socket: Socket) => void): Namespace;
    /**
     * Closes server connection
     *
     * @param {Function} [fn] optional, called as `fn([err])` on error OR all conns closed
     * @public
     */
    close(fn?: (err?: Error) => void): void;
    /**
     * Sets up namespace middleware.
     *
     * @return {Server} self
     * @public
     */
    use(fn: (socket: Socket, next: (err?: ExtendedError) => void) => void): Server;
    /**
     * Targets a room when emitting.
     *
     * @param {String} name
     * @return {Server} self
     * @public
     */
    to(name: Room): Server;
    /**
     * Targets a room when emitting.
     *
     * @param {String} name
     * @return {Server} self
     * @public
     */
    in(name: Room): Server;
    /**
     * Sends a `message` event to all clients.
     *
     * @return {Server} self
     * @public
     */
    send(...args: any[]): Server;
    /**
     * Sends a `message` event to all clients.
     *
     * @return {Server} self
     * @public
     */
    write(...args: any[]): Server;
    /**
     * Gets a list of socket ids.
     *
     * @public
     */
    allSockets(): Promise<Set<SocketId>>;
    /**
     * Sets the compress flag.
     *
     * @param {Boolean} compress - if `true`, compresses the sending data
     * @return {Server} self
     * @public
     */
    compress(compress: boolean): Server;
    /**
     * Sets a modifier for a subsequent event emission that the event data may be lost if the client is not ready to
     * receive messages (because of network slowness or other issues, or because they’re connected through long polling
     * and is in the middle of a request-response cycle).
     *
     * @return {Server} self
     * @public
     */
    get volatile(): Server;
    /**
     * Sets a modifier for a subsequent event emission that the event data will only be broadcast to the current node.
     *
     * @return {Server} self
     * @public
     */
    get local(): Server;
}
export { Socket, ServerOptions, Namespace };
