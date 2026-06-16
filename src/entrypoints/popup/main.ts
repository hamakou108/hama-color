import './style.scss'
import { getStorageData, setStorageData } from '@/utils/storage'
import { updateTab } from '@/utils/tab'

const toggleFrameElement = document.getElementById(
  'toggle-frame',
) as HTMLInputElement
const urlsElement = document.getElementById('urls') as HTMLInputElement

;(async () => {
  const { canViewFrame, ruleString } = await getStorageData([
    'canViewFrame',
    'ruleString',
  ])
  toggleFrameElement.checked = canViewFrame
  urlsElement.value = ruleString
})()

toggleFrameElement.addEventListener('input', async (e) => {
  const canViewFrame = (e.target as HTMLInputElement).checked
  await setStorageData({ canViewFrame })
  const { ruleString } = await getStorageData(['ruleString'])
  await updateTab(canViewFrame, ruleString)
})

urlsElement.addEventListener('input', async (e) => {
  const ruleString = (e.target as HTMLInputElement).value
  await setStorageData({ ruleString })
  const { canViewFrame } = await getStorageData(['canViewFrame'])
  await updateTab(canViewFrame, ruleString)
})
