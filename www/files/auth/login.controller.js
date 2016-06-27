(function () {
    angular.module("pm").controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ['$rootScope', '$scope', '$location', 'authentication', 'paths'];
    function loginCtrl($rootScope, $scope, $location, authentication, paths) {
        var vm = this;
        $scope.isLoggedIn = authentication.isLoggedIn();
        $scope.loginData = {};

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            $scope.log = "";
            authentication.login({
                email: $scope.loginData.username,
                password: $scope.loginData.password
            }).error(function (err) {
                $scope.log = err;
            }).then(function () {
                $scope.log = "logged";
                $scope.isLoggedIn = authentication.isLoggedIn();

               paths.newPathDisableBack("/app/devices");
            });

        };

        vm.toRegister = function () {
            $location.path("app/register");
        }

        vm.asTestUser = function () {
            $scope.isLoggedIn = true;
            $rootScope.testMode = true;
            $location.path("/app/devices");
        }

    };
})();