angular.module('charlie')
    .controller('HomeController', HomeController);

function HomeController(AppServices, $rootScope) {
    var vm = this;

    vm.$onInit = function() {
        meta();
        page();
    };

    function meta() {
        $rootScope.pageTitle = 'Charlie Thomason';
        $rootScope.pageClass = 'home';
    }

    function page() {
        vm.heading = 'Charlie Thomason';

        AppServices.getContent('art')
            .then(function(response) {
                vm.latestArt = response.data.works[0];
            });
        AppServices.getContent('photos')
            .then(function(response) {
                vm.latestPhoto = response.data.works[0];
            });
    }
}