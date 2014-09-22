var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    mongoose = require('mongoose'),
    User = mongoose.model('user');

module.exports = function(app) {

    /*
    é possível ter uma chain de funções de middleware dentro do mesmo route
     -auth.requiresRole retorna uma function

     */

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateCurrentUser);

    app.get('/api/courses', courses.getCourses);
    app.get('/api/courses/:id', courses.getCourseById);

    //definir route para partials views
    /* 1ª forma: apenas um folder para todas as views partials
     app.get('/partials/:partialPath', function(req, res) {
     res.render('partials/' + req.params.partialPath);
     });
    */

    // 2ª forma: varias sub-folders para as views partials
    app.get('/partials/*', function(req, res) {

        /*
        console.log(req.params[0])
        console.log(req.path);
        console.log(req.params.partialPath)

        if (req.user) {
            console.log(req.user.lastName);
        }
        */

        /*
        exemplo como limitar visualização de views
         */
        /*if(req.user.lastName === 'Carvalho' && req.params[0].indexOf('main/featured-courses')!==-1) {
            //return(next());
            res.redirect('/partials/main/new-courses');
        }
        else {
            res.render('../../public/app/' + req.params[0]);
        }*/
        res.render('../../public/app/' + req.params[0]);


    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();//function automaticly added by passport module
        res.end();
    });

    app.all('/api/*', function(req, res) {
        res.send(404);
    });


    //definir como rotear a página index
    app.get('*', function(req, res) {
        /*
         res.render('index', {
         mensagem: mongoMessage
         });
         */
        res.render('index', {
            bootstrappedUser: req.user
        });
    });

};