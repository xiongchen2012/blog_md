## package.json中的各种dependencies
---
一共有几种dependency?<br/>
答案是5种：**dependency**、**devDependency**、**peerDependency**、**bundleDependency**、**optionalDependency**

### dependency和devDependency

顾名思义：<br>dependency是项目的直接必须依赖，少一个项目就无法正常运行；<br>devDependency是项目在开发时必不可少的依赖，比如Babel，打包，测试等等。

dep和deDep的区别就在于npm/yarn install的时候：

1. dependency：必定会被安装
2. devDependecncy：如果没有指定--production选项，也会被安装。一旦指定了production选项（生产环境）那么开发的依赖可以不需要安装。
3. dependency的包内部的devDependency依赖是不会被安装的。

### peerDependency

同伴依赖!基友依赖？用的比较多的场景是插件开发。比如echarts-for-react包是为echarts开发的React版本，所以在echarts-for-react的工程中声明了对echarts的同伴依赖（peerDependency）。这样的话意味着：如果你想安装并使用echarts-for-react最新的包，请确保一定要先装echarts的最新版本包（这叫解决echarts-for-react的同伴依赖问题），如果你不先安装echarts，或者安装的版本不是最新，echarts-fro-react可能就无法正常工作了。<br>

在npm1.x和2.x的时候，npm默认情况下会直接把peerDependcy给装上去，3.x以后默认不安装peerDependency，而是给出一个WARN，提示用户自行去安装这些同伴依赖。比如：

> npm WARN peerDependencies The peer dependency mocha@>=1.x.x included from grunt-mocha-istanbul will no longer be automatically installed to fulfill the peerDependency in npm 3+. Your application will need to depend on it explicitly.

### bundleDependency

bundleDependency不添加新的依赖，而是将bundleDependency的包目录都移到宿主目录下，否则都是直接扔到node_modules下面。

package.json
``` js
{
  "name": "package-a",
  "dependencies": {
    "react": "^15.0.0",
    "core-js": "^2.0.0",
    "lodash": "^4.0.0"
  },
  "bundleDependencies": [
    "react",
    "core-js"
  ]
}
```

node_modules的文件夹结构就变成了：
```
├── node_modules
    ├── package-a
    │   └── react
    │   └── core-js
    └── loadsh
```

如果不指定bundleDependency的话，应该是这样的：
```
├── node_modules
    ├── package-a
    ├── react
    ├── core-js
    └── loadsh
```

### optionalDependency

可选依赖，可选依赖即使安装失败系统也能够正常运行，npm也能继续走下去。<br>
可选依赖使用的场景一般是将依赖作为插件安装，安装的时候就执行插件的代码，没有就算了。

```js
try {
  var plugin = require('optionalDev')
} catch (er) {
  plugin = null
}
if ( plugin ) {
  plugin.someMethod();
}
```

note:optionDependency会覆盖dependency，所以不要两个地方都同时指定同一个package。
