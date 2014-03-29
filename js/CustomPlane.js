var customPlane;

/**
 * addPlane()
 *   - color : color of sides
 *
 *  Add a new plane in the current scene
 *  TODO: add a dropdown menu if using multiple DEM
 */

function addPlane(color) {
  var customPlaneGeometry = new THREE.PlaneGeometry(
                                    dem[0].plane.width, dem[0].plane.height,
                                     dem[0].width - 1, dem[0].height - 1);
  var customPlaneMaterial = new THREE.MeshLambertMaterial(
    {
      color:color,
      transparent:true
    });

  customPlane = new THREE.Mesh(customPlaneGeometry,customPlaneMaterial);
  scene.add(customPlane);

}

//GUI
var gui = new dat.GUI();

var parameters = {
    c: "#ffffff",
    d: 0,
    o: 1
}

//Crete the GUI for the plane
var maingui = gui.addFolder('Custom Plane');
var customPlaneColor = maingui.addColor(parameters,'c').name('Color');
var customPlaneHeight = maingui.add(parameters,'d').min(0).max(5000).name('Plane height (m)');
var customPlaneOpacity = maingui.add(parameters,'o').min(0).max(1).name('Opacity (0-1)');

//Change plane color
customPlaneColor.onChange(function(value) {
  if (customPlane) {
    customPlane.material.color.setStyle(value);
  } else {
    addPlane(value);
  }
});

//Change plane Z
customPlaneHeight.onChange(function(value) {
  if (customPlane === undefined) addPlane(parameters.c);
  customPlane.position.z = (value + world.zShift) * world.zScale;
});

//Change plane Opacity
customPlaneOpacity.onChange(function(value) {
   if (customPlane) {
     customPlane.material.opacity = value;
   }
});
