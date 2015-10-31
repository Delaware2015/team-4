'use strict';

/**
 * @ngdoc function
 * @name cfgApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfgApp
 */
angular.module('cfgApp')
  .controller('MainCtrl', function ($scope, parseServices) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.login = function(credentials)
    {
    	parseServies.login(credentials).then(function(data){
      if (!data.results.error) {
        console.log(data.results);
      } else{
        console.log(data.results.error);
        $scope.login_error = 'Your username or password is incorrect';
      }
    })
    }
  });
