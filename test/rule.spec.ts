import { describe, test, expect } from 'vitest'
import { getEffect } from '../src/utils/rule'

describe('~/utils/rule', () => {
  describe('getEffect', () => {
    test('single rule', () => {
      const text = 'https://foo.com,red'

      const url = new URL('https://foo.com')
      expect(getEffect(text, url)).toEqual({
        color: 'red',
      })
    })

    test('multiple rules', () => {
      const text =
        'https://foo.com,red\nhttps://bar.com,blue\r\nhttps://baz.com,green'

      const fooUrl = new URL('https://foo.com')
      expect(getEffect(text, fooUrl)).toEqual({
        color: 'red',
      })

      const barUrl = new URL('https://bar.com')
      expect(getEffect(text, barUrl)).toEqual({
        color: 'blue',
      })

      const bazUrl = new URL('https://baz.com')
      expect(getEffect(text, bazUrl)).toEqual({
        color: 'green',
      })
    })

    test('specify a partial url', () => {
      const text = 'foo,red'

      const fooUrl = new URL('https://foo.com')
      expect(getEffect(text, fooUrl)).toEqual({
        color: 'red',
      })
    })
  })
})
