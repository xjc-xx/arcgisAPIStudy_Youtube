// small utility for synchronizing 2 views
// based on code from sample: https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=views-synchronize

define(["esri/core/watchUtils"], function(watchUtils) {
  function _syncViews(view1, view2) {
    var viewpointWatchHandle;
    var scheduleId;

    function clear() {
      viewpointWatchHandle && viewpointWatchHandle.remove();
      viewStationaryHandle && viewStationaryHandle.remove();
      scheduleId && clearTimeout(scheduleId);
      viewpointWatchHandle = viewStationaryHandle = scheduleId = null;
    }

    view1.watch("interacting,animation", function(newValue) {
      if (!newValue) {
        return;
      }

      if (viewpointWatchHandle || scheduleId) {
        return;
      }

      scheduleId = setTimeout(function() {
        scheduleId = null;
        viewpointWatchHandle = view1.watch("viewpoint", function(newValue) {
          view2.viewpoint = newValue;
        });
      }, 0);

      viewStationaryHandle = watchUtils.whenTrue(view1, "stationary", clear);
    });

    watchUtils.whenTrue(view1, "ready", function() {
      view1.viewpoint = view2.viewpoint;
    });
  }

  return {
    syncViews: function(view1, view2) {
      _syncViews(view1, view2);
      _syncViews(view2, view1);
    }
  };
});
