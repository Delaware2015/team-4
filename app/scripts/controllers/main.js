'use strict';

/**
 * @ngdoc function
 * @name cfgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfgApp
 */
angular.module('cfgApp')
  .controller('MainCtrl', function ($scope, parseServies, $rootScope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    parseServies.init();
    // parseServies.logout();
    $rootScope.currentUser = parseServies.getCurrentUser();
    var credentials = {
      username: "test1",
      password: "test",
      // group: "pc8rTAXqaq"
    }
    $scope.signup = function(credentials)
    {
        var credentials = {
          // username: "test1",
          // password: "test",
          // group: "pc8rTAXqaq"
        }
        console.log("here")
        parseServies.signup(credentials).then(function(data){
        if (!data.results.error) {
          console.log(data.results);
        } else{
          console.log(data.results.error);
          $scope.login_error = 'Your username or password is incorrect';
        }
      })
    }
    $scope.login = function(credentials)
    {
    	parseServies.login(credentials).then(function(data){
        if (!data.results.error) {
        } else{
          $scope.login_error = 'Your username or password is incorrect';
        }
      })
    }
    // $scope.login(credentials);
    // $rootScope.currentUser = parseServies.getCurrentUser();
    // console.log($rootScope.currentUser)
    $scope.get_tasks = function(credentials)
    {
      $rootScope.currentUser = parseServies.getCurrentUser();
      var payload = {
        group: "pc8rTAXqaq"
      }

      parseServies.get("Tasks", payload).then(function(data){
        if (!data.results.error) {
        } else{
          $scope.login_error = 'Your username or password is incorrect';
        }
      })
    }

    // $scope.get_task();
  });
