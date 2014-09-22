angular.module('app').controller('mvSignupCtrl', function($scope, mvAuth, mvNotifier, $location) {

   $scope.signup = function() {
       var newUserData = {
           userName: $scope.email,
           password: $scope.password,
           firstName: $scope.fname,
           lastName: $scope.lname
       };

       mvAuth.createUser(newUserData).then(function() {
           mvNotifier.notify('User criado com sucesso');
           $location.path('/');

       }, function(reason) {
           mvNotifier.notify(reason, true);
       });
   }
});