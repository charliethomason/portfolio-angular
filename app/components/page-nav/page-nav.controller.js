angular.module('charlie.pageNav')
    .controller('PageNavController', PageNavController);

function PageNavController($location) {
    var vm = this;

    vm.$onInit = function() {
        methods();
    };

    function methods() {
        vm.state = (vm.type === 'photos') ? 'photo' : vm.type;
        vm.parentLink = (vm.type === 'art') ? 'art-gallery' : vm.type;
    }

    vm.imgPath = function(id) { 
        return (angular.isDefined(id)) ? '../img/' + vm.type + '/thumbs/' + id + '-250.jpg' : '';
    };
}