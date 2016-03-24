angular.module('tripMoney').controller('landingCtrl', function($scope){
  $scope.flyOrDrive = function() {
    prompt('Will you be driving, or flying?');
  };
});
