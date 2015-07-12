angular.module('offeringsApp').service('vendorService', function($http){
	this.search = function(pincode){
		var promise = $http.get('/vendor/pincode/'+pincode).then(function (response) {
        return response.data;
      });
		return promise
	}
});