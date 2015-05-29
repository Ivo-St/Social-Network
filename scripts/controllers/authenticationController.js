/* global socialNetwork */

socialNetwork.controller('authenticationController', function ($scope, $rootScope, $location, userAuthentication, notifyService) {
    $scope.login = function () {
        userAuthentication.login($scope.loginData)
            .then(function (data) {
                notifyService.success('Succsesful login. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);
                $rootScope.isLoggedIn = true;
                $location.path('/user/home');

                // changes: see if this can be loaded in a better place
                $scope.getOwnProfileData();
            }, function (error) {

                notifyService.error(error.error_description);
                console.log(error);
            });
    };

    $scope.register = function () {
        userAuthentication.register($scope.registerData)
            .then(function (data) {
                notifyService.success('Succsesful register. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);
                $rootScope.isLoggedIn = true;
                $location.path('/user/home');

                // changes: see if this can be loaded in a better place
                $scope.getOwnProfileData();
            }, function (error) {
                notifyService.error(error.message);
                console.log(error);
            });
    };
});
