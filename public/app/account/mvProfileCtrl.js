angular.module('app').controller('mvProfileCtrl',
    function($scope, mvAuth, mvIdentity, mvNotifier) {
        var user = mvIdentity.getCurrentUser();
        console.log(user);
        $scope.email = user.userName;
        $scope.fname = user.firstName;
        $scope.lname = user.lastName;


        $scope.update = function() {
            var newUserData = {
                userName: $scope.email,
                firstName: $scope.fname,
                lastName: $scope.lname
            }
            if ($scope.password && $scope.password.length > 0) {
                newUserData.password = $scope.password;
            }

            mvAuth.updateCurrentUser(newUserData).then(function() {
                mvNotifier.notify('Perfil actualizado');
            }, function(reason) {
                mvNotifier.notify(reason, true);
            })
        }

    });