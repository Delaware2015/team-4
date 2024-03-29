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
  'ui.bootstrap',
  'datePicker'
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

    .state('resources', 
    {
      url: "/resources",
      templateUrl: 'views/resources.html',
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

    .state('main', 
    {
      url: "/main",
      templateUrl: 'views/main.html',
      data: {
      },
      controller: 'MainCtrl',
    })

    .state('detail', 
    {
      url: "/detail",
      templateUrl: 'views/detail.html',
      data: {
      },
    })

    .state('checklist', 
    {
      url: "/checklist",
      templateUrl: 'views/checklist.html',
      data: {
      },
      controller: 'MainCtrl',
    })

    .state('edit', 
    {
      url: "/edit",
      templateUrl: 'views/edit.html',
      data: {
      },
      controller: 'MainCtrl',
    })

    .state('resourcesnot', 
    {
      url: "/resourcesnot",
      templateUrl: 'views/resourcesnot.html',
      data: {
      },
      controller: 'MainCtrl',
    })

        .state('awardsnot', 
    {
      url: "/awardsnot",
      templateUrl: 'views/awardsnot.html',
      data: {
      },
      controller: 'MainCtrl',
    })


    .state('awards', 
    {
      url: "/awards",
      templateUrl: 'views/awards.html',
      data: {
      },
      controller: 'MainCtrl',
    })


  });

