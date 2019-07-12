let displayText = "";
let mdTabId: number, gistTabId: number;
chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (sender.tab) {
            switch (request.source) {
                case "loadMd-it": {
                    mdTabId = Number(sender.tab.id);
                    chrome.tabs.sendMessage(Number(mdTabId), displayText);
                    return true;
                }
                case "loadGist": {
                    gistTabId = Number(sender.tab.id);
                    chrome.tabs.sendMessage(Number(gistTabId), displayText);
                    return true;
                }
                case "markdown_it": {
                    displayText = request.text;
                    chrome.tabs.sendMessage(Number(gistTabId), displayText);
                    return true;
                }
                case "gist": {
                    displayText = request.text;
                    chrome.tabs.sendMessage(Number(mdTabId), displayText);
                    return true;
                }
                default:
                    break;
            }
        }
    });


