let {
    subscribeToBrowserStart,
    subscribeToBrowserComplete,
    subscribeToBrowserRegister,
    subscribeToRunComplete,
    subscribeToRunStart
} = require('./src/karma-events');

let { startKarma } = require('./src/karma-runner');


const express = require('express');
const app = express();


const socketIO = require('socket.io');
var httpServer = require('http').createServer(app);
const io = socketIO(httpServer);
let startAttempted = false;
let karmaStartSuccessful = false;
let server;

io.on('connection', function (socket) {
    socket.emit('hello', 'Welcome to Destiny, starting Karma for you...');

    if (!startAttempted) {
        startAttempted = true;
        let result = startKarma();
        karmaStartSuccessful = result.karmaStarted;
        server = result.server;
    }

    if (karmaStartSuccessful) {

        subscribeToBrowserRegister(server, socket);
        subscribeToBrowserStart(server, socket);
        subscribeToBrowserComplete(server, socket);
        subscribeToRunStart(server, socket);
        subscribeToRunComplete(server, socket);
    } else {
        socket.emit('bye_bye', 'Failed to start karma');
    }
});

httpServer.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
});