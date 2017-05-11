angular.module('charlie.pageNav')
    .controller('PageNavController', PageNavController);

function PageNavController($location) {
    var vm = this;

    vm.$onInit = function() {
        methods();
    };

    function methods() {
        vm.state = (vm.type === 'photos' || vm.type === 'photo-group') ? 'photo' : vm.type;
        vm.parentLink = (vm.type === 'art') ? 'art-gallery' : vm.type;
    }

    vm.imgPath = function(id) { 
        var path = (vm.type === 'photo-group') ? 'photos' : vm.type;

        return (angular.isDefined(id)) ? '../img/' + path + '/thumbs/' + id + '-250.jpg' : '';
    };
}