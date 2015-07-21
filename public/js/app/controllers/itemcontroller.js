angular.module('offeringsApp').controller('itemController',['$scope','shopService','growl','Upload',function($scope,shopService,growl,Upload){

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
			}else{
                $scope.items[$scope.selectedCategory.value]=[];
            }
	});
	}
}
$scope.adding=false;

$scope.addItems = function(){
$scope.adding=true;
$scope.images=[];
$scope.item={};
$scope.item.category=$scope.selectedCategory.label;
}


$scope.add = function(){
	console.log('addItems');
 if ($scope.images && $scope.images.length) {
            for (var i = 0; i < $scope.images.length; i++) {
                var file = $scope.images[i];
                Upload.upload({
                    url: '/shop/new',
                    fields: $scope.item,
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $scope.adding=false;
                    $scope.items[$scope.selectedCategory.value].push($scope.item);
                    $scope.images=[];
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }
}

$scope.upload = function(files){
$scope.images=files;
}



}]);