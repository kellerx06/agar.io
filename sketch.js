// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

var blob;

var blobs = [];
var zoom = 1;

var paused = false;

function setup() {
  createCanvas(1900, 1000);
  blob = new Blob(0, 0, 64);
  fill(r, g, b, a)
  for (var i = 0; i < 1000; i++) {
    var x = random(-width, width);
    var y = random(-height, height);
    blobs[i] = new Blob(x, y, 16);
  }
r = random(255);
g = random(100, 200);
b = random(100);
a = random(200, 255);
}

function draw() {
  if (paused) {
    textSize(100) 
    fill(255, 0, 0);
    textAlign(CENTER, CENTER)
    const middleX = width/2;
    const middleY = height/2;
    text('PAUSED', middleX, middleY);
    console.log('PAUSED');
  } else {
    background(0);
    fill(255, 255, 255)
    translate(width / 2, height / 2);
    var newzoom = 64 / blob.r;
    zoom = lerp(zoom, newzoom, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    for (var i = blobs.length - 1; i >= 0; i--) {
      blobs[i].show();
      if (blob.eats(blobs[i])) {
        blobs.splice(i, 1);
    }
    }
    blob.show();
    blob.update();
 }
}

  function keyPressed() {
    if(key === 'p') {
      paused = !paused;
      }
    }