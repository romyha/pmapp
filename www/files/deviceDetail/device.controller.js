(function () {
    angular.module("pm").controller("detailCtrl", detailCtrl);

    detailCtrl.$inject = ['$location', '$ionicHistory', 'deviceData', '$stateParams', '$scope'];
    function detailCtrl($location, $ionicHistory, deviceData, $stateParams, $scope) {
        var vm = this;

        vm.deviceid = $stateParams.id;      
        
        $scope.$on('$ionicView.enter', function () {
            deviceData.deviceById(vm.deviceid).success(function (data) {
                vm.device = data;
            }).error(function (err) {
                console.log(err)
            });
        });

        /*vm.device = {
            name: "DC5K A3",
            id: 12345,
            status: "red",
            description: "This is a description.",
            changes: [{
                author: "Ramin",
                date: new Date("26 May 2016"),
                status: "red",
                message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
            }, {
                    author: "Ramin",
                    date: new Date("21 April 2016"),
                    status: "yellow",
                    message: "I increased the board temperature 3 times (to remove, resolder and fix) the FETs, The board shows short circuit once connected to 13 Volts. Should be investigated, but the board is pretty exhausted!!! I also removed the DC bus diode"
                }, {
                    author: "Victor",
                    date: new Date("20 April 2016"),
                    status: "green",
                    message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
                }, {
                    author: "Ramin",
                    date: new Date("10 March 2016"),
                    status: "green",
                    message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
                }, {
                    author: "Ramin",
                    date: new Date("19 March 2016"),
                    status: "green",
                    message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
                }, {
                    author: "Ramin",
                    date: new Date("1 June 2016"),
                    status: "green",
                    message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
                }, {
                    author: "Ramin",
                    date: new Date("10 March 2016"),
                    status: "green",
                    message: "Phase C FETs replaced. , phase_B FETs broke and replaced, functional at low voltages. 20160125: the AND chip on C_L was brocken. I shorted it. (2016_01_29) the FETs of phase C are replaced, but there is a short between DC-bus terminals"
                }]
        }*/

        vm.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices");
            $ionicHistory.nextViewOptions.disableBack = false;

        }

        vm.toEdit = function (changeid) {
            $location.path('/app/devices/'+vm.deviceid+'/changes/'+changeid+'/edit');            
        }
    }
})();