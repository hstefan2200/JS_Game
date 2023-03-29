class Blob extends BaseObject {
  constructor(x, y, r) {
    super(x, y, r);
    this.ammo = 1;
    // this.bullets = [];

    this.eats = function(other) {
      var d = p5.Vector.dist(this.pos, other.pos); //distance formula
      if (d < this.r + other.r) { //if distance between two blobs is less than sum of each radius
        var sum = PI * this.r * this.r + PI * other.r * other.r; //add area of two circles
        this.r = sqrt(sum / PI); //set new radius to fraction of sum
        this.ammo = this.ammo + 1;
        // this.bullets.push(this.ammo);
        console.log(this.ammo);
        return true;
      } else {
        return false;
      }
    };

    this.ammoCount = function() {
      stroke(192, 207, 205)
      fill(247, 242, 243);
      textSize(64);
      text("Ammo: " + blob.ammo, blob.pos.x + 50, blob.pos.y + 350, 350, 100);
    };

    this.ammoCheck = function() {
      if (this.ammo > 0) {
        return true;
      } else {
        return false;
      }
    }

    this.hitScan = function() {
      for (var i = 0; i< blobs.length; i++) {
        var collideOrNot = collideCircleCircle(400, 400, 64, blobs[i].x, blobs[i].y, blobs[i].r)
        if (collideOrNot) {
          return true;
        }
      }
      return false;
    }
  }
}