import{_ as s,o as n,c as a,Q as l}from"./chunks/framework.aea2adc8.js";const d=JSON.parse('{"title":"Vue2","description":"","frontmatter":{},"headers":[],"relativePath":"guide/frame/vue/review.md","filePath":"guide/frame/vue/review.md","lastUpdated":1700020322000}'),p={name:"guide/frame/vue/review.md"},o=l(`<h1 id="vue2" tabindex="-1">Vue2 <a class="header-anchor" href="#vue2" aria-label="Permalink to &quot;Vue2&quot;">​</a></h1><h2 id="简述mvvm" tabindex="-1">简述MVVM <a class="header-anchor" href="#简述mvvm" aria-label="Permalink to &quot;简述MVVM&quot;">​</a></h2><p><strong>什么是MVVM？</strong></p><p>MVVM，即<code>Model-View-ViewModel</code>，是<code>MVC</code>模式的一种改进型，其中<code>Controller</code>被替换为<code>ViewModel</code>。在这个模式中：</p><ul><li><code>Model</code>代表数据模型。</li><li><code>View</code>代表UI组件。</li><li><code>ViewModel</code>是<code>View</code>与<code>Model</code>之间的桥梁。数据会绑定到<code>ViewModel</code>上，并自动渲染到页面中。当视图变化时，它会通知<code>ViewModel</code>更新数据。与以前直接操作DOM结构更新视图的方式相比，现在采用的是<code>数据驱动视图</code>。</li></ul><p><strong>MVVM的优点：</strong></p><ol><li><code>低耦合</code>：视图（View）与模型（Model）之间的依赖降低，改变其中之一不必改变另一个。</li><li><code>可重用性</code>：可以将某些视图逻辑放在<code>ViewModel</code>中，使多个<code>View</code>重用该逻辑。</li><li><code>独立开发</code>：开发者可以专注于业务逻辑和数据的开发(<code>ViewModel</code>)，而设计师可以专注于页面设计(<code>View</code>)。</li><li><code>可测试性</code>：由于解耦，模型和视图逻辑都容易进行单元测试。</li></ol><h2 id="vue底层实现原理" tabindex="-1">Vue底层实现原理 <a class="header-anchor" href="#vue底层实现原理" aria-label="Permalink to &quot;Vue底层实现原理&quot;">​</a></h2><p>vue.js 采用数据劫持结合发布者-订阅者模式，通过<code>Object.defineProperty()</code>来劫持属性的<code>setter</code>和<code>getter</code>。当数据变动时，会发布消息给订阅者，并触发相应的监听回调。Vue是一个典型的MVVM框架，其中模型（Model）只是普通的JavaScript对象，当其内容变化时，视图（View）会自动更新。</p><p><strong>Observer（数据监听器）</strong>：其核心是利用<code>Object.defineProperty()</code>来监听数据变动。每当数据发生变化，都会触发setter，进而通知订阅者（Watcher）。</p><p><strong>Watcher（订阅者）</strong>：Watcher是Observer与Compile之间的通信桥梁。它的主要工作包括：</p><ol><li>在实例化时向属性订阅器（dep）添加自己。</li><li>定义一个<code>update()</code>方法。</li><li>当属性变动，通过<code>dep.notice()</code>被通知后，调用自己的<code>update()</code>方法，并触发Compile中绑定的回调。</li></ol><p><strong>Compile（指令解析器）</strong>：Compile的工作是解析模板指令，替换模板中的变量为实际数据，并初始化页面渲染。同时，它将每个指令对应的节点绑定更新函数，并添加对应数据的订阅者。当数据变化时，更新视图。</p><h2 id="谈谈对vue生命周期的理解" tabindex="-1">谈谈对vue生命周期的理解？ <a class="header-anchor" href="#谈谈对vue生命周期的理解" aria-label="Permalink to &quot;谈谈对vue生命周期的理解？&quot;">​</a></h2><p>每个<code>Vue</code>实例在创建时都会经历一系列的初始化过程，这些过程中的特定时刻都定义了相应的生命周期钩子，允许用户在这些时刻加入自己的代码。</p><p><img src="https://i.postimg.cc/j5bY7jSr/vue2-life-cycle.webp" alt="Vue2 生命周期"></p><ul><li><p><strong>创建阶段</strong>：</p><ul><li><code>beforeCreate</code>: 在实例初始化后，数据观测和事件配置之前被调用。</li><li><code>created</code>: 实例创建完成后被调用，此时实例已完成以下配置：数据观测、属性和方法的运算、watch/event事件回调。但DOM还未生成，$el属性目前不可见。</li></ul></li><li><p><strong>挂载阶段</strong>：</p><ul><li><code>beforeMount</code>: 在挂载开始之前被调用，即模板编译/渲染函数编译之前。</li><li><code>mounted</code>: el被新创建的vm.$el替换，且挂载到实例上后调用该钩子。此时可以直接操作DOM。</li></ul></li><li><p><strong>更新阶段</strong>：当Vue组件的数据发生变化时，触发重新渲染。</p><ul><li><code>beforeUpdate</code>: 数据更新时调用，发生在虚拟DOM打补丁前。此时还未实际操作DOM。</li><li><code>updated</code>: 虚拟DOM重新渲染和打补丁后调用。此时数据已更新完毕，可以执行依赖于DOM的操作。</li></ul></li><li><p><strong>销毁阶段</strong>：</p><ul><li><code>beforeDestroy</code>: 实例销毁之前调用。主要用于清理定时器、事件监听器等。</li><li><code>destroyed</code>: Vue实例销毁后调用。此时，所有的事件监听器都已被移除，所有的子实例也都已被销毁。</li></ul></li></ul><h2 id="vue-2-组件生命周期" tabindex="-1">Vue 2 组件生命周期 <a class="header-anchor" href="#vue-2-组件生命周期" aria-label="Permalink to &quot;Vue 2 组件生命周期&quot;">​</a></h2><p>Vue 的组件有其生命周期，从创建到销毁会经历一系列的过程，以下是Vue 2中组件的生命周期顺序：</p><p><strong>父子组件的加载渲染过程：</strong></p><ul><li><code>父beforeCreate</code></li><li><code>父created</code></li><li><code>父beforeMount</code><ul><li><code>子beforeCreate</code></li><li><code>子created</code></li><li><code>子beforeMount</code></li><li><code>子mounted</code></li></ul></li><li><code>父mounted</code></li></ul><p><strong>挂载阶段：</strong></p><ul><li><code>父created</code><ul><li><code>子created</code></li><li><code>子mounted</code></li></ul></li><li><code>父mounted</code></li></ul><p><strong>父组件更新阶段：</strong></p><ul><li><code>父beforeUpdate</code></li><li><code>父updated</code></li></ul><p><strong>子组件更新阶段：</strong></p><ul><li><code>父beforeUpdate</code><ul><li><code>子beforeUpdate</code></li><li><code>子updated</code></li></ul></li><li><code>父updated</code></li></ul><p><strong>组件销毁阶段：</strong></p><ul><li><code>父beforeDestroy</code><ul><li><code>子beforeDestroy</code></li><li><code>子destroyed</code></li></ul></li><li><code>父destroyed</code></li></ul><h2 id="computed-与-watch" tabindex="-1"><code>computed</code> 与 <code>watch</code> <a class="header-anchor" href="#computed-与-watch" aria-label="Permalink to &quot;\`computed\` 与 \`watch\`&quot;">​</a></h2><p>在 Vue 2 中，<code>computed</code> 和 <code>watch</code> 是两种处理数据变化的方法。</p><p><strong>computed (计算属性):</strong></p><ul><li>声明式地描述一个值，它依赖其他值。</li><li>当依赖的响应式属性变化时，计算属性会重新计算。</li><li>计算属性的结果会被缓存，除非依赖的属性变化，否则不会重新计算。</li><li><code>computed</code> 中的函数必须使用 <code>return</code> 语句返回最终结果。</li><li>如果多个属性影响一个结果，推荐使用 <code>computed</code>。</li></ul><p><strong>watch (属性监听):</strong></p><ul><li>监听 <code>data</code> 中定义的属性变化。</li><li>当所监听的数据变化时，会触发指定的回调函数。</li><li>适用于当数据变化需要执行异步或更耗时的操作时。</li><li>如果一条数据影响多个其他数据，推荐使用 <code>watch</code>。</li></ul><p><strong>使用场景：</strong></p><ul><li><code>computed</code>: 当一个属性受多个属性影响时使用。例如，购物车中商品的总价。</li><li><code>watch</code>: 当一条数据影响多条数据时使用。例如，根据搜索词筛选数据。</li></ul><h2 id="为什么组件中的-data-是一个函数" tabindex="-1">为什么组件中的 <code>data</code> 是一个函数？ <a class="header-anchor" href="#为什么组件中的-data-是一个函数" aria-label="Permalink to &quot;为什么组件中的 \`data\` 是一个函数？&quot;">​</a></h2><p>在 Vue 2 中，组件的 <code>data</code> 必须是一个函数，而不是一个对象。这主要是出于以下两个原因：</p><ol><li><p><strong>实例化多次</strong>: 一个组件可能会被实例化多次。如果 <code>data</code> 是一个对象，由于对象是引用类型，每个实例都会引用到同一个对象，这会导致所有实例共享同一个数据。</p></li><li><p><strong>数据独立性</strong>: 为了确保每个组件实例维护一份独立的数据副本，<code>data</code> 必须是一个函数，每次函数执行都会返回一个新的数据对象。</p></li></ol><h2 id="为什么v-for和v-if不建议用在一起" tabindex="-1">为什么v-for和v-if不建议用在一起 <a class="header-anchor" href="#为什么v-for和v-if不建议用在一起" aria-label="Permalink to &quot;为什么v-for和v-if不建议用在一起&quot;">​</a></h2><p>使用<code>v-for</code>与<code>v-if</code>在同一个节点上并不是推荐的做法，原因如下：</p><ol><li>当<code>v-for</code>与<code>v-if</code>位于同一个节点时，<code>v-for</code>的优先级高于<code>v-if</code>。这意味着<code>v-if</code>会对每一个<code>v-for</code>循环中的项都进行检查。在大型列表中，这会导致不必要的检查，浪费性能。</li><li>在此场景下，更好的方法是使用<code>computed</code>属性进行数据过滤，然后在渲染时使用过滤后的结果。</li></ol><p>注意：在 Vue 3.x 中，<code>v-if</code>的优先级高于<code>v-for</code>。但由于这种写法在语法上可能会引起混淆，建议避免在同一个元素上同时使用它们。通过计算属性来筛选数据，以生成可见的元素列表，是更好的方法。</p><p>解惑传送门 ☞ <a href="https://v3.cn.vuejs.org/guide/migration/v-if-v-for.html#%E6%A6%82%E8%A7%88" target="_blank" rel="noreferrer"># v-if 与 v-for 的优先级对比非兼容</a></p><h2 id="react-vue-项目中-key-的作用" tabindex="-1">React/Vue 项目中 key 的作用 <a class="header-anchor" href="#react-vue-项目中-key-的作用" aria-label="Permalink to &quot;React/Vue 项目中 key 的作用&quot;">​</a></h2><p><code>key</code>在React和Vue的列表渲染中起到了非常重要的作用：</p><ul><li><p><code>key</code>帮助在diff算法执行时更快地找到对应的节点，从而<strong>提高diff的速度并更高效地更新虚拟DOM</strong>。Vue和React都采用diff算法来对比新旧虚拟节点以更新节点。在Vue的diff函数中，系统会基于新节点的<code>key</code>对比旧节点数组中的<code>key</code>来找到对应的旧节点。如果没有找到相应的<code>key</code>，系统会认为这是一个新的节点。如果没有指定<code>key</code>，系统则会使用遍历查找的方式来找到对应的旧节点。使用<code>key</code>映射通常会比遍历查找更快。</p></li><li><p><strong>避免“就地复用”导致的问题</strong>。Vue默认采用“就地复用”的策略来更新已渲染的元素列表。这意味着，如果数据项的顺序发生了变化，Vue不会移动DOM元素以匹配数据项的新顺序，而是会复用当前位置的元素，并确保它反映应该在该位置显示的数据。这种策略在某些情况下可能会导致问题，尤其是当子组件涉及到状态时。为了避免这些潜在的问题，为每个列表项提供一个唯一的<code>key</code>是非常重要的。</p></li></ul><p>请注意，重复的<code>key</code>可能会导致渲染错误，所以在为列表项目指定<code>key</code>时应确保它们是唯一的。</p><h2 id="vue-2-组件的通信方式" tabindex="-1">Vue 2 组件的通信方式 <a class="header-anchor" href="#vue-2-组件的通信方式" aria-label="Permalink to &quot;Vue 2 组件的通信方式&quot;">​</a></h2><ol><li><p><strong><code>props</code>/<code>$emit</code>: 父子组件通信</strong></p><ul><li><p><strong>父 -&gt; 子</strong>: 使用 <code>props</code> 传递数据。</p></li><li><p><strong>子 -&gt; 父</strong>: 使用 <code>$emit</code> 触发事件通知父组件。</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#FDAEB7;font-style:italic;">ChildComponent</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">:parentMessage</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;message&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@childEvent</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;handleChildEvent&quot;</span><span style="color:#E1E4E8;">/&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ChildComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ChildComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChildComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      message: </span><span style="color:#9ECBFF;">&#39;Hello from Parent&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handleChildEvent</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">payload</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Received event from child with payload:&#39;</span><span style="color:#E1E4E8;">, payload);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;sendEventToParent&quot;</span><span style="color:#E1E4E8;">&gt;Click Me&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    parentMessage: {</span></span>
<span class="line"><span style="color:#E1E4E8;">      type: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">      required: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sendEventToParent</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">$emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;childEvent&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Hello from Child&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#B31D28;font-style:italic;">ChildComponent</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">:parentMessage</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;message&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@childEvent</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;handleChildEvent&quot;</span><span style="color:#24292E;">/&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ChildComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ChildComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    ChildComponent</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      message: </span><span style="color:#032F62;">&#39;Hello from Parent&#39;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handleChildEvent</span><span style="color:#24292E;">(</span><span style="color:#E36209;">payload</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Received event from child with payload:&#39;</span><span style="color:#24292E;">, payload);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;sendEventToParent&quot;</span><span style="color:#24292E;">&gt;Click Me&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  props: {</span></span>
<span class="line"><span style="color:#24292E;">    parentMessage: {</span></span>
<span class="line"><span style="color:#24292E;">      type: String,</span></span>
<span class="line"><span style="color:#24292E;">      required: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sendEventToParent</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">$emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;childEvent&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Hello from Child&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br></div></div></li><li><p><strong>获取父子组件实例</strong>: 可以使用 <code>parent</code> 和 <code>children</code> 属性。</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 获取父组件实例 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#FDAEB7;font-style:italic;">ChildComponent</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ChildComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ChildComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChildComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;handleClick&quot;</span><span style="color:#E1E4E8;">&gt;Click me to get parent&#39;s data&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handleClick</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// Access parent component instance</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 获取子组件实例 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#FDAEB7;font-style:italic;">ChildComponent</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;childRef&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;handleButtonClick&quot;</span><span style="color:#E1E4E8;">&gt;Get Child Data&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ChildComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ChildComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChildComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">handleButtonClick</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// Access child component instance using refs</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$refs.childRef);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;I am the child component.&lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      childData: </span><span style="color:#9ECBFF;">&#39;Some child data&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 获取父组件实例 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#B31D28;font-style:italic;">ChildComponent</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ChildComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ChildComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    ChildComponent</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;handleClick&quot;</span><span style="color:#24292E;">&gt;Click me to get parent&#39;s data&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handleClick</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// Access parent component instance</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$parent);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 获取子组件实例 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#B31D28;font-style:italic;">ChildComponent</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;childRef&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;handleButtonClick&quot;</span><span style="color:#24292E;">&gt;Get Child Data&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ChildComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ChildComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    ChildComponent</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">handleButtonClick</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// Access child component instance using refs</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$refs.childRef);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;I am the child component.&lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      childData: </span><span style="color:#032F62;">&#39;Some child data&#39;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br></div></div></li><li><p><strong>引用组件实例</strong>: 使用 <code>ref</code> 获取组件实例后可以直接调用组件的属性或方法。</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- SomeComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#FDAEB7;font-style:italic;">OtherComponent</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">ref</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;otherComponentRef&quot;</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;invokeOtherComponentMethod&quot;</span><span style="color:#E1E4E8;">&gt;Invoke Method&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> OtherComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./OtherComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    OtherComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">invokeOtherComponentMethod</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$refs.otherComponentRef.</span><span style="color:#B392F0;">someMethod</span><span style="color:#E1E4E8;">(); </span><span style="color:#6A737D;">// Directly invoking the method from the OtherComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{{ childMessage }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      childMessage: </span><span style="color:#9ECBFF;">&#39;Hello from Child&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- SomeComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#B31D28;font-style:italic;">OtherComponent</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">ref</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;otherComponentRef&quot;</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;invokeOtherComponentMethod&quot;</span><span style="color:#24292E;">&gt;Invoke Method&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> OtherComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./OtherComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    OtherComponent</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">invokeOtherComponentMethod</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$refs.otherComponentRef.</span><span style="color:#6F42C1;">someMethod</span><span style="color:#24292E;">(); </span><span style="color:#6A737D;">// Directly invoking the method from the OtherComponent</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{{ childMessage }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      childMessage: </span><span style="color:#032F62;">&#39;Hello from Child&#39;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br></div></div></li><li><p><strong>父 -&gt; 孙组件通信</strong>: 可使用 <code>provide</code> 和 <code>inject</code>。虽然 Vue 官方不推荐频繁使用，但在组件库中很常见。</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 设置 provide 在父组件 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- GrandParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#FDAEB7;font-style:italic;">ParentComponent</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ParentComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ParentComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ParentComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">provide</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      grandParentData: </span><span style="color:#9ECBFF;">&#39;Data from Grandparent&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 使用 inject 在孙子组件 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#FDAEB7;font-style:italic;">ChildComponent</span><span style="color:#E1E4E8;"> /&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> ChildComponent </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./ChildComponent.vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    ChildComponent</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue (孙子组件) --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    {{ grandParentData }}</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  inject: [</span><span style="color:#9ECBFF;">&#39;grandParentData&#39;</span><span style="color:#E1E4E8;">]</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- 设置 provide 在父组件 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- GrandParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#B31D28;font-style:italic;">ParentComponent</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ParentComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ParentComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    ParentComponent</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">provide</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      grandParentData: </span><span style="color:#032F62;">&#39;Data from Grandparent&#39;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- 使用 inject 在孙子组件 --&gt;</span></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ParentComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#B31D28;font-style:italic;">ChildComponent</span><span style="color:#24292E;"> /&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> ChildComponent </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./ChildComponent.vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    ChildComponent</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- ChildComponent.vue (孙子组件) --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    {{ grandParentData }}</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  inject: [</span><span style="color:#032F62;">&#39;grandParentData&#39;</span><span style="color:#24292E;">]</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div></li></ul></li><li><p><strong><code>$emit</code>/<code>$on</code>: 自定义事件，兄弟组件通信</strong></p><ul><li><p><strong>Event Bus</strong>: 使用 Vue 实例作为中央事件总线来实现跨组件通信。例如：<code>Vue.prototype.$bus = new Vue()</code>。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// EventBus.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">EventBus</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">();</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// EventBus.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">EventBus</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">();</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- SiblingA.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">@click</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;sendMessage&quot;</span><span style="color:#E1E4E8;">&gt;Send Message to Sibling B&lt;/</span><span style="color:#85E89D;">button</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { EventBus } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./EventBus.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">sendMessage</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">      EventBus.</span><span style="color:#B392F0;">$emit</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;messageFromA&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;Hello Sibling B!&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- SiblingB.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;Message from Sibling A: {{ message }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { EventBus } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;./EventBus.js&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      message: </span><span style="color:#9ECBFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    EventBus.</span><span style="color:#B392F0;">$on</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;messageFromA&#39;</span><span style="color:#E1E4E8;">, (</span><span style="color:#FFAB70;">payload</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.message </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> payload;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- SiblingA.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">button</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">@click</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;sendMessage&quot;</span><span style="color:#24292E;">&gt;Send Message to Sibling B&lt;/</span><span style="color:#22863A;">button</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { EventBus } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./EventBus.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">sendMessage</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">      EventBus.</span><span style="color:#6F42C1;">$emit</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;messageFromA&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;Hello Sibling B!&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- SiblingB.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;Message from Sibling A: {{ message }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { EventBus } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;./EventBus.js&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      message: </span><span style="color:#032F62;">&#39;&#39;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    EventBus.</span><span style="color:#6F42C1;">$on</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;messageFromA&#39;</span><span style="color:#24292E;">, (</span><span style="color:#E36209;">payload</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.message </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> payload;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br></div></div></li></ul></li><li><p><strong>Vuex: 跨级组件通信</strong></p><ul><li><p><strong>状态管理</strong>: 使用 Vuex 进行状态管理，实现跨级组件通信。</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// store.js</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vue </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vue&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> Vuex </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vuex&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">Vue.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(Vuex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">store</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> Vuex.</span><span style="color:#B392F0;">Store</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  state: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    message: </span><span style="color:#9ECBFF;">&#39;Hello from Vuex Store!&#39;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// store.js</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vue </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vue&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> Vuex </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vuex&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">Vue.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(Vuex);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">store</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> Vuex.</span><span style="color:#6F42C1;">Store</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  state: {</span></span>
<span class="line"><span style="color:#24292E;">    message: </span><span style="color:#032F62;">&#39;Hello from Vuex Store!&#39;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- AnyComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;{{ messageFromStore }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { mapState } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;vuex&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  computed: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">...</span><span style="color:#B392F0;">mapState</span><span style="color:#E1E4E8;">([</span><span style="color:#9ECBFF;">&#39;message&#39;</span><span style="color:#E1E4E8;">])</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- AnyComponent.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;{{ messageFromStore }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { mapState } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;vuex&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  computed: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">...</span><span style="color:#6F42C1;">mapState</span><span style="color:#24292E;">([</span><span style="color:#032F62;">&#39;message&#39;</span><span style="color:#24292E;">])</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div></li><li><p><strong>属性和监听器传递</strong>: 使用 <code>$attrs</code> 和 <code>$listeners</code> 进行非直接父子关系的组件通信。</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">&lt;!-- index.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">child-com1</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:foo</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;foo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:boo</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;boo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:coo</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;coo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">:doo</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;doo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">@one.native</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;triggerOne&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">@two</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;triggerTwo&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">title</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;Vue通信&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &gt;&lt;/</span><span style="color:#85E89D;">child-com1</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">childCom1</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./childCom1.vue&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: { childCom1 },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">data</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      foo: </span><span style="color:#9ECBFF;">&quot;Javascript&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      boo: </span><span style="color:#9ECBFF;">&quot;Html&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      coo: </span><span style="color:#9ECBFF;">&quot;CSS&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      doo: </span><span style="color:#9ECBFF;">&quot;Vue&quot;</span></span>
<span class="line"><span style="color:#E1E4E8;">    };</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods:{</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">triggerOne</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;one&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">triggerTwo</span><span style="color:#E1E4E8;">(){</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">alert</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;two&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom1.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;border&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;foo: {{ foo }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;childCom1的$attrs: {{ $attrs }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">child-com2</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-bind</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;$attrs&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-on</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;$listeners&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">child-com2</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">childCom2</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./childCom2.vue&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    childCom2</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 默认为true，如果传入的属性子组件没有prop接受，就会以字符串的形式出现为标签属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 设为false，在dom中就看不到这些属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 可以关闭自动挂载到组件根元素上的没有在props声明的属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    foo: String </span><span style="color:#6A737D;">// foo作为props属性绑定</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$attrs); </span><span style="color:#6A737D;">// { &quot;boo&quot;: &quot;Html&quot;, &quot;coo&quot;: &quot;CSS&quot;, &quot;doo&quot;: &quot;Vue&quot;, &quot;title&quot;: &quot;Vue通信&quot; }</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$listeners);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom2.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;border&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;boo: {{ boo }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;childCom2的$attrs: {{ $attrs }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">child-com3</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-bind</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;$attrs&quot;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">v-on</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;$listeners&quot;</span><span style="color:#E1E4E8;">&gt;&lt;/</span><span style="color:#85E89D;">child-com3</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">childCom3</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">import</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&quot;./childCom3.vue&quot;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  components: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    childCom3</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  inheritAttrs: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    boo: String</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$attrs); </span><span style="color:#6A737D;">// {&quot;coo&quot;: &quot;CSS&quot;, &quot;doo&quot;: &quot;Vue&quot;, &quot;title&quot;: &quot;Vue通信&quot; }</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$listeners);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom3.vue --&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">class</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;border&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">    &lt;</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;childCom3: {{ $attrs }}&lt;/</span><span style="color:#85E89D;">p</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;/</span><span style="color:#85E89D;">div</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">template</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">default</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  props: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    coo: String,</span></span>
<span class="line"><span style="color:#E1E4E8;">    title: String</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">mounted</span><span style="color:#E1E4E8;">() {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.$listeners);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// this.$listeners.two();</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">};</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">script</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">&lt;!-- index.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">child-com1</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:foo</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;foo&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:boo</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;boo&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:coo</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;coo&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">:doo</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;doo&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">@one.native</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;triggerOne&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">@two</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;triggerTwo&quot;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">title</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;Vue通信&quot;</span></span>
<span class="line"><span style="color:#24292E;">    &gt;&lt;/</span><span style="color:#22863A;">child-com1</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">childCom1</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./childCom1.vue&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: { childCom1 },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">data</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      foo: </span><span style="color:#032F62;">&quot;Javascript&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      boo: </span><span style="color:#032F62;">&quot;Html&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      coo: </span><span style="color:#032F62;">&quot;CSS&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      doo: </span><span style="color:#032F62;">&quot;Vue&quot;</span></span>
<span class="line"><span style="color:#24292E;">    };</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods:{</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">triggerOne</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;one&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">triggerTwo</span><span style="color:#24292E;">(){</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">alert</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;two&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom1.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;border&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;foo: {{ foo }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;childCom1的$attrs: {{ $attrs }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">child-com2</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-bind</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;$attrs&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-on</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;$listeners&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">child-com2</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">childCom2</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./childCom2.vue&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    childCom2</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 默认为true，如果传入的属性子组件没有prop接受，就会以字符串的形式出现为标签属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 设为false，在dom中就看不到这些属性</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 可以关闭自动挂载到组件根元素上的没有在props声明的属性</span></span>
<span class="line"><span style="color:#24292E;">  props: {</span></span>
<span class="line"><span style="color:#24292E;">    foo: String </span><span style="color:#6A737D;">// foo作为props属性绑定</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$attrs); </span><span style="color:#6A737D;">// { &quot;boo&quot;: &quot;Html&quot;, &quot;coo&quot;: &quot;CSS&quot;, &quot;doo&quot;: &quot;Vue&quot;, &quot;title&quot;: &quot;Vue通信&quot; }</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$listeners);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom2.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;border&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;boo: {{ boo }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;childCom2的$attrs: {{ $attrs }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">child-com3</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-bind</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;$attrs&quot;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">v-on</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;$listeners&quot;</span><span style="color:#24292E;">&gt;&lt;/</span><span style="color:#22863A;">child-com3</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">childCom3</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">import</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&quot;./childCom3.vue&quot;</span><span style="color:#24292E;">);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  components: {</span></span>
<span class="line"><span style="color:#24292E;">    childCom3</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  inheritAttrs: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">  props: {</span></span>
<span class="line"><span style="color:#24292E;">    boo: String</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$attrs); </span><span style="color:#6A737D;">// {&quot;coo&quot;: &quot;CSS&quot;, &quot;doo&quot;: &quot;Vue&quot;, &quot;title&quot;: &quot;Vue通信&quot; }</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$listeners);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">&lt;!-- childCom3.vue --&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;</span><span style="color:#22863A;">div</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">class</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;border&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">    &lt;</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;childCom3: {{ $attrs }}&lt;/</span><span style="color:#22863A;">p</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;/</span><span style="color:#22863A;">div</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">template</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">default</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  props: {</span></span>
<span class="line"><span style="color:#24292E;">    coo: String,</span></span>
<span class="line"><span style="color:#24292E;">    title: String</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">mounted</span><span style="color:#24292E;">() {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.$listeners);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// this.$listeners.two();</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">};</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">script</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br><span class="line-number">58</span><br><span class="line-number">59</span><br><span class="line-number">60</span><br><span class="line-number">61</span><br><span class="line-number">62</span><br><span class="line-number">63</span><br><span class="line-number">64</span><br><span class="line-number">65</span><br><span class="line-number">66</span><br><span class="line-number">67</span><br><span class="line-number">68</span><br><span class="line-number">69</span><br><span class="line-number">70</span><br><span class="line-number">71</span><br><span class="line-number">72</span><br><span class="line-number">73</span><br><span class="line-number">74</span><br><span class="line-number">75</span><br><span class="line-number">76</span><br><span class="line-number">77</span><br><span class="line-number">78</span><br><span class="line-number">79</span><br><span class="line-number">80</span><br><span class="line-number">81</span><br><span class="line-number">82</span><br><span class="line-number">83</span><br><span class="line-number">84</span><br><span class="line-number">85</span><br><span class="line-number">86</span><br><span class="line-number">87</span><br><span class="line-number">88</span><br><span class="line-number">89</span><br><span class="line-number">90</span><br><span class="line-number">91</span><br><span class="line-number">92</span><br><span class="line-number">93</span><br><span class="line-number">94</span><br><span class="line-number">95</span><br><span class="line-number">96</span><br><span class="line-number">97</span><br><span class="line-number">98</span><br><span class="line-number">99</span><br><span class="line-number">100</span><br><span class="line-number">101</span><br><span class="line-number">102</span><br><span class="line-number">103</span><br><span class="line-number">104</span><br><span class="line-number">105</span><br><span class="line-number">106</span><br><span class="line-number">107</span><br><span class="line-number">108</span><br><span class="line-number">109</span><br><span class="line-number">110</span><br><span class="line-number">111</span><br><span class="line-number">112</span><br><span class="line-number">113</span><br><span class="line-number">114</span><br></div></div></li></ul></li></ol><h2 id="nexttick-的实现" tabindex="-1"><code>nextTick</code> 的实现 <a class="header-anchor" href="#nexttick-的实现" aria-label="Permalink to &quot;\`nextTick\` 的实现&quot;">​</a></h2><ol><li><p><strong>定义</strong>: <code>nextTick</code> 是 Vue 提供的一个全局 API，用于在下次 DOM 更新循环结束后执行延迟回调。当数据改变后，使用 <code>$nextTick</code> 可以在回调中获取更新后的 DOM。</p></li><li><p><strong>异步更新</strong>: Vue 在更新 DOM 时是异步执行的。当检测到数据变化，Vue 会开启一个队列并缓存同一事件循环中的所有数据变更。对于多次触发的同一个 <code>watcher</code>，它只会被加入队列一次，以减少不必要的计算和 DOM 操作。</p></li><li><p><strong>使用场景</strong>: 当需要在数据改变后立即进行某些 DOM 操作时，可以使用 <code>nextTick</code> 并在其回调中执行这些操作。</p></li><li><p><strong>实现机制</strong>: <code>nextTick</code> 主要通过添加回调函数到 <code>callbacks</code> 队列中来实现，并使用 <code>timerFunc</code> 来异步执行。首选的异步方式是 <code>Promise</code>。这解释了为什么在 <code>nextTick</code> 中可以立即看到 DOM 更新的结果。</p></li></ol><h2 id="nexttick-的实现原理" tabindex="-1"><code>nextTick</code> 的实现原理 <a class="header-anchor" href="#nexttick-的实现原理" aria-label="Permalink to &quot;\`nextTick\` 的实现原理&quot;">​</a></h2><p><code>nextTick</code> 的工作原理主要是通过宏任务和微任务来实现。Vue 会根据当前环境选择最佳的异步方案：</p><ol><li>首选使用 <code>Promise</code>。</li><li>若不支持 <code>Promise</code>，则尝试使用 <code>MutationObserver</code>。</li><li>如果以上都不可用，尝试使用 <code>setImmediate</code>。</li><li>最后如果还不支持，会回退到使用 <code>setTimeout</code>。</li></ol><p>当多次调用 <code>nextTick</code> 时，所有的回调函数会被添加到一个队列中。然后通过上述异步方法，来依次清空并执行队列中的回调。</p><h2 id="使用过插槽么-用的是具名插槽还是匿名插槽或作用域插槽" tabindex="-1">使用过插槽么？用的是具名插槽还是匿名插槽或作用域插槽 <a class="header-anchor" href="#使用过插槽么-用的是具名插槽还是匿名插槽或作用域插槽" aria-label="Permalink to &quot;使用过插槽么？用的是具名插槽还是匿名插槽或作用域插槽&quot;">​</a></h2><p>Vue 中的插槽 (slot) 提供了一个灵活的方式来分发父组件的内容到子组件的模板中。Vue 支持三种插槽：</p><ol><li><p><strong>默认插槽（匿名插槽）</strong>: 这种插槽不带名字，子组件中的内容将默认被替换为父组件为该插槽提供的内容。</p></li><li><p><strong>具名插槽</strong>: 与默认插槽相对应，具名插槽是有名字的插槽。可以根据其名称进行内容的插入。</p></li><li><p><strong>作用域插槽</strong>: 允许父组件访问子组件的数据，因此在父组件中可以自定义内容而使用子组件的数据。</p></li></ol><h2 id="keep-alive-的实现" tabindex="-1">keep-alive 的实现 <a class="header-anchor" href="#keep-alive-的实现" aria-label="Permalink to &quot;keep-alive 的实现&quot;">​</a></h2><p><code>keep-alive</code> 是 Vue.js 的内置组件，它可以使得被包裹的组件在切换时不被销毁而是被缓存。</p><p><strong>作用</strong>:</p><ul><li>实现组件缓存，避免重复渲染提高性能。</li><li>组件状态保持，避免了数据重新获取或重置。</li></ul><p><strong>场景</strong>:</p><ul><li>如标签页、导航等内容频繁切换，但不希望每次都重载的情况。</li><li>Vue 项目中的性能优化。</li></ul><p><strong>原理</strong>:</p><p>Vue.js 将 DOM 节点抽象成了 VNode (虚拟节点)。<code>keep-alive</code> 的缓存机制是基于 VNode，并不是真实的 DOM 结构。它在内部通过 <code>cache</code> 对象来存储满足条件的组件的 VNode，当需要重新渲染时，会从 <code>cache</code> 对象中取出对应的 VNode 进行渲染。</p><h2 id="keep-alive-的属性" tabindex="-1">keep-alive 的属性 <a class="header-anchor" href="#keep-alive-的属性" aria-label="Permalink to &quot;keep-alive 的属性&quot;">​</a></h2><p><code>keep-alive</code> 提供了几个属性来有条件地进行缓存：</p><ul><li><code>include</code>: 定义缓存的组件白名单。只有命中的组件会被缓存。</li><li><code>exclude</code>: 定义不被缓存的组件黑名单。</li><li><code>max</code>: 定义缓存组件的数量上限，超出上限会使用 LRU (Least Recently Used) 策略进行缓存组件的置换。</li></ul><p><strong>在动态组件中的应用</strong>:</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">keep-alive</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">whiteList</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">exclude</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">blackList</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">amount</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;component :is=&quot;currentComponent&quot;&gt;&lt;/component&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">keep-alive</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">keep-alive</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">whiteList</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">exclude</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">blackList</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">amount</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;component :is=&quot;currentComponent&quot;&gt;&lt;/component&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">keep-alive</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><strong>在vue-router中的应用</strong>:</p><div class="language-vue vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">&lt;</span><span style="color:#85E89D;">keep-alive</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">include</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">whiteList</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">exclude</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">blackList</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;"> :</span><span style="color:#B392F0;">max</span><span style="color:#E1E4E8;">=</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">amount</span><span style="color:#9ECBFF;">&quot;</span><span style="color:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">  &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span style="color:#E1E4E8;">&lt;/</span><span style="color:#85E89D;">keep-alive</span><span style="color:#E1E4E8;">&gt;</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">&lt;</span><span style="color:#22863A;">keep-alive</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">include</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">whiteList</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">exclude</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">blackList</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;"> :</span><span style="color:#6F42C1;">max</span><span style="color:#24292E;">=</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">amount</span><span style="color:#032F62;">&quot;</span><span style="color:#24292E;">&gt;</span></span>
<span class="line"><span style="color:#24292E;">  &lt;router-view&gt;&lt;/router-view&gt;</span></span>
<span class="line"><span style="color:#24292E;">&lt;/</span><span style="color:#22863A;">keep-alive</span><span style="color:#24292E;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h2 id="mixin" tabindex="-1">mixin <a class="header-anchor" href="#mixin" aria-label="Permalink to &quot;mixin&quot;">​</a></h2><p>在 Vue 项目变得复杂时，如果多个组件之间存在重复的逻辑，通常可以使用 <code>mixin</code> 来进行代码的重用。<code>mixin</code> 允许开发者抽离出公共逻辑，并在多个组件中混合使用。</p><p><strong>示例</strong>:</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// 定义一个 mixin</span></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">myMixin</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#79B8FF;">this</span><span style="color:#E1E4E8;">.</span><span style="color:#B392F0;">hello</span><span style="color:#E1E4E8;">()</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  methods: {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">hello</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">      console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello from mixin!&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 使用 mixin</span></span>
<span class="line"><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Vue</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">  mixins: [myMixin],</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">created</span><span style="color:#E1E4E8;">: </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> () {</span></span>
<span class="line"><span style="color:#E1E4E8;">    console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;Hello from component!&#39;</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">})</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// 定义一个 mixin</span></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">myMixin</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#005CC5;">this</span><span style="color:#24292E;">.</span><span style="color:#6F42C1;">hello</span><span style="color:#24292E;">()</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  methods: {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">hello</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">      console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello from mixin!&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 使用 mixin</span></span>
<span class="line"><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Vue</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">  mixins: [myMixin],</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">created</span><span style="color:#24292E;">: </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> () {</span></span>
<span class="line"><span style="color:#24292E;">    console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;Hello from component!&#39;</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">})</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p><strong>使用场景</strong>: 例如，在 PC 端，新闻列表和详情页有相同的右侧栏目，都可以使用 <code>mixin</code> 进行逻辑的混合。</p><p><strong>劣势</strong>:</p><ol><li>变量来源可能不明确，使得代码不易阅读。</li><li>使用多个 <code>mixin</code> 可能会导致命名冲突。</li><li><code>mixin</code> 和组件之间可能出现多对多的关系，这可能会增加项目的复杂度。</li></ol><p>需要注意，虽然 <code>mixin</code> 提供了代码复用的便利，但它并不是一个完美的解决方案。在 Vue 3 中，引入了 Composition API，旨在解决 <code>mixin</code> 的部分问题。</p><hr><h2 id="vue-如何实现模拟-v-model-指令" tabindex="-1">Vue 如何实现模拟 v-model 指令 <a class="header-anchor" href="#vue-如何实现模拟-v-model-指令" aria-label="Permalink to &quot;Vue 如何实现模拟 v-model 指令&quot;">​</a></h2><p>可以使用 Vue 的自定义指令 <code>Vue.directive()</code> 来模拟 <code>v-model</code>。</p><p><strong>示例</strong>:</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">Vue.</span><span style="color:#B392F0;">directive</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;myModel&#39;</span><span style="color:#E1E4E8;">, {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">bind</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">binding</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">vnode</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 监听 input 事件</span></span>
<span class="line"><span style="color:#E1E4E8;">    el.</span><span style="color:#B392F0;">addEventListener</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;input&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">event</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 当 input 事件触发时，更新父组件中的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">      vnode.context[binding.expression] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> event.target.value;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  },</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 当指令的值更新时，将其同步到元素的 value 属性</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">update</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">el</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">binding</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    el.value </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> binding.value;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">Vue.</span><span style="color:#6F42C1;">directive</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;myModel&#39;</span><span style="color:#24292E;">, {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">bind</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, </span><span style="color:#E36209;">binding</span><span style="color:#24292E;">, </span><span style="color:#E36209;">vnode</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 监听 input 事件</span></span>
<span class="line"><span style="color:#24292E;">    el.</span><span style="color:#6F42C1;">addEventListener</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;input&#39;</span><span style="color:#24292E;">, </span><span style="color:#D73A49;">function</span><span style="color:#24292E;">(</span><span style="color:#E36209;">event</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 当 input 事件触发时，更新父组件中的数据</span></span>
<span class="line"><span style="color:#24292E;">      vnode.context[binding.expression] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> event.target.value;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  },</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 当指令的值更新时，将其同步到元素的 value 属性</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">update</span><span style="color:#24292E;">(</span><span style="color:#E36209;">el</span><span style="color:#24292E;">, </span><span style="color:#E36209;">binding</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">    el.value </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> binding.value;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br></div></div><h2 id="vuex-的理解及使用场景" tabindex="-1">Vuex 的理解及使用场景 <a class="header-anchor" href="#vuex-的理解及使用场景" aria-label="Permalink to &quot;Vuex 的理解及使用场景&quot;">​</a></h2><p>Vuex 是专为 Vue.js 应用程序开发的状态管理模式。每个 Vuex 应用的核心是 <code>store</code>。</p><p><strong>特点</strong>:</p><ol><li>Vuex 的状态存储是响应式的。当 Vue 组件从 <code>store</code> 中读取状态时，如果 <code>store</code> 的状态发生变化，相关的组件会自动更新。</li><li>改变 <code>store</code> 中的状态的唯一方式是显式地提交 (commit) <code>mutation</code>。这样可以方便地跟踪每个状态的变化。</li></ol><p><strong>核心模块</strong>:</p><ol><li><strong>State</strong>: 定义了应用的状态数据。</li><li><strong>Getter</strong>: 可视为 <code>store</code> 的计算属性。其返回值会基于它的依赖被缓存，并在其依赖发生改变时重新计算。</li><li><strong>Mutation</strong>: 是改变 <code>store</code> 中状态的唯一方法，且必须是同步函数。</li><li><strong>Action</strong>: 用于提交 <code>mutation</code>，而不是直接变更状态。可以包含任意异步操作。</li><li><strong>Module</strong>: 允许将单一的 <code>store</code> 拆分为多个 <code>store</code>，但所有的状态仍然保存在一个单一的状态树中。</li></ol><p><img src="https://i.postimg.cc/66htCCZb/vuex.png" alt="流程图"></p><h2 id="vue-和-react-的区别" tabindex="-1">Vue 和 React 的区别 <a class="header-anchor" href="#vue-和-react-的区别" aria-label="Permalink to &quot;Vue 和 React 的区别&quot;">​</a></h2><p><strong>共同点</strong>：</p><ol><li><strong>数据驱动视图</strong>：两者都采用数据来驱动视图的更新，确保数据变化时视图能够及时响应。</li><li><strong>组件化</strong>：Vue 和 React 都采用组件化的结构，使得开发更加模块化和可复用。</li><li><strong>Virtual DOM</strong>：两者都使用 Virtual DOM 来提高渲染效率，避免直接操作真实 DOM 带来的性能损耗。</li></ol><p><strong>不同点</strong>：</p><ol><li><p><strong>核心思想</strong>：</p><ul><li><strong>Vue</strong>：作为一个灵活且易用的渐进式框架，Vue 采用数据拦截/代理的方式，使其对数据变化的侦测更为敏感和精确。</li><li><strong>React</strong>：强调函数式编程，特别是纯组件的概念，它倡导数据的不可变性和单向数据流。</li></ul></li><li><p><strong>组件写法</strong>：</p><ul><li><strong>Vue</strong>：推崇单文件组件格式，即在同一个文件中编写 HTML、CSS 和 JS。</li><li><strong>React</strong>：推荐使用 JSX + inline style，即将 HTML 和 CSS 都集成到 JavaScript 中，实现 &quot;all in js&quot; 的概念。</li></ul></li><li><p><strong>Diff 算法</strong>：</p><ul><li><strong>共同思路</strong>：当不同的组件产生不同的 DOM 结构时，如果类型不同，则直接销毁旧的 DOM 并创建新的 DOM。通过唯一的 key 来区分同一层次的子节点。</li><li><strong>Vue</strong>：采用双端比较算法，从新旧 children 的两端开始比较，利用 key 值找到可复用的节点。这种方法可以减少节点移动的次数，从而减少不必要的性能损耗。</li><li><strong>React</strong>：虽然也使用 key 值进行比较，但在某些情况下可能会有更多的节点移动。</li></ul></li><li><p><strong>响应式原理</strong>：</p><ul><li><strong>Vue</strong>：通过依赖收集进行自动优化，数据是可变的。当数据发生变化时，Vue 会自动找到相关的组件并重新渲染。</li><li><strong>React</strong>：基于状态机的原理，需要手动优化。数据是不可变的，当数据发生变化时，需要使用 setState 方法。默认情况下，React 会以组件为根重新渲染整个组件树。</li></ul></li></ol>`,100),e=[o];function t(c,r,E,i,y,u){return n(),a("div",null,e)}const m=s(p,[["render",t]]);export{d as __pageData,m as default};
