/* exported socialNetwork */

var socialNetwork = angular.module('SocialNetwork', ['ngRoute', 'flow']);

socialNetwork.constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');

socialNetwork.config(function ($routeProvider) {

    // fixme: implement route security
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
        .when('/user/editProfile', {
            templateUrl: 'partials/edit-profile.html',
            controller: 'userController',
        })
        .when('/user/changePassword', {
            templateUrl: 'partials/change-password.html',
            controller: 'userController',
        })
        .when('/user/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'friendsController',
        })
        .when('/user/home', {
            templateUrl: 'partials/news-feed.html',
            controller: 'newsFeedController',
        })
        .when('/users/:username', {
            templateUrl: 'partials/user-wall.html',
            controller: 'userWallController',
        })
        .when('/users/:username/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'friendsController',
        })
        .otherwise({
            redirectTo: '/'
        });
});

socialNetwork.run(function ($rootScope, $location, userAuthentication) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if ($location.path().indexOf("/user/") != -1 && !userAuthentication.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }

        if ($location.path().indexOf("/users/") != -1 && !userAuthentication.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/");
        }
    });
});
