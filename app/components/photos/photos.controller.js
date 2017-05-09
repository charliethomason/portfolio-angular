angular.module('charlie')
    .controller('PhotosController', PhotosController);

function PhotosController(AppServices, $rootScope, $sce) {
    var vm = this;

    vm.$onInit = function() {
        meta();
        content();
    };

    function meta() {
        $rootScope.pageTitle = 'Photo Gallery - Charlie Thomason';
        $rootScope.pageClass = 'photos';
        vm.pageTitle = 'Photo Gallery';
        vm.type = 'photos';
    }

    function content() {
        AppServices.getContent('photos')
            .then(function(response) {
                vm.works = response.data.works;
                vm.filters = response.data.filters;
            });
    }
}