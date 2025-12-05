import './style.scss'
import { useTab } from './tab'
import * as storage from './storage'

const toggleFrameElement = document.getElementById(
  'toggle-frame',
) as HTMLInputElement
const urlsElement = document.getElementById('urls') as HTMLInputElement

;(async () => {
  const { canViewFrame, ruleString } = await storage.get([
    'canViewFrame',
    'ruleString',
  ])
  toggleFrameElement.checked = canViewFrame
  urlsElement.value = ruleString
})()

const updateTab = async () => {
  const { canViewFrame, ruleString } = await storage.get([
    'canViewFrame',
    'ruleString',
  ])
  await useTab().update(canViewFrame, ruleString)
}

toggleFrameElement.addEventListener('input', async (e) => {
  const canViewFrame = (e.target as HTMLInputElement).checked
  await storage.set({ canViewFrame })
  await updateTab()
})

urlsElement.addEventListener('input', async (e) => {
  const ruleString = (e.target as HTMLInputElement).value
  await storage.set({ ruleString })
  await updateTab()
})
