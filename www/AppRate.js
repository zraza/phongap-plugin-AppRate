var AppRate = (function() {
    var _channel = require("cordova/channel");

    var _api = {};
    var _initCount = 1;

    // Default Configurations
    var _config = {
        waitCount: 4,
        waitPermanentDisable: 4,
        countResume: true,
        iosAppId: '',
        androidAppId: '',
        title: "Rate application",
        message: "If you enjoy using this application, would you mind taking a moment to rate it? It won't take more than a minute. Thanks for your support!",
        actions: ["Rate It Now", "Remind Me Later", "No, Thanks"]

    };

    /**
     * Initialize the AppRate
     */
    var _init = function(config) {

        // override defaults
        for (var key in config) {
            _config[key] = config[key];
        }

        // we are sarting initCount from 1, we have to add one to wait count as well
        _config.waitCount++;
        _initCount = parseInt(window.localStorage.getItem("_initCount") || 1, 10);
        _prompt();
        if (_config.countResume === true) {
            _channel.onResume.subscribe(function() {
                _prompt();
            });
        }

    };

    /**
     * Save current state in local storage
     *
     */
    var _updateState = function() {

        window.localStorage.setItem("_initCount", _initCount);
    };

    /*
     * Disable future prompts
     */
    var _disablePrompt = function() {
        _initCount = 0;
        _updateState();
    };

    /**
     * Open App stores for review
     */
    var _navigateToAppStore = function() {
        if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent.toLowerCase())) {
            window.open("itms-apps://itunes.apple.com/app/id" + _config.iosAppId);
            //window.open("itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=" + _config.iosAppId);
        } else if (/(Android)/i.test(navigator.userAgent.toLowerCase())) {
            window.open("market://details?id=" + _config.androidAppId, "_system");
        }
    };

    /**
     * Call back to user actions
     */
    var _promptCallback = function(buttonIndex) {
        switch (buttonIndex) {
            case 1:
                _disablePrompt();
                setTimeout(_navigateToAppStore, 1000);
                break;
            case 2:
                break;
            case 3:
                _disablePrompt();
                break;
        }
    };

    /**
     * prompt the rate option if still active
     */
    var _prompt = function() {

        if (_initCount === 0)
            return;

        if (_initCount++ % _config.waitCount === 0) {
            var _options = (_initCount < _config.waitPermanentDisable * _config.waitCount) ? _config.actions.slice(0, 2) : _config.actions;

            navigator.notification.confirm(_config.message, _promptCallback, _config.title, _options);

        }
        _updateState();
    };
    // public api methods
    _api.init = _init;
    _api.navigateToAppStore = _navigateToAppStore;
    _api.prompt = _prompt;
    return _api;

})();
module.exports = AppRate;
