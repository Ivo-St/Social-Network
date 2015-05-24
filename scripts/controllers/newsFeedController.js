/* global socialNetwork */

socialNetwork.controller('newsFeedController', function ($scope, newsFeedService, notifyService) {
    function getNewsFeed() {
        newsFeedService.getNewsFeed()
            .then(function (data) {
                $scope.newsFeed = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    // future: merge likePost and unlikePost functions
    $scope.likePost = function (postId) {
        newsFeedService.likePost(postId)
            .then(function (data) {
                for (var element in $scope.newsFeed) {
                    if ($scope.newsFeed[element].id == postId) {
                        $scope.newsFeed[element].liked = true;
                        $scope.newsFeed[element].likesCount = data.likesCount;
                        break;
                    }
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikePost = function (postId) {
        newsFeedService.unlikePost(postId)
            .then(function (data) {
                for (var element in $scope.newsFeed) {
                    if ($scope.newsFeed[element].id == postId) {
                        $scope.newsFeed[element].liked = false;
                        $scope.newsFeed[element].likesCount = data.likesCount;
                        break;
                    }
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.likeComment = function (postId, commentId) {
        newsFeedService.likeComment(postId, commentId)
            .then(function (data) {
                for (var element in $scope.newsFeed) {
                    if ($scope.newsFeed[element].id == postId) {
                        for (var index in $scope.newsFeed[element].comments) {
                            if ($scope.newsFeed[element].comments[index].id == commentId) {
                                $scope.newsFeed[element].comments[index].liked = true;
                                $scope.newsFeed[element].comments[index].likesCount = data.likesCount;
                                break;
                            }
                        }
                        break;
                    }
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikeComment = function (postId, commentId) {
        newsFeedService.unlikeComment(postId, commentId)
            .then(function (data) {
                for (var element in $scope.newsFeed) {
                    if ($scope.newsFeed[element].id == postId) {
                        for (var index in $scope.newsFeed[element].comments) {
                            if ($scope.newsFeed[element].comments[index].id == commentId) {
                                $scope.newsFeed[element].comments[index].liked = false;
                                $scope.newsFeed[element].comments[index].likesCount = data.likesCount;
                                break;
                            }
                        }
                        break;
                    }
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    getNewsFeed();
});
