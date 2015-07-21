angular.module('offeringsApp').controller('customerController',['$scope','customerService','growl',function($scope,customerService,growl){

$scope.profile={pincode:'553'};

$scope.save = function(){
	customerService.save($scope.profile).then(function(data){
		if(data=="success")
			growl.success("Saved",{ttl:5000});
	});
}

}]);