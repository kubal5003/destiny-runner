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

io.on('connection', function (socket) {
    socket.emit('hello', 'Welcome to Destiny, starting Karma for you...');

    let { karmaMode, server } = startKarma();

    if (karmaMode) {

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