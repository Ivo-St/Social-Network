/* global socialNetwork, sessionStorage */

socialNetwork.factory('newsFeedService', function ($http, $q, BASE_URL) {
    var feedService = {};

    feedService.getNewsFeed = function () {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'me/feed?StartPostId&PageSize=5',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            }
        };

        $http(request)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    return feedService;
});
