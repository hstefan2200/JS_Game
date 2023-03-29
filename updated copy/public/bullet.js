class Bullet extends BaseObject {
    constructor(x, y, r, xSpeed, ySpeed) {
        super(x, y, r);
        this.xSpeed = 12 * xSpeed;
        this.ySpeed = 12 * ySpeed;

        this.display = function() {
            push();
            stroke(245, 174, 81);
            fill(245, 174, 81);
            ellipse(this.pos.x, this.pos.y, this.r, this.r * 2);
            pop();
        }

        this.update = function() {
            this.pos.x += this.xSpeed;
            this.pos.y += this.ySpeed;
            this.xSpeed *= 0.999;
            this.ySpeed *= 0.999;
        }
        this.hitScan = function() {
            for (var i = 0; i < blobs.length; i++) {
                var collideOrNot = collideCircleCircle(this.x, this.y, 5, blobs[i].x, blobs[i].y, blobs[i].r)
                if (collideOrNot) {
                    blobs.splice(i, 1);
                    blob.score+=1;
                    return true;
                }
            }
            return false;
        }
    };

}