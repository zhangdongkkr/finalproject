/**
 * Created by kkrcentralit on 3/11/15.
 */
angular.module("contactApp")
.controller('bulkuploadCtrl', function($scope, $state, FileUploader, contactService) {
      $scope.uploader = new FileUploader({
        url: contactService.uploadUrl()
      });

      $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        $scope.ok();
        $state.go("home.contactList", {}, {reload: true});
      };
});
