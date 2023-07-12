import React from 'react';
import ShortestPath from './ShortestPath';
import { useEffect } from 'react';
import { CircleMarker, useMapEvents } from 'react-leaflet';
import { findClosestCoordinates } from '../utils/helpers';
import { calculateDistance } from '../utils/helpers';

function DijkstraVisualizer({ graph }) {
  const [startPos, setStartPos] = React.useState(null);
  const [endPos, setEndPos] = React.useState(null);
  const [markerCount, setMarkerCount] = React.useState(0);
  const [shortestPath, setShortestPath] = React.useState([]);

  /* Handling the startPos and endPos selection from user. */
  const handleMapClick = (event) => {
    const { lat, lng } = event.latlng;

    const updatedLatLng = findClosestCoordinates(lat, lng, graph);
    const newLatLng = [updatedLatLng.latitude, updatedLatLng.longitude];

    if (markerCount === 0) {
      setStartPos(newLatLng);
      setMarkerCount(1);
    } else if (markerCount === 1) {
      setEndPos(newLatLng);
      setMarkerCount(2);
    } else {
      setStartPos(null);
      setEndPos(null);
      setMarkerCount(0);
    }
  };

  useMapEvents({
    click: handleMapClick,
  });

  /* Based on Dijksta's algorithm
  See: https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm */
  const runDijkstra = () => {
    if (!startPos || !endPos) {
      return;
    }
    const startNodeId = Object.entries(graph).find(
      ([key, value]) =>
        value.latitude === startPos[0] && value.longitude === startPos[1]
    )[0];
    const endNodeId = Object.entries(graph).find(
      ([key, value]) =>
        value.latitude === endPos[0] && value.longitude === endPos[1]
    )[0];

    const distances = {};
    const previous = {};
    const queue = [];

    for (const vertex in graph) {
      distances[vertex] = Infinity;
      previous[vertex] = null;
      queue.push(vertex);
    }

    distances[startNodeId] = 0;

    while (queue.length > 0) {
      let minDistance = Infinity;
      let minVertex = null;

      for (const vertex of queue) {
        if (distances[vertex] < minDistance) {
          minDistance = distances[vertex];
          minVertex = vertex;

          console.log(vertex);
        }
      }

      if (minVertex === null) {
        break;
      }

      queue.splice(queue.indexOf(minVertex), 1);

      const current = graph[minVertex];
      const neighbors = current.adjacent_nodes.map(String);

      for (const neighbor of neighbors) {
        const neighborVertex = graph[neighbor];

        if (!neighborVertex) {
          continue;
        }

        const distance = calculateDistance(
          [current.latitude, current.longitude],
          [neighborVertex.latitude, neighborVertex.longitude]
        );

        const totalDistance = distances[minVertex] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previous[neighbor] = minVertex;
        }
      }
    }

    if (previous[endNodeId]) {
      const path = [];
      let current = endNodeId;

      while (current !== startNodeId) {
        path.unshift(current);
        current = previous[current];
      }

      path.unshift(startNodeId);
      setShortestPath(path);
    } else {
      setShortestPath([]);
    }

  };

  useEffect(() => {
    runDijkstra()
  }, [endPos]);

  return (
    <div>
      {startPos && (
        <CircleMarker
          center={startPos}
          radius={10}
          color="#005bc5"
          fillColor="#005bc5"
          weight="3"
          fillOpacity={1}
        />
      )}
      {endPos && (
        <CircleMarker
          center={endPos}
          radius={10}
          color="#005bc5"
          fillColor="#005bc5"
          weight="3"
          fillOpacity={1}
        />
      )}

      {shortestPath.length > 0 && (<ShortestPath
        startPos={startPos}
        shortestPath={shortestPath}
        endPos={endPos}
        graph={graph}
      />)}
    </div>
  );
}

export default DijkstraVisualizer;