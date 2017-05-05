angular.module('charlie.gallery')
    .controller('GalleryController', GalleryController);

function GalleryController() {
    var vm = this;

    vm.$onInit = function() {
        methods();
    };

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/thumbs/' + id + '-250.jpg';
        };
    }
}