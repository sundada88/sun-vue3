import { effect } from '../src/effect'
import { reactive } from '../src/reactive'

describe('effect', () => {
  it('happy path', () => {
    const obj = reactive({ foo: 1 })
    const fn = jest.fn(() => obj.foo)
    effect(fn)
    expect(fn).toHaveBeenCalledTimes(1)
    obj.foo = 2
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
