let previousMousePosition = {
  x: 0,
  y: 0
};
let rotationX = 0;
let rotationY = 0;
let rotationZ = 0;
let currentPositionX = 0;
let currentPositionY = 0;
let currentPositionZ = 0;
let positionUpdateInterval = 2000; // 2 seconds
let lastPositionUpdateTime = 0;
let lastRotationUpdateTime = 0;
let isDragging = false;
let targetRotationX = 0;
let targetRotationY = 0;
let targetRotationZ = 0;
let rotationChangeFraction = 0.05;

function setup() {
  createCanvas(600, 550, WEBGL);
  updateCubeRotation();
}

function draw() {
  background(21, 96, 100, 150);

  push();
  translate(currentPositionX, currentPositionY, currentPositionZ);
  rotateX(rotationX);
  rotateY(rotationY);
  rotateZ(rotationZ);
  noFill();
  strokeWeight(4);
  box(100);
  pop();

  // Display text on the cube
  push();
  translate(currentPositionX, currentPositionY, currentPositionZ);
  rotateX(rotationX);
  rotateY(rotationY);
  rotateZ(rotationZ);
  textSize(16);
  textAlign(CENTER, CENTER);
  fill(255);
  text("glad i am turning 14", 0, 0);
  pop();

  // Update the cube's rotation every 2 seconds
  if (millis() - lastRotationUpdateTime >= positionUpdateInterval && !isDragging) {
    updateCubeRotation();
    lastRotationUpdateTime = millis();
  }

  // Update cube position if dragging
  if (isDragging) {
    currentPositionX += (mouseX - previousMousePosition.x) * 0.01;
    currentPositionY += (mouseY - previousMousePosition.y) * 0.01;
    previousMousePosition = {
      x: mouseX,
      y: mouseY
    };
  } else {
    // Smoothly transition to the target rotation
    rotationX += (targetRotationX - rotationX) * rotationChangeFraction;
    rotationY += (targetRotationY - rotationY) * rotationChangeFraction;
    rotationZ += (targetRotationZ - rotationZ) * rotationChangeFraction;
  }
}

function mousePressed() {
  isDragging = true;
  previousMousePosition = {
    x: mouseX,
    y: mouseY
  };
}

function mouseReleased() {
  isDragging = false;
}

function updateCubeRotation() {
  // Set new target rotation
  targetRotationX = random(-PI, PI);
  targetRotationY = random(-PI, PI);
  targetRotationZ = random(-PI, PI);
}
