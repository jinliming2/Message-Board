/**
 * Created by Liming on 2017/4/2.
 */
"use strict";
import {DB_NAME, DB_HOST, DB_PORT} from './config';

const express = require('express');
const path = require('path');
const http = require('http');
const port = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

let app = express();


app.use(`/${DB_NAME}`, (req, res) => {
    const opt = {
        host: DB_HOST,
        port: DB_PORT,
        path: req.originalUrl,
        method: req.method,
        headers: Object.assign({}, req.headers, {
            'host': `${DB_HOST}:${DB_PORT}`
        })
    };
    let upstream = http.request(opt, upstream => {
        res.writeHead(upstream.statusCode, upstream.headers);
        upstream.pipe(res);
    });
    req.pipe(upstream);
    upstream.on('error', err => {
        console.error(err);
        res.end(err.stack);
    });
});

app.use(express.static(path.join(__dirname, '..', '..', 'build')));

app.set('port', port);

let server = http.createServer(app);
server.listen(port);
server.on('error', error => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
});
server.on('listening', () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.info('Listening on ' + bind);
});
