angular.module('tripMoney').directive('navBar', function(){
  return {
    retrict: "E",
    scope: {
      picture: '='
    },
    templateUrl: './views/navPicture.html'
  };
});
