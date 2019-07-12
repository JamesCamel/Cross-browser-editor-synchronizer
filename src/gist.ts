import * as CodeMirror from 'codemirror';
const gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea') as HTMLTextAreaElement);

//Send tabId to background.
window.onload = () => {
    chrome.runtime.sendMessage({ source: "load2" });
    gistEditor.on("update", () => {
        chrome.runtime.sendMessage({ source: "gist", text: gistEditor.getValue() }, function () {});
    });

    chrome.runtime.onMessage.addListener((request) => {
        if (request) {
            gistEditor.setValue(request);
        } else {
            chrome.runtime.sendMessage({ source: "gist", text: gistEditor.getValue() }, function () {});
        }
        return true;
    });
};
