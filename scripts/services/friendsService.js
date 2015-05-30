/* global socialNetwork,sessionStorage */

socialNetwork.factory('friendsService', function ($http, $q, BASE_URL) {
    var friendsService = {};

    friendsService.getFriends = function () {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'me/friends',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            }
        };

        $http(request)
            .success(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    friendsService.getFriendsPreview = function () {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'me/friends/preview',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            }
        };

        $http(request)
            .success(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    friendsService.getFriendFriendsPreview = function (username) {
        var deferred = $q.defer();
        var url = BASE_URL + 'users/' + username + '/friends/preview';
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

    friendsService.getFriendFriends = function (username) {
        var deferred = $q.defer();

        var url = BASE_URL + 'users/' + username + '/friends';
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

    friendsService.getFriendsRequests = function () {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'me/requests',
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

    friendsService.acceptFriendRequest = function (id) {
        var deferred = $q.defer();

        var request = {
            method: 'PUT',
            url: BASE_URL + 'me/requests/' + id + '?status=approved',
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

    friendsService.declineFriendRequest = function (id) {
        var deferred = $q.defer();

        var request = {
            method: 'PUT',
            url: BASE_URL + 'me/requests/' + id + '?status=rejected',
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

    friendsService.sendFriendRequest = function (username) {
        var deferred = $q.defer();

        var request = {
            method: 'POST',
            url: BASE_URL + 'me/requests/' + username,
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

    return friendsService;
});
