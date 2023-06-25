import './style.scss'
import { useTab } from './tab'

const urlsElement = document.getElementById('urls') as HTMLInputElement

chrome.storage.sync.get('ruleString', ({ ruleString }) => {
  urlsElement.value = ruleString || ''
})

urlsElement.addEventListener('input', async (e) => {
  const ruleString = (e.target as HTMLInputElement).value
  await chrome.storage.sync.set({ ruleString })

  if (typeof ruleString === 'undefined') {
    return
  }

  await useTab().update(ruleString)
})
