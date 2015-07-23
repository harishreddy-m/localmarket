angular.module('offeringsApp').controller('displayController',['$scope','promiseData','customerService','growl','ngDialog',function($scope,promiseData,customerService,growl,ngDialog){

$scope.categories = promiseData;
if($scope.categories.length>0)
$scope.items = $scope.categories[0].items;

$scope.selected = function(i){
$scope.items = $scope.categories[i].items;
}

$scope.quantity='1 litre'

$scope.selectedTab='make';

$scope.add = function(itemselected,freq){
	$scope.selectedItem = itemselected;
	action = ngDialog.openConfirm({template: '/templates/popup-'+freq+'.html',
    scope: $scope});

    action.then(function(ok){
    	var order = {};
    	if(freq=='daily'){
    	order = {item:itemselected._id,frequency:freq,quantity:ok.quantity};
    	customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    			$scope.selectedTab='existing';
    		});
    	}else if(freq=='once'){
	    	order = {item:itemselected._id,frequency:freq,quantity:ok.quantity,deliverydate:ok.date};
    		customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    			$scope.selectedTab='existing';
    		});
    	}else if(freq=='monthly'){
	    	order = {item:itemselected._id,frequency:freq,quantity:$scope.quantity,deliveryday:$scope.day};
    		customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    			$scope.selectedTab='existing';
    		});

    	}
    },function(no){
    console.log(no);	
    });
}

$scope.date='';
$scope.day='';

}]);