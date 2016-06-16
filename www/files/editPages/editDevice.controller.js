(function () {
    angular.module("pm").controller("editDeviceCtrl", editDeviceCtrl);

    editDeviceCtrl.$iject = ['$location', '$ionicHistory', '$stateParams', 'deviceData'];
    function editDeviceCtrl($location, $ionicHistory, $stateParams, deviceData) {
        var vm = this;

        vm.deviceid = $stateParams.id; 
        
        deviceData.deviceById(vm.deviceid).success(function(data){
            vm.name = data.name;
            vm.description = data.description;
            vm.location = data.location;
            vm.device = data;
            vm.selector = vm.device.status;
            vm.changeColor();
        });
        
        

        vm.edit = function () {
            deviceData.editDeviceById(vm.deviceid, {
                //just make name & description editable, because status depends on changes and id is automatically assigned
                name: vm.name,
                description: vm.description
            });
            
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices/"+vm.deviceid);
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