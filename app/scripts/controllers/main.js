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

    parseServies.init();
    // console.log(Parse.User.current().id)
    $rootScope.currentUser = parseServies.getCurrentUser();
    // parseServiess.logout();
    // Parse.User.enableRevocableSession()
    $scope.init = function()
    {
      if ($rootScope.isInit == false) {
        parseServies.init();
        $rootScope.isInit = true;
      };
      
    }
    // console.log($rootScope.isInit)

    var credentials = {
      username: "test1",
      password: "test",
      // group: "pc8rTAXqaq"
    }
    $scope.signup = function(credentials)
    {
      delete credentials.passwordConfirm
      var user = new Parse.User();
      user.set("fname", credentials.fname);
      user.set("lname", credentials.lname);
      user.set("username", credentials.username);
      user.set("password", credentials.password);
      user.set("email", credentials.email);
      user.signUp(null, {
        success: function(data) {
          $state.go("profile");
        },
        error: function(data, error) {
        }
      });
    }

    $scope.reload = function ()
    {
      location.reload();
    }

    $scope.login = function(credentials)
    {
      parseServies.login(credentials);
      $state.go("profile");
    }

    $rootScope.logout = function(ObjectId)
    {
      parseServies.logout();
    }

    $rootScope.get_user = function(ObjectId)
    {
      var query = new Parse.Query(Parse.Object.extend("_User"));
      query["ObjectId"] = ObjectId;
      query._limit = 1;
      query.find({
        success: function(data) {
          $rootScope.currentUser.info = data[0].attributes;
          $scope.profile = data[0].attributes;
          $rootScope.info = $rootScope.currentUser.info.username
        },
        error: function(error) {
        }
      });
    }

    if($rootScope.currentUser)
    {
      $rootScope.get_user($rootScope.currentUser.id)
    }

    // $scope.get_tasks = function()
    // {
    //   $rootScope.currentUser = parseServies.getCurrentUser();
    //   var payload = {
    //     group: "pc8rTAXqaq"
    //   }
      
    //   parseServies.get("Tasks", payload).then(function(data){
    //     if (!data.results.error) {

    //       $scope.events = [];
    //       for (var i = 0; i < data.results.length; i++) {
    //         var event = {
    //           title: data.results[i].name,
    //           start: data.results[i].due,
    //           id: 999
    //         }
    //         $scope.events.push(data.results[i].name)
    //       };
    //     } else{
    //       $scope.login_error = 'Your username or password is incorrect';
    //     }
    //   })
    // }

    // $scope.get_tasks();



  });