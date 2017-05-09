angular.module('charlie.filters')
    .controller('FiltersController', FiltersController);

function FiltersController($rootScope) {
    var vm = this;
    vm.updateFilter = function() {
        $rootScope.filter = vm.filter;
    };
}