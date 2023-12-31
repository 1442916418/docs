# 记录

## 面试

### 自我介绍

> 有条理、有逻辑性、无废话、3分钟左右

示例：

```txt
我在面试中遇到一个女生在自我介绍的时候，她先简要介绍了一下自己常用的技术栈以及对应技术栈的熟悉程度，然后介绍了她上家公司做的项目，分模块的介绍一下自己在这些模块中做的事情以及两个业务线之间的关系。
```

### 当面试官问你一个很大的问题的时候，你要怎么回答？

> 公式

```txt
1、解释是什么的问题。
2、解释这个技术的应用点、应用场景在哪里。
3、整理一下这个问题的优缺点是什么。
```

示例：**讲一下闭包？**

```txt
1. 闭包是：能够访问其他函数内部变量的函数。
2. 闭包一般会在：封装模块的时候，通过函数自执行函数的方式进行实现；或者在模仿块级作用域的时候实现；如：我们常用的库jQuery本身就是一个大的闭包。
3. 闭包的优点是：
    a、能够在离开函数之后继续访问该函数的变量，变量一直保存在内存中。
    b、闭包中的变量是私有的，只有闭包函数才有权限访问它。不会被外面的变量和方法给污染。
闭包的缺点是：
    a、会增加对内存的使用量，影响性能。
    b、不正确的使用闭包会造成内存泄漏。
```

### 反向面试

> [参考](https://github.com/yifeikong/reverse-interview-zh)
