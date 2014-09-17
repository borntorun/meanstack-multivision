var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://192.168.99.21/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://code-centos7:Passw0rd@ds041758.mongolab.com:41758/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};