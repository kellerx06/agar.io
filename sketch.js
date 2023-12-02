// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

var blob;
var blobs = [];
var zoom = 1;

var flashingColors = false;

var paused = false;

var score = 0;

function setup() {
  createCanvas(1900, 1000);
  frameRate(30);
  blob = new Blob(0, 0, 64);
  for (var i = 0; i < 1000; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {
  if (paused) {
    displayPausedScreen();
  } else {
    background(0);
    updateBlob();
    drawBlobs();
    drawScore();
  }

  if (flashingColors) {
    flashColors();
  }
}

function updateBlob() {
  fill(255, 255, 255);
  translate(width / 2, height / 2);
  var newzoom = 64 / blob.r;
  zoom = lerp(zoom, newzoom, 0.1);
  scale(zoom);
  translate(-blob.pos.x, -blob.pos.y);
  blob.show();
  blob.update();
  resetMatrix();
}

function drawBlobs() {
  for (var i = blobs.length - 1; i >= 0; i--) {
    blobs[i].show();
    if (blob.eats(blobs[i])) {
      blobs.splice(i, 1);
      score++;
    }
  }
}

function drawScore() {
  textSize(32);
  fill(255);
  text("Score: " + score, 50, 50);
}

function keyPressed() {
  if (key === "p") {
    paused = !paused;
  } else if (key === "c") {
    flashingColors = !flashingColors;
  }
}

function flashColors() {
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].flash();
  }
}

if (!Blob.prototype.flash) {
  Blob.prototype.flash = function () {
    this.color = color(random(255), random(255), random(255));
  };
}

function displayPausedScreen() {
  textSize(100);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  const middleX = width / 2;
  const middleY = height / 2;
  text("PAUSED", middleX, middleY);
  console.log("PAUSED");

  fill(255);
  rect(840, 700, 200, 75);
  fill(0);
  textSize(50);
  text("RESET", 940, 745);
  pop();
}

function resetGame() {
  blob = new Blob(0, 0, 64);
  blobs = [];
  score = 0;
  for (var i = 0; i < 1000; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function mousePressed() {
  if (mouseX > 840 && mouseX < 1040 && mouseY > 700 && mouseY < 775) {
    paused = false;
    resetGame();
  }
}