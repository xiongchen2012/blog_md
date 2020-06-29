#### HTTP缓存

强缓存优先级高，强缓存未命中时才会走到协商缓存 ；

1. 强缓存 - expires和cache-control

   `expires: ${timestamp}`

    设置一个时间戳，指定资源的到期时间；依赖浏览器本地时间，局限性大

   `Cache-Control`

   - expires的完全替代方案

   - 可缓存性

     > `public`：任何节点都可以缓存（包括代理、CDN）
     >
     > `private` ：告知中间节点不要缓存，只有发起请求的浏览器可以缓存

   - 过期时间

     > `max-age=<seconds>`：资源在指定有效期内有效
     >
     > `s-maxage=<seconds>`：同上，但优先级更高（但是仅在代理服务器上生效）

   - 重新验证

     > `must-revalidate`：如果max-age过期，必须重新验证
     >
     > `no-store` ：不缓存任何内容
     >
     > `no-cache` ： 缓存，但是每次都会向服务器验证资源有没有过期（走协商缓存路线去了）

2. 协商缓存 - last-modified和etag

   - `last-modified` 和 `if-modified-since`

     开启协商缓存后响应头中会返回`last-modified`，值是资源最后一次更新的时间戳；接下来每次请求头`if-modified-since`中会带上这个时间戳，服务端会根据时间进行对比：

     - 如果资源变了：会重新下载资源并更新响应头中里`last-modified`；

     - 如果资源没变：返回304，并且响应头里不会有`last-modified`

   - `etag` 和 `if-none-match`

     开启协商缓存后响应头中会返回`etag`，值是资源的唯一标识符（如MD5）；接下来每次请求头`if-none-match`中会带上这个值，服务端对比当前资源的唯一标识和请求头中的值 是否一致；

     - 如果资源变了：会重新下载资源，并更新响应头中的etag；
     - 如果资源没变：返回304，并且响应头里不会有etag；

   - etag优先级高于last-modified

​     

#### Memory Cache

- Base64 格式的图片，几乎永远可以被塞进 memory cache；
- 体积不大的 JS、CSS 文件，也有较大地被写入内存的几率；

