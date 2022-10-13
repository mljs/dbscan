import { euclidean } from 'ml-distance-euclidean';
/**
 * DBSCAN
 * @returns list of cluster，-1 is noise
 */
interface IPoint {
  index: number;
  value: number[];
  label: number;
}
function rangeQuery(
  cur: IPoint,
  data: IPoint[],
  epsilon: number,
  distance: (p: number[], q: number[]) => number,
) {
  return data.filter((point) => distance(point.value, cur.value) <= epsilon);
}
export function dbscan(
  points: number[][],
  epsilon: number = 1,
  minPoints: number = 2,
  distance: (p: number[], q: number[]) => number = euclidean,
) {
  if (!(points instanceof Array)) {
    throw Error('points must be of type array, ' + typeof points + ' given');
  }
  let clusterId = 0;
  const data: IPoint[] = points.map((point, index) => ({
    index,
    value: point,
    label: -1,
  }));

  data.forEach((point) => {
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

    clusterId += 1; // Next cluster label
    point.label = clusterId; // Label initial point

    // Remove point p from n
    let neighbors2 = neighbors.filter(
      (neighbor) => neighbor.index !== point.index,
    );

    // Process every seed point
    while (neighbors2.length) {
      const neighbor = neighbors2.pop()!;
      if (neighbor.label === 0) {
        neighbor.label = clusterId;
      } // Change noise to border
      if (neighbor.label !== -1) {
        continue; // Previously processed
      }
      neighbor.label = clusterId; // Label neighbor
      // Find neighbors
      neighbors = rangeQuery(neighbor, data, epsilon, distance);

      // Add new neighbors to seed
      if (neighbors.length >= minPoints) {
        neighbors2 = neighbors2.concat(neighbors);
      }
    }
  });

  return data.map((d) => d.label - 1);
}
