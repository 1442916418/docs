# JavaScript 复习

## JS中的8种数据类型及区别

包括值类型（基本对象类型）和引用类型（复杂对象类型）

**基本类型（值类型）：** Number（数字）、String（字符串）、Boolean（布尔）、Symbol（符号）、null（空）、undefined（未定义）在内存中占据固定大小，保存在栈内存中。

**引用类型（复杂数据类型）：** Object（对象）、Function（函数）。其他还包括Array（数组）、Date（日期）、RegExp（正则表达式）、以及特殊的基本包装类型（String、Number、Boolean）以及单体内置对象（Global、Math）等。引用类型的值是对象，保存在堆内存中，栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址。

**使用场景：**

- Symbol：使用Symbol作为对象属性名（key）。利用该特性，可以定义一些不需要对外操作和访问的属性。
- BigInt：由于在Number与BigInt之间进行转换会损失精度，因此建议仅在值可能大于2^53时使用BigInt类型，并且不在两种类型之间进行相互转换。

[JavaScript 数据类型之 Symbol、BigInt](https://juejin.cn/post/7000754813801775111)

## JS中的数据类型检测方案

- **typeof**

```JavaScript
console.log(typeof 1);               // "number"
console.log(typeof true);            // "boolean"
console.log(typeof 'mc');            // "string"
console.log(typeof Symbol());        // "symbol"
console.log(typeof function(){});    // "function"
console.log(typeof console.log());   // "function"
console.log(typeof []);              // "object"
console.log(typeof {});              // "object"
console.log(typeof null);            // "object"
console.log(typeof undefined);       // "undefined"
```

**优点：** 能够快速区分基本数据类型。

**缺点：** 不能将Object、Array和Null区分，都返回"object".

- **instanceof**

```JavaScript
console.log(1 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false  
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

**优点：** 能够区分Array、Object和Function，适合用于判断自定义的类实例对象。

**缺点：** Number，Boolean，String等基本数据类型不能判断。

- **Object.prototype.toString.call()**

```JavaScript
var toString = Object.prototype.toString;
console.log(toString.call(1));      // "[object Number]"
console.log(toString.call(true));   // "[object Boolean]"
console.log(toString.call('mc'));   // "[object String]"
console.log(toString.call([]));     // "[object Array]"
console.log(toString.call({}));     // "[object Object]"
console.log(toString.call(function(){})); // "[object Function]"
console.log(toString.call(undefined));  // "[object Undefined]"
console.log(toString.call(null)); // "[object Null]"
```

**优点：** 精准判断数据类型。

**缺点：** 写法繁琐不容易记，推荐进行封装后使用。

## instanceof 的作用

`instanceof` 用于判断一个引用类型是否属于某构造函数；还可以在继承关系中用来判断一个实例是否属于它的父类型。

## instanceof 和 typeof 的区别

`typeof` 在对值类型（number、string、boolean、null、undefined）以及引用类型的`function`的反应是精准的；但是，对于对象 `{}` 、数组 `[]` 、`null` 都会返回 "object"。

为了弥补这一点，`instanceof` 从原型的角度，来判断某引用属于哪个构造函数，从而判定它的数据类型。

## var && let && const

在ES6之前，创建变量使用的是 `var`，之后创建变量使用的是 `let` 或 `const`.

**三者区别**：

- `var` 定义的变量没有块的概念，可以跨块访问，但不能跨函数访问。
  - `let` 定义的变量只能在块作用域内访问，不能跨块访问，也不能跨函数访问。
  - `const` 用来定义常量，使用时必须初始化（即必须赋值），只能在块作用域内访问，且不能修改。
- `var` 允许在相同作用域内重复声明同一个变量，而 `let` 与 `const` 不允许这一现象。
- 在全局上下文中，基于 `let` 声明的全局变量和全局对象 `GO`（`window`）没有任何关系，而 `var` 声明的变量会与 `GO` 有映射关系。
- `let` 和 `const` 会产生暂时性死区。

> 暂时性死区是浏览器的 bug：检测一个未被声明的变量类型时，不会报错，会返回 undefined。
> 如：`console.log(typeof a)` // undefined
> 但：`console.log(typeof a)` // 未声明之前不能使用，`let a`。

`let`、`const`、`function` 会把当前所在的大括号（除函数之外）作为一个全新的块级上下文，应用这个机制，在开发项目的时候，遇到循环事件绑定等类似的需求，无需再自己构建闭包来存储，只要基于 `let` 的块作用特征即可解决。

## 作用域和作用域链

创建函数时，已经声明了当前函数的作用域，即**当前创建函数所处的上下文**。如果是在全局下创建的函数，它的作用域是 `[[scope]]: EC(G)`。函数执行时，会形成一个全新的私有上下文 `EC(FN)`，供函数内部代码执行。

**定义：** 简单来说，作用域就是变量与函数的可访问范围，由当前环境与上层环境的一系列变量对象组成。

1. **全局作用域**：全局作用域中的代码可以在程序的任何地方访问，且全局对象 `window` 的内置属性都拥有全局作用域。
2. **函数作用域**：函数作用域指的是代码只能在特定函数内访问。

**作用：** 作用域的主要用途是隔离变量，不同作用域下的同名变量不会发生冲突。

**作用域链：** 作用域链是变量查找的过程。通常情况下，变量在创建它的函数的作用域中查找。如果在当前作用域中找不到变量，就会向上级作用域继续查找，直到全局作用域。这个查找过程形成的链条称为作用域链。

## 闭包的两大作用：保存/保护

- **闭包的概念**

    当函数执行时，形成一个私有上下文 `EC(FN)`。通常情况下，函数执行完毕后，其上下文出栈并释放，但在特殊情况下，如果当前上下文中的某些部分被外部引用，那么上下文就不会出栈，从而形成一个不销毁的上下文。函数执行时形成一个新的私有上下文，该上下文可能会被释放，也可能不会被释放。无论是否释放，闭包的作用有两个方面：

    1. **保护**：闭包划分了一个独立的代码执行区域，在这个区域中，有自己的私有变量存储空间，可以保护自己的私有变量不受外界干扰，即在这个区域中，操作自己的私有变量与外界没有关系。

    2. **保存**：如果当前上下文不被释放（只要上下文中的某些东西被外部引用即可），则其中的私有变量也不会被释放，可以供其下级上下文调用和使用，相当于将一些值保存起来。

    我们把函数执行时形成的私有上下文，用来保护和保存私有变量的机制称为**闭包**。

- **闭包的特性**

    1. 内部函数可以访问外部函数的参数和变量，形成作用域链，将外部函数的变量值存储在内存中而不是在函数调用完毕后销毁。闭包充当了密闭的容器，存储数据的容器格式是键值对形式。

    2. 函数的嵌套，即函数内部包含函数。

    3. 闭包本质上将函数内部和外部连接起来，它可以读取外部函数的变量，确保这些变量的值在函数执行后仍然保持在内存中，不会被自动清除。

- **闭包形成的条件**

    1. 函数的嵌套。
    2. 内部函数引用了外部函数的局部变量，从而延长外部函数变量的生命周期。

- **闭包的用途**

    1. 模拟块级作用域。
    2. 保护外部函数的变量，防止外界干扰，使其在函数执行后继续存在。
    3. 封装私有化变量。
    4. 创建模块。

- **闭包的应用场景**

    闭包在前端 JavaScript 开发中广泛应用，例如事件驱动的回调函数、AJAX请求成功/失败的回调、`setTimeout` 的延时回调、函数内部返回匿名函数等。这些都是闭包的典型应用场景。

- **闭包的优点**

    延长局部变量的生命周期，提供了数据的隔离与保护。

- **闭包的缺点**

    可能导致函数的变量一直保存在内存中，过多的闭包可能会导致内存泄漏。因此，需要谨慎使用闭包，特别是在大型应用中，应注意释放不再需要的闭包。

## JS 中 this 的情况

1. **普通函数调用**：通过函数名()直接调用，`this`指向**全局对象window**（注意，使用`let`关键字定义的变量不会成为`window`对象的属性，所以 `this.a` 将为 `undefined`）。
2. **构造函数调用**：函数作为构造函数，使用`new`关键字调用时，`this`指向**新创建的对象**。
3. **对象方法调用**：通过对象.函数名()调用的，`this`指向**这个对象**。
4. **箭头函数调用**：箭头函数内部没有 `this`，所以`永远指向上层作用域`（上下文）。
5. **apply 和 call 调用**：函数体内 `this` 的指向是 `call/apply` 方法的**第一个参数**，若为空默认指向**全局对象window**。
6. **函数作为数组的一个元素，通过数组下标调用**：`this`指向**这个数组**。
7. **函数作为 window 内置函数的回调函数调用**：`this`指向**window**（例如，`setInterval`、`setTimeout`等）。

## call/apply/bind 的区别

### 相同点

1. 都是用来改变函数的 `this` 对象的指向。
2. 第一个参数都是指定函数的 `this` 对象。
3. 都可以利用后续参数传递额外的参数给函数。

### 不同点

- **apply 和 call** 传入的参数形式不同。`apply` 接收一个参数数组，而 `call` 接收一串参数列表。例如：

```js
fn.call(obj, 1, 2);
fn.apply(obj, [1, 2]);
```

- **bind** 语法和 `call` 一模一样，区别在于**是否立即执行**。`bind` 不会立即执行，而是返回一个函数，等待以后调用；而 `apply` 和 `call` 是立即执行。

总结：`apply`、`call` 和 `bind` 方法都用于改变函数内部的 `this` 指向。`apply` 接收参数的形式是数组，`call` 接收参数列表，而 `bind` 返回一个新函数，其 `this` 指向由传入的对象决定。需要注意的是，如果 `bind` 返回的函数被用于构造函数，`this` 的指向会被改变，但在其他情况下，`this` 不会改变。默认情况下，如果没有传递参数给 `apply` 或 `call`，它们会将 `this` 指向全局对象 `window`。

参考：[call、apply、bind 三者的用法和区别](https://blog.csdn.net/hexinyu_1022/article/details/82795517)

## 箭头函数的特性

1. **箭头函数没有自己的 `this`**，它会捕获所在上下文的 `this` 值，作为自己的 `this` 值。
2. **箭头函数没有 `constructor`**，因此不能作为构造函数，无法使用 `new` 关键字调用。
3. **没有 `new.target` 属性**，在使用 `new` 运算符初始化函数或构造方法时，`new.target` 返回一个指向构造方法或函数的引用。对于箭头函数，`new.target` 的值为 `undefined`。
4. **箭头函数不绑定 `Arguments` 对象**，它们使用 `rest` 参数（`...`）来获取函数的参数。因为箭头函数没有自己的 `this` 指针，所以在使用 `call()` 或 `apply()` 方法调用时，只能传递参数，不会绑定 `this`，并且它们的第一个参数会被忽略。这一特性对于 `bind` 方法同样成立。
5. 当使用 `call()` 或 `apply()` 方法调用箭头函数时，只能传入一个参数，对 `this` 没有影响。
6. **箭头函数没有原型属性**，因此 `Fn.prototype` 值为 `undefined`。
7. 箭头函数不能用作 `Generator` 函数，不能使用 `yield` 关键字。

参考：[箭头函数与普通函数的区别](https://www.cnblogs.com/biubiuxixiya/p/8610594.html)

## 原型和原型链

**原型关系：**

- 每个 `class` 都有显示原型 `prototype`。
- 每个实例都有隐式原型 `__proto__`。
- 实例的 `__proto__` 指向对应 `class` 的 `prototype`。

**原型：** 在 JavaScript 中，每当定义一个对象（函数也是对象）时，对象中都会包含一些预定义的属性。每个函数对象都有一个 `prototype` 属性，这个属性指向函数的原型对象。

**原型链：** 函数的原型链对象 `constructor` 默认指向函数本身，原型对象除了有原型属性外，为了实现继承，还有一个原型链指针 `__proto__`，该指针指向上一层的原型对象，而上一层的原型对象的结构依然类似。因此，可以利用 `__proto__` 一直指向 `Object` 的原型对象，而 `Object` 原型对象使用 `Object.prototype.__proto__ = null` 表示原型链顶端。这样形成了 JavaScript 的原型链继承。同时，所有的 JavaScript 对象都有 `Object` 的基本方法。

## `new` 运算符的实现机制

1. 首先创建一个新的空对象。
2. 设置原型，将对象的原型设置为函数的 `prototype` 对象。
3. 让函数的 `this` 指向这个对象，执行构造函数的代码，为这个新对象添加属性。
4. 判断函数的返回值类型，如果是值类型，返回创建的对象；如果是引用类型，返回这个引用类型的对象。

```JavaScript
function myNew(constructor, ...args) {
  // 1. 创建一个新的空对象
  const obj = Object.create(null);

  // 2. 设置原型，将对象的原型设置为构造函数的 prototype 属性
  obj.__proto__ = constructor.prototype;

  // 3. 让构造函数的 this 指向这个对象，执行构造函数的代码
  const result = constructor.apply(obj, args);

  // 4. 判断构造函数的返回值类型
  if (result && (typeof result === 'object' || typeof result === 'function')) {
    return result;
  }

  // 如果构造函数没有显式返回对象，则返回新创建的对象
  return obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`);
}

const john = myNew(Person, 'John', 30);

console.log(john.name); // Output: "John"
console.log(john.age);  // Output: 30
john.sayHello();       // Output: "Hello, my name is John and I'm 30 years old."
```

## Event Loop（事件循环）

JavaScript 是单线程的，为了防止一个函数执行时间过长阻塞后面的代码，事件循环（Event Loop）机制被引入。事件循环的运行机制如下：

1. 将同步代码放入执行栈中，依次执行。
2. 将异步代码推入异步队列，异步队列分为宏任务队列和微任务队列。宏任务队列的执行时间较长，所以微任务队列会优先于宏任务队列执行。
3. 微任务队列的代表包括 `Promise.then`、`MutationObserver` 等，而宏任务包括 `setTimeout`、`setInterval` 等。
4. 当主执行栈清空后，开始执行微任务队列，然后再执行宏任务队列，一个轮询结束后，继续下一个轮询。

在浏览器中，有两个主要线程，分别是 JS 引擎线程和渲染线程，它们互斥执行。Node.js 环境中只有 JS 线程，但处理方式与浏览器环境有些差异，包括不同的任务源和事件队列。

## 浏览器中的事件环（Event Loop）

浏览器中的事件环由浏览器的宿主环境实现。事件循环的步骤可以简要描述为：

1. 执行栈处理同步任务，将异步任务交给 Web APIs。
2. Web APIs 处理异步任务，并将任务的回调函数放入队列中（微任务和宏任务）。
3. 执行栈清空后，开始执行微任务队列。
4. 微任务队列清空后，执行宏任务队列中的任务。
5. 重复上述步骤，直至所有任务执行完毕。

## Node 环境中的事件环（Event Loop）

Node.js 是基于 V8 引擎的运行在服务端的 JavaScript 运行环境。与浏览器不同，Node.js 处理高并发和 I/O 密集操作，因此其事件环机制有所不同。Node.js 中事件环的执行顺序包括以下步骤：

1. 执行 `timers` 阶段，处理定时器回调函数。
2. 执行 `pending callbacks` 阶段，处理延迟到下一个循环迭代的 I/O 回调。
3. 执行 `idle, prepare` 阶段，通常由系统内部使用。
4. 执行 `poll` 阶段，检索新的 I/O 事件，执行与 I/O 相关的回调。
5. 执行 `check` 阶段，处理 `setImmediate` 回调。
6. 执行 `close callbacks` 阶段，处理 `close` 事件的回调函数。

## setTimeout、Promise、Async/Await 的区别

1. **setTimeout**：`setTimeout` 的回调函数被放入宏任务队列，等待执行栈清空后执行。

2. **Promise**：`Promise`

 本身是同步的立即执行函数。当在 `executor` 中执行 `resolve` 或 `reject` 时，这是异步操作，会先执行 `then` 或 `catch`，然后等待执行栈清空后才执行 `resolve` 或 `reject` 中存放的函数。

3. **Async/Await**：`async` 函数返回一个 `Promise` 对象，函数内部的代码在遇到 `await` 时会暂停执行，等待异步操作完成。`await` 使函数让出线程，从新的事件循环开始执行，当异步操作完成后，恢复函数的执行。

## Async/Await 如何通过同步的方式实现异步

`Async/Await` 是 `Generator` 函数的自执行版本。它使得将异步代码以同步的方式编写成代码块变得更容易，内部使用 `Promise` 实现异步操作。`Async/Await` 允许在代码中使用 `await` 关键字来等待异步操作的完成，从而实现在异步操作完成后再继续执行后续代码。

## 介绍节流和防抖原理、区别以及应用

**节流 (Throttle)**：事件触发后，在规定时间内，事件处理函数不能再次被调用。只能在规定时间内执行一次，最早触发调用的那次。

```JavaScript
function throttle(func, delay) {
  let lastCall = 0;

  return function (...args) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      func.apply(this, args);
      lastCall = now;
    }
  };
}

// 创建一个节流函数，限制每200毫秒调用一次
const throttledFn = throttle(function () {
  console.log('Throttled function called.');
}, 200);

// 模拟连续触发事件
setInterval(throttledFn, 50);
```

**防抖 (Debounce)**：多次触发事件，但事件处理函数只能在最后一次触发后执行。会等待一定的时间，如果在此时间内再次触发，就会重新计时，直到最后一次触发事件才执行。

```JavaScript
function debounce(func, delay) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = null;
    }, delay);
  };
}

// 创建一个防抖函数，等待500毫秒后执行
const debouncedFn = debounce(function () {
  console.log('Debounced function called.');
}, 500);

// 模拟连续触发事件
for (let i = 0; i < 5; i++) {
  setTimeout(debouncedFn, i * 100);
}
```

**应用场景**：

- 节流：滚动加载更多、搜索框联想搜索、高频点击、防止表单重复提交等。
- 防抖：搜索框搜索自动联想、手机号和邮箱验证、窗口大小变化重新渲染等。

以上的 JavaScript 概念和知识非常重要，帮助理解 JavaScript 中的异步机制以及事件处理。希望这些修订对您有所帮助。
