angular.module('charlie.gallery')
    .controller('GalleryController', GalleryController);

function GalleryController($rootScope) {
    var vm = this;

    vm.$onInit = function() {
        view();
        methods();
    };

    function view() {
        vm.view = 'grid';
        $rootScope.$on('viewchange', function(){
            vm.view = $rootScope.view;
        });
    }

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/thumbs/' + id + '-250.jpg';
        };
    }

    vm.galleryFilter = function(work) {
        if (angular.isDefined($rootScope.filter) && $rootScope.filter !== null) {
            return work.filters.indexOf($rootScope.filter) > -1;
        }
        return work;
    };
}