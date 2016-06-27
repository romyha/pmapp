angular.module('pm', ['ionic', 'starter.controllers', 'Scope.safeApply', 'starter.auth', 'ngRoute', 'ngCordova', 'ionic-datepicker'])

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

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.navBar.alignTitle('center');
    
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'files/app/menu.html',
        controller: 'AppCtrl'
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
        url: '/devices/:code',
        views: {
          'menuContent': {
            templateUrl: 'files/deviceDetail/deviceDetail.html',
            controller: 'detailCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.changeadd', {
        url: '/devices/:code/changes',
        views: {
          'menuContent': {
            templateUrl: 'files/addPages/addChange.html',
            controller: 'changeCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.changeedit', {
        url: '/devices/:code/changes/:changeid/edit',
        views: {
          'menuContent': {
            templateUrl: 'files/editPages/editChange.html',
            controller: 'editChangeCtrl',
            controllerAs: 'vm'
          }
        }
      })

      .state('app.deviceadd', {
        url: '/devices/:code/new',
        views: {
          'menuContent': {
            templateUrl: 'files/addPages/addDevice.html',
            controller: 'addDeviceCtrl',
            controllerAs: 'vm'
          }
        }
      })
      
      .state('app.deviceedit', {
        url: '/devices/:code/edit',
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
