

module.exports.startKarma = () => {
    try {
        const karma = require('karma');
        const Server = karma.Server;
        const karmaConfig = karma.config;
        const path = require('path');
        const configuration = karmaConfig.parseConfig(path.resolve('./karma.conf.js'), {});

        const server = new Server(configuration, function (exitCode) {
            console.log('Karma has exited with ' + exitCode);
            process.exit(exitCode);
        });

        server.start();

        return {
            karmaStarted: true,
            server: server
        }
    }
    catch (err) {
        return {
            karmaStarted: false,
        }
    }
}