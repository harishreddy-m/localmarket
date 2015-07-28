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
	this.getOrders = function(id){
		return $http.get('/customer/orders',id);
	}

	this.buy = function(order){
		var promise = $http.post('/customer/buy',order).then(function (response) {
        return response.data;
      });
		return promise
	}

	this.getExistingOrders = function(order){
		var promise = $http.get('/customer/orders',order).then(function (response) {
        return response.data;
      });
		return promise
	}

	this.deleteOrder = function(order){
		var promise = $http.post('/customer/delete',{orderId:order}).then(function (response) {
        return response.data;
      });
		return promise;
	}
	this.getCustomers=function(){
		return $http.get('/customer/cus');

	}
	
});