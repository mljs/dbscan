import { euclidean } from 'ml-distance-euclidean';

interface IPoint {
  value: number[];
  index: number;
  label: number;
}

interface DBScanOptions {
  /**
   * The maximum distance between two points for them to be considered as being in the same neighborhood.
   * @default 1
   */
  epsilon?: number;
  /**
   * The minimum number of points in any group for them to be considered a distinct group. All other points are considered to be noise, and will receive a label of -1.
   * @default 2
   */
  minPoints?: number;
  /**
   * Distance calculation method of two points, default is euclidean distance.
   * You may be interested to use one of the available distances from https://www.npmjs.com/package/ml-distance
   * @default  euclidean
   */
  distance?: (p: number[], q: number[]) => number;
}

/**
 * @param points A list of data to perform the clustering on, like `[[1], [2]]`, `[[1, 2], [[3, 4]]` or more dimensions `[[1, 2, 3, 4...],[...]].
 * @param options dbscan related parameters.
 * @returns labels is the returned list of clustered group labels. A label of -1 indicates the point is noise
 */
export function dbscan(points: number[][], options: DBScanOptions = {}) {
  if (!(points instanceof Array)) {
    throw Error(`points must be of type array, ${typeof points} given`);
  }
  const { epsilon = 1, minPoints = 2, distance = euclidean } = options;
  const data: IPoint[] = [];
  let clusterId = 0;

  for (let index = 0; index < points.length; index++) {
    const point = points[index];
    data.push({
      index,
      value: point,
      label: -1,
    });
  }

  for (const point of data) {
    // Only process unlabelled points
    if (point.label !== -1) {
      return;
    }
    // Get all the points neighbors
    let neighbors = rangeQuery(point, data, epsilon, distance);
    // Check if point is noise
    if (neighbors.length < minPoints) {
      point.label = 0;
      return;
    }
    // Next cluster label
    clusterId += 1;
    // Label initial point
    point.label = clusterId;
    // Remove point p from n
    let neighbors2 = neighbors.filter(
      (neighbor) => neighbor.index !== point.index,
    );
    // Process every seed point
    while (neighbors2.length) {
      const neighbor = neighbors2.pop();
      if (!neighbor) {
        break;
      }
      // Change noise to border
      if (neighbor.label === 0) {
        neighbor.label = clusterId;
      }
      // Previously processed
      if (neighbor.label !== -1) {
        continue;
      }
      // Label neighbor
      neighbor.label = clusterId;
      // Find neighbors
      neighbors = rangeQuery(neighbor, data, epsilon, distance);
      // Add new neighbors to seed
      if (neighbors.length >= minPoints) {
        neighbors2 = neighbors2.concat(neighbors);
      }
    }
  }
  const labels: number[] = [];
  for (const point of data) {
    labels.push(point.label - 1);
  }
  return labels;
}

function rangeQuery(
  current: IPoint,
  data: IPoint[],
  epsilon: number,
  distance: (p: number[], q: number[]) => number,
) {
  return data.filter(
    (point) => distance(point.value, current.value) <= epsilon,
  );
}
