angular.module('offeringsApp').controller('VendorController', ['$scope','vendorService','FileUploader','growl','Upload', function($scope,vendorService,FileUploader,growl,Upload) {
  $scope.pincode = '201014';
  $scope.vendors=[];
  $scope.selections=[]
  $scope.gridOptions = {
        enableSorting: true,
        enableColumnResizing :true,
        enableGridMenu:true,
        columnDefs: [
          { name:'Name', field: 'name' },
          { name:'email', field: 'email' ,enableCellEdit: true},
          { name:'phone', field: 'phone' ,enableCellEdit: true},
          { name:'address', field: 'address' ,enableSorting:false,enableCellEdit: true},
          { name:'Services', field: 'categories',enableSorting:false,enableCellEdit: true},
          { name:'Areas', field: 'pincodes',enableSorting:false,enableCellEdit: true}
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

      gridApi.edit.on.afterCellEdit($scope,function(rowEntity, colDef, newValue, oldValue){
            console.log( 'edited row id:' + rowEntity._id + ' Column:' + colDef.name + ' newValue:' + newValue + ' oldValue:' + oldValue );
            vendorService.update(rowEntity,colDef.field);
            $scope.$apply();

          });
    };

 /*Import vendors
 */
 $scope.isUploading = false;
 $scope.csv=[];

$scope.addBulk = function(){
  $scope.isUploading = true;
 if ($scope.csv && $scope.csv.length) {
            for (var i = 0; i < $scope.csv.length; i++) {
                var file = $scope.csv[i];
                Upload.upload({
                    url: '/vendor/bulk',
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $scope.isUploading=false;
                    $scope.csv=[];
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                    $scope.isUploading=false;
                    $scope.csv=[];
                });
            }
        }
}

$scope.upload = function(files){
$scope.csv=files;
}



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
}]).filter('mapString', function() {
  return function(input) {
    if (!input){
      return '';
    } else {
      return input.join(",");
    }
  };
});