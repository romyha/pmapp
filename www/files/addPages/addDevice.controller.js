(function () {
    angular.module("pm").controller("addDeviceCtrl", addDeviceCtrl);

    addDeviceCtrl.$inject = ['$location', '$ionicHistory', 'deviceData'];
    function addDeviceCtrl($location, $ionicHistory, deviceData) {
        var vm = this;

        vm.addDevice = function () {
            deviceData.addDevice({
                name: vm.device.name,
                description: vm.device.description,
                status: vm.selector,
                location: vm.device.location
            });
            
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/device");
            $ionicHistory.nextViewOptions.disableBack = false;
        }

        vm.changeColor = function () {
            switch (vm.selector) {
                case "green": {
                    vm.color = "lawngreen";
                    break;
                }
                case "yellow": {
                    vm.color = "yellow";
                    break;
                }
                case "blue": {
                    vm.color = "deepskyblue";
                    break;
                }
                case "red": {
                    vm.color = "orangered";
                    break;
                }
                default: {
                    vm.color = "none";
                    break;
                }
            }
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