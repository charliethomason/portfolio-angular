angular.module('charlie', [
    'ui.router',
    'partials',
    'charlie.mainnav',
    'charlie.gallery',
    'charlie.pageNav'
]).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'components/home/home.html',
            controller: HomeController,
            controllerAs: 'vm'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'components/about/about.html',
            controller: AboutController,
            controllerAs: 'vm'
        })
        .state('art-gallery', {
            url: '/art',
            templateUrl: 'components/art/art-gallery.html',
            controller: ArtController,
            controllerAs: 'vm'
        })
        .state('art', {
            url: '/art/:id',
            templateUrl: 'components/single/single.html',
            controller: SingleController,
            controllerAs: 'vm'
        })
        .state('photos', {
            url: '/photos',
            templateUrl: 'components/photos/photos.html',
            controller: PhotosController,
            controllerAs: 'vm'
        })
        .state('photo', {
            url: '/photos/:id',
            templateUrl: 'components/single/single.html',
            controller: SingleController,
            controllerAs: 'vm'
        })
        .state('photo-group', {
            url: '/photos/group/:id',
            templateUrl: 'components/photos/photo-group.html',
            controller: PhotoGroupController,
            controllerAs: 'vm'
        });
    $urlRouterProvider.otherwise('/');
});