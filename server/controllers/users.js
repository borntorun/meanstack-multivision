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