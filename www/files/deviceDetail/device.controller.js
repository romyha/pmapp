(function () {
    angular.module("pm").controller("detailCtrl", detailCtrl);

    detailCtrl.$inject = ['$rootScope', '$location', 'deviceData', '$stateParams', '$scope', '$state', '$ionicPopup', 'authentication', 'paths'];
    function detailCtrl($rootScope, $location, deviceData, $stateParams, $scope, $state, $ionicPopup, authentication, paths) {
        var vm = this;

        vm.devicecode = $stateParams.code;

        $scope.$on('$ionicView.enter', function () {
            deviceData.deviceByCode(vm.devicecode).success(function (data) {
                vm.device = data;
                var states = [];
                for (var i = 1; i < 4; i++) {
                    if (data.changes[i]) {
                        var color;
                        switch (data.changes[i].status) {
                            case "green": {
                                color = "lawngreen";
                                break;
                            }
                            case "yellow": {
                                color = "yellow";
                                break;
                            }
                            case "blue": {
                                color = "deepskyblue";
                                break;
                            }
                            case "red": {
                                color = "orangered";
                                break;
                            }
                        }
                        states.push(color);
                    }
                }
                var shadow = "";
                if(states.length==1) {
                    shadow = "-5px 0 0 " + states[0];
                } else if(states.length == 2) {
                    shadow = "-5px 0 0 " + states[0] + ", -10px 0 0 " + states[1];
                } else if(states.length == 3) {
                    shadow = "-5px 0 0 " + states[0] + ", -10px 0 0 " + states[1] + ", -15px 0 0 " + states[2];
                }
                vm.style = { "box-shadow": shadow};
            }).error(function (err) {
                console.log(err)
            });
        });

        vm.deleteChange = function (changeid) {
            confirmDelete = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Are you sure to delete this change?'
            });

            confirmDelete.then(function (confirmed) {
                if (confirmed) {
                    deviceData.deleteChange(vm.device._id, changeid);
                    $state.reload();
                }
            });
        }

        vm.goHome = function () {
            paths.newPathDisableBack("/app/devices");
        }

        vm.toEdit = function (changeid) {
            $location.path('/app/devices/' + vm.devicecode + '/changes/' + changeid + '/edit');
        }

        vm.deleteDevice = function () {
            confirmDelete = $ionicPopup.confirm({
                title: 'Delete',
                template: 'Are you sure to delete this device?'
            });

            confirmDelete.then(function (confirmed) {
                if (confirmed) {
                    deviceData.deleteById(vm.device._id).success(function () {
                        vm.goHome();
                    });
                }
            });
        }

        vm.canEdit = function (author) {
            if ($rootScope.testMode) return false;
            if (authentication.currentUser().name == author || author == "test user") {
                return true;
            } else return false;
        }
    }
})();