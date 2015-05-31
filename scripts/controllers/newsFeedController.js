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

    function appreciatePost(data, postId) {
        var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
        $scope.newsFeed[postIndex].liked = data.liked;
        $scope.newsFeed[postIndex].likesCount = data.likesCount;
    }

    function appreciateComment(data, postId, commentId) {
        var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
        var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.newsFeed);
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
                var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
                $scope.newsFeed[postIndex].comments.unshift(data);
                notifyService.success("Successfully posted comment");
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.loadAllComments = function (postId) {
        newsFeedService.getPostComments(postId)
            .then(function (data) {
                var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
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

    $scope.deletePost = function (postId) {
        newsFeedService.deletePost(postId)
            .then(function () {
                var index = $scope.getPostIndex(postId, $scope.newsFeed);
                $scope.newsFeed.splice(index, 1);
                notifyService.success('Successfully deleted post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.editPost = function (postId) {
        var newContent = $scope.editPost.postContent;
        newsFeedService.editPost(postId, newContent)
            .then(function () {
                var index = $scope.getPostIndex(postId, $scope.newsFeed);
                $scope.newsFeed[index].postContent = newContent;
                notifyService.success('Successfully edited post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.deleteComment = function (postId, commentId) {
        newsFeedService.deleteComment(postId, commentId)
            .then(function () {
                var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
                var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.newsFeed);
                $scope.newsFeed[postIndex].comments.splice(commentIndex, 1);
                notifyService.success('Successfully deleted comment');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.editComment = function (postId, commentId) {
        var newContent = $scope.editComment.commentContent;
        newsFeedService.editComment(postId, commentId, newContent)
            .then(function () {
                var postIndex = $scope.getPostIndex(postId, $scope.newsFeed);
                var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.newsFeed);
                $scope.newsFeed[postIndex].comments[commentIndex].commentContent = newContent;
                notifyService.success('Successfully edited post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.getNewsFeed();
    $scope.getMyFriendsPreview();
    $scope.getFriendsUsernames();
});
