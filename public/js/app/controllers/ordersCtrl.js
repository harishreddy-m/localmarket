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
                               { name:'Product Name', field: 'item' ,enableCellEdit: false},
                               { name:'Quantity', field: 'quantity'}
                    ],
                    onRegisterApi: function (gridApi) {
                        gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            if(!isNaN(newValue) )
            adminService.updateBilledOrder(row.entity._id,rowEntity.item,newValue);
            $scope.$apply();

          });
                    }
                    };
                    adminService.getCustomerOrdersForToday(row.entity._id).then(function(res){
                    row.entity.subGridOptions.data = res['data'];
                  });
                  
                  
                }
            });
             
        }
      }
 
      $scope.gridOptions.columnDefs = [
              {name:'Customer Name',field:'whois.username'},
              {name:'Pincode',field:'pincode'},
              {name:'Email',field:'whois.email'},
              {name:'Due Amount',field:'dueamount'}
        ];
 
     var promise=adminService.getCustomers();
     promise.then(function (res) {
        $scope.customers=res['data'];
        $scope.gridOptions.data=$scope.customers;
      });
}]);