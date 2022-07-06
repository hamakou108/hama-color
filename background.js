chrome.tabs.onActivated.addListener(() => {
    chrome.storage.sync.get("text", async ({ text }) => {
        if (typeof text === 'undefined') {
            return
        }

        const [rawUrlPattern, color] = text.split(',')

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!rawUrlPattern || !color) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageEdgeColor,
                args: ['']
            });

            return
        }

        // cf. https://github.com/sindresorhus/escape-string-regexp
        const urlPattern = rawUrlPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        if (tab.url.search(urlPattern) === -1) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageEdgeColor,
                args: ['']
            });

            return
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageEdgeColor,
            args: [color]
        });
    })
});

chrome.tabs.onUpdated.addListener(() => {
    chrome.storage.sync.get("text", async ({ text }) => {
        if (typeof text === 'undefined') {
            return
        }

        const [rawUrlPattern, color] = text.split(',')

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        if (!rawUrlPattern || !color) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageEdgeColor,
                args: ['']
            });

            return
        }

        // cf. https://github.com/sindresorhus/escape-string-regexp
        const urlPattern = rawUrlPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
        if (tab.url.search(urlPattern) === -1) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: setPageEdgeColor,
                args: ['']
            });

            return
        }

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: setPageEdgeColor,
            args: [color]
        });
    })
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
