import { useRule } from '../src/rule'

describe('~/rule', () => {
  describe('getEffect', () => {
    test('single rule', () => {
      const text = 'https://foo.com,red'
      const pattern = useRule(text)

      const url = new URL('https://foo.com')
      expect(pattern.getEffect(url)).toEqual({
        color: 'red',
      })
    })

    test('multiple rules', () => {
      const text =
        'https://foo.com,red\nhttps://bar.com,blue\r\nhttps://baz.com,green'
      const pattern = useRule(text)

      const fooUrl = new URL('https://foo.com')
      expect(pattern.getEffect(fooUrl)).toEqual({
        color: 'red',
      })

      const barUrl = new URL('https://bar.com')
      expect(pattern.getEffect(barUrl)).toEqual({
        color: 'blue',
      })

      const bazUrl = new URL('https://baz.com')
      expect(pattern.getEffect(bazUrl)).toEqual({
        color: 'green',
      })
    })

    test('specify a partial url', () => {
      const text = 'foo,red'
      const pattern = useRule(text)

      const fooUrl = new URL('https://foo.com')
      expect(pattern.getEffect(fooUrl)).toEqual({
        color: 'red',
      })
    })
  })
})
