module.exports.subscribeToBrowserStart = (server, socket) => {
    server && server.on('browser_start', (browser, info) => {
        socket.emit('browser_start', {
            browser: browser,
            info: info
        });
    });
}

module.exports.subscribeToBrowserRegister = (server, socket) => {
    server && server.on('browser_register', (browser) => {
        socket.emit('browser_register', browser);
    });
}

module.exports.subscribeToBrowserComplete = (server, socket) => {
    server && server.on('browser_complete', function (browser, run_info, x) {
        socket.emit('browser_complete', {
            browser: browser,
            run_info: run_info,
            x: x
        });
    });
}

module.exports.subscribeToRunStart = (server, socket) => {
    server && server.on('run_start', function (browsers) {
        socket.emit('run_start', browsers);
    });
}


module.exports.subscribeToRunComplete = (server, socket) => {
    server && server.on('run_complete', function (browsers, results, x) {
        socket.emit('run_complete', {
            browsers: browsers,
            results: results,
            x: x
        });
    });
}