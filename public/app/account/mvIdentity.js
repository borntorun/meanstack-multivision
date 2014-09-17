/*
Módulo/Serviço que detêm informação sobre se existe user conectado
 */

angular.module('app').factory('mvIdentity', function($window, mvUser) {
    var currentUser,
        firstLastName;
    if(!!$window.bootstrappedUserObject) {
        currentUser = new mvUser();
        angular.extend(currentUser, $window.bootstrappedUserObject);
        firstLastName = currentUser.firstName + " " + currentUser.lastName;
    }
    return {
        currentUser: currentUser,
        firstLastName: firstLastName,
        getCurrentUser: function() {
            return this.currentUser;
        },
        getFirstLastName: function() {
            return this.firstLastName;
        },
        isAuthenticated: function() {
            return !!this.currentUser;
        },
        isAuthorized: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        },
        setCurrentUser: function(pUser) {
            this.currentUser = pUser;
            if (pUser) {
                this.firstLastName = pUser.firstName + " " + pUser.lastName;
            } else {
                this.firstLastName = undefined;
            }

        }
    }
});

/*
angular.module('app')
    .factory('mvIdentity',
    function() {
        var ret = function($window, mvUser) {

            if(!!window.bootstrappedUserObject) {
                var user = new mvUser();
                angular.extend(user, window.bootstrappedUserObject);
                setCurrentUser(user);
            }

            //setCurrentUser(window.bootstrappedUserObject || currentUser);
            return {

                isAuthenticated:isAuthenticated,
                getCurrentUser: getCurrentUser,
                getFirstLastName: getFirstLastName,
                setCurrentUser: setCurrentUser
            }
        };

        var currentUser = undefined,
            firstLastName = undefined,
            isAuthenticated = function() {
                return !!currentUser;
            },
            getCurrentUser = function() {
                return currentUser;
            },
            setCurrentUser = function(pUser) {
                currentUser = pUser;
                if (pUser) {
                    firstLastName = pUser.firstName + " " + pUser.lastName;
                } else {
                    firstLastName = undefined;
                }

            };
        return ret;
    }()

);
*/