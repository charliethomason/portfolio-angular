angular.module('charlie.mainnav')
    .controller('MainnavController', MainnavController);

function MainnavController($rootScope) {
    var vm = this;

    vm.$onInit = function() {
        init();
    };

    function init() {}
}