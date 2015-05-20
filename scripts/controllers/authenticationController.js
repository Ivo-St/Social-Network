/* global socialNetwork */

socialNetwork.controller('authenticationController', function ($scope, userAuthentication, notifyService) {
    $scope.login = function () {
        userAuthentication.login($scope.loginData)
            .then(function (data) {
                notifyService.success('Succsesful login. Username: (' + data.userName + ')');

                userAuthentication.saveCredentials(data);

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

                // changes: see if this can be loaded in a better place
                $scope.getOwnProfileData();
            }, function (error) {
                notifyService.error(error.message);
                console.log(error);
            });
    };

    $scope.logout = function () {
        userAuthentication.logout()
            .then(function (data) {
                notifyService.success(data.message);

                userAuthentication.clearCredentials();
                userAuthentication.clearUserData();
            }, function (data) {
                notifyService.error(data.message);
            });
    };
});
