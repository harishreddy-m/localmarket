angular.module('offeringsApp').controller('displayController',['$scope','promiseData','customerService','growl','ngDialog',function($scope,promiseData,customerService,growl,ngDialog){

$scope.categories = promiseData;
if($scope.categories.length>0)
$scope.items = $scope.categories[0].items;

$scope.selected = function(i){
$scope.items = $scope.categories[i].items;
}

$scope.quantity='1 litre'

$scope.selectedTab='make';

$scope.addDaily = function(item){
	$scope.selectedItem = item;
	action = ngDialog.openConfirm({template: '/templates/popup-daily.html',
    scope: $scope});
    action.then(function(ok){
    	customerService.buy(item._id,'daily',$scope.quantity).then(function(){
    		growl.success('Added to your orders',{ttl:5000})
    		$scope.selectedTab='existing';
    	});
    },function(no){
    console.log(no);	
    });
    

}

}]);