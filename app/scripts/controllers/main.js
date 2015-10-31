'use strict';

/**
 * @ngdoc function
 * @name cfgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfgApp
 */
angular.module('cfgApp')
  .controller('MainCtrl', function ($scope, parseServies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    parseServies.init();

    $scope.signup = function(credentials)
    {
        var credentials = {
          username: "test",
          password: "test",
        }
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
    console.log(credentials);
  	parseServies.login(credentials).then(function(data){
      if (!data.results.error) {
      } else{
        $scope.login_error = 'Your username or password is incorrect';
      }
    })
    }
  });
