//ponto de entrada da aplicacao

/* Definimos um modulo 'app' que depende
dos modulos ngResource, ngRoute
 */

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    //modo html5 para routing
    $locationProvider.html5Mode(true);
    //definir as rotas (routes)

    //rota para a raiz /
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl' });
});


//teste: main controller
angular.module('app').controller('mainCtrl', function($scope) {
    $scope.myVar = "Hello Angular";
});