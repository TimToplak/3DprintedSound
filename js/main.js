var canvas = document.getElementById("canvasID");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.width, canvas.height);

var scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
var camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);

var exporter = new THREE.STLExporter();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var geometry = new THREE.PlaneGeometry(20, 20, 20);
var material = new THREE.MeshBasicMaterial({
  color: 0xfffff0,
  side: THREE.DoubleSide
});

var plane = new THREE.Mesh(geometry, material);
rotateObject(plane, 90);
plane.position.set(0, -1, 0);
scene.add(plane);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

var gridHelper = new THREE.GridHelper(400, 40, 0x0000ff, 0x808080);
gridHelper.position.y = -0.1;
gridHelper.position.x = -0.1;
scene.add(gridHelper);

controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
//controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
//controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 0;
controls.maxDistance = 500;
//controls.maxPolarAngle = Math.PI / 2;

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set(5, 5, 10);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

var group = new THREE.Group();
//group.position.y = 4;
scene.add(group);
var exportMesh;
function addShape(shape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
  // extruded shape
  var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: color,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  );
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.scale.set(s, s, s);
  group.add(mesh);
  exportMesh = group;

  var edges = new THREE.EdgesGeometry(mesh.geometry);
  var line = new THREE.LineSegments(edges);
  line.material.depthTest = false;
  line.material.opacity = 0.25;
  line.material.transparent = true;
  line.position.x = -4;
  group.add(line);
  scene.add(new THREE.BoxHelper(line));
  //scene.add(new THREE.BoxHelper(group));
  //scene.add(new THREE.BoxHelper(scene));
}

var link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);

function add3DWaveformFromData(values) {
  var points = [];
  points.push(new THREE.Vector2(0, 0));
  var step = 1;
  var stepValue = step;
  for (let i = 0; i < values.length; i++) {
    points.push(new THREE.Vector2(stepValue, values[i] * 50));
    stepValue += step;
  }
  points.push(new THREE.Vector2(stepValue + step, 0));
  stepValue -= step;
  values = values.reverse();
  for (let i = 0; i < values.length; i++) {
    points.push(new THREE.Vector2(stepValue, -values[i] * 50));
    stepValue -= step;
  }

  console.log(points);
  var extrudeSettings = {
    depth: 8,
    bevelEnabled: false
    //bevelSegments: 2,
    //steps: 2,
    //bevelSize: 1,
    //bevelThickness: 1
  };
  var pointsShape = new THREE.Shape(points);
  addShape(pointsShape, extrudeSettings, 0xff0000, 5, 5, 5, 0, 0, 0, 1);
}

var cube_geometry = new THREE.CubeGeometry(3, 3, 3);
var cube_mesh = new THREE.Mesh(cube_geometry);
//scene.add(cube_mesh);
cube_mesh.position.x = -7;
var cube_bsp = new ThreeBSP(cube_mesh);
var sphere_geometry = new THREE.CylinderGeometry(0.5, 0.5, 20, 32);
var sphere_mesh = new THREE.Mesh(sphere_geometry);
//scene.add(sphere_mesh);
sphere_mesh.position.x = -7;

var sphere_bsp = new ThreeBSP(sphere_mesh);

var subtract_bsp = cube_bsp.subtract(sphere_bsp);
var result = subtract_bsp.toMesh(
  new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 66,
    opacity: 0.3,
    transparent: true,
    side: THREE.DoubleSide
  })
);
//result.geometry.computeVertexNormals();
result.position.x = 5;
scene.add(result);

//FONT ADDING
var cube_geometry = new THREE.CubeGeometry(50, 25, 3);
var cube_mesh = new THREE.Mesh(cube_geometry);
//scene.add(cube_mesh);
cube_mesh.position.x = 0;
var cube_bsp = new ThreeBSP(cube_mesh);

var fontLoader = new THREE.FontLoader();
fontLoader.load("/font.json", function(tex) {
  var textGeo = new THREE.TextGeometry("Test", {
    size: 10,
    height: 5,
    curveSegments: 6,
    font: tex
  });

  var textMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 66,
    opacity: 0.3,
    transparent: true,
    side: THREE.DoubleSide
  });
  var text = new THREE.Mesh(textGeo, textMaterial);
  var text_bsp = new ThreeBSP(text);
  var subtract_bsp = cube_bsp.subtract(text_bsp);
  var result = subtract_bsp.toMesh(
    new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  );
  //result.geometry.computeVertexNormals();
  result.position.x = 5;
  exportMesh = result;
  scene.add(result);
  exportMesh = result;

  //scene.add(text);
});

//HELPER FUNCTION
function rotateObject(object, degreeX = 0, degreeY = 0, degreeZ = 0) {
  object.rotateX(THREE.Math.degToRad(degreeX));
  object.rotateY(THREE.Math.degToRad(degreeY));
  object.rotateZ(THREE.Math.degToRad(degreeZ));
}

//EXPORT FUNCTIONS
function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
function exportBinary() {
  var result = exporter.parse(exportMesh, { binary: true });
  saveArrayBuffer(result, "box.stl");
}

function save(blob, filename) {
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

//AUDIO ANALZY
const audio = document.createElement("audio");
const audioContext = new window.AudioContext();
const svg = document.querySelector("svg");
const progress = svg.querySelector("#progress");
const remaining = svg.querySelector("#remaining");
const width = svg.getAttribute("width");
const height = svg.getAttribute("height");
svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
const smoothing = 5;
var currentWaveFormData = null;
var currentAudioBuffer = null;

svg.addEventListener("click", e => {
  const position = e.offsetX / svg.getBoundingClientRect().width;
  audio.currentTime = position * audio.duration;
});

document.getElementById("playPauseAudio").addEventListener("click", function() {
  audio.currentTime =
    audio.duration * normalizedLeftCutterPosition * normalizedCutAudioLeft;
  audio.play();
});

//audio from file
document.querySelector("input").addEventListener("change", e => {
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
    var mediaRecorder = new MediaRecorder(stream);

    record.onclick = function() {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("recorder started");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    };

    stop.onclick = function() {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("recorder stopped");
      record.style.background = "";
      record.style.color = "";
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

function getWaveformData(audioBuffer, dataPoints) {
  var tempLeftAudioCutIndex =
    audioBuffer.getChannelData(0).length * normalizedCutAudioLeft;
  var tempRightAudioCutIndex =
    audioBuffer.getChannelData(0).length * normalizedCutAudioRight;

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
  console.log(leftChannel);
  const values = new Float32Array(dataPoints);
  const dataWindow = Math.round(leftChannel.length / dataPoints);
  for (let i = 0, y = 0, buffer = []; i < leftChannel.length; i++) {
    const summedValue =
      (Math.abs(leftChannel[i]) + Math.abs(rightChannel[i])) / 2;
    buffer.push(summedValue);
    if (buffer.length === dataWindow) {
      values[y++] = avg(buffer);
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
  audio.setAttribute("autoplay", true);
  audio.src = URL.createObjectURL(file);
  updateAudioPosition();
}
function updateAudioPosition() {
  const { currentTime, duration } = audio;
  const physicalPosition = (currentTime / duration) * width;
  if (physicalPosition) {
    progress.setAttribute("width", physicalPosition);
    remaining.setAttribute("x", physicalPosition);
    remaining.setAttribute("width", width - physicalPosition);
  }
  //loop audio playing between cutters
  if (audio.currentTime > audio.duration * normalizedRightCutterPosition) {
    audio.currentTime = audio.duration * normalizedLeftCutterPosition;
  }
  requestAnimationFrame(updateAudioPosition);
}
function processTrack(buffer) {
  const source = audioContext.createBufferSource();
  return audioContext
    .decodeAudioData(buffer)
    .then(audioBuffer => {
      currentAudioBuffer = audioBuffer;
      currentWaveFormData = getWaveformData(audioBuffer, width / smoothing);
      svg
        .querySelector("path")
        .setAttribute("d", getSVGPath(currentWaveFormData, height, smoothing));
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
    })
    .catch(console.error);
}

function proccesBlob(blob) {
  const reader = new FileReader();
  currentBlob = blob;
  console.log(blob);
  reader.readAsArrayBuffer(blob);
  reader.onload = e => processTrack(e.target.result);
  attachToAudio(blob);
}

//CUTTING AUDIO
var normalizedLeftCutterPosition = 0;
var normalizedRightCutterPosition = 1;

var normalizedCutAudioLeft = 0;
var normalizedCutAudioRight = 1;

initCutting();
function initCutting() {
  var leftAudioCutter = document.getElementById("leftAudioCutter");
  var rightAudioCutter = document.getElementById("rightAudioCutter");
  var audioCuttingWindow = document.getElementById("audioCuttingWindow");
  var cutWindow = document.getElementById("cutWindow");
  cutWindow.style.width = audioCuttingWindow.offsetWidth - 39 + "px"; //TODO: fix small gap
  var cutWindowStartWidth = audioCuttingWindow.offsetWidth - 40;
  console.log(audioCuttingWindow.offsetWidth);

  var SVG2DWaveform = document.getElementById("SVG2DWaveform");
  console.log(SVG2DWaveform.style.width);

  //recalculate values of audio buffer
  var cutAudioButton = document.getElementById("cutAudioButton");
  cutAudioButton.addEventListener("click", function() {
    normalizedCutAudioLeft = normalizedLeftCutterPosition;
    normalizedCutAudioRight = normalizedRightCutterPosition;

    currentWaveFormData = getWaveformData(
      currentAudioBuffer,
      width / smoothing
    );
    svg
      .querySelector("path")
      .setAttribute("d", getSVGPath(currentWaveFormData, height, smoothing));
  });

  var vizualizeCutWindow = document.getElementById("vizualizeCutWindow");
  vizualizeCutWindow.addEventListener("click", function() {
    add3DWaveformFromData(
      currentWaveFormData.slice(
        currentWaveFormData.length * normalizedLeftCutterPosition,
        currentWaveFormData.length * normalizedRightCutterPosition
      )
    );
  });

  dragElement(leftAudioCutter);
  dragElement(rightAudioCutter);

  function dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      if (elmnt.offsetLeft - pos1 < 0) {
        elmnt.style.left = "0px";
      } else {
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      }

      if (elmnt.id == "leftAudioCutter") {
        if (elmnt.offsetLeft + 22 >= rightAudioCutter.offsetLeft) {
          //preventing crossing
          elmnt.style.left = rightAudioCutter.offsetLeft - 22 + "px";
        }
        //resize cut window to fit between cutters
        cutWindow.style.left = elmnt.offsetLeft + 22 + "px";
        cutWindow.style.width =
          cutWindowStartWidth -
          elmnt.offsetLeft -
          (cutWindowStartWidth - rightAudioCutter.offsetLeft) -
          18 +
          "px";
        normalizedLeftCutterPosition =
          leftAudioCutter.offsetLeft / audioCuttingWindow.offsetWidth;
      }

      if (elmnt.id == "rightAudioCutter") {
        if (elmnt.offsetLeft - 22 <= leftAudioCutter.offsetLeft) {
          elmnt.style.left = leftAudioCutter.offsetLeft + 22 + "px";
        }

        if (elmnt.offsetLeft >= audioCuttingWindow.offsetWidth - 22) {
          // preventing right cutter leaving screen
          elmnt.style.left = audioCuttingWindow.offsetWidth - 22 + "px";
        }
        //resize cut window to fit between cutters
        cutWindow.style.width =
          cutWindowStartWidth -
          (cutWindowStartWidth - elmnt.offsetLeft) -
          leftAudioCutter.offsetLeft -
          18 +
          "px";
        normalizedRightCutterPosition =
          (rightAudioCutter.offsetLeft + 22) / audioCuttingWindow.offsetWidth;
      }

      console.log("Left: " + normalizedLeftCutterPosition);
      console.log("Right: " + normalizedRightCutterPosition);
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}
