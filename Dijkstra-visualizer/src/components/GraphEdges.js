import { LayerGroup, Polyline } from 'react-leaflet';

const GraphEdges = ({ graph }) => {
    const drawEdges = () => {
      const edges = [];
  
      Object.entries(graph).forEach(([nodeId, node]) => {
        const { latitude: latA, longitude: lngA, adjacent_nodes: adjacentNodes } = node;
        adjacentNodes.forEach(adjacentNodeId => {
          const adjacentNode = graph[adjacentNodeId];
          if (adjacentNode) {
            const { latitude: latB, longitude: lngB } = adjacentNode;
            edges.push(
              <Polyline
                key={`${nodeId}-${adjacentNodeId}`}
                positions={[
                  [latA, lngA],
                  [latB, lngB],
                ]}
                color="blue"
                weight={2}
                opacity={0.8}
              />
            );
          }
        });
      });
  
      return edges;
    };
  
    return <LayerGroup>{drawEdges()}</LayerGroup>;
  };
  

export default GraphEdges;