import {Polyline} from 'react-leaflet';

function ShortestPath({ startPos, shortestPath, endPos, graph }) {
    if (!startPos || !endPos || shortestPath.length === 0) {
        return null;
    }

    const polylinePositions = [
        startPos,
        ...shortestPath.map((nodeId) => [
            graph[nodeId].latitude,
            graph[nodeId].longitude,
        ]),
        endPos,
    ];

    return (
        <Polyline
            positions={polylinePositions}
            color="rgb(0, 91, 197)"
            weight={3}
            opacity={0.8}
        />
    );
}

export default ShortestPath;