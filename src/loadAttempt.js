(function(window, app){

    if (window.jQuery && !window.jQuery.loadAttempt) {
        window.jQuery.loadAttempt = app;
    }

    window.LoadAttempt = window.LoadAttempt || app;

}(window,

    (function(){

        var CONST = {
            attempts: 999,
            timeout: 500
        };

        var fn = function() {};

        var LoadAttempt = function() {
            var args = arguments,
                cfg = false;

            if (isNum(args[0]) && isNum(args[1]) && isFunc(args[2])) {

                cfg = {
                    attempts: args[0],
                    timeout: args[1],
                    check: args[2],
                    success: (isFunc(args[3])) ? args[3] : fn,
                    expires: (isFunc(args[4])) ? args[4] : fn
                };

            } else if (isNum(args[0]) && isFunc(args[1])) {

                cfg = {
                    attempts: args[0],
                    timeout: CONST.timeout,
                    check: args[1],
                    success: (isFunc(args[2])) ? args[2] : fn,
                    expires: (isFunc(args[3])) ? args[3] : fn
                };

            } else if (isFunc(args[0])) {

                cfg = {
                    attempts: CONST.attempts,
                    timeout: CONST.timeout,
                    check: args[0],
                    success: (isFunc(args[1])) ? args[1] : fn,
                    expires: (isFunc(args[2])) ? args[2] : fn
                };

            }

            var timeout,
                isAbort = false,
                isExpires = false,
                isSuccess = false;

            var attempt = function() {

                if (isAbort) {
                    clearTimeout(timeout);
                    isExpires = "aborted";
                    cfg.expires(isExpires);
                } else if (cfg.check()) {
                    isSuccess = true;
                    cfg.success();
                    clearTimeout(timeout);
                } else if (cfg.attempts > 0) {
                    timeout = setTimeout(function(){
                        attempt();
                    },cfg.timeout);
                } else {
                    isExpires = "expired";
                    cfg.expires(isExpires);
                }
                cfg.attempts--;

            };

            attempt();

            return {
                abort: function() {
                    isAbort = true;
                },
                success: function(success) {
                    if (isSuccess) {
                        success();
                    } else {
                        cfg.success = success;
                    }
                },
                expires: function(expires) {
                    if (isExpires) {
                        expires(isExpires);
                    } else {
                        cfg.expires = expires;
                    }
                }
            };

        };

        var isNum = function(val) {
            return (typeof val === "number") ? true : false;
        };

        var isFunc = function(val) {
            return (typeof val === "function") ? true : false;
        };

        return LoadAttempt;

    }())

));
