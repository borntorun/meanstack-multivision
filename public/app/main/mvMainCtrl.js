
//teste: main controller
angular.module('app').controller('mvMainCtrl', function($scope, mvIdentity) {
    $scope.identity = mvIdentity;
    $scope.courses = [
        {name: "C# for sociopats", featured: true, published: new Date('2014-01-01')},
        {name: "Visual Basic for nerds", featured: true, published: new Date('2009-01-01')},
        {name: "The logic of javasctipt in 10 sessions", featured: false, published: new Date(2016,12,02)},
        {name: "F# for sociopats", featured: true, published: new Date('2010-01-01')},
        {name: "Mongo fot totos", featured: true, published: new Date('2013-01-01')},
        {name: "The logic of javasctipt in 1 sessions", featured: false, published: new Date(2015,12,02)},
        {name: "The logic of javasctipt in 11 sessions", featured: false, published: new Date(2016,12,02)},
        {name: "The logic of javasctipt in 12 sessions", featured: false, published: new Date(2017,12,02)},
        {name: "The logic of javasctipt in 13 sessions", featured: false, published: new Date(2018,12,02)},
        {name: "The logic of javasctipt in 14 sessions", featured: false, published: new Date(2021,12,02)},
        {name: "The logic of javasctipt in 15 sessions", featured: false, published: new Date(2019,12,02)},
        {name: "The logic of javasctipt in 16 sessions", featured: false, published: new Date(2014,12,02)},
        {name: "The logic of javasctipt in 17 sessions", featured: false, published: new Date(2020,12,02)},
        {name: "The logic of javasctipt in 18 sessions", featured: false, published: new Date(2013,12,02)},
        {name: "The logic of javasctipt in 19 sessions", featured: false, published: new Date(2012,12,02)},
        {name: "The logic of javasctipt in 19 sessions", featured: false, published: new Date(2011,12,02)},
        {name: "The logic of javasctipt in 40 sessions", featured: false, published: new Date(1999,12,02)},
    ]
});