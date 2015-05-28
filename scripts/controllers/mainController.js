/* global socialNetwork */

socialNetwork.controller('mainController', function ($scope, userAuthentication, friendsService, notifyService) {

    // fixme: is this a good place for the function getOwnProfileData
    $scope.getOwnProfileData = function () {
        userAuthentication.getOwnProfileData()
            .then(function (data) {
                userAuthentication.saveUserData(data);

                // changes move this ($scope.ownProfileData)?
                $scope.ownProfileData = data;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    $scope.sendFriendRequest = function (username) {
        friendsService.sendFriendRequest(username)
            .then(function (data) {
                notifyService.success(data.message);
            }, function (data) {
                notifyService.error(data.message);
            });
    };
});
