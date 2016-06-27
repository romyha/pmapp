(function () {
    angular.module("pm").controller("changeCtrl", changeCtrl);

    changeCtrl.$inject = ['$rootScope', '$location', '$stateParams', 'deviceData', '$scope', '$cordovaDatePicker', 'authentication', 'paths'];
    function changeCtrl($rootScope, $location, $stateParams, deviceData, $scope, $cordovaDatePicker, authentication, paths) {
        var vm = this;

        if (!$rootScope.testMode) vm.author = authentication.currentUser().name;
        else vm.author = "test user";
        vm.devicecode = $stateParams.code;
        vm.noLocation = true;
        vm.noMessage = true;
        vm.locationHide = true;
        vm.date = new Date();

        var ready = false;

        document.addEventListener('deviceready', function () { ready = true; });

        $scope.$on('$ionicView.enter', function () {
            deviceData.deviceByCode(vm.devicecode).success(function (data) {
                vm.device = data;
                vm.device.name = data.name;
            });
            deviceData.locations().success(function (locations) {
                vm.locations = locations;
            });
        });

        vm.addChange = function () {
            var change = {
                author: vm.author,
                status: vm.selector,
                message: vm.message,
                location: vm.location,
                date: vm.date
            };
            deviceData.addChangeById(vm.device._id, change).success(function (change) {
                if (!(vm.locations.indexOf(vm.location) > -1)) {
                    deviceData.addLocation({
                        name: vm.location
                    });
                }
                paths.newPathDisableBack("/app/devices/" + vm.devicecode);
            });
        }

        vm.currentDate = new Date();
        vm.maxDate = vm.currentDate;
        
        vm.saveDate = function(date) {
            vm.date = date;
        }

        vm.pickDate = function () {
            if (ready) {
                var options = {
                    date: vm.date,
                    windowTitle: "Changed device on",
                    mode: 'date', // or 'time'
                    allowOldDates: true,
                    maxDate: ionic.Platform.isIOS()? new Date() : (new Date()).valueOf()
                };

                datePicker.show(options, function (date) {
                    if (date != "CANCEL")
                        vm.date = date;
                    $scope.$apply();
                });
            }
        }

        vm.complete = function (loc) {
            vm.location = loc;
            vm.locationHide = true;
        };

        vm.onLocEnter = function () {
            if (!vm.location) {
                vm.noLocation = true;
            }
            else vm.noLocation = false;

            if (!vm.location) {
                vm.locationHide = true;
            } else vm.locationHide = false;
        }

        vm.onMesEnter = function () {
            if (!vm.message) {
                vm.noMessage = true;
            }
            else vm.noMessage = false;
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
            }
        }

        vm.goHome = function () {
            paths.newPathDisableBack("/app/devices");
        }

    }
})();