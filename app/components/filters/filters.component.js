angular.module('charlie.filters')
    .component('filters', {
        bindings: {
            filterList: '<'
        },
        templateUrl: 'components/filters/filters.html',
        controller: FiltersController,
        controllerAs: 'vm'
    });