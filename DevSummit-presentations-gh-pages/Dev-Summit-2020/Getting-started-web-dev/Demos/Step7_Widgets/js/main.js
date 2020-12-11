/*
 * @Author: your name
 * @Date: 2020-12-10 10:22:13
 * @LastEditTime: 2020-12-10 18:11:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \arcgisAPIStudy_Youtube\DevSummit-presentations-gh-pages\Dev-Summit-2020\Getting-started-web-dev\Demos\Step7_Widgets\js\main.js
 */
require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Legend",
  "esri/widgets/Swipe",
], function (WebMap, MapView, Legend, Swipe) {

  const map = new WebMap({
    portalItem: {
      // autocast
      id: "f9a9a7e3857d4d51b2c801cf8c399add"
    }
  });
  const view = new MapView({
    container: "viewDiv",
    map: map
  });
  /******************************************************************
   *
   * Widget example - Add legend widget
   *
   ******************************************************************/
  view.when(function () {
    const chicagoCrime = map.layers.getItemAt(0); // bottom
    const vehicles = map.layers.getItemAt(1); // top of TOC
    const homicides = map.layers.getItemAt(2);

    homicides.visible = true;
    // Step 1: Create the widget
    const legend = new Legend({
      // Step 2: Specify any additional properties for the legend. In this case,
      // we are just setting the view to where the legend should apply
      view: view,
      layerInfos: [{
          layer: chicagoCrime,
          title: "Chicago Crime Tracts"
        },
        {
          layer: homicides,
          title: "Chicago Homicide Data"
        }
      ]
    });

    const swipe = new Swipe({
      view: view,
      leadingLayers: [chicagoCrime], // left
      trailingLayers: [homicides], // right
      position: 45
    });

    // Step 3: Add the widget to the view's UI, specify the docking position as well
    view.ui.add(legend, "top-right");
    view.ui.add(swipe);

  });
});