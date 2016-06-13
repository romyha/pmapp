(function () {
    angular.module("pm").controller("changeCtrl", changeCtrl);

    changeCtrl.$inject = ['$location', '$ionicHistory'];
    function changeCtrl($location, $ionicHistory) {
        var vm = this;

        vm.addChange = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/device");
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

        vm.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices");
            $ionicHistory.nextViewOptions.disableBack = false;

        }

    }
})();