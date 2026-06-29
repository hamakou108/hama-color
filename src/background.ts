import { getStorageData } from './utils/storage'
import { updateTab } from './utils/tab'

chrome.tabs.onActivated.addListener(() => {
  initialize().catch(console.error)
})

chrome.tabs.onUpdated.addListener((_tabId, changeInfo) => {
  if (changeInfo.status === 'complete') {
    initialize().catch(console.error)
  }
})

const initialize = async (): Promise<void> => {
  const { canViewFrame, ruleString } = await getStorageData([
    'canViewFrame',
    'ruleString',
  ])
  await updateTab(canViewFrame, ruleString)
}
