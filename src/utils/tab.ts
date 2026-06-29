import { getEffect } from './rule'
import type { Message } from './message'

export const updateTab = async (
  canViewFrame: boolean,
  ruleString: string,
): Promise<void> => {
  const [tab] = await chrome.tabs.query({
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

  try {
    await chrome.tabs.sendMessage(tab.id, message)
  } catch {
    // Expected when content script is not available (e.g., chrome:// pages)
  }
}
