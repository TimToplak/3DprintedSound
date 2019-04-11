var canvas = document.getElementById("canvasID");
var renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(canvas.width, canvas.height);

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

var geometry = new THREE.PlaneGeometry(1400, 1400, 1400);
var material = new THREE.MeshBasicMaterial({
  color: 0xfffff0,
  side: THREE.DoubleSide
});

var plane = new THREE.Mesh(geometry, material);
rotateObject(plane, 90);
plane.position.set(0, -100, 0);
scene.add(plane);

var axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

var light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 1, 1).normalize();
scene.add(light);

var gridHelper = new THREE.GridHelper(4000, 80, 0x0000ff, 0x808080);
gridHelper.position.y = -10;
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
camera.position.set(-25, 25, 20);
controls.update();

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

var link = document.createElement("a");
link.style.display = "none";
document.body.appendChild(link);

async function add3DWaveformFromData(values) {
  var step = Number(document.getElementById("step").value);
  var offset = Number(document.getElementById("offset").value);
  var heightScale = Number(document.getElementById("heightScale").value);

  var waveFormType = document
    .getElementsByClassName("tab-active")[0]
    .getAttribute("value");

  var waveFormMesh;
  if (waveFormType == "flat") {
    waveFormMesh = await addFlat3DWaveForm(
      values,
      step,
      0xff0000,
      heightScale,
      offset
    );
  } else {
    waveFormMesh = await addCircle3DWaveForm(
      values,
      1,
      0xff0000,
      heightScale,
      offset
    );
  }

  console.log(waveFormMesh);

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

    var TextWaveFormMesh = await addTextWrapper(
      waveFormMesh,
      text,
      textDepth,
      textSize,
      type,
      textX,
      textY,
      textZ,
      0,
      0,
      0,
      1
    );
    console.log(TextWaveFormMesh);
    scene.add(TextWaveFormMesh);
  }

  if (document.getElementById("addStand").checked) {
    waveFormMesh = await loadStand(waveFormMesh);
  }
  scene.add(waveFormMesh);
  //
}

async function loadStand(waveMesh) {
  /*
  var loader = new THREE.STLLoader();
  loader.load("../stand.stl", function(geometry) {
    var mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshPhongMaterial({
        color: 0xff0000,
        shininess: 66,
        opacity: 0.3,
        transparent: true,
        side: THREE.DoubleSide
      })
    );

   

    var group = new THREE.Group();
    group.add(cylinder);
    group.add(mesh);

    mesh.add(cylinder);
    

    scene.add(group);
  });
  */

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
  var result = subtract_bsp.toMesh(
    new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  );

  return result;
}

async function addCircle3DWaveForm(values, step, color, heightScale, offset) {
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

  var mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  );

  //mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationY(180));
  mesh.geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(4.71238898));

  return mesh;
}

async function addFlat3DWaveForm(values, step, color, heightScale, offset) {
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

  console.log(typeof heightScale);
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

  var mesh = new THREE.Mesh(
    test,
    new THREE.MeshPhongMaterial({
      color: color,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    })
  );

  return mesh;
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

async function addTextWrapper(mesh, textLocal, depth, textSize, type, x, y, z) {
  return await addText(mesh, textLocal, depth, textSize, type, x, y, z);
}

async function addText(
  mesh,
  textLocal,
  depth,
  textSize,
  type,
  x,
  y,
  z,
  rx,
  ry,
  rz,
  s
) {
  var fontLoader = new THREE.FontLoader();
  var font = await fontLoader.load("/font2.json", function(tex) {
    var mesh_bsp = new ThreeBSP(mesh);
    var textGeo = new THREE.TextGeometry(textLocal, {
      size: textSize,
      height: depth,
      curveSegments: 6,
      font: tex //new THREE.Font(g_font)
    });

    var textMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      shininess: 66,
      opacity: 0.3,
      transparent: true,
      side: THREE.DoubleSide
    });
    var text = new THREE.Mesh(textGeo, textMaterial);
    text.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(x, y, z));

    var text_bsp = new ThreeBSP(text);
    if (type == "subtract") {
      var subtract_bsp = mesh_bsp.subtract(text_bsp);
    } else {
      var subtract_bsp = mesh_bsp.union(text_bsp);
    }
    result = subtract_bsp.toMesh(
      new THREE.MeshPhongMaterial({
        color: 0xff0000,
        shininess: 66,
        opacity: 0.3,
        transparent: true,
        side: THREE.DoubleSide
      })
    );
    result.geometry.computeVertexNormals();

    return result;

    //scene.add(text);
  });
  console.log(font);
}

var g_font = "/font2.json";
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

function updateMesh(newMesh) {
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
function saveArrayBuffer(buffer, filename) {
  save(new Blob([buffer], { type: "application/octet-stream" }), filename);
}
function exportBinary() {
  var result = exporter.parse(currentWaveFormMesh, { binary: true });
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
const smoothing = 4;
var currentWaveFormData = null;
var currentAudioBuffer = null;
var startAudioTime;
var endAudioTime;
var audioDuration;

svg.addEventListener("click", e => {
  const position = e.offsetX / svg.getBoundingClientRect().width;
  audio.currentTime = position * audio.duration;
});

document.getElementById("playPauseAudio").addEventListener("click", function() {
  audio.currentTime =
    startAudioTime + audioDuration * normalizedLeftCutterPosition;
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
    audioBuffer.getChannelData(0).length * normalizedLeftCutterPosition;
  var tempRightAudioCutIndex =
    audioBuffer.getChannelData(0).length * normalizedRightCutterPosition;

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
audio.addEventListener("loadeddata", function() {
  startAudioTime = 0;
  endAudioTime = audio.duration;
  audioDuration = audio.duration;
});
function updateAudioPosition() {
  const { currentTime, duration } = audio;
  const physicalPosition = (currentTime / audioDuration) * width;
  if (physicalPosition) {
    progress.setAttribute("width", physicalPosition);
    remaining.setAttribute("x", physicalPosition);
    remaining.setAttribute("width", width - physicalPosition);
  }
  //loop audio playing between cutters
  if (audio.currentTime > endAudioTime) {
    audio.currentTime = startAudioTime;
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
    startAudioTime = audioDuration * normalizedLeftCutterPosition;
    endAudioTime = audioDuration * normalizedRightCutterPosition;
    audioDuration = endAudioTime - startAudioTime;

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
        startAudioTime = audioDuration * normalizedLeftCutterPosition;
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
        endAudioTime = audioDuration * normalizedRightCutterPosition;
        console.log(endAudioTime);
        console.log(audio.currentTime);
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

//TABS
// Show the first tab by default
$(".tabs-stage div").hide();
$(".tabs-stage div:first").show();
$(".tabs-nav li:first").addClass("tab-active");

// Change tab class and display content
$(".tabs-nav a").on("click", function(event) {
  event.preventDefault();
  $(".tabs-nav li").removeClass("tab-active");
  $(this)
    .parent()
    .addClass("tab-active");
  $(".tabs-stage div").hide();
  $($(this).attr("href")).show();
});
