![20210422115251](https://obs-1d2f.oss-cn-hangzhou.aliyuncs.com/images/20210422115251.png)

```javascript
function showBadge(left, right, bg1, bg2) {
  console.log(
    '%c '.concat(left, ' %c ').concat(right, ' '),
    'padding: 2px; border-radius: 3px 0 0 3px; color: #fff; background: '.concat(bg1, ';'),
    'padding: 2px; border-radius: 0 3px 3px 0; color:#fff; background: '.concat(bg2, ';')
  )
}
```
