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
        $rootScope.$on('viewUpdated', function(e, value){
            vm.view = value.view;
        });
        $rootScope.$on('filterUpdated', function(e, value) {
            vm.filter = value.filter;
            vm.galleryFilter();
        });
    }

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/thumbs/' + id + '-250.jpg';
        };
    }

    vm.galleryFilter = function(work) {
        if (angular.isDefined(work) && angular.isDefined(vm.filter) && vm.filter !== null) {
            return work.filters.indexOf(vm.filter) > -1;
        }
        return work;
    };
}