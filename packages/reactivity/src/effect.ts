const targetMap = new WeakMap()
let activeEffect

// 收集依赖
export function track(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }
  deps.add(activeEffect)
}

// 触发依赖
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) return
  let deps = depsMap.get(key)
  if (!deps) return
  deps.forEach(fn => {
    fn()
  })
}

export function effect(fn) {
  activeEffect = fn
  fn()
}
