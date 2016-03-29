angular.module('tripMoney').controller('currentTripCtrl', function($scope, tripService){
  tripService.getCurrentTrip().then(function(res){
    $scope.thisTrip = res.data;
    if ($scope.thisTrip.tripType === 'flying') {
      $scope.roadTripPicture = './pictures/airplane1.jpg';
    }
    else if ($scope.thisTrip.tripType === 'driving'){
      $scope.roadTripPicture = './pictures/roadtrip5.jpg';
    }
  });
  $scope.submitExpense = function(expenseCost, expenseCategory) {
    var newExpense = {cost: expenseCost, category: expenseCategory};
    tripService.makeNewExpense(newExpense).then(getCurrentExpenses);
    $scope.expenseCost = '';
    $scope.expenseCategory = '';
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
});
