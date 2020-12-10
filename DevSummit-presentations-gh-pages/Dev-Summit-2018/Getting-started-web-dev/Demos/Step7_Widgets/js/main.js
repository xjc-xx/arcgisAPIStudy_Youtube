require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Search",
  "dojo/domReady!"
], function(WebMap, MapView, Legend, Search) {
  var map = new WebMap({
    portalItem: {
      // autocast
      id: "b45ec95aeeb743399dd4b557abd20ee2"
    }
  });
  var view = new MapView({
    container: "viewDiv",
    map: map,
    zoom: 3,
    center: [-99.14725260912257, 36.48617178360141]
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function() {
    var privateSchoolsPoly = map.layers.getItemAt(0);
    // Step 1: Create the widget
    var legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [
        {
          layer: privateSchoolsPoly,
          title: "Private school enrollment"
        }
      ]
    });
    var searchWidget = new Search({
      view: view,
      sources: [
        {
          featureLayer: {
            url: privateSchoolsPoly.url,
            outFields: ["*"],
            popupTemplate: privateSchoolsPoly.popupTemplate
          },
          searchFields: ["state_abbr", "state_name"],
          displayField: "state_name",
          exactMatch: false,
          outFields: ["*"],
          name: "State name",
          placeholder: "Search by state name",
          suggestionsEnabled: true
        }
      ]
    });
    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "bottom-left");
    view.ui.add(searchWidget, "top-right");
  });
});
