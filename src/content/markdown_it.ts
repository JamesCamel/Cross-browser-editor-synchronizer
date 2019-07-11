


const mdTextArea = (document.querySelector('.source') as HTMLTextAreaElement);
//Send tabId to background.
window.onload = () => {
  chrome.runtime.sendMessage({ source: "load1" })




  mdTextArea.addEventListener("input", () => {
    // let tabs = chrome.tabs.query({active: true}, () => {});
    chrome.runtime.sendMessage({ source: "markdown_it", text: mdTextArea.value }, function (response) {
      //console.log(response.farewell);
      // console.log((document.querySelector('.source') as HTMLElement).textContent);
    });
    // console.log(mdTextArea.value);
  });
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      console.log("ywyywwyyw");
      mdTextArea.value = request;
      return true;
    })
}