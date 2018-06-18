//set 0 in download counter val (first time install)
var DwnCountVal;
browser.runtime.onInstalled.addListener(function () {
	browser.storage.local.get({
		DwnCountVal: 0
	}, function (item) {
		DwnCountVal = item.DwnCountVal;
		browser.storage.local.set({
			DwnCountVal: DwnCountVal
		}, function () { });
	});
});
