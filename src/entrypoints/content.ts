import type { Effect } from '@/utils/rule'
import type { Message } from '@/utils/message'

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    browser.runtime.onMessage.addListener((message: Message) => {
      switch (message.action) {
        case 'set':
          setPageEdgeColor(message.effect)
          break
        case 'reset':
          resetPageEdgeColor()
          break
        default: {
          const _exhaustive: never = message
          console.warn('Content script received unknown action:', _exhaustive)
        }
      }
    })
  },
})

function setPageEdgeColor(effect: Effect): void {
  const color = effect.color
  const colorElement = document.createElement('div')
  colorElement.setAttribute('id', 'hama-color')
  colorElement.innerHTML = `
    <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; left: 0; height: 16px; z-index: 2147483647; pointer-events: none;"></div>
    <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; right: 0; bottom: 0; width: 16px; z-index: 2147483647; pointer-events: none;"></div>
    <div style="background-color: ${color}; opacity: 0.2; position: fixed; right: 0; bottom: 0; left: 0; height: 16px; z-index: 2147483647; pointer-events: none;"></div>
    <div style="background-color: ${color}; opacity: 0.2; position: fixed; top: 0; bottom: 0; left: 0; width: 16px; z-index: 2147483647; pointer-events: none;"></div>
  `
  document.body
    .querySelectorAll('#hama-color')
    .forEach((element) => element.remove())
  document.body.appendChild(colorElement)
}

function resetPageEdgeColor(): void {
  document.body
    .querySelectorAll('#hama-color')
    .forEach((element) => element.remove())
}
