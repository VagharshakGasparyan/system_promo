require('dotenv').config();

const conf = {
    log: {
        format: 'yyyy_MM_DD',
        ext: '.log',
        path: 'logs',
    },
}

module.exports = {conf};