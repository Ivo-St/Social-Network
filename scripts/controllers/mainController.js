/* global socialNetwork */

socialNetwork.controller('mainController', function ($scope, userAuthentication, notifyService) {

    // fixme: is this a good place for the function getOwnProfileData
    $scope.getOwnProfileData = function () {
        userAuthentication.getOwnProfileData()
            .then(function (data) {
                userAuthentication.saveUserData(data);

                // changes move this ($scope.ownProfileData)?
                $scope.ownProfileData = data;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };
});
