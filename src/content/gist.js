"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CodeMirror = __importStar(require("codemirror"));
console.log(CodeMirror);
var gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea'));
var gistSpan = document.querySelector(".CodeMirror-line").childNodes[0];
//Send tabId to background.
window.onload = function () {
    chrome.runtime.sendMessage({ source: "load2" });
    // gistSpan.addEventListener("DOMSubtreeModified", () => {
    //     chrome.runtime.sendMessage({ source: "gist", text: gistSpan.textContent }, function (response) {
    //         console.log("keying: ", gistSpan.textContent);
    //     });
    // });
    gistEditor.on("change", function () {
        chrome.runtime.sendMessage({ source: "gist", text: gistEditor.getValue() }, function (response) {
            console.log("keying: ", gistEditor.getValue());
        });
    });
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        gistSpan.textContent = request;
        return true;
        // alert(gistSpan.textContent);
    });
};
