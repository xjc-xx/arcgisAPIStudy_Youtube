/*
 * @Author: your name
 * @Date: 2020-12-10 10:22:13
 * @LastEditTime: 2020-12-16 17:33:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE-Project\arcgisAPIStudy_Youtube\DevSummit-presentations-gh-pages\Dev-Summit-2020\web-editing\Demos\basic-editing\app\main.js
 */
define(["require", "exports", "esri/WebMap", "esri/views/MapView", "esri/widgets/Editor"], function (require, exports, WebMap, MapView, Editor) {
    console.log(exports.__esModule)
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    console.log(exports.__esModule)
    // Create a map from the referenced web map item id
    var webmap = new WebMap({
        portalItem: {
            id: "154ba34201774bb29f7c3b68adf52b6a"
        }
    });
    var view = new MapView({
        container: "viewDiv",
        map: webmap,
        popup: {
            autoOpenEnabled: false //disable popups
        }
    });
    // Create the Editor 💥
    var editor = new Editor({
        view: view
    });
    view.ui.add(editor, "top-right");
});