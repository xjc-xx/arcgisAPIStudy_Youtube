/*
 * @Author: your name
 * @Date: 2020-12-10 10:22:13
 * @LastEditTime: 2020-12-16 17:29:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-Project\arcgisAPIStudy_Youtube\DevSummit-presentations-gh-pages\Dev-Summit-2020\web-editing\Demos\basic-editing\app\main.ts
 */
import WebMap = require("esri/WebMap");
import MapView = require("esri/views/MapView");
import Editor = require("esri/widgets/Editor");

console.log("ts")
// Create a map from the referenced web map item id
const webmap = new WebMap({
  portalItem: {
    id: "154ba34201774bb29f7c3b68adf52b6a"
  }
});

const view = new MapView({
  container: "viewDiv",
  map: webmap,
  popup: {
    autoOpenEnabled: false //disable popups
  }
});

// Create the Editor 💥
const editor = new Editor({ view });

view.ui.add(editor, "top-right");
