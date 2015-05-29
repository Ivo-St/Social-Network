/* global socialNetwork,sessionStorage */

socialNetwork.factory('searchService', function ($http, $q, BASE_URL) {
    var searchService = {};

    searchService.searchByName = function (searchTerm) {
        var deferred = $q.defer();

        var request = {
            method: 'GET',
            url: BASE_URL + 'users/search?searchTerm=' + searchTerm,
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

    return searchService;
});
