import { getEffect } from '@/utils/rule'

export const updateTab = async (
  canViewFrame: boolean,
  ruleString: string,
): Promise<void> => {
  const [tab] = await browser.tabs.query({
    active: true,
    currentWindow: true,
  })

  if (typeof tab?.url === 'undefined' || typeof tab?.id === 'undefined') {
    return
  }

  const effect = getEffect(ruleString, new URL(tab.url))

  if (typeof effect !== 'undefined' && canViewFrame) {
    await browser.tabs.sendMessage(tab.id, { action: 'set' as const, effect })
  } else {
    await browser.tabs.sendMessage(tab.id, { action: 'reset' as const })
  }
}
