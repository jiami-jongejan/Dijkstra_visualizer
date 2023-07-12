import {CircleMarker, LayerGroup } from 'react-leaflet';

const GraphNodes = ({ graph }) => {
    return (
      <LayerGroup>
        {Object.values(graph).map(({ latitude, longitude, id }) => (
          <CircleMarker
            key={id}
            center={[latitude, longitude]}
            radius={6}
            color="#005bc5"
            fillColor="#005bc5"
            weight="1"
            fillOpacity={0.6}
          />
        ))}
      </LayerGroup>
    );
  };

export default GraphNodes;