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
    server && server.on('browser_complete', function (browser, run_info) {
        socket.emit('browser_complete', {
            browser: browser,
            run_info: run_info
        });
    });
}

module.exports.subscribeToRunStart = (server, socket) => {
}

module.exports.subscribeToRunComplete = (server, socket) => {
}