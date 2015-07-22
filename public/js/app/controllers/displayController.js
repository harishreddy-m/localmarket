angular.module('offeringsApp').controller('displayController',['$scope','promiseData','customerService','growl','ngDialog',function($scope,promiseData,customerService,growl,ngDialog){

$scope.categories = promiseData;
if($scope.categories.length>0)
$scope.items = $scope.categories[0].items;

$scope.selected = function(i){
$scope.items = $scope.categories[i].items;
}

$scope.addDaily = function(itemId){
	action = ngDialog.openConfirm({template: '/templates/popup-daily.html',
    scope: $scope});
    action.then(function(ok){
    	customerService.buy(itemId,'daily');
    },function(no){
    console.log(no);	
    });
    

}

}]);