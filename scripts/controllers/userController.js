/* global socialNetwork, sessionStorage */

socialNetwork.controller('userController', function ($scope, $document, userAuthentication) {

    // fixme: implement html encoding and fix the pictures preview and submit
    $scope.editProfile = function () {
        userAuthentication.editProfile($scope.ownProfileData)
            .then(function (data) {

                // future: replace with noty
                alert(data.message);
                userAuthentication.saveUserData($scope.ownProfileData);
            }, function (data) {
                console.log(data);
            });
    };

    // todo: rename the function
    $scope.changePasswordFn = function () {
        userAuthentication.changePassword($scope.changePassword)
            .then(function (data) {

                // future: replace with noty
                alert(data.message);
            }, function (data) {
                console.log(data);
            });
    };

    $scope.getUserFriends = function () {

        // fixme: find another way to implement this
        $scope.fullName = JSON.parse(sessionStorage.ownProfileData).name;
        userAuthentication.getFriends()
            .then(function (data) {
                $scope.friends = data;
                $scope.friends.numbetOfFriends = data.length;
            }, function (data) {
                console.log(data);
            });
    };

    // fixme: find a better way to load the profile data
    $scope.loadProfileData = function () {

        // todo consider using the sessionStorage
        $scope.getOwnProfileData();
    };

    // fixme: do not call loadProfileData function here
    $scope.loadProfileData();
});
