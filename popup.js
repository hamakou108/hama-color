let urlsElement = document.getElementById("urls");

chrome.storage.sync.get("text", ({ text }) => {
    urlsElement.value = text || ''
});

urlsElement.addEventListener("input", async (e) => {
    const text = e.target.value
    chrome.storage.sync.set({ text });

    const [url, color] = text.split(',')

    if (!url || !color) {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageEdgeColor,
            args: ['']
        });

        return
    }

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageEdgeColor,
        args: [color]
    });
});

function setPageEdgeColor(color) {
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
}
