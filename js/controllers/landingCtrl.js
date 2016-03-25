angular.module('tripMoney').controller('landingCtrl', function($scope, $state){
  $scope.flyOrDrive = function() {
    var trip = prompt('Will you be driving, or flying?');
    $state.go('trips.newTrip', {travelType: trip});
  };
});
