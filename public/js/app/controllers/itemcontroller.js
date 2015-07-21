angular.module('offeringsApp').controller('itemController',['$scope','shopService','growl',function($scope,shopService,growl){

$scope.categories = [];
$scope.items = [];
shopService.getCategories().then(function(response){
	
	angular.forEach(response.data,function(name,key){
		$scope.categories.push({label:name,value:key});	
	});
	$scope.selectedCategory=$scope.categories[0];
	$scope.items[0] = $scope.getItemForcategory(0);
});

$scope.getItemForcategory = function(){
	if(!$scope.items[$scope.selectedCategory.value]){
		shopService.getItemForCategory($scope.selectedCategory.label).then(function(response){
			if(response.data!='noitems'){
				$scope.items[$scope.selectedCategory.value]=response.data;
			}
	});
	}
	
}

}]);