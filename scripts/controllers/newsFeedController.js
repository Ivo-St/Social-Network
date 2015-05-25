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

    function getPostIndex(postId) {
        for (var index in $scope.newsFeed) {
            if ($scope.newsFeed[index].id == postId) {
                return index;
            }
        }

        return -1;
    }

    function getCommentIndex(postIndex, commentId) {
        for (var index in $scope.newsFeed) {
            if ($scope.newsFeed[postIndex].comments[index].id == commentId) {
                return index;
            }
        }

        return -1;
    }

    // future: merge likePost and unlikePost functions
    $scope.likePost = function (postId) {
        newsFeedService.likePost(postId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.newsFeed[postIndex].liked = true;
                $scope.newsFeed[postIndex].likesCount = data.likesCount;
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikePost = function (postId) {
        newsFeedService.unlikePost(postId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.newsFeed[postIndex].liked = false;
                $scope.newsFeed[postIndex].likesCount = data.likesCount;
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.likeComment = function (postId, commentId) {
        newsFeedService.likeComment(postId, commentId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                var commentIndex = getCommentIndex(postIndex, commentId);
                $scope.newsFeed[postIndex].comments[commentIndex].liked = true;
                $scope.newsFeed[postIndex].comments[commentIndex].likesCount = data.likesCount;

            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.unlikeComment = function (postId, commentId) {
        newsFeedService.unlikeComment(postId, commentId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                var commentIndex = getCommentIndex(postIndex, commentId);
                $scope.newsFeed[postIndex].comments[commentIndex].liked = false;
                $scope.newsFeed[postIndex].comments[commentIndex].likesCount = data.likesCount;
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.postComment = function (postId, commentContent) {
        newsFeedService.postComment(postId, commentContent)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.newsFeed[postIndex].comments.unshift(data);
                notifyService.success("Successfully posted comment");
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.loadAllComments = function (postId) {
        newsFeedService.getPostComments(postId)
            .then(function (data) {
                var postIndex = getPostIndex(postId);
                $scope.newsFeed[postIndex].comments = data;
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    getNewsFeed();
});
