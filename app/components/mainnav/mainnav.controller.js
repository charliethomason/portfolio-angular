angular.module('charlie.mainnav')
    .controller('MainnavController', MainnavController);

function MainnavController($rootScope) {
    var vm = this;

    vm.$onInit = function() {
        init();
    };

    function init() {
        vm.navItems = [{
            path: 'home',
            label: 'Home'
        }, {
            path: 'about',
            label: 'About'
        }, {
            path: 'art',
            label: 'Art'
        }, {
            path: 'photos',
            label: 'Photos'
        }, {
            path: 'birds',
            label: 'Birds'
        }, {
            path: 'code',
            label: 'Code'
        }];
    }
}