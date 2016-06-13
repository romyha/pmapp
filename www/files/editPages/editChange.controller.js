(function () {
    angular.module("pm").controller("editChangeCtrl", editChangeCtrl);

    editChangeCtrl.$inject = ['$location', '$ionicHistory'];
    function editChangeCtrl($location, $ionicHistory) {
        var vm = this;

        vm.addChange = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/device");
            $ionicHistory.nextViewOptions.disableBack = false;
        }

        vm.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices");
            $ionicHistory.nextViewOptions.disableBack = false;

        }

    }
})();