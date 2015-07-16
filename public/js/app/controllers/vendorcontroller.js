angular.module('offeringsApp').controller('VendorController', ['$scope','vendorService','FileUploader','growl','$timeout', function($scope,vendorService,FileUploader,growl,$timeout) {
  $scope.pincode = '201014';
  $scope.vendors=[];
  $scope.selections=[]
  $scope.gridOptions = {
        enableSorting: true,
        enableColumnResizing :true,
        enableGridMenu:true,
        columnDefs: [
          { name:'Name', field: 'name' },
          { name:'email', field: 'email' },
          { name:'phone', field: 'phone' },
          { name:'address', field: 'address' ,enableSorting:false},
          { name:'Services', field: 'categories.join(",")',enableSorting:false},
          { name:'Areas', field: 'pincodes.join(",")',enableSorting:false}
        ]
      };
  
  $scope.search = function() {
    if ($scope.pincode) {
      vendorService.search($scope.pincode).then(function(data) {
        $scope.vendors=data;
        $scope.gridOptions.data=$scope.vendors;
      });
    }
  };

/**
remove vendor
*/
 $scope.remove = function () {
    vendorService.delete($scope.selections).then(function(){
      $scope.search();
    });
    $scope.selections=[];
  };


     $scope.gridOptions.onRegisterApi = function(gridApi){
       gridApi.selection.on.rowSelectionChanged($scope,function(row){
        if(row.isSelected){
          $scope.selections.push(row.entity._id);
        }else{
          $scope.selections.remove(row.entity._id);
        }
      });
 
      gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
        var msg = 'rows changed ' + rows.length;
        console.log(msg);
      });
    };

  /*
  Add vendor
  */
  $scope.vendor={};
  $scope.uploader= new FileUploader({url:'/vendor/new',formData:[$scope.vendor]});
  $scope.add = function(){
    if($scope.uploader.queue.length>0)
      $scope.uploader.queue[0].upload();
    else
      growl.error("Upload a image",{ttl:5000});  
  }
  $scope.uploader.onCompleteAll = function(fileItem, response, status, headers) {
    growl.success("Saved!",{ttl: 5000});
    $scope.uploader.clearQueue();    
  };
  $scope.uploader.onErrorItem = function(fileItem, response, status, headers) {
    growl.error("Failed",{ttl:5000});
      };
}]);