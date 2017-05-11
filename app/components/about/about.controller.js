angular.module('charlie')
    .controller('AboutController', AboutController);

function AboutController(AppServices, $rootScope) {
    var vm = this;

    vm.$onInit = function() {
        meta();
        page();
    };

    function meta() {
        $rootScope.pageTitle = 'About - Charlie Thomason';
        $rootScope.pageClass = 'about';
    }

    function page() {
        AppServices.getContent('about')
            .then(function(response) {
                vm.content = response.data;
            });
    }
}