// load Pooler Attempt Function
(function(){
	
	function loadAttempt(cfg) {
		if (!cfg) { return false; }
		if (!cfg.maxAttempts || !cfg.timeout || !cfg.callback) { return false; } // required
		if (typeof cfg.callback.check!=="function") { return false; }
		if (isNaN(cfg.timeout)) { return false; } else { cfg.timeout = parseInt(cfg.timeout,10); }
		if (isNaN(cfg.maxAttempts)) { return false; } else { cfg.maxAttempts = parseInt(cfg.maxAttempts,10); }

		var count = 0, timeoutObj = false;

		function attempt() {
			if (cfg.callback.check()) {
				if (cfg.callback.success) { cfg.callback.success(); }
				clearTimeout(timeoutObj);
			} else if (count < cfg.maxAttempts) {
				timeoutObj = setTimeout(function(){ attempt(); },cfg.timeout);
			} else {
				if (cfg.callback.timedOut) { cfg.callback.timedOut(); }
			}
			count++;
		}
		attempt();
	}
	
	if (typeof jQuery!=="undefined") { // attach to jQuery
		$.extend({ loadAttempt:loadAttempt });
	} else {
		window.loadAttempt = loadAttempt;
	}
	
}());