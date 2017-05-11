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
    }])
    .filter('monthNumber', function()  {
        return function(month) {
            var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            return monthNames[(month - 1)];
        };
    });