const express = require('express');
const app = express();
let karmaMode = true;
let server = undefined;
try {
    const karma = require('karma');
    const Server = karma.Server;
    const karmaConfig = karma.config;
    const path = require('path');
    const configuration = karmaConfig.parseConfig(path.resolve('./karma.conf.js'), { port: 1337 });

    server = new Server(configuration, function (exitCode) {
        console.log('Karma has exited with ' + exitCode);
        process.exit(exitCode);
    });

    server.start();


    app.use(express.static('./node_modules/destiny-runner/src/public'));
}
catch (err) {
    karmaMode = false;
    console.log('Running without Karma');
    app.use(express.static('src/public'));
}

const socketIO = require('socket.io');
var httpServer = require('http').createServer(app);
const io = socketIO(httpServer);

let subscribe = function (ev, description, socket) {
    if (!server && karmaMode) {
        console.log('Something went wrong because we are running in Karma mode and there is no server to attach');
    }
    server && server.on(ev, function (p1, p2) {
        socket.emit('karma_update', description);
        socket.emit('parameter', p1);
        socket.emit('parameter', p2);
    });
};

io.on('connection', function (socket) {
    socket.emit('karma_update', 'Welcome to Destiny');
    if (karmaMode) {
        subscribe('browser_start', 'Browser starts', socket);
        subscribe('browser_register', 'Browser is registered', socket);
        subscribe('browser_complete', 'Browser completed run', socket);
        subscribe('run_start', 'Test run starts', socket);
        subscribe('run_complete', 'Test run finished', socket);
    }
});

httpServer.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
});