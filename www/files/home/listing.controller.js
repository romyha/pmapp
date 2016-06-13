(function () {
    angular.module("pm").controller("listingCtrl", listingCtrl);

    
    function listingCtrl() {
        var vm = this;

        vm.devices = [{
            name: "DC5K A3",
            id: 12345,
            status: "green"
        }, {
                name: "DC5K A2",
                id: 2355,
                status: "yellow"
            }, {
                name: "DC5K A1",
                id: 897234,
                status: "green"
            }, {
                name: "CA11 A.2",
                id: 2309,
                status: "blue"
            }, {
                name: "CA11 A.1",
                id: 2345,
                status: "red"
            }, {
                name: "C22",
                id: 9823,
                status: "red"
            }, {
                name: "DC30 A2",
                id: 9274,
                status: "yellow"
            }, {
                name: "DC30 A1",
                id: 628,
                status: "yellow"
            }, {
                name: "DC 500",
                id: 94,
                status: "blue"
            }, {
                name: "S021",
                id: 9271,
                status: "green"
            }, {
                name: "S091",
                id: 90127,
                status: "red"
            }, {
                name: "S001",
                id: 9012,
                status: "blue"
            }];

    }
})();