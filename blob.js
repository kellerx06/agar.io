// Daniel Shiffman
// http://codingtra.in/
// http://patreon.com/codingtrain
// Code for: https://youtu.be/JXuxYMGe4KI

function Blob(x, y, r) {
  this.pos = createVector(x, y);
  this.r = r;
  this.vel = createVector(0, 0);
  this.col = color(random(255), random(255), random(255));

  this.update = function () {
    var newvel = createVector(mouseX - width / 2, mouseY - height / 2);
    newvel.setMag(3);
    this.vel.lerp(newvel, 0.2);
    this.pos.add(this.vel);
  };

  this.eats = function (other) {
    var d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r) {
      var sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI);
      //this.r += other.r;
      return true;
    } else {
      return false;
    }
  };

  this.show = function () {
    //fill(0, 255, 0);
    fill(this.col);
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2);
  };
}

Blob.prototype.flash = function () {
  this.color = color(random(255), random(255), random(255));
};
