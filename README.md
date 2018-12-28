# @fnando/json_blob

[![Travis-CI](https://travis-ci.org/fnando/json_blob-js.svg)](https://travis-ci.org/fnando/json_blob-js)
[![NPM package version](https://img.shields.io/npm/v/@fnando/json_blob.svg)](https://www.npmjs.com/package/@fnando/json_blob)
![License: MIT](https://img.shields.io/badge/license-MIT-orange.svg)
![Minified size](http://img.badgesize.io/fnando/json_blob-js/master/dist/json_blob.js.svg?label=min+size)
![Minified+Gzip size](http://img.badgesize.io/fnando/json_blob-js/master/dist/json_blob.js.svg?compression=gzip&label=min%2Bgzip+size)

Load JSON blob (`application/json;base64`) content.

## Instalation

This lib is available as a NPM package. To install it, use the following command:

```
npm install @fnando/json_blob --save
```

If you're using Yarn (and you should):

```
yarn add @fnando/json_blob
```

## Importing JSON Blob

If you're using `import`:

```js
import { load, dump, parse } from "@fnando/json_blob";
```

If you're using `script`, reference the file available at `dist/json_blob.js`; the `jsonBlob` object will be exported with those 3 functions.

## API

### `jsonBlob.dump(data, jsonEngine = JSON)`

Return an encoded JSON blob. You can specify the JSON engine with an object as the second argument (it must implement `.stringify(data)` and `.parse(data)` methods).

```js
jsonBlob.dump({name: "John Doe"});
//=> eyJuYW1lIjoiSm9obiBEb2UifQ==
```

### `jsonBlob.parse(data, jsonEngine = JSON)`

Return a decoded JSON blob.

```js
jsonBlob.parse("eyJuYW1lIjoiSm9obiBEb2UifQ==");
//=> {name: "John Doe"}
```

### `jsonBlob.load(name, options = {defaultValue: null, jsonEngine: JSON})`

Load JSON blob from DOM.

- `name`: the `data-name` attribute from the `script` tag. The `script` tag must be something like `<script type="application/json;base64" data-name="user"></script>`.
- `options.defaultValue`: in case `name` doesn't exist, `defaultValue` will be returned instead.
- `options.jsonEngine`: the JSON engine that will parse the JSON payload. Useful for cases where you want to decorate the payload with additional attributes.

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
