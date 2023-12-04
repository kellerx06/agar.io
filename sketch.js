var blob;
var blobs = [];
var zoom = 1;

var flashingColors = false;

let counter = 0;
let myColor;

// Added variable to store main blob's color
let mainBlobColor;

var paused = false;

var score = 0;

function setup() {
  createCanvas(1900, 1000);
  myColor = color(random(255), random(255), random(255));
  mainBlobColor = myColor; // Set the main blob's color
  frameRate(30);
  blob = new Blob(0, 0, 64, mainBlobColor); // Pass mainBlobColor to the constructor
  for (var i = 0; i < 1000; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
}

function draw() {
  if (paused) {
    // ... (unchanged)
  } else {
    background(0);
    fill(255, 255, 255);

    // Set the main blob's color
    blob.color = mainBlobColor;

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
    // Change the color of the main blob when "c" key is pressed
    mainBlobColor = color(random(255), random(255), random(255));
    blob.color = mainBlobColor; // Update the color immediately
  }

  // Call flashColors only when "c" key is pressed
  if (flashingColors) {
    flashColors();
  }
}

// ... (unchanged)
