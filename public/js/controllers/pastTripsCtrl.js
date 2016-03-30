angular.module('tripMoney').controller('pastTripsCtrl', function($scope, tripService){
  $scope.roadTripPicture = './pictures/roadmap.png';
  $scope.trips = function() {
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
  $scope.trips();
});
