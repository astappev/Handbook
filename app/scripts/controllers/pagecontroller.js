'use strict';

/**
 * @ngdoc function
 * @name handbook.controller:Page
 * @description
 * # Pagecontroller
 * Controller of the handbook
 */
angular.module('handbook')
    .controller('Page', function ($scope, $log, yqlService, DataCache) {
        $scope.$parent.query = '';

        $scope.getTop = function() {
            $scope.results = DataCache.get('top');

            if (!$scope.results) {
                yqlService.getAnalytics().then(
                    function(results) {
                        var data = results.data.query.results.json.rows;
                        DataCache.put('top', data);
                        $scope.results = data;
                    },
                    function() {
                        $log.error('Топ50 не загружен');
                    }
                );
            }
        };
    });
