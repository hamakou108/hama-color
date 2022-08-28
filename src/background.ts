export {}

chrome.tabs.onActivated.addListener(() => {
  chrome.storage.sync.get('text', async ({ text }) => {
    if (typeof text === 'undefined') {
      return
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (typeof tab === 'undefined') {
      return
    }

    const textLines = text.split(/\r?\n/)
    const matchedText = textLines.find((text: string) => {
      const [rawUrlPattern, color] = text.split(',')
      if (!rawUrlPattern || !color) {
        return false
      }

      const urlPattern = rawUrlPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

      if (typeof tab.url === 'undefined') {
        return false
      }

      return tab.url.search(urlPattern) !== -1
    })

    if (typeof matchedText === 'undefined') {
      if (typeof tab.id === 'undefined') {
        return
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageEdgeColor,
        args: [''],
      })

      return
    }

    const color = matchedText.split(',')[1]

    if (typeof tab.id === 'undefined') {
      return
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setPageEdgeColor,
      args: [color],
    })
  })
})

chrome.tabs.onUpdated.addListener(() => {
  chrome.storage.sync.get('text', async ({ text }) => {
    if (typeof text === 'undefined') {
      return
    }

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    const textLines = text.split(/\r?\n/)
    const matchedText = textLines.find((text: string) => {
      const [rawUrlPattern, color] = text.split(',')
      if (!rawUrlPattern || !color) {
        return false
      }

      const urlPattern = rawUrlPattern.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')

      if (typeof tab.url === 'undefined') {
        return false
      }

      return tab.url.search(urlPattern) !== -1
    })

    if (typeof matchedText === 'undefined') {
      if (typeof tab.id === 'undefined') {
        return
      }

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: setPageEdgeColor,
        args: [''],
      })

      return
    }

    const color = matchedText.split(',')[1]

    if (typeof tab.id === 'undefined') {
      return
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: setPageEdgeColor,
      args: [color],
    })
  })
})

function setPageEdgeColor(color: string) {
  const colorElement = document.createElement('div')
  colorElement.setAttribute('id', 'hama-color')
  colorElement.innerHTML = `
      <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; left: 0; height: 16px; z-index: 2147483647;"></div>
      <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; bottom: 0; width: 16px; z-index: 2147483647;"></div>
      <div style="background-color: ${color}; opacity: 0.2; position: fixed; right: 0; bottom: 0; left: 0; height: 16px; z-index: 2147483647;"></div>
      <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; bottom: 0; left: 0; width: 16px; z-index: 2147483647;"></div>
    `
  document.body
    .querySelectorAll('#hama-color')
    .forEach((element) => element.remove())
  document.body.appendChild(colorElement)
}
