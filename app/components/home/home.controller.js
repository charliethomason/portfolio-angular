angular.module('charlie')
    .controller('HomeController', HomeController);

function HomeController($rootScope) {
    var vm = this;

    vm.$onInit = function() {
        meta();
        page();
    };

    function meta() {
        $rootScope.pageTitle = 'Charlie Thomason.com';
        $rootScope.pageClass = 'home';
    }

    function page() {
        vm.heading = 'Charlie Thomason';
    }
}