/* global socialNetwork, sessionStorage, FileReader */

socialNetwork.controller('userController', function ($scope, $document, userAuthentication, friendsService, notifyService) {

    // fixme: implement html encoding and fix the pictures preview and submit
    $scope.editProfile = function () {
        userAuthentication.editProfile($scope.ownProfileData)
            .then(function (data) {
                notifyService.success(data.message);

                userAuthentication.saveUserData($scope.ownProfileData);
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    // todo: rename the function
    $scope.changePasswordFn = function () {
        userAuthentication.changePassword($scope.changePassword)
            .then(function (data) {
                notifyService.success(data.message);

                alert(data.message);
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    // fixme: find a better way to load the profile data
    $scope.loadProfileData = function () {

        // todo consider using the sessionStorage
        $scope.getOwnProfileData();
    };

    $scope.uploadPicture = function (files, imgType) {
        angular.forEach(files, function (flowFile) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.ownProfileData[imgType] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
    };

    // fixme: do not call loadProfileData function here
    $scope.loadProfileData();
});
