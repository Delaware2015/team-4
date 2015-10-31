(function() {
  'use strict';

  function CalendarCtrl($scope, $rootScope, parseServies, $q, $timeout, $state) {
    $scope.events = [];
    parseServies.init();
    // parseServies.logout();
    $scope.complete_event = function(data)
    {
      var payload = {
        status: "completed"
      }

      var query = new Parse.Query(Parse.Object.extend("Tasks"));
      query.equalTo("objectId", data.objectId);
      query.first({
        success: function(object) {
          console.log(object)
          var keys = Object.keys(payload);
          if (object) {

            for (var i = 0; i < keys.length; i++) {
              object.set(keys[i], payload[keys[i]]);
            }
            var result = object.save();
            result.then(function(){
              $state.go("planner");
            });
          } else {
            console.log("error")
          }
          
        },
        error: function(error) {
          console.log("error")
          
        }
      });
    }

    $scope.delete_event = function(data)
    {
      var payload = {
        status: "deleted"
      }

      var query = new Parse.Query(Parse.Object.extend("Tasks"));
      query.equalTo("objectId", data.objectId);
      query.first({
        success: function(object) {
          console.log(object)
          var keys = Object.keys(payload);
          if (object) {

            for (var i = 0; i < keys.length; i++) {
              object.set(keys[i], payload[keys[i]]);
            }
            var result = object.save();
            result.then(function(){
              $state.go("planner");
            });
          } else {
            console.log("error")
          }
          
        },
        error: function(error) {
          console.log("error")
          
        }
      });
    }

    $scope.update_event = function(data)
    {
      var payload = {
        name:data.name,
        description: data.description,
      }

      if (data.due != null && data.due != "") {
        payload.due = data.due
      };

      var query = new Parse.Query(Parse.Object.extend("Tasks"));
      query.equalTo("objectId", data.objectId);
      query.first({
        success: function(object) {
          console.log(object)
          var keys = Object.keys(payload);
          if (object) {

            for (var i = 0; i < keys.length; i++) {
              object.set(keys[i], payload[keys[i]]);
            }
            var result = object.save();
            result.then(function(){
              $state.go("planner");
            });
          } else {
            // defer.resolve({results:{error: "parseServies object does not exist", code: 404}});
            console.log("error")
          }
          
        },
        error: function(error) {
          console.log("error")
          
        }
      });
    }
    // var payload = {
    //   name: "name",
    //   description: "data.description,",
    //   objectId: "oZW6Z4bxee"
    // }

    // $scope.update_event()

    $scope.get_events = function(start, end, timezone) {
      console.log($rootScope.isInit)
      if (!$rootScope.isInit) {
        $rootScope.isInit = true;
        var where = {
          status: "active"
        }
        var payload = {
          where: where
        }
        var defer = $q.defer();
        parseServies.get("Tasks", payload).then(function(data){
          if (!data.results.error) {
            $rootScope.tasks = data.results;
            var event = {};
            $scope.events = [];
            for (var i = 0; i < data.results.length; i++) {
              var due_date = new Date();
              if (data.results[i].due !== undefined) {
                  due_date = new Date(moment.utc(moment(data.results[i].due)));
              }
              // console.log(moment.utc(moment(data.results[i].due)))
              event = {
                title: data.results[i].name,
                start: due_date,
                objectId: data.results[i].objectId,
                description: data.results[i].description,
                due: data.results[i].due,
                name: data.results[i].name
              };
              $scope.events.push(event);
              defer.resolve({results: $scope.events});
            } 
          }
          else 
          {
            $scope.login_error = 'error';
          }
        })
        return defer.promise; 
      } else {
        location.reload();
      } 
      
    };

    $scope.add_task = function(data)
    {
      var payload = {
        name:data.name,
        description: data.description,
        due: data.due,
        status: "active"
      }
      parseServies.post("Tasks", payload);
    }

    
    $scope.alertOnEventClick = function( date, jsEvent, view){
      $scope.alertMessage = (date.title + ' was clicked ');
      $rootScope.specific_task = date;
      $state.transitionTo("detail", date, {
        reload: false
      });
    };

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: '',
                center: 'title',
                right: 'today, prev,next',
            },
            // TODO: turn on
            eventClick: $scope.alertOnEventClick,
            eventRender: $scope.eventRender,
        }
    };
    $scope.eventRender = function( event, element, view ) {
        element.attr({'tooltip': event.title,
                     'tooltip-append-to-body': true});
        $compile(element)($scope);
    };

    $scope.eventsCallback = function (start, end, timezone, callback) {
      console.log("here")
      if (!$rootScope.isInit) {
        $scope.get_events(start, end, timezone).then(function() {
          callback($scope.events);
          console.log($scope.eventSources)
          if ($scope.events) {
            $scope.memory = $scope.events;
            console.log($scope.memory)
          } 
        });
      } else
      {
        location.reload();
        return null;
      }
    };

    // send data to calendar
    $scope.eventSources = [$scope.eventsCallback || $scope.memory];
  }

  angular
    .module('cfgApp')
    .controller('CalendarCtrl', CalendarCtrl);

})();