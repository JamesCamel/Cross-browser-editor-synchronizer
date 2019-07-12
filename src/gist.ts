import * as CodeMirror from 'codemirror';
const gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea') as HTMLTextAreaElement);

//Send tabId to background.
window.onload = () => {
    chrome.runtime.sendMessage({ source: "load2" });
    gistEditor.on("update", () => {
        chrome.runtime.sendMessage({ source: "gist", text: gistEditor.getValue() }, function () {
        });
    });

    chrome.runtime.onMessage.addListener((request) => {
        gistEditor.setValue(request);
        return true;
    });
};
