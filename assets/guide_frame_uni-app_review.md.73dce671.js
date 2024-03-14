import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.aea2adc8.js";const h=JSON.parse('{"title":"复习","description":"","frontmatter":{},"headers":[],"relativePath":"guide/frame/uni-app/review.md","filePath":"guide/frame/uni-app/review.md","lastUpdated":1710382600000}'),l={name:"guide/frame/uni-app/review.md"},e=p(`<h1 id="复习" tabindex="-1">复习 <a class="header-anchor" href="#复习" aria-label="Permalink to &quot;复习&quot;">​</a></h1><h2 id="_1-什么是-uni-app" tabindex="-1">1. 什么是 uni-app？ <a class="header-anchor" href="#_1-什么是-uni-app" aria-label="Permalink to &quot;1. 什么是 uni-app？&quot;">​</a></h2><p>uni-app 是一个使用 Vue.js 开发所有前端应用的框架，能够编译到 iOS、Android、各种小程序以及Web等多个平台。它允许开发者写一套代码，然后发布到各种平台上运行。</p><h2 id="_2-uni-app-的主要特点有哪些" tabindex="-1">2. uni-app 的主要特点有哪些？ <a class="header-anchor" href="#_2-uni-app-的主要特点有哪些" aria-label="Permalink to &quot;2. uni-app 的主要特点有哪些？&quot;">​</a></h2><ul><li><strong>跨平台性</strong>：支持发布到iOS、Android、Web以及各大主流小程序平台。</li><li><strong>组件丰富</strong>：提供大量预制的组件和模块，加速开发过程。</li><li><strong>性能优化</strong>：编译时进行代码优化，运行时进行智能分包，确保应用加载快速。</li><li><strong>易于学习</strong>：基于Vue.js，上手简单，学习曲线平缓。</li><li><strong>社区支持</strong>：有着活跃的开发者社区和丰富的学习资源。</li></ul><h2 id="_3-uni-app-在页面布局中使用的单位是什么" tabindex="-1">3. uni-app 在页面布局中使用的单位是什么？ <a class="header-anchor" href="#_3-uni-app-在页面布局中使用的单位是什么" aria-label="Permalink to &quot;3. uni-app 在页面布局中使用的单位是什么？&quot;">​</a></h2><p>uni-app 推荐使用 <code>rpx</code>（responsive pixel）作为布局单位，它能够根据屏幕宽度自动缩放，实现不同设备上的自适应布局。</p><h2 id="_4-如何在-uni-app-中进行条件编译" tabindex="-1">4. 如何在 uni-app 中进行条件编译？ <a class="header-anchor" href="#_4-如何在-uni-app-中进行条件编译" aria-label="Permalink to &quot;4. 如何在 uni-app 中进行条件编译？&quot;">​</a></h2><p>uni-app 支持条件编译，允许在同一份代码中针对不同平台写不同的代码。条件编译可以通过 <code>#ifdef</code> 和 <code>#ifndef</code> 指令实现，例如：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">// #ifdef H5</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;仅在H5平台打印&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">// #endif</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// #ifndef H5</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;非H5平台打印&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#6A737D;">// #endif</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">// #ifdef H5</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;仅在H5平台打印&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">// #endif</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// #ifndef H5</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;非H5平台打印&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#6A737D;">// #endif</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="_5-uni-app-中如何管理状态" tabindex="-1">5. uni-app 中如何管理状态？ <a class="header-anchor" href="#_5-uni-app-中如何管理状态" aria-label="Permalink to &quot;5. uni-app 中如何管理状态？&quot;">​</a></h2><p>uni-app 可以通过 Vuex 来进行状态管理。Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式，它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。</p><h2 id="_6-在-uni-app-中如何实现跨平台的数据请求" tabindex="-1">6. 在 uni-app 中如何实现跨平台的数据请求？ <a class="header-anchor" href="#_6-在-uni-app-中如何实现跨平台的数据请求" aria-label="Permalink to &quot;6. 在 uni-app 中如何实现跨平台的数据请求？&quot;">​</a></h2><p>uni-app 提供了 <code>uni.request</code> API，用于进行网络请求。这个API封装了各平台的网络请求差异，开发者可以使用相同的代码实现跨平台的HTTP请求。</p><p>示例代码：</p><div class="language-javascript vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">uni.</span><span style="color:#B392F0;">request</span><span style="color:#E1E4E8;">({</span></span>
<span class="line"><span style="color:#E1E4E8;">    url: </span><span style="color:#9ECBFF;">&#39;https://example.com/api/data&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 服务器接口地址</span></span>
<span class="line"><span style="color:#E1E4E8;">    method: </span><span style="color:#9ECBFF;">&#39;GET&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">success</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">res</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(res.data);</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">fail</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">err</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        console.</span><span style="color:#B392F0;">error</span><span style="color:#E1E4E8;">(err);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">});</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">uni.</span><span style="color:#6F42C1;">request</span><span style="color:#24292E;">({</span></span>
<span class="line"><span style="color:#24292E;">    url: </span><span style="color:#032F62;">&#39;https://example.com/api/data&#39;</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 服务器接口地址</span></span>
<span class="line"><span style="color:#24292E;">    method: </span><span style="color:#032F62;">&#39;GET&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">success</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">res</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(res.data);</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">fail</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">err</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        console.</span><span style="color:#6F42C1;">error</span><span style="color:#24292E;">(err);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">});</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><h2 id="_7-解释-uni-app-的生命周期" tabindex="-1">7. 解释 uni-app 的生命周期？ <a class="header-anchor" href="#_7-解释-uni-app-的生命周期" aria-label="Permalink to &quot;7. 解释 uni-app 的生命周期？&quot;">​</a></h2><p>uni-app 的生命周期主要分为应用生命周期、页面生命周期和组件生命周期。这些生命周期的设计使得开发者能够更好地管理和控制应用、页面和组件的状态。</p><h3 id="应用生命周期" tabindex="-1">应用生命周期 <a class="header-anchor" href="#应用生命周期" aria-label="Permalink to &quot;应用生命周期&quot;">​</a></h3><p>应用生命周期主要关注整个应用的启动、前后台切换等状态变化。它包括以下几个重要的钩子函数：</p><ul><li><strong>onLaunch</strong>: 当uni-app应用初始化完成时触发。这是应用启动的入口，此时可以进行应用级别的初始化操作，如登录验证、设备信息获取等。</li><li><strong>onShow</strong>: 当uni-app启动，或从后台进入前台显示时触发。可以处理应用被重新激活的逻辑。</li><li><strong>onHide</strong>: 当uni-app从前台进入后台时触发。可以处理如保存数据等清理任务。</li><li><strong>onError</strong>: 当uni-app发生脚本错误或者API调用失败时会触发此函数。</li></ul><h3 id="页面生命周期" tabindex="-1">页面生命周期 <a class="header-anchor" href="#页面生命周期" aria-label="Permalink to &quot;页面生命周期&quot;">​</a></h3><p>页面生命周期主要关注页面的加载、显示、隐藏和卸载过程。页面的生命周期包括：</p><ul><li><strong>onLoad</strong>: 页面加载时触发，一个页面只会调用一次。可以在这个阶段获取打开当前页面路径中的参数。</li><li><strong>onShow</strong>: 页面显示/切入前台时触发。每次打开页面都会调用。</li><li><strong>onReady</strong>: 页面初次渲染完成时触发，一个页面只会调用一次。代表页面已经准备妥当，可以和视图层交互。</li><li><strong>onHide</strong>: 页面隐藏/切入后台时触发。当navigateTo或底部tab切换时调用。</li><li><strong>onUnload</strong>: 页面卸载时触发。比如说使用了navigateTo的方式跳转到另一个页面时。</li></ul><h3 id="组件生命周期" tabindex="-1">组件生命周期 <a class="header-anchor" href="#组件生命周期" aria-label="Permalink to &quot;组件生命周期&quot;">​</a></h3><p>组件生命周期主要关注组件的创建、挂载、更新和销毁过程。组件的生命周期包括：</p><ul><li><strong>created</strong>: 组件实例刚被创建时执行，此阶段不能访问 <code>this</code>。</li><li><strong>beforeMount</strong>: 在挂载开始之前被调用，对应的render函数首次被调用。</li><li><strong>mounted</strong>: 组件挂载到DOM上后执行，这时可以进行API调用等操作。</li><li><strong>beforeUpdate</strong>: 数据更新时调用，发生在虚拟DOM打补丁之前。</li><li><strong>updated</strong>: 组件更新后执行。</li><li><strong>beforeDestroy</strong>: 组件销毁前调用。</li><li><strong>destroyed</strong>: 组件销毁后调用。</li></ul>`,27),o=[e];function r(t,i,c,u,d,E){return a(),n("div",null,o)}const b=s(l,[["render",r]]);export{h as __pageData,b as default};