app.controller('homeC', ['$scope', '$location', '$state', '$http', '$rootScope', '$window', function ($scope, $location, $state, $http, $rootScope, $window) {
    $scope.uT = JSON.parse($window.sessionStorage.getItem('User')).t;
    var userId = JSON.parse($window.sessionStorage.getItem('User')).id;
    if(!$scope.uT || !userId){
        $location.url("login")
    }
    $scope.logout = function () {
        $window.sessionStorage.removeItem("User");
        $location.url('login')
    }
}]);