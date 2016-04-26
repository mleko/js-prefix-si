## prefix-si

SI compatible number formatter

<a href="https://travis-ci.org/mleko/js-prefix-si"><img alt="Travis Status" src="https://travis-ci.org/mleko/js-prefix-si.svg?branch=master&label=travis&style=flat"></a>

## Install

```bash
$ npm install prefix-si
```

## Usage

```js
prefix = require('prefix-si')

prefix(1024*1024, "B", {binary: true})
// => "1MiB"

prefix(1200, "g")
// => "1.2kg"
```
