(function () {
  angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $timeout, $location, authentication, $ionicPopover, paths) {

      //avoid changing screen orientation
      document.addEventListener("deviceready", function () { screen.lockOrientation('portrait'); }, false);

      //tell app if running on device or in browser
      if(!!window.cordova) {
        $rootScope.browser = false;        
      } else {
        $rootScope.browser = true;
      }

      $scope.openPopover = function ($event) {
        // Init popover on load
        $ionicPopover.fromTemplateUrl('files/app/popover.html', {
          scope: $scope,
        }).then(function (popover) {
          $scope.popover = popover;
          $scope.popover.show($event);
        });
      };

      $rootScope.testMode = false;

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:   
      $scope.$on('$ionicView.enter', function (e) {
        $scope.isLoggedIn = authentication.isLoggedIn();

        if (!$rootScope.testMode && !authentication.isLoggedIn() && ($location.path() != "/app/register")) {
          paths.newPathDisableBack("/app/login");
        }
      });

      //Logout
      $rootScope.logout = function () {
        authentication.logout();
        $scope.isLoggedIn = authentication.isLoggedIn();

        paths.newPathDisableBack("/app/login");
      }



      $scope.onHelpPage = function () {
        return $location.path() == "/app/help";
      }

      $scope.enterHelp = function () {
        $scope.popover.hide();
        $location.path("/app/help");
      }

      $scope.settings = function () {
        $scope.popover.hide();
        $location.path("/app/settings");
      }
      
      $scope.onSettings = function () {
        return $location.path() == "/app/settings";
      }

    })



    ;
})();