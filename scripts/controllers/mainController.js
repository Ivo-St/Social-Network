/* global socialNetwork */

socialNetwork.controller('mainController', function ($scope, $location, userAuthentication, friendsService, notifyService) {
    $scope.getPostIndex = function (postId, array) {
        for (var index in array) {
            if (array[index].id === postId) {
                return index;
            }
        }

        return -1;
    };

    $scope.getCommentIndex = function (postIndex, commentId, array) {
        for (var index in array[postIndex].comments) {
            if (array[postIndex].comments[index].id === commentId) {
                return index;
            }
        }

        return -1;
    };

    // fixme: is this a good place for the function getOwnProfileData
    $scope.getOwnProfileData = function () {
        userAuthentication.getOwnProfileData()
            .then(function (data) {
                userAuthentication.saveUserData(data);
                if (!$scope.isLoggedIn) {
                    $scope.isLoggedIn = true;
                }
                // changes move this ($scope.ownProfileData)?
                $scope.ownProfileData = data;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
                userAuthentication.clearCredentials();
                userAuthentication.clearUserData();
                $scope.isLoggedIn = false;
                $location.path('/');
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

    $scope.getFriendsUsernames = function () {
        friendsService.getFriends()
            .then(function (data) {
                var usernames = [];
                for (var index in data) {
                    usernames.push(data[index].username);
                }
                $scope.friendUsernames = usernames;
            }, function () {
                $scope.friendUsernames = [];
            });
    };

    $scope.logout = function () {
        userAuthentication.logout()
            .then(function (data) {
                notifyService.success(data.message);
                userAuthentication.clearCredentials();
                userAuthentication.clearUserData();
                $scope.isLoggedIn = false;
                $location.path('/');
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.isLoggedIn = userAuthentication.isLoggedIn();
    if ($scope.isLoggedIn) {
        $scope.getFriendsUsernames();
    }
});
