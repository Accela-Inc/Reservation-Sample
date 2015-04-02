'use strict';

(function () {
  /* App Module */
    var siteReservationApp = angular.module('siteReservationApp', [
        'ngRoute',
        'ngAnimate',
        'ngSanitize',
        'ngResource',
        'ui.date',
        'leaflet-directive',
        'ngActivityIndicator',
        'ui.bootstrap',
        'angular-carousel',
        'angularjs-dropdown-multiselect',
        'kendo.directives',
        'mainController',
        'siteReservationDirectives',
        'siteReservationAnimations',
        'siteReservationFilters',
        'siteReservationServices'
    ]);

    siteReservationApp.constant('appConfig', {
        domain: "https://beta.kinsail.us",
        port: "8587",
        primaryPath: "/Campsites/locations/"
    });

    siteReservationApp.config(function($routeProvider) {
        $routeProvider.when('/', { 
            templateUrl: 'default.html'
        }).when('/detail/:siteId', {
            templateUrl: 'sitedetail.html',
            controller: 'SiteDetailCtrl',
            controllerAs: 'detail'
        }).otherwise({
            redirectTo: '/'
        });
    });
}());
