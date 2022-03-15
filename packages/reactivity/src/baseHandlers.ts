import { isObject } from "../../shared/src/index"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"

function createGetter(isReadonly, shallow) {
  return function get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly
    }
    const res = Reflect.get(target, key, receiver)
    // TODO: track
    if (!isReadonly) {
      track(target, key)
    }
    if (shallow) return res
    if (isObject(res)) return isReadonly ? readonly(res) : reactive(res)
    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const res = Reflect.set(target, key, value, receiver)
    // TODO: trigger
    trigger(target, key)
    return res
  }
}

const get = createGetter(false, false)
const readonlyGet = createGetter(true, false)
const shallowReactiveGet = createGetter(false, true)
const shallowReadonlyGet = createGetter(true, true)
const set = createSetter()
// reactive 需要的代理参数
export const mutableHandlers = {
  get,
  set
}

export const shallowReactiveHandlers = {
  get: shallowReactiveGet,
  set
}

// readonly 需要的代理参数
export const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    console.warn(`because this is a readonly object, so ${key} can't be set`)
    return true
  }
}

export const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
  set(target, key) {
    console.warn(`because this is a readonly object, so ${key} can't be set`)
    return true
  }
}