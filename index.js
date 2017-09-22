try {
    var karma = require('karma');
}
catch (err) {
    var prequire = require('parent-require')
        , karma = prequire('karma');
}

console.log(__filename);

const Server = karma.Server;
const karmaConfig = karma.config;
const path = require('path');

const configuration = karmaConfig.parseConfig(path.resolve('./karma.conf.js'), { port: 1337 } );


const server = new Server(configuration, function (exitCode) {
    console.log('Karma has exited with ' + exitCode)
    process.exit(exitCode)
});

server.start();

const express = require('express');
const app = express();

app.use(express.static('src/public'));

app.listen(3000, function () {
    console.log('Destiny runner listening on port 3000!');
});