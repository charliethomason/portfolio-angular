angular.module('charlie.gallery')
    .component('gallery', {
        bindings: {
            type: '<',
            works: '<'
        },
        templateUrl: 'components/gallery/gallery.html',
        controller: GalleryController,
        controllerAs: 'vm'
    });