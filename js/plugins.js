// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
    
    function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie != '') {
		    var cookies = document.cookie.split(';');
		    for (var i = 0; i < cookies.length; i++) {
		        var cookie = jQuery.trim(cookies[i]);
		        // Does this cookie string begin with the name we want?
		        if (cookie.substring(0, name.length + 1) == (name + '=')) {
		            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
		            break;
		        }
		    }
		}
		return cookieValue;
	}
	
	var csrftoken = getCookie('csrftoken');
	
	function csrfSafeMethod(method) {
		return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
	}
	
	function sameOrigin(url) {
		var host = document.location.host; // host + port
		var protocol = document.location.protocol;
		var sr_origin = '//' + host;
		var origin = protocol + sr_origin;
		return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		    !(/^(\/\/|http:|https:).*/.test(url));
	}
	
	$.ajaxSetup({
		beforeSend: function(xhr, settings) {
		    if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url))
		        xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	});
}());

// Place any jQuery/helper plugins in here.
