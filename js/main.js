var canvas = document.getElementById("canvasID");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });

var currentWaveFormMesh;
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xbedff6);
var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

var exporter = new THREE.STLExporter();

var geometry = new THREE.PlaneGeometry(1400 * 3, 1400 * 3, 1400 * 3);
var material = new THREE.MeshBasicMaterial({
  color: 0xfffff0,
  side: THREE.DoubleSide
});

var plane = new THREE.Mesh(geometry, material);
rotateObject(plane, 90);
plane.position.set(0, -500, 0);
scene.add(plane);

var axesHelper = new THREE.AxesHelper(20);
scene.add(axesHelper);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

var gridHelper = new THREE.GridHelper(4000, 80, 0x0000ff, 0x808080);
gridHelper.position.y = -10;
scene.add(gridHelper);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
/*
controls.enabled = false;

canvas.addEventListener("mouseover", function() {
  controls.enabled = true;
});

canvas.addEventListener("mouseout", function() {
  controls.enabled = false;
});
*/
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
//controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 500;
//controls.maxPolarAngle = Math.PI / 2;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(-30, 35, 80);
controls.update();
controls.target.set(10, 0, 0);

async function addFlat3DWaveFormBuffer(values, step, heightScale, offset) {
  var depth = Number(document.getElementById("flatDepth").value);
  var side;
  var radios = document.getElementsByName("side");
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      side = radios[i].value;
      break;
    }
  }
  var geometry = new THREE.BufferGeometry();

  var positions = [];
  if (side == "one") {
    positions.push(0, 0, 0);
    positions.push(0, values[0] * heightScale + offset, depth);
    positions.push(0, values[0] * heightScale + offset, 0);

    positions.push(0, 0, 0);
    positions.push(0, 0, depth);
    positions.push(0, values[0] * heightScale + offset, depth);

    for (var i = 0; i < values.length - 1; i++) {
      //back
      positions.push(i * step, 0, 0);
      positions.push(i * step, values[i] * heightScale + offset, 0);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);

      positions.push(i * step, 0, 0);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);
      positions.push((i + 1) * step, 0, 0);

      //front
      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push(i * step, 0, depth);

      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );
      positions.push(i * step, 0, depth);
      positions.push((i + 1) * step, 0, depth);

      //top
      positions.push(i * step, values[i] * heightScale + offset, 0);
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);

      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );

      //bottom
      positions.push(i * step, 0, depth);
      positions.push(i * step, 0, 0);
      positions.push((i + 1) * step, 0, 0);

      positions.push(i * step, 0, depth);
      positions.push((i + 1) * step, 0, 0);
      positions.push((i + 1) * step, 0, depth);
    }

    positions.push((values.length - 1) * step, 0, 0);
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      0
    );
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      depth
    );

    positions.push((values.length - 1) * step, 0, 0);
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      depth
    );
    positions.push((values.length - 1) * step, 0, depth);
  } else {
    //Up
    positions.push(0, 0, 0);
    positions.push(0, values[0] * heightScale + offset, depth);
    positions.push(0, values[0] * heightScale + offset, 0);

    positions.push(0, 0, 0);
    positions.push(0, 0, depth);
    positions.push(0, values[0] * heightScale + offset, depth);
    //Down
    positions.push(0, 0, 0);
    positions.push(0, -values[0] * heightScale - offset, 0);
    positions.push(0, -values[0] * heightScale - offset, depth);

    positions.push(0, 0, 0);
    positions.push(0, -values[0] * heightScale - offset, depth);
    positions.push(0, 0, depth);

    for (var i = 0; i < values.length - 1; i++) {
      //back
      positions.push(i * step, 0, 0);
      positions.push(i * step, values[i] * heightScale + offset, 0);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);

      positions.push(i * step, 0, 0);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);
      positions.push((i + 1) * step, 0, 0);

      //back down
      positions.push(i * step, 0, 0);
      positions.push((i + 1) * step, -values[i + 1] * heightScale - offset, 0);
      positions.push(i * step, -values[i] * heightScale - offset, 0);

      positions.push(i * step, 0, 0);
      positions.push((i + 1) * step, 0, 0);
      positions.push((i + 1) * step, -values[i + 1] * heightScale - offset, 0);

      //front
      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push(i * step, 0, depth);

      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );
      positions.push(i * step, 0, depth);
      positions.push((i + 1) * step, 0, depth);

      //front down
      positions.push(
        (i + 1) * step,
        -values[i + 1] * heightScale - offset,
        depth
      );
      positions.push(i * step, 0, depth);
      positions.push(i * step, -values[i] * heightScale - offset, depth);

      positions.push(
        (i + 1) * step,
        -values[i + 1] * heightScale - offset,
        depth
      );
      positions.push((i + 1) * step, 0, depth);
      positions.push(i * step, 0, depth);

      //top
      positions.push(i * step, values[i] * heightScale + offset, 0);
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);

      positions.push((i + 1) * step, values[i + 1] * heightScale + offset, 0);
      positions.push(i * step, values[i] * heightScale + offset, depth);
      positions.push(
        (i + 1) * step,
        values[i + 1] * heightScale + offset,
        depth
      );

      //top down
      positions.push(i * step, -values[i] * heightScale - offset, 0);
      positions.push((i + 1) * step, -values[i + 1] * heightScale - offset, 0);
      positions.push(i * step, -values[i] * heightScale - offset, depth);

      positions.push((i + 1) * step, -values[i + 1] * heightScale - offset, 0);
      positions.push(
        (i + 1) * step,
        -values[i + 1] * heightScale - offset,
        depth
      );
      positions.push(i * step, -values[i] * heightScale - offset, depth);
    }

    //up
    positions.push((values.length - 1) * step, 0, 0);
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      0
    );
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      depth
    );

    positions.push((values.length - 1) * step, 0, 0);
    positions.push(
      (values.length - 1) * step,
      values[values.length - 1] * heightScale + offset,
      depth
    );
    positions.push((values.length - 1) * step, 0, depth);

    //down
    positions.push((values.length - 1) * step, 0, 0);
    positions.push(
      (values.length - 1) * step,
      -values[values.length - 1] * heightScale - offset,
      depth
    );
    positions.push(
      (values.length - 1) * step,
      -values[values.length - 1] * heightScale - offset,
      0
    );

    positions.push((values.length - 1) * step, 0, 0);
    positions.push((values.length - 1) * step, 0, depth);
    positions.push(
      (values.length - 1) * step,
      -values[values.length - 1] * heightScale - offset,
      depth
    );
  }
  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.addAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  geometry.computeVertexNormals();

  var geometry = new THREE.Geometry().fromBufferGeometry(geometry);
  geometry.mergeVertices();
  assignUVs(geometry);
  var mesh = new THREE.Mesh(geometry, g_material);

  return mesh;
}

async function addSpectrogram3DWaveForm(step, heightScale, offset) {
  var minDec = Number(document.getElementById("freqMin").value);
  var maxDec = Number(document.getElementById("freqMax").value);
  var fftSize = Number(document.getElementById("freqFFTsize").value);

  var tempFreqData = await getFrequencys(
    10 * smoothing,
    fftSize,
    minDec,
    maxDec
  );

  var freqData = tempFreqData.slice(
    tempFreqData.length * normalizedLeftCutterPosition,
    tempFreqData.length * normalizedRightCutterPosition
  );
  var depth = Number(document.getElementById("freqDepth").value);
  var geometry = new THREE.BufferGeometry();

  var positions = [];

  for (var i = 0; i < freqData[0].length - 1; i++) {
    positions.push(0, 0, depth * i);
    positions.push(0, freqData[0][i] * heightScale + offset, depth * i);
    positions.push(
      0,
      freqData[0][i + 1] * heightScale + offset,
      depth * (i + 1)
    );

    positions.push(0, 0, depth * i);
    positions.push(
      0,
      freqData[0][i + 1] * heightScale + offset,
      depth * (i + 1)
    );
    positions.push(0, 0, depth * (i + 1));

    //
    positions.push((freqData.length - 1) * step, 0, depth * i);
    positions.push(
      (freqData.length - 1) * step,
      freqData[freqData.length - 1][i + 1] * heightScale + offset,
      depth * (i + 1)
    );
    positions.push(
      (freqData.length - 1) * step,
      freqData[freqData.length - 1][i] * heightScale + offset,
      depth * i
    );

    positions.push((freqData.length - 1) * step, 0, depth * i);
    positions.push((freqData.length - 1) * step, 0, depth * (i + 1));
    positions.push(
      (freqData.length - 1) * step,
      freqData[freqData.length - 1][i + 1] * heightScale + offset,
      depth * (i + 1)
    );
  }

  for (var i = 0; i < freqData.length - 1; i++) {
    //back

    positions.push(
      (i + 1) * step,
      freqData[i + 1][0] * heightScale + offset,
      0
    );
    positions.push(i * step, freqData[i][0] * heightScale + offset, 0);
    positions.push(i * step, 0, 0);

    positions.push((i + 1) * step, 0, 0);
    positions.push(
      (i + 1) * step,
      freqData[i + 1][0] * heightScale + offset,
      0
    );
    positions.push(i * step, 0, 0);
    //bottom
    positions.push((i + 1) * step, 0, 0);
    positions.push(i * step, 0, 0);
    positions.push(i * step, 0, depth * freqData[0].length - 1);

    positions.push((i + 1) * step, 0, depth * freqData[0].length - 1);
    positions.push((i + 1) * step, 0, 0);
    positions.push(i * step, 0, depth * freqData[0].length - 1);

    //front
    positions.push(i * step, 0, depth * (freqData[0].length - 1));
    positions.push(
      i * step,
      freqData[i][freqData[0].length - 1] * heightScale + offset,
      depth * (freqData[0].length - 1)
    );
    positions.push(
      (i + 1) * step,
      freqData[i + 1][freqData[0].length - 1] * heightScale + offset,
      depth * (freqData[0].length - 1)
    );

    positions.push((i + 1) * step, 0, depth * (freqData[0].length - 1));
    positions.push(i * step, 0, depth * (freqData[0].length - 1));
    positions.push(
      (i + 1) * step,
      freqData[i + 1][freqData[0].length - 1] * heightScale + offset,
      depth * (freqData[0].length - 1)
    );

    for (var j = 0; j < freqData[0].length - 1; j++) {
      //top
      positions.push(
        i * step,
        freqData[i][j] * heightScale + offset,
        depth * j
      );
      positions.push(
        (i + 1) * step,
        freqData[i + 1][j] * heightScale + offset,
        depth * j
      );

      positions.push(
        i * step,
        freqData[i][j + 1] * heightScale + offset,
        depth * (j + 1)
      );

      positions.push(
        (i + 1) * step,
        freqData[i + 1][j + 1] * heightScale + offset,
        depth * (j + 1)
      );
      positions.push(
        i * step,
        freqData[i][j + 1] * heightScale + offset,
        depth * (j + 1)
      );
      positions.push(
        (i + 1) * step,
        freqData[i + 1][j] * heightScale + offset,
        depth * j
      );
    }
  }

  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.addAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  geometry.computeVertexNormals();

  var geometry = new THREE.Geometry().fromBufferGeometry(geometry);
  geometry.mergeVertices();
  assignUVs(geometry);
  var mesh = new THREE.Mesh(geometry, g_material);

  return mesh;
}
function assignUVs(geometry) {
  geometry.faceVertexUvs[0] = [];

  geometry.faces.forEach(function(face) {
    var uvs = [];
    var ids = ["a", "b", "c"];
    for (var i = 0; i < ids.length; i++) {
      var vertex = geometry.vertices[face[ids[i]]].clone();

      var n = vertex.normalize();
      var yaw = 0.5 - Math.atan(n.z, -n.x) / (2.0 * Math.PI);
      var pitch = 0.5 - Math.asin(n.y) / Math.PI;

      var u = yaw,
        v = pitch;
      uvs.push(new THREE.Vector2(u, v));
    }
    geometry.faceVertexUvs[0].push(uvs);
  });

  geometry.uvsNeedUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

async function add3DWaveformFromData(values) {
  //TODO: clean up parameter
  var step = Number(document.getElementById("step").value);
  var offset = Number(document.getElementById("offset").value);
  var heightScale = Number(document.getElementById("heightScale").value);

  var red = 255;
  var green = 0;
  var blue = 0;
  var opacity = 1;

  if (picker.color._rgba != null) {
    red = picker.color._rgba[0];
    green = picker.color._rgba[1];
    blue = picker.color._rgba[2];
    opacity = picker.color._rgba[3];
  }

  g_material = new THREE.MeshPhongMaterial({
    color: new THREE.Color("rgb(" + red + ", " + green + ", " + blue + ")"),
    shininess: 66,
    opacity: opacity,
    transparent: true,
    side: THREE.DoubleSide
  });

  var waveFormType = document
    .getElementsByClassName("activeTab")[0]
    .getAttribute("value");

  var waveFormMesh;
  if (waveFormType == "flat") {
    waveFormMesh = await addFlat3DWaveFormBuffer(
      values,
      step,
      heightScale,
      offset
    );
  } else if (waveFormType == "circle") {
    waveFormMesh = await addCircle3DWaveForm(values, step, heightScale, offset);
  } else if (waveFormType == "freq") {
    waveFormMesh = await addSpectrogram3DWaveForm(step, heightScale, offset);
  }

  document.getElementById("loadingScreen").style.display = "block";
  if (document.getElementById("addTextFlat").checked) {
    var text = String(document.getElementById("textFlat").value);
    var textDepth = Number(document.getElementById("textDepth").value);
    var textX = Number(document.getElementById("flatXtext").value);
    var textY = Number(document.getElementById("flatYtext").value);
    var textZ = Number(document.getElementById("flatZtext").value);
    var textSize = Number(document.getElementById("textSize").value);
    var type;
    var radiosText = document.getElementsByName("textTypeFlat");
    for (var i = 0, length = radiosText.length; i < length; i++) {
      if (radiosText[i].checked) {
        type = radiosText[i].value;
        break;
      }
    }

    waveFormMesh = await addText(
      waveFormMesh,
      text,
      textDepth,
      textSize,
      type,
      textX,
      textY,
      textZ
    );
  }

  if (document.getElementById("addStand").checked) {
    waveFormMesh = await loadStand(waveFormMesh);
  }
  document.getElementById("loadingScreen").style.display = "none";

  if (document.getElementById("addBend").checked) {
    waveFormMesh = await addBend(waveFormMesh);
  }

  updateMesh(waveFormMesh);
}

async function addBend(mesh) {
  var bendAngle = Number(document.getElementById("bendAngle").value);
  var bendOffset = Number(document.getElementById("bendOffset").value);
  var bendTwist = Number(document.getElementById("bendTwist").value);
  var radiosBend = document.getElementsByName("radiosBendType");
  var radiosBendType;
  for (var i = 0, length = radiosBend.length; i < length; i++) {
    if (radiosBend[i].checked) {
      radiosBendType = radiosBend[i].value;
      break;
    }
  }

  var min;
  var mid;
  var max;
  switch (radiosBendType) {
    case "X":
      min = 2;
      mid = 4;
      max = 1;
      break;
    case "Y":
      min = 4;
      mid = 1;
      max = 2;
      break;
    case "Z":
      min = 4;
      mid = 2;
      max = 1;
      break;
  }

  var modifier = new ModifierStack(mesh);
  var bend = new Bend(bendAngle, bendOffset, bendTwist, min, mid, max);
  bend.switchAxes = true;
  console.log(bend);

  modifier.addModifier(bend);
  modifier.apply();

  return mesh;
}

async function loadStand(waveMesh) {
  var cylinderX = Number(document.getElementById("cylinderX").value);
  var cylinderY = Number(document.getElementById("cylinderY").value);
  var cylinderZ = Number(document.getElementById("cylinderZ").value);
  var cylinderRadius = Number(document.getElementById("cylinderRadius").value);
  var cylinderHeight = Number(document.getElementById("cylinderHeight").value);
  var radiosCylinder = document.getElementsByName("radiosCylinderType");
  var radiosCylinderType;
  for (var i = 0, length = radiosCylinder.length; i < length; i++) {
    if (radiosCylinder[i].checked) {
      radiosCylinderType = radiosCylinder[i].value;
      break;
    }
  }

  var geometry = new THREE.CylinderGeometry(
    cylinderRadius,
    cylinderRadius,
    cylinderHeight,
    32
  );
  var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  var cylinder = new THREE.Mesh(geometry, material);
  cylinder.geometry.applyMatrix(
    new THREE.Matrix4().makeTranslation(cylinderX, cylinderY, cylinderZ)
  );
  var mesh_bsp = new ThreeBSP(waveMesh);
  var cylinder_bsp = new ThreeBSP(cylinder);

  if (radiosCylinderType == "subtract") {
    var subtract_bsp = mesh_bsp.subtract(cylinder_bsp);
  } else {
    var subtract_bsp = mesh_bsp.union(cylinder_bsp);
  }
  var result = subtract_bsp.toMesh(g_material);

  return result;
}

async function addCircle3DWaveForm(values, step, heightScale, offset) {
  var segmets = Number(document.getElementById("segmets").value);
  var points = [];

  var stepValue = step;
  points.push(new THREE.Vector2(0, 0));
  for (let i = 0; i < values.length; i++) {
    points.push(new THREE.Vector2(values[i] * heightScale + offset, stepValue));
    stepValue += step;
  }
  points.push(new THREE.Vector2(0, stepValue + step));

  var geometry = new THREE.LatheGeometry(points, segmets);
  var mesh = new THREE.Mesh(geometry, g_material);

  //Rotate
  mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(4.71238898));

  return mesh;
}

async function addFlat3DWaveForm(values, step, heightScale, offset) {
  var depth = Number(document.getElementById("flatDepth").value);
  var side;
  var radios = document.getElementsByName("side");
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      side = radios[i].value;
      break;
    }
  }

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
    bevelEnabled: false,
    bevelSegments: 2,
    steps: 3,
    bevelSize: 1,
    bevelThickness: 1
  };
  var pointsShape = new THREE.Shape(points);
  var geometry = new THREE.ExtrudeGeometry(pointsShape, extrudeSettings);

  //work around, so that THREEBSP works
  //var normal_geometry = new THREE.Geometry().fromBufferGeometry(geometry);

  var mesh = new THREE.Mesh(geometry, g_material);
  return mesh;
}

function loadFont(url) {
  return new Promise(resolve => {
    new THREE.FontLoader().load(url, resolve);
  });
}

async function addText(mesh, textLocal, depth, textSize, type, x, y, z) {
  var font;
  if (document.getElementById("addFontFromFile").checked) {
    font = new THREE.FontLoader().parse(JSON.parse(g_font));
  } else {
    font = await loadFont("assets/font2.json");
  }

  var mesh_bsp = new ThreeBSP(mesh);
  var textGeo = new THREE.TextGeometry(textLocal, {
    size: textSize,
    height: depth,
    curveSegments: 6,
    font: font //new THREE.Font(g_font)
  });

  var text = new THREE.Mesh(textGeo, g_material);
  text.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x, y, z));

  var text_bsp = new ThreeBSP(text);
  if (type == "subtract") {
    var subtract_bsp = mesh_bsp.subtract(text_bsp);
  } else {
    var subtract_bsp = mesh_bsp.union(text_bsp);
  }
  var result = subtract_bsp.toMesh(g_material);
  //result.geometry.computeVertexNormals();

  return result;
}

var g_font;
document.getElementById("fontFile").addEventListener("change", e => {
  var file = e.target.files[0];
  var fileReader = new FileReader();
  fileReader.readAsText(file);
  fileReader.onload = (function(text) {
    return function() {
      g_font = text.result;
    };
  })(fileReader);
});

async function updateMesh(newMesh) {
  scene.remove(currentWaveFormMesh);
  currentWaveFormMesh = newMesh;
  scene.add(newMesh);
}

//HELPER FUNCTION
function rotateObject(mesh, degreeX = 0, degreeY = 0, degreeZ = 0) {
  mesh.rotateX(THREE.Math.degToRad(degreeX));
  mesh.rotateY(THREE.Math.degToRad(degreeY));
  mesh.rotateZ(THREE.Math.degToRad(degreeZ));
}

//EXPORT FUNCTIONS
var link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);

function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
function exportBinary() {
  var result = exporter.parse(currentWaveFormMesh, { binary: true });
  saveArrayBuffer(result, "waveForm3D.stl");
}

function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

//AUDIO ANALZY
const audio = document.createElement("audio");
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new window.AudioContext();
const svg = document.querySelector("svg");
const progress = svg.querySelector("#progress");
const remaining = svg.querySelector("#remaining");
const width = svg.getAttribute("width");
const height = svg.getAttribute("height");
svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
var smoothing = 4;
var currentWaveFormData = null;
var currentAudioBuffer = null;
var startAudioTime;
var endAudioTime;

var startAudioTimeTemp;
var endAudioTimeTemp;

var audioDuration;

var smoothingInput = document.getElementById("smoothing");
var smoothingRange = document.getElementById("smoothingRange");
smoothingInput.addEventListener("input", smoothingChange);
smoothingRange.addEventListener("input", smoothingChange);

function smoothingChange() {
  smoothing = Number(smoothingInput.value);

  currentWaveFormData = getWaveformData(currentAudioBuffer, width / smoothing);
  svg
    .querySelector("path")
    .setAttribute("d", getSVGPath(currentWaveFormData, height, smoothing));
}

svg.addEventListener("click", e => {
  const position = e.offsetX / svg.getBoundingClientRect().width;
  audio.currentTime = position * audio.duration;
});

var startPauseButton = document.getElementById("playPauseAudio");
startPauseButton.addEventListener("click", function() {
  if (audio.paused) {
    startPauseButton.style.backgroundColor = "yellow";
    audio.play();
  } else {
    startPauseButton.style.backgroundColor = "green";
    audio.pause();
  }
});

audio.addEventListener("ended", function() {
  startPauseButton.style.backgroundColor = "green";
});

//audio from file
document.querySelector("#inputSoundFile").addEventListener("change", e => {
  const file = e.target.files[0];
  proccesBlob(file);
});

//audio from michrophone
var record = document.querySelector("#record");
var stop = document.querySelector("#stop");

if (navigator.mediaDevices.getUserMedia) {
  console.log("getUserMedia supported.");

  var constraints = { audio: true };
  var chunks = [];

  var onSuccess = function(stream) {
    try {
      var mediaRecorder = new MediaRecorder(stream);
    } catch (err) {
      console.log(err);
      document.getElementById("errorNoMediaRecordSupport").innerText =
        "Your browser does not support media recording, try updating your browser or use Google Chrome or Firefox";
      record.disabled = true;
      stop.disabled = true;

      record.style.background = "gray";
      stop.style.background = "gray";
    }
    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      stop.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    };

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      stop.style.background = "";
      stop.style.color = "";
      // mediaRecorder.requestData();

      stop.disabled = true;
      record.disabled = false;
    };

    mediaRecorder.onstop = function(e) {
      var blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      proccesBlob(blob);
    };

    mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    };
  };
  var onError = function(err) {
    console.log("The following error occured: " + err);
  };

  navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
}

const RMS = values =>
  Math.sqrt(
    values.reduce((sum, value) => sum + Math.pow(value, 2), 0) / values.length
  );
const avg = values =>
  values.reduce((sum, value) => sum + value, 0) / values.length;
const max = values => values.reduce((max, value) => Math.max(max, value), 0);
const avg2D = a =>
  a
    .reduce((acc, cur) => {
      cur.forEach((e, i) => (acc[i] = acc[i] ? acc[i] + e : e));
      return acc;
    }, [])
    .map(e => e / a.length / 255);

function getWaveformData(
  audioBuffer,
  dataPoints,
  normalizeLeftCutPosition = 0,
  normalizeRightCutPosition = 1
) {
  var tempLeftAudioCutIndex =
    audioBuffer.getChannelData(0).length * normalizeLeftCutPosition;
  var tempRightAudioCutIndex =
    audioBuffer.getChannelData(0).length * normalizeRightCutPosition;

  var leftChannel = audioBuffer
    .getChannelData(0)
    .slice(tempLeftAudioCutIndex, tempRightAudioCutIndex);
  var rightChannel;
  if (audioBuffer.numberOfChannels == 1) {
    rightChannel = leftChannel;
  } else {
    rightChannel = audioBuffer
      .getChannelData(1)
      .slice(tempLeftAudioCutIndex, tempRightAudioCutIndex);
  }
  const values = [];
  const dataWindow = Math.round(leftChannel.length / dataPoints);
  for (let i = 0, y = 0, buffer = []; i < leftChannel.length; i++) {
    const summedValue =
      (Math.abs(leftChannel[i]) + Math.abs(rightChannel[i])) / 2;
    buffer.push(summedValue);
    if (buffer.length === dataWindow) {
      values.push(avg(buffer));
      buffer = [];
    }
  }
  //console.log(values);
  //add3DWaveformFromData(values);
  return values;
}
function getSVGPath(waveformData) {
  const maxValue = max(waveformData);
  let path = `M 0 ${height} `;
  for (let i = 0; i < waveformData.length; i++) {
    path += `L ${i * smoothing} ${(1 - waveformData[i] / maxValue) * height} `;
  }
  path += `V ${height} H 0 Z`;
  return path;
}
function attachToAudio(file) {
  audio.src = URL.createObjectURL(file);
  // DO I want autoplay?
  // audio.setAttribute("autoplay", true);

  remaining.setAttribute("width", width);
  updateAudioPosition();
}

var startTimeSpan = document.getElementById("startTimeSpan");
var endTimeSpan = document.getElementById("endTimeSpan");

audio.addEventListener("durationchange", function() {
  startAudioTime = 0;
  startAudioTimeTemp = 0;
  endAudioTime = audio.duration;
  endAudioTimeTemp = audio.duration;
  audioDuration = audio.duration;
  endTimeSpan.innerText = formatTime(audio.duration);

  //Chrome bug workaround
  if (audio.duration === Infinity) {
    audio.currentTime = 1e101;
    audio.ontimeupdate = function() {
      this.ontimeupdate = () => {
        return;
      };
      audio.currentTime = 0.0001;
      startAudioTime = 0;
      startAudioTimeTemp = 0;
      endAudioTime = audio.duration;
      endAudioTimeTemp = audio.duration;
      audioDuration = audio.duration;
      endTimeSpan.innerText = formatTime(audio.duration);
    };
  }
});

var currentTimeSpan = document.getElementById("currentTimeSpan");
function updateAudioPosition() {
  const physicalPosition =
    ((audio.currentTime - startAudioTimeTemp) / audioDuration) * width;

  if (physicalPosition) {
    progress.setAttribute("width", physicalPosition);
    remaining.setAttribute("x", physicalPosition);
    remaining.setAttribute("width", width - physicalPosition);
  }

  var currentTimePosition =
    ((audio.currentTime - startAudioTimeTemp) / audioDuration) *
    (audioCuttingWindow.offsetWidth - currentTimeSpan.offsetWidth);
  if (
    currentTimePosition >
    audioCuttingWindow.offsetWidth - currentTimeSpan.offsetWidth
  ) {
    currentTimePosition =
      audioCuttingWindow.offsetWidth - currentTimeSpan.offsetWidth;
  }
  currentTimeSpan.style.marginLeft = currentTimePosition + "px";

  currentTimeSpan.innerText = formatTime(audio.currentTime);
  //loop audio playing between cutters
  if (audio.currentTime > endAudioTime) {
    audio.currentTime = startAudioTime;
  }
  requestAnimationFrame(updateAudioPosition);
}

function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

function processTrack(buffer) {
  const source = audioContext.createBufferSource();
  return audioContext.decodeAudioData(
    buffer,
    audioBuffer => {
      currentAudioBuffer = audioBuffer;
      currentWaveFormData = getWaveformData(audioBuffer, width / smoothing);
      svg
        .querySelector("path")
        .setAttribute("d", getSVGPath(currentWaveFormData, height, smoothing));
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
    },
    e => {
      reject(e);
    }
  );
}

function proccesBlob(blob) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  reader.onload = e => processTrack(e.target.result);
  attachToAudio(blob);
}

async function getFrequencys(smoothing, fttSize, minDec, maxDec) {
  var dataWindow = Math.round(smoothing);
  var offline = new OfflineAudioContext(2, currentAudioBuffer.length, 44100);
  var bufferSource = offline.createBufferSource();
  bufferSource.buffer = currentAudioBuffer;

  var analyser = offline.createAnalyser();
  analyser.fftSize = fttSize;
  analyser.minDecibels = minDec;
  analyser.maxDecibels = maxDec;
  var scp = offline.createScriptProcessor(256, 0, 1);

  bufferSource.connect(analyser);
  scp.connect(offline.destination); // this is necessary for the script processor to start

  var i = 0;
  var buffer = [];
  var allFreqData = [];
  var freqData = new Uint8Array(analyser.frequencyBinCount);
  scp.onaudioprocess = function() {
    analyser.getByteFrequencyData(freqData);
    i++;

    buffer.push(Array.from(freqData));
    if (buffer.length === dataWindow) {
      allFreqData.push(avg2D(buffer));
      buffer = [];
    }
  };

  bufferSource.start(0);
  return new Promise(function(resolve, reject) {
    offline.oncomplete = function(e) {
      resolve(allFreqData);
    };
    offline.startRendering();
  });
}

//CUTTING AUDIO
var normalizedLeftCutterPosition = 0;
var normalizedRightCutterPosition = 1;

var leftAudioCutter = document.getElementById("leftAudioCutter");
var rightAudioCutter = document.getElementById("rightAudioCutter");
var audioCuttingWindow = document.getElementById("audioCuttingWindow");
var cutWindow = document.getElementById("cutWindow");
cutWindow.style.width = audioCuttingWindow.offsetWidth - 36 + "px";
var cutWindowStartWidth = audioCuttingWindow.offsetWidth - 40;

var SVG2DWaveform = document.getElementById("SVG2DWaveform");
/*
window.addEventListener("resize", function(event) {
  console.log(event);
  cutWindow.style.width =
    cutWindowStartWidth -
    (cutWindowStartWidth - rightAudioCutter.offsetLeft) -
    leftAudioCutter.offsetLeft -
    18 +
    "px";
  rightAudioCutter.style.right = "0px";
  rightAudioCutter.style.left = "";
});


//IN DEVELOPMENT
//recalculate values of audio buffer 
var cutAudioButton = document.getElementById("cutAudioButton");
cutAudioButton.addEventListener("click", function() {
  startAudioTimeTemp =
    startAudioTimeTemp + audioDuration * normalizedLeftCutterPosition;
  endAudioTimeTemp =
    endAudioTimeTemp -
    (audioDuration - audioDuration * normalizedRightCutterPosition);
  audioDuration = endAudioTimeTemp - startAudioTimeTemp;

  currentWaveFormData = getWaveformData(
    currentAudioBuffer,
    width / smoothing,
    normalizedLeftCutterPosition,
    normalizedRightCutterPosition
  );
  svg
    .querySelector("path")
    .setAttribute("d", getSVGPath(currentWaveFormData, height, smoothing));
});
*/
var vizualizeCutWindow = document.getElementById("vizualizeCutWindow");
vizualizeCutWindow.addEventListener("click", function() {
  add3DWaveformFromData(
    currentWaveFormData.slice(
      currentWaveFormData.length * normalizedLeftCutterPosition,
      currentWaveFormData.length * normalizedRightCutterPosition
    )
  );
});

//dragElement(leftAudioCutter);
//dragElement(rightAudioCutter);

interact(".draggable").draggable({
  onmove: dragMoveListener
});

function dragMoveListener(event) {
  var elmnt = event.target,
    // keep the dragged position in the data-x/data-y attributes
    x = (parseFloat(elmnt.getAttribute("data-x")) || 0) + event.dx;

  // translate the element

  if (elmnt.id == "leftAudioCutter") {
    elmnt.style.left = x + "px";

    // update the posiion attributes
    elmnt.setAttribute("data-x", x);

    if (elmnt.offsetLeft < 0) {
      // preventing left cutter leaving screen
      elmnt.style.left = 0 + "px";
    }

    if (elmnt.offsetLeft + 18 >= rightAudioCutter.offsetLeft) {
      //preventing crossing
      elmnt.style.left = rightAudioCutter.offsetLeft - 18 + "px";
    }
    //resize cut window to fit between cutters
    cutWindow.style.left = elmnt.offsetLeft + 18 + "px";
    cutWindow.style.width =
      cutWindowStartWidth -
      elmnt.offsetLeft -
      (cutWindowStartWidth - rightAudioCutter.offsetLeft) -
      18 +
      "px";
    normalizedLeftCutterPosition =
      leftAudioCutter.offsetLeft / audioCuttingWindow.offsetWidth;
    startAudioTime =
      startAudioTimeTemp + audioDuration * normalizedLeftCutterPosition;
  }

  if (elmnt.id == "rightAudioCutter") {
    elmnt.style.left = audioCuttingWindow.offsetWidth - 18 + x + "px";

    // update the posiion attributes
    elmnt.setAttribute("data-x", x);

    if (elmnt.offsetLeft - 18 <= leftAudioCutter.offsetLeft) {
      elmnt.style.left = leftAudioCutter.offsetLeft + 18 + "px";
    }

    if (elmnt.offsetLeft >= audioCuttingWindow.offsetWidth - 18) {
      // preventing right cutter leaving screen
      elmnt.style.left = audioCuttingWindow.offsetWidth - 18 + "px";
    }
    //resize cut window to fit between cutters
    cutWindow.style.width =
      cutWindowStartWidth -
      (cutWindowStartWidth - elmnt.offsetLeft) -
      leftAudioCutter.offsetLeft -
      18 +
      "px";
    normalizedRightCutterPosition =
      (rightAudioCutter.offsetLeft - 18) /
      (audioCuttingWindow.offsetWidth - 36);
    endAudioTime =
      endAudioTimeTemp -
      (audioDuration - audioDuration * normalizedRightCutterPosition);
  }
}

// this is used later in the resizing demo
window.dragMoveListener = dragMoveListener;

//COLOR PICKER
var g_material;
var colorWaveForm = document.querySelector("#colorWaveForm");
var picker = new Picker({
  parent: colorWaveForm,
  popup: "bottom",
  color: "#ffffff"
});

picker.onChange = function(color) {
  colorWaveForm.style.background = color.rgbaString;
};

//TABS
var tabs = document.querySelectorAll("#tabstrip > span"),
  panels = document.querySelectorAll("#tabstrip > div"),
  length = tabs.length,
  currentTab,
  currentPanel;

function getToggler(newTab, newPanel) {
  return function() {
    currentTab.className = "tab inactiveTab";
    currentPanel.className = "inactivePanel";
    newTab.className = "tab activeTab";
    newPanel.className = "activePanel";
    currentTab = newTab;
    currentPanel = newPanel;
  };
}

if (length !== panels.length)
  throw new Error(
    "Number of tabs (" +
      length +
      ") and number of content panels (" +
      panels.length +
      ") are not equal"
  );

for (var i = 0; i < length; i++) {
  var tab = tabs[i];
  var panel = panels[i];

  tab.className = "tab inactiveTab";
  tab.addEventListener("click", getToggler(tab, panel), false);
  panel.className = "inactivePanel";
}

currentTab = tabs[0];
currentPanel = panels[0];
currentTab.className = "tab activeTab";
currentPanel.className = "activePanel";

//EXPAND
function expand(id) {
  var expandable = document.getElementById(id);
  if (expandable.style.display == "block") {
    expandable.style.display = "none";
  } else {
    expandable.style.display = "block";
  }
}

//DOWNLOAD .wav
function audioBufferToWav(buffer, opt) {
  opt = opt || {};

  var numChannels = buffer.numberOfChannels;
  var sampleRate = buffer.sampleRate;
  var format = opt.float32 ? 3 : 1;
  var bitDepth = format === 3 ? 32 : 16;

  var result;
  if (numChannels === 2) {
    result = interleave(buffer.getChannelData(0), buffer.getChannelData(1));
  } else {
    result = buffer.getChannelData(0);
  }

  return encodeWAV(result, format, sampleRate, numChannels, bitDepth);
}

function encodeWAV(samples, format, sampleRate, numChannels, bitDepth) {
  var bytesPerSample = bitDepth / 8;
  var blockAlign = numChannels * bytesPerSample;

  var buffer = new ArrayBuffer(44 + samples.length * bytesPerSample);
  var view = new DataView(buffer);

  /* RIFF identifier */
  writeString(view, 0, "RIFF");
  /* RIFF chunk length */
  view.setUint32(4, 36 + samples.length * bytesPerSample, true);
  /* RIFF type */
  writeString(view, 8, "WAVE");
  /* format chunk identifier */
  writeString(view, 12, "fmt ");
  /* format chunk length */
  view.setUint32(16, 16, true);
  /* sample format (raw) */
  view.setUint16(20, format, true);
  /* channel count */
  view.setUint16(22, numChannels, true);
  /* sample rate */
  view.setUint32(24, sampleRate, true);
  /* byte rate (sample rate * block align) */
  view.setUint32(28, sampleRate * blockAlign, true);
  /* block align (channel count * bytes per sample) */
  view.setUint16(32, blockAlign, true);
  /* bits per sample */
  view.setUint16(34, bitDepth, true);
  /* data chunk identifier */
  writeString(view, 36, "data");
  /* data chunk length */
  view.setUint32(40, samples.length * bytesPerSample, true);
  if (format === 1) {
    // Raw PCM
    floatTo16BitPCM(view, 44, samples);
  } else {
    writeFloat32(view, 44, samples);
  }

  return buffer;
}

function interleave(inputL, inputR) {
  var length = inputL.length + inputR.length;
  var result = new Float32Array(length);

  var index = 0;
  var inputIndex = 0;

  while (index < length) {
    result[index++] = inputL[inputIndex];
    result[index++] = inputR[inputIndex];
    inputIndex++;
  }
  return result;
}

function writeFloat32(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 4) {
    output.setFloat32(offset, input[i], true);
  }
}

function floatTo16BitPCM(output, offset, input) {
  for (var i = 0; i < input.length; i++, offset += 2) {
    var s = Math.max(-1, Math.min(1, input[i]));
    output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
}

function writeString(view, offset, string) {
  for (var i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

var anchor = document.createElement("a");
document.body.appendChild(anchor);
anchor.style = "display: none";
var downloadWavButton = document.getElementById("downloadWavButton");
downloadWavButton.addEventListener("click", function() {
  AudioBufferSlice(
    currentAudioBuffer,
    normalizedLeftCutterPosition * audio.duration,
    normalizedRightCutterPosition * audio.duration,
    function(error, slicedAudioBuffer) {
      var wav = audioBufferToWav(slicedAudioBuffer);
      var blob = new window.Blob([new DataView(wav)], {
        type: "audio/wav"
      });

      var url = window.URL.createObjectURL(blob);
      anchor.href = url;
      anchor.download = "audio.wav";
      anchor.click();
      window.URL.revokeObjectURL(url);
    }
  );
});

function AudioBufferSlice(buffer, begin, end, callback) {
  if (!(this instanceof AudioBufferSlice)) {
    return new AudioBufferSlice(buffer, begin, end, callback);
  }

  var error = null;

  var duration = buffer.duration;
  var channels = buffer.numberOfChannels;
  var rate = buffer.sampleRate;

  if (typeof end === "function") {
    callback = end;
    end = duration;
  }

  // milliseconds to seconds

  if (begin < 0) {
    error = new RangeError("begin time must be greater than 0");
  }

  if (end > duration) {
    error = new RangeError(
      "end time must be less than or equal to " + duration
    );
  }

  if (typeof callback !== "function") {
    error = new TypeError("callback must be a function");
  }

  var startOffset = rate * begin;
  var endOffset = rate * end;
  var frameCount = endOffset - startOffset;
  var newArrayBuffer;

  try {
    newArrayBuffer = audioContext.createBuffer(
      channels,
      endOffset - startOffset,
      rate
    );
    var anotherArray = new Float32Array(frameCount);
    var offset = 0;

    for (var channel = 0; channel < channels; channel++) {
      buffer.copyFromChannel(anotherArray, channel, startOffset);
      newArrayBuffer.copyToChannel(anotherArray, channel, offset);
    }
  } catch (e) {
    error = e;
  }

  callback(error, newArrayBuffer);
}

//RANGE SLIDER
var trs = document.querySelectorAll("table tr");
trs.forEach(tr => {
  var inputRange = tr.querySelector("input[type='range']:not(.skip)");
  var inputNumber = tr.querySelector("input[type='number']");
  if (inputNumber && inputRange) {
    inputRange.addEventListener("input", function() {
      inputNumber.value = inputRange.value;
    });
  }
});

freqFTTsizeRange = document.getElementById("freqFTTsizeRange");
freqFTTsize = document.getElementById("freqFFTsize");
//POW FFTSIZE
function powFFTsize() {
  freqFTTsize.value = Math.pow(2, +freqFTTsizeRange.value);
}
