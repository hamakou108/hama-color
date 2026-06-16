import { getStorageData } from '@/utils/storage'
import { updateTab } from '@/utils/tab'

export default defineBackground(() => {
  const initialize = async () => {
    const { canViewFrame, ruleString } = await getStorageData([
      'canViewFrame',
      'ruleString',
    ])
    await updateTab(canViewFrame, ruleString)
  }

  browser.tabs.onActivated.addListener(() => {
    initialize()
  })

  browser.tabs.onUpdated.addListener(() => {
    initialize()
  })
})
