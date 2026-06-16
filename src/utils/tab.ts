import { getEffect } from '@/utils/rule'
import type { Message } from '@/utils/message'

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

  let message: Message
  if (typeof effect !== 'undefined' && canViewFrame) {
    message = { action: 'set', effect }
  } else {
    message = { action: 'reset' }
  }

  await browser.tabs.sendMessage(tab.id, message)
}
