angular.module('offeringsApp').controller('ordersController',['$scope','growl','adminService',function($scope,growl,adminService){
      $scope.gridOptions = {
        expandableRowTemplate: '../templates/expandableRowTemplateforOrders.html',
        expandableRowHeight: 150,
        enableSorting: true,
        enableColumnResizing :true,
        enableGridMenu:true,
        dataType:'json',
        onRegisterApi: function (gridApi) {
            gridApi.expandable.on.rowExpandedStateChanged($scope, function (row) {
                if (row.isExpanded) {
                    row.entity.subGridOptions = {
                    columnDefs: [
                               { name:'Product Name', field: 'item.name' },
                               { name:'Quantity', field: 'quantity'}
                    ]};
                    adminService.getCustomerOrdersForToday(row.entity._id).then(function(res){
                    //check if the order is to be delivered today based on frequency logic
                    row.entity.subGridOptions.data = res['data'];
                  });
                  
                  
                }
            });
        }
      }
 
      $scope.gridOptions.columnDefs = [
              {name:'Customer Name',field:'whois.username'},
              {name:'Total Order',field:'orders.length'},
              {name:'Email',field:'whois.email'}
        ];
 
     var promise=adminService.getCustomers();
     promise.then(function (res) {
        $scope.customers=res['data'];
        $scope.gridOptions.data=$scope.customers;
      });
}]);