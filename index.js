let { startKarma } = require('./src/karma-runner');


const express = require('express');
const app = express();


const socketIO = require('socket.io');
var httpServer = require('http').createServer(app);
const io = socketIO(httpServer);
let startAttempted = false;
let karmaStartSuccessful = false;
let server;

io.on('connection', (socket) => {
    socket.emit('hello', 'Welcome to Destiny, starting Karma for you...');

    if (!startAttempted) {
        startAttempted = true;
        let result = startKarma();
        karmaStartSuccessful = result.karmaStarted;
        server = result.server;
    }
    let subscribe = (e) => {

        server && server.on(e, (...args) => {
            socket.emit(e, ...args);
        });
    }
    if (karmaStartSuccessful) {
        subscribe('browser_start');
        subscribe('browser_register');
        subscribe('browser_complete');
        subscribe('browser_error');
        subscribe('run_start');
        subscribe('run_complete');
        subscribe('browsers_change');
        subscribe('browsers_ready');

        socket.on('execute', () => {
            server.start();
        });

        socket.on('refresh', () => {
            server.refreshFiles();
        })
    } else {
        socket.emit('bye_bye', 'Failed to start karma');
    }
});

httpServer.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
});