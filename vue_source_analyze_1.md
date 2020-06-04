### 寻找Vue的入口

根据`package.json`中的npm scripts，运行build命令执行的是`node scripts/build.js`

- scripts/build.js

```js
let builds = require('./config').getAllBuilds()
```

- scripts/config.js

```js
 'web-full-esm-browser-dev': {
    entry: resolve('web/entry-runtime-with-compiler.js'),
  },
```

- src/platforms/web/entry-runtime-with-compiler.js

```js
import Vue from './runtime/index'
```

- src/platforms/web/runtime/index.js

```js
import Vue from 'core/index'
```

- src/core/index.js

```js
import Vue from './instance/index'

initGlobalAPI(Vue)  // 初始化全局API
```

- src/core/instance/index.js

至此找到了VUE的真正入口，这个文件是VUE的构造函数。上面几个文件应该是往Vue.prototype上挂一些方法

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

