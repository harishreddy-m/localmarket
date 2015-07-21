angular.module('offeringsApp').controller('displayController',['$scope','customerService','growl',function($scope,customerService,growl){

$scope.categories = [];
customerService.getItems().then(function(response){
	$scope.categories = response.data;
});

}]);