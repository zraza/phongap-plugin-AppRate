var AppRate = (function() {
    var _channel = require("cordova/channel");
    var _api = {};
    var _initCount = 1;
    var _config = {
        waitCount = 3,
        iosAppId = '',
        androidAppId = '',
        title: "Rate application",
        message: "If you enjoy using this application, would you mind taking a moment to rate it? It won't take more than a minute. Thanks for your support!",
        actions: ["Rate It Now", "Remind Me Later", "No, Thanks"]

    }
    var _init = function(config) {

    }
    var _disablePrompt = function() {

    }
    var _navigateToAppStore = function() {
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent.toLowerCase())) {
            return window.open("itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=" + _config.iosAppId);
        } else if (/(Android)/i.test(navigator.userAgent.toLowerCase())) {
            return window.open("market://details?id=" + _config.androidAppId, "_system");
        }
    };

    var _promptCallback = function() {
        switch (buttonIndex) {
            case 1:
                _disablePrompt();
                setTimeout(navigateToAppStore, 1000);
            case 2:

            case 3:
                _disablePrompt();
        }
    }

    var _prompt = function() {
        if (_initCount++ % (_config.waitCount + 1) === 0) {
            navigator.notification.confirm(_config.message, _promptCallback, _config.title, _config.actions);
        }
    }
    _api.init = _init;
    _api.navigateToAppStore = _navigateToAppStore;
    _api.prompt = _prompt;

})();

module.exports = AppRate; //new AppRate(this);
