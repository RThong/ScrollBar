# ScrollBar

## 介绍

原生 JavaScript 实现的改变滚动条样式，兼容到 IE7+。

效果演示：[https://RThong.github.io/ScrollBar/demo.html](https://RThong.github.io/ScrollBar/demo.html)

## 兼容性

IE10+ 

## 依赖

原生 JavaScript 实现，无依赖。


## 使用

```html
<script src="./ScrollBar.js"></script>
```

## 示例

HTML 文件：

```html
<div class="scrollbar-container">
    <div class="scrollbar">
      <div class="scroll-thumb"></div>
      <div class="scroll-track"></div>
    </div>
    <div>
      //需要改变滚动条样式的内容
      ...
    </div>
</div>
```
CSS 文件：

```css
//可根据需要自己调整,demo内有示例
```

JavaScript 文件：

```js
var scrollBar = new ScrollBar({
  el: '',//内容元素
  moveDist: //鼠标滚轮一次滚动距离
});
```

