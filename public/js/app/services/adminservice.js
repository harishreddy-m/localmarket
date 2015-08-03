angular.module('offeringsApp').service('adminService', function($http){


	this.getCustomers=function(){
		return $http.get('/admin/customers');
	}


	this.getCustomerOrdersForToday=function(customerId){
		return $http.get('/admin/customer/'+customerId+"/orders");
	}
	
	this.updateBilledOrder=function(customerid,item,newValue){
		return $http.post('/admin/edit/order',{customer:customerid,name:item,quantity:newValue});
	}

});