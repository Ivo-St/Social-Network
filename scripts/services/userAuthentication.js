/* global socialNetwork, sessionStorage */

// future: separate the user's request from the authentication's requests
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

    userService.logout = function () {
        var deferred = $q.defer();

        var request = {
            method: 'POST',
            url: BASE_URL + 'users/logout',
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

    userService.getOwnProfileData = function () {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'me',
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

    userService.editProfile = function (data) {
        var deferred = $q.defer();

        var request = {
            method: 'PUT',
            url: BASE_URL + 'me',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            },
            data: data
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

    userService.changePassword = function (data) {
        var deferred = $q.defer();

        var request = {
            method: 'PUT',
            url: BASE_URL + 'me/changepassword',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.accessToken
            },
            data: data
        };

        $http(request)
            .success(function (data) {
                deferred.resolve(data);
            }, function (data) {
                deferred.reject(data);
            });

        return deferred.promise;
    };

    userService.getFriends = function () {
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

    userService.saveCredentials = function (data) {
        sessionStorage.username = data.userName;
        sessionStorage.accessToken = data.access_token;
    };

    userService.saveUserData = function (data) {

        sessionStorage.ownProfileData = JSON.stringify({
            username: data.username,
            name: data.name,
            gender: data.gender,
            email: data.email,
            profileImage: data.profileImageData,
            coverImage: data.coverImageData
        });
    };

    userService.clearCredentials = function () {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('accessToken');
    };

    userService.clearUserData = function () {
        sessionStorage.removeItem('ownProfileData');
    };

    return userService;
});
