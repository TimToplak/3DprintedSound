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

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();

  renderer.render(scene, camera);
}

animate();

//TESTING

var group = new THREE.Group();
//group.position.y = 4;
scene.add(group);

var californiaPts = [];
californiaPts.push(new THREE.Vector2(610, 320));
californiaPts.push(new THREE.Vector2(450, 300));
californiaPts.push(new THREE.Vector2(392, 392));
californiaPts.push(new THREE.Vector2(266, 438));
californiaPts.push(new THREE.Vector2(190, 570));
californiaPts.push(new THREE.Vector2(190, 600));
californiaPts.push(new THREE.Vector2(160, 620));
californiaPts.push(new THREE.Vector2(160, 650));
californiaPts.push(new THREE.Vector2(180, 640));
californiaPts.push(new THREE.Vector2(165, 680));
californiaPts.push(new THREE.Vector2(150, 670));
californiaPts.push(new THREE.Vector2(90, 737));
californiaPts.push(new THREE.Vector2(80, 795));
californiaPts.push(new THREE.Vector2(50, 835));
californiaPts.push(new THREE.Vector2(64, 870));
californiaPts.push(new THREE.Vector2(60, 945));
californiaPts.push(new THREE.Vector2(300, 945));
californiaPts.push(new THREE.Vector2(300, 743));
californiaPts.push(new THREE.Vector2(600, 473));
californiaPts.push(new THREE.Vector2(626, 425));
californiaPts.push(new THREE.Vector2(600, 370));
californiaPts.push(new THREE.Vector2(600, 370));
californiaPts.push(new THREE.Vector2(610, 320));

for (var i = 0; i < californiaPts.length; i++)
  californiaPts[i].multiplyScalar(0.25);
var californiaShape = new THREE.Shape(californiaPts);

var extrudeSettings = {
  depth: 15,
  bevelEnabled: false
};

addShape(californiaShape, extrudeSettings, 0xff0000, 5, 5, 5, 0, 0, 0, 0.1);
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
const smoothing = 1;

svg.addEventListener("click", e => {
  const position = e.offsetX / svg.getBoundingClientRect().width;
  audio.currentTime = position * audio.duration;
});

//audio from file
document.querySelector("input").addEventListener("change", e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.readAsArrayBuffer(file);
  attachToAudio(file);

  reader.onload = e => processTrack(e.target.result);
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

      const micreader = new FileReader();
      micreader.readAsArrayBuffer(blob);
      micreader.onload = e => processTrack(e.target.result);
      attachToAudio(blob);
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
  const leftChannel = audioBuffer.getChannelData(0);
  var rightChannel;
  if (audioBuffer.numberOfChannels == 1) {
    rightChannel = audioBuffer.getChannelData(0); //TODO: temp fix if sound is mono
  } else {
    rightChannel = audioBuffer.getChannelData(1);
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
  console.log(values);
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
  requestAnimationFrame(updateAudioPosition);
}
function processTrack(buffer) {
  const source = audioContext.createBufferSource();
  console.time("decodeAudioData");
  return audioContext
    .decodeAudioData(buffer)
    .then(audioBuffer => {
      console.timeEnd("decodeAudioData");
      console.time("getWaveformData");
      const waveformData = getWaveformData(audioBuffer, width / smoothing);
      console.timeEnd("getWaveformData");
      console.time("getSVGPath");
      svg
        .querySelector("path")
        .setAttribute("d", getSVGPath(waveformData, height, smoothing));
      console.timeEnd("getSVGPath");
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      add3DWaveformFromData(waveformData);
    })
    .catch(console.error);
}

//CUTTING AUDIO
dragElement(document.getElementById("leftAudioCutter"));
dragElement(document.getElementById("rightAudioCutter"));

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
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    console.log(elmnt.offsetLeft);
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
