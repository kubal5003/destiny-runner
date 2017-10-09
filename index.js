let { startKarma } = require('./src/karma-runner');
const opn = require('opn');

const express = require('express');
const app = express();
app.use(express.static('./node_modules/destiny-runner-app/dist'));

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
        let subscriptions = ['browser_start', 'browser_register', 'browser_complete', 'browser_error',
            'run_start', 'run_complete', 'browsers_change', 'browsers_ready', 'browser_restart_failure',
            'browser_log', 'browser_complete_with_no_more_retries', 'browser_process_failure',
            'spec_complete'];

        subscriptions.forEach(subscribe);


        socket.on('execute', () => {
            server.start();
        });

        socket.on('refresh', () => {
            server.refreshFiles();
        })
        socket.on('replay', () => {

        });
    } else {
        socket.emit('bye_bye', 'Failed to start karma');
    }
});

httpServer.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
    opn('http://localhost:3000');
});