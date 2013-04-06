///<reference path="../def/angular.d.ts"/>

interface TableParams {
    tableId: string;
}

console.log("Register - TableCtrl")

angular.module('app').controller('TableCtrl', function($scope, $http:ng.IHttpService, $routeParams: TableParams) {
    $scope.tableId = $routeParams.tableId
    $scope.person = $http.get('/gogogo').then((p) => p.data)
})
