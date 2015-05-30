/* global socialNetwork */

socialNetwork.controller('newsFeedController', function ($scope, newsFeedService, friendsService, notifyService) {
    $scope.getNewsFeed = function (postId) {
        newsFeedService.getNewsFeed(postId)
            .then(function (data) {
                $scope.newsFeed = data;
                if (data.length > 0) {
                    $scope.lastPostId = data[data.length - 1].id;
                } else {
                    $scope.noMorePosts = true;
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.loadMorePosts = function (postId) {
        newsFeedService.getNewsFeed(postId)
            .then(function (data) {
                $scope.newsFeed = $scope.newsFeed.concat(data);
                if (data.length === 0) {
                    $scope.noMorePosts = true;
                } else {
                    $scope.noMorePosts = false;
                    $scope.lastPostId = data[data.length - 1].id;
                }
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    function getPostIndex(postId) {
        for (var index in $scope.newsFeed) {
            if ($scope.newsFeed[index].id === postId) {
                return index;
            }
        }

        return -1;
    }

    function getCommentIndex(postIndex, commentId) {
        for (var index in $scope.newsFeed[postIndex].comments) {
            if ($scope.newsFeed[postIndex].comments[index].id === commentId) {
                return index;
            }
        }

        return -1;
    }

    function appreciatePost(data, postId) {
        var postIndex = getPostIndex(postId);
        $scope.newsFeed[postIndex].liked = data.liked;
        $scope.newsFeed[postIndex].likesCount = data.likesCount;
    }

    function appreciateComment(data, postId, commentId) {
        var postIndex = getPostIndex(postId);
        var commentIndex = getCommentIndex(postIndex, commentId);
        $scope.newsFeed[postIndex].comments[commentIndex].liked = data.liked;
        $scope.newsFeed[postIndex].comments[commentIndex].likesCount = data.likesCount;
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

    $scope.getMyFriendsPreview = function () {
        friendsService.getFriendsPreview()
            .then(function (data) {
                $scope.myFriendsPreview = data;
            }, function (data) {
                notifyService.error(data.message);
                console.log(data);
            });
    };

    $scope.getNewsFeed();
    $scope.getMyFriendsPreview();
});
