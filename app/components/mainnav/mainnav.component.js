angular.module('charlie.mainnav')
    .component('mainnav', {
        bindings: {
            active: '<'
        },
        templateUrl: 'components/mainnav/mainnav.html',
        controller: MainnavController,
        controllerAs: 'vm'
    });