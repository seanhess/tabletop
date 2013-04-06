///<reference path="../def/angular.d.ts"/>

interface TableParams {
    tableId: string;
}

console.log("Register - TableCtrl")

angular.module('app').controller('TableCtrl', function($scope, $http:ng.IHttpService, $routeParams: TableParams, angularFire:Function) {
    $scope.tableId = $routeParams.tableId
    // example of promise fulfillment
    // $scope.person = $http.get('/gogogo').then((p) => p.data)
    
    // Firebase connection
    var tableUrl = "https://tabletop.firebaseio.com/tables/" + $scope.tableId + "/objects"
    $scope.objects = angularFire(tableUrl, $scope, "objects", [])
    
    $scope.onDrop = function(item:IDroppedItem) {
        $scope.objects.push({
          imageUrl: item.url
        })
    }
})
