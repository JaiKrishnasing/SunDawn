// INITIALS

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
const canvasHeight = 500;
const canvasWidth = 500;
const backgroundColors = ["#3cc9c9", "#0d0d0d"];
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// USER INPUT

let userCode = "";

function runCode() {
  const inputCode = document.getElementById("singleExecutionTextArea");
  const executeButton = document.getElementById("singleExecutionButton");
  executeButton.addEventListener("click", () => {
    try {
      eval(inputCode.value);
    } catch (err) {
      console.error("Error while executing code: " + err);
    }
  });
}

function runUpdateCode() {
  const inputCode = document.getElementById("updateLoopExecutionTextarea");
  const loopExecuteButton = document.getElementById(
    "updateLoopExecutionButton"
  );
  try {
    loopExecuteButton.addEventListener("click", () => {
      userCode = inputCode.value;
    });
    eval(userCode);
  } catch (err) {
    console.error("Error while executing code: " + err);
  }
}

// DRAW GROUND

const groundWidth = canvasWidth;
const groundHeight = 100;
const groundY = canvasHeight - groundHeight;
const groundColor = "#00ab2e";

function drawGround(width, height, posY, color) {
  c.fillStyle = color;
  c.fillRect(0, posY, width, height);
}

// DRAW CIRCLE

function tekenCirkel(r, x, y, circleColor) {
  c.beginPath();
  c.arc(x, y, r, 0, Math.PI * 2);
  c.fillStyle = circleColor;
  c.fill();
}

// DRAW LINES

function tekenLijn(x1, y1, x2, y2, width, color) {
  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.lineWidth = width;
  c.strokeStyle = color;
  c.stroke();
}

// VARIABLES
let currentIndex = 0;
let cirkelY = 100;
let cirkelSnelheid = 0.5;

// LOOP

let lastTime, time;

function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }

  c.clearRect(0, 0, canvas.width, canvas.height);

  lastTime = time;

  runUpdateCode();

  drawGround(groundWidth, groundHeight, groundY, groundColor);

  window.requestAnimationFrame(update);
}

update(time);

runCode();
runUpdateCode();
