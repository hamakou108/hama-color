import type { Effect } from '@/utils/rule'

export default defineContentScript({
  matches: ['*://*/*'],
  main() {
    browser.runtime.onMessage.addListener(
      (message: { action: 'set'; effect: Effect } | { action: 'reset' }) => {
        if (message.action === 'set') {
          setPageEdgeColor(message.effect)
        } else if (message.action === 'reset') {
          resetPageEdgeColor()
        }
      },
    )
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
