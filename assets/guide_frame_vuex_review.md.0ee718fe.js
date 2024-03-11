import{_ as e,o,c,Q as d}from"./chunks/framework.aea2adc8.js";const t="/docs/images/vuex.png",m=JSON.parse('{"title":"vuex","description":"","frontmatter":{},"headers":[],"relativePath":"guide/frame/vuex/review.md","filePath":"guide/frame/vuex/review.md","lastUpdated":1710141660000}'),a={name:"guide/frame/vuex/review.md"},r=d('<h1 id="vuex" tabindex="-1">vuex <a class="header-anchor" href="#vuex" aria-label="Permalink to &quot;vuex&quot;">​</a></h1><h2 id="vuex-的理解" tabindex="-1">vuex 的理解 <a class="header-anchor" href="#vuex-的理解" aria-label="Permalink to &quot;vuex 的理解&quot;">​</a></h2><p><code>vuex</code> 是专门为 <code>vue</code> 提供的全局状态管理系统，用于多个组件中数据共享、数据缓存等。（无法持久化、内部核心原理是通过创造一个全局实例 <code>new Vue</code>）</p><p><img src="'+t+'" alt="vuex"></p><p>主要包括以下几个模块：</p><ul><li><code>State</code>：定义了应用状态的数据结构，可以在这里设置默认的初始状态</li><li><code>Getter</code>：允许组件从 <code>store</code> 中获取数据，<code>mapGetters</code> 辅助函数仅仅是将 <code>store</code> 中的 <code>getter</code> 映射到局部计算属性</li><li><code>Mutation</code>：是唯一更改 <code>store</code> 中状态的方法，且必须是同步函数</li><li><code>Action</code>：用于提交 <code>mutation</code>，而不是直接变更状态，可以包含任意异步操作</li><li><code>Module</code>：允许将单一的 <code>store</code> 拆分为多个 <code>store</code> 且同时保存在单一的状态树中</li></ul><h2 id="vuex-页面刷新数据丢失怎么解决" tabindex="-1">Vuex 页面刷新数据丢失怎么解决 <a class="header-anchor" href="#vuex-页面刷新数据丢失怎么解决" aria-label="Permalink to &quot;Vuex 页面刷新数据丢失怎么解决&quot;">​</a></h2><p>需要做 <code>vuex</code> 数据持久化 一般使用本地存储的方案来保存数据 可以自己设计存储方案 也可以使用第三方插件 推荐使用 <code>vuex-persist</code> 插件，它就是为 <code>Vuex</code> 持久化存储而生的一个插件。不需要你手动存取 <code>storage</code> ，而是直接将状态保存至 <code>cookie</code> 或者 <code>localStorage</code> 中</p><h2 id="vuex-为什么要分模块并且加命名空间" tabindex="-1">Vuex 为什么要分模块并且加命名空间 <a class="header-anchor" href="#vuex-为什么要分模块并且加命名空间" aria-label="Permalink to &quot;Vuex 为什么要分模块并且加命名空间&quot;">​</a></h2><p><strong>模块</strong>: 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，<code>store</code> 对象就有可能变得相当臃肿。为了解决以上问题，<code>Vuex</code> 允许我们将 <code>store</code> 分割成模块（<code>module</code>）。每个模块拥有自己的 <code>state</code>、<code>mutation</code>、<code>action</code>、<code>getter</code> 甚至是嵌套子模块。</p><p><strong>命名空间</strong>：默认情况下，模块内部的 <code>action</code>、<code>mutation</code> 和 <code>getter</code> 是注册在全局命名空间的 ———— 这样使得多个模块能够对同一 <code>mutation</code> 或 <code>action</code> 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 <code>namespaced: true</code>的方式使其成为带命名空间的模块。当模块被注册后，它的所有 <code>getter</code>、<code>action</code> 及 <code>mutation</code> 都会自动根据模块注册的路径调整命名。</p>',11),i=[r];function u(s,n,l,x,p,_){return o(),c("div",null,i)}const h=e(a,[["render",u]]);export{m as __pageData,h as default};