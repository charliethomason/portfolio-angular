angular.module('charlie')
    .controller('SingleController', SingleController);

function SingleController(AppServices, $location, $rootScope, $stateParams) {
    var vm = this;

    vm.$onInit = function() {
        content();
        methods();
        keyEvents();
    };

    function content() {
        var allWorks = [];
        var theWork = {};

        vm.workId = $stateParams.id;
        vm.type = $location.path().split('/')[1];

        AppServices.getContent(vm.type)
            .then(function(response) {
                allWorks = response.data.works;
                theWork = allWorks.filter(function(obj) {
                    return obj.path == vm.workId;
                });

                vm.work = theWork[0];
                $rootScope.pageTitle = vm.work.title + ' - Charlie Thomason';
                $rootScope.pageClass = vm.type;

                getPageNav(allWorks, allWorks.indexOf(vm.work));
            });
    }

    function methods() {
        vm.imgPath = function(id) {
            return '../img/' + vm.type + '/' + id + '.jpg';
        };
        vm.lightbox = false;
        vm.viewLightbox = function() {
            vm.lightbox = !vm.lightbox;
        };
    }

    function keyEvents() {
        $(document).keydown(function(e) {
            if ($('.fixed-lightbox').length && e.keyCode === 27) {
                angular.element('.single-img.fixed-lightbox').triggerHandler('click');
            }
        });
    }

    function getPageNav(arr, index) {
        var totalWorks = arr.length - 1;

        vm.prevWork = (index === 0) ? arr[totalWorks] : arr[index - 1];
        vm.nextWork = (index === totalWorks) ? arr[0] : arr[index + 1];
    }
}