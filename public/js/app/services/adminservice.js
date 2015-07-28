angular.module('offeringsApp').service('adminService', function($http){


	this.getCustomers=function(){
		return $http.get('/admin/customers');
	}


	this.getCustomerOrdersForToday=function(customerId){
		return $http.get('/admin/customer/'+customerId+"/orders");
	}

});