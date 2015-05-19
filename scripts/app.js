/* exported socialNetwork */

var socialNetwork = angular.module('SocialNetwork', ['ngRoute']);

//future: move the constants to another file
socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/wellcome.html'
        })
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'authenticationController'
        })
        .when('/register', {
            templateUrl: 'partials/register.html',
            controller: 'authenticationController'
        })
        .otherwise({
            redirectTo: '/'
        });
});
