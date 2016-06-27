(function () {
    angular.module('pm').service('deviceData', deviceData);

    deviceData.$inject = ['$http'];
    function deviceData($http) {
        //var apiUrl = 'http://192.168.0.30:5000/api';
        var apiUrl = 'https://pma-service.synapticon.com/api';

        /*var deviceById = function (id) {
            return $http.get(apiUrl + '/devices/' + id);
        };*/
        
        var deviceByCode = function (code) {
            return $http.get(apiUrl + '/devices/' + code);
        };
        
        var addDevice = function(device) {
            return $http.post(apiUrl + '/devices', device);
        };
        
        var editDeviceById = function(id, data) {
            return $http.put(apiUrl + '/devices/' + id, data);
        };
        
        var devices = function () {
            return $http.get(apiUrl + '/devices');
        };
        
        var changeById = function (deviceid, changeid) {
            return $http.get(apiUrl + '/devices/' + deviceid + '/changes/' + changeid);
        };
        
        var addChangeById = function(deviceid, change){
            return $http.post(apiUrl + '/devices/' + deviceid + '/changes', change);
        };
        
        var editChangeById = function(deviceid, changeid, data) {
            return $http.put(apiUrl + '/devices/' + deviceid + '/changes/' + changeid, data);
        };
        
        var deleteById = function(deviceid) {
            return $http.delete(apiUrl + '/devices/' + deviceid);
        }
        
        var locations = function() {
            return $http.get(apiUrl + '/locations');
        }
        
        var addLocation = function(location) {
            return $http.post(apiUrl + '/locations', location);
        }
        
        var deleteChange = function(deviceid, changeid) {
            return $http.delete(apiUrl + '/devices/' + deviceid + '/changes/' + changeid);
        }
        
        return {
            //deviceById: deviceById,
            addDevice: addDevice,
            devices: devices,
            addChangeById: addChangeById,
            editDeviceById: editDeviceById,
            editChangeById: editChangeById,
            changeById: changeById,
            deleteById: deleteById,
            locations: locations,
            addLocation: addLocation,
            deviceByCode: deviceByCode,
            deleteChange: deleteChange
        };
    }
})();