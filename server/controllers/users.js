/*
Users module

Logic for manipulating users

 */
var User = require('mongoose').model('user'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function(req, res) {
    User.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};

exports.createUser = function(req, res, next) {
    /*console.log(req.body);*/
    var userData = req.body;
    userData.userName = userData.userName.toLowerCase();
    userData.salt = encrypt.createSalt();
    userData.hashed_pwd = encrypt.hashPwd(userData.salt,  userData.password);
    User.create(userData,  function(err, user) {
        if(err) {
            if(err.toString().indexOf('E11000') > -1) {
              err = new Error('Email já existe');
            }
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err) {
            if(err) {
                return next(err);
            }
            res.send(user);
        })

    })
};

exports.updateCurrentUser = function(req, res) {
    var userDataUpdate = req.body;
    console.log(req.user);
    console.log(req.user._id);
    console.log(userDataUpdate._id);


    if(/*req.user._id != userDataUpdate._id && */!req.user.hasRole('admin')) {
        res.status(403);
        return res.end();
    }

    req.user.firstName = userDataUpdate.firstName;
    req.user.lastName = userDataUpdate.lastName;
    req.user.userName = userDataUpdate.userName;

    if(userDataUpdate.password && userDataUpdate.password.length > 0) {
        req.user.salt = encrypt.createSalt();
        req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, userDataUpdate.password);
    }
    req.user.save(function(err) {
        if(err) {
            res.status(400);
            return res.send({reason:err.toString()});
        }
        res.send(req.user);
    });


};