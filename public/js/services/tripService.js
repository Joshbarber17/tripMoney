angular.module('tripMoney').service('tripService', function($http){
  this.makeNewTrip = function(newTrip) {
      return $http ({
        method: 'POST',
        url: '/api/trips',
        data: newTrip
      });
  };
});
