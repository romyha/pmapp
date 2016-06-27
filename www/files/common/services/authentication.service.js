(function () {
    angular.module('starter.auth', ['ngResource']).factory('authentication', authentication);

    authentication.$inject = ['$window', '$http'];
    function authentication($window, $http, $resource) {
//        var apiUrl = 'http://192.168.0.30:5000/api';
        var apiUrl = 'https://pma-service.synapticon.com/api';
        
        var saveToken = function (token) {
            $window.localStorage['loc8r-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['loc8r-token'];
        };

        var isLoggedIn = function () {
            var token = getToken();

            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else return false;
        }

        var currentUser = function () {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        register = function (user) {
            //return $http.post('http://localhost:5000/api/register', user).success(function (data) {
            return $http.post(apiUrl+'/register', user).success(function (data) {
                saveToken(data.token);
            });
        };

        login = function (user) {
            var headers = {
                'Access-Control-Allow-Origin': '*'
            };

            var req = {
                data: user,
                url: apiUrl + "/login",
                //url: "http://localhost:5000/api/login",
                method: 'POST'
            }

            return $http(req).success(function (data) {
                saveToken(data.token);
                console.log('logged in');

            });
        };

        logout = function () {
            $window.localStorage.removeItem('loc8r-token');
        }



        return {
            saveToken: saveToken,
            getToken: getToken,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
            login: login,
            register: register,
            logout: logout
        };
    }
})();