/* global socialNetwork, noty */

socialNetwork.factory('notifyService', function () {
    var notification = {};

    $.noty.defaults.killer = true;
    $.noty.defaults.animation = {
        open: {
            height: 'toggle'
        },
        close: {
            height: 'toggle'
        },
        easing: 'swing',
        speed: 500
    };
    $.noty.defaults.layout = 'topCenter';
    $.noty.defaults.timeout = 4000;

    notification.success = function (message) {
        noty({
            text: message,
            type: 'success'
        });
    };

    notification.error = function (errorMessage) {
        noty({
            text: errorMessage,
            type: 'error'
        });
    };

    return notification;
});
