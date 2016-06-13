(function () {
    angular.module('pm').controller('registerCtrl', registerCtrl);
    
    
    function registerCtrl ($scope, $location, $ionicHistory, authentication) {
        var vm = this;
        vm.credentials = {};
        vm.doRegister = function () {
            var user = {
                name: vm.credentials.name,
                email: vm.credentials.email,
                password: vm.credentials.password
            }
            authentication.register(user).error(function (err) {
                vm.log = "Something went wrong";
            }).then(function () {
                vm.log = "Registered";

                //avoid back-button in nav
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $location.path('/app/devices');
                $ionicHistory.nextViewOptions.disableBack = false;
                $scope.$apply();
            });
        };
    };
})();