angular.module('charlie')
    .filter('capitalize', function() {
        return function(input) {
            if (input !== null) {
                input = input.toLowerCase();
                return input.substring(0,1).toUpperCase() + input.substring(1);
            }
        };
    })
    .filter('trustAsHtml', ['$sce', function($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);