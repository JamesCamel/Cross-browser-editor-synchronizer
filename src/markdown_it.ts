const mdTextArea = (document.querySelector('.source') as HTMLTextAreaElement);

//Send tabId to background.
window.onload = () => {
    chrome.runtime.sendMessage({ source: "load1" });

    mdTextArea.addEventListener("input", () => {
        chrome.runtime.sendMessage({ source: "markdown_it", text: mdTextArea.value }, () => {});
    });
    chrome.runtime.onMessage.addListener((request) => {
        mdTextArea.value = request;
        return true;
    });
};
