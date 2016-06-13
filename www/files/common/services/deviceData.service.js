(function () {
    angular.module('pm').service('deviceData', deviceData);

    deviceData.$inject = ['$http'];
    function deviceData($http) {
        var apiUrl = 'http://192.168.0.30:5000/api';

        var deviceById = function (id) {
            return $http.get(apiUrl + '/devices/' + id);
        };
    }
})();