importScripts("../js/lib/three.js");
/*
var i = 0;

function timedCount() {
  i = i + 1;
  postMessage(i);

  setTimeout("timedCount()", 500);
}

timedCount();
*/
onmessage = async function(e) {
  console.log(e.data);
  var mesh = await addFlat3DWaveForm(
    e.data.values,
    e.data.step,
    e.data.material,
    e.data.heightScale,
    e.data.offset,
    e.data.depth,
    e.data.side
  );
  console.log(mesh);

  // addCircle3DWaveForm2(e.data.values,e.segmets,e.step,e.material,e.heightScale)
};

async function addCircle3DWaveForm2(
  values,
  segmets,
  step,
  material,
  heightScale,
  offset
) {
  var points = [];

  var stepValue = step;
  points.push(new THREE.Vector2(0, 0));
  for (let i = 0; i < values.length; i++) {
    points.push(new THREE.Vector2(values[i] * heightScale + offset, stepValue));
    stepValue += step;
  }
  points.push(new THREE.Vector2(0, stepValue + step));

  var geometry = new THREE.LatheGeometry(points, segmets);
  var mesh = new THREE.Mesh(geometry, material);
  mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(4.71238898));

  return mesh;
}

async function addFlat3DWaveForm(
  values,
  step,
  material,
  heightScale,
  offset,
  depth,
  side
) {
  var points = [];
  points.push(new THREE.Vector2(0, 0));

  var stepValue = step;
  for (let i = 0; i < values.length; i++) {
    points.push(new THREE.Vector2(stepValue, values[i] * heightScale + offset));
    stepValue += step;
  }
  points.push(new THREE.Vector2(stepValue + step, 0));

  if (side == "two") {
    stepValue -= step;
    values = values.reverse();
    for (let i = 0; i < values.length; i++) {
      points.push(
        new THREE.Vector2(stepValue, -values[i] * heightScale - offset)
      );
      stepValue -= step;
    }
  }
  var extrudeSettings = {
    depth: depth,
    bevelEnabled: false
    //bevelSegments: 2,
    //steps: 2,
    //bevelSize: 1,
    //bevelThickness: 1
  };
  var pointsShape = new THREE.Shape(points);
  var geometry = new THREE.ExtrudeBufferGeometry(pointsShape, extrudeSettings);

  //work around, so that THREEBSP works
  var test = new THREE.Geometry().fromBufferGeometry(geometry);

  var mesh = new THREE.Mesh(test, material);

  return test;
  /*
    //HELPERS
    var edges = new THREE.EdgesGeometry(mesh.geometry);
    var line = new THREE.LineSegments(edges);
    line.material.depthTest = false;
    line.material.opacity = 0.25;
    line.material.transparent = true;
    scene.add(line);
    scene.add(new THREE.BoxHelper(line));
    //scene.add(new THREE.BoxHelper(group));
    //scene.add(new THREE.BoxHelper(scene));
    */
}
