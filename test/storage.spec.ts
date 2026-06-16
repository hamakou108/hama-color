import { describe, it, expect, beforeEach } from 'vitest'
import { fakeBrowser } from 'wxt/testing'
import { getStorageData, setStorageData } from '../src/utils/storage'

describe('storage', () => {
  beforeEach(() => {
    fakeBrowser.reset()
  })

  describe('getStorageData', () => {
    it('should return stored values when they exist', async () => {
      await fakeBrowser.storage.sync.set({
        canViewFrame: true,
        ruleString: 'example.com,red',
      })

      const result = await getStorageData(['canViewFrame', 'ruleString'])

      expect(result).toEqual({
        canViewFrame: true,
        ruleString: 'example.com,red',
      })
    })

    it('should return all default values when storage is empty', async () => {
      const result = await getStorageData(['canViewFrame', 'ruleString'])

      expect(result).toEqual({
        canViewFrame: true,
        ruleString: '',
      })
    })

    it('should handle single canViewFrame key request', async () => {
      await fakeBrowser.storage.sync.set({
        canViewFrame: false,
      })

      const result = await getStorageData(['canViewFrame'])

      expect(result).toEqual({
        canViewFrame: false,
      })
    })

    it('should handle single ruleString key request', async () => {
      await fakeBrowser.storage.sync.set({
        ruleString: 'example.com,blue',
      })

      const result = await getStorageData(['ruleString'])

      expect(result).toEqual({
        ruleString: 'example.com,blue',
      })
    })
  })

  describe('setStorageData', () => {
    it('should set storage values', async () => {
      await setStorageData({
        canViewFrame: false,
        ruleString: 'example.com,green',
      })

      const stored = await fakeBrowser.storage.sync.get([
        'canViewFrame',
        'ruleString',
      ])
      expect(stored).toEqual({
        canViewFrame: false,
        ruleString: 'example.com,green',
      })
    })
  })
})
