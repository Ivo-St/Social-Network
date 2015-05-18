/* exported socialNetwork */

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

socialNetwork.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/wellcome.html'
    });
});
