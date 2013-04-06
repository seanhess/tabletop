
console.log("Register: App")
var app = angular.module('app', ['firebase'], function ($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) {
    console.log(" - routing")
    $locationProvider.html5Mode(true)
    $routeProvider.when('/', {templateUrl: '/partials/home.html'})
    $routeProvider.when('/tables/:tableId', {templateUrl: '/partials/table.html', controller: "TableCtrl"})
    $routeProvider.otherwise({redirectTo: '/'})
})
