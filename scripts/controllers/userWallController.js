/* global socialNetwork */

socialNetwork.controller('userWallController', function ($scope, $routeParams, $location, userWallService, newsFeedService, friendsService, notifyService) {
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
                $scope.lastPostId = data[data.length - 1].id;
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

    $scope.loadMoreUserPosts = function (username, lastPostId) {
        userWallService.getFriendWall(username, lastPostId)
            .then(function (data) {
                $scope.wallFeed = $scope.wallFeed.concat(data);
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

    $scope.loadUserWallPage = function () {
        var username = $routeParams.username;
        $scope.getFriendsUsernames();
        var myUsername;
        if ($scope.ownProfileData) {
            myUsername = $scope.ownProfileData.username;
        }

        if (username === myUsername) {
            $location.path('/user/home');
        } else {
            getUserFullData(username);
            getUserWall(username);
            getUserFriendsPreview(username);
        }
    };

    function appreciatePost(data, postId) {
        var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
        $scope.wallFeed[postIndex].liked = data.liked;
        $scope.wallFeed[postIndex].likesCount = data.likesCount;
    }

    function appreciateComment(data, postId, commentId) {
        var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
        var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.wallFeed);
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
                var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
                $scope.wallFeed[postIndex].comments.unshift(data);
                notifyService.success("Successfully posted comment");
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.loadAllComments = function (postId) {
        newsFeedService.getPostComments(postId)
            .then(function (data) {
                var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
                $scope.wallFeed[postIndex].comments = data;
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.makePost = function () {
        var username = $routeParams.username;
        userWallService.makePost(username, $scope.newPost.text)
            .then(function (data) {
                $scope.wallFeed.push(data);
                notifyService.success('Post added successfully');
            }, function (data) {
                notifyService.error(data.message);
            });
    };

    $scope.deletePost = function (postId) {
        newsFeedService.deletePost(postId)
            .then(function () {
                var index = $scope.getPostIndex(postId, $scope.wallFeed);
                console.log(index);
                $scope.wallFeed.splice(index, 1);
                notifyService.success('Successfully deleted post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.editPost = function (postId) {
        var newContent = $scope.editPost.postContent;
        newsFeedService.editPost(postId, newContent)
            .then(function () {
                var index = $scope.getPostIndex(postId, $scope.wallFeed);
                $scope.wallFeed[index].postContent = newContent;
                notifyService.success('Successfully edited post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.deleteComment = function (postId, commentId) {
        newsFeedService.deleteComment(postId, commentId)
            .then(function () {
                var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
                var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.wallFeed);
                $scope.wallFeed[postIndex].comments.splice(commentIndex, 1);
                notifyService.success('Successfully deleted comment');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.editComment = function (postId, commentId) {
        var newContent = $scope.editComment.commentContent;
        newsFeedService.editComment(postId, commentId, newContent)
            .then(function () {
                var postIndex = $scope.getPostIndex(postId, $scope.wallFeed);
                var commentIndex = $scope.getCommentIndex(postIndex, commentId, $scope.wallFeed);
                $scope.wallFeed[postIndex].comments[commentIndex].commentContent = newContent;
                notifyService.success('Successfully edited post');
            }, function (data) {
                notifyService.error('An error occured. ' + data.message);
            });
    };

    $scope.loadUserWallPage();
});
