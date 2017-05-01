angular.module('charlie')
    .service('AppServices', AppServices);

function AppServices($http) {
    var self = this;
    self.getContent = getContent;

    function getContent(id) {
        return $http.get('../content/' + id + '.json');
    } 
}