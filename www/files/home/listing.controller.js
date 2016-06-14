(function () {
    angular.module("pm").controller("listingCtrl", listingCtrl);


    function listingCtrl($location, $ionicLoading, $scope, $ionicPopup) {
        var vm = this;

        vm.devices = [{
            name: "DC5K A3",
            id: 12345,
            status: "green"
        }, {
                name: "DC5K A2",
                id: 2355,
                status: "yellow"
            }, {
                name: "DC5K A1",
                id: 897234,
                status: "green"
            }, {
                name: "CA11 A.2",
                id: 2309,
                status: "blue"
            }, {
                name: "CA11 A.1",
                id: 2345,
                status: "red"
            }, {
                name: "C22",
                id: 9823,
                status: "red"
            }, {
                name: "DC30 A2",
                id: 9274,
                status: "yellow"
            }, {
                name: "DC30 A1",
                id: 628,
                status: "yellow"
            }, {
                name: "DC 500",
                id: 94,
                status: "blue"
            }, {
                name: "S021",
                id: 9271,
                status: "green"
            }, {
                name: "S091",
                id: 90127,
                status: "red"
            }, {
                name: "S001",
                id: 9012,
                status: "blue"
            }];

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
                        var confirm;    //pretend cancelled to be not found & not cancelled to found device
                        if (!result.cancelled) {
                            alert("Result: " + result.text + "\n" + "Format: " + "\n" + result.format);
                            $location.path('/app/device');    //if result found navigate to device
                            $scope.$apply();
                        } else {
                            confirm = $ionicPopup.confirm({
                                title: 'No device found',
                                template: 'Do you want to add one?'
                            });
                            confirm.then(function (confirmed) {
                                if (confirmed) {
                                    $location.path('/app/devices/new');
                                }
                            }).call();
                        }
                    }, function (error) {
                        alert("Scanning failed: " + error);
                    }
                );

            }

        }

    }


})();