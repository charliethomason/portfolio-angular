angular.module('charlie.mainnav')
    .controller('MainnavController', MainnavController);

function MainnavController($location) {
    var vm = this;

    vm.$onInit = function() {
        init();
        methods();
    };

    function init() {
        vm.navItems = [{
            path: 'home',
            label: 'Home'
        }, {
            path: 'about',
            label: 'About'
        }, {
            path: 'art-gallery',
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

    function methods() {
        vm.linkActive = function(path) {
            var current = $location.path().split('/')[1];

            if (current === 'art' && path === 'art-gallery') {
                return 'active';
            } else if (current === '' && path === 'home') {
                return 'active';
            } else if (current == path) {
                return 'active';
            }
        };
    }
}