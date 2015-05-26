/* global socialNetwork */

socialNetwork.controller('userWallController', function ($scope, $routeParams, userWallService, newsFeedService, friendsService, notifyService) {
    function getUserFullData(username) {
        userWallService.getUserFullData(username)
            .then(function (data) {
                $scope.userProfile = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    function getUserWall(username) {
        userWallService.getFriendWall(username)
            .then(function (data) {
                $scope.wallFeed = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    function getUserFriendsPreview(username) {
        friendsService.getFriendFriendsPreview(username)
            .then(function (data) {
                $scope.userFriendsPreview = data;
            }, function (data) {
                notifyService.error(data.message);
            });
    }

    $scope.loadUserWallPage = function () {
        var username = $routeParams.username;
        getUserFullData(username);
        getUserWall(username);
        getUserFriendsPreview(username);
    };

    function getPostIndex(postId) {
        for (var index in $scope.wallFeed) {
            if ($scope.wallFeed[index].id === postId) {
                return index;
            }
        }

        return -1;
    }

    function getCommentIndex(postIndex, commentId) {
        for (var index in $scope.wallFeed[postIndex].comments) {
            if ($scope.wallFeed[postIndex].comments[index].id === commentId) {
                return index;
            }
        }

        return -1;
    }

    function appreciatePost(data, postId) {
        var postIndex = getPostIndex(postId);
        $scope.wallFeed[postIndex].liked = data.liked;
        $scope.wallFeed[postIndex].likesCount = data.likesCount;
    }

    function appreciateComment(data, postId, commentId) {
        var postIndex = getPostIndex(postId);
        var commentIndex = getCommentIndex(postIndex, commentId);
        $scope.wallFeed[postIndex].comments[commentIndex].liked = data.liked;
        $scope.wallFeed[postIndex].comments[commentIndex].likesCount = data.likesCount;
    }

    $scope.likePost = function (postId) {
        newsFeedService.likePost(postId)
            .then(function (data) {
                appreciatePost(data, postId);
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikePost = function (postId) {
        newsFeedService.unlikePost(postId)
            .then(function (data) {
                appreciatePost(data, postId);
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.likeComment = function (postId, commentId) {
        newsFeedService.likeComment(postId, commentId)
            .then(function (data) {
                appreciateComment(data, postId, commentId);
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikeComment = function (postId, commentId) {
        newsFeedService.unlikeComment(postId, commentId)
            .then(function (data) {
                appreciateComment(data, postId, commentId);
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.postComment = function (postId, commentContent) {
        newsFeedService.postComment(postId, commentContent)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.wallFeed[postIndex].comments.unshift(data);
                notifyService.success("Successfully posted comment");
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.loadAllComments = function (postId) {
        newsFeedService.getPostComments(postId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.wallFeed[postIndex].comments = data;
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.loadUserWallPage();
});
