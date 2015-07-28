angular.module('offeringsApp').controller('ordersController',['$scope','growl','customerService',function($scope,growl,customerService){
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
                               { name:'Quantity', field: 'quantity'},
                               { name:'Order Date', field: 'orderdate' },
                               { name:'Delivery Date', field: 'deliverydate'},
                               { name:'Delivery Day', field: 'deliveryday',enableSorting:false}
                    ]};
                    customerService.getOrders(row.entity._id).then(function(res){
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
 
     var promise=customerService.getCustomers();
     promise.then(function (res) {
        $scope.customers=res['data'];
        $scope.gridOptions.data=$scope.customers;
        
      });
        
      
      
      



}]);