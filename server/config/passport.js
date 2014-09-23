var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('user');

module.exports = function() {
    passport.use(new LocalStrategy(/*{usernameField:'username',passwordField:'password'},*/
        function(username, password, done) {
            //check if user exists
            User.findOne({userName: username}, function(err, user) {
                if(user && user.authenticate(password)) {
                    /*
                     console.log(user);
                     console.log('-----------------');
                     */
                    /*
                    user = user.toObject();
                    delete user.hashed_pwd;
                    delete user.salt;*/
                    /*user.hashed_pwd='';
                    user.salt='';*/
                    /*
                     console.log(user);
                     */
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    ));

    /*
     http://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore
     passport.serializeUser() is provided a function that takes two parameters,
     the user profile (user) and a callback function (done). The callback function
     takes as it's second parameter the identifying information
     ( user._id) required to recover the account from the database.
     This will be called on every authenticated request and stores the identifying
     information in the session data (whether that is in a cookie or another store)
     */
    passport.serializeUser(function(user,done) {
        if(user) {
            done(null, user._id);
        }
    });

    /*
     http://stackoverflow.com/questions/19268812/do-i-implement-serialize-and-deserialize-nodesjs-passport-redisstore
     passport.deserializeUser() is provided a function that also takes two parameters,
     the identifying information (id) and again a callback function (done).
     The identifying information is what was serialized to the session data in the previous
     request (user._id). The callback function here requires the user profile as
     it's second parameter, or any error in raised in retrieving the profile as it's
     first parameter. The User.findById() function is a lookup function for the user
     profile in the database. In this example User object is an instance of a mongoose
     model which has the findById() function
     */
    passport.deserializeUser(function(id,done) {
        User.findById(id, function(err,user) {
            /*console.log('deserializeUser');*/

            if(user) {
                /*console.log(user);*/
                /*user = user.toObject();
                delete user.hashed_pwd;
                delete user.salt;*/
                /*console.log(user);*/
                /*user.hashed_pwd='';
                user.salt='';*/
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};

