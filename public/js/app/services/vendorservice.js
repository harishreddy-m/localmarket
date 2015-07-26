angular.module('offeringsApp').service('vendorService', function($http){
	this.search = function(pincode){
		var promise = $http.get('/vendor/pincode/'+pincode).then(function (response) {
		angular.forEach(response.data,function(vendor){
			vendor.categories=vendor.categories.join(",");
			vendor.pincodes=vendor.pincodes.join(",");
		})	
        return response.data;
      });
		return promise
	}
	this.delete = function(vendorsIds){
		var promise = $http.post('/vendor/delete/',{"todelete":vendorsIds}).then(function (response) {
        return response.data;
      });
		return promise
	}

	this.update = function(vendor,col){
		var promise = $http.post('/vendor/update/',{"toupdate":vendor,"field":col}).then(function (response) {
        return response.data;
      });
		return promise;
	}


});