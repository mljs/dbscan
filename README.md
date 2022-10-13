# dbscan

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm i ml-dbscan`

## Usage

```js
import { dbscan } from 'ml-dbscan';
const dbscan = require('ml-dbscan');
let dataset = var dataset = [
    [1,1],[0,1],[1,0],
    [10,10],[10,13],[13,13],
    [54,54],[55,55],[89,89],[57,55]
];
const result = dbscan(dataset, 5, 2);
// result is ...
[
  0, 0, 0,  1, 1,
  1, 2, 2, -1, 2
]
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-dbscan.svg
[npm-url]: https://www.npmjs.com/package/ml-dbscan
[ci-image]: https://github.com/mljs/dbscan/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/mljs/dbscan/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/mljs/dbscan.svg
[codecov-url]: https://codecov.io/gh/mljs/dbscan
[download-image]: https://img.shields.io/npm/dm/ml-dbscan.svg
[download-url]: https://www.npmjs.com/package/ml-dbscan
