angular.module('charlie', [
    'ui.router',
    'charlie.mainnav'
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
        });
    $urlRouterProvider.otherwise('/');
});