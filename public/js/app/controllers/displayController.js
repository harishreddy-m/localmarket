angular.module('offeringsApp').controller('displayController',['$scope','customerService','growl',function($scope,customerService,growl){

$scope.categories = [];
customerService.getItems().then(function(response){
	if(response.data!='noitems');
	$scope.categories = response.data;
	if($scope.categories.length>0)
	$scope.items = $scope.categories[0].items;
});

$scope.selected = function(i){
$scope.items = $scope.categories[i].items;
}

}]);