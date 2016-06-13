(function () {
angular.module('starter.controllers', [])

  .controller('AppCtrl', function ($rootScope, $scope, $ionicHistory, $ionicModal, $timeout, $location, authentication) {

    document.addEventListener("deviceready", function () { screen.msLockOrientation('portrait'); }, false);
    
    


    $rootScope.testMode = false;

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:   
    $scope.$on('$ionicView.enter', function (e) {
      $scope.isLoggedIn = authentication.isLoggedIn();

      if (!$rootScope.testMode && !authentication.isLoggedIn() && ($location.path() != "/app/register")) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $location.path("/app/login");
        $ionicHistory.nextViewOptions.disableBack = false;

      }
    });

    //Logout
    $rootScope.logout = function () {
      authentication.logout();
      $scope.isLoggedIn = authentication.isLoggedIn();

      $ionicHistory.nextViewOptions({
        disableBack: true
      });

      $location.path("/app/login");
      $ionicHistory.nextViewOptions.disableBack = false;
    }

    

    $scope.onHelpPage = function () {
      return $location.path() == "/app/help";
    }
    
    $scope.enterHelp = function(){
      $location.path("/app/help");
    }

    $scope.settings = function(){
      $location.path("/app/settings");
    }

  })


  
  ;
})();