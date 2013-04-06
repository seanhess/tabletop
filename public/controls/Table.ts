///<reference path="../def/angular.d.ts"/>

interface TableParams {
    tableId: string;
}

console.log("Register - TableCtrl")

angular.module('app').controller('TableCtrl', function($scope, $http:ng.IHttpService, $routeParams: TableParams) {
    $scope.tableId = $routeParams.tableId
    $scope.person = $http.get('/gogogo').then((p) => p.data)
    $scope.objects = [{imageUrl:"http://magiccards.info/scans/en/rtr/5.jpg"}]
    
    $scope.onDrop = function(item:IDroppedItem) {
        console.log("dropped", item)
        $scope.objects.push({
          imageUrl: item.url
        })
    }
})
