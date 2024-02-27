# vue-router

## vue-router 路由模式有几种？

`vue-router` 有 3 种路由模式：**hash**、**history**、**abstract**，对应的源码如下所示：

```js
switch (mode) {
  case 'history':
  this.history = new HTML5History(this, options.base)
  break
  case 'hash':
  this.history = new HashHistory(this, options.base, this.fallback)
  break
  case 'abstract':
  this.history = new AbstractHistory(this, options.base)
  break
  default:
  if (process.env.NODE_ENV !== 'production') {
    assert(false, `invalid mode: ${mode}`)
  }
}
```

其中，3 种路由模式的说明如下：

- **hash**: 使用 `URL hash` 值来作路由。支持所有浏览器，包括不支持 `HTML5 History Api` 的浏览器  
- **history**: 依赖 `HTML5 History API` 和服务器配置。具体可以查看 `HTML5 History` 模式  
- **abstract**: 支持所有 `JavaScript` 运行环境，如 `Node.js` 服务器端。如果发现没有浏览器的 `API`，路由会自动强制进入这个模式.

## vue-router 中常用的 hash 和 history 路由模式实现原理吗？

- **hash 模式的实现原理**

早期的前端路由的实现就是基于 `location.hash` 来实现的。其实现原理很简单，`location.hash` 的值就是 **URL** 中 **#** 后面的内容。比如下面这个网站，它的 `location.hash` 的值为 '#search'：

```txt
https://www.word.com#search
```

`hash` 路由模式的实现主要是基于下面几个特性：

- **URL** 中 `hash` 值只是客户端的一种状态，也就是说当向服务器端发出请求时，`hash` 部分不会被发送
- `hash` 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制 `hash` 的切换
- 可以通过 `a` 标签，并设置 `href` 属性，当用户点击这个标签后，**URL** 的 `hash` 值会发生改变；或者使用 `JavaScript` 来对 `location.hash` 进行赋值，改变 **URL** 的 `hash` 值
- 可以使用 `hashchange` 事件来监听 `hash` 值的变化，从而对页面进行跳转（渲染）

- **history 模式的实现原理**

**HTML5** 提供了 **History API** 来实现 **URL** 的变化。其中做最主要的 **API** 有以下两个：`history.pushState()` 和 `history.replaceState()`。这两个 **API** 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```txt
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```

`history` 路由模式的实现主要基于存在下面几个特性：

- `pushState` 和 `replaceState` 两个 **API** 来操作实现 **URL** 的变化
- 我们可以使用 `popstate`  事件来监听 **url** 的变化，从而对页面进行跳转（渲染）
- `history.pushState()` 或 `history.replaceState()` 不会触发 `popstate` 事件，这时我们需要手动触发页面跳转（渲染）

## vue-router 路由钩子函数是什么？执行顺序是什么？

路由钩子的执行流程, 钩子函数种类有: **全局守卫**、**路由守卫**、**组件守卫**

完整的导航解析流程:

1. 导航被触发
2. 在失活的组件里调用 `beforeRouteLeave` 守卫
3. 调用全局的 `beforeEach` 守卫
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)
5. 在路由配置里调用 `beforeEnter`
6. 解析异步路由组件
7. 在被激活的组件里调用 `beforeRouteEnter`
8. 调用全局的 `beforeResolve` 守卫 (2.5+)
9. 导航被确认
10. 调用全局的 `afterEach` 钩子
11. 触发 `DOM` 更新
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。