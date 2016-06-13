(function () {
    angular.module("pm").controller("editDeviceCtrl", editDeviceCtrl);

    editDeviceCtrl.$iject = ['$location', '$ionicHistory'];
    function editDeviceCtrl($location, $ionicHistory) {
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