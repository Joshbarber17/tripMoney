angular.module('tripMoney').directive('navBar', function(){
  return {
    retrict: "E",
    scope: {
      picture: '='
    },
    templateUrl: './views/navPicture.html',
    controller: function($scope, $state) {
      $scope.flyOrDrive = function() {
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
      };
    }
  };
});
