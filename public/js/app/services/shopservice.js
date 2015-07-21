angular.module('offeringsApp').service('shopService', function($http){

	this.getCategories = function(){
		return $http.get('/shop/categories');
	}

	this.getItemForCategory = function(catname){
		return $http.get('/shop/items/'+catname);	
	}
	
});