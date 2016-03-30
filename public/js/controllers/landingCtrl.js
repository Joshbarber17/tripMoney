angular.module('tripMoney').controller('landingCtrl', function($scope, $state, tripService){
  $scope.flyOrDrive = function() {
    tripService.getCurrentTrip().then(function(response) {
      if (response.data.status === 'current') {
        alert('Please end current trip to begin a new trip');
      }
      else if (response.data.status !== 'current') {
        var trip = prompt('Will you be driving, or flying?');
        if (trip === null) {
          return;
        }
        else if (trip === 'flying') {
          $state.go('trips.newTrip', {tripType: trip});
        }
        else if (trip === 'driving') {
          $state.go('trips.newTrip', {tripType: trip});
        }
        else {
          alert('Please enter driving or flying');
        }
      }
    });
  };
  $scope.checkForCurrentTrip = function() {
    tripService.getCurrentTrip().then(function(response) {
      if (response.data.status === 'current') {
        return $state.go('trips.currentTrip');

      }
      else if (response.data.status !== 'current') {
        return alert('There is no trip in progress. Please start a new trip');
      }
    });
  };
});
