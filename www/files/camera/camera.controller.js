(function () {
  angular.module('pm').controller('cameraCtrl', cameraCtrl);

  cameraCtrl.$inject = ['$scope', '$location', '$ionicHistory', '$ionicPopup', '$ionicLoading'];
  function cameraCtrl($scope, $location, $ionicHistory, $ionicPopup, $ionicLoading) {
    var vm = this;
    var ready = false;


    if (!!window.cordova) {   //if running in browser, don't show loading
      /*$ionicLoading.show({
        template: 'Loading...'
      })*/

      /**for Android 5+ ask for camera permission to scan */
      cordova.plugins.diagnostic.requestCameraAuthorization(function (status) {
        if (status == cordova.plugins.diagnostic.permissionStatus.GRANTED) {
          scanCode();
        } else {
          alert("You cannot scan without granting access to camera.");
          $location.path('/app/devices');
          $scope.$apply();
        }
      }, function (error) {
        alert(error);
      });

    }

    /**tell app that cordova is fully loaded and ready to be used for actions */
    document.addEventListener("deviceready", function () { ready = true; }, false);

    function scanCode() {
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
              } else {
                $location.path('/app/devices');
              }

            }).call();
          }
        }, function (error) {
          alert("Scanning failed: " + error);
        }
      );

    }


    $scope.$on('$ionicView.enter', function (e) {
      if (ready) {
        $ionicLoading.hide()
      } else {
        if (!!window.cordova) {   //if running in browser, don't show loading
          $ionicLoading.show({
            template: 'Loading...'
          });
        }
      }

    });

    vm.goHome = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $location.path("/app/devices");
      $ionicHistory.nextViewOptions.disableBack = false;

    }

  }
})();