import { effect } from "../src/effect"
import { isProxy, isReadonly, readonly, shallowReadonly } from "../src/reactive"

describe('readonly', () => {
  it('happy path', () => {
    const obj = readonly({ foo: 1 })
    console.warn = jest.fn()
    expect(obj.foo).toBe(1)
    obj.foo = 2
    expect(console.warn).toBeCalledTimes(1)
    expect(isReadonly(obj)).toBe(true)
    expect(isProxy(obj)).toBe(true)
  })
  it('test shallowReadonly', () => {
    const obj = readonly({
      foo: 1, bar: {
        foo: 1
      }
    })
    expect(isReadonly(obj)).toBe(true)
    expect(isReadonly(obj.bar)).toBe(true)


    const shallowObj = shallowReadonly({
      foo: 1, bar: {
        foo: 1
      }
    })

    expect(isReadonly(shallowObj)).toBe(true)
    expect(isReadonly(shallowObj.bar)).toBe(false)

  })
})