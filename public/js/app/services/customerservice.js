angular.module('offeringsApp').service('customerService', function($http){
	this.save = function(profile){
		var promise = $http.post('/customer/profile',profile).then(function (response) {
        return response.data;
      });
		return promise
	}

	this.getItems = function(){
		return $http.get('/customer/items');
	}
	
});