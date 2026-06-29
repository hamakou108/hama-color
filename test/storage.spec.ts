import { describe, it, expect, beforeEach, vi } from 'vitest'
import { getStorageData, setStorageData } from '../src/utils/storage'

describe('storage', () => {
  let setMock: ReturnType<typeof vi.fn>
  let getMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    setMock = vi.fn()
    getMock = vi.fn()

    globalThis.chrome = {
      storage: {
        sync: {
          set: setMock,
          get: getMock,
        },
      },
    } as unknown as typeof chrome
  })

  describe('getStorageData', () => {
    it('should return stored values when they exist', async () => {
      getMock.mockResolvedValue({
        canViewFrame: true,
        ruleString: 'example.com,red',
      })

      const result = await getStorageData(['canViewFrame', 'ruleString'])

      expect(result).toEqual({
        canViewFrame: true,
        ruleString: 'example.com,red',
      })
      expect(getMock).toHaveBeenCalledWith(['canViewFrame', 'ruleString'])
    })

    it('should return all default values when storage is empty', async () => {
      getMock.mockResolvedValue({})

      const result = await getStorageData(['canViewFrame', 'ruleString'])

      expect(result).toEqual({
        canViewFrame: true,
        ruleString: '',
      })
    })

    it('should handle single canViewFrame key request', async () => {
      getMock.mockResolvedValue({
        canViewFrame: false,
      })

      const result = await getStorageData(['canViewFrame'])

      expect(result).toEqual({
        canViewFrame: false,
      })
    })

    it('should handle single ruleString key request', async () => {
      getMock.mockResolvedValue({
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

      expect(setMock).toHaveBeenCalledWith({
        canViewFrame: false,
        ruleString: 'example.com,green',
      })
    })
  })
})
