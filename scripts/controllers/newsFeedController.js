/* global socialNetwork */

socialNetwork.controller('newsFeedController', function ($scope, newsFeedService, notifyService) {
    function getNewsFeed() {
        newsFeedService.getNewsFeed()
            .then(function (data) {
                $scope.newsFeed = data;
                console.log($scope.newsFeed);
            }, function (data) {
                notifyService.error(data);
            });
    }

    getNewsFeed();
});
