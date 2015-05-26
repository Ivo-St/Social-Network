/* global socialNetwork,sessionStorage */

socialNetwork.controller('friendsController', function ($scope, $location, $routeParams, friendsService, userWallService, notifyService) {
    function initialize() {
        if ($location.path().indexOf('/user/friends') != -1) {
            prepareDataForFriendsPage();
        } else {
            prepareDataForFriendFriendsPage();
        }
    }

    function prepareDataForFriendsPage() {

        // fixme: find another way to implement this
        $scope.fullName = JSON.parse(sessionStorage.ownProfileData).name;
        $scope.getUserFriends();
    }

    function prepareDataForFriendFriendsPage() {
        var username = $routeParams.username;
        userWallService.getUserFullData(username)
            .then(function (data) {
                $scope.fullName = data.name;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
        $scope.getFriendFriends(username);
    }

    $scope.getUserFriends = function () {
        friendsService.getFriends()
            .then(function (data) {
                $scope.friends = data;
                $scope.friends.numbetOfFriends = data.length;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    $scope.getFriendFriends = function (username) {
        friendsService.getFriendFriends(username)
            .then(function (data) {
                $scope.friends = data;
                $scope.friends.numbetOfFriends = data.length;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    initialize();
});
