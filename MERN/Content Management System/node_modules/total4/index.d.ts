import { ChildProcess } from 'child_process';

type Framework = {
	is4: boolean;
	version: string;
	Child: any;
	Crypto: any;
	Fs: any;
	Http: any;
	Https: any;
	isBundle: boolean;
	OS: any;
	Path: any;
	Url: any;
	Worker: any;
	Zlib: any;
	usage: (detailed: boolean) => any;
	extendreq: (req: Request) => any;
	extendres: (res: Response) => any;
	serverless: (req: Request, res: Response, callback?: () => void, types?: string | string[], directory?: string) => any;
}

type ls = (path: string, callback: (files: any[], directories: any[]) => void, filter?: (path: string, isDirectory: boolean) => void) => void;
type ls2 = (path: string, callback: (files: any[], directories: any[]) => void, filter?: (path: string, isDirectory: boolean) => void) => void;

type FrameworkUtils = {
	atob: (value: string) => string;
	btoa: (value: string) => string;
	chunker: (name: string, max?: number) => Chunker;
	clone: (source: object, skip?: object) => any;
	combine: (param1?: string, param2?: string, param3?: string) => string;
	connect: (opt: { host: string, port: number, secure?: boolean, tls?: { host: string, port: number, ciphers?: string }}, callback: (err: any, meta: any) => void) => void;
	copy: (source: object, target?: object) => any;
	decode: (value: string) => string;
	decrpyt_crypto: (type: string, key: string, buffer: Buffer) => Buffer;
	decrypt_data: (value: string, key: string, encode?: 'base64' | 'hex' | 'buffer') => string;
	decrypt_uid: (value: string, key?: string) => number | string;
	distance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
	encode: (value: string) => string;
	encrypt_data: (value: string, key: string, encode?: 'base64' | 'hex' | 'buffer') => string;
	encrypt_crypto: (type: string, key: string, buffer: Buffer) => Buffer;
	encrypt_uid: (value: number | string, key?: string) => string;
	etag: (value: string, version?: string) => string;
	EventEmitter2: (obj: object) => void;
	extend: (target: object, source: object, rewrite?: boolean) => any;
	get: (obj: object, path: string) => any;
	getContentType: (extension: string) => string;
	getExtension: (extension: string) => string;
	getName: (path: string) => string;
	GUID: (max?: number) => string;
	httpstatus: (code: number, addCode?: boolean) => string;
	join: (path: string) => string;
	keywords: (content: string, forSearch?: boolean, alternative?: boolean, max_count?: number, max_length?: number, min_length?: number) => string[];
	link: (path1: string, path2: string, path3?: string, path4?: string, path5?: string) => string;
	ls: ls;
	ls2: ls2;
	minify_css: (value: string) => string;
	minify_html: (value: string) => string;
	minify_js: (value: string) => string;
	noop: () => () => void;
	normalize: (path: string) => string;
	parseBool: (value: any, def?: boolean) => boolean;
	parseFloat: (value: any, def?: boolean) => number;
	parseInt: (value: any, def?: boolean) => number;
	parseXML: (value: string, replace?: boolean) => any;
	path: (url: string, delimeter?: string) => string;
	queue: (name: string, maximum: number, fn: (next: () => void) => void) => boolean;
	random_number: (max: number) => number;
	random_string: (max: number) => string;
	random: (max?: number, min?: number) => number;
	reader: (items?: any[]) => DataReader;
	reduce: (source: any | any[], prop: any | string[], reverse?: boolean) => any;
	resolve: (url: string, callback?: (err: any, uri: any) => void) => string;
	set: (obj: any, path: string, value: any) => void;
	streamer: (beg: string | Buffer, end: string | Buffer, fn: (value: any, index: any) => void, skip?: number, stream?: any) => Function;
	streamer2: (beg: string | Buffer, end: string | Buffer, fn: (value: any, index: any) => void, skip?: number, stream?: any) => Function;
	trim: (obj: any | any[], clean?: boolean) => any;
}

type Chunker = {
	autoremove: boolean;
	compress: boolean;
	count: number;
	pages: number;
	percentage: number;
	clear: () => Chunker;
	destroy	: () => Chunker;
	each: (onDocuments: (docs: any, next: () => void) => void, callback?: () => void) => Chunker;
	end: () => Chunker;
	read: (page: number, callback: (err: any, docs: any) => void) => Chunker;
	write: (doc: object) => Chunker;
};

type DataReader = {
	count: () => QueryBuilder;
	find: () => QueryBuilder;
	list: () => QueryBuilder;
	read: () => QueryBuilder;
	scalar: (type: string, field: string, key?: string) => QueryBuilder;
	stats: (groupfield: string, datafield: string, scalarfield: string, type?: string) => QueryBuilder;
}

declare class ErrorBuilder {
	constructor(onResource?: (key: any) => void);
	errors: any[];
	is: boolean;
	length: number;
	status: number;
	unexpected: boolean;
	addTransform: (name: string, fn: (isresponse: boolean) => object | string, def?: boolean) => any;
	setDefaultTransform: (name: string) => void;
	clear: () => ErrorBuilder;
	exception: (message: string) => ErrorBuilder;
	json: (beautify?: boolean) => ErrorBuilder;
	output: (serialize?: boolean) => any | string;
	plain: () => ErrorBuilder;
	push: (name: string, description: string, status: number) => ErrorBuilder;
	read: (name: string) => string;
	remove: (name: string) => ErrorBuilder;
	replace: (search: string, text: string) => ErrorBuilder;
	resource: (name: string, prefix?: string) => ErrorBuilder;
	setContentType: (name: string) => ErrorBuilder;
	setPrefix: (prefix: string) => ErrorBuilder;
	setResource: (name: string) => ErrorBuilder;
	setTransform: (name: string) => ErrorBuilder;
	transform: (name: string) => any;
}

type HttpFile = {
	extension: string;
	filename: string;
	height: number;
	length: number;
	name: string;
	path: string;
	size: number;
	type: string;
	width: number;
	copy: (filename: string, callback?: () => void) => HttpFile;
	fs: (name: string, id: string, custom?: object, expire?: string, callback?: (err: any, id: any, meta: object) => void) => void; // todo: spravit meta
	image: () => FrameworkImage;
	isAudio: () => boolean;
	isVideo: () => boolean;
	isImage: () => boolean;
	md5: (callback: (err: any, hash: any) => void) => HttpFile;
	move: (filename: string, callback?: (err: any) => void) => HttpFile;
	pipe: (stream: any, callback?: (err: any) => void) => HttpFile;
	read: (callback: (err: any, data: any) => void) => HttpFile;
	readSync: () => HttpFile;
	stream: (options?: object) => HttpFile;
}

type FrameworkPath = {
	fs: any;
	ls: ls; 
	ls2: ls2;
	join: () => any;
	verify: (name: string) => void;
	mkdir: (path: string, cache: boolean) => void;
	exists: (path: string, callback: (error: boolean, size: number, isfile: boolean) => void) => void;
	public: (filename: string) => string;
	public_cache: (filename: string) => string;
	private: (filename: string) => string;
	configs: (filename: string) => string;
	logs: (filename: string) => string;
	models: (filename: string) => string;
	builds: (filename: string) => string;
	temp: (filename: string) => string;
	temporary: (filename: string) => string;
	views: (filename: string) => string;
	updates: (filename: string) => string;
	workers: (filename: string) => string;
	filestorage: (name: string) => string;
	databases: (filename: string) => string;
	modules: (filename: string) => string;
	schemas: (filename: string) => string;
	operations: (filename: string) => string;
	tasks: (filename: string) => string;
	controllers: (filename: string) => string;
	definitions: (filename: string) => string;
	tests: (filename: string) => string;
	resources: (filename: string) => string;
	services: (filename: string) => string;
	packages: (filename: string) => string;
	themes: (filename: string) => string;
	components: (filename: string) => string;
	root: (filename: string) => string;
	package: (name: string, filename: string) => string;
}

type FrameworkImage	= {
	align: (type: string) => FrameworkImage;
	background: (color: string) => FrameworkImage;
	bitdepth: (value: number) => FrameworkImage;
	blur: (radius: number) => FrameworkImage;
	colors: (value: number) => FrameworkImage;
	command: (name: string, value: string, priority?: number, escape?: boolean) => FrameworkImage;
	crop: (width: string, height: string, x: number, y: number) => FrameworkImage;
	define: (value: string) => FrameworkImage;
	filter: (name: string) => FrameworkImage;
	flip: () => FrameworkImage;
	flop: () => FrameworkImage;
	geometry: (width: string, height: string, options?: object) => FrameworkImage;
	grayscale: () => FrameworkImage;
	identify: (callback: (err: any, info: any) => void) => FrameworkImage;
	limit: (type: string, value: number) => FrameworkImage;
	make: (fn: (image: FrameworkImage) => void) => FrameworkImage;
	measure: (callback: (err: any, size: any) => void) => FrameworkImage;
	middleware: (extension: string, callback: () => any) => FrameworkImage;
	miniature: (width: string, height: string, bgColor?: string, flter?: string) => FrameworkImage;
	minify: () => FrameworkImage;
	normalize: () => FrameworkImage;
	output: (type: string) => FrameworkImage;
	pipe: (stream: any, type?: string, options?: object) => FrameworkImage;
	quality: (percentage: number) => FrameworkImage;
	resize: (width: string, height: string, options?: object) => FrameworkImage;
	resizeAlign: (width: string, height: string, align: string, color?: string) => FrameworkImage;
	resizeCenter: (width: string, height: string, color?: string) => FrameworkImage;
	rotate: (degrees: number) => FrameworkImage;
	save: (filename: string, callback?: (err: any, isSaved: any) => void) => FrameworkImage;
	scale: (width: string, height: string, options?: object) => FrameworkImage;
	sepia: () => FrameworkImage;
	stream: (type?: string) => ReadableStream;
	thumbnail: (width: string, height: string, options?: object) => FrameworkImage;
	watermark: (filename: string, x?: number, y?: number, width?: number, height?: number) => FrameworkImage;
}

// Prototypes
declare interface Request {
	params: any;
	body: any;
	extension: string;
	files: HttpFile[];
	flags: string[];
	host: string;
	ip: string;
	isAuthorized: boolean;
	isProxy: boolean;
	isStaticFile: boolean;
	language: string;
	mobile: boolean;
	path: string[];
	query: any;
	robot: boolean;
	secured: boolean;
	session: any;
	split: string[];
	subdomain: string[];
	ua: string;
	uri: any;
	user: any | null;
	xhr: boolean;
	authorization: () => any;
	authorize: (callback: (err: any, user: any, isAuthorized: boolean) => void) => Request;
	clear: () => Request;
	cookie: (name: string) => string;
	csrf: () => string;
	encrpyt: (enable: boolean) => void;
	hostname: (path: string) => string;
	localize: () => string;
	nocache: () => Request;
	useragent: (structured?: boolean) => string | any;
}

declare interface Response {
	controller: FrameworkController;
	nocompress: boolean;
	req: Request;
	success: boolean;
	binary: (buffer: Buffer, contentType: string, type?: string, download?: string,	 headers?: object) => Response;
	content: (code: string, body: string, type: string, compress?: boolean, headers?: object) => Response;
	continue: (callback?: () => void) => Response;
	cookie: (name: string, value: string, expiration: string | Date, options: any) => Response;
	file: (filename: string, download?: string, headers?: object, callback?: Function) => Response;
	filefs: (name: string, id: string, download?: string, headers?: object, callback?: Function, checkmeta?: (meta: object) => boolean) => Response; // 	: spravit meta
	image_nocache: (input: string | ReadableStream, make: (image: FrameworkImage, res) => void, headers: any, callback: Function) => Response;
	image: (input: string | ReadableStream, make: (image: FrameworkImage, res) => void, headers: any, callback: Function) => Response;
	imagefs: (name: string, id: string | number, make: (image: FrameworkImage, res) => void, headers: any, callback: Function) => Response;
	json: (body: object) => Response;
	no_cache: () => Response;
	proxy: (target: string, copypath?: boolean, after?: (res: any) => void, timeout?: number) => Response;
	redirect: (url: string, permanenet?: string) => Response;
	send: (code: number, body: string | object, type?: string) => Response;
	stream: (type: string, stream: ReadableStream, download?: string, headers?: object, callback?: () => void) => Response;
	throw400: (problem?: string) => Response;
	throw401: (problem?: string) => Response;
	throw403: (problem?: string) => Response;
	throw404: (problem?: string) => Response;
	throw409: (problem?: string) => Response;
	throw500: (err: Error) => Response;
	throw501: (problem?: string) => Response;
}

declare interface String {
	arg: (obj: object, encode?: boolean | string, def?: string) => string;
	bae64ContentType: () => string;
	bae64ToBuffer: () => string;
	bae64ToFile: (filename: string, callback?: (err: any) => void) => string;
	capitalize: (first?: boolean) => string;
	count: (word: string) => string;
	crc32: (unsigned?: boolean) => string;
	decode: () => string;
	decrypt_uid: (secret?: string) => string;
	decrpyt: (key: string, secret?: string) => string;
	encode: () => string;
	encrypt_uid: (secret?: string) => string;
	encrpyt: (key: string, unique: boolean, secret?: string) => string;
	format: (param1?: string, param2?: string, param3?: string, param4?: string, param5?: string) => string;
	fromUnicode: () => string;
	hash: (type?: string, salt?: string) => string;
	isBase64: () => boolean;
	isBoolean: () => boolean;
	isEmail: () => boolean;
	isJSON: () => boolean;
	isPhone: () => boolean;
	isUID: () => boolean;
	isURL: () => boolean;
	isZIP: () => boolean;
	keywords: (forSearch?: boolean, alternative?: boolean | string, max_count?: number, max_lenght?: number, min_length?: number) => string[];
	makeid: () => string;
	max: (maxLenght: number, chars?: string) => string;
	md5: (salt?: string) => string;
	padLeft: (max: number, char?: string) => string;
	padRight: (max: number, char?: string) => string;
	params: (obj: object) => string;
	parseBool: () => boolean;
	parseComponent: (tags: object) => any;
	parseCSV: (delimeter?: string) => any[];
	parseDate: () => Date;
	parseDateExpiration: () => Date;
	parseENV: () => any;
	parseFloat: (def?: object) => number;
	parseFloat2: (def?: object) => number;
	parseInt: (def?: object) => number;
	parseInt2: (def?: object) => number;
	parseJSON: () => object;
	parseQuery: () => object;
	parseTerminal: (fields: string[], fnLine: (values: any, index: any, count: any, realIndex: any) => void, skipLines?: number, takeLines?: number) => object;
	parseUA: (structured?: boolean) => string | object;
	parseXML: (replace?: boolean) => object;
	pluralize: (zero: string, one: string, few: string, other: string) => string;
	removeTags: () => string;
	ROOT: (noremap?: boolean) => string;
	sha1: (salt?: string) => string;
	sha256: (salt?: string) => string;
	sha512: (salt?: string) => string;
	slug: (max?: number) => string;
	startWith: (value: string, ignoreCase?: boolean) => boolean;
	toASCII: () => string;
	toSearch: () => string;
	toUnicode: () => string;
	trim: () => string;
}

declare interface Number {
	add: (value: number, decimals?: number) => number;
	async: (onNumber: (number: number, mext: () => void) => void, onComplete: () => void) => number;
	between: (condition: object, otherwise: object) => number;
	currency: (currency: string) => string;
	discount: (percentage: number, decimals?: number) => number;
	filesize: (decimals?: number, type?: string) => string;
	floor: (decimals?: number) => number;
	format: (decimals?: number, separator?: string, decimalSeparator?: string) => string;
	hex: (length: number) => string;
	padLeft: (max: number, char?: string) => string;
	padRight: (max: number, char?: string) => string;
	parseDate: (plus?: number) => number;
	pluralize: (zero: string, one: string, few: string, other: string) => string;
	VAT: (percentage: number, decimals?: number, includeVAT?: boolean) => number;
	round: (decimals?: number) => number;
}

declare interface Date {
	add: (expression: string | number) => Date;
	extend: (type: string, count: number) => Date;
	format: (format?: string, resource?: string) => string;
	setTimeZone: (timezone: string) => Date;
	toUTC: (ticks?: boolean) => Date | number;
}

declare interface Array<T> {
	async: (threadCount?: number, onComplete?: () => void) => T;
	findAll: (fn: (item: any, next: () => void) => void) => T;
	findItem: (fn: (item: any, next: () => void) => void) => any;
	findValue: (prop: string, value: object, path: string, def?: object) => any;
	first: (def?: object) => any;
	last: (def?: object) => any;
	limit: (max: number, fn: (items: any, next: () => void) => void, callback?: () => void) => T;
	quicksort: (path: string, asc: boolean | string) => T;
	random: () => T;
	remove: (fn: (item: any, index: any) => void) => T;
	skip: (count: number) => T;
	take: (count: number) => T;
	toObject: (name?: string) => any;
	trim: () => T;
	wait: (onItem: (item: any, next: () => void) => void, callback?: () => void, threadCount?: number) => T;
}

// Utils
type ErrorResponse = (error: any | null, response: any | null) => void;

type RequestOptions = {
	url: string;
	encrypt?: string;
	xhr?: boolean;
	timeout?: number;
	encoding?: string;
	headers?: any;
	method?: string;
	proxy?: string;
	query?: any;
	unixsocket?: { socket: string, path: string };
	dnscache?: boolean;
	noredirect?: boolean;
	keepalive?: boolean;
	body?: any | string;
	cookies?: any;
	cook?: boolean;
	limit?: number;
	custom?: boolean;
	key?: Buffer;
	cert?: Buffer;
	dhparam?: string;
	nocookies?: boolean;
	ondata?: (chunks: Buffer, percentage: number) => void;
	onprogress?: (percentage: number) => void;
	files?: any;
	type?: string;
}

// Dollar -> $
type Dollar = {
	body: any;
	controller: FrameworkController;
	files: File[];
	filter: any;
	headers: any;
	id: string;
	ip: string;
	language: string;
	model: any;
	params: any;
	query: any;
	req: Request;
	res: Response;
	session: any;
	sessionid: string;
	test: boolean;
	ua: string;
	user: any | null;
	audit: (message: string, type: string) => void;
	cancel: () => void;
	cookie: (name: string, value: string, expire: string, options: object) => string | void;
	done: (arg?: string | object | boolean) => ErrorResponse;
	invalid: (name: string | number, error?: string | number | Error) => void;
	success: (is?: boolean, value?: any) => void;
	successful: (callback: (response: any) => any) => ErrorResponse;
}

// Controller
type FrameworkController = {
	body: any;
	breadcrumb: any[];
	connections: any;
	exception: Error;
	files: File[];
	flags: string[];
	ip: string;
	isConnected: boolean;
	isController: boolean;
	keys: string[];
	language: string;
	mobile: boolean;
	name: string;
	online: number;
	options: any;
	params: any;
	path: FrameworkPath;
	query: any;
	referrer: string;
	repository: any;
	req: Request;
	res: Response;
	robot: boolean;
	route: any;
	schema: string;
	secured: boolean;
	session: any;
	sessionid: string;
	sitemapid: string;
	split: string[];
	sseID: string;
	status: number;
	subdomain: string[];
	themename: string;
	ua: string;
	uri: any;
	url: string;
	user: any | null;
	workflow: string;
	xhr: boolean;
	autoclear: (enable?: boolean) => FrameworkController;
	autodestroy: (callback?: () => void) => FrameworkController;
	baa: (name?: string) => any;
	binary: (buffer: Buffer, contentType: string, type?: string, download?: string, headers?: object) => FrameworkController;
	callback: (view_name: string) => Function;
	cancel: () => FrameworkController;
	clear: () => FrameworkController;
	clients: () => FrameworkWebSocketClient[];
	close: (name?: string[]) => FrameworkController;
	componenet: (name: string, options?: object, model?: object) => string;
	content: (body: string, type: string, headers?: object) => FrameworkController;
	cookie: (name: string, value: string, expiration?: string | Date, options?: { domain?: string, path?: string, secure?: boolean, httponly?: boolean, security?: string }) => string | FrameworkController;
	csfr: () => string;
	custom: () => boolean;
	description: (value: string) => FrameworkController;
	destroy: (problem?: string) => FrameworkController;
	done: (arg?: boolean | object) => Function;
	empty: (headers?: object) => FrameworkController;
	error: (error: Error | string) => FrameworkController;
	file: (filename: string, download?: boolean, headers?: object, callback?: () => void) => FrameworkController;
	filefs: (name: string, id: string | number, download?: boolean, headers?: object, callback?: () => void, checkmeta?: (meta: object) => void) => FrameworkController; // @TODO - create meta type
	find: (id: (client: object, id: string) => boolean | string) => FrameworkWebSocketClient;
	head: (value: string) => string;
	header: (name: string, value: string) => FrameworkController;
	hostname: (path: string) => string;
	html: (body: string, headers?: object) => FrameworkController;
	image: (filename: string, maker: (image: FrameworkImage) => void, headers?: object, callback?: () => void) => FrameworkController;
	imagefs: (filename: string, id: string, maker: (image: FrameworkImage) => void, headers?: object, callback?: () => void, checkmeta?: (meta: object) => void) => FrameworkController;
	invalid: () => ErrorBuilder;
	json: (obj: object, headers?: object, beautify?: boolean, replacer?: () => void, ) => FrameworkController;
	jsonp: (method_name: string, obj: object, headers?: object, beautify?: boolean, replacer?: () => void) => FrameworkController;
	keywords: (value: string) => FrameworkController;
	layout: (name: string) => FrameworkController;
	mail: (address: string | string[], subject: string, name: string, model?: object, callback?: (err: any | null) => null, language?: string) => MailMessage;
	memorize: (key: string, expiration: Date | string, disabled?: boolean, fnTo?: () => void, fnFrom?: () => void) => FrameworkController;
	meta: (title: string, description?: string, keywords?: string, pictures?: string) => FrameworkController;
	nocache: () => FrameworkController;
	nocontent: (headers?: object) => FrameworkController;
	operation: (name: string, value: object, callback: ErrorResponse, options?: object) => FrameworkController;
	ping: () => FrameworkController;
	place: (name: string, value?: string) => FrameworkController;
	plain: (body: string, headers?: object) => FrameworkController;
	proxy: (opt: { headers?: object, method?: string, url: string, timeout?: number, callback?: (err, response) => void} | string) => FrameworkController;
	public_css: (name: string) => string;
	public_download: (name: string) => string;
	public_font: (name: string) => string;
	public_image: (name: string) => string;
	public_js: (name: string) => string;
	public_video: (name: string) => string;
	public: (name: string) => string;
	redirect: (url: string, permanent?: boolean) => FrameworkController;
	runtest: (url?: string, name?: string, callback?: (err, value) => void) => Test;
	section: (name: string, value?: string, replace?: boolean) => FrameworkController | string;
	send: (message: string | object, comparer?: (client, message) => void, replacer?: Function) => FrameworkController;
	sitemap_add: (parent: string, name: string, url: string) => any[];
	sitemap_change: (name: string, property: string, value: object) => any[];
	sitemap_name: (name: string, a?: object, b?: object, c?: object, d?: object, e?: object, f?: object) => string;
	sitemap_name2: (language: string, name: string, a?: object, b?: object, c?: object, d?: object, e?: object, f?: object) => string;
	sitemap_navigation: (parent: string, language?: string) => object[];
	sitemap_replace: (name: string, title: (current: string) => void | string, url : (current: string) => void | string) => any[];
	sitemap_url2: (language: string, name: string, a?: object, b?: object, c?: object, d?: object, e?: object, f?: object) => string;
	sitemap: (name?: string) => object[];
	sse: (data: string | object, name?: string, id?: string, retry?: number) => FrameworkController;
	stream: (contenetType: string, stream: ReadableStream, download?: string, headers?: object, callback?: () => void, oncompress?: boolean) => FrameworkController;
	success: (success?: boolean, value?: object) => FrameworkController;
	successful: (callback: (response: any) => void) => ErrorResponse;
	theme: (name: string) => FrameworkController;
	throw401: (problem?: string) => FrameworkController;
	throw403: (problem?: string) => FrameworkController;
	throw404: (problem?: string) => FrameworkController;
	throw409: (problem?: string) => FrameworkController;
	throw500: (err: Error) => FrameworkController;
	throw501: (problem?: string) => FrameworkController;
	view_compile: (body: string, model?: object, headers?: object, isPartial?: boolean, key?: string) => FrameworkController | string;
	view: (name: string, model?: object, headers?: object, isPartial?: boolean) => FrameworkController | string;
	view400: (problem?: string) => FrameworkController;
	view401: (problem?: string) => FrameworkController;
	view403: (problem?: string) => FrameworkController;
	view404: (problem?: string) => FrameworkController;
	view500: (err: Error) => FrameworkController;
	view501: (problem?: string) => FrameworkController;
	on: (event: string, callback: Function) => Framework;
}

// Schema
type SchemaValidation = (value?: any, model?: object) => void;
type SchemaMethodCallback = ($: SchemaOptions, model: any | null) => void;
type SchemaExtensionCallback = ($: SchemaOptions, model: any | null, next: () => void) => void;

type SchemaOptions = Dollar & {
	responses: object;
	callback: (error?: Error | string | null, value?: any) => void;
	extend: (data?: object, callback?: Function) => void;
	redirect: (error?: Error | string | null, value?: any) => void;
}

type SchemaActionOptions = {
	action: SchemaMethodCallback,
	name?: string,
	params?: string,
	query?: string,
	input?: string,
	ouput?: string,
	publish?: string | boolean,
	user?: boolean,
	permissions?: string | string[],
	sa?: boolean,
	cache?: {
		user?: boolean,
		params?: boolean,
		query?: string,
		language?: boolean,
		expire?: string,
	}
}

type SchemaCallback = {
	fields: string[];
	meta: any;
	name: string;
	schema: any;
	trim: boolean;
	allow: (field: string, field2?: string, field3?: string, field4?: string, field5?: string) => void;
	cl: (name: string) => void;
	compress: () => void;
	csrf: () => void;
	encrpyt: (value?: any) => void;
	inherit: (group: string, name: string) => void;
	middleware: (fn: ($: SchemaOptions, next: () => void) => void) => void;
	props: (name: string) => any | any[];
	required: (name: string, required: (model: object) => boolean | boolean) => void;
	setPrefix: (prefix: string) => void;
	setResource: (name: string) => void;
	verify: (key: string, fn: ($: SchemaOptions) => void, cache: string) => void;
	define: (field: string, type: string, validation?: boolean | SchemaValidation, error_message?: string) => void;
	addOperation: (name: string, operation: string, filter?: string) => void;
	addTask: (name: string, task: string, filter?: string) => void;
	addWorkflow: (name: string, callback: SchemaMethodCallback, filter?: string) => void;
	addWorkflowExtension: (name: string, callback: SchemaExtensionCallback) => void;
	action: (name: string, options?: SchemaActionOptions) => void;
	setInsert: (callback: SchemaMethodCallback, filter?: string) => void;
	setInsertExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setPatch: (callback: SchemaMethodCallback, filter?: string) => void;
	setPatchExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setQuery: (callback: SchemaMethodCallback, filter?: string) => void;
	setQueryExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setRead: (callback: SchemaMethodCallback, filter?: string) => void;
	setReadExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setRemove: (callback: SchemaMethodCallback, filter?: string) => void;
	setRemoveExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setSave: (callback: SchemaMethodCallback, filter?: string) => void;
	setSaveExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setUpdate: (callback: SchemaMethodCallback, filter?: string) => void;
	setUpdateExtension: (name: string, callback: SchemaExtensionCallback) => void;
	setDestroy: (callback: SchemaMethodCallback, filter?: string) => void;
	setTimer: (callback: SchemaMethodCallback) => void;
	undefine: (name: string) => void;
	jsonschema(name: string): () => void;
	array: () => void;
}

// Route
type RouteAction = (req: Request, res: Response) => void | ((...args: any) => void);

// Operation
type Operation = Dollar & {
	redirect: (error?: Error | string | null, value?: any) => void;
}

// Task
type Task = Dollar & {
	end: (value?: object) => void;
	end2: (send_value?: boolean) => ErrorResponse;
	next: (task_name?: string) => void;
}

// Websocket
type FrameworkWebSocketClient = {
	id: number,
	options: {
		type: string;
		compress: boolean;
		reconnect: number;
		encodedecode: boolean;
		reconnectserver: boolean;
	}
	closed: boolean;
	origin: string;
	protocol: string;
	url: string;
	headers: any;
	cookies: any;
	connect: (url: string, protocol?: string, origin?: string) => FrameworkWebSocketClient;
	close: (message?: string, code?: number) => FrameworkWebSocketClient;
	send: (message: string | object | Buffer) => FrameworkWebSocketClient;
	on: (event: string, fn: Function) => Framework;
	destroy: () => FrameworkWebSocketClient;
}

// Mail
type FrameworkMail = {
	debug: boolean;
	rejectUnathorized: boolean;
	create: (subject: string, body: string) => MailMessage;
	send: (smtp: string, options: object, messages: MailMessage[], callback: (err: any, count: any) => void) => FrameworkMail;
	send2: (messages: MailMessage[], callback: (err: any, count: any) => void) => FrameworkMail;
	try: (smtp: string, options: object, callback: (err: any) => void) => FrameworkMail;
	use: (hostname: string, options?: object, callback?: (err: any) => void) => void;
	on: (event: string, fn: Function) => void;
}

type MailMessage = {
	body: string;
	headers: any;
	subject: string;
	type: string;
	attachment: (filename: string, name?: string) => MailMessage;
	attachments: (name: string, id: number, attachment?: string) => MailMessage;
	bcc: (address: string, clear?: boolean) => MailMessage;
	callback: (fn: (err: any) => void) => MailMessage; 
	cc: (address: string, name?: string, clear?: boolean) => MailMessage; 
	confidential: () => MailMessage;
	from: (address: string, name: string) => MailMessage;
	high: () => MailMessage;
	low: () => MailMessage;
	manually: () => MailMessage;
	reply: (address: string, clear?: boolean) => MailMessage;
	send: (smtp: string, options: object, callback: () => void) => MailMessage;
	send2: (callback: () => void) => MailMessage;
	to: (address: string, name?: string, clear?: boolean) => MailMessage;
	unsubscribe: (url: string) => MailMessage;
}

// Test
type Test = {
	body: any;
	user: any | null;
	query: any;
	pass: (fn: ($: { error: any, value: any }) => boolean) => void;
	fail: (fn: ($: { error: any, value: any }) => boolean) => void;
};

// TextDB
type TextDB = {
	alter: (schema: string, callback: (err: any) => void) => void;
	clean: (callback?: () => void) => void;
	clear: (callback?: () => void) => void;
	count: () => QueryBuilder;
	drop: () => QueryBuilder;
	find: () => QueryBuilder;
	find2: () => QueryBuilder;
	doc: (doc: any, unique?: boolean) => QueryBuilder;
	list: () => QueryBuilder;
	memory: (count: number, size: number) => void;
	modify: (data: object, upsert?: boolean | object) => QueryBuilder;
	one: () => QueryBuilder;
	one2: () => QueryBuilder;
	remove: () => QueryBuilder;
	scalar: (type?: string, field?: string, key?: string) => QueryBuilder;
	stats: (groupfield: string, datafield: string, scalarfield: string, type?: string) => QueryBuilder;
}

type QueryBuilder = {
	autofill: ($: Dollar, allowedfields?: string | null, skipfields?: string | null, def_sort?: string | null, def_maxlimit?: number) => QueryBuilder;
	between: (name: string, valueA: number, valueB: number) => QueryBuilder;
	callback: (fn: (err: any, response: any, meta?: { count: number, counter: number, scanned: number, duration: number }) => void) => QueryBuilder;
	contains: (field: string) => QueryBuilder;
	day: (name: string, operator: string, value: number) => QueryBuilder;
	done: ($: Dollar, fn: () => void, param?: object) => (err: any, response: any, param: any) => void;
	empty: (field: string) => QueryBuilder;
	fields: (fields: string) => QueryBuilder;
	first: () => QueryBuilder;
	gridfields: (fields: string, allowed?: string[]) => QueryBuilder;
	gridfilter: (name: string, obj: object, type: object, column_name?: string) => QueryBuilder;
	gridsort: (name_type: string) => QueryBuilder;
	id: (value: string) => QueryBuilder;
	in: (name: string, value: string[]) => QueryBuilder;
	insert: (fn: (doc: object) => void) => QueryBuilder;
	join: (field: string, database: string, type?: string) => QueryBuilder;
	log: (msg: object) => QueryBuilder;
	month: (name: string, operator: string, value: number) => QueryBuilder;
	notin: (name: string, value: string) => QueryBuilder;
	or: () => QueryBuilder;
	page: (page: number, limit: number) => QueryBuilder;
	paginate: (page: string | number, limit: string | number) => QueryBuilder;
	rule: (code: string, arg: object) => QueryBuilder;
	scalar: (type: string, field?: string) => QueryBuilder;
	search: (name: string, value: string, where?: string) => QueryBuilder;
	skip: (limit: number) => QueryBuilder;
	sort: (key: string) => QueryBuilder;
	take: (limit: number) => QueryBuilder;
	where: (name: string, operator: string, value: string) => QueryBuilder;
	year: (name: string, operator: string, value: number) => QueryBuilder;
}

type Counter = {
	clear: (callback: Function) => Counter;
	count: (id: string, callback: (err: any, count: any, meta: any) => void) => QueryBuilder;
	daily: (id: string, callback: ErrorResponse) => QueryBuilder;
	find: () => QueryBuilder;
	flush: () => QueryBuilder;
	hit: (id: string, count?: number) => Counter;
	monthly: (id: string, callback?: ErrorResponse) => QueryBuilder;
	remove: (id: string, callback?: (err: any) => void) => QueryBuilder;
	scalar: (type: string, field: string, callback?: ErrorResponse) => QueryBuilder;
	summarize: (type: string, callback?: ErrorResponse) => QueryBuilder;
	yearly: (id: string, callback?: ErrorResponse) => QueryBuilder;
}

type FileStorage = {
	name: string;
	size: number;
	total: number;
	browse: () => QueryBuilder;
	browse2: (callback: (err: any, files: any) => void) => void;
	clean: (callback?: (err: any) => void) => void;
	clear: (callback?: (err: any) => void) => void;
	count2: (callback: (err: any, count: any) => void) => void;
	image: (id: string, callback: (err: any, image: FrameworkImage) => void) => void;
	read: (id: string, callback: (err: any, response: any) => void, nostream?: boolean) => void;
	readbase64: (id: string, callback: (err: any, base64: any) => void) => void;
	readmeta: (id: string, callback: (err: any, meta: any) => void) => void;
	rebuild: (callback?: (err: any) => void) => void;
	remove: (id: string, callback?: (err: any) => void) => void;
	save: (id: string, name: string, data: string | Buffer | ReadableStream) => void;
	storage: (directory: string) => void;
}

// Flow
type FlowStream = {
	meta: any;
	stats: any;
	ondashboard: (a?: any, b?: any, c?: any, d?: any) => void;
	ondebug: (a?: any, b?: any, c?: any, d?: any) => void;
	onerror: (a?: any, b?: any, c?: any, d?: any) => void;
	onstatus: (a?: any, b?: any, c?: any, d?: any) => void;
	add: (name: string, body: string) => any;
	clear: () => any;
	components: () => any[];
	destroy: () => void;
	find: (id: string) => any;
	instances: () => any[];
	make: (callback: () => void) => void;
	on: (name: string, callback: (a: any, b: any, c: any) => void) => void;
	reconfigure: (id: string, config: object) => void;
	register: (name: string, callback: () => void, options?: object) => FlowInstance;
	send: (path: string, body: object) => boolean;
	trigger: (target: string, data: object, controller?: FrameworkController) => void;
	trigger2: (target: string, data: object, controller?: FrameworkController) => void;
	unregister: (name: string) => FlowInstance;
	use: (schema: string | object, callback?: (err: any) => void) => void;
}

type FlowInstance = {
	cache: any;
	comonent: string;
	config: string;
	id: string;
	main: FlowStream;
	module: any;
	ready: boolean;
	stats: any;
	close: () => void;
	configure: () => void;
	make: () => void;
	message: (message: any) => FlowMessage;
	open: (next: () => void) => void;
	dashboard: (a?: any, b?: any, c?: any, d?: any) => void;
	debug: (a?: any, b?: any, c?: any, d?: any) => void;
	send: (output: string, data: any, controller?: FrameworkController) => number;
	status: (a?: any, b?: any, c?: any, d?: any) => void;
	throw: (a?: any, b?: any, c?: any, d?: any) => void;
}

type FlowMessage = {
	body: any;
	cache: any;
	controller: FrameworkController;
	count: number;
	data: any;
	duration: number;
	duration2: number;
	files: HttpFile[];
	from: FlowInstance;
	fromcomponent: string;
	fromid: string;
	fromindex: number | string;
	headers: any;
	id: string;
	ip: string;
	language: string;
	main: FlowStream;
	options: any;
	params: any;
	query: any;
	repo: any;
	req: Request;
	res: Response;
	schema: FlowInstance;
	session: any;
	sessionid: string;
	to: FlowInstance;
	tocomponent: string;
	toid: string;
	toindex: number | string;
	used: number;
	user: any;
	dashboard: (a?: any, b?: any, c?: any, d?: any) => FlowMessage;
	debug: (a?: any, b?: any, c?: any, d?: any) => FlowMessage;
	destroy: () => void;
	on: (name: string, callback: Function) => FlowMessage;
	replace: (data: object) => FlowMessage;
	send: (output?: string, data?: object, clone_data?: boolean) => FlowMessage;
	status: (a?: any, b?: any, c?: any, d?: any) => FlowMessage;
	throw: (a?: any, b?: any, c?: any, d?: any) => FlowMessage;
}

type ScheduleInstance = any;

// RESTBuilder
type RESTBuilder = {
	accept: (type: string) => void;
	auth: (user: string, password?: string) => RESTBuilder;
	cache: (expire: string) => RESTBuilder;
	callback: (callback: (err: Error | ErrorBuilder, response: object, output: { value: object, response: object | Buffer, status: number, headers: object, hostname: string, cache: boolean, cookie: (name: string) => string}) => void) => RESTBuilder;
	cert: (key: Buffer, cert: Buffer, dhparam?: Buffer) => RESTBuilder;
	convert: (inline_schema: string) => RESTBuilder;
	cook: (enable: boolean) => RESTBuilder;
	cookie: (name: string, value: string) => RESTBuilder;
	cookies: (value: object) => RESTBuilder;
	encrypt: (key: any) => RESTBuilder;
	error: (error: string | Function) => RESTBuilder;
	file: (name: string, filename: string, buffer?: Buffer) => RESTBuilder;
	header: (name: string, value: string) => RESTBuilder;
	json: (data: string | object) => RESTBuilder;
	keepalive: () => RESTBuilder;
	map: (schema: string) => RESTBuilder;
	maxlength: (value: number) => RESTBuilder;
	method: (value: string, data?: string | object) => RESTBuilder;
	mobile: () => RESTBuilder;
	nocache: () => RESTBuilder;
	nodnscache: () => RESTBuilder;
	origin: (value: string) => RESTBuilder;
	plain: (data?: string) => RESTBuilder;
	progress: (fn: (percentage: any) => void) => RESTBuilder;
	proxy: (url: string) => RESTBuilder;
	redirect: (enable: boolean) => RESTBuilder;
	referrer: (value: string) => RESTBuilder;
	rem: (key: string) => RESTBuilder;
	robot: () => RESTBuilder;
	schema: (name: string) => RESTBuilder;
	set: (key: string, value: object) => RESTBuilder;
	stream: (callback: (err: any, response: { stream: any, host: string, headers: object, status: number }) => void) => RESTBuilder;
	timeout: (value: number) => RESTBuilder;
	type: (new_content_type: string) => RESTBuilder;
	unixsocket: (socket: string, path: string) => RESTBuilder;
	url: (url: string) => RESTBuilder;
	urlencoded: (data?: string | object) => RESTBuilder;
	xhr: () => RESTBuilder;
	xml: (data: string, replace?: boolean) => RESTBuilder;
	strict: () => RESTBuilder;
	noparse: () => RESTBuilder;
}

type RESTBuilderStaticMethods = {
	GET(url: string, data?: object): RESTBuilder;
	POST(url: string, data?: object): RESTBuilder;
	PUT(url: string, data?: object): RESTBuilder;
	DELETE(url: string, data?: object): RESTBuilder;
	PATCH(url: string, data?: object): RESTBuilder;
	API(url: string, operation: string, data?: object): RESTBuilder;
	HEAD(url: string): RESTBuilder;
	make(fn: (builder: RESTBuilder) => void): void;
	upgrade(fn: (builder: RESTBuilder) => void): void;
};

declare const RESTBuilder: RESTBuilderStaticMethods;

// OpenClient
type OpenClientInstance = {
	id: string;
	url: string;
	send: (msg: any, callback?: (status: string) => void, filter?: any, timeout?: number, count?: number) => OpenClientInstance;
	send2: (msg: any, callback?: (status: string) => void, filter?: any, timeout?: number) => OpenClientInstance;
	close: () => void;
	remove: () => void;
	message: (fn: (message: any) => void) => OpenClientInstance;
	error: (fn: (error: any) => void) => OpenClientInstance;
	open: (fn: () => void) => OpenClientInstance;
	ws: WebSocket;
}

// TMSClient
interface TMSClient extends FrameworkWebSocketClient {
	subscribe: (name: string, callback: (data: any) => void) => FrameworkWebSocketClient;
	publish: (name: string, data: any) => FrameworkWebSocketClient;
	call: (name: string, data: any, callback: () => void, timeout?: number) => FrameworkWebSocketClient;
}

// Globals
declare global {
	function SUCCESS(): SUCCESS;
	type SUCCESS = (success?: boolean, value?: any) => { success: boolean, error: any, value: any};
	type DEF = {
		onAudit: (name: string, data: object) => void;
		onCompileScript: (filename: string, body: string) => void;
		onCompileStyle: (name: string, body: string) => void;
		onCompileView: (name: string, html: string) => void;
		onPrefLoad: (next: (pref_obj: object) => void) => void;
		onPrefSave: (PREF: object) => void;
	}

	const Builders: any;
	const CONF: any;
	const Controller: FrameworkController;
	const DEBUG: boolean;
	const DEF: DEF;
	const EMPTYARRAY: [];
	const EMPTYCONTROLLER: FrameworkController | any;
	const EMPTYOBJECT: {};
	const F: Framework;
	const FUNC: any;
	const isWORKER: boolean;
	const Mail: FrameworkMail;
	const MAIN: any;
	const NOW: Date;
	const Pagination;
	const PREF: any;
	const RELEASE: boolean;
	const REPO: any;
	const Thelpers;
	const THREAD: string;
	const U: FrameworkUtils;
	const Utils: FrameworkUtils;
	const PATH: FrameworkPath;

	function ON(name: string, callback: () => void): Framework;
	function ON(name: 'controller', callback: (controller?: FrameworkController) => void): Framework;
	function ON(name: 'exit', callback: (signal?: number | string) => void): Framework;
	function ON(name: 'install', callback: (type?: string, name?: string, instance?: any) => void): Framework;
	function ON(name: 'ready', callback: () => void): Framework;
	function ON(name: 'request_begin', callback: (req?: Request, res?: Response) => void): Framework;
	function ON(name: 'request_end', callback: (req?: Request, res?: Response) => void): Framework;
	function ON(name: 'request', callback: (req?: Request, res?: Response) => void): Framework;
	function ON(name: 'service', callback: (count?: number) => void): Framework;
	function ON(name: 'watcher', callback: (child_process?: ChildProcess) => void): Framework;
	function ON(name: 'websocket_begin', callback: (controller?: FrameworkController, client?: FrameworkWebSocketClient) => void): Framework;
	function ON(name: 'websocket_end', callback: (controller?: FrameworkController, client?: FrameworkWebSocketClient) => void): Framework;

	function ACTION(url: string, body: object, fn: ErrorResponse): void;
	function AUDIT($: Dollar, message?: string, type?: string): void;
	function AUTH(fn: ($: { ip: string, ua: string, query: object, body: any, params: object, language: string, url: string, files: HttpFile[], headers: object, cookie: (name: string) => void, invalid: (error: string) => void, success: (user_instance: string) => void}) => void): void;
	function BLOCKED($: Dollar, limit?: number, expiration?: string): boolean;
	function CACHE(key: string, value?: number, expire?: string, persistent?: boolean): any;
	function CLEANUP(stream: ReadableStream, callback?: () => void): void;
	function clearTimeout2(name: string): void;
	function CLONECLEANUP(source: object, skip?: object): any;
	function CMD(name: string, a?: object, b?: object, c?: object): void;
	function CONVERT(obj: object, name: string): object;
	function CORS(url?: string, flags?: string[], credentials?: boolean): Framework;
	function COUNTER(name: string): Counter;
	function DECRYPTREQ(req: Request, val: object | string, key?: string): object | string;
	function DESTROY(stream: ReadableStream): void;
	function DIFFARR(name: string, arr_db: object[], arr_form: object[]): object;
	function DOWNLOAD(url: string, filename: string, callback?: ErrorResponse, timeout?: number): void;
	function EACHSCHEMA(group: string, fn: (group: string, name: string, schema: string) => void): any;
	function EACHSCHEMA(fn: (group: string, name: string, schema: string) => void): any;
	function EMIT(name: string, arg1?: object, arg2?: object, arg3?: object, arg4?: object, arg5?: object): void;
	function EMIT2(name: string, arg1?: object, arg2?: object, arg3?: object, arg4?: object, arg5?: object): void;
	function ENCRYPTREQ(req: Request, val: object | string, key?: string, strict?: boolean): string;
	function ERROR(name: string): Function;
	function EXEC(schema: string, model: object, callback: ErrorResponse, controller?: Dollar | FrameworkController): FrameworkController;
	function FAKE(schema: string, required_only: boolean): any;
	function FILE404(action: (req: Request, res: Response) => void): void;
	function FILESTORAGE(name: string): FileStorage;
	function FINISHED(stream: ReadableStream | Response | Request, callback: (err: any) => void): void;
	function FLOWSTREAM(name?: string): FlowStream;
	function GETSCHEMA(schema: string, callback: (err: any, schema: any) => void, timeout?: number): any;
	function GETSCHEMA(schema: string): any;
	function GROUP(flags: string | string[], action: () => void): Framework;
	function GROUP(action: () => void): Framework;
	function GUID(length?: number): string;
	function HTMLMAIL(address: string | string[], subject: string, html: string, callback?: (err: any) => void, language?: string): MailMessage;
	function IMPORT(url: string, callback?: (err: any, module: any, response: any) => void): void;
	function LDAP(options: { ldap: { host: string, port?: number }, user: string, password: string, dn?: string, type: string }, callback: ErrorResponse): void;
	function LOAD(types: string | string[], path?: string, callback?: () => void): void;
	function LOCALIZE(fn: (req: Request, res: Response) => void): void;
	function LOGGER(filename: string, param1?: any, param2?: any, param3?: any, param4?: any, param5?: any): void;
	function LOGMAIL(address: string | string[], subject: string, body: string, callback?: (err: any) => void): Framework;
	function MAIL(address: string | string[], subject: string, view_name: string, model?: object, callback?: (err: any) => void, language?: string): MailMessage;
	function MAKE(name?: string, fn?: (obj: object) => void): any;
	function MAP(url: string, filename: string, extension?: string[]): Framework;
	function MAPSCHEMA(schema: string, prop_pk?: string): void;
	function MERGE(url: string, filename1: string, filename2: string, filename3?: string, filename4?: string, filename5?: string): void;
	function MIDDLEWARE(name: string, fn: ($: Dollar | null) => void, assign?: string | string[], fisrt?: boolean): void;
	function MODEL(name: string): any;
	function MODIFY(fn: (type: string, filename: string, value: string, controller?: FrameworkController) => any): any;
	function MODULE(name: string): any;
	function NEWCOMMAND(name: string, callback: Function | null): any;
	function NEWOPERATION(name: string, fn: ($: Operation) => void, repeat?: number, stop?: boolean, bind_error?: boolean, queryschema?: string);
	function NEWSCHEMA(schema: string, callback: (schema: SchemaCallback) => void): void;
	function NEWTASK(name: string, fn: (push: (task: string, callback: ($?: Task, value?: any) => void) => void) => void);
	function NOOP(): () => void;
	function NOSQL(name: string): TextDB;
	function NPMINSTALL(name: string, callback: (err: any) => void): void;
	function OFF(name: string, callback?: () => void): Framework;
	function ONCE(name: string, callback: () => void): Framework;
	function OPERATION(name: string, value: object, callback: ErrorResponse, options?: {}, controller?: FrameworkController);
	function PAUSE(pause: boolean): void;
	function PAUSERUN(label: string): void;
	function PROXY(endpoint: string, hostname: string, copypath?: boolean, before?: (uri: any, req: Request, res: Response) => void, after?: (res: any) => void, timeout?: number): void;
	function QUERIFY(url: string, data: object): void;
	function REDIRECT(path: string, host: string, copypath?: boolean, permanent?: boolean): void;
	function REQUEST(options: RequestOptions, callback?: () => void): void;
	function REQUIRE(path: string): any;
	function RESOURCE(name: string, key: string): any;
	function ROUTE(url: string, action: RouteAction, flags?: string[], length?: number[]): any;
	function ROUTE(url: string, view: string , flags?: string[], length?: number[]): any;
	function ROUTE(url: string, flags?: string[], length?: number[]): any;
	function RUN(names: string, value: object, callback: ErrorResponse, options?: object, controller?: FrameworkController, response_name?: string);
	function SCHEDULE(date: string | number | Date, repeat?: string, fn?: () => void): ScheduleInstance;
	function SESSION(name?: string, ondata?: Function): any;
	function setTimeout2(name: string, fn: (arg: any) => void, timeout: number, limit?: number, arg?: object): void;
	function SITEMAP(id: string, first?: boolean, language?: string): object[];
	function TABLE(name: string): TextDB;
	function TASK(name: string, callback: ErrorResponse, instance?: Dollar | FrameworkController, value?: object): void; 
	function TotalAPI(token: string, name: string, data: object, callback: any, filename?: string)
	function TOUCH(url: string): void;
	function TRANSLATE(language: string, text: string): string;
	function TRANSLATOR(language: string, text: string): string;
	function UID(type?: string): string;
	function UNAUTHORIZED($: Dollar, roleA: string, roleB?: string, roleC?: string, roleD?: string, roleE?: string): string;
	function UPDATE(versions: string[], callback: (err: any) => void, pause_server_message: string): string;
	function VIEW(name: string, model?: object, layout?: string, repository?: object, language?: string): string;
	function VIEWCOMPILE(html: string, model?: object, layout?: string, repository?: object, language?: string, key?: string): string;
	function WAIT(validator: Function, callback: ErrorResponse, timeout?: number, interval?: number): boolean;
	function WEBSOCKETCLIENT(callback: (client: FrameworkWebSocketClient) => void): void;
	function WORKER(name: string, timeout?: number, args?: string[]): any;
	function WORKER2(name: string, timeout?: number, callback?: (err: any, buffer: Buffer) => void): any;
	function WORKFLOW(declaration: ($: Dollar) => void): Dollar;
	function HTTP(type: string): void;
	function JSONSCHEMA(id: any, value: any, callback: Function, error?: any): void;
	function NEWJSONSCHEMA(name: string, value?: string): void;
	function NEWPUBLISH(name: string, value?: string): void;
	function NEWSUBSCRIBE(name: string, value?: string): void;
	function PUBLISH(name: string, value: string): void;
	function SUBSCRIBE(name: string, callback: Function, client?: any): void;
	function UNSUBSCRIBE(name: string, callback?: Function): void;
	function DBMS(): any; // Will be improved in future
	function NEWCALL(name: string, schema: string, callback?: (data: any, next: ErrorResponse) => void): void;
	function NEWEXTENSION(code: string, callback: (err: any | null, module: any | null) => void, extend?: (module: any) => void): void;
	function OPENCLIENT(url: string, id?: string): OpenClientInstance;
	function TMSCLIENT(url: string, token: string, callback: (err: Error | null, client: TMSClient, meta: any) => void): FrameworkWebSocketClient;
}