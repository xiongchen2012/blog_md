### 安装preset-env

```
npm install --save-dev babel-preset-env
#OR
npm install --save-dev @babel/preset-env
```

### preset-env是什么

首先它是一个preset，使用方法和其它preset是没有任何差别。如果不进行任何配置的话，**env = es2015 + es2016 + es2017**。既然这样为什么还要搞一个新的preset呢？用户配置3个preset不就行了么？原因如下：

```javascript
/*
ES2015转译ES6比ES5新的语法；ES2016转译比ES2015更新的语法；ES2017转译比ES2016更新的语法这些行为是默认的，这些preset经常做的太多了。比如大部分现代浏览器都支持generator函数，但是preset-es2015还是会将其转译成复杂的ES5代码
*/
```

有了preset-env之后，可以根据你需要支持的浏览器（或说是某个目标环境）进行配置，preset-env会自动包括需要的polyfill和transform插件，这样的话打包出来的文件尺寸会小很多。preset-env支持几种目标环境配置的方式：

1. 浏览器

   preset-env使用 [browserslist](https://github.com/ai/browserslist) 来解析你的配置，所以用任意browserlist语法进行配置都可以。例如：

   ```json
   {
     "presets": [
       ["env", {
         "targets": {
           "browsers": ["last 2 versions", "safari >= 7"]
         }
       }]
     ]
   }
   ```

   babel会自动引入并转译：所有浏览器最后两个版本，以及Safari版本大于7支持所需要的polyfill和transform

   这里有一份browser query语法的参考： https://github.com/browserslist/browserslist#full-list

2. Node.js

   同样的，也可以指定node的版本：

   ```json
   {
     "presets": [
       ["env", {
         "targets": {
           "node": "6.10"  //或者指定成current，表示
         }
       }]
     ]
   }
   ```

### preset-env是如何工作的

1. 判断environment能支持的ECMAScript新特性

   babel通过 [compat-table](https://github.com/kangax/compat-table) 这个完整的表格来查询某个环境能够支持的ECMAScript新特性（列），然后定期的运行一个脚本（[build-data.js](https://github.com/babel/babel-preset-env/blob/master/scripts/build-data.js)）生成 [plugin.json](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json) ，如下：

   ```json
   {
     // 省略很多
     "transform-es2015-arrow-functions": {
       "chrome": "47",
       "edge": "13",
       "firefox": "45",
       "safari": "10",
       "node": "6",
       "ios": "10",
       "opera": "34",
       "electron": "0.36"
     }
     // 省略很多
   }
   ```

2. 维护了一个ECMAScript新特性和babel plugin之间的映射

   babel维护了一个js新特性和plugin之间的映射表：[plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js) 

   ```javscript
   const es2015 = {
     //省略一部分
     "transform-es2015-arrow-functions": {
       features: [
         "arrow functions",
       ],
     },
     //省略一部分
   };
   const es2016 = {
     "transform-exponentiation-operator": {
       features: [
         "exponentiation (**) operator",
       ],
     }
   };
   //省略其它
   ```

### preset-env的选项

- targets

  指定preset-env的目标环境，有browser和node两种形式

  1. browsers ` Array<string> | string `

     支持 [browserslist](https://github.com/ai/browserslist) 查询语法，需要注意的是targets.browsers明确指定的浏览器会覆盖查询结果。

     ```json
     {
       "presets": [
         ["env", {
           "targets": {
             "browsers": ["last 2 versions", "safari >= 7"] //这里可以用browserslist查询语法
           }
         }]
       ]
     }
     ```

  2. node `number | string | 'current' | true`

     可以指定nodejs的版本号（`number | string`），也可以指定成 `'current' ` 或者是 `true` 表示当前babel运行的node版本（等价于： `node: process.versions.node`）

     ```json
     {
       "presets": [
         ["env", {
           "targets": {
             "node": '6.10' // OR 6.10 OR 'current' OR true
           }
         }]
       ]
     }
     ```

  targets还支持一个 `uglify` 选项（默认打开）：当你使用uglify-js最小化你的代码时，因为uglifyjs不支持ES2015+的语法，所以会有语法错误。打开个这选项后，babel会使所有的transfrom插件生效，这样会把代码完全编译成ES5。但是需要注意的是：`useBuiltIns` 选项会继续生效，只会导入目环境所需的polyfills

- modules

  指定转换ES6模块语法到指定的模块类型，支持` amd | umd | systemjs | commonjs | false` ，默认是 `commonjs` ，也可以指定为false不转换任何模块语法。

- include `Array<string>`

  include可以指定你想始终包括在内的插件，有两种有效的指定方式：

  1. plugin的名字，有没有 `babel-plugin-` 前缀都可以
  2. Built-Ins，比如`map,set,object.assign` 等（[Built-ins](https://github.com/babel/babel-preset-env/blob/master/data/built-in-features.js) ）

- exclude

  exclude可以指定你想始终不包括在内的插件，语法和include是一样的。

  **注意事项**：include和exclude仅对preset-env包括的这些插件列表生效，也就是 [plugin-features.js](https://github.com/babel/babel-preset-env/blob/master/data/plugin-features.js)  中指定的那些插件。

  > always include arrow functions, explicitly exclude generators

  ```
  {
    "presets": [
      ["env", {
        "targets": {
          "browsers": ["last 2 versions", "safari >= 7"]
        },
        "include": ["transform-es2015-arrow-functions", "es6.map"],
        "exclude": ["transform-regenerator", "es6.set"]
      }]
    ]
  }
  ```

- useBuiltIns `boolean`

  默认是false，打开后会根据目标环境转译相应的polyfills（也是通过babel-polyfill），启用这个选项后，当遇到`import 'babel-polyfill'` 时，会使用独立的babel-polyfill替换掉它。

  ```javascript
  // Input
  import 'babel-polyfill';

  // useBuiltIns: true
  // Output(会根据不同的env替换为不同的polyfills)
  import "core-js/modules/es7.string.pad-start";
  import "core-js/modules/es7.string.pad-end";
  import "core-js/modules/web.timers";
  import "core-js/modules/web.immediate";
  import "core-js/modules/web.dom.iterable";
  ```
