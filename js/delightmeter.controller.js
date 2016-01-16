(function() {
    'use strict';

    angular.module('app', [])
        .controller('DelightMeterController', DelightMeterController);
    DelightMeterController.$inject = ['$scope', '$timeout'];

    function DelightMeterController($scope, $timeout) {
        /* validate star rating */
        $scope.validate = function() {
            $scope.delightError = false;
            angular.forEach($scope.formdata, function(value, key) {
                if (value === 0 && !$scope.delightError) {
                    $scope.delightError = true;
                    $timeout(function() {
                        $scope.delightError = false;
                    }, 3500);
                }
            });
            if ($scope.delightError)
                return false
            else
                return true;
        };
        $scope.cal = function() {
            var count = 0,
                percentValue = 0;
            /* calculating overall percentage  of happiness  */
            angular.forEach($scope.formdata, function(value, key) {
                percentValue = percentValue + ((parseInt(value) / 5) * 100);
                count++;
            });
            $scope.range = Math.round(percentValue / count);
        };

        $scope.clearData = function(data) {
            /* clear star values  */
            angular.forEach(data, function(value, key) {
                data[key] = 0;
            });
            $scope.range = 0;
        };
    }

})();