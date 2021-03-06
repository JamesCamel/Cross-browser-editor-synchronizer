const mdTextArea = (document.querySelector('.source') as HTMLTextAreaElement);

window.onload = () => {
    chrome.runtime.sendMessage({ source: "loadMd-it" });
    mdTextArea.addEventListener("input", () => {
        chrome.runtime.sendMessage({ source: "markdown_it", text: mdTextArea.value }, () => { });
    });

    chrome.runtime.onMessage.addListener((request) => {
        if(request.open === false) 
            chrome.runtime.sendMessage({ source: "markdown_it", text: mdTextArea.value , open: true}, () => { });
        else
            mdTextArea.value = request.text;
        return true;
    });
};
