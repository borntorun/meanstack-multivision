//ponto de entrada da aplicacao

/* Definimos um modulo 'app' que depende
dos modulos ngResource, ngRoute
 */

angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {auth: function(mvAuth) {
            return mvAuth.authorizeCurrentUserForRoute('admin');
        }},
        user: {auth: function(mvAuth) {
            return mvAuth.authorizeAuthenticatedUserForRoute();
        }}
    };

    //modo html5 para routing
    $locationProvider.html5Mode(true);
    //definir as rotas (routes)

    //rota para a raiz /
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'mvMainCtrl' })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/profile', { templateUrl: '/partials/account/profile',
            controller: 'mvProfileCtrl', resolve: routeRoleChecks.user
        })
        .when('/signup', { templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        });
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'notAuthorized') {
            $location.path('/');
        }
    });
});