var Course = require('mongoose').model('Course');

exports.getCourses = function(req, res) {
    Course.find({}).exec(function(err, collection) {
        res.send(collection);
    });
};


exports.getCourseById = function(req, res) {
    console.log(req);
    console.log(req.params.id);
    console.log(req.params._id);
    Course.findOne({_id:req.params.id}).exec(function(err, course) {
      res.send(course);
    });
};