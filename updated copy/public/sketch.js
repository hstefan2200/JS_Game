var blob;
var blobs = [];
var zoom = 1;
var socket;
var food;
var foods = [];
var bulletsFired = [];
// let turPosX;
// let turPosY;

var mode;

//runs once at beginning
function setup() {
	socket = io.connect('http://localhost:3001'); //connect to socket
	createCanvas(800, 800); //background / drawing board
	blob = new Blob(0, 0, 64, 36, 200, 237); 
	
	var data = {
		x: blob.pos.x,
		y: blob.pos.y,
		r: blob.r
	};
	socket.emit('start', data); //send data dict to server 
	socket.on('heartbeat', data => {
		blobs = data; //on 'heartbeat' event sent from server, update blobs dictionary with data
	});
	
	//food 
	for (var i=0; i<100; i++) {
		var x = random(-width, width); //random locaiton along x axis
		var y = random(-height, height); //random location along y axis
		foods[i] = new Food(x, y, 10); //make 100 food blobs, located randomly, with a radius of 16
	}

	socket.on('mouse', data => {
		noStroke();
	});


	mode = 0;
}

//runs repeatedly in a loop
function draw() {
	clear();
	if (mode == 0) {
		background(237, 214, 149);
		textAlign(CENTER);
		textSize(26);
		fill(33, 4, 102);
		text(`Press Enter-key to start.
		\nPress Shift-key to see instructions.
		\nPress Escape-key to return to this menu.`, 150, 200, 500, 700);

	}
	if (mode == 1) {
		background(0); //background color = black
		translate(width/2, height/2); //center view
		var newZoom = 64 / blob.r; //as blob grows, view will zoom out
		zoom = lerp(zoom, newZoom, 0.1);
		scale(zoom); //set zoom level
		translate(-blob.pos.x, -blob.pos.y); //follow blob --keeping it centered

		for (var i = foods.length-1; i >=0; i--) {
			foods[i].show(140, 80, 85); //make food visible
			if (blob.eats(foods[i])) {
				foods.splice(i, 1); //if blob 'eats' food, remove it from list of food
			};
		};

		for (var i = blobs.length-1; i>=0; i--) {
			var id = blobs[i].id;
			if (id.substring(2, id.length) !== socket.id) { //check if blob IDs match
				fill(115, 9, 14);
				ellipse(blobs[i].x, blobs[i].y, blobs[i].r*2, blobs[i].r*2); //draw ellipse with blob's variables

				fill(0);
				textAlign(CENTER);
				textSize(16);
				text(blobs[i].id, blobs[i].x, blobs[i].y, 64, 64);
			};
			// if (blobs[i].hitScan()) {
			// 	mode = 0;
			// }
		}
		blob.ammoCount();
		blob.show(36, 200, 237); //make visible
		blob.update(); //update --move
		blob.constrain(); //constrain movement
		var data = {
			x: blob.pos.x,
			y: blob.pos.y,
			r: blob.r
		};
		socket.emit('update', data); //send data in 'update' event to server

		for (var i=0; i < bulletsFired.length; i++) {
			bulletsFired[i].display();
			bulletsFired[i].update();

			if (bulletsFired[i].hitScan()) {
				bulletsFired.splice(i, 1);
			}

		}


	}
	if (mode == 2) {
		background(237, 214, 149);
		textAlign(CENTER);
		textSize(26);
		fill(33, 4, 102);
		text(`To move, simply move your mouse and your blob will follow.
		\nCollect ammunition by eating the food scattered around the map.
		\nLeft-click your mouse button to shoot.
		\nPress Esc to return, or enter to play.`, 150, 200, 500, 700);
	}
}

function getMouseVector() {
	let mouseXalt = mouseX - 400;
	let mouseYalt = mouseY - 400;
	let mouseDir = createVector(mouseXalt, mouseYalt);
	mouseDir.normalize();
	return mouseDir;
}

function mousePressed() {
	mousePressedX = mouseX;
	mousePressdY = mouseY;
	let mouseVector = getMouseVector();
	if (blob.ammoCheck()) {
		oneBullet = new Bullet(blob.pos.x, blob.pos.y, 5, mouseVector.x, mouseVector.y);
		bulletsFired.push(oneBullet);
		blob.ammo -= 1;
	}
}

function keyPressed() {
	if (keyCode === ENTER) {
		mode = 1;
	}
	if (keyCode === ESCAPE) {
		mode = 0;
	}
	if (keyCode === SHIFT) {
		mode = 2;
	}
}


