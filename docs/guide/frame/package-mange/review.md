# 复习

## NPM (Node Package Manager)

**介绍：** NPM 是 Node.js 的包管理器，用于管理项目中的依赖。它允许用户安装、共享和管理依赖库。

**常用命令：**

- `npm install <package>`：安装一个包。
- `npm install`：根据 `package.json` 安装所有依赖。
- `npm update <package>`：更新一个包。
- `npm uninstall <package>`：卸载一个包。
- `npm run <script>`：运行 `package.json` 中的脚本。

**特点：** NPM 是最早的 Node.js 包管理工具，拥有最大的包生态系统。它使用 `package-lock.json` 文件来锁定依赖的版本，以确保项目依赖的一致性。

## NPX

**介绍：** NPX 是 NPM 5.2+ 版本引入的一个工具，允许用户更方便地运行包中的命令行工具，无需全局安装。

**常用命令：**

- `npx <command>`：执行一个命令。

**特点：** NPX 的出现使得在没有全局安装包的情况下，可以轻松地在命令行中运行任何 NPM 包中的命令。这在很大程度上简化了一些工具和脚本的使用，特别是在单次使用或测试时。

## Yarn

**介绍：** Yarn 是由 Facebook 发起的另一种 Node.js 包管理工具，旨在提高包的安装速度并提供更可靠的依赖管理。

**常用命令：**

- `yarn add <package>`：安装一个包。
- `yarn`：安装所有依赖。
- `yarn upgrade <package>`：更新一个包。
- `yarn remove <package>`：卸载一个包。
- `yarn run <script>`：运行 `package.json` 中的脚本。

**特点：** Yarn 在性能和稳定性方面对 NPM 进行了改进，使用 `yarn.lock` 文件来锁定依赖版本。Yarn 的另一个显著特点是它的离线模式，可以在没有互联网连接的情况下安装之前已经下载过的包。

## PNPM

**介绍：** PNPM 是 Node.js 的另一种包管理工具，专注于性能和空间效率。它通过硬链接和符号链接来重用已存在的包版本，减少了存储空间的占用。

**常用命令：**

- `pnpm add <package>`：安装一个包。
- `pnpm install`：安装所有依赖。
- `pnpm update <package>`：更新一个包。
- `pnpm remove <package>`：卸载一个包。
- `pnpm run <script>`：运行 `package.json` 中的脚本。

**特点：** PNPM 的主要特点是高效的存储方式，通过共享相同版本的包，大幅度减少了磁盘空间的使用。此外，它还提供了更严格的包依赖隔离，避免了依赖“污染”。

## 区别

- **性能和效率：** Yarn 和 PNPM 都在这方面对 NPM 进行了优化，提供了更快的安装速度和更高的效率。
- **依赖管理：** NPM 和 Yarn 使用锁文件来确保依赖的一致性，而 PNPM 通过独特的存储机制达到相同目的。
- **命令和用法：** 尽管这些工具在命令上有所不同，但它们的基本用途（安装、更新、卸载包等）是相似的。
