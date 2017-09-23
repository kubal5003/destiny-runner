try {
    var karma = require('karma');
}
catch (err) {
    var prequire = require('parent-require')
        , karma = prequire('karma');
}


const Server = karma.Server;
const karmaConfig = karma.config;
const path = require('path');

const configuration = karmaConfig.parseConfig(path.resolve('./karma.conf.js'), { port: 1337 });


const server = new Server(configuration, function (exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
});


let subscribe = function (event, description, socket) {
    server.on(event, function () {
        socket.broadcast.emit('karma_update', description);
    });
};

server.start();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('./node_modules/destiny-runner/src/public'));

io.on('connection', function(socket){
    subscribe('browser_start', 'Browser starts', socket);
    subscribe('browser_register', 'Browser is registered', socket);
    subscribe('browser_complete', 'Browser completed run', socket);
    subscribe('run_start', 'Test run starts', socket);
    subscribe('run_complete', 'Test run finished', socket);
});

app.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
});