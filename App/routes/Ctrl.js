app.controller('loginC', ['$scope', '$location', '$state', '$http', '$rootScope','$window', function ($scope, $location, $state, $http, $rootScope,$window) {
    // if($window.sessionStorage.getItem("User")){
    //     $location.url("home")
    // }
    $scope.log = true;
    $scope.mail = '';
    $scope.mailErr = false;
    $scope.passwd = '';
    $scope.passwdErr = false;
    $scope.valid=false;

    $scope.Inmail = '';
    $scope.InmailErr = false;
    $scope.Inpasswd = '';
    $scope.InpasswdErr = false;
    $scope.Invalid=false;
    $scope.uType='candidate';
    $scope.loginHere = function () {
        if (!$scope.mail && !$scope.passwd) {
            $scope.mailErr = true;
            $scope.passwdErr = true
        }
        else if (!$scope.mail) {
            $scope.mailErr = true;
            $scope.passwdErr = false;
        }
        else if (!$scope.passwd) {
            $scope.passwdErr = true;
            $scope.mailErr = false;
        }
        else{
            if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test($scope.mail)){
                $scope.valid= true;
                $scope.mailErr = false;
                $scope.passwdErr = false;
            }
            else {
                let Ob = {'e': $scope.mail, 'p': $scope.passwd};
                $scope.valid = false;
                var url = "/server/Userlogin";
                $http({
                    method: 'POST',
                    url: url,
                    params: {
                        LDetails: Ob
                    }
                }).then(function successCallback(response) {
                    console.log("Here:", response);
                    if (response.data === 'invalid input') {
                        $scope.error = "invalid input";
                    }
                    else if (response.data === "notfound") {
                        $scope.error = "User Not Found";
                    }
                    else if (response.status ===200) {
                        $window.sessionStorage.setItem("User",JSON.stringify(response.data));
                        $location.url("home")
                    }
                })
            }
        }
        // $location.url("home")
    }
    $scope.Register = function () {
        console.log("In functin",$scope.Inmail ,$scope.Inpasswd ,$scope.uType);
        if (!$scope.Inmail && !$scope.Inpasswd && $scope.uType) {
            $scope.InmailErr = true;
            $scope.InpasswdErr = true
        }
        else if (!$scope.Inmail) {
            $scope.InmailErr = true;
            $scope.InpasswdErr = false;
        }
        else if (!$scope.Inpasswd) {
            $scope.InpasswdErr = true;
            $scope.InmailErr = false;
        }
        else{
            if(!/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test($scope.Inmail)){
                $scope.Invalid= true;
                $scope.InmailErr = false;
                $scope.InpasswdErr = false;
            }
            else {
                let Ob = {'e': $scope.Inmail, 'p': $scope.Inpasswd,'t':$scope.uType};
                $scope.Invalid = false;
                console.log("New User",Ob)
                var url = "/server/newUser";
                $http({
                    method: 'POST',
                    url: url,
                    params: {
                        regDe: Ob
                    }
                }).then(function successCallback(response) {
                    console.log("Here:", response);
                    if (response.data === 'invalid input') {
                        $scope.error = "invalid input";
                    }
                    else if (response.data === "db error") {
                        $scope.error = "Try Again Something went Wrong";
                    }
                    else if (response.status===200) {
                        console.log("success");
                        $window.sessionStorage.setItem("User",JSON.stringify(response.data));
                        $location.url("home")
                    }
                })
            }
        }
        // $location.url("home")
    };
    $scope.reg =function () {
        $scope.log= !$scope.log;
    };
    $scope.regf =function () {
        $scope.log= !$scope.log;
    };
}]);