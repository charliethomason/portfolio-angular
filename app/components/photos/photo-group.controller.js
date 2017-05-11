angular.module('charlie')
    .controller('PhotoGroupController', PhotoGroupController);

function PhotoGroupController(AppServices, $rootScope, $stateParams) {
    var vm = this;

    vm.$onInit = function() {
        content();
        methods();
        keyEvents();
    };

    function content() {
        vm.workId = $stateParams.id;
        vm.type = 'photos';
        vm.prevWork = {};

        $rootScope.pageClass = 'photos';

        AppServices.getContent(vm.workId)
            .then(function(response) {
                vm.photos = response.data.works;
                vm.meta = response.data.meta;

                $rootScope.pageTitle = vm.meta.groupTitle + ' - Charlie Thomason';
            });

        AppServices.getContent(vm.type)
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
            return (angular.isDefined(id)) ? '../img/' + vm.type + '/' + vm.workId + '/' + id + '.jpg' : '';
        };
        vm.viewLightbox = function(index) {
            var totalPhotos = vm.photos.length;

            if (index === -1) {
                vm.lightboxed = totalPhotos - 1;
            } else if (index === totalPhotos) {
                vm.lightboxed = 0;
            } else if (index === vm.lightboxed) {
                vm.lightboxed = null;
            } else {
                vm.lightboxed = index;
            }
        };
    }

    function keyEvents() {
        $(document).keydown(function(e) {
            if ($('.fixed-lightbox').length) { 
                if (e.keyCode === 27) {
                    angular.element('.fixed-lightbox img').triggerHandler('click');
                } else if (e.keyCode === 37) {
                    angular.element('.fixed-lightbox .img-prev').triggerHandler('click');
                } else if (e.keyCode === 39) {
                    angular.element('.fixed-lightbox .img-next').triggerHandler('click');
                }
            }
        });
    }

    function getPageNav(arr, index) {
        var totalWorks = arr.length - 1;

        vm.prevWork = (index === 0) ? arr[totalWorks] : arr[index - 1];
        vm.nextWork = (index === totalWorks) ? arr[0] : arr[index + 1];
    }
}