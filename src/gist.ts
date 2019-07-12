import * as CodeMirror from 'codemirror';
const gistEditor = CodeMirror.fromTextArea(document.querySelector('textarea') as HTMLTextAreaElement);

window.onload = () => {
    chrome.runtime.sendMessage({ source: "loadGist" });
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
