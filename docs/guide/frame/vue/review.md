# Vue2

## 简述MVVM

**什么是MVVM？**

MVVM，即`Model-View-ViewModel`，是`MVC`模式的一种改进型，其中`Controller`被替换为`ViewModel`。在这个模式中：

- `Model`代表数据模型。
- `View`代表UI组件。
- `ViewModel`是`View`与`Model`之间的桥梁。数据会绑定到`ViewModel`上，并自动渲染到页面中。当视图变化时，它会通知`ViewModel`更新数据。与以前直接操作DOM结构更新视图的方式相比，现在采用的是`数据驱动视图`。

**MVVM的优点：**

1. `低耦合`：视图（View）与模型（Model）之间的依赖降低，改变其中之一不必改变另一个。
2. `可重用性`：可以将某些视图逻辑放在`ViewModel`中，使多个`View`重用该逻辑。
3. `独立开发`：开发者可以专注于业务逻辑和数据的开发(`ViewModel`)，而设计师可以专注于页面设计(`View`)。
4. `可测试性`：由于解耦，模型和视图逻辑都容易进行单元测试。

## Vue底层实现原理

vue.js 采用数据劫持结合发布者-订阅者模式，通过`Object.defineProperty()`来劫持属性的`setter`和`getter`。当数据变动时，会发布消息给订阅者，并触发相应的监听回调。Vue是一个典型的MVVM框架，其中模型（Model）只是普通的JavaScript对象，当其内容变化时，视图（View）会自动更新。

**Observer（数据监听器）**：其核心是利用`Object.defineProperty()`来监听数据变动。每当数据发生变化，都会触发setter，进而通知订阅者（Watcher）。

**Watcher（订阅者）**：Watcher是Observer与Compile之间的通信桥梁。它的主要工作包括：

1. 在实例化时向属性订阅器（dep）添加自己。
2. 定义一个`update()`方法。
3. 当属性变动，通过`dep.notice()`被通知后，调用自己的`update()`方法，并触发Compile中绑定的回调。

**Compile（指令解析器）**：Compile的工作是解析模板指令，替换模板中的变量为实际数据，并初始化页面渲染。同时，它将每个指令对应的节点绑定更新函数，并添加对应数据的订阅者。当数据变化时，更新视图。

## 谈谈对vue生命周期的理解？

每个`Vue`实例在创建时都会经历一系列的初始化过程，这些过程中的特定时刻都定义了相应的生命周期钩子，允许用户在这些时刻加入自己的代码。

<!-- ![Vue2 生命周期](https://i.postimg.cc/j5bY7jSr/vue2-life-cycle.webp) -->

- **创建阶段**：
  - `beforeCreate`: 在实例初始化后，数据观测和事件配置之前被调用。
  - `created`: 实例创建完成后被调用，此时实例已完成以下配置：数据观测、属性和方法的运算、watch/event事件回调。但DOM还未生成，$el属性目前不可见。
  
- **挂载阶段**：
  - `beforeMount`: 在挂载开始之前被调用，即模板编译/渲染函数编译之前。
  - `mounted`: el被新创建的vm.$el替换，且挂载到实例上后调用该钩子。此时可以直接操作DOM。
  
- **更新阶段**：当Vue组件的数据发生变化时，触发重新渲染。
  - `beforeUpdate`: 数据更新时调用，发生在虚拟DOM打补丁前。此时还未实际操作DOM。
  - `updated`: 虚拟DOM重新渲染和打补丁后调用。此时数据已更新完毕，可以执行依赖于DOM的操作。
  
- **销毁阶段**：
  - `beforeDestroy`: 实例销毁之前调用。主要用于清理定时器、事件监听器等。
  - `destroyed`: Vue实例销毁后调用。此时，所有的事件监听器都已被移除，所有的子实例也都已被销毁。

## Vue 2 组件生命周期

Vue 的组件有其生命周期，从创建到销毁会经历一系列的过程，以下是Vue 2中组件的生命周期顺序：

**父子组件的加载渲染过程：**

- `父beforeCreate`
- `父created`
- `父beforeMount`
  - `子beforeCreate`
  - `子created`
  - `子beforeMount`
  - `子mounted`
- `父mounted`

**挂载阶段：**

- `父created`
  - `子created`
  - `子mounted`
- `父mounted`

**父组件更新阶段：**

- `父beforeUpdate`
- `父updated`

**子组件更新阶段：**

- `父beforeUpdate`
  - `子beforeUpdate`
  - `子updated`
- `父updated`

**组件销毁阶段：**

- `父beforeDestroy`
  - `子beforeDestroy`
  - `子destroyed`
- `父destroyed`

## `computed` 与 `watch`

在 Vue 2 中，`computed` 和 `watch` 是两种处理数据变化的方法。

**computed (计算属性):**

- 声明式地描述一个值，它依赖其他值。
- 当依赖的响应式属性变化时，计算属性会重新计算。
- 计算属性的结果会被缓存，除非依赖的属性变化，否则不会重新计算。
- `computed` 中的函数必须使用 `return` 语句返回最终结果。
- 如果多个属性影响一个结果，推荐使用 `computed`。
  
**watch (属性监听):**

- 监听 `data` 中定义的属性变化。
- 当所监听的数据变化时，会触发指定的回调函数。
- 适用于当数据变化需要执行异步或更耗时的操作时。
- 如果一条数据影响多个其他数据，推荐使用 `watch`。

**使用场景：**

- `computed`: 当一个属性受多个属性影响时使用。例如，购物车中商品的总价。
- `watch`: 当一条数据影响多条数据时使用。例如，根据搜索词筛选数据。

## 为什么组件中的 `data` 是一个函数？

在 Vue 2 中，组件的 `data` 必须是一个函数，而不是一个对象。这主要是出于以下两个原因：

1. **实例化多次**: 一个组件可能会被实例化多次。如果 `data` 是一个对象，由于对象是引用类型，每个实例都会引用到同一个对象，这会导致所有实例共享同一个数据。

2. **数据独立性**: 为了确保每个组件实例维护一份独立的数据副本，`data` 必须是一个函数，每次函数执行都会返回一个新的数据对象。

## 为什么v-for和v-if不建议用在一起

使用`v-for`与`v-if`在同一个节点上并不是推荐的做法，原因如下：

1. 当`v-for`与`v-if`位于同一个节点时，`v-for`的优先级高于`v-if`。这意味着`v-if`会对每一个`v-for`循环中的项都进行检查。在大型列表中，这会导致不必要的检查，浪费性能。
2. 在此场景下，更好的方法是使用`computed`属性进行数据过滤，然后在渲染时使用过滤后的结果。

注意：在 Vue 3.x 中，`v-if`的优先级高于`v-for`。但由于这种写法在语法上可能会引起混淆，建议避免在同一个元素上同时使用它们。通过计算属性来筛选数据，以生成可见的元素列表，是更好的方法。

解惑传送门 ☞ [# v-if 与 v-for 的优先级对比非兼容](https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html#%E6%A6%82%E8%A7%88)

## React/Vue 项目中 key 的作用

`key`在React和Vue的列表渲染中起到了非常重要的作用：

- `key`帮助在diff算法执行时更快地找到对应的节点，从而**提高diff的速度并更高效地更新虚拟DOM**。Vue和React都采用diff算法来对比新旧虚拟节点以更新节点。在Vue的diff函数中，系统会基于新节点的`key`对比旧节点数组中的`key`来找到对应的旧节点。如果没有找到相应的`key`，系统会认为这是一个新的节点。如果没有指定`key`，系统则会使用遍历查找的方式来找到对应的旧节点。使用`key`映射通常会比遍历查找更快。

- **避免“就地复用”导致的问题**。Vue默认采用“就地复用”的策略来更新已渲染的元素列表。这意味着，如果数据项的顺序发生了变化，Vue不会移动DOM元素以匹配数据项的新顺序，而是会复用当前位置的元素，并确保它反映应该在该位置显示的数据。这种策略在某些情况下可能会导致问题，尤其是当子组件涉及到状态时。为了避免这些潜在的问题，为每个列表项提供一个唯一的`key`是非常重要的。

请注意，重复的`key`可能会导致渲染错误，所以在为列表项目指定`key`时应确保它们是唯一的。

## Vue 2 组件的通信方式

1. **`props`/`$emit`: 父子组件通信**

    - **父 -> 子**: 使用 `props` 传递数据。
    - **子 -> 父**: 使用 `$emit` 触发事件通知父组件。

      ```vue
      <!-- ParentComponent.vue -->
      <template>
        <ChildComponent :parentMessage="message" @childEvent="handleChildEvent"/>
      </template>

      <script>
      import ChildComponent from './ChildComponent.vue';

      export default {
        components: {
          ChildComponent
        },
        data() {
          return {
            message: 'Hello from Parent'
          };
        },
        methods: {
          handleChildEvent(payload) {
            console.log('Received event from child with payload:', payload);
          }
        }
      };
      </script>

      <!-- ChildComponent.vue -->
      <template>
        <button @click="sendEventToParent">Click Me</button>
      </template>

      <script>
      export default {
        props: {
          parentMessage: {
            type: String,
            required: true
          }
        },
        methods: {
          sendEventToParent() {
            this.$emit('childEvent', 'Hello from Child');
          }
        }
      };
      </script>
      ```

    - **获取父子组件实例**: 可以使用 `parent` 和 `children` 属性。

      ```vue
      <!-- 获取父组件实例 -->
      <!-- ParentComponent.vue -->
      <template>
        <div>
          <ChildComponent />
        </div>
      </template>

      <script>
      import ChildComponent from './ChildComponent.vue';

      export default {
        components: {
          ChildComponent
        }
      };
      </script>

      <!-- ChildComponent.vue -->
      <template>
        <div @click="handleClick">Click me to get parent's data</div>
      </template>

      <script>
      export default {
        methods: {
          handleClick() {
            // Access parent component instance
            console.log(this.$parent);
          }
        }
      };
      </script>

      <!-- 获取子组件实例 -->
      <!-- ParentComponent.vue -->
      <template>
        <div>
          <ChildComponent ref="childRef" />
          <button @click="handleButtonClick">Get Child Data</button>
        </div>
      </template>

      <script>
      import ChildComponent from './ChildComponent.vue';

      export default {
        components: {
          ChildComponent
        },
        methods: {
          handleButtonClick() {
            // Access child component instance using refs
            console.log(this.$refs.childRef);
          }
        }
      };
      </script>

      <!-- ChildComponent.vue -->
      <template>
        <div>I am the child component.</div>
      </template>

      <script>
      export default {
        data() {
          return {
            childData: 'Some child data'
          };
        }
      };
      </script>
      ```

    - **引用组件实例**: 使用 `ref` 获取组件实例后可以直接调用组件的属性或方法。

      ```vue
      <!-- SomeComponent.vue -->
      <template>
        <div>
          <OtherComponent ref="otherComponentRef" />
          <button @click="invokeOtherComponentMethod">Invoke Method</button>
        </div>
      </template>

      <script>
      import OtherComponent from './OtherComponent.vue';

      export default {
        components: {
          OtherComponent
        },
        methods: {
          invokeOtherComponentMethod() {
            this.$refs.otherComponentRef.someMethod(); // Directly invoking the method from the OtherComponent
          }
        }
      };
      </script>

      <!-- ChildComponent.vue -->
      <template>
        <p>{{ childMessage }}</p>
      </template>

      <script>
      export default {
        data() {
          return {
            childMessage: 'Hello from Child'
          };
        }
      };
      </script>
      ```

    - **父 -> 孙组件通信**: 可使用 `provide` 和 `inject`。虽然 Vue 官方不推荐频繁使用，但在组件库中很常见。

      ```vue
      <!-- 设置 provide 在父组件 -->
      <!-- GrandParentComponent.vue -->
      <template>
        <div>
          <ParentComponent />
        </div>
      </template>

      <script>
      import ParentComponent from './ParentComponent.vue';

      export default {
        components: {
          ParentComponent
        },
        provide() {
          return {
            grandParentData: 'Data from Grandparent'
          };
        }
      };
      </script>

      <!-- 使用 inject 在孙子组件 -->
      <!-- ParentComponent.vue -->
      <template>
        <div>
          <ChildComponent />
        </div>
      </template>

      <script>
      import ChildComponent from './ChildComponent.vue';

      export default {
        components: {
          ChildComponent
        }
      };
      </script>

      <!-- ChildComponent.vue (孙子组件) -->
      <template>
        <div>
          {{ grandParentData }}
        </div>
      </template>

      <script>
      export default {
        inject: ['grandParentData']
      };
      </script>
      ```

2. **`$emit`/`$on`: 自定义事件，兄弟组件通信**

    - **Event Bus**: 使用 Vue 实例作为中央事件总线来实现跨组件通信。例如：`Vue.prototype.$bus = new Vue()`。

      ```javascript
      // EventBus.js
      import Vue from 'vue';
      export const EventBus = new Vue();
      ```

      ```vue
      <!-- SiblingA.vue -->
      <template>
        <button @click="sendMessage">Send Message to Sibling B</button>
      </template>

      <script>
      import { EventBus } from './EventBus.js';

      export default {
        methods: {
          sendMessage() {
            EventBus.$emit('messageFromA', 'Hello Sibling B!');
          }
        }
      };
      </script>

      <!-- SiblingB.vue -->
      <template>
        <p>Message from Sibling A: {{ message }}</p>
      </template>

      <script>
      import { EventBus } from './EventBus.js';

      export default {
        data() {
          return {
            message: ''
          };
        },
        created() {
          EventBus.$on('messageFromA', (payload) => {
            this.message = payload;
          });
        }
      };
      </script>
      ```

3. **Vuex: 跨级组件通信**

    - **状态管理**: 使用 Vuex 进行状态管理，实现跨级组件通信。

      ```javascript
      // store.js
      import Vue from 'vue';
      import Vuex from 'vuex';

      Vue.use(Vuex);

      export const store = new Vuex.Store({
        state: {
          message: 'Hello from Vuex Store!'
        }
      });
      ```

      ```vue
      <!-- AnyComponent.vue -->
      <template>
        <p>{{ messageFromStore }}</p>
      </template>

      <script>
      import { mapState } from 'vuex';

      export default {
        computed: {
          ...mapState(['message'])
        }
      };
      </script>
      ```

    - **属性和监听器传递**: 使用 `$attrs` 和 `$listeners` 进行非直接父子关系的组件通信。

      ```vue
      <!-- index.vue -->
      <template>
        <div>
          <child-com1
            :foo="foo"
            :boo="boo"
            :coo="coo"
            :doo="doo"
            @one.native="triggerOne"
            @two="triggerTwo"
            title="Vue通信"
          ></child-com1>
        </div>
      </template>

      <script>
      const childCom1 = () => import("./childCom1.vue");

      export default {
        components: { childCom1 },
        data() {
          return {
            foo: "Javascript",
            boo: "Html",
            coo: "CSS",
            doo: "Vue"
          };
        },
        methods:{
          triggerOne(){
            alert('one')
          },
          triggerTwo(){
            alert('two')
          }
        }
      };
      </script>

      <!-- childCom1.vue -->
      <template class="border">
        <div>
          <p>foo: {{ foo }}</p>
          <p>childCom1的$attrs: {{ $attrs }}</p>
          <child-com2 v-bind="$attrs" v-on="$listeners"></child-com2>
        </div>
      </template>

      <script>
      const childCom2 = () => import("./childCom2.vue");

      export default {
        components: {
          childCom2
        },
        // 默认为true，如果传入的属性子组件没有prop接受，就会以字符串的形式出现为标签属性
        // 设为false，在dom中就看不到这些属性
        inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
        props: {
          foo: String // foo作为props属性绑定
        },
        mounted() {
          console.log(this.$attrs); // { "boo": "Html", "coo": "CSS", "doo": "Vue", "title": "Vue通信" }
          console.log(this.$listeners);
        }
      };
      </script>

      <!-- childCom2.vue -->
      <template>
        <div class="border">
          <p>boo: {{ boo }}</p>
          <p>childCom2的$attrs: {{ $attrs }}</p>
          <child-com3 v-bind="$attrs" v-on="$listeners"></child-com3>
        </div>
      </template>

      <script>
      const childCom3 = () => import("./childCom3.vue");

      export default {
        components: {
          childCom3
        },
        inheritAttrs: false,
        props: {
          boo: String
        },
        mounted() {
          console.log(this.$attrs); // {"coo": "CSS", "doo": "Vue", "title": "Vue通信" }
          console.log(this.$listeners);
        }
      };
      </script>

      <!-- childCom3.vue -->
      <template>
        <div class="border">
          <p>childCom3: {{ $attrs }}</p>
        </div>
      </template>

      <script>
      export default {
        props: {
          coo: String,
          title: String
        },
        mounted() {
          console.log(this.$listeners);
          // this.$listeners.two();
        }
      };
      </script>
      ```

## `nextTick` 的实现

1. **定义**: `nextTick` 是 Vue 提供的一个全局 API，用于在下次 DOM 更新循环结束后执行延迟回调。当数据改变后，使用 `$nextTick` 可以在回调中获取更新后的 DOM。

2. **异步更新**: Vue 在更新 DOM 时是异步执行的。当检测到数据变化，Vue 会开启一个队列并缓存同一事件循环中的所有数据变更。对于多次触发的同一个 `watcher`，它只会被加入队列一次，以减少不必要的计算和 DOM 操作。

3. **使用场景**: 当需要在数据改变后立即进行某些 DOM 操作时，可以使用 `nextTick` 并在其回调中执行这些操作。

4. **实现机制**: `nextTick` 主要通过添加回调函数到 `callbacks` 队列中来实现，并使用 `timerFunc` 来异步执行。首选的异步方式是 `Promise`。这解释了为什么在 `nextTick` 中可以立即看到 DOM 更新的结果。

## `nextTick` 的实现原理

`nextTick` 的工作原理主要是通过宏任务和微任务来实现。Vue 会根据当前环境选择最佳的异步方案：

1. 首选使用 `Promise`。
2. 若不支持 `Promise`，则尝试使用 `MutationObserver`。
3. 如果以上都不可用，尝试使用 `setImmediate`。
4. 最后如果还不支持，会回退到使用 `setTimeout`。

当多次调用 `nextTick` 时，所有的回调函数会被添加到一个队列中。然后通过上述异步方法，来依次清空并执行队列中的回调。

## 使用过插槽么？用的是具名插槽还是匿名插槽或作用域插槽

Vue 中的插槽 (slot) 提供了一个灵活的方式来分发父组件的内容到子组件的模板中。Vue 支持三种插槽：

1. **默认插槽（匿名插槽）**: 这种插槽不带名字，子组件中的内容将默认被替换为父组件为该插槽提供的内容。

2. **具名插槽**: 与默认插槽相对应，具名插槽是有名字的插槽。可以根据其名称进行内容的插入。

3. **作用域插槽**: 允许父组件访问子组件的数据，因此在父组件中可以自定义内容而使用子组件的数据。

## keep-alive 的实现

`keep-alive` 是 Vue.js 的内置组件，它可以使得被包裹的组件在切换时不被销毁而是被缓存。

**作用**:

- 实现组件缓存，避免重复渲染提高性能。
- 组件状态保持，避免了数据重新获取或重置。

**场景**:

- 如标签页、导航等内容频繁切换，但不希望每次都重载的情况。
- Vue 项目中的性能优化。

**原理**:

Vue.js 将 DOM 节点抽象成了 VNode (虚拟节点)。`keep-alive` 的缓存机制是基于 VNode，并不是真实的 DOM 结构。它在内部通过 `cache` 对象来存储满足条件的组件的 VNode，当需要重新渲染时，会从 `cache` 对象中取出对应的 VNode 进行渲染。

## keep-alive 的属性

`keep-alive` 提供了几个属性来有条件地进行缓存：

- `include`: 定义缓存的组件白名单。只有命中的组件会被缓存。
- `exclude`: 定义不被缓存的组件黑名单。
- `max`: 定义缓存组件的数量上限，超出上限会使用 LRU (Least Recently Used) 策略进行缓存组件的置换。

**在动态组件中的应用**:

```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <component :is="currentComponent"></component>
</keep-alive>
```

**在vue-router中的应用**:

```vue
<keep-alive :include="whiteList" :exclude="blackList" :max="amount">
  <router-view></router-view>
</keep-alive>
```

## mixin

在 Vue 项目变得复杂时，如果多个组件之间存在重复的逻辑，通常可以使用 `mixin` 来进行代码的重用。`mixin` 允许开发者抽离出公共逻辑，并在多个组件中混合使用。

**示例**:

```javascript
// 定义一个 mixin
const myMixin = {
  created: function () {
    this.hello()
  },
  methods: {
    hello: function () {
      console.log('Hello from mixin!')
    }
  }
}

// 使用 mixin
new Vue({
  mixins: [myMixin],
  created: function () {
    console.log('Hello from component!')
  }
})
```

**使用场景**:
例如，在 PC 端，新闻列表和详情页有相同的右侧栏目，都可以使用 `mixin` 进行逻辑的混合。

**劣势**:

1. 变量来源可能不明确，使得代码不易阅读。
2. 使用多个 `mixin` 可能会导致命名冲突。
3. `mixin` 和组件之间可能出现多对多的关系，这可能会增加项目的复杂度。

需要注意，虽然 `mixin` 提供了代码复用的便利，但它并不是一个完美的解决方案。在 Vue 3 中，引入了 Composition API，旨在解决 `mixin` 的部分问题。

---

## Vue 如何实现模拟 v-model 指令

可以使用 Vue 的自定义指令 `Vue.directive()` 来模拟 `v-model`。

**示例**:

```javascript
Vue.directive('myModel', {
  bind(el, binding, vnode) {
    // 监听 input 事件
    el.addEventListener('input', function(event) {
      // 当 input 事件触发时，更新父组件中的数据
      vnode.context[binding.expression] = event.target.value;
    });
  },
  // 当指令的值更新时，将其同步到元素的 value 属性
  update(el, binding) {
    el.value = binding.value;
  }
});
```

## Vuex 的理解及使用场景

Vuex 是专为 Vue.js 应用程序开发的状态管理模式。每个 Vuex 应用的核心是 `store`。

**特点**:

1. Vuex 的状态存储是响应式的。当 Vue 组件从 `store` 中读取状态时，如果 `store` 的状态发生变化，相关的组件会自动更新。
2. 改变 `store` 中的状态的唯一方式是显式地提交 (commit) `mutation`。这样可以方便地跟踪每个状态的变化。

**核心模块**:

1. **State**: 定义了应用的状态数据。
2. **Getter**: 可视为 `store` 的计算属性。其返回值会基于它的依赖被缓存，并在其依赖发生改变时重新计算。
3. **Mutation**: 是改变 `store` 中状态的唯一方法，且必须是同步函数。
4. **Action**: 用于提交 `mutation`，而不是直接变更状态。可以包含任意异步操作。
5. **Module**: 允许将单一的 `store` 拆分为多个 `store`，但所有的状态仍然保存在一个单一的状态树中。

<!-- ![流程图](https://i.postimg.cc/66htCCZb/vuex.png) -->

## Vue 和 React 的区别

**共同点**：

1. **数据驱动视图**：两者都采用数据来驱动视图的更新，确保数据变化时视图能够及时响应。
2. **组件化**：Vue 和 React 都采用组件化的结构，使得开发更加模块化和可复用。
3. **Virtual DOM**：两者都使用 Virtual DOM 来提高渲染效率，避免直接操作真实 DOM 带来的性能损耗。

**不同点**：

1. **核心思想**：
   - **Vue**：作为一个灵活且易用的渐进式框架，Vue 采用数据拦截/代理的方式，使其对数据变化的侦测更为敏感和精确。
   - **React**：强调函数式编程，特别是纯组件的概念，它倡导数据的不可变性和单向数据流。

2. **组件写法**：
   - **Vue**：推崇单文件组件格式，即在同一个文件中编写 HTML、CSS 和 JS。  
   - **React**：推荐使用 JSX + inline style，即将 HTML 和 CSS 都集成到 JavaScript 中，实现 "all in js" 的概念。

3. **Diff 算法**：
   - **共同思路**：当不同的组件产生不同的 DOM 结构时，如果类型不同，则直接销毁旧的 DOM 并创建新的 DOM。通过唯一的 key 来区分同一层次的子节点。
   - **Vue**：采用双端比较算法，从新旧 children 的两端开始比较，利用 key 值找到可复用的节点。这种方法可以减少节点移动的次数，从而减少不必要的性能损耗。
   - **React**：虽然也使用 key 值进行比较，但在某些情况下可能会有更多的节点移动。

4. **响应式原理**：
   - **Vue**：通过依赖收集进行自动优化，数据是可变的。当数据发生变化时，Vue 会自动找到相关的组件并重新渲染。
   - **React**：基于状态机的原理，需要手动优化。数据是不可变的，当数据发生变化时，需要使用 setState 方法。默认情况下，React 会以组件为根重新渲染整个组件树。
