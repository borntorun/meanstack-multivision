var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

//console.log(process.env.dbuser + ':' + process.env.dbpassword);

module.exports = {
    development: {
        db: 'mongodb://192.168.99.21/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://' + process.env.dbuser + ':' + process.env.dbpassword + '@ds041758.mongolab.com:41758/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};