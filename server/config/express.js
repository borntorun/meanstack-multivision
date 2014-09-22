var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    passport = require('passport'),
    bodyParser = require('body-parser');


module.exports = function(app, config) {


    //configurar a aplicação
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    //stuff
    //logger
    //app.use(morgan('combined'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(session({secret: 'demo'}));
    app.use(passport.initialize());
    app.use(passport.session());


    //midleware for stylus
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }
    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            compile: compile
        }
    ));

    app.use(express.static(config.rootPath + '/public'));

    /*
     app.use(express.static(config.rootPath + '/public', {
     setHeaders: function (res, path) {
     console.log(path);
     if (path.indexOf(".js") !== -1) {

     console.log(path);
     res.contentType("text/javascript");
     }


     }
     }));
     */
};
