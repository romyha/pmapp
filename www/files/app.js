// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('pm', ['ionic', 'starter.controllers', 'Scope.safeApply', 'starter.auth'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'files/app/menu.html',
        controller: 'AppCtrl'
      })



      .state('app.camera', {
        url: '/camera',
        views: {
          'menuContent': {
            templateUrl: 'files/camera/camera.html',
            controller: 'cameraCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'files/auth/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.register', {
        url: '/register',
        views: {
          'menuContent': {
            templateUrl: 'files/auth/register.html',
            controller: 'registerCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.devices', {
        url: '/devices',
        views: {
          'menuContent': {
            templateUrl: 'files/home/listing.html',
            controller: 'listingCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.device', {
        url: '/device',
        views: {
          'menuContent': {
            templateUrl: 'files/deviceDetail/deviceDetail.html',
            controller: 'detailCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.changeadd', {
        url: '/device/change/new',
        views: {
          'menuContent': {
            templateUrl: 'files/addPages/newChange.html',
            controller: 'changeCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.changeedit', {
        url: '/device/change/edit',
        views: {
          'menuContent': {
            templateUrl: 'files/editPages/editChange.html',
            controller: 'editChangeCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.deviceadd', {
        url: '/devices/new',
        views: {
          'menuContent': {
            templateUrl: 'files/addPages/newDevice.html',
            controller: 'addDeviceCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.deviceedit', {
        url: '/device/edit',
        views: {
          'menuContent': {
            templateUrl: 'files/editPages/editDevice.html',
            controller: 'editDeviceCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.help', {
        url: '/help',
        views: {
          'menuContent': {
            templateUrl: 'files/help/help.html',
            controller: 'helpCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'files/settings/settings.html',
            controller: 'settingsCtrl',
            controllerAs: 'vm'
          }
        }
      })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/devices');
  });
