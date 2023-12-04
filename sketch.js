// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

var blob;
var blobs = [];
var zoom = 1;

var flashingColors = false;

let counter = 0;
let myColor;

var paused = false;

var score = 0;

// New variable for controlling speed
var speedMultiplier = 1;

function setup() {
  createCanvas(1900, 1000);
  myColor = color(random(255), random(255), random(255));
  frameRate(30);
  blob = new Blob(0, 0, 64);
  fill(myColor);
  for (var i = 0; i < 1000; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
  if (counter > 19) {
    myColor = color(random(255), random(255), random(255));
    counter = 0;
  }
  counter = counter + 1;
}

function draw() {
  // Adjust frame rate based on speedMultiplier
  frameRate(30 * speedMultiplier);
  
  if (paused) {
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
  } else {
    background(0);
    fill(255, 255, 255);
    translate(width / 2, height / 2);
    var newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
      blobs[i].show();
      if (blob.eats(blobs[i])) {
        blobs.splice(i, 1);
        score++;
      }
    }

    blob.show();
    blob.update();

    resetMatrix();
    textSize(32);
    fill(255);
    text("Score: " + score, 50, 50);
  }
}

function keyPressed() {
  if (key === "p") {
    paused = !paused;
  } else if (key === "c") {
    flashingColors = !flashingColors;
  } else if (key === " ") {
    // Spacebar pressed, increase speed
    speedMultiplier = 2; // You can adjust this multiplier as needed
  }

  // Call flashColors only when "c" key is pressed
  if (flashingColors) {
    flashColors();
  }
}

function keyReleased() {
  if (key === " ") {
    // Spacebar released, reset speed to normal
    speedMultiplier = 1;
  }
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
  // Check if the mouse is within the boundaries of the reset button
  if (mouseX > 840 && mouseX < 1040 && mouseY > 700 && mouseY < 775) {
    // Reset the game
    paused = false; // Unpause the game
    resetGame();
  }
}

function flashColors() {
  for (var i = 0; i < blobs.length; i++) {
    blobs[i].flash();
  }
}
