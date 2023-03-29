var blobs = [];
var foods = [];

function Blob(id, x, y, r) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.r = r;
}

function Food(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

//create server
const http = require('http');
const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('port', '3001');

const server = http.createServer(app);
server.on('listening', () => {
    console.log('listening on port 3001');
});

//connect socket to server
const io = require('socket.io')(server);

//heartbeat event function
setInterval(heartbeat, 33);
function heartbeat() {
    io.sockets.emit('heartbeat', blobs); //sends blobs list every 33 ms in 'heartbeat' event
}

setInterval(fHeartbeat, 33);
function fHeartbeat() {
    io.sockets.emit('fHeartbeat', foods);
}

//built in 'connection' event --when a client connects to a socket
io.sockets.on('connection', (socket) => {
    console.log('Client connected: ' + socket.id);

    //start event -- when received, a new blob is created (using vars from 'data') and added to blobs list
    socket.on('start', (data) => {
        var blob = new Blob(socket.id, data.x, data.y, data.r);
        blobs.push(blob);
    });

    //fStart event
    socket.on('fStart', (fData) => {
        for (var i=0; i<100; i++) {
            var x = Math.random(-600, 600); //random locaiton along x axis
            var y = Math.random(-600, 600); //random location along y axis
            foods[i] = new Blob(fData.x, fData.y, 10); //make 100 food blobs, located randomly, with a radius of 16
        }
    })

    //update event -- when received, check for match of socket.id to blob.id, then update blob's x, y, and radius
    socket.on('update', (data) => {
        var blob;
        for (var i=0; i<blobs.length; i++) {
            if (socket.id == blobs[i].id) {
                blob = blobs[i];
            }
        }
        blob.x = data.x;
        blob.y = data.y;
        blob.r = data.r;
    });

    socket.on('fUpdate', (fData) => {
        var food;
        for (var i=0; i<foods.length; i++) {
            food = foods[i];
            food.x = fData.x;
            food.y = fData.y;
        };
    });

    //mouse event -- when received, send mouse data
    socket.on('mouse', mouseMessage);
    function mouseMessage(data) {
        socket.broadcast.emit('mouse', data);
    }
    socket.on('disconnect', () => console.log('Client has disconnected')) //log when client disconnects
})

server.listen('3001');
