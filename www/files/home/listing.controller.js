(function () {
    angular.module("pm").controller("listingCtrl", listingCtrl);


    function listingCtrl($location, $ionicLoading, $scope, $ionicPopup, $ionicHistory, deviceData) {
        var vm = this;

        vm.up = true;



        vm.toDevice = function () {
            $location.path("/app/device");
        }

        $scope.$on('$ionicView.enter', function () {
            deviceData.devices().success(function (data) {
                vm.devices = data;
            }).error(function (err) {
                console.log(err)
            });
        });

        vm.sort = function (property) {
            //if clicking new property to sort always start ascending
            if (property != vm.order) {
                vm.up = true;
            } else {
                //if same property just switch desc and asc
                if (vm.up) vm.up = false;
                else vm.up = true;
            }
            if (property == "name") {
                vm.codeOrder = false;
                vm.nameOrder = true;
                vm.stateOrder = false;
            } else if (property == "code") {
                vm.codeOrder = true;
                vm.nameOrder = false;
                vm.stateOrder = false;
            } else {
                vm.codeOrder = false;
                vm.nameOrder = false;
                vm.stateOrder = true;
            }
            if (!vm.up) {
                vm.order = "-" + property;
            } else {
                vm.order = property;
            }
        }

        //on first pageload automatically sort by name
        vm.sort('name');

        vm.enableCancel = function () {
            vm.focus = false;
            if (vm.textFilter) {
                vm.searchEntered = true;
            } else {
                vm.searchEntered = false;
            }
        }

        

        vm.clearSearch = function () {
            vm.textFilter = "";
            vm.searchEntered = false;
            vm.focus = true;
        }

        vm.scan = function () {

            if (!!window.cordova) {   //if running in browser, don't show loading
                $ionicLoading.show({
                    template: 'Loading...'
                });


                /**for Android 5+ ask for camera permission to scan */
                cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
                    if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
                        doScanning();
                    } else {
                        alert("You cannot scan without granting access to camera.");
                    }
                }, function (error) {
                    alert(error);
                });
            }

            function doScanning() {
                $ionicLoading.hide();

                cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        var confirm;
                        if (!result.cancelled) {
                            deviceData.deviceByCode(result.text).success(function (device) {
                                $location.path('/app/devices/' + device.code);    //if result found navigate to device
                                $scope.$apply();
                            }).error(function (err) {
                                confirm = $ionicPopup.confirm({
                                    title: 'Item not found',
                                    template: 'The item with the Code ' + result.text + ' is not yet listed in PMA.',
                                    okText: 'Add'
                                });
                                confirm.then(function (confirmed) {
                                    if (confirmed) {
                                        $location.path('/app/devices/' + result.text + '/new');
                                    }
                                }).call();
                            });
                        }
                    }, function (error) {
                        alert("Scanning failed: " + error);
                    }
                );

            }

        }

    }


})();