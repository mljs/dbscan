# dbscan

Density-based spatial clustering of applications with noise ([DBSCAN](http://en.wikipedia.org/wiki/DBSCAN)) is one of the most popular algorithm for clustering data.

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

## [API Documentation](https://mljs.github.io/dbscan/)

## Installation

`$ npm i ml-dbscan`

## Usage

This library exposes a single function dbscan.

`dbscan(points:number[][] , options = {epsilon: number = 1; minPoints: number = 2; distance: (p: number[], q: number[]) => number = euclidean;}) => labels: number[]`
points: A list of data to perform the clustering on, like `[[1], [2]]`, `[[1, 2], [[3, 4]]` or more dimensions `[[1, 2, 3, 4...],[...]]`.

epsilon: The maximum distance between two points for them to be considered as being in the same neighborhood. Default is 1.

minPoints: The minimum number of points in any group for them to be considered a distinct group. All other points are considered to be noise, and will receive a label of -1. Default is 2.

distance: Distance calculation method of two points, default is euclidean distance.

labels is the returned list of clustered group labels. These labels correspond to the data points in data with the same array index. A label of -1 indicates the point is noise. All points with a value >= 0 indicate those points are in the same cluster, e.g. all points with label 1 belong to cluster 1.

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
