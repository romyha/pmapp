(function(){
    angular.module('pm').service('paths', paths);

paths.$inject = ['$location', '$ionicHistory'];
function paths($location, $ionicHistory) {
    var newPathDisableBack = function(path) {
        $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $location.path(path);
            $ionicHistory.nextViewOptions.disableBack = false;
    }
    
    return {
        newPathDisableBack: newPathDisableBack
    }
}
})();