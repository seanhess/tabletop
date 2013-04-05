///<reference path="def/jquery.d.ts"/>
///<reference path="def/angular.d.ts"/>
///<reference path="def/underscore.d.ts"/>

console.log("Register: App")
var app = angular.module('app', [], function ($routeProvider: ng.IRouteProvider, $locationProvider: ng.ILocationProvider) {
  $locationProvider.html5Mode(true)
  $routeProvider.when('/', {templateUrl: '/partials/home.html'})
  $routeProvider.otherwise({redirectTo: '/'})
})

angular.bootstrap($(document), ['app'])
