/*
Angular controller para navbar-login
 */

angular.module('app')
    .controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location, $window) {
    //colocar serviço mvIdentity no scope para poder ser usado no ado da view ui (html)
    $scope.identity = mvIdentity;
    //colocar funcao signin no scope da view
    $scope.signin = function(username, password) {
        mvAuth.authenticateUser(username, password).then(function(success) {
            if (success) {
                /*
                 console.log('antes');
                 console.log('antes');
                 console.log(mvIdentity.getCurrentUser());
                 */
                //console.log(mvIdentity.getCurrentUser());
                //console.log(mvIdentity.getFirstLastName());
                mvNotifier.notify('Entrada no sistema com sucesso!');
                //$window.location.href  ='/';
            } else {
                mvNotifier.notify('Autenticação no sistema incorrecta!', true);
            }
        });
    };

    $scope.signout = function() {
        mvAuth.logoutUser().then(function() {
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('Sessão terminada!');
            $location.path('/');
        })
    };
});
