angular.module('charlie.pageNav')
    .component('pageNav', {
        bindings: {
            prevWork: '<',
            nextWork: '<',
            type: '<'
        },
        templateUrl: 'components/page-nav/page-nav.html',
        controller: PageNavController,
        controllerAs: 'vm'
    });