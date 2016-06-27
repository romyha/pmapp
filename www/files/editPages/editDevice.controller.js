(function () {
    angular.module("pm").controller("editDeviceCtrl", editDeviceCtrl);

    editDeviceCtrl.$iject = ['$location', '$stateParams', 'deviceData', 'paths', 'authentication'];
    function editDeviceCtrl($location, $stateParams, deviceData, paths, authentication) {
        var vm = this;
        var location;

        vm.devicecode = $stateParams.code;

        vm.locationHide = true;
        deviceData.locations().success(function (locations) {
            vm.locations = locations;
        });

        deviceData.deviceByCode(vm.devicecode).success(function (data) {
            vm.name = data.name;
            vm.description = data.description;
            location = data.location;
            vm.device = data;
            vm.selector = vm.device.status;
            vm.changeColor();
        });


        vm.checkIfEmpty = function () {
            if (!vm.device.location) {
                vm.locationHide = true;
            } else vm.locationHide = false;
        };

        vm.complete = function (loc) {
            vm.device.location = loc;
            vm.locationHide = true;
        };

        vm.clear = function () {
            vm.nameerror = "";
            vm.codeerror = "";
        };

        vm.edit = function () {
            deviceData.editDeviceById(vm.device._id, {
                //status not editable, because depends on changes
                name: vm.name,
                description: vm.description,
                code: vm.device.code
            }).success(function (device) {
                if (location != vm.device.location) {
                    deviceData.addChangeById(vm.device._id, {
                        author: authentication.currentUser().name,
                        status: vm.device.status,
                        location: vm.device.location,
                        date: new Date()
                    })
                }
                if (!(vm.locations.indexOf(vm.device.location) > -1)) {
                    deviceData.addLocation({
                        name: vm.device.location
                    });
                }

                paths.newPathDisableBack("/app/devices/" + vm.devicecode);
            }).error(function (err) {
                if (err.errmsg.indexOf('$name') > -1 && err.errmsg.indexOf('dup key') > -1)
                    vm.nameerror = "This name already exists.";
                if (err.errmsg.indexOf('$code') > -1 && err.errmsg.indexOf('dup key') > -1)
                    vm.codeerror = "This code already exists.";
            });


        }

        vm.goHome = function () {
            paths.newPathDisableBack("/app/devices");
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