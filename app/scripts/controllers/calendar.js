(function() {
  'use strict';

  function CalendarController($scope, $rootScope, parseServies, $q) {
    $scope.events = [];
    parseServies.init();
    $scope.get_events = function(start, end, timezone) {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();

      console.log(new Date(y, m, 1));

      var payload = {
        group: "pc8rTAXqaq"
      }
      var defer = $q.defer();
      parseServies.get("Tasks", payload).then(function(data){
        if (!data.results.error) {
          var event = {};
          $scope.events = [];
          console.log(data)
          for (var i = 0; i < data.results.length; i++) {
            var due_date = new Date();
            if (data.results[i].due !== undefined) {
                due_date = new Date(data.results[i].due);
            }
            // console.log(moment.utc(moment(data.results[i].due)))
            event = {
              title: data.results[i].name,
              start: due_date,
            };
            $scope.events.push(event);
            console.log($scope.events)
          } 
        }
        else 
        {
          $scope.login_error = 'Your username or password is incorrect';
        }
      })

      return defer.promise; 
    };

    // TODO: do modal popup here:
    // $scope.alertOnEventClick = function( event, allDay, jsEvent, view ) {
    //     // $scope.alertMessage = (event.title + ': Clicked ');
    // };

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            // TODO: allow edit
            // editable: true,
            header: {
                left: '',
                center: 'title',
                right: 'today, prev,next',
            },
            // TODO: turn on
            // eventClick: $scope.alertOnEventClick,
            eventRender: $scope.eventRender,
        }
    };

    $scope.eventRender = function( event, element, view ) {
      var innerText = element.context.innerText;
      var position = 0;
      while (element.context.innerText.charAt(position) !== 'a' && element.context.innerText.charAt(position) !== 'p' && position < element.context.innerText.length)
      {
        position++;
      };
      position++;
      element.context.innerText = [innerText.slice(0, position), "m", innerText.slice(position)].join('');
    };

    $scope.eventsCallback = function (start, end, timezone, callback) {
      // TODO: pass in current view date and time and cache data
      $scope.get_events(start, end, timezone).then(function() {
        callback($scope.events);
      });
    };

    // send data to calendar
    $scope.eventSources = [$scope.eventsCallback];
  }

  angular
    .module('cfgApp')
    .controller('CalendarController', CalendarController);

})();