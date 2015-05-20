/* global socialNetwork */

socialNetwork.controller('authenticationController', function ($scope, userAuthentication) {
    $scope.login = function () {
        userAuthentication.login($scope.loginData)
            .then(function (data) {

                // future: replace with noty
                alert('Succsesful login. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);

                // changes: see if this can be loaded in a better place
                $scope.getOwnProfileData();
            }, function (error) {

                // future: replace with noty
                alert(error.error_description);
                console.log(error);
            });
    };

    $scope.register = function () {
        userAuthentication.register($scope.registerData)
            .then(function (data) {

                // future: replace with noty
                alert('Succsesful register. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);

                // changes: see if this can be loaded in a better place
                $scope.getOwnProfileData();
            }, function (error) {

                // future: replace with noty
                alert(error.message);
                console.log(error);
            });
    };

    $scope.logout = function () {
        userAuthentication.logout()
            .then(function (data) {

                // future: replace with noty
                alert(data.message);
                userAuthentication.clearCredentials();
                userAuthentication.clearUserData();
            }, function (data) {

                // future: replace with noty
                alert(data.message);
            });
    };
});
