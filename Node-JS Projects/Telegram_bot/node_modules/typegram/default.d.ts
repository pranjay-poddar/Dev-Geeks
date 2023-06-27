import { Typegram } from "./proxied";

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = never;

type DefaultTypegram = Typegram<InputFile>;

/** Wrapper type to bundle all methods of the Telegram API */
export type Telegram = DefaultTypegram["Telegram"];

/** Utility type providing the argument type for the given method name or `{}` if the method does not take any parameters */
export type Opts<M extends keyof DefaultTypegram["Telegram"]> =
  DefaultTypegram["Opts"][M];
export type Ret<M extends keyof DefaultTypegram["Telegram"]> =
  DefaultTypegram["Ret"][M];

/** Utility type providing a promisified version of Telegram */
export type TelegramP = DefaultTypegram["TelegramP"];
/** Utility type providing a version Telegram where all methods return ApiResponse objects instead of raw data */
export type TelegramR = DefaultTypegram["TelegramR"];
/** Utility type providing a version Telegram where all methods return Promises of ApiResponse objects, combination of TelegramP and TelegramR */
export type TelegramPR = DefaultTypegram["TelegramPR"];

/** This object represents the content of a media message to be sent. It should be one of
- InputMediaAnimation
- InputMediaDocument
- InputMediaAudio
- InputMediaPhoto
- InputMediaVideo */
export type InputMedia = DefaultTypegram["InputMedia"];
/** Represents a photo to be sent. */
export type InputMediaPhoto = DefaultTypegram["InputMediaPhoto"];
/** Represents a video to be sent. */
export type InputMediaVideo = DefaultTypegram["InputMediaVideo"];
/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export type InputMediaAnimation = DefaultTypegram["InputMediaAnimation"];
/** Represents an audio file to be treated as music to be sent. */
export type InputMediaAudio = DefaultTypegram["InputMediaAudio"];
/** Represents a general file to be sent. */
export type InputMediaDocument = DefaultTypegram["InputMediaDocument"];
