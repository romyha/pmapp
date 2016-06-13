(function () {
    angular.module("pm").controller("loginCtrl", loginCtrl);

    loginCtrl.$inject = ['$rootScope', '$scope', '$location', '$ionicHistory', 'authentication'];
    function loginCtrl($rootScope, $scope, $location, $ionicHistory, authentication) {
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

                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $location.path("/app/devices");
                $ionicHistory.nextViewOptions.disableBack = false;

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