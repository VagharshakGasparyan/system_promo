const express = require('express');
const app = express();
const path = require('node:path');
const http = require('node:http');
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const fileUpload = require("express-fileupload");
app.use(fileUpload({limits: { fileSize: 50 * 1024 * 1024 }}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', require('./routes/api_v1'));

require("./middleware/errors")(app);

//------------------logger-------------------------------
require("./components/logger");

//------------------starting-----------------------------
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
/*Create HTTP server.*/
const server = http.createServer(app);
/*Listen on provided port, on all network interfaces.*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;// named pipe
    }
    if (port >= 0) {
        return port;// port number
    }
    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
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
}
/*Event listener for HTTP server "listening" event.*/
function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    // debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}