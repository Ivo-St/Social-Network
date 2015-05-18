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
});
