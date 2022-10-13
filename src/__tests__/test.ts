import { dbscan } from '..';

describe('test dbscan', () => {
  let data = [
    [1, 1],
    [0, 1],
    [1, 0],
    [10, 10],
    [10, 13],
    [13, 13],
    [54, 54],
    [55, 55],
    [89, 89],
    [57, 55],
  ];
  const result = dbscan(data, 5, 2);
  expect(result);
});
