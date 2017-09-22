try {
    var karma = require('karma');
}
catch (err) {
    var prequire = require('parent-require')
        , karma = prequire('karma');
}

const log = console.log;

console.log = function () {
};

const Server = karma.Server;
const karmaConfig = karma.config;
const path = require('path');

const configuration = karmaConfig.parseConfig(path.resolve('./karma.conf.js'), { port: 1337 });


const server = new Server(configuration, function (exitCode) {
    log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
});


let subscribe = function (event, description) {
    server.on(event, function (p1, p2, p3) {
        log(description, p1, p2, p3);
    });
};

subscribe('browser_start', 'Browser starts');
subscribe('browser_register', 'Browser is registered');
subscribe('browser_complete', 'Browser completed run');
subscribe('run_start', 'Test run starts');
subscribe('run_complete', 'Test run finished');

server.start();

const express = require('express');
const app = express();

app.get('/check', function (req, res) {
    res.send('The server is working correctly.');
})

app.use(express.static('./node_modules/destiny-runner/src/public'));

app.listen(3000, function () {
    log('Destiny runner listening on port 3000!');
});