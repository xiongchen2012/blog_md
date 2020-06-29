#### 图片相关的优化

1. JPG

   - 有损压缩，体积小，不透明

   - 场景：大图、背景图、电商banner等

2. PNG

   - 无损压缩，体积大，支持透明
   - 场景：Logo，颜色少对比强列的小图

3. SVG

   - 文本格式，矢量，支持任意缩放不失真
   - 场景：图标

4. Base64编码

   - 小图进行编码（url-loader）
   - 场景：小logo

5. webp

   - 透明、体积小、支持动画

   - 目前只有chrome支持，其它浏览器支持很差

   - 兼容性预判

     - JS代码中判断是否支持webp，然后渲染不同的图片

       ```html
       支持webp时
       <img src='http://cdn.xxx.com/abcde.jpg.webp' />  
       不支持web时
       <img src='http://cdn.xxx.com/abcde.jpg' /> 
       ```

     - 请求头Accept中带上image/webp，然后服务端根据这个头去给出不同的图片地址

6. 雪碧图

   - 用于减少请求次数
   - http2的多路复用可以让雪碧图优势尽失（[假如HTTP/2已经普及](https://aotu.io/notes/2016/06/14/http2/index.html)）
   - webpack打包已支持自动生成雪碧图(webpack-spritesmith插件)
   - 现在还在用雪碧图的多半是为了兼容http1.1