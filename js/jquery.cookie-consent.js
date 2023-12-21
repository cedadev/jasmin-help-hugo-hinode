/*!
 * jQuery Cookie consent plugin
 * https://github.com/myspace-nu
 *
 * Copyright 2017 Johan Johansson
 * Released under the MIT license
 */
(function($) {
	$.cookie = function (key, value, options) {
		if (arguments.length > 1){
			options = $.extend({}, options);
			if (value === null || value === undefined) {
				options.expires = -1;
			}
			return (document.cookie = [
				encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
		var pairs = document.cookie.split('; ');
		for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
			if (decodeURIComponent(pair[0]) === key) return decodeURIComponent(pair[1] || '');
		}
		return null;
	};
	$.fn.cookieConsent = function(options) {
		var settings = $.extend({
			position: "static",
		  	message: "This website uses cookies. By using this website you consent to our use of these cookies.",
		  	style: "",
            divClass: "alert alert-info text-center",
		  	consentMessage: "OK",
            consentPolicyLabel: "Learn more",
            consentPolicyURL: "https://accounts.jasmin.ac.uk/account/privacy/",
		  	consentStyle: "",
		  	btnClass: "btn btn-secondary",
            acceptID: "cookieAccept",
		  	consentTime: 3650, // 10 years
		  	storage: "cookie",
		  	onInit: function(){ },
			onConsent: function(){ },
		  	onTemplate: function(){ console.log(this) },
			testing: false,
			consentKey: "cookiesConsentDate"
		}, options);
		settings.isGoogleBot = !!navigator.userAgent.match(/Chrome-Lighthouse|Page Speed|Headless/i);
		// console.log(settings);
		var language = window.navigator.userLanguage || window.navigator.language;
		settings.storage =
		  	(settings.storage==='local'&&typeof(Storage)!=="undefined")?'local':
	  		(settings.storage==='session'&&typeof(Storage)!=="undefined")?'session':
			'cookie';
		var consentedDate =
			(settings.storage==='local')?parseInt(localStorage.getItem(settings.consentKey)):
			(settings.storage==='session')?parseInt(sessionStorage.getItem(settings.consentKey)):
			parseInt($.cookie(settings.consentKey));
		var elm =
			(this.length)?
				this:
				$("<div>", { html:settings.message, class:settings.divClass, style:settings.style })
				.append($("<div>",{
                    class:"btn-group"
                })
                .append($("<button>",{
					html:settings.consentMessage,
					style:settings.consentStyle,
		  			class:settings.btnClass,
                    id:settings.acceptID
                }))
                .append($("<button>",{
					html:settings.consentPolicyLabel,
					style:settings.consentStyle,
		  			class:settings.btnClass,
                    onclick:"javascript:window.open('"+settings.consentPolicyURL+"')"
                })))
				.prependTo($("main"));
		settings.onInit.call(elm);
		if(settings.isGoogleBot){
			$(elm).hide(); // Don't display it for Google bots.
		} else if(settings.testing || !consentedDate || consentedDate+(86400000*settings.consentTime) < new Date().getTime()){
		  	$(elm).show();
		} else {
	  	  	$(elm).hide(); // Make sure to hide it if defined style does not do this.
		}
		elm.each(function() {
			var thisElm = $(this);
			$(this).prependTo($("main"));
			$(this).find("#"+settings.acceptID).click(function() {
				if(settings.storage==='local'){
					localStorage.setItem(settings.consentKey, new Date().getTime());
				} else if(settings.storage==='session') {
					sessionStorage.setItem(settings.consentKey, new Date().getTime());
				} else {
					$.cookie(settings.consentKey,new Date().getTime(),
						{ expires: new Date(new Date().getTime()+(86400000*settings.consentTime)), path:'/' }
					);
				}
				thisElm.slideUp();
			  	settings.onConsent.call(thisElm);
			});
		});
		return this;
	};
	$.cookieConsent = function(options) {
		$.fn.cookieConsent(options);
	};
}(jQuery));