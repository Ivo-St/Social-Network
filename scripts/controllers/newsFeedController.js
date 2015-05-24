/* global socialNetwork */

socialNetwork.controller('newsFeedController', function ($scope, newsFeedService, notifyService) {
    function getNewsFeed() {
        newsFeedService.getNewsFeed()
            .then(function (data) {
                $scope.newsFeed = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    getNewsFeed();
});
