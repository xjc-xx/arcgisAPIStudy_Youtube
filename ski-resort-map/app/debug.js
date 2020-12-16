/*
 * @Author: your name
 * @Date: 2020-12-11 16:15:16
 * @LastEditTime: 2020-12-16 10:37:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \VUE项目实践\arcgisAPIStudy_Youtube\ski-resort-map\app\debug.js
 */
define([
  "esri/geometry/Polygon",
  "esri/geometry/Point",
  "esri/Graphic",
  "esri/geometry/SpatialReference"
], function (
  Polygon,
  Point,
  Graphic,
  SpatialReference
) {
  var graphics = []
  return {
    displayGraphicsFromFlatVertexArray(vertices) {

      let graphics = [];
      const pointSymbol = {
        type: "point-3d",
        symbolLayers: [{
          type: "icon",
          resource: {
            primitive: "circle"
          },
          material: {
            color: [255, 0, 0, 0.8]
          },
          size: 5
        }]
      };
      for (let i = 0; i < vertices.length; i += 2) {
        const graphic = new Graphic({
          symbol: pointSymbol,
          geometry: new Point({
            x: vertices[i],
            y: vertices[i + 1],
            z: 5000,
            spatialReference: SpatialReference.WebMercator
          })
        });
        graphics.push(graphic);
      }
      return graphics;
    },
    displayGraphicsFromTriangles(delaunay, points) {
      console.log(points)
      forEachTriangle(points, delaunay, getTriGraphic)

      return graphics
    }
  }

  function getTriGraphic(tri, t) {
    const triSymbol = {
      type: "simple-fill",
      color: [0, 0, 200, 0],
      outline: {
        color: [255, 0, 0, 0.8],
        width: 1
      }
    }

    let triGraphic = new Graphic({
      symbol: triSymbol,
      geometry: new Polygon({
        rings: [
          tri[0],
          tri[1],
          tri[2],
          tri[0]
        ],
        spatialReference: SpatialReference.WebMercator
      })
    })

    graphics.push(triGraphic)
  }

  function nextHalfedge(e) {
    return (e % 3 === 2) ? e - 2 : e + 1;
  }

  function prevHalfedge(e) {
    return (e % 3 === 0) ? e + 2 : e - 1;
  }

  function edgesOfTriangle(t) {
    return [3 * t, 3 * t + 1, 3 * t + 2];
  }

  function triangleOfEdge(e) {
    return Math.floor(e / 3);
  }

  function edgesOfTriangle(t) {
    return [3 * t, 3 * t + 1, 3 * t + 2];
  }

  function pointsOfTriangle(delaunay, t) {
    return edgesOfTriangle(t)
      .map(e => delaunay.triangles[e]);
  }

  function forEachTriangle(points, delaunay, callback) {
    for (let t = 0; t < delaunay.triangles.length / 3; t++) {
      callback(pointsOfTriangle(delaunay, t).map(p => points[p]), t);
      console.log("已完成" + t)
    }
  }
});