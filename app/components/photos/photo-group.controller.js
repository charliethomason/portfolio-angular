angular.module('charlie')
    .controller('PhotoGroupController', PhotoGroupController);

function PhotoGroupController(AppServices, $rootScope, $sce, $state, $stateParams) {
    var vm = this;

    vm.$onInit = function() {
        content();
        methods();
    };
    function content() {
        vm.workId = $stateParams.id;
        vm.type = $state.current.name;
        vm.prevWork = {};

        $rootScope.pageClass = 'photos';

        AppServices.getContent(vm.workId)
            .then(function(response) {
                vm.photos = response.data.works;
                vm.meta = response.data.meta;

                $rootScope.pageTitle = vm.meta.groupTitle + ' - Charlie Thomason';
            });

        AppServices.getContent('photos')
            .then(function(response) {
                allWorks = response.data.works;
                theWork = allWorks.filter(function(obj) {
                    return obj.path == vm.workId;
                });

                vm.work = theWork[0];
                getPageNav(allWorks, allWorks.indexOf(vm.work));
            });
    }
    function methods() {
        vm.imgPath = function(id) {
            return (angular.isDefined(id)) ? '../img/photos/' + vm.workId + '/' + id + '.jpg' : '';
        };
    }
    function getPageNav(arr, index) {
        var totalWorks = arr.length - 1;

        vm.prevWork = (index === 0) ? arr[totalWorks] : arr[index - 1];
        vm.nextWork = (index === totalWorks) ? arr[0] : arr[index + 1];
    }
}