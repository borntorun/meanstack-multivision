
angular.module('app')
    .factory('mvAuth', function($http, mvIdentity, $q, mvUser) {
    return {
        authenticateUser: function(username, password) {
            var dfd = $q.defer();
            $http.post('/login', {username:username, password:password}).then(function(response) {
                if(response.data.success) {
                    var user = new mvUser();
                    /*console.log('>>>')
                    console.log(user)
                    console.log(response.data.user)*/
                    angular.extend(user, response.data.user);
                    /*console.log('<<<')
                    console.log(user)*/
                    mvIdentity.setCurrentUser(user);
                    dfd.resolve(true);
                } else {
                    dfd.resolve(false);
                }
            });
            return dfd.promise;
        },
        logoutUser: function() {
            var dfd = $q.defer();
            $http.post('/logout', {logout:true}).then(function() {
                mvIdentity.setCurrentUser(undefined);
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role) {
            if(mvIdentity.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject('notAuthorized');//label pode ser qualquer
            }
        }
    }
});