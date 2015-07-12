angular.module('offeringsApp').controller('VendorController', ['$scope','vendorService','FileUploader','growl', function($scope,vendorService,FileUploader,growl) {
  $scope.pincode = '201014';
  $scope.vendors;
  $scope.search = function() {
    if ($scope.pincode) {
      vendorService.search($scope.pincode).then(function(data) {
        $scope.vendors = data;
              console.log(data);
      });
    }
  };
  $scope.vendor={name:"default"};
  $scope.uploader= new FileUploader({url:'/vendor/new',formData:[$scope.vendor]});
  $scope.add = function(){
    if($scope.uploader.queue.length>0)
    $scope.uploader.queue[0].upload();
    else
    growl.error("Upload a image",{ttl:5000});  
  }
  $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
    growl.success("Saved!",{ttl: 5000});
        $scope.uploader.clearQueue();    
  };
}]);