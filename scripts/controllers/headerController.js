/* global socialNetwork */

socialNetwork.controller('headerController', function ($scope, friendsService, notifyService) {
    function getFriendRequestIndexById(id) {
        var index = -1;
        for (var i in $scope.friendsRequests) {
            if ($scope.friendsRequests[i].id == id) {
                index = i;
                break;
            }
        }

        return index;
    }

    $scope.getFriendRequests = function () {
        friendsService.getFriendsRequests()
            .then(function (data) {
                $scope.friendsRequests = data;
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.acceptFriendRequest = function (id) {
        friendsService.acceptFriendRequest(id)
            .then(function (data) {
                notifyService.success('Friend request approved successfully.');
                var index = getFriendRequestIndexById(id);
                $scope.friendsRequests.splice(index, 1);
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.declineFriendRequest = function (id) {
        friendsService.declineFriendRequest(id)
            .then(function (data) {
                notifyService.success('Friend request declined successfully.');
                var index = getFriendRequestIndexById(id);
                $scope.friendsRequests.splice(index, 1);
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.getOwnProfileData();
    $scope.getFriendRequests();
});
