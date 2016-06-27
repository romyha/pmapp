(function () {
    angular.module("pm").controller("addDeviceCtrl", addDeviceCtrl);

    addDeviceCtrl.$inject = ['$location', 'deviceData', '$stateParams', '$scope', 'paths'];
    function addDeviceCtrl($location, deviceData, $stateParams, $scope, paths) {
        var vm = this;
        vm.device = {};

        $scope.$on('$ionicView.enter', function () {
            vm.checkIfEmpty();
            if ($stateParams.code !== 'code') {
                vm.device.code = $stateParams.code;
            };

            deviceData.locations().success(function (locations) {
                vm.locations = locations;
            });
        });

        vm.clear = function () {
            vm.nameerror = "";
            vm.codeerror = "";
        };

        vm.checkIfEmpty = function() {
            if(!vm.device.location) {
                vm.locationHide = true;
            } else vm.locationHide = false;
        };
        
        vm.complete = function(loc) {
            vm.device.location = loc;
            vm.locationHide = true;            
        };

        vm.addDevice = function () {
            deviceData.addDevice({
                name: vm.device.name,
                description: vm.device.description,
                status: vm.selector,
                location: vm.device.location,
                code: vm.device.code
            }).success(function (device) {
                if(!(vm.locations.indexOf(vm.device.location)>-1)) {
                    deviceData.addLocation({
                        name: vm.device.location
                    });
                }
                
                paths.newPathDisableBack("/app/devices");
            }).error(function (err) {
                if (err.errmsg.indexOf('$name') > -1 && err.errmsg.indexOf('dup key') > -1)
                    vm.nameerror = "This name already exists.";
                if (err.errmsg.indexOf('$code') > -1 && err.errmsg.indexOf('dup key') > -1)
                    vm.codeerror = "This code already exists.";
            });


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
                    vm.color = "green";
                    break;
                }
            }
        }

        vm.goHome = function () {
            paths.newPathDisableBack("/app/devices");
        }

    }
})();