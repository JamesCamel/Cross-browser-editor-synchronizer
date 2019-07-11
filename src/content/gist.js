"use strict";
// import Codemirror from 'codemirror/src/codemirror.js'
console.log(CodeMirror);
var gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea'));
var gistSpan = document.querySelector(".CodeMirror-line").childNodes[0];
//Send tabId to background.
window.onload = function () {
    chrome.runtime.sendMessage({ source: "load2" });
    gistSpan.addEventListener("DOMSubtreeModified", function () {
        chrome.runtime.sendMessage({ source: "gist", text: gistSpan.textContent }, function (response) {
            console.log("keying: ", gistSpan.textContent);
        });
    });
    // gistEditor.on("change", () => {
    //     chrome.runtime.sendMessage({ source: "gist", text: gistEditor.getValue() }, function (response) {
    //         console.log("keying: ", gistEditor.getValue());
    //     });
    // });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        gistSpan.textContent = request;
        return true;
        // alert(gistSpan.textContent);
    });
};
