


'use strict';

/**
 * @ngdoc overview
 * @name mySiteApp
 * @description
 * # mySiteApp
 *
 * Main module of the application.
 */
angular
  .module('cfgApp', [
    'ui.router',
  ])
  .config(function ($stateProvider) {
    // $routeProvider
    //   .when('/', {
    //     templateUrl: 'views/main.html',
    //     controller: 'MainCtrl',
    //     controllerAs: 'main'
    //   })
    //   .when('/about', {
    //     templateUrl: 'views/about.html',
    //     controller: 'AboutCtrl',
    //     controllerAs: 'about'
    //   })
    //   .otherwise({
    //     redirectTo: '/'
    //   });
    // $urlRouterProvider
    //   .otherwise("/");

    $stateProvider

      .state('login', 
      {
        url: "/",
        templateUrl: 'views/login.html',
        data: {
        },
        controller: 'MainCtrl',
      })

    
  });

