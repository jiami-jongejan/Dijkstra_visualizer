
<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/jiami-jongejan/Dijkstra-visualizer">
    <img src="https://cdn-images-1.medium.com/max/960/1*heR0By4G5GbpJ6ZaftJLRQ.gif" alt="Logo" width="120" height="auto">
  </a>

<h3 align="center">Dijkstra's visualizer</h3>

  <p align="center">
    React web application calculating the shortest path between two points
    <br />
  </p>
</div>


<!-- ABOUT THE PROJECT -->
## About The Project
<div align="center">
<img src="https://github.com/jiami-jongejan/Dijkstra-visualizer/blob/Dijkstra-visualize/src/images/demo.gif" alt="Screenshot">
</div>
<br/>
I created this project for an take-home assignment for a software developer interview. It relies on <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">Dijkstra's famous algorithm</a>. A <a href= "https://main--incandescent-hamster-bac73d.netlify.app/">live demo can be found here</a>. I received the assignment and had less then 2 days to create everything from scratch. Therefore, I decided to focus on a few features.
<br />
<br />

## Installation

Clone the repo
   ```sh
   git clone https://github.com/jiami-jongejan/Dijkstra_visualizer
   cd Dijkstra_visualizer
   ```
Install NPM packages
   ```sh
   npm install
   ```
Run the application on a local server, the application now will show up on a localhost.
   ```sh
   npm run start
   ```


## Design details & choices

**Data retrieval and graph creation**<br />
The project follows a specific approach for data retrieval and processing:

- Data is obtained from PBF files, which contain map information. An example file can be found in the /data/amsterdam folder.
- The project utilizes OpenStreetMap as the data source, and the conversion of map data to CSV files is facilitated by the osm4routing2 tool available on GitHub.
- The conversion process involves transforming intersections into nodes and roads into edges. This results in a JSON file representation, achieved through the data_transform.py script.
- Nodes are identified by a unique node ID, and their neighboring/adjacent nodes are represented in the JSON file.</p>

While the New York map is imported dynamically, the Georgetown map is hardcoded. Initially, hardcoding Georgetown facilitated debugging and served as a test case. Although the Amsterdam map is present in the project folder, its metadata differs significantly from that of New York, causing the conversion process to omit many roads and edges in the resulting JSON file. Future improvements would involve adjusting the conversion process to accommodate Amsterdam's specific data structure.

Currently, Amsterdam is commented out in the dropdown menu. However, it can be re-enabled to visualize and run the path calculation on Amsterdam. Please note that due to the significant number of missing edges in the graph, the shortest path calculation will not yield accurate results.

**Visual map creation and interaction**<br />
The project employs <a href="https://react-leaflet.js.org/">React Leaflet</a> for map creation and user interaction. Multiple map styles are available, with additional options accessible on <a href="leaflet-extras.github.io/leaflet-providers/preview/">this</a> convenient GitHub page.

When a user clicks on the map, the system identifies the closest node to the clicked location. This mechanism ensures that the user cannot initiate a route from invalid locations such as bodies of water. This approach effectively handles various edge cases. In instances where the user clicks outside the supported area, the system automatically assigns the closest point within the area as the starting or ending point.

Given the project's heavy reliance on coordinates, the <a href="https://en.wikipedia.org/wiki/Haversine_formula">Haversine formula</a> is used to calculate the distance between two sets of coordinates. The Haversine formula provides an accurate approximation of the distance between points on a sphere.

**Handling Large Data Files**<br />
Considering the time constraints of the assignment (two days), extensive efforts were not dedicated to working with large data files. As a result, calculating a path from point A to point B in New York is only feasible within a supported area. The current graph for New York comprises over 3800 nodes. While Dijkstra's algorithm is efficient, its implementation for traversing and calculating the shortest path through 100,000+ nodes requires specialized considerations. Addressing these requirements would be a future improvement for the project.

**Path Visualization**<br />
Upon calculating the shortest path, the system visually represents it by drawing a line that connects the coordinates of the nodes included in the path.
