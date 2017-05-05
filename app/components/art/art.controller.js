angular.module('charlie')
    .controller('ArtController', ArtController);

function ArtController(AppServices, $rootScope, $sce) {
    var vm = this;

    vm.$onInit = function() {
        meta();
        content();
    };

    function meta() {
        $rootScope.pageTitle = 'Art Gallery - Charlie Thomason';
        $rootScope.pageClass = 'art';
        vm.pageTitle = 'Art Gallery';
        vm.type = 'art';
    }

    function content() {
        AppServices.getContent('art')
            .then(function(response) {
                vm.works = response.data.works;
            });
    }
}