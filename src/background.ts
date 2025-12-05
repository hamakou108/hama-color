import { useTab } from './tab'
import * as storage from './storage'

chrome.tabs.onActivated.addListener(() => {
  initialize()
})

chrome.tabs.onUpdated.addListener(() => {
  initialize()
})

const initialize = async (): Promise<void> => {
  const { canViewFrame, ruleString } = await storage.get([
    'canViewFrame',
    'ruleString',
  ])
  await useTab().update(canViewFrame, ruleString)
}
