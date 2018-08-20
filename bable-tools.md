## Babel入门（2） 

### babel-cli

babel自带的命令行工具，用于在命令行编译源文件。babel-cli有两种安装方式：

1. 全局安装

   ```shell
   npm install --global babel-cli
   ```

   全局安装babel后，可以在任意工程下直接执行代码编译。但是官方并不推荐这种方式，而是极力推荐第2种随项目安装的方式，原因和webpack有点一致。

   - 不同的项目使用的Babel版本可以不同
   - 项目依赖的方式，不需要依赖宿主机上也安装Babel，这样的项目可移植性更强

2. 随项目安装

   ```shell
   npm install --save-dev babel-cli
   ```

   在项目内安装babel，借助于npx命令（npm>5.2.0）包执行器，可以在项目内直接执行babel命令。感觉就和全局安装了babel一样。

babel命令行工具的用法和参数很灵活，具体用到时参考官方文档更为高效和直接：https://babeljs.io/docs/en/babel-cli

和babel-cli一起被安装的还有一个名为babel-node的命令行工具，这个命令其实是babel的命令行REPL（Read-Eval-Print-Loop）

另外一个和babel-cli一起安装的命令行工具是babel-external-helpers，用这个命令可以生成一个包括了所有helper函数的js文件，然后在项目入口引入此文件后，再引入一个external-helpers的插件，这样在转码的时候可以直接使用helper js中的代码，可以节省很多代码量。（不这样的话每个模块开头都会重复引用这些helper函数），这个命令行用起比较麻烦，再加上现在有了 `babel-runtime` 包和 `transform-runtime` 插件，所以用的也比较少了。

### babel-core

Babel的核心包，所有的API都封装在这个包里。当你准备在自己的代码中对某段代码进行转码时，就需要引入这个包。通过这个包，可以对Javascript的**新语法**进行编译（仅仅是语法哦，）

```shell
npm install --save babel-core
```

然后就可以在代码中调用babel提供的API，主要的API有几个：

```javascript
var babel = require('babel-core');

/* 对以字符串形式指定的code进行转码 */
babel.transform('code',options) 

/* 对文件进行转码（异步） */
babel.transformFile('file.js',options,(err,result)=>{
   	console.log(result);
}) 

/* 对文件进行转码（同步） */
babel.transformFileSync('file.js',options);

/* AST转成Code */
babel.transformFromAst(ast, code, options);
```

具体的options非常多，不照搬官方文档了：https://babeljs.io/docs/en/babel-core#options

### tranform-runtime和babel-runtime

Babel默认情况下只会对Javascript新的语法进行转换，但是不会对新的API（如Promise，Map等）进行转换，项目中引入 `transform-runtime` 插件后就可以为这些新的API提供转换（垫片）。

Babel在编译时会使用一些很小的共通helper函数，比如： `_extend`，`_defineProperty` 等等。默认情况下Babel会在每一个引入这些工具函数的文件头部加上这些函数的代码。这种重复的代码在很多情况下是不必要的，尤其是你的项目有很多很多文件时，如果每个文件都被加上这些代码，最后编译出来的文件会非常大。

这个就是 `transform-runtime` 插件使用的原因之一： 插件会引用 `babel-runtime` 包里的helper函数，而不是将它们插入到项止js文件头部。`babel-runtime`  这个包会被编译到你的bundle中。

`transform-runtime` 插件还可以为你的代码创建一个沙箱环境，如果你用了 `babel-polyfill` （这个包会提供Promise，Set，Map这些新的API），它会污染你的全局环境。如果你开发的项目是APP或者命令行工具，也没有什么问题，但是如果你开发的是另外一个可能对外发布的**库/工具**，污染了全局环境就容易引发问题了。当然 `babel-runtime` 也提供了Promise，Set，Map等这些新的API，不过是在沙箱环境中运行的，不会污染全局环境。

一般把 `tranform-runtime` 安装到devDependencies中，而将 `babel-runtime` 安装在dependencies中

```shell
npm install --save-dev babel-plugin-transform-runtime
#OR
npm install --save-dev @babel/transform-runtime

npm install --save babel-runtime
```

`transform-runtime` 插件实际只做了3件事情：

1. 当使用`generator/async` 函数时，自动引用 `babel-runtime/regnerator` 进行编译
2. 当使用ES6静态方法（非实例方法）或其它内置语法时，自动引用 `babel-runtime/core-js` 进行编译
3. 用 `babel-runtime/helpers`  中的helper函数替换文件头中的那些helper函数

一句话理解：`tranform-runtime` 是使用了 `babel-runtime` 包，对新的API支持、集中存放Helper函数等进行编译的Babel插件，特别适用的场合是：**你在开发类库或工具**

### babel-polyfill

参考上一节 `babel-runtime` 已经是包括了很多polyfill 了，同样是引用了 core-js 和 regenerator，垫片支持也是一样，为什么又搞出一个 `babel-polyfill` 包？

> This will emulate a full ES2015+ environment and is intended to be used in an application rather than a library/tool. This polyfill is automatically loaded when using `babel-node`.

以上是官网给的解释：`babel-polyfill` 模拟一个完整的用于应用程序而非类库/工具开发的ES2015+环境，也就是说，你可以使用：

- `Promise`、`WeakMap` 等新的API

- `Array.from`、`Object.assign`等静态方法

- `Array.prototype.includes` 等实例方法 （注意：**`babel-runtime` 不能提供实例方法的垫片**）

- 生成器函数（generator）

为了达到这个目的，这些垫片会被挂到全局作用域，以及 `String`  等类的prototype上（感觉就像是为这些类增加了新的方法一样）。

使用`babel-polyfill` 需要将这个包保存在dependencies中，而不是devDependencies中。

```shell
npm install --save babel-polyfill
#OR
npm install --save @babel/polyfill
```

**必须在应用程序的入口中首先加载babel-polyfill，需要确保它在其它代码执行之前加载！**

```javascript
// First Line
require('babel-polyfill');
import "babel-polyfill";
import "@babel/polyfill";

//with webpack.config.js
module.exports = {
    entry: ["babel-polyfill","./src/app.js"]
}
```

### babel-register

这个包会给require加个hook，这个钩子会自动和node的 `require` 指令绑定，会自动编译文件。和coffeescript的register是一样的。

```shell
npm install --save-dev babel-register
```

在文件的开头先引入这个包后，每当使用`require`加载`.js`、`.jsx`、`.es`和`.es6`后缀名的文件，就会先用babel进行转码。

**babel-register是对require的文件进行编译转码，而不是对当前文件，这个不要搞错了**

```javascript
//userList.js
require('babel-register');
require('./index.js')
// another codes
```

会自动对index.js进行转码，而不是userList.js剩下的代码。

此外，还有两个需要注意的是：

1. 因为转码是实时的，所以这个包只适合在开发环境中使用
2. 这个包默认没有polyfill，需要单独引入polyfill

### transform-runtime 对比 babel-polyfill

其实通过上面的介绍我们已经了解他们是干什么的了，这里再稍微总结区分一下吧。我在这里把 babel-runtime 和 babel-plugin-transform-runtime 统称为 transform-runtime，因为一起用才比较好。

- babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。
- transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。**值得注意的是，instance 上新添加的一些方法，babel-plugin-transform-runtime 是没有做处理的，比如 数组的 includes, filter, fill 等，这个算是一个关键问题吧**

另外，关于 babel-runtime 为什么是 dependencies 依赖。它只是一个集中了 polyfill 的 library，对应需要的 polyfill 都是要引入项目中，并跟项目代码一起打包的。不过它不会都引入，你用了哪个，plugin 就给你 require 哪个。所以即使你最终项目只是 `require('babel-runtime/core-js/object/values')`其中的一个文件，但是对于这包来说，也是生产依赖的。

### 参考

1. https://segmentfault.com/a/1190000011155061
2. https://segmentfault.com/q/1010000005596587
3. http://www.ruanyifeng.com/blog/2016/01/babel.html

