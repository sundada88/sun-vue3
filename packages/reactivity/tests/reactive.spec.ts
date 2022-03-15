import { isProxy, isReactive, reactive, shallowReactive } from '../src/reactive'

describe('reactive', () => {
  it('happy path', () => {
    const origin = { foo: 'bar' }
    const obj = reactive(origin)
    expect(origin).not.toBe(obj)
    expect(obj.foo).toBe('bar')
    expect(isProxy(obj)).toBe(true)
  })
  test('Object', () => {
    const original = {
      foo: 1, bar: {
        foo: 123
      }
    }
    const observed = reactive(original)
    expect(observed).not.toBe(original)
    expect(isReactive(observed)).toBe(true)
    expect(isReactive(observed.bar)).toBe(true)
    expect(isReactive(original)).toBe(false)
    const shallowObj = shallowReactive(original)
    expect(isReactive(shallowObj)).toBe(true)
    expect(isReactive(shallowObj.bar)).toBe(false)
    // // get
    // expect(observed.foo).toBe(1)
    // // has
    // expect('foo' in observed).toBe(true)
    // // ownKeys
    // expect(Object.keys(observed)).toEqual(['foo'])
  })
})
