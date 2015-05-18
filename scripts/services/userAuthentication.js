/* global socialNetwork */

socialNetwork.factory('userAuthentication', function ($http, $q, BASE_URL) {
    var requester = {};

    requester.register = function (username, password, confirmPassword, name, email) {
        //changes: get the data as parameter?
        var data = {
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            name: name,
            email: email
        };

        var url = BASE_URL + 'users/register';

        var deferred = $q.defer();

        $http.post(url, data)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
    };

    requester.login = function (username, password) {
        //changes: get the data as parameter?
        var data = {
            username: username,
            password: password
        };

        var url = BASE_URL + 'users/login';

        var deferred = $q.defer();

        $http.post(url, data)
            .success(function (data) {
                deferred.resolve(data);
            })
            .error(function (data) {
                deferred.reject(data);
            });
    };
});
