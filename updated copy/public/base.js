class BaseObject {
    constructor(x, y, r) {
        this.pos = createVector(x, y);  //position
        this.r = r;                     //radius
        this.vel = createVector(0, 0);  //velocity
    }

    show(cr, cg, cb) {
        push();
        stroke(cr, cg, cb);
        fill(cr, cg, cb);
        ellipse(this.pos.x, this.pos.y, this.r *2, this.r*2);
        pop();
    }

    update(v=3) {
        var newvel = createVector(mouseX - width/2, mouseY - height/2);
        newvel.setMag(v);
        this.vel.lerp(newvel, 0.1);
        this.pos.add(this.vel);
    }

    // bUpdate(x, y) {
    //     var newV = createVector(x, y);
    //     this.pos.add(newV);
    // }

    constrain() {
        this.pos.x = constrain(blob.pos.x, -width, width);
        this.pos.y = constrain(blob.pos.y, -height, height);
    }
}