angular.module('charlie.pageNav')
    .controller('PageNavController', PageNavController);

function PageNavController($location) {
    var vm = this;

    vm.$onInit = function() {
        methods();
    };

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/thumbs/' + id + '-250.jpg';
        };
        vm.parentLink = (vm.type === 'art') ? 'art-gallery' : vm.type;
    }
}