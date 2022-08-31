import { useRule } from './rule'
import { useDom } from './dom'

export const useTab = () => {
  const update = async (ruleString: string): Promise<void> => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    if (typeof tab.url === 'undefined' || typeof tab.id === 'undefined') {
      return
    }

    const effect = useRule(ruleString).getEffect(new URL(tab.url))

    if (typeof effect === 'undefined') {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: useDom().resetPageEdgeColor,
        args: [],
      })
    } else {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: useDom().setPageEdgeColor,
        args: [effect],
      })
    }
  }

  return {
    update,
  }
}
