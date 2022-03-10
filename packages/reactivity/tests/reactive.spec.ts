import { reactive } from '../src/reactive'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 'bar' }
    const obj = reactive(origin)
    expect(origin).not.toBe(obj)
    expect(obj.foo).toBe('bar')
  })
})
