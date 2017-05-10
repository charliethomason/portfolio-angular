angular.module('charlie.filters')
    .controller('FiltersController', FiltersController);

function FiltersController($rootScope) {
    var vm = this;
    vm.view = 'grid';
    vm.updateFilter = function() {
        $rootScope.filter = vm.filter;
    };
    vm.updateView = function(view) {
        $rootScope.view = vm.view;
        $rootScope.$broadcast('viewchange');
    };
}