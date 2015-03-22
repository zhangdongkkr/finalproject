'use strict';

angular.module('contactApp')
  .controller('NavbarCtrl', function ($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.openBulkUpload = function(size){
      var modalInstance = $modal.open({
        templateUrl: 'app/bulkupload/bulkupload.html',
        controller: 'ModalCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('ModalCtrl', function($scope, $modalInstance, items){
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
