"use strict";
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ color: '#3aa757' }, function () {
        // console.log("The color is green.");
    });
});
var isOpen1 = false;
var isOpen2 = false;
var displayText = "";
var tabId1, tabId2;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.source == "load1" && sender.tab) {
        tabId1 = Number(sender.tab.id);
        return true;
        // alert(tabId1);
        // chrome.tabs.sendMessage(Number(sender.tab.id), id1);
    }
    if (request.source == "load2" && sender.tab) {
        tabId2 = Number(sender.tab.id);
        return true;
        // alert(tabId2);
        // chrome.tabs.sendMessage(Number(sender.tab.id), id1);
    }
    if (request.source == "markdown_it" && sender.tab) {
        displayText = request.text;
        // alert(sender.tab.id);
        // await chrome.tabs.sendMessage(Number(tabId1), displayText);
        chrome.tabs.sendMessage(Number(tabId2), displayText);
        return true;
    }
    if (request.source == "gist" && sender.tab) {
        displayText = request.text;
        // alert(sender.tab.id);
        chrome.tabs.sendMessage(Number(tabId1), displayText);
        return true;
        // await chrome.tabs.sendMessage(Number(tabId2), displayText);
    }
});
