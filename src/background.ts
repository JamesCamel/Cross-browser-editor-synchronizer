let displayText = "";
let mdTabId: number, gistTabId: number;
let mdOpen: boolean = false, gistOpen: boolean = false;
chrome.runtime.onMessage.addListener(
    function (request, sender) {
        if (sender.tab) {
            switch (request.source) {
                case "loadMd-it": {
                    mdTabId = Number(sender.tab.id);
                    chrome.tabs.sendMessage(Number(mdTabId), {text: displayText, open: mdOpen});
                    return true;
                }
                case "loadGist": {
                    gistTabId = Number(sender.tab.id);
                    chrome.tabs.sendMessage(Number(gistTabId), displayText);
                    return true;
                }
                case "markdown_it": {
                    displayText = request.text;
                    mdOpen = request.open;
                    chrome.tabs.sendMessage(Number(gistTabId), displayText);
                    return true;
                }
                case "gist": {
                    displayText = request.text;
                    chrome.tabs.sendMessage(Number(mdTabId), {text: displayText, open: mdOpen});
                    return true;
                }
                default:
                    return true;
                    break;
            }
        }
    });


