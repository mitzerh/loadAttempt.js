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

        var LoadAttempt = function() {
            var args = arguments,
                cfg = false;

            if (isNum(args[0]) && isNum(args[1]) && isFunc(args[2]) && isFunc(args[3])) {

                cfg = {
                    attempts: args[0],
                    timeout: args[1],
                    check: args[2],
                    success: args[3],
                    expires: isFunc(args[4]) ? args[4] : false
                };

            } else if (isNum(args[0]) && isFunc(args[1]) && isFunc(args[2])) {

                cfg = {
                    attempts: args[0],
                    timeout: CONST.timeout,
                    check: args[1],
                    success: args[2],
                    expires: isFunc(args[3]) ? args[3] : false
                };

            } else if (isFunc(args[0]) && isFunc(args[1])) {

                cfg = {
                    attempts: CONST.attempts,
                    timeout: CONST.timeout,
                    check: args[0],
                    success: args[1],
                    expires: isFunc(args[2]) ? args[2] : false
                };

            }

            var timeout, isAbort = false;

            var attempt = function() {

                if (isAbort) {
                    clearTimeout(timeout);
                    cfg.expires("aborted");
                } else if (cfg.check()) {
                    cfg.success();
                    clearTimeout(timeout);
                } else if (cfg.attempts > 0) {
                    timeout = setTimeout(function(){
                        attempt();
                    },cfg.timeout);
                } else {
                    cfg.expires("expired");
                }
                cfg.attempts--;

            };

            attempt();

            return {
                abort: function() {
                    isAbort = true;
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
