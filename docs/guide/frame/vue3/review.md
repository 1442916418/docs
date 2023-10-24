# Vue3

## Vue3：Options API 与 Composition API 的区别

### 1. Options API

Options API 是 Vue 的传统编程模式。在这种模式下，我们通过定义 `data`、`computed`、`methods`、`watch` 等选项来描述组件的逻辑。

在大多数情况下，使用组件的选项组织逻辑是非常有效的。但是，当组件变得复杂时，导致这些选项的数量增加，可能会使组件难以阅读和理解。

### 2. Composition API

在 Composition API 中，我们不再基于选项组织逻辑，而是根据逻辑功能进行组织。这意味着与某个功能相关的所有逻辑都放在一起，从而实现高内聚和低耦合。

### 3. Composition API 相对于 Options API 的优点

- 逻辑组织
  - **Options API**：在处理大型组件时，相关的逻辑点容易分散在 `methods`、`computed`、`watch` 等选项中。这种碎片化使得代码阅读和维护变得困难。
  - **Composition API**：允许将某个逻辑关注点的所有代码放在一起。这样，当需要修改某个功能时，我们不再需要在文件中不断地跳转。

- 逻辑复用
  - **Options API**：在 Vue 2 中，混入（mixin）是复用逻辑的主要方式，但存在命名冲突和数据来源不明确的问题。
  - **Composition API**：提供了更灵活的逻辑复用机制，例如通过创建自定义 hooks 函数。

### 总结

- Composition API 在逻辑组织和复用方面明显优于 Options API。
  
- Composition API 更加函数式，从而提供更好的类型推断支持。

- Composition API 更加友好于 tree-shaking 和代码压缩。

- Composition API 不使用 `this`，从而避免了 `this` 指向不明的问题。

- 对于简单的小型组件，Options API 仍然是一个很好的选择。

## Vue3.0 性能提升主要是通过哪几方面体现的？

### 1. 编译阶段优化

在 Vue2 中，每个组件实例都对应一个 watcher 实例。它会在组件渲染的过程中记录用到的数据属性作为依赖。当依赖变更时，会通知 watcher 使关联的组件重新渲染。对此，Vue3 在编译阶段做了以下优化：

- **Diff 算法优化**：Vue3 在 diff 算法中，相比 Vue2，增加了静态标记。其作用是对可能发生变化的部分添加标记，从而在后续变化时直接进行比较。
  
- **静态提升**：Vue3 会对不参与更新的元素做静态提升。这些元素只会被创建一次，每次渲染时都会复用，避免了不必要的创建操作。

- **事件监听缓存**：在默认情况下，绑定的事件行为被视为动态绑定，所以每次都会追踪其变化。开启事件监听器缓存后，下次 diff 时可以直接复用。

- **SSR 优化**：当静态内容达到一定量级时，会在客户端生成一个 static node，避免了创建对象并根据对象渲染。

### 2. 源码体积

相较于 Vue2，Vue3 的整体体积减小了。除了去除了一些不常用的 API 外，其主要利益来自于 Tree shaking。例如，只有在用到 `ref`、`reactive`、`computed` 等函数时，它们才会被打包。

### 3. 响应式系统

Vue2 使用 `defineProperty` 来劫持并监听对象的属性。相反，Vue3 则采用了 `Proxy` 重写了响应式系统，它能：

- 监听动态属性的添加。
- 监听数组的索引和 `length` 属性的变化。
- 监听属性的删除。

### Vue3.0 为什么使用 Proxy API 替代 defineProperty API？

1.**Vue2 的局限性**：虽然 Vue2 使用 `defineProperty` 来实现响应式，但它：

- 无法检测对象属性的添加和删除。
- 无法监听数组的特定方法。
- 需要遍历每个属性进行监听，如果对象深度嵌套，则需要递归监听，可能造成性能问题。

2.**Proxy 的优势**：

- 可以直接劫持整个对象，并返回一个新对象。
- 可以直接监听数组的变化。
- Proxy 有多达 13 种拦截方法，例如 `apply`、`ownKeys`、`deleteProperty` 等。

### Vue3.0 响应式原理

Vue3 使用 ES6 的 `Proxy` 和 `Reflect` 为数据实现响应式，解决了 Vue2 中的某些限制。`Proxy` 为深度监听，所以它能监听对象和数组内的任意元素。

响应式系统大致分为三个阶段：

1. **初始化阶段**：组件初始化时创建对应的 `Proxy` 对象，并生成一个渲染的 `effect`。
2. **`get` 依赖收集阶段**：通过解析 template 来触发 `get`，并收集依赖。
3. **`set` 派发更新阶段**：当属性变化时，触发更新。

对于深度监听，Vue3 判断当前的返回值是否为对象。如果是，它会递归地使用 `reactive` 方法进行代理。此外，为了避免频繁的更新，Vue3 提供了策略来判断是否真的需要执行更新。

## 说说Vue 3.0中Treeshaking特性？

### 1、是什么？

Tree shaking 是一种通过清除多余代码的方式来优化项目打包体积的技术，也称为 "Dead code elimination"。简言之，在保持代码运行结果不变的前提下，去除无用的代码。

在 Vue 2 中，无论我们使用什么功能，它们最终都会出现在生产代码中。这主要是因为 Vue 实例在项目中是单例的，打包工具无法检测到该对象的哪些属性在代码中被使用到。但 Vue 3 源码引入了 tree shaking 特性，将全局 API 进行了分块处理。如果您不使用某些功能，它们将不会包含在您的打包结果中。

### 2、如何做？

Tree shaking 基于 ES6 模块语法（import 和 exports），主要利用 ES6 模块的静态结构特性。在编译时，就可以确定模块的依赖关系，以及输入和输出的变量。Tree shaking 主要完成两件事：

- 利用 ES6 Module 在编译阶段判断哪些模块已经加载。
- 判断哪些模块和变量未被使用或引用，并删除对应的代码。

### 3、作用（好处）？

通过 Tree shaking，Vue 3 为我们带来以下好处：

- 减少程序体积，使其更小。
- 减少程序执行时间，使其运行更快。
- 为未来程序架构优化提供了更多的可能性，使其更加友好。

## Vue3 新特性有哪些？

### 1、性能提升

- 由原来的 `Object.defineProperty` 改为基于 ES6 的 `Proxy`，提高响应式性能。
- 重写了 Vdom，包括 diff 算法优化和增加的静态标志。
- 进行了模板编译优化，如静态提升，使不参与更新的元素仅被创建一次。
- 更加高效的组件初始化。

### 2、更好的支持 TypeScript

- Vue.js 2.x 使用 Flow 进行类型检查，以避免因类型问题导致的错误，但 Flow 在一些复杂场景的类型检查上存在不足。
- Vue.js 3.0 抛弃了 Flow，选用 TypeScript 重新构建了整个项目，从而得到更加强大和精确的类型支持。

### 3、新增 Composition API

- Composition API 是 Vue 3 的一个新特性，与 mixin 相比，它更为强大。它可以将功能模块独立出来，提高代码逻辑的可复用性，同时增强代码压缩性。
- 在 Vue 3 中，`methods`、`watch`、`computed` 和 `data` 等都被放在了 `setup()` 函数中。
- `setup()` 函数会在 `created()` 生命周期之前执行，执行顺序为：`beforeCreate` -> `setup` -> `created`。

### 4、新增组件

- **Fragment**: Vue 3 不再限制 template 必须只有一个根节点。
- **Teleport**: 允许我们将组件的内容传送到页面上的任何位置。
- **Suspense**: 在等待异步组件加载过程中，允许渲染一些占位内容，提升用户体验。

### 5、Tree-shaking

- 支持 Tree shaking 优化，优化后的项目体积可能只有原来的一半，从而加快了页面加载速度。

### 6、Custom Renderer API

- 允许开发者不仅仅局限于 DOM 渲染，还可以使用例如 WebGL 这样的技术进行渲染。

## vue3 组合式API生命周期钩子函数有变化吗？

在 Vue3 中，引入了组合式 API 作为一种新的方式来组织和复用组件逻辑。由于 `setup` 函数是这个新 API 的入口点，因此 Vue3 的组合式 API 的生命周期钩子与传统的选项式 API 有所不同。

`setup` 函数确实是在 `beforeCreate` 和 `created` 生命周期钩子之间执行的，因此在使用组合式 API 时，通常不需要明确地定义这两个钩子。

为了在组合式 API 中使用生命周期钩子，Vue3 引入了一系列新的函数，它们的名称以 `on` 开头，如 `onMounted`、`onUpdated` 等。这些函数可以在 `setup` 函数中使用，它们的作用与传统生命周期钩子相似，但是它们是函数式的，并且需要在 `setup` 函数中明确调用。

值得注意的是，组合式 API 的生命周期钩子只能在 `setup` 函数中使用，并且必须在 `setup` 期间同步使用，因为它们依赖于内部的全局状态来定位当前的组件实例。

以下是选项式 API 与组合式 API 之间生命周期钩子的对比：

| 选项式 API     | 组合式 API       | 生命周期说明                             |
|----------------|------------------|------------------------------------------|
| beforeCreate   | (setup)          | 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。 |
| created        | (setup)          | 实例已经创建完成之后被调用。             |
| beforeMount    | onBeforeMount    | 在挂载开始之前被调用：相关的 render 函数首次被调用。 |
| mounted        | onMounted        | el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。 |
| beforeUpdate   | onBeforeUpdate   | 数据更新时调用，发生在虚拟 DOM 打补丁之前。 |
| updated        | onUpdated        | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁之后调用。 |
| beforeDestroy  | onBeforeUnmount  | 实例销毁之前调用。                       |
| destroyed      | onUnmounted      | Vue 实例销毁后调用。                     |
| errorCaptured  | onErrorCaptured  | 当捕获一个来自子孙组件的错误时被调用。   |
| activated      | onActivated      | keep-alive 组件激活时调用。              |
| deactivated    | onDeactivated    | keep-alive 组件停用时调用。              |

## `watch` 和 `watchEffect` 的区别？

`watch` 和 `watchEffect` 都是 Vue 3 中的监听器函数，它们之间存在以下区别：

### 1. 指明监视的数据

- `watch`: 需要指明要监视的数据源和相应的回调函数。
  
- `watchEffect`: 自动识别回调中使用的数据作为依赖，不需显式指明。你使用了哪个响应式数据，它就监听哪个。

### 2. 访问数据的能力

- `watch`: 可以访问数据改变之前和之后的值。

- `watchEffect`: 只能获取到数据改变后的值。

### 3. 执行时机

- `watch`: 默认情况下，初始化时不执行，只有在数据变化后才执行。但可以通过配置项 `immediate` 设为 `true` 来立即执行。

- `watchEffect`: 初始化时立即执行，之后的执行则是在其依赖数据发生变化时。

### 4. 与 `computed` 的相似性

- `watchEffect` 与 `computed` 都自动收集依赖，但：
  - `computed`: 注重计算出的结果（回调函数的返回值），因此必须返回一个值。
  - `watchEffect`: 注重副作用过程（回调函数执行的内容），因此不需要返回值。

### 5. 注意事项

- 当使用 `watch` 监视 `reactive` 定义的响应式数据时，`oldValue` 无法正确获取，并且强制开启了深度监视，即 `deep` 配置项失效。
- 当监视 `reactive` 定义的响应式数据中的某个属性时，`deep` 配置项仍然有效。

```javascript
let sum = ref(0)
let msg = ref('你好啊')
let person = reactive({
 name:'张三',
 age:18,
 job:{
  j1:{
   salary:20
  }
 }
})

//情况1：监视ref定义的响应式数据
watch(sum,(newValue, oldValue)=>{
 console.log("sum变化了", newValue, oldValue),(immediate:true)
})

//情况2：监视多个ref定义的响应式数据
watch([sum, msg],(newValue, oldValue)=>{
 console.log("sum或msg变化了", newValue, oldValue),(immediate:true)
})

//情况3：监视reactive定义的响应式数据
//若watch监视的是reactive定义的响应式数据，则无法正确获得oldValue，且强制开启了深度监视。
watch(person,(newValue, oldValue)=>{
 console.log("person变化了", newValue, oldValue),(immediate:true,deep:false) //此处的deep配置不再生效。
})

//情况4：监视reactive所定义的一个响应式数据中的某个属性
watch(()=>person.name,(newValue, oldValue)=>{
 console.log("person.name变化了", newValue, oldValue)
})

//情况5：监视reactive所定义的一个响应式数据中的某些属性
watch([()=>person.name, ()=>person.age],(newValue, oldValue)=>{
 console.log("person.name或person.age变化了", newValue, oldValue)
})

//特殊情况：
watch(()=>person.job,(newValue, oldValue)=>{
 console.log("person.job变化了", newValue, oldValue)
}, {deep:true})
```

## `v-if` 和 `v-for` 的优先级哪个高？

在 Vue 2 中，`v-for` 的优先级高于 `v-if`。但在 Vue 3 中，这一优先级已经改变，现在 `v-if` 的优先级更高。

## script setup 是干啥的？

`<script setup>` 是 Vue3 提供的一种新的语法糖，它的目的是为了简化组合式 API 的使用，并提供一个更加精简和高效的方式来写 Vue3 组件。以下是使用 `<script setup>` 的一些主要特点：

- 没有需要返回的属性或方法，因为它们在组件模板中都是自动可用的。
- 引入的组件会自动进行注册，无需手动在 `components` 选项中进行注册。
- 使用 `defineProps` 函数来定义并接收父组件传递的 props。
- 使用 `useAttrs` 获取非 prop 的属性，`useSlots` 获取插槽内容，而 `defineEmits` 则用于定义组件可以触发的事件。
- 默认情况下，组件不会暴露任何属性或方法。如果需要，可以使用 `defineExpose` 函数来指定哪些属性或方法应该被暴露。

## Vue2/Vue3组件通信方式？

Vue 作为一个前端框架，组件间的通信是其核心特性之一。Vue2 和 Vue3 都提供了多种组件间通信的方式。

### Vue3 组件通信方式

1. `props`: 用于父组件向子组件传递数据。
2. `$emit`: 子组件向父组件发送消息或触发事件。
3. `ref/expose`: 使用 ref 获取子组件的实例，并通过 expose 暴露子组件的属性或方法。
4. `$attrs`: 包含了传递给组件的所有 attribute。
5. `v-model`: 创建双向数据绑定。
6. `provide/inject`: 主要用于避免 props 的深层嵌套传递，实现祖先组件和后代组件之间的通信。
7. `Vuex/pinia`: 状态管理工具，用于在应用的任何部分之间共享状态。
8. `mitt`: 一个小型的事件总线库，用于非父子组件之间的通信。

### Vue2.x 组件通信方式

1. `props`: 用于父组件向子组件传递数据。
2. `$emit/v-on`: 子组件向父组件发送消息或触发事件。
3. `.sync`: 用于创建双向数据绑定。
4. `v-model`: 用于在组件上创建双向数据绑定。
5. `ref`: 获取子组件的实例。
6. `children/parent`: 通过 `$children` 和 `$parent` 访问子组件和父组件。
7. `attrs/listeners`: `$attrs` 包含了传递给组件的所有 attribute，而 `$listeners` 包含了组件上的所有事件监听器。
8. `provide/inject`: 主要用于避免 props 的深层嵌套传递，实现祖先组件和后代组件之间的通信。
9. `EventBus`: 创建一个事件总线，用于非父子组件之间的通信。
10. `Vuex`: 状态管理工具，用于在应用的任何部分之间共享状态。
11. `$root`: 通过根实例进行组件间通信。
12. `slot`: 使用插槽进行内容分发。

## `ref` 与 `reactive` 的区别？

`ref` 和 `reactive` 是 Vue3 新推出的重要 API 用于创建响应式数据。

### 1. 使用方式

- 在 `template` 中，通过 `setup` 函数 `return` 的数据和方法才可以被使用。
- `ref` 创建的响应式数据在模板中可以直接使用，而在 JS 中需通过 `.value` 的形式使用。
  
### 2. 数据类型支持
  
- `ref` 可以接收原始数据类型及引用数据类型。
- `reactive` 只能接收引用数据类型。

### 3. 实现原理
  
- `ref` 底层实际上使用 `reactive` 实现，并对其进行了进一步封装，使其能够支持原始数据类型。
  
### 4. 能力比较

- 在 Vue3 中，`reactive` 能做的事情，`ref` 都能做；而 `reactive` 不能做的事情，`ref` 也都能做。

## `EventBus` 与 `mitt` 的区别？

在 Vue2 中，我们使用 `EventBus` 实现跨组件通信，依赖于 Vue 自带的 `$on/$emit/$off`。虽然它简单方便，但如果使用不当可能导致维护困难。

而在 Vue3，相关方法被移除，意味着无法使用 `EventBus`。Vue3 推荐使用 `props/emits`、`provide/inject`、`vuex` 替代。但如果这些无法满足需求，官方推荐使用库如 [`mitt`](https://github.com/developit/mitt)。

### 1. `mitt` 优点

- 超轻量，压缩后只有 200 bytes。
- 完整的 TS 支持。
- 跨框架，除 Vue 外，还可以用于 React、jQuery 等。
- API 简单，主要包括 `on`、`emit`、`off`。

## 谈谈 `pinia`？

`Pinia` 是 Vue 官方团队开发的新状态管理库，取代了 `Vuex`，并且被视为 `Vuex 5` 的替代品，意味着不再发布 `Vuex 5`。

### 1. `Pinia` 优点

- 轻量级，压缩后只有 1.6kb。
- 完整的 TS 支持。
- 无 `mutations`，仅保留 `state`、`actions`、`getters`。
- 去除了 Vuex 的模块化结构，主要概念为 `store`。每个 `store` 是独立的，可以手动导入其他模块实现嵌套。
- 自动注册 `store`，无需手动添加。
- 支持服务端渲染（SSR）。
- 支持 Vue DevTools。
- 更友好的代码分割。

### 2. 数据持久化

`Pinia` 配套有 `pinia-plugin-persist` 插件来进行数据持久化，避免刷新导致的数据丢失。
