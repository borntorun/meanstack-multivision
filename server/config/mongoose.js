var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db  opened');
    });


    /*
    Login schema
     */
    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    /*
    User Model
     */
    var User = mongoose.model('user', userSchema);

    /*
    Criar users se não existirem
     */
    User.find({}).exec(function(err, collection) {
       if (collection.length === 0) {
           var salt, hash;
           salt = createSalt();
           hash = hashPwd(salt, 'Passw0rd');
           User.create({firstName:'João', lastName:'Carvalho', userName:'jcarvalho',
               salt:salt, hashed_pwd: hash, roles: ['admin'] });

           salt = createSalt();
           hash = hashPwd(salt, 'Passw0rd');
           User.create({firstName:'João Afonso', lastName:'Carvalho', userName:'jafonso',
               salt:salt, hashed_pwd: hash, roles: []});

           salt = createSalt();
           hash = hashPwd(salt, 'Passw0rd');
           User.create({firstName:'Isabel', lastName:'Gomes', userName:'igomes',
               salt:salt, hashed_pwd: hash
           });
       }
    });



    /*
     //criar Schema com mongoose
     var messageSchema = mongoose.Schema({message: String});
     //criar Model para o schema
     var Message = mongoose.model('messages', messageSchema);
     //get 1 item da collection
     var mongoMessage;
     Message.findOne().exec(function(err, messageDoc) {
     mongoMessage = messageDoc.message;
     });
     */

};

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt,pwd) {
    var hmac = crypto.createHmac('sha1',salt);
    return hmac.update(pwd).digest('hex');
}
