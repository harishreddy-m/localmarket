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
                               { name:'Product Name', field: 'item' },
                               { name:'Quantity', field: 'quantity',enableCellEdit: true}
                    ]};
                    adminService.getCustomerOrdersForToday(row.entity._id).then(function(res){
                    row.entity.subGridOptions.data = res['data'];
                  });
                  
                  
                }
            });
             gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            console.log( 'edited row id:' + rowEntity._id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue );
            if(!isNaN(newValue) )
            adminService.updateBilledOrder(rowEntity,newValue);
            $scope.$apply();

          });
        }
      }
 
      $scope.gridOptions.columnDefs = [
              {name:'Customer Name',field:'whois.username'},
              {name:'Pincode',field:'pincode'},
              {name:'Email',field:'whois.email'}
        ];
 
     var promise=adminService.getCustomers();
     promise.then(function (res) {
        $scope.customers=res['data'];
        $scope.gridOptions.data=$scope.customers;
      });
}]);