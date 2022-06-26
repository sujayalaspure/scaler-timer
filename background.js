console.log("background.js loaded");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // console.log("tabstatus->> ", tab, changeInfo);
  chrome.tabs.sendMessage(tabId, {
    message: "tabstatus",
    tabstatus: tab.status,
    url: tab.url,
  });
});
