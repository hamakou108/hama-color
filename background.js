let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
});

chrome.tabs.onUpdated.addListener(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageEdgeColor,
    });
});

function setPageEdgeColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        const colorElement = document.createElement('div')
        colorElement.setAttribute('id', 'color-by-url')
        colorElement.innerHTML = `
          <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; left: 0; height: 16px; z-index: 2147483647;"></div>
          <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; bottom: 0; width: 16px; z-index: 2147483647;"></div>
          <div style="background-color: ${color}; opacity: 0.2; position: fixed; right: 0; bottom: 0; left: 0; height: 16px; z-index: 2147483647;"></div>
          <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; bottom: 0; left: 0; width: 16px; z-index: 2147483647;"></div>
        `
        document.body.querySelectorAll('#color-by-url').forEach(element => element.remove())
        document.body.appendChild(colorElement);
    });
}
