#### HTTP优化

HTTP优化的目标有两个：

1. 减少请求数（静态资源的合并）
2. 减少单次请求花费的时间（静态资源的压缩）

合并和压缩正好是构建工具的职责；`Webpack`是前端构建的霸主；



####  优化打包速度

1. 不要让 loader 做太多事情

   用`include/exclude`包含/排除掉不必要的目录，如node_modules等

2. DllPlugin优化第3方库（vendors）

   把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。**这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包**。

   - 基于DLL配置文件，打包DLL库    `DllPlugin`  ->   `vendor.js`和`vendor-manifest.json`
   - 基于webpack.config.js文件，打包业务代码  `DllReferencePlugin` 引用 `vendor-manifest.json`

3. Happypack插件将loader从单线程变为多线程（下面是伪代码）

   ```js
   loader: 'happypack/loader?id=happyBabel',
   
   plugins: [
     new HappyPack({
         // 这个HappyPack的“名字”就叫做happyBabel，和loader的参数遥相呼应
       id: 'happyBabel',
       loaders: ['babel-loader?cacheDirectory']
     })
   ],
   
   ```

#### 优化构建尺寸

1. 用webpack-bundle-analyzer分析各个bundle的大小
2. 删除冗余代码，主要技术是Tree Shaking
3. 按需加载/Code Splitting
   - 基于`require.ensure(dependencies, callback, chunkName)`，按需加载；
   - 基于`import`返回`promise`的提案;
   - `React.lazy`

#### GZIP

1. GZIP的核心是Deflate，基于文本压缩；
2. 服务端开启；
3. Webpack也支持gzip压缩；
4. 二进制文件（图片等）gzip效果不大；文本文件（js,css）效果显著；

