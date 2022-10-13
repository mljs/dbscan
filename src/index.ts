import { euclidean } from 'ml-distance-euclidean';
/**
 * DBSCAN
 * @returns list of cluster，-1 is noise
 */
export function dbscan(
  points: number[][],
  epsilon: number = 1,
  minPoints: number = 2,
  distance: (p: number[], q: number[]) => number = euclidean,
) {
  if (!(points instanceof Array)) {
    throw Error('points must be of type array, ' + typeof points + ' given');
  }
  const clusters: number[][] = [];
  const noise: number[] = [];
  const pointsLength: number = points.length;
  const visited: number[] = new Array(pointsLength);
  const assigned: number[] = new Array(pointsLength);
  let neighbors: number[] = [];

  for (let pointId = 0; pointId < pointsLength; pointId++) {
    // if point is not visited, check if it forms a cluster
    if (visited[pointId] !== 1) {
      visited[pointId] = 1;
      // if closest neighborhood is too small to form a cluster, mark as noise
      neighbors = regionQuery(pointId, epsilon, points, distance);
      if (neighbors.length < minPoints) {
        noise.push(pointId);
      } else {
        // create new cluster and add point
        const clusterId = clusters.length;
        clusters.push([]);
        addToCluster(pointId, clusterId, clusters, assigned);
        expandCluster(
          clusterId,
          neighbors,
          assigned,
          visited,
          clusters,
          epsilon,
          minPoints,
          points,
          distance,
        );
      }
    }
  }
  const result = new Array(pointsLength);
  clusters.forEach((cluster, index) => {
    cluster.forEach((point) => {
      result[point] = index;
    });
  });
  noise.forEach((point) => {
    result[point] = -1;
  });
  return result;
}

function expandCluster(
  clusterId: number,
  neighbors: number[],
  assigned: number[],
  visited: number[],
  clusters: number[][],
  epsilon: number,
  minPoints: number,
  points: number[][],
  distance: (p: number[], q: number[]) => number,
) {
  /**
   * It's very important to calculate length of neighbors array each time,
   * as the number of elements changes over time
   */
  for (let i = 0; i < neighbors.length; i++) {
    const pointId2 = neighbors[i];
    if (visited[pointId2] !== 1) {
      visited[pointId2] = 1;
      const neighbors2 = regionQuery(pointId2, epsilon, points, distance);
      if (neighbors2.length >= minPoints) {
        neighbors = mergeArrays(neighbors, neighbors2);
      }
    }
    // add to cluster
    if (assigned[pointId2] !== 1) {
      addToCluster(pointId2, clusterId, clusters, assigned);
    }
  }
}

function addToCluster(
  pointId: number,
  clusterId: number,
  clusters: number[][],
  assigned: number[],
) {
  clusters[clusterId].push(pointId);
  assigned[pointId] = 1;
}

function regionQuery(
  pointId: number,
  epsilon: number,
  points: number[][],
  distance: (p: number[], q: number[]) => number,
) {
  const neighbors = [];
  const pointsLength = points.length;
  for (let id = 0; id < pointsLength; id++) {
    const dist = distance(points[pointId], points[id]);
    if (dist < epsilon) {
      neighbors.push(id);
    }
  }
  return neighbors;
}

function mergeArrays(a: number[], b: number[]) {
  const len = b.length;
  for (let i = 0; i < len; i++) {
    const p = b[i];
    if (a.indexOf(p) < 0) {
      a.push(p);
    }
  }
  return a;
}
