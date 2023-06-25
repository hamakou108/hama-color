import './style.scss'
import { useTab } from './tab'

const toggleFrameElement = document.getElementById(
  'toggle-frame'
) as HTMLInputElement
const urlsElement = document.getElementById('urls') as HTMLInputElement

chrome.storage.sync.get('canViewFrame', ({ canViewFrame }) => {
  toggleFrameElement.checked = canViewFrame
})
chrome.storage.sync.get('ruleString', ({ ruleString }) => {
  urlsElement.value = ruleString || ''
})

toggleFrameElement.addEventListener('input', async (e) => {
  const canViewFrame = (e.target as HTMLInputElement).checked
  await chrome.storage.sync.set({ canViewFrame })

  const { ruleString } = await chrome.storage.sync.get('ruleString')

  await useTab().update(canViewFrame, ruleString)
})

urlsElement.addEventListener('input', async (e) => {
  const ruleString = (e.target as HTMLInputElement).value
  await chrome.storage.sync.set({ ruleString })

  if (typeof ruleString === 'undefined') {
    return
  }

  const { canViewFrame } = await chrome.storage.sync.get('canViewFrame')

  await useTab().update(canViewFrame, ruleString)
})
