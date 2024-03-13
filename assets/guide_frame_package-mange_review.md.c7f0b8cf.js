import{_ as e,o as a,c as o,Q as t}from"./chunks/framework.aea2adc8.js";const P=JSON.parse('{"title":"复习","description":"","frontmatter":{},"headers":[],"relativePath":"guide/frame/package-mange/review.md","filePath":"guide/frame/package-mange/review.md","lastUpdated":1710295201000}'),n={name:"guide/frame/package-mange/review.md"},r=t('<h1 id="复习" tabindex="-1">复习 <a class="header-anchor" href="#复习" aria-label="Permalink to &quot;复习&quot;">​</a></h1><h2 id="npm-node-package-manager" tabindex="-1">NPM (Node Package Manager) <a class="header-anchor" href="#npm-node-package-manager" aria-label="Permalink to &quot;NPM (Node Package Manager)&quot;">​</a></h2><p><strong>介绍：</strong> NPM 是 Node.js 的包管理器，用于管理项目中的依赖。它允许用户安装、共享和管理依赖库。</p><p><strong>常用命令：</strong></p><ul><li><code>npm install &lt;package&gt;</code>：安装一个包。</li><li><code>npm install</code>：根据 <code>package.json</code> 安装所有依赖。</li><li><code>npm update &lt;package&gt;</code>：更新一个包。</li><li><code>npm uninstall &lt;package&gt;</code>：卸载一个包。</li><li><code>npm run &lt;script&gt;</code>：运行 <code>package.json</code> 中的脚本。</li></ul><p><strong>特点：</strong> NPM 是最早的 Node.js 包管理工具，拥有最大的包生态系统。它使用 <code>package-lock.json</code> 文件来锁定依赖的版本，以确保项目依赖的一致性。</p><h2 id="npx" tabindex="-1">NPX <a class="header-anchor" href="#npx" aria-label="Permalink to &quot;NPX&quot;">​</a></h2><p><strong>介绍：</strong> NPX 是 NPM 5.2+ 版本引入的一个工具，允许用户更方便地运行包中的命令行工具，无需全局安装。</p><p><strong>常用命令：</strong></p><ul><li><code>npx &lt;command&gt;</code>：执行一个命令。</li></ul><p><strong>特点：</strong> NPX 的出现使得在没有全局安装包的情况下，可以轻松地在命令行中运行任何 NPM 包中的命令。这在很大程度上简化了一些工具和脚本的使用，特别是在单次使用或测试时。</p><h2 id="yarn" tabindex="-1">Yarn <a class="header-anchor" href="#yarn" aria-label="Permalink to &quot;Yarn&quot;">​</a></h2><p><strong>介绍：</strong> Yarn 是由 Facebook 发起的另一种 Node.js 包管理工具，旨在提高包的安装速度并提供更可靠的依赖管理。</p><p><strong>常用命令：</strong></p><ul><li><code>yarn add &lt;package&gt;</code>：安装一个包。</li><li><code>yarn</code>：安装所有依赖。</li><li><code>yarn upgrade &lt;package&gt;</code>：更新一个包。</li><li><code>yarn remove &lt;package&gt;</code>：卸载一个包。</li><li><code>yarn run &lt;script&gt;</code>：运行 <code>package.json</code> 中的脚本。</li></ul><p><strong>特点：</strong> Yarn 在性能和稳定性方面对 NPM 进行了改进，使用 <code>yarn.lock</code> 文件来锁定依赖版本。Yarn 的另一个显著特点是它的离线模式，可以在没有互联网连接的情况下安装之前已经下载过的包。</p><h2 id="pnpm" tabindex="-1">PNPM <a class="header-anchor" href="#pnpm" aria-label="Permalink to &quot;PNPM&quot;">​</a></h2><p><strong>介绍：</strong> PNPM 是 Node.js 的另一种包管理工具，专注于性能和空间效率。它通过硬链接和符号链接来重用已存在的包版本，减少了存储空间的占用。</p><p><strong>常用命令：</strong></p><ul><li><code>pnpm add &lt;package&gt;</code>：安装一个包。</li><li><code>pnpm install</code>：安装所有依赖。</li><li><code>pnpm update &lt;package&gt;</code>：更新一个包。</li><li><code>pnpm remove &lt;package&gt;</code>：卸载一个包。</li><li><code>pnpm run &lt;script&gt;</code>：运行 <code>package.json</code> 中的脚本。</li></ul><p><strong>特点：</strong> PNPM 的主要特点是高效的存储方式，通过共享相同版本的包，大幅度减少了磁盘空间的使用。此外，它还提供了更严格的包依赖隔离，避免了依赖“污染”。</p><h2 id="区别" tabindex="-1">区别 <a class="header-anchor" href="#区别" aria-label="Permalink to &quot;区别&quot;">​</a></h2><ul><li><strong>性能和效率：</strong> Yarn 和 PNPM 都在这方面对 NPM 进行了优化，提供了更快的安装速度和更高的效率。</li><li><strong>依赖管理：</strong> NPM 和 Yarn 使用锁文件来确保依赖的一致性，而 PNPM 通过独特的存储机制达到相同目的。</li><li><strong>命令和用法：</strong> 尽管这些工具在命令上有所不同，但它们的基本用途（安装、更新、卸载包等）是相似的。</li></ul>',23),l=[r];function c(d,i,p,s,g,m){return a(),o("div",null,l)}const h=e(n,[["render",c]]);export{P as __pageData,h as default};
