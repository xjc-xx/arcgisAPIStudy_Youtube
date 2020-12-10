require([
  "esri/Map",
  "esri/views/MapView",
  "dojo/domReady!"
], function(Map, MapView) {

  /******************************************************************
   *
   * Set the initial map and zoom/center example
   *
   ******************************************************************/

  // Create a basemap and set properties in map constructor. Try changing to various basemaps
  // streets, satellite, hybrid, topo, gray, dark-gray, oceans, national-geographic, terrain
  // osm, dark-gray-vector, gray-vector, streets-vector, topo-vector, streets-night-vector
  // streets-relief-vector, streets-navigation-vector

  var map = new Map({
    basemap: "streets-vector"
  });

  view = new MapView({
   container: "viewDiv",
   map: map,
   zoom: 12,
   center: [-116.51131318985159, 33.82694510172852]
 });

});
