/* global socialNetwork */

socialNetwork.controller('authenticationController', function ($scope, userAuthentication) {
    $scope.login = function () {
        userAuthentication.login($scope.loginData)
            .then(function (data) {
                //future: replace with noty
                alert('Succsesful login. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);
            }, function (error) {
                //future: replace with noty
                alert(error.error_description);
                console.log(error);
            });
    };

    $scope.register = function () {
        userAuthentication.register($scope.registerData)
            .then(function (data) {
                //future: replace with noty
                alert('Succsesful register. Username: (' + data.userName + ')');
                userAuthentication.saveCredentials(data);
            }, function (error) {
                //future: replace with noty
                alert(error.message);
                console.log(error);
            });
    };

    $scope.logout = function () {
        userAuthentication.logout()
            .then(function (data) {
                //future: replace with noty
                alert(data.message);
                userAuthentication.clearCredentials();
            }, function (data) {
                //future: replace with noty
                alert(data.message);
            });
    };
});
