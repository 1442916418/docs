# vuex

## vuex 的理解

`vuex` 是专门为 `vue` 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。（无法持久化、内部核心原理是通过创造一个全局实例 `new Vue`）

![vuex](/images/vuex.png)

主要包括以下几个模块：

- `State`：定义了应用状态的数据结构，可以在这里设置默认的初始状态
- `Getter`：允许组件从 `store` 中获取数据，`mapGetters` 辅助函数仅仅是将 `store` 中的 `getter` 映射到局部计算属性
- `Mutation`：是唯一更改 `store` 中状态的方法，且必须是同步函数
- `Action`：用于提交 `mutation`，而不是直接变更状态，可以包含任意异步操作
- `Module`：允许将单一的 `store` 拆分为多个 `store` 且同时保存在单一的状态树中

## Vuex 页面刷新数据丢失怎么解决

需要做 `vuex` 数据持久化 一般使用本地存储的方案来保存数据 可以自己设计存储方案 也可以使用第三方插件
推荐使用 `vuex-persist` 插件，它就是为 `Vuex` 持久化存储而生的一个插件。不需要你手动存取 `storage` ，而是直接将状态保存至 `cookie` 或者 `localStorage` 中

## Vuex 为什么要分模块并且加命名空间

**模块**: 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，`store` 对象就有可能变得相当臃肿。为了解决以上问题，`Vuex` 允许我们将 `store` 分割成模块（`module`）。每个模块拥有自己的 `state`、`mutation`、`action`、`getter` 甚至是嵌套子模块。

**命名空间**：默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在全局命名空间的 ———— 这样使得多个模块能够对同一 `mutation` 或 `action` 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true`的方式使其成为带命名空间的模块。当模块被注册后，它的所有 `getter`、`action` 及 `mutation` 都会自动根据模块注册的路径调整命名。
