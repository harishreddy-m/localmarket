angular.module('offeringsApp').service('Authentication', function($http){

	this.isAdmin=function(){
		return $http({method: 'GET', url: '/user/role'});
	}

});