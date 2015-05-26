/* global socialNetwork, sessionStorage */

socialNetwork.factory('userWallService', function ($http, $q, BASE_URL) {
    var userWallService = {};

    userWallService.getUserFullData = function (username) {
        var deferred = $q.defer();
        var url = BASE_URL + 'users/' + username;
        var headers = {
            Authorization: 'Bearer ' + sessionStorage.accessToken
        };

        $http.get(url, {
                headers: headers
            })
            .success(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    userWallService.getFriendWall = function (username) {
        var deferred = $q.defer();
        var url = BASE_URL + 'users/' + username + '/wall?StartPostId&PageSize=5';
        var headers = {
            Authorization: 'Bearer ' + sessionStorage.accessToken
        };

        $http.get(url, {
                headers: headers
            })
            .success(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    userWallService.makePost = function (username, postContent) {
        var deferred = $q.defer();

        var request = {
            method: 'POST',
            url: BASE_URL + 'posts',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            },
            data: {
                username: username,
                postContent: postContent
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

    return userWallService;
});
