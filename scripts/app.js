/* exported socialNetwork */

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

//future: move the constants to another file
socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/wellcome.html'
    });
});
