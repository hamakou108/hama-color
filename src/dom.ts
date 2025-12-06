import { Effect } from './rule'

export const useDom = () => {
  const setPageEdgeColor = (effect: Effect): void => {
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

  const resetPageEdgeColor = (): void => {
    document.body
      .querySelectorAll('#hama-color')
      .forEach((element) => element.remove())
  }

  return {
    setPageEdgeColor,
    resetPageEdgeColor,
  }
}
