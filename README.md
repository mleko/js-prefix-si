## prefix-si

## Install

```bash
$ npm install si-prefix
```

## Usage

```js
prefix = require('prefix-si')

prefix(1024*1024, "B", {binary: true})
// => "1MiB"

prefix(1200, "g")
// => "1.2kg"
```
