# Types for the Telegram Bot API

> Please consider contributing to [@grammyjs/types](https://github.com/grammyjs/types) instead.
> `typegram` is legacy and will not be updated directly anymore.
> Instead, [@grammyjs/types](https://github.com/grammyjs/types) is maintained and kept in sync with the Bot API specification.
> Changes are backported to `typegram` periodically to keep older projects running.

This project provides TypeScript types for the entire [Telegram Bot API](https://core.telegram.org/bots/api) in version 6.4.

It contains zero bytes of executable code.

## Installation

```bash
npm install --save-dev typegram
```

## Available Types

Generally, this package just exposes a huge load of `interface`s that correspond to the **types** used throughout the Telegram Bot API.

Note that the API specification sometimes only has one name for multiple variants of a type, e.g. there are a number of different `Update`s you can receive, but they're all just called `Update`.
This package represents such types as large unions of all possible options of what an `Update` could be, such that type narrowing can work as expected on your side.
If you need to access the individual variants of an `Update`, refer to `Update.MessageUpdate` and its siblings.

In fact, this pattern is used for various types, namely:

- `CallbackQuery`
- `Chat`
- `ChatFromGetChat`
- `InlineKeyboardButton`
- `KeyboardButton`
- `Message`
- `MessageEntity`
- `Location`
- `Update`

(Naturally, when the API specification is actually modelling types to be unions (e.g. `InlineQueryResult`), this is reflected here as a union type, too.)

## Available Methods

In addition to the types, this package provides you with another type `Telegram` which contains all available **methods** of the API.
There is no further structure applied to this.

Each method takes just a single argument with a structure that corresponds to the object expected by Telegram.
If you need to directly access that type, consider using `Opts<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

Note that `Opts<M>` will give you an empty object type (i.e. `{}`) for methods that do not take any parameters.
That is to say, it will not give you a type error or `undefined` (as opposed to something like `Parameters<Telegram['getMe']>[0]`).

Each method returns the object that is specified by Telegram.
If you directly need to access the return type of a method, consider using `Ret<M>` where `M` is the method name (e.g. `Opts<'getMe'>`).

## Using Promises

All of the methods are specified with the actual return type of the Telegram Bot API.
If you need them to return `Promise`s instead, consider using `TelegramP`.
This type maps all methods of `Telegram` to a promisified version.

## Using API Response Objects

The Telegram Bot API does not return just the requested data in the body of the response objects.
Instead, they are wrapped inside an object that has an `ok: boolean` status flag, indicating success or failure of the preceding API request.
This outer object is modelled in `typegram` by the `ApiResponse` type.

If you need the methods of `Telegram` to return `ApiResponse` objects instead of the raw data, consider using `TelegramR`.
This works analogously to `TelegramP`.
The type maps all methods of `Telegram` to a version where they return `ApiResponse` objects of the data, instead of the data themselves.

## Using Both Promises and API Response Objects

Yes.
`TelegramPR`.

## Customizing `InputFile`

The Telegram Bot API lets bots send files in [three different ways](https://core.telegram.org/bots/api#sending-files).
Two of those ways are by specifying a `string`—either a `file_id` or a URL.
The third option, however, is by uploading files to the server using multipart/form-data.

The first two means to send a file are already covered by the type annotations across the library.
In all places where a `file_id` or a URL is permitted, the corresponding property allows a `string`.

We will now look at the type declarations that are relevant for uploading files directly.
Depending on the code you're using the `typegram` types for, you may want to support different ways to specify the file to be uploaded.
As an example, you may want to be able to make calls to `sendDocument` with an object that conforms to `{ path: string }` in order to specify the location of a local file.
(Your code is then assumed to able to translate calls to `sendDocument` and the like to multipart/form-data uploads when supplied with an object alike `{ path: '/tmp/file.txt' }` in the `document` property of the argument object.)

`typegram` cannot possibly know what objects you want to support as `InputFile`s.
Consequently, the exposed type `InputFile` is merely an alias for `never`.

However, you can specify your own version of what an `InputFile` is, hence effectively creating a completely new version of `typegram` with your custom `InputFile` type used throughout all affected methods and interfaces.
This is possible by what we call a _proxy type_.

For instance, let's stick with our example and say that you want to support `InputFile`s of the following type.

```ts
interface MyInputFile {
  path: string;
}
```

You can then customize `typegram` to fit your needs by

1. importing the magical `Typegram` proxy type and
2. setting this alias:

```ts
import { Typegram } from "typegram";

type MyTypegram = Typegram<MyInputFile>;
```

You can now access all types that must respect `MyInputFile` through the `MyTypegram` type:

```ts
// The `Telegram` type that contains all API methods:
type Telegram = MyTypegram["Telegram"]; // analogous for `TelegramP`, `TelegramR`, and `TelegramPR`

// The utility types `Opts` and `Ret`:
type Opts<M extends keyof Telegram> = MyTypegram["Opts"][M];
type Ret<M extends keyof Telegram> = MyTypegram["Ret"][M];

// The adjusted `InputMedia*` types:
type InputMedia = MyTypegram["InputMedia"];
type InputMediaPhoto = MyTypegram["InputMediaPhoto"];
type InputMediaVideo = MyTypegram["InputMediaVideo"];
type InputMediaAnimation = MyTypegram["InputMediaAnimation"];
type InputMediaAudio = MyTypegram["InputMediaAudio"];
type InputMediaDocument = MyTypegram["InputMediaDocument"];
```

In fact, if you are using the type annotations of `typegram` without relying on the `Typegram` proxy type, you are actually still using a default proxy type under the hood.
The declaration of this default proxy type may help you to define your own version.
Check out [the default.d.ts file](https://github.com/KnorpelSenf/typegram/blob/master/default.d.ts).

Note that interfaces other than the ones mentioned above are unaffected by the customization through `MyInputFile`.
They can simply continue to be imported directly from `typegram`.

## Where Do the Types Come from

They're handwritten.

That is, they're of course not entirely handwritten.
The initial version of them were produced in one afternoon by a combination of copying and pasting from the website, VIM magic, regular expressions, and VSCode auto-formatting the rest.

After that, some more work and a few community contributions did the polishing.

Subsequent updates to the API were integrated manually in a similar fashion.

Other people's previous attempts to harvest the types directly from the website using a script failed due to the required effort of handling special cases about the layout of the website.

The [grammY](https://github.com/grammyjs/grammY) bot framework was orginally based on `typegram` which served as the starting point for [the grammY types package](https://github.com/grammyjs/types).
Starting after the upgrade to Bot API 5.0, most changes and updates to `typegram` were simply `git cherry-pick`ed from this repository.
If you want to contribute to `typegram`, it may makes sense to add them to grammY first and then can easily be backported to `typegram`.
