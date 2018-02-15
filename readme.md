# callbag-from-stream

Convert a readable stream (or any EventEmitter with data / end / error events) to a callbag listenable source.

`npm install callbag-from-stream`

## example

Create and observe a source callbag created from a file's readable stream:

```js
const fs = require('fs');
const fromStream = require('callbag-from-stream');
const observe = require('callbag-observe');

const stream = fs.createReadStream('LICENSE.txt',{encoding:'utf8'});
const source = fromStream(stream);
observe(x => console.log(x))(source);
```
