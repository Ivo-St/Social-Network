/* global socialNetwork */

socialNetwork.controller('mainController', function ($scope, userAuthentication) {

    // fixme: is this a good place for the function getOwnProfileData
    $scope.getOwnProfileData = function () {
        userAuthentication.getOwnProfileData()
            .then(function (data) {
                userAuthentication.saveUserData(data);

                // changes move this ($scope.ownProfileData)?
                $scope.ownProfileData = data;
                console.log(data);
            }, function (data) {
                console.log(data);
            });
    };
});
