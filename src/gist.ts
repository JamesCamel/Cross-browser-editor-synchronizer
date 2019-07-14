const injectScript = (file, node) => {
    var th = document.getElementsByTagName(node)[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', file);
    th.appendChild(s);
};
injectScript(chrome.extension.getURL('/inject.js'), 'body');
window.onload = () => {
    let buf = document.querySelector('#mirror-change-detector');
    chrome.runtime.sendMessage({ source: "loadGist" });
    buf.addEventListener("DOMSubtreeModified", () => {
        chrome.runtime.sendMessage({ source: "gist", text: buf.textContent }, function () { });
    });

    chrome.runtime.onMessage.addListener((request) => {
        if (request && window.onload)
            buf.textContent = request;
        else
            chrome.runtime.sendMessage({ source: "gist", text: buf.textContent }, function () { });
        return true;
    });
};
