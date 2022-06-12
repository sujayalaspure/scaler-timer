console.log("background.js loaded");

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  console.log("tabstatus->> ", tab, changeInfo);
  chrome.tabs.sendMessage(tabId, {
    message: "tabstatus",
    tabstatus: tab.status,
    url: tab.url,
  });
  // if (tab.status === "complete" && changeInfo.url) {
  //   if (/(http|https):\/\/www.scaler.com\/academy\/.*\/problems\/[0-9]+.*/.test(changeInfo.url)) {
  //     console.log("The current url is correct");
  //   } else {
  //     console.log("The current url is incorrect");
  //   }
  // }
});
