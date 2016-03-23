angular.module('tripMoney', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '../views/landing.html'
  })
  .state('trips', {
    url: '/trips',
    templateUrl: '../views/trips.html'
  })
  .state('trips.newTrip', {
    url: '/newTrip',
    templateUrl: '../views/newTrip.html'
  })
  .state('trips.currentTrip', {
    url: '/currentTrip',
    templateUrl: '../views/currentTrip.html'
  })
  .state('trips.pastTrips', {
    url: '/pastTrips',
    templateUrl: '../views/pastTrips.html'
  })
  .state('trips.pastTripSummary', {
    url: '/pastTripSummary',
    templateUrl: '../views/pastTripSummary.html'
  });
});
