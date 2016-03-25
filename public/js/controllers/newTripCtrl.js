angular.module('tripMoney').controller('newTripCtrl', function($scope, tripService, $stateParams){
  var picType = function($stateParams) {
    if ($stateParams.travelType === 'driving') {
        $scope.roadTripPicture = './pictures/roadtrip.jpg';
        return;
    }
    else if ($stateParams.travelType === 'flying') {
        $scope.roadTripPicture = './pictures/airplaneRunway.jpg';
        return;
    }
  };
  picType($stateParams);
  $scope.newTrip = function(ddate, rdate, city, state, desc) {
    var confirm = window.confirm('Are you sure you want to submit this New Trip?');
    if (confirm) {
      var newTrip = {departDate: ddate, returnDate: rdate, city: city, state: state, description: desc, status: 'current'};
      tripService.makeNewTrip(newTrip);
      $scope.departDate = '';
      $scope.returnDate = '';
      $scope.city= '';
      $scope.state='';
      $scope.description='';
    }
    else {
      return ;
    }
  };
});
