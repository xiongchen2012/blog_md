> **Object.defineProperty**

**缺点：**

- 只能监听get和set
- 不能监听数组的变化（push,pop,unshift,shift,splice,sort,reverse做了特殊处理)
- 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历，如果属性值也是对象那么需要深度遍历

> **Proxy**

**优点：**

- 支持13种方法的拦截，这个几乎可以监听到对象的方方面面
  - `get` 拦截对象属性的读取
  - `set` 拦截对象属性的设置
  - `has` 拦截`propKey in proxy`的操作
  - `deleteProperty` 拦截`delete proxy[propKey]`的操作
  - `ownKeys` 拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环
  - `getOwnPropertyDescriptor` 拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`
  - `defineProperty` 拦截`Object.defineProperty`和`Object.defineProperties`
  - `preventExtensions` 拦截`Object.preventExtensions`r操作
  - `getPrototypeOf ` 拦截`Object.getPrototypeOf`操作，
  - `isExtensible(target)`：拦截`Object.isExtensible(proxy)`。
  - `setPrototypeOf `拦截`Object.setPrototypeOf`
  - `apply`：拦截 Proxy 实例作为函数调用的操作，如`proxy.apply(...)`
  - `construct` 拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。
- 可以监听到数组的变化
- 监听的是对象，而不是单纯的属性

> 参考资料

https://juejin.im/post/5acd0c8a6fb9a028da7cdfaf
