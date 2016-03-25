angular.module('tripMoney', ['ui.router']).config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '../views/landing.html',
    controller: 'landingCtrl'
  })
  .state('trips', {
    url: '/trips',
    templateUrl: '../views/trips.html'
  })
  .state('trips.newTrip', {
    url: '/newTrip',
    templateUrl: '../views/newTrip.html',
    controller: 'newTripCtrl',
    params: {travelType: null}
  })
  .state('trips.currentTrip', {
    url: '/currentTrip',
    templateUrl: '../views/currentTrip.html',
    controller: 'currentTripCtrl'
  })
  .state('trips.pastTrips', {
    url: '/pastTrips',
    templateUrl: '../views/pastTrips.html',
    controller: 'pastTripsCtrl'
  })
  .state('trips.pastTripSummary', {
    url: '/pastTripSummary',
    templateUrl: '../views/pastTripSummary.html',
    controller: 'pastTripSummaryCtrl'
  });
});
