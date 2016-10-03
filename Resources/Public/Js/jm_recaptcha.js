

/**
 *	Callback-function after loading Google ReCaptcha-script: 
 *	Renders all nocaptchas on the page, gives every captcha an individual ID.
 *	Uses pure JS (no jQuery) to ensure functionality if jQuery is not loaded (yet).
 *
 */
var jmRecaptcha_renderGoogleCaptchas = function() {

	var gCnt = 0;
	
	// Create Unique ID for a captcha-Tag
	function get_unique_recaptcha_id () {
		return 'jmrecaptcha-'+(gCnt++);
	}
	
	// Render recaptcha using google API
	function render_recaptcha ( id ) {
		var sitekey = document.getElementById( id ).getAttribute('data-sitekey');
		grecaptcha.render( id, {
			sitekey: sitekey,
			theme: 'light'
		});
	}
	
	// Support <= IE 8 which doesn't have function for className-selector
	if (!document.zzz_getElementsByClassName) {
		document.zzz_getElementsByClassName = function (cn) {
			var allT=document.getElementsByTagName('*'), allCN=[], i=0, a;
			while(a=allT[i++]) {
				a.className==cn ? allCN[allCN.length]=a : null;
			}
			return allCN
		}
	}

	var elArr = document.zzz_getElementsByClassName('g-recaptcha');
	for (var i = 0; i < elArr.length; i++) {
		var id = get_unique_recaptcha_id();
		elArr[i].setAttribute('id', id);
		render_recaptcha( id );
	}

}
