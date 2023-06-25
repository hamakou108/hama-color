import { useTab } from './tab'

chrome.tabs.onActivated.addListener(() => {
  initialize()
})

chrome.tabs.onUpdated.addListener(() => {
  initialize()
})

const initialize = async (): Promise<void> => {
  const { canViewFrame, ruleString } = await chrome.storage.sync.get([
    'canViewFrame',
    'ruleString',
  ])

  if (typeof canViewFrame === 'undefined') {
    await chrome.storage.sync.set({ canViewFrame: true })
  }

  if (typeof ruleString === 'undefined') {
    return
  }

  await useTab().update(canViewFrame, ruleString)
}
