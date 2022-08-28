import { useTab } from './tab'

chrome.tabs.onActivated.addListener(() => {
  initialize()
})

chrome.tabs.onUpdated.addListener(() => {
  initialize()
})

const initialize = (): void => {
  chrome.storage.sync.get('ruleString', async ({ ruleString }) => {
    if (typeof ruleString === 'undefined') {
      return
    }

    await useTab().update(ruleString)
  })
}
