
//teste: main controller
angular.module('app').controller('mvMainCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();
});