(function () {
    angular.module("pm").controller("helpCtrl", helpCtrl);

    helpCtrl.$inject = ['$ionicHistory', '$location'];
    function helpCtrl($ionicHistory, $location) {
        var vm = this;
        vm.goHome = function () {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path("/app/devices");
            $ionicHistory.nextViewOptions.disableBack = false;

        }
    }
})();