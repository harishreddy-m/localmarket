angular.module('offeringsApp').controller('displayController',['$scope','promiseData','customerService','growl','ngDialog','underscore',function($scope,promiseData,customerService,growl,ngDialog,_){

$scope.categories = promiseData;
if($scope.categories.length>0)
$scope.items = $scope.categories[0].items;

$scope.selected = function(i){
$scope.items = $scope.categories[i].items;
}

$scope.quantity='1'

$scope.selectedTab='make';

$scope.add = function(itemselected,freq){
	$scope.selectedItem = itemselected;
	var action = ngDialog.openConfirm({template: '/templates/popup-'+freq+'.html',
    scope: $scope});

    action.then(function(ok){
    	var order = {};
    	ok.quantity=parseFloat(ok.quantity);
    	if(freq=='daily'){
    	order = {item:itemselected._id,frequency:freq,quantity:ok.quantity};
    	customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    		});
    	}else if(freq=='once'){
	    	order = {item:itemselected._id,frequency:freq,quantity:ok.quantity,deliverydate:ok.date};
    		customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    		});
    	}else if(freq=='monthly'){
	    	order = {item:itemselected._id,frequency:freq,quantity:ok.quantity,deliveryday:ok.day};
    		customerService.buy(order).then(function(){
    			growl.success('Added to your orders',{ttl:5000})
    		});
    	}
    },function(no){
    console.log(no);	
    });
}

$scope.date='';
$scope.day='';

$scope.fetchOrders=function(){
customerService.getExistingOrders().then(function(data){
    $scope.existingOrders = data;
});
}

$scope.deleteOrder=function(order){
customerService.deleteOrder(order._id).then(function(data){
    growl.success("Deleted!",{ttl:5000});
    $scope.existingOrders=_.without($scope.existingOrders,order);
});
}

$scope.existingOrders = [];

}]);