angular.module('tripMoney').controller('pastTripSummaryCtrl', function($scope, $stateParams, tripService, $state){
  var tripId = $stateParams._id;
  if (tripId === null) {
    $state.go('trips.pastTrips');
  }
  $scope.tripSummary = function(tripId) {
    tripService.showTripSummary(tripId).then(function(trip) {
      if (trip.data.tripType === 'flying') {
        $scope.roadTripPicture = './pictures/carousel.jpg';
      }
      else if (trip.data.tripType === 'driving') {
        $scope.roadTripPicture = './pictures/roadtrip4.jpg';
      }
    });
  };
  $scope.tripSummary(tripId);
  $scope.summaryExpenses = function(tripId) {
    tripService.getSummaryExpenses(tripId).then(function(expenses) {
      $scope.expenses = expenses.data;
    });
  };
  $scope.summaryExpenses(tripId);
});
