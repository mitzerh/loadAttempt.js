(function(){
	
	// sample: async load jquery, pool load
	
	function success() { 
		$("#success").text("jQuery loaded!!!"); 
	}
	
	// async load jquery
	var script = document.createElement('script'); 
	script.type = "text/javascript";
	script.async = true;
	script.src = "http:\/\/ajax.googleapis.com/ajax/libs/jquery/1.4.3/jquery.min.js";
	(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
	
	
	// we know that load attempt won't be attached.. so we'll use the global var
	loadAttempt({
		maxAttempts: 20, // interval
		timeout: 500, // in ms
		callback: {
			check: function() {
				return (typeof jQuery!=="undefined") ? true : false;
			},
			success: function() {  // run on sucess
				success(); 
			},
			timedOut: function() {
				alert("timed out!");
			}
		}
	});
	
	
}());