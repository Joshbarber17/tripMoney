angular.module('tripMoney').controller('pastTripsCtrl', function($scope, tripService, $state){
  $scope.roadTripPicture = './pictures/roadmap.png';
  $scope.getTrips = function() {
    tripService.getAllTrips().then(function(trips) {
      $scope.trips = trips.data;
      $scope.trips.forEach(function(trip) {
        if (trip.tripType === 'flying') {
          trip.icon = 'flight';
        }
        else if (trip.tripType === 'driving') {
          trip.icon = 'directions_car' ;
        }
      });
    });
  };
  $scope.getTrips();
  $scope.showTripSummary = function(trip) {
    $state.go('trips.pastTripSummary', {_id: trip._id});
  };
  $scope.deleteTrip = function (trip) {
    var confirm = window.confirm('Are you sure you want to delete this trip....forever?');
    if (confirm) {
      tripService.deleteExpenses(trip);
      tripService.deleteTrip(trip).then(function(){
        alert('Your trip has been deleted!');
        $scope.getTrips();
      });
    }
    else {
      return;
    }
  };
});
