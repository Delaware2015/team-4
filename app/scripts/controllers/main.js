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
    console.log($rootScope.currentUser);
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
      console.log(credentials)
      delete credentials.passwordConfirm
      var user = new Parse.User();
      user.set("fname", credentials.fname);
      user.set("lname", credentials.lname);
      user.set("username", credentials.username);
      user.set("password", credentials.password);
      user.set("email", credentials.email);
      user.signUp(null, {
        success: function(data) {
          console.log(Parse.User.current())
          $state.go("profile");
        },
        error: function(data, error) {
          console.log(error)
        }
      });
    }

    $scope.login = function(credentials)
    {
      parseServies.login(credentials).then(function(data)
      {
        var query = new Parse.Query(Parse.Object.extend("_User"));
        query["username"] = credentials.username;
        query._limit = 1;
        query.find({
          success: function(data) {
            $rootScope.currentUser = data[0].attributes;
            $scope.profile = data[0].attributes;
            $state.go("profile");
          },
          error: function(error) {
          }
        });
      })
    }

    $rootScope.logout = function(ObjectId)
    {
      parseServies.logout();
      $state.go("main");
    }

    $scope.get_user = function(ObjectId)
    {
      console.log("here")
      var query = new Parse.Query(Parse.Object.extend("_User"));
      query["ObjectId"] = ObjectId;
      query._limit = 1;
      query.find({
        success: function(data) {
          $rootScope.currentUser.info = data[0].attributes;
          $scope.profile = data[0].attributes;
          $rootScope.info = $rootScope.currentUser.info.username
          console.log($rootScope.currentUser)
        },
        error: function(error) {
        }
      });
    }

    if($rootScope.currentUser)
    {
      $scope.get_user($rootScope.currentUser.id)
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