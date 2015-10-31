


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
        controller: 'CalendarCtrl',
      })

      .state('profile', 
      {
        url: "/profile",
        templateUrl: 'views/profile.html',
        data: {
        },
        controller: 'MainCtrl',
      })

      .state('registration', 
      {
        url: "/registration",
        templateUrl: 'views/registration.html',
        data: {
        },
        controller: 'MainCtrl',
      })

      .state('resource', 
      {
        url: "/resource",
        templateUrl: 'views/resource.html',
        data: {
        },
        controller: 'MainCtrl',
      })

      .state('planner', 
      {
        url: "/planner",
        templateUrl: 'views/planner.html',
        data: {
        },
        controller: 'CalendarCtrl',
      })

      .state('social', 
      {
        url: "/social",
        templateUrl: 'views/social.html',
        data: {
        },
        controller: 'MainCtrl',
      })

    
  });

