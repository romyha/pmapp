(function () {
    angular.module("pm").controller("changeCtrl", changeCtrl);

    changeCtrl.$inject = ['$location', '$ionicHistory', '$stateParams', 'deviceData'];
    function changeCtrl($location, $ionicHistory, $stateParams, deviceData) {
        var vm = this;

        vm.deviceid = $stateParams.id;

        vm.addChange = function () {
            var change = {
                author: vm.author,
                status: vm.selector,
                message: vm.message
            };
            deviceData.addChangeById(vm.deviceid, change);

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices/" + vm.deviceid);
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