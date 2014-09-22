var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

/*
 Login schema
 */
var userSchema = mongoose.Schema({
    firstName: {type: String, required: '{PATH} is required!'},
    lastName: {type: String, required: '{PATH} is required!'},
    userName: {
        type: String,
        required: '{PATH} is required!',
        unique:true
    },
    salt: {type: String, required: '{PATH} is required!'},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String]
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    }
};

/*
 User Model
 */
var User = mongoose.model('user', userSchema);

/*
 Criar users se não existirem
 */

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        console.log(collection.length);

        if (collection.length === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Passw0rd');
            User.create({firstName:'João', lastName:'Carvalho', userName:'jcarvalho',
                salt:salt, hashed_pwd: hash, roles: ['admin'] });

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Passw0rd');
            User.create({firstName:'João Afonso', lastName:'Carvalho', userName:'jafonso',
                salt:salt, hashed_pwd: hash, roles: []});

            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'Passw0rd');
            User.create({firstName:'Isabel', lastName:'Gomes', userName:'igomes',
                salt:salt, hashed_pwd: hash
            });
        }
    });
};

exports.createDefaultUsers = createDefaultUsers;