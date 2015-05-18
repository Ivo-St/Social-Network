/* global socialNetwork, sessionStorage */

socialNetwork.factory('userAuthentication', function ($http, $q, BASE_URL) {
    var userService = {};

    userService.register = function (data) {
        var url = BASE_URL + 'users/register';

        var deferred = $q.defer();

        $http.post(url, data)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    userService.login = function (data) {
        var url = BASE_URL + 'users/login';

        var deferred = $q.defer();

        $http.post(url, data)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
        return deferred.promise;
    };

    userService.saveCredentials = function (data) {
        sessionStorage.username = data.userName;
        sessionStorage.accessToken = data.access_token;
    };

    return userService;
});
