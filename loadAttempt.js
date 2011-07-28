/**
 * Load Pooler attempt function
 * https://github.com/mitzerh/loadAttempt.js
 * MIT License.
 */
(function(){
	
	var loadAttempt = function() {
		var i, cb, self = this, args = arguments;
		if (args.length===0) { return false; }
		var cfg = { attempt:0, timeout:500 };
		if (args.length===1 && typeof args[0]==="object") { // for old way - object
			for (i in args[0]) { cfg[i] = args[0][i]; }
			if (!cfg.callback) { return false; } else { cb = cfg.callback; }
			if (!cb.check || !cb.success) { return false; } else { cfg._check = cb.check; cfg._success = cb.success; }
			if (cb.timedOut) { cfg._timeout = cb.timedOut; }
		} else if (!isNaN(args[0]) && !isNaN(args[1]) && isFn(args[2]) && isFn(args[3])) { // num,fn + args
			cfg.attempt = args[0];
			cfg.timeout = args[1];
			cfg._check = args[2];
			cfg._success = args[3];
			if (args[4]) { cfg._timeout = args[4]; }
			if (args[5]) { cfg._abort = args[5]; }
		} else if (isFn(args[0]) && isFn(args[1])) { // fn only - no max attempts
			cfg._check = args[0];
			cfg._success = args[1];
			if (args[2]) { cfg._timeout = args[2]; }
			if (args[3]) { cfg._abort = args[3]; }
		} else {
			return false;
		}
		
		// check callback functions
		if (!isFn(cfg._check) || !isFn(cfg._success)) { return false; }
		if (!isFn(cfg._timeout)) { cfg._timeout = function(){}; }

		// convert to integers
		if (isNaN(cfg.timeout)) { return false; } else { cfg.timeout = toInt(cfg.timeout); }
		if (isNaN(cfg.attempt)) { return false; } else { cfg.attempt = toInt(cfg.attempt); }
		
		var timeoutObj = false, isAbort = false;

		if (cfg.attempt && cfg.timeout) {
			var attempt = function() {
				if (isAbort) {
					clearTimeout(timeoutObj);
				} else if (cfg._check()) {
					cfg._success();
					clearTimeout(timeoutObj);
				} else if (cfg.attempt>0) {
					timeoutObj = setTimeout(function(){ attempt(); },cfg.timeout);
				} else {
					cfg._timeout();
				}
				cfg.attempt--;
			};
			attempt();
		} else { // interval - no limit
			timeoutObj = setInterval(function(){
				if (isAbort) {
					clearInterval(timeoutObj);
				} else if (cfg._check()) {
					cfg._success();
					clearInterval(timeoutObj);
				}
			},cfg.timeout);
		}
		
		return {
			abort: function() { isAbort = true; }
		};
		
	};
	
	function toInt(val) {
		return parseInt(val,10);
	}
	
	function isFn(val) {
		return (typeof val === "function") ? true : false;
	}
	
	if (typeof jQuery!=="undefined") { // attach to jQuery
		$.extend({ loadAttempt:loadAttempt });
	} else {
		window.loadAttempt = loadAttempt;
	}
	
}());