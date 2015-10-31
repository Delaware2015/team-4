'use strict';

/**
 * @ngdoc function
 * @name cfgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfgApp
 */
angular.module('cfgApp')
  .controller('MainCtrl', function ($scope, parseServies, $rootScope, $compile, $q, $state) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    
    // parseServies.logout();
    parseServies.init();
    $scope.init = function()
    {
      if ($rootScope.isInit == false) {
        parseServies.init();
        $rootScope.isInit = true;
      };
      
    }
    // console.log($rootScope.isInit)
    $scope.init()

    // $rootScope.currentUser = parseServies.getCurrentUser();

    var credentials = {
      username: "test1",
      password: "test",
      // group: "pc8rTAXqaq"
    }
    $scope.signup = function(credentials)
    {
      var user = new Parse.User();
      user.set("username", credentials.username);
      user.set("password", credentials.password);
      user.set("email", credentials.email);
      user.signUp(null, {
        success: function(data) {
          console.log(Parse.User.current())
        },
        error: function(data, error) {
          handleParseError(error.code);

          
        }
      });
    }

    $scope.login = function(credentials)
    {
      // Parse.User.logIn(credentials.username, credentials.password, {
      //   success: function(data) {
      //     $rootScope.currentUser = data;
      //   },
      //   error: function(data, error) {

      //   }
      // });
      $state.go("profile");
    }

    $scope.get_tasks = function()
    {
      $rootScope.currentUser = parseServies.getCurrentUser();
      var payload = {
        group: "pc8rTAXqaq"
      }
      
      parseServies.get("Tasks", payload).then(function(data){
        if (!data.results.error) {

          $scope.events = [];
          for (var i = 0; i < data.results.length; i++) {
            var event = {
              title: data.results[i].name,
              start: data.results[i].due,
              id: 999
            }
            $scope.events.push(data.results[i].name)
          };
        } else{
          $scope.login_error = 'Your username or password is incorrect';
        }
      })
    }

    $scope.get_tasks();

  });