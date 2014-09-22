var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: {type:String, required:'{PATH} is required'},
    featured: {type:Boolean, required:'{PATH} is required'},
    published: {type:Date, required:'{PATH} is required'},
    tags: [String]
    
});

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function(err, collection) {
        
        if (collection.length === 0) {
            Course.create({tags:['C#'], title: "C# for sociopats", featured: true, published: new Date('2014-01-01')});
            Course.create({tags:['VB'], title: "Visual Basic for nerds", featured: true, published: new Date('2009-01-01')});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 10 sessions", featured: false, published: new Date(2016,12,02)});
            Course.create({tags:['F#'], title: "F# for sociopats", featured: true, published: new Date('2010-01-01')});
            Course.create({tags:['mongo'], title: "Mongo fot totos", featured: true, published: new Date('2013-01-01')});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 1 sessions", featured: false, published: new Date(2015,12,02)});
            Course.create({tags:['garden', 'gardening'], title: "The logic of Gardening in 11 sessions", featured: false, published: new Date(2016,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 12 sessions", featured: false, published: new Date(2017,12,02)});
            Course.create({tags:['javascript','node'], title: "The logic of Node in 13 sessions", featured: false, published: new Date(2018,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 14 sessions", featured: false, published: new Date(2021,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 15 sessions", featured: false, published: new Date(2019,12,02)});
            Course.create({tags:['javascript','mean','node','express','angular'], title: "The logic of MEAN in 16 sessions", featured: false, published: new Date(2014,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 17 sessions", featured: false, published: new Date(2020,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 18 sessions", featured: false, published: new Date(2013,12,02)});
            Course.create({tags:['web'], title: "The logic of web in 19 sessions", featured: false, published: new Date(2012,12,02)});
            Course.create({tags:['javascript'], title: "The logic of javasctipt in 19 sessions", featured: false, published: new Date(2011,12,02)});
            Course.create({tags:['cooking'], title: "The logic of Cooking in 40 sessions", featured: false, published: new Date(1999,12,02)});
        }
    });
};

exports.createDefaultCourses = createDefaultCourses;
