"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromFileId = exports.fromURL = exports.fromURLStream = exports.fromReadableStream = exports.fromBuffer = exports.fromLocalFile = void 0;
/**
 * The local file specified by path will be uploaded to Telegram using multipart/form-data.
 *
 * 10 MB max size for photos, 50 MB for other files.
 */
// prettier-ignore
const fromLocalFile = (path, filename) => ({ source: path, filename });
exports.fromLocalFile = fromLocalFile;
/**
 * The buffer will be uploaded as file to Telegram using multipart/form-data.
 *
 * 10 MB max size for photos, 50 MB for other files.
 */
// prettier-ignore
const fromBuffer = (buffer, filename) => ({ source: buffer, filename });
exports.fromBuffer = fromBuffer;
/**
 * Contents of the stream will be uploaded as file to Telegram using multipart/form-data.
 *
 * 10 MB max size for photos, 50 MB for other files.
 */
// prettier-ignore
const fromReadableStream = (stream, filename) => ({ source: stream, filename });
exports.fromReadableStream = fromReadableStream;
/**
 * Contents of the URL will be streamed to Telegram.
 *
 * 10 MB max size for photos, 50 MB for other files.
 */
// prettier-ignore
const fromURLStream = (url, filename) => ({ url: url.toString(), filename });
exports.fromURLStream = fromURLStream;
/**
 * Provide Telegram with an HTTP URL for the file to be sent.
 * Telegram will download and send the file.
 *
 * * The target file must have the correct MIME type (e.g., audio/mpeg for `sendAudio`, etc.).
 * * `sendDocument` with URL will currently only work for GIF, PDF and ZIP files.
 * * To use `sendVoice`, the file must have the type audio/ogg and be no more than 1MB in size.
 * 1-20MB voice notes will be sent as files.
 *
 * 5 MB max size for photos and 20 MB max for other types of content.
 */
const fromURL = (url) => url.toString();
exports.fromURL = fromURL;
/**
 * If the file is already stored somewhere on the Telegram servers, you don't need to reupload it:
 * each file object has a file_id field, simply pass this file_id as a parameter instead of uploading.
 *
 * It is not possible to change the file type when resending by file_id.
 *
 * It is not possible to resend thumbnails using file_id.
 * They have to be uploaded using one of the other Input methods.
 *
 * There are no limits for files sent this way.
 */
const fromFileId = (fileId) => fileId;
exports.fromFileId = fromFileId;
