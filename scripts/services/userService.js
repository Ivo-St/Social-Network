/* global socialNetwork, sessionStorage */

socialNetwork.factory('userService', function ($http, $q, BASE_URL) {
    var userService = {};

    userService.getUserFullData = function (username) {
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

    userService.getFriendWall = function (username) {
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

    return userService;
});
