/* global socialNetwork, sessionStorage */

// fixme: move login and register into seperate controllers?

socialNetwork.controller('authenticationController', function ($scope, $q, userAuthentication) {
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
            }, function (data) {

                // future: replace with noty
                alert(data.message);
            });
    };

    $scope.getOwnProfileData = function () {
        userAuthentication.getOwnProfileData()
            .then(function (data) {
                userAuthentication.saveUserData(data);

                // changes move this ($scope.ownProfileData)?
                $scope.ownProfileData = data;
                $scope.ownProfileData.profileImage = 'data:image/jpeg;base64,' + data.profileImageData;
                console.log(data);
            }, function (data) {
                console.log(data);
            });
    };

    $scope.loadProfileData = function () {

        // todo consider using the sessionStorage!
        $scope.getOwnProfileData();
    };
});
