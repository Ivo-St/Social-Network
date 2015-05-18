/*exported app*/
var app = angular.module('SocialNetwork', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'partials/wellcome.html'
    });
});
