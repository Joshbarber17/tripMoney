angular.module('tripMoney').controller('currentTripCtrl', function($scope, tripService, $state){
  tripService.getCurrentTrip().then(function(res){
    $scope.thisTrip = res.data;
    if ($scope.thisTrip.tripType === 'flying') {
      $scope.roadTripPicture = './pictures/airplane1.jpg';
    }
    else if ($scope.thisTrip.tripType === 'driving'){
      $scope.roadTripPicture = './pictures/roadtrip5.jpg';
    }
  });
  $scope.submitExpense = function(expenseCost, expenseCategory, expenseBiz, expenseCity, expenseState) {
    var newExpense = {cost: expenseCost, category: expenseCategory, businessName: expenseBiz, businessCity: expenseCity, businessState: expenseState};
    tripService.makeNewExpense(newExpense).then(getCurrentExpenses);
    $scope.expenseCost = '';
    $scope.expenseCategory = '';
    $scope.expenseBiz = '';
    $scope.expenseCity = '';
    $scope.expenseState = '';
  };
  var getCurrentExpenses = function() {
    tripService.getExpenses().then(function(res){
      $scope.expenses = res.data;
    });
  };
  getCurrentExpenses();
  $scope.deleteExpense = function(expense) {
    var confirm = window.confirm('Are you sure you want to delete this expense?');
    if (confirm) {
      tripService.deleteExpense(expense).then(getCurrentExpenses);
    }
    else {
      return;
    }
  };
  $scope.endCurrentTrip = function() {
    var confirm = window.confirm('Are you sure you want to end this trip?');
    if (confirm) {
      tripService.endCurrentTrip().then(function() {
        $state.go('trips.pastTrips');
      });
    }
    else {
      return;
    }
  };
});
