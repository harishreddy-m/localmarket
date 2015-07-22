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

	this.buy = function(itemId,freq){
		var promise = $http.post('/customer/buy',{item:itemId,frequency:freq}).then(function (response) {
        return response.data;
      });
		return promise
	}
	
});