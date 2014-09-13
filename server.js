var express = require('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
//#1
//http = require('http');

//variável que determina ambiente
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//criar aplicação Express
var app = express();

function compile(str, path) {
    return stylus(str).set('filename', path);
}

//configurar a aplicação
app.set('view engine', 'jade');
app.set('views', __dirname + '/server/views');

//stuff
//logger
//app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));


//midleware for stylus
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

/*
app.use(express.static(__dirname + '/public', {
    setHeaders: function (res, path) {
        console.log(path);
        if (path.indexOf(".js") !== -1) {

            console.log(path);
            res.contentType("text/javascript");
        }


    }
}));
*/

//connect mongoDB com mongoose
//usa a db correcta consoante o ambiente
if(env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://code-centos7:Passw0rd@ds041758.mongolab.com:41758/multivision');
}

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('multivision db opened');
});
//criar Schema com mongoose
var messageSchema = mongoose.Schema({message: String});
//criar Model para o schema
var Message = mongoose.model('messages', messageSchema);
//get 1 item da collection
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
    mongoMessage = messageDoc.message;
});



//definir route para partials views
app.get('/partials/:partialPath', function(req, res) {
    res.render('partials/' + req.params.partialPath);
});


//definir como rotear a página index
app.get('*', function(req, res) {
    res.render('index', {
        mensagem: mongoMessage
    });
});


var port = process.env.PORT || 3030;
app.listen(port);
//#1
// http.createServer(app).listen(port);
console.log('A escutar a porta ' + port + '...');
