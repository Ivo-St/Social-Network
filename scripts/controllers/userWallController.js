/* global socialNetwork */

socialNetwork.controller('userWallController', function ($scope, $routeParams, userService, notifyService) {
    function getUserFullData(username) {
        userService.getUserFullData(username)
            .then(function (data) {
                $scope.userProfile = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    $scope.loadUserWallPage = function () {
        getUserFullData($routeParams.username);
    };

    $scope.loadUserWallPage();
});
