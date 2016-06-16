(function () {
    angular.module("pm").controller("editChangeCtrl", editChangeCtrl);

    editChangeCtrl.$inject = ['$location', '$ionicHistory', '$stateParams', 'deviceData'];
    function editChangeCtrl($location, $ionicHistory, $stateParams, deviceData) {
        var vm = this;

        vm.deviceid = $stateParams.deviceid;
        vm.changeid = $stateParams.changeid;

        deviceData.deviceById(vm.deviceid).success(function (data) {
            vm.device = data;            
        });

        deviceData.changeById(vm.deviceid, vm.changeid).success(function (data) {
            vm.change = data;
            vm.selector = vm.change.status;
            vm.changeColor();
            vm.name = data.author;
            vm.message = data.message;
        }).error(function (err) {
            console.log(err);
        });

        //console.log(vm.change.author);

        vm.edit = function () {
            deviceData.editChangeById(vm.deviceid, vm.changeid, {
                status: vm.selector,
                message: vm.message
            });

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices/" + vm.deviceid);
            $ionicHistory.nextViewOptions.disableBack = false;
        }

        vm.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices");
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
    }
})();