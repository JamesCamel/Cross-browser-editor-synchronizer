"use strict";
var mdTextArea = document.querySelector('.source');
//Send tabId to background.
window.onload = function () {
    chrome.runtime.sendMessage({ source: "load1" });
    mdTextArea.addEventListener("input", function () {
        // let tabs = chrome.tabs.query({active: true}, () => {});
        chrome.runtime.sendMessage({ source: "markdown_it", text: mdTextArea.value }, function (response) {
            //console.log(response.farewell);
            // console.log((document.querySelector('.source') as HTMLElement).textContent);
        });
        // console.log(mdTextArea.value);
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log("ywyywwyyw");
        mdTextArea.value = request;
        return true;
    });
};
