angular.module('charlie.filters')
    .controller('FiltersController', FiltersController);

function FiltersController($rootScope) {
    var vm = this;
    vm.view = 'grid';
    vm.updateFilter = function() {
        $rootScope.$broadcast('filterUpdated', {
            filter: vm.filter
        });
    };
    vm.updateView = function() {
        $rootScope.$broadcast('viewUpdated', {
            view: vm.view
        });
    };
}