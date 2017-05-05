angular.module('charlie')
    .controller('SingleController', SingleController);

function SingleController(AppServices, $rootScope, $sce, $state, $stateParams) {
    var vm = this;

    vm.$onInit = function() {
        content();
        methods();
    };

    function content() {
        var allWorks = [];
        var theWork = {};

        vm.workId = $stateParams.id;
        vm.type = $state.current.name;

        AppServices.getContent('art')
            .then(function(response) {
                allWorks = response.data.works;
                theWork = allWorks.filter(function(obj) {
                    return obj.path == vm.workId;
                });

                vm.work = theWork[0];
                $rootScope.pageTitle = vm.work.title + ' - Charlie Thomason';
                $rootScope.pageClass = 'art';

                getPageNav(allWorks, allWorks.indexOf(vm.work));
            });
    }

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/' + id + '.jpg';
        };
    }

    function getPageNav(arr, index) {
        var totalWorks = arr.length - 1;

        vm.prevWork = (index === 0) ? arr[totalWorks] : arr[index - 1];
        vm.nextWork = (index === totalWorks) ? arr[0] : arr[index + 1];
    }
}