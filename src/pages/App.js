import React, { useState } from 'react';
import { MapContainer, TileLayer, LayersControl, SVGOverlay} from 'react-leaflet';
import { FaTimes } from 'react-icons/fa';
import DijkstraVisualizer from '../components/DijkstraVisualizer';
import GraphNodes from '../components/GraphNodes';
import GraphEdges from '../components/GraphEdges';
import demo from '../images/demo.gif';
import georgetownGraph from '../data/georgetown/graph.json';
import amsterdamGraph from '../data/amsterdam/graph.json';
import newyorkGraph from '../data/newyork/graph.json';

import "leaflet/dist/leaflet.css";
import '../css/leaflet-custom.css';

const { BaseLayer } = LayersControl;

export default function App() {
  const [selectedCity, setSelectedCity] = useState('newyork');
  const [showWelcomePopup, setShowWelcomePopup] = useState(true);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCloseWelcomePopup = () => {
    setShowWelcomePopup(false);
  };

  let position, bounds, graph;

  if (selectedCity === 'amsterdam') {
    position = [52.379189, 4.899431];
    bounds = [
      [52.38039692597146, 4.880644398243726],
      [52.36575421543389, 4.91228785098806],
    ];
    graph = amsterdamGraph;
  } else if (selectedCity === 'georgetown') {
    position = [33.37854108551519, -79.29901953566606];
    bounds = [
      [33.38796, -79.31925],
      [33.37449, -79.28822],
    ];
    graph = georgetownGraph;
  } else if (selectedCity === 'newyork') {
    position = [40.747746743195236, -73.98688487657564];
    bounds = [
      [40.76212414786863, -74.0137455950767],
      [40.735814489338566, -73.96871177201714],
    ];
    graph = newyorkGraph;
  }

  return (
    <div className="app">
      {showWelcomePopup && (
        <div className="welcomePopup">
          <span className="closeIcon" onClick={handleCloseWelcomePopup}>
            <FaTimes />
          </span>
          <img src={demo} alt="demo" />
          Welcome to the <b>Dijkstra visualizer</b>. This is a pathfinding visualizer based on <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">Dijkstra's algorithm</a>. If you close the window, you will be able to start. Note that not all paths are possible, only the paths that are inside the supported area. Click the layer button right top on the screen to see the supported areas. For more information about the project, please visit <a href="https://github.com/jiami-jongejan/Dijkstra_visualizer">Github</a>.
        </div>
      )}
      {showWelcomePopup && <div className="backgroundOverlay"></div>}
      <div className="dropdown">
        <label htmlFor="citySelect">📍 </label>
        <select id="citySelect" value={selectedCity} onChange={handleCityChange}>
         {/* <option value="amsterdam">Amsterdam</option> */ }
          <option value="georgetown">Georgetown</option>
          <option value="newyork">New York</option>
        </select>
      </div>
      <MapContainer
        key={selectedCity}
        center={position}
        zoom={15}
        scrollWheelZoom={true}
      >
        <LayersControl>
          <BaseLayer checked name="Standard">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Transport">
            <TileLayer
              attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
            />
          </BaseLayer>
          <BaseLayer name="Terrain">
            <TileLayer
              attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors)'
              url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}"
              ext="png"
              subdomains='abcd'
            />
          </BaseLayer>
          <LayersControl.Overlay name="Supported area">
            <SVGOverlay bounds={bounds}>
              <rect x="0" y="0" width="100%" height="100%" fill="#fee5a2" fillOpacity={0.2} />
            </SVGOverlay></LayersControl.Overlay>

          <LayersControl.Overlay unchecked name="Graph nodes">
            <GraphNodes graph={graph} />
          </LayersControl.Overlay>

          <LayersControl.Overlay unchecked name="Graph edges">
            <GraphEdges graph={graph} />
          </LayersControl.Overlay>
        </LayersControl>

        <DijkstraVisualizer graph={graph} />
      </MapContainer>
    </div>

  );
}