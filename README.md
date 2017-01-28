## prefix-si

SI, IEC compatible number formatter

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


_Todo_

- @todo add engineering notation 3k3, 1V4, 4p2, http://mathforum.org/library/drmath/view/64553.html, BS 1852
