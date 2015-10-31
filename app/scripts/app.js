


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
    'parseServies',
    'ui.calendar',
    'ui.bootstrap'
  ])
  .controller('AppCtrl', function ($rootScope) {
    $rootScope.isInit = false;
  
  })
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
        url: "/login",
        templateUrl: 'views/login.html',
        data: {
        },
        controller: 'MainCtrl',
      })

      .state('calendar', 
      {
        url: "/calendar",
        templateUrl: 'views/calendar.html',
        data: {
        },
        controller: 'CalendarController',
      })

    
  });

