angular.module('tripMoney').service('tripService', function($http){
  this.makeNewTrip = function(newTrip) {
      return $http ({
        method: 'POST',
        url: '/api/trips',
        data: newTrip
      });
  };
  this.getCurrentTrip = function(){
      return $http ({
        method: 'GET',
        url: '/api/getCurrentTrip',
      });
  };
  this.makeNewExpense = function(expense) {
    return $http ({
      method: "POST",
      url: '/api/expense',
      data: expense,
    });
  };
  this.getExpenses = function() {
    return $http ({
      method: "GET",
      url: '/api/expenses'
    });
  };
  this.deleteExpense = function(expense) {
    return $http ({
      method: "DELETE",
      url: '/api/expenses/' + expense._id,
    });
  };
  this.checkForCurrentTrip = function() {
    return $http ({
      method: "GET",
      url: '/api/getCurrentTrip'
    });
  };
  this.endCurrentTrip = function() {
    return $http ({
      method: "PUT",
      url: '/api/endCurrentTrip'
    });
  };
  this.getAllTrips = function() {
    return $http ({
      method: "GET",
      url: 'api/getAllTrips'
    });
  };
});
