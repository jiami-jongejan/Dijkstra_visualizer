export function findClosestCoordinates(lat, lng, graph) {
  let closestNode = null;
  let minDistance = Infinity;

  for (const nodeId in graph) {
    const node = graph[nodeId];
    const distance = Math.sqrt(
      Math.pow(lat - node.latitude, 2) + Math.pow(lng - node.longitude, 2)
    );

    if (distance < minDistance) {
      closestNode = node;
      minDistance = distance;
    }
  }

  return closestNode;
}

/* For calculating the distance between two coordinates, an implementation of Haversine's formula is used.
See: https://en.wikipedia.org/wiki/Haversine_formula */
export function calculateDistance(coord1, coord2) {
  const [lat1, lon1] = coord1;
  const [lat2, lon2] = coord2;

  const R = 6371; // Radius of the earth in kilometers
  const latDiff = deg2rad(lat2 - lat1);
  const lonDiff = deg2rad(lon2 - lon1);

  const a =
    Math.sin(latDiff / 2) * Math.sin(latDiff / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(lonDiff / 2) *
    Math.sin(lonDiff / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
}

function deg2rad(deg) {
  return (deg * Math.PI) / 180;
}