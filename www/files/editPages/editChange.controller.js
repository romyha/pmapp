(function () {
    angular.module("pm").controller("editChangeCtrl", editChangeCtrl);

    editChangeCtrl.$inject = ['$rootScope', '$scope', '$location', '$stateParams', 'deviceData', 'authentication', 'paths'];
    function editChangeCtrl($rootScope, $scope, $location, $stateParams, deviceData, authentication, paths) {
        var vm = this;
        var ready = false;

        document.addEventListener("deviceready", function () {
            ready = true;
        })

        if (!$rootScope.testMode) vm.name = authentication.currentUser().name;
        else vm.name = "test user";

        vm.devicecode = $stateParams.code;
        vm.changeid = $stateParams.changeid;

        vm.locationHide = true;

        deviceData.locations().success(function (locations) {
            vm.locations = locations;
        });

        $scope.$on('$ionicView.enter', function () {
            deviceData.deviceByCode(vm.devicecode).success(function (data) {
            vm.device = data;

            deviceData.changeById(data._id, vm.changeid).success(function (data) {
                vm.change = data;
                vm.selector = vm.change.status;
                vm.changeColor();
                vm.message = data.message;
                vm.location = data.location;
                vm.change.date = new Date(vm.change.date);
            }).error(function (err) {
                console.log(err);
            });
        });
        })
        

        vm.edit = function () {
            deviceData.editChangeById(vm.device._id, vm.changeid, {
                status: vm.selector,
                message: vm.message,
                location: vm.change.location,
                date: vm.change.date
            }).success(function (change) {
                if (!(vm.locations.indexOf(vm.change.location) > -1)) {
                    deviceData.addLocation({
                        name: vm.change.location
                    });
                }
                paths.newPathDisableBack("/app/devices/" + vm.devicecode);
            }).error(function (err) {
                console.log(err);
            });


        }

        vm.goHome = function () {
            paths.newPathDisableBack("/app/devices");
        }

        vm.saveDate = function (date) {
            vm.change.date = date;
        }

        vm.maxDate = new Date();

        vm.pickDate = function () {
            if (ready) {
                var options = {
                    date: vm.change.date,
                    windowTitle: "Changed device on",
                    mode: 'date', // or 'time'
                    allowOldDates: true,
                    maxDate: ionic.Platform.isIOS()? new Date() : (new Date()).valueOf()
                };

                datePicker.show(options, function (date) {
                    if (date != "CANCEL"){
                        vm.change.date = date;
                        $scope.$apply();
                    }
                });

            }
            
        }

        //check if entered location, if not, hide suggestions
        vm.checkIfEmpty = function () {
            if (!vm.change.location) {
                vm.locationHide = true;
            } else vm.locationHide = false;
        };

        //autocomplete if clicked location
        vm.complete = function (loc) {
            vm.change.location = loc;
            vm.locationHide = true;
        };

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