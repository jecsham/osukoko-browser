/**
 * 
 * Content Script
 * File from osu! koko extension
 * 
 */

//config vars
var config = {
	download_enabled: null,
	download_video: null,
	download_count: null,
	download_count_val: null,
	DEBUG: null
};

var dlLink = null;
var is_old_style = null;

//Get user config
browser.storage.local.get({
	DwnEnbl: true,
	DwnBmVi: false,
	DwnCount: true,
	DwnCountVal: 0,
	debug: false
}, function (result) {
	config.download_enabled = result.DwnEnbl;
	config.download_video = result.DwnBmVi;
	config.download_count = result.DwnCount;
	config.download_count_val = result.DwnCountVal;
	config.DEBUG = result.debug;

	//Enable/disable console logs
	if (!config.DEBUG) {
		console.log = function () { }
	}
	//If Enable download option is checked
	if (config.download_enabled) {
		download_process: {
			log("Logs enabled!");
			is_old_style = isOldStyle();
			if (isIndexBeatmapPage(is_old_style)) {
				log("Is index page. Download process break");
				break download_process;
			}
			//If user is logged in
			if (isLoggedIn(is_old_style)) {
				log("Account is logged in");
				//Compare site style
				if (is_old_style) {
					//Old site event
					log("Style: old style");
					//Get href attribute of download button by class
					dlLink = document.getElementsByClassName("beatmap_download_link")[0].href;
					//If Download with video option is enabled
					if (config.download_video) {
						window.open(dlLink);
						log("Download start with video, according to the user configuration");
						log("Download link: " + dlLink);
					} else {
						window.open(dlLink + "n");
						log("Download start without video, according to the user configuration");
						//if Download with video option es disabled, "n" are appended in the link
						log("Download link: " + dlLink + "n");
					}
				} else {
					//New site event
					log("Style: new style");
					//Get href attribute of download button by class
					dlLink = document.getElementsByClassName("btn-osu-big btn-osu-big--beatmapset-header js-beatmapset-download-link")[0].href;
					if (config.download_video) {
						window.open(dlLink);
						log("Download start with video, according to the user configuration");
						log("Download link: " + dlLink);
					} else {
						window.open(dlLink + "?noVideo=1");
						log("Download start without video, according to the user configuration");
						//if Download with video option es disabled, "?noVideo=1" are appended in the link
						log("Download link: " + dlLink + "?noVideo=1");
					}
				}
				//Downloads counter function
				increaseDowloadCounter(config.download_count);

			} else {
				log("Account is not logged in");
				launchModal("Automatic download can't start because user isn't logged in :(<br>Press F5 when you have logged in");
			}

		}


	} else {
		log("Downloads disabled, according to the user configuration")
	}
});
/**
 * 
 * Functions
 * 
 */

//Check if user is logged in
function isLoggedIn(oldStyle) {
	if (is_old_style) {
		if (document.getElementsByClassName("mini-avatar").length > 0) {
			return true;
		} else {
			return false;
		}

	} else {
		if (document.getElementsByClassName("notification-icon__count").length > 0) {
			return true;
		} else {
			return false;
		}
	}

}

//check if is a beatmap page or beatmap index page
function isIndexBeatmapPage(oldsite) {
	if ((oldsite == false) && (document.getElementsByClassName("osu-page osu-page--beatmapsets-search-header").length > 0)) {
		return true;
	} else {
		return false;
	}

}
//Check the user site type
function isOldStyle() {
	//Only the old site has that class
	if (document.getElementsByClassName("mainbody").length > 0) {
		return true;
	} else {
		return false;
	}
}

function increaseDowloadCounter(isEnabled) {
	if (isEnabled) {
		config.download_count_val = config.download_count_val + 1;
		browser.storage.local.set({
			DwnCountVal: config.download_count_val
		}, function () {
			log("Download count increment to " + config.download_count_val);
		});
	}

}
//console log
function log(message) {
	console.log("osu! koko: " + message);
}

//modal
function launchModal(message) {
	log("Modal running");
	div = document.createElement('div');
	document.body.appendChild(div);
	div.innerHTML = '<div id="myModal" class="modal">' +
		'<div class="modal-content">' +
		'<div class="modal-header">' +
		'<h2>Koko-chan:</h2>' +
		'</div>' +
		'<div class="modal-body">' +
		'<p>' + message + '</p>' +
		'</div>' +
		'</div>' +
		'</div>';
	var modal = document.getElementById('myModal');
	modal.style.display = "block";
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}
}
