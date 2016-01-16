(function() {
    'use strict';

    angular.module('app')
        .directive('rating', rating);

    function rating() {
        return {
            restrict: 'EAC',
            scope: {
                ratingValue: '=ngModel'
            },
            link: function(scope, element, attributes) {
                updateStars(0);
                function updateStars(selectedValue) {
                    scope.stars = [];
                    for (var i = 0; i < 5; i++) {
                        scope.stars.push({
                            filled: i < selectedValue
                        });
                    }
                };
                scope.toggle = function(index) {
                    scope.ratingValue = (index + 1);
                };

                scope.$watch('ratingValue', function(newValue, oldValue) {
                    updateStars(scope.ratingValue);
                });
            },
            template: "<ul class='star-rating'>" +
                "<li ng-repeat='star in stars' class='star' ng-class='{filled: star.filled}' ng-click='toggle($index)'>" +
                "<i class='fa fa-star'></i></li>" +
                "</ul>"
        };
    }
})();