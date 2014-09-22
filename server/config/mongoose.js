var mongoose = require('mongoose'),
    userModel = require('../models/user');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db  opened');
    });

    userModel.createDefaultUsers();




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


