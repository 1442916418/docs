# JavaScript 复习

## JS中的8种数据类型及区别

包括值类型（基本对象类型）和引用类型（复杂对象类型）

**基本类型（值类型）：** Number（数字）、String（字符串）、Boolean（布尔）、Symbol（符号）、null（空）、undefined（未定义）、BigInt（大整数）在内存中占据固定大小，保存在栈内存中。

**引用类型（复杂数据类型）：** Object（对象）。其他还包括Function（函数）、Array（数组）、Date（日期）、RegExp（正则表达式）、以及特殊的基本包装类型（String、Number、Boolean）以及单体内置对象（Global、Math）等。引用类型的值是对象，保存在堆内存中，栈内存存储的是对象的变量标识符以及对象在堆内存中的存储地址。

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

### instanceof 的作用

`instanceof` 用于判断一个引用类型是否属于某构造函数；还可以在继承关系中用来判断一个实例是否属于它的父类型。

### instanceof 和 typeof 的区别

`typeof` 在对值类型（number、string、boolean、null、undefined）以及引用类型的`function`的反应是精准的；但是，对于对象 `{}` 、数组 `[]` 、`null` 都会返回 "object"。

为了弥补这一点，`instanceof` 从原型的角度，来判断某引用属于哪个构造函数，从而判定它的数据类型。

## `var`、`let` 和 `const` 的区别

在 ECMAScript 6 (ES6) 之前，创建变量主要使用的是 `var`。而在 ES6 及之后，我们可以使用 `let` 或 `const` 来创建变量。

### 三者的主要区别

1. **var**:
   - 定义的变量没有块级作用域的概念，可以在块内外访问，但不能跨函数访问。
   - 允许在相同作用域内重复声明同一个变量。
   - 在全局上下文中声明的变量会成为全局对象（如在浏览器中的 `window`）的属性。

   ```javascript
   if (true) {
      var x = 10;
   }
   console.log(x); // 输出：10
   ```

2. **let**:
   - 仅在块作用域内有效，不能跨块或跨函数访问。
   - 不允许在相同作用域内重复声明同一个变量。
   - 在全局上下文中声明的变量不会成为全局对象的属性。
   - 存在“暂时性死区”现象。

   ```javascript
   if (true) {
      let y = 20;
   }
   console.log(y); // 报错：y is not defined
   ```

3. **const**:
   - 定义时必须初始化（即必须赋值）。
   - 仅在块作用域内有效，且声明后其值不能修改。
   - 不允许在相同作用域内重复声明同一个变量。
   - 在全局上下文中声明的变量不会成为全局对象的属性。
   - 存在“暂时性死区”现象。

   ```javascript
   const z = 30;
   z = 40; // 报错：Assignment to constant variable.
   ```

#### 暂时性死区（Temporal Dead Zone, TDZ）

与“浏览器的 bug”无关，暂时性死区是指在变量声明前其存在是不可访问的。也就是说，在代码块内，从块的起始位置到 `let` 和 `const` 语句之前的区域，这些变量都是不可访问的。

```javascript
console.log(a); // 会报错：Cannot access 'a' before initialization
let a = 10;
```

#### 闭包与块作用域

在 ES6 之前，解决循环中的事件绑定等问题通常需要构造闭包。但在 ES6 中，由于 `let` 和 `const` 的块级作用域特性，无需额外构建闭包，直接使用这两个关键字即可解决很多这类问题。

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, 100);
}
// 输出：0 1 2 3 4
```

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

## setTimeout、Promise、Async/Await 的区别

1. **setTimeout**：`setTimeout` 的回调函数被放入宏任务队列，等待执行栈清空后执行。

2. **Promise**：`Promise`

 本身是同步的立即执行函数。当在 `executor` 中执行 `resolve` 或 `reject` 时，这是异步操作，会先执行 `then` 或 `catch`，然后等待执行栈清空后才执行 `resolve` 或 `reject` 中存放的函数。

3. **Async/Await**：`async` 函数返回一个 `Promise` 对象，函数内部的代码在遇到 `await` 时会暂停执行，等待异步操作完成。`await` 使函数让出线程，从新的事件循环开始执行，当异步操作完成后，恢复函数的执行。

## Async/Await 如何通过同步的方式实现异步

`Async/Await` 是 `Generator` 函数的自执行版本。它使得将异步代码以同步的方式编写成代码块变得更容易，内部使用 `Promise` 实现异步操作。`Async/Await` 允许在代码中使用 `await` 关键字来等待异步操作的完成，从而实现在异步操作完成后再继续执行后续代码。

## 介绍节流和防抖原理、区别以及应用

**节流 (Throttle)**：事件触发后，在规定时间内，事件处理函数不能再次被调用。只能在规定时间内执行一次，最早触发调用的那次。
**代码实现重在开锁关锁** lastCall = now; lastCall = 0。节流可以比作过红绿灯，每等一个红灯时间就可以过一批。

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
**代码实现重在清零** clearTimeout。防抖可以比作等电梯，只要有一个人进来，就需要再等一会儿。业务场景有避免登录按钮多次点击的重复提交。

```JavaScript
function debounce(func, delay) {
  let timeoutId = 0;

  return function (...args) {
    timeoutId && clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
      timeoutId = 0;
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

## 处理浮点数精度问题

处理浮点数精度问题的一种常见方法是将需要计算的数字升级（乘以 10 的 n 次幂）成计算机能够精确识别的整数，等计算完成后再进行降级（除以 10 的 n 次幂）。具体操作如下：

```javascript
(0.1 * 10 + 0.2 * 10) / 10 == 0.3 // true
```

```javascript
function calculate(op, arg1, arg2) {
  function getDigits(num) {
    let digits;
    try {
      digits = num.toString().split('.')[1].length || 0;
    } catch {
      digits = 0;
    }
    
    return digits;
  }

  function mul(m1, m2) {
    let digits = 0;
    const s1 = m1.toString();
    const s2 = m2.toString();
    try {
      digits += s1.split('.')[1].length;
    } catch {}
    try {
      digits += s2.split('.')[1].length;
    } catch {}

    return (Number(s1.replace(/\./, '')) * Number(s2.replace(/\./, ''))) / 10 ** digits;
  }

  let digits1 = getDigits(arg1);
  let digits2 = getDigits(arg2);
  let maxDigits = 10 ** Math.max(digits1, digits2);

  switch (op) {
    case "add":
      return (mul(arg1, maxDigits) + mul(arg2, maxDigits)) / maxDigits;
    case "sub":
      return (mul(arg1, maxDigits) - mul(arg2, maxDigits)) / maxDigits;
    case "mul":
      return mul(arg1, arg2);
    case "div":
      let int1 = Number(arg1.toString().replace(/\./, ''));
      let int2 = Number(arg2.toString().replace(/\./, ''));
      return ((int1 / int2) * 10) ** (digits2 - digits1 || 1);
    default:
      throw new Error("Invalid operation specified.");
  }
}

// 示例
console.log(calculate("add", 1.2, 2.3));  // 3.5
console.log(calculate("sub", 1.2, 0.2));  // 1
console.log(calculate("mul", 1.2, 2.3));  // 2.76
console.log(calculate("div", 1.2, 2));    // 0.6
```

推荐库 [`bignumber.js`](https://mikemcl.github.io/bignumber.js/)、[`decimal.js`](http://mikemcl.github.io/decimal.js/)、以及 [`big.js`](http://mikemcl.github.io/big.js/) 等，这些库不仅解决了浮点数的运算精度问题，还支持了大数运算，并且修复了原生 toFixed 结果不准确的问题。我们可以根据自己的需求来选择对应的工具。

## 数组的常用方法

- **改变原数组的方法**

  - **splice() 添加/删除数组元素**

    ```javascript
    arrayObject.splice(index, howmany, item1, ..., itemX)
    ```

    - 参数:
      1. `index`：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
      2. `howmany`：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
      3. `item1, ..., itemX`： 可选。向数组添加的新项目。
    - 返回值: 如果有元素被删除,返回包含被删除项目的新数组.

  - **sort() 数组排序**

    ```javascript
    arrayObject.sort(sortby)
    ```

    - 参数:
      1. `sortby`：可选。规定排序顺序。必须是函数。
    - 返回值: 返回包排序后的新数组.

  - **pop() 删除一个数组中的最后的一个元素**

    ```javascript
    arrayObject.pop()
    ```

    - 参数: 无
    - 返回值: 返回被删除的元素.

  - **shift() 删除数组的第一个元素**

    ```javascript
    arrayObject.shift()
    ```

    - 参数: 无
    - 返回值: 返回被删除的元素.

  - **push() 向数组的末尾添加元素**

    ```javascript
    arrayObject.push(newelement1, newelement2, ..., newelementX)
    ```

    - 参数:
      1. `newelement1`：必需。要添加到数组的第一个元素。
      2. `newelement2`：可选。要添加到数组的第二个元素。
      3. `newelementX`：可选。可添加若干个元素.
    - 返回值: `arrayObject` 的新长度.

  - **unshift() 向数组的开头添加一个或更多元素**

    ```javascript
    arrayObject.unshift(newelement1, newelement2, ..., newelementX)
    ```

    - 参数:
      1. `newelement1`：必需。要添加到数组的第一个元素。
      2. `newelement2`：可选。要添加到数组的第二个元素。
      3. `newelementX`：可选。可添加若干个元素.
    - 返回值: `arrayObject` 的新长度.

  - **reverse() 颠倒数组中元素的顺序**

    ```javascript
    arrayObject.reverse()
    ```

    - 参数: 无
    - 返回值: 颠倒后的新数组.

  - **copyWithin() 指定位置的成员复制到其他位置**

    ```javascript
    array.copyWithin(target, start = 0, end = this.length)
    ```

    - 参数:
      1. `target`（必需）：从该位置开始替换数据。如果为负值，表示倒数。
      2. `start`（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
      3. `end`（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示倒数.
    - 返回值: 返回当前数组.

  - **fill() 填充数组**

    ```javascript
    array.fill(value, start, end)
    ```

    - 参数:
      1. `value`：必需。填充的值.
      2. `start`：可选。开始填充位置.
      3. `end`：可选。停止填充位置 (默认为 `array.length`)
    - 返回值: 返回当前数组.

- **不改变原数组的方法**

  - **slice() 浅拷贝数组的元素**

    ```javascript
    array.slice(begin, end);
    ```

    - 参数:
      1. `begin`（可选）: 索引数值，接受负值，从该索引处开始提取原数组中的元素，默认值为 0。
      2. `end`（可选）: 索引数值 (不包括)，接受负值，在该索引处前结束提取原数组元素，默认值为数组末尾 (包括最后一个元素).
    - 返回值: 返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改.

  - **join() 数组转字符串**

    ```javascript
    array.join(str)
    ```

    - 参数:
      1. `str`（可选）: 指定要使用的分隔符，默认使用逗号作为分隔符.
    - 返回值: 返回生成的字符串.

  - **concat() 合并两个或多个数组**

    ```javascript
    var newArr = oldArray.concat(arrayX, arrayX, ..., arrayX)
    ```

    - 参数:
      1. `arrayX`（必须）：该参数可以是具体的值，也可以是数组对象。可以是任意多个.
    - 返回值: 返回合并后的新数组.

  - **indexOf() 查找数组是否存在某个元素**

    ```javascript
    array.indexOf(searchElement, fromIndex)
    ```

    - 参数:
      1. `searchElement`（必须）: 被查找的元素.
      2. `fromIndex`（可选）: 开始查找的位置 (不能大于等于数组的长度，返回 -1)，接受负值，默认值为 0.
    - 返回值: 返回下标.

  - **lastIndexOf() 查找指定元素在数组中的最后一个位置**

    ```javascript
    arr.lastIndexOf(searchElement, fromIndex)
    ```

    - 参数:
      1. `searchElement`（必须）: 被查找的元素.
      2. `fromIndex`（可选）: 逆向查找开始位置，默认值数组的长度 - 1，即查找整个数组.
    - 返回值: 方法返回指定元素在数组中的最后一个的索引，如果不存在则返回 -1 (从数组后面往前查找).

  - **includes() 查找数组是否包含某个元素**

    ```javascript
    array.includes(searchElement, fromIndex = 0)
    ```

    - 参数:
      1. `searchElement`（必须）: 被查找的元素.
      2. `fromIndex`（可选）: 默认值为 0，参数表示搜索的起始位置，接受负值。正值超过数组长度，数组不会被搜索，返回 `false`。负值绝对值超过长数组度，重置从 0 开始搜索.  
    - 返回值: 返回布尔.

## 立即执行函数 (IIFE)

立即执行函数（Immediately Invoked Function Expression，缩写 IIFE）是一种常见的 JavaScript 设计模式，用于声明一个匿名函数并立即调用该函数。其目的是保护内部变量不受外部作用域的污染。

以下是不同方式的立即执行函数的示例：

```javascript
// 匿名函数的自执行的第一种写法
(function(n1, n2) {
    console.log("这是匿名函数的自执行的第一种写法，结果为:" + (n1 + n2));
})(10, 100);

// 函数声明方式的自执行的第一种写法
(function start(n1, n2) {
    console.log("这是函数声明方式的自执行的第一种写法，结果为:" + (n1 + n2));
})(10, 100);

// 匿名函数的自执行的第二种写法
(function(n1, n2) {
    console.log("这是匿名函数的自执行的第二种写法，结果为：" + (n1 + n2));
}(10, 100));

// 函数声明方式的自执行的第二种写法
(function start(n1, n2) {
    console.log("这是函数声明方式的自执行的第二种写法，结果为：" + (n1 + n2));
}(10, 100));
```

这些立即执行函数的写法可用于创建一个独立的作用域，防止变量泄漏到全局作用域，提高代码的封装性和安全性。

## 跨域

跨域问题需要基于浏览器的同源策略来理解，同源策略要求请求必须满足相同的协议、域名和端口，否则不同源的客户端脚本在没有明确授权的情况下无法访问对方资源。

浏览器同源策略的限制导致不同源的脚本不能直接操作其他源下的对象。要实现不同源之间的数据交互，需要采用一些跨域技术，常见的跨域解决方案包括：

- JSONP（JSON with Padding）
- 使用 iframe
- 跨域资源共享（CORS，Cross-Origin Resource Sharing）
- 使用服务器代理（例如 Nginx 代理）

这些方法允许在不同源之间进行数据交互，但要注意确保安全性和合法性，以免被滥用。

## 如何阻止事件冒泡？

事件冒泡是指事件在DOM树中按从最具体的目标（例如一个按钮）到最不具体的目标（通常是 `document`）的顺序触发。要阻止事件冒泡，可以使用以下方法：

- 使用 `e.stopPropagation()` 方法，这是符合 W3C 标准的做法。
- 对于旧版 IE，可以使用 `e.cancelBubble = true` 来取消事件冒泡。

以下是一个示例：

```javascript
// 阻止事件冒泡
function stopBubble(e) {
  // 如果提供了事件对象，并且支持W3C的stopPropagation()方法
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else {
    // 否则，使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
  }
}
```

通过调用 `stopBubble` 函数，可以在事件处理程序中阻止事件继续向上冒泡。

## 如何阻止默认事件？

要阻止事件的默认行为，可以采用以下方法：

- 对于符合 W3C 标准的浏览器，可以使用 `e.preventDefault()` 方法。
- 对于旧版 IE 浏览器，可以使用 `e.returnValue = false`。

以下是一个示例：

```javascript
// 阻止浏览器的默认行为
function stopDefault(e) {
  // 阻止默认浏览器动作（W3C标准）
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    // IE中阻止默认动作的方式
    window.event.returnValue = false;
  }
  return false;
}
```

通过调用 `stopDefault` 函数，可以在事件处理程序中阻止事件的默认行为，例如阻止链接的跳转或表单的提交。

## 什么是事件传播?

事件传播指的是事件在DOM结构中传递或传播的过程。当事件发生在DOM元素上时，事件并不仅仅发生在该元素上，它会在DOM树中传播到其他元素，包括该元素的祖先和后代。事件传播分为三个阶段：

1. **捕获阶段（Capture Phase）**：事件从`window`对象开始传播，依次向下传播至目标元素。这一阶段用于捕获事件传播过程中的一些操作。

2. **目标阶段（Target Phase）**：事件到达目标元素，也就是事件的触发元素。

3. **冒泡阶段（Bubble Phase）**：事件从目标元素开始冒泡，依次向上冒泡至`window`对象。这一阶段常用于事件处理和委托。

事件传播机制让开发者可以在不同阶段捕获或处理事件，使得事件处理更加灵活和强大。

## 什么是事件冒泡？

事件冒泡是事件传播的一种方式，其中事件从目标元素开始，然后向上冒泡至`window`对象。事件冒泡的过程中，父元素会依次接收到事件，直到根元素`window`。

在事件冒泡中，事件的目标元素是首先接收到事件的元素。接着，事件会冒泡到该元素的父元素，然后冒泡到更高层次的父元素，一直到根元素。如果在事件的冒泡过程中有元素绑定了相应事件的处理函数，这些处理函数将按照从目标元素到根元素的顺序被触发。

事件冒泡是DOM事件传播机制的一部分，可以通过JavaScript代码监听并处理事件的冒泡阶段。在事件处理中，你可以使用`event.target`属性来获取事件的目标元素，以及`event.currentTarget`来获取当前正在处理事件的元素。

## 什么是事件捕获？

事件捕获是事件传播的另一种方式，其中事件从`window`对象开始，然后向下捕获至目标元素。事件捕获的过程中，根元素会首先接收到事件，然后逐级传递至目标元素。

在事件捕获中，事件首先被根元素捕获，然后被传递给更低层次的元素，直到达到事件的目标元素。如果在事件的捕获过程中有元素绑定了相应事件的处理函数，这些处理函数将按照从根元素到目标元素的顺序被触发。

事件捕获是DOM事件传播机制的另一部分，同样可以通过JavaScript代码监听并处理事件的捕获阶段。在事件处理中，你可以使用`event.target`属性来获取事件的目标元素，以及`event.currentTarget`来获取当前正在处理事件的元素。

## event.preventDefault() 和 event.stopPropagation() 方法之间有什么区别?

`event.preventDefault()` 和 `event.stopPropagation()` 是两个不同的事件处理方法，用于不同的目的：

- `event.preventDefault()`: 这个方法用于阻止元素的默认行为。例如，在表单元素中使用它可以阻止表单的提交，而在锚元素中使用它可以阻止链接的导航。它通常用于取消事件的默认操作，以便在事件处理中执行自定义逻辑。

- `event.stopPropagation()`: 这个方法用于阻止事件在捕获和冒泡阶段中继续传播。它不影响元素的默认行为，而是阻止事件冒泡至父元素或子元素。这在事件委托和避免事件冒泡到不需要处理的元素时非常有用。

这两个方法的作用不同，根据需要在事件处理中选择使用它们。

## 如何知道是否在元素中使用了 `event.preventDefault()` 方法？

你可以通过事件对象的 `event.defaultPrevented` 属性来判断是否在事件的处理中使用了 `event.preventDefault()` 方法。如果事件处理中调用了 `event.preventDefault()`，`event.defaultPrevented` 的值将为 `true`，否则为 `false`。

例如：

```javascript
element.addEventListener('click', function(event) {
  if (event.defaultPrevented) {
    console.log('event.preventDefault() was called in this event handler.');
  } else {
    console.log('event.preventDefault() was not called in this event handler.');
  }
});
```

通过检查 `event.defaultPrevented` 属性，你可以确定是否在事件处理中阻止了默认行为。这对于在事件处理中执行条件操作非常有用。

## 为什么在 JS 中比较两个相似的对象时返回 false？

在 JavaScript 中，对象比较的方式与基本数据类型（如字符串、数字、布尔等）不同。JavaScript 对基本数据类型进行值比较，而对对象进行引用比较。这就是为什么在某些情况下，比较两个相似的对象会返回 `false` 的原因。具体原因在于对象的比较是比较它们在内存中的引用地址，而不是它们的内容。

例如，考虑以下代码：

```javascript
let a = { a: 1 };
let b = { a: 1 };
let c = a;

console.log(a === b); // false，尽管它们有相同的属性
console.log(a === c); // true
```

在这个例子中，`a` 和 `b` 是两个不同的对象，尽管它们有相同的属性。当你使用 `===` 运算符比较它们时，它会检查它们是否引用相同的内存地址，因此第一个比较返回 `false`。但 `a` 和 `c` 实际上引用了相同的对象，所以第二个比较返回 `true`。

如果你需要比较两个对象的内容而不是引用地址，你需要编写自定义的比较函数，以便逐一比较它们的属性。这通常涉及遍历对象的属性并逐一比较它们，以确定它们是否相等。

## !! 运算符能做什么？

`!!` 运算符（双感叹号运算符）可以将其右侧的值强制转换为布尔值，并且是将值转换为布尔值的一种简单方法。它的作用是将表达式的结果转换为对应的布尔值，以便进行逻辑运算。

下面是一些示例：

```javascript
console.log(!!null);         // false
console.log(!!undefined);    // false
console.log(!!'');           // false
console.log(!!0);            // false
console.log(!!NaN);          // false
console.log(!!' ');          // true
console.log(!!{});           // true
console.log(!![]);           // true
console.log(!!1);            // true
console.log(!![].length);    // false
```

在这些示例中，`!!` 运算符将不同的值转换为相应的布尔值。空字符串、数字 0、NaN、null、undefined 等被转换为 `false`，而非空字符串、对象、数组、数字 1 等被转换为 `true`。

## 如何在一行中计算多个表达式的值？

可以使用逗号运算符 `,` 在一行中计算多个表达式的值。逗号运算符按从左到右的顺序求值这些表达式，并返回最后一个表达式的值。

例如：

```javascript
let x = 5;
x = (x++, x = addFive(x), x *= 2, x -= 5, x += 10);

function addFive(num) {
  return num + 5;
}
```

在这个示例中，逗号运算符用于在一行中执行多个操作。首先，`x++` 将 `x` 的值增加 1，然后 `x = addFive(x)` 调用函数 `addFive` 并将 `x` 的值传递给它，接着 `x *= 2` 将 `x` 的值翻倍，然后 `x -= 5` 和 `x += 10` 分别减去 5 和加上 10。最终，`x` 的值被更新为这一系列操作的结果。逗号运算符可以帮助你在一行中紧凑地执行多个表达式。

## arguments 的对象是什么？

arguments对象是函数中传递的参数值的集合。它是一个类似数组的对象，因为它有一个length属性，我们可以使用数组索引表示法 `arguments[1]` 来访问单个值，但它没有数组中的内置方法，如 `forEach`、`reduce`、`filter` 和 `map`。

## 如何创建一个没有 prototype(原型)的对象？

我们可以使用 `Object.create` 方法创建没有原型的对象:

```javascript
const o1 = {};
console.log(o1.toString()); // [object Object]

const o2 = Object.create(null);
console.log(o2.toString());
// throws an error o2.toString is not a function
```

在上述代码中，`o1` 具有默认的原型对象，而 `o2` 通过 `Object.create(null)` 创建，因此它没有原型。当尝试调用 `toString` 方法时，`o1` 调用了默认原型对象的 `toString` 方法，而 `o2` 报错，因为它没有原型链上的 `toString` 方法。

## 展开(spread )运算符和 剩余(Rest) 运算符有什么区别

展开运算符（spread）是三个点(...)，可以将一个数组转为用逗号分隔的参数序列。说的通俗易懂点，有点像化骨绵掌，把一个大元素给打散成一个个单独的小元素。

剩余运算符也是用三个点(...)表示，它的样子看起来和展开操作符一样，但是它是用于解构数组和对象。在某种程度上，剩余元素和展开元素相反，展开元素会“展开”数组变成多个元素，剩余元素会收集多个元素和“压缩”成一个单一的元素。

**使用展开运算符的示例：**

```javascript
function add(a, b) {
  return a + b;
};

const nums = [5, 6];
const sum = add(...nums);
console.log(sum); // 11
```

**使用剩余运算符的示例：**

```javascript
const [first, ...others] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(others); // [2,3,4,5]
```

剩余操作符提取所有剩余的数组值，并将它们放入除第一项之外的其他数组中。

## 隐式和显式转换有什么区别

- **隐式强制转换**是一种将值转换为另一种类型的方法，这个过程是自动完成的，无需我们手动操作。例如:

```javascript
console.log(1 + '6'); // 16
console.log(false + true); // 1
console.log(6 * '2'); // 12
```

第一个示例中，1被转换成字符串，然后与 `'6'` 连接。这是由JavaScript自动完成的，无需手动干预。

- **显式强制转换**是将值转换为另一种类型的方法，需要我们手动进行操作。例如:

```javascript
console.log(1 + parseInt('6'));
```

在此示例中，我们使用 `parseInt` 函数将 `'6'` 显式转换为数字，然后与 `1` 相加。

## 什么是NaN？ 以及如何检查值是否为NaN？

**NaN** 表示**“非数字”**，是JavaScript中的一个特殊值，通常是将数字转换或执行为非数字值的运算结果，因此结果为NaN。

```javascript
console.log(parseInt('abc')); // NaN
console.log(parseInt(null)); // NaN
console.log(parseInt(undefined)); // NaN
```

JavaScript内置了一个 `isNaN` 方法，用于测试值是否为NaN，但这个函数有一些奇怪的行为，例如:

```javascript
console.log(isNaN()); // true
console.log(isNaN(undefined)); // true
console.log(isNaN({})); // true
```

所有这些示例中，`isNaN` 返回 `true`，即使传递的值不是NaN。在ES6中，建议使用 `Number.isNaN` 方法，因为它确实会检查值是否为NaN。另外，您还可以使用自定义的辅助函数来检查NaN，因为在JavaScript中，NaN是唯一一个不等于自身的值:

```javascript
function checkIfNaN(value) {
  return value !== value;
}
```

## 如何判断值是否为数组？

我们可以使用 `Array.isArray` 方法来检查值是否为数组。 当传递给它的参数是数组时，它返回 `true`，否则返回 `false`。

```javascript
console.log(Array.isArray(5));  // false
console.log(Array.isArray("")); // false
console.log(Array.isArray()); // false
console.log(Array.isArray(null)); // false
console.log(Array.isArray({ length: 5 })); // false

console.log(Array.isArray([])); // true
```

如果环境不支持此方法，可以使用polyfill来实现：

```javascript
function isArray(value){
 return Object.prototype.toString.call(value) === "[object Array]"
}

Object.prototype.toString.call([]).slice(8,-1)
```

或者使用传统的方法：

```javascript
let a = []
if (a instanceof Array) {
  console.log('是数组')
} else {
  console.log('非数组')
}
```

## 如何在不使用%模运算符的情况下检查一个数字是否是偶数？

可以使用按位&运算符来检查一个数字是否是偶数，&对其操作数进行运算，并将其视为二进制值，然后执行与运算。

```javascript
function isEven(num) {
  if (num & 1) {
    return false;
  } else {
    return true;
  }
}
```

0 的二进制表示是 000，1 的二进制表示是 001，2 的二进制表示是 010，3 的二进制表示是 011，4 的二进制表示是 100，5 的二进制表示是 101，6 的二进制表示是 110，7 的二进制表示是 111。

执行 `console.log(5 & 1)` 这个表达式时，结果为1。首先，&运算符将两个数字都转换为二进制，所以5变为101，1变为001。然后，它使用按位与运算符比较每个位（0和1）。 101 & 001 结果为1。

首先我们比较最左边的1 & 0，结果是0。
然后我们比较中间的0 & 0，结果是0。
然后我们比较最后1 & 1，结果是1。
最后，得到一个二进制数001，对应的十进制数，即1。

知道4的最后一位是0，而0 & 1 将是0。如果你很难理解这一点，我们可以使用递归函数来解决此问题。

```javascript
function isEven(num) {
  if (num < 0 || num === 1) return false;
  if (num == 0) return true;
  return isEven(num - 2);
}
```

## 如何检查对象中是否存在某个属性？

你可以使用以下方法来检查对象中是否存在某个属性：

- 使用 `in` 操作符

```javascript
const o = { 
  "prop" : "b",
  "prop2" : "c"
};

console.log("prop" in o); // true
console.log("prop1" in o); // false
```

- 使用 `hasOwnProperty` 方法，`hasOwnProperty()` 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

```javascript
console.log(o.hasOwnProperty("prop2")); // true
console.log(o.hasOwnProperty("prop1")); // false
```

- 使用括号符号 `obj["prop"]`。如果属性存在，它将返回该属性的值，否则将返回 `undefined`。

```javascript
console.log(o["prop"]); // "b"
console.log(o["prop1"]); // undefined
```

## Object.seal 和 Object.freeze 方法之间有什么区别

- **Object.freeze()**
  - Object.freeze() 方法可以冻结一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。freeze() 返回和传入的参数相同的对象。

- **Object.seal()**
  - Object.seal() 方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置。当前属性的值只要可写就可以改变。

- **相同点**
  - ES5新增。
  - 对象不可能扩展，也就是不能再添加新的属性或者方法。
  - 对象已有属性不允许被删除。
  - 对象属性特性不可以重新配置。

- **不同点**
  - `Object.seal` 方法生成的密封对象，如果属性是可写的，那么可以修改属性值。
  - `Object.freeze` 方法生成的冻结对象，属性都是不可写的，也就是属性值无法更改。

## in 运算符和 Object.hasOwnProperty 方法有什么区别

- **hasOwnProperty方法**
  - `hasOwnProperty()` 方法返回值是一个布尔值，指示对象自身属性中是否具有指定的属性，因此这个方法会忽略掉那些从原型链上继承到的属性。

  ```javascript
  Object.prototype.phone = '15345025546';

  let obj = {
    name: '前端精神小伙',
    age: '28'
  }

  console.log(obj.hasOwnProperty('phone')) // false
  console.log(obj.hasOwnProperty('name')) // true
  ```

  可以看到，如果在函数原型上定义一个变量 `phone`，`hasOwnProperty` 方法会直接忽略掉。

- **in 运算符**
  - 如果指定的属性在指定的对象或其原型链中，则 `in` 运算符返回 `true`。

  ```javascript
  console.log('phone' in obj) // true
  ```

  可以看到 `in` 运算符会检查它或者其原型链是否包含具有指定名称的属性。

## 函数表达式和函数声明之间有什么区别

```javascript
hoistedFunc();
notHoistedFunc();

function hoistedFunc(){
  console.log("注意：我会被提升");
}

var notHoistedFunc = function(){
  console.log("注意：我没有被提升");
}
```

- `notHoistedFunc` 调用抛出异常：Uncaught TypeError: notHoistedFunc is not a function，而 `hoistedFunc` 调用不会，因为 `hoistedFunc` 会被提升到作用域的顶部，而 `notHoistedFunc` 不会。

## 什么时候不使用箭头函数? 说出三个或更多的例子?

1. 当想要函数被提升时 (箭头函数是匿名的)。
2. 要在函数中使用 `this` 或 `arguments` 时，由于箭头函数本身不具有 `this` 或 `arguments`，因此它们取决于外部上下文。
3. 使用命名函数 (箭头函数是匿名的)。
4. 使用函数作为构造函数时 (箭头函数没有构造函数)。
5. 当想在对象字面量中将函数作为属性添加并在其中使用对象时，因为箭头函数无法访问 `this` 即对象本身。

## Object.freeze() 和 const 的区别是什么?

- **const** 声明一个只读的变量，一旦声明，常量的值就不可改变。

```javascript
const person = {
  name: "Leonardo"
};
let animal = {
  species: "snake"
};
person = animal; // ERROR "person" is read-only
```

- **Object.freeze** 适用于值，更具体地说，适用于对象值，它使对象不可变，即不能更改其属性。

```javascript
let person = {
  name: "Leonardo"
};
let animal = {
  species: "snake"
};
Object.freeze(person);
person.name = "Lima"; //TypeError: Cannot assign to read only property 'name' of object
console.log(person);
```

## 如何在 JS 中“深冻结”对象

如果我们想要确保对象被深冻结，就必须创建一个递归函数来冻结对象类型的每个属性。

```javascript
function deepFreeze(object) {
  let propNames = Object.getOwnPropertyNames(object);

  for (let name of propNames) {
    let value = object[name];
    object[name] = value && typeof value === "object" ? deepFreeze(value) : value;
  }
  
  return Object.freeze(object);
}
let person = {
    name: "Leonardo",
    profession: {
        name: "developer"
    }
};
deepFreeze(person);
person.profession.name = "doctor"; // TypeError: Cannot assign to read only property 'name' of object
```

这个 `deepFreeze` 函数将递归地冻结对象及其嵌套的属性，确保整个对象都不可变。

## Iterator是什么，有什么作用

遍历器（Iterator）就是一种机制，它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

**Iterator 的作用有三个**：

1. 为各种数据结构，提供一个统一的、简便的访问接口。
2. 使得数据结构的成员能够按某种次序排列。
3. ES6 创造了一种新的遍历命令 `for...of` 循环，Iterator 接口主要供 `for...of` 消费。

**遍历过程**：

1. 创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
2. 第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
3. 第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
4. 不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

```javascript
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};
```

## Generator 函数是什么，有什么作用？

Generator函数是一种特殊的函数，它使用 `function*` 语法定义，可以被暂停和恢复。执行Generator函数会返回一个遍历器对象，每一次Generator函数里面的 `yield` 相当于一次遍历器对象的 `next()` 方法，并且可以通过 `next(value)` 方法传入自定义的值，来改变Generator函数的行为。

**Generator函数的作用**：

1. Generator函数可以用于创建迭代器，它能够生成一系列值，适用于需要逐步生成数据的场景，如惰性计算。
2. Generator函数可以暂停和恢复，这使得它非常适合异步编程，能够更轻松地管理异步操作和控制流。
3. Generator函数可以通过配合Thunk函数（一种特殊的函数）更轻松、更优雅地实现异步编程和控制流管理。

```javascript
function* generatorFunction() {
  yield 1;
  yield 2;
  yield 3;
}

const generator = generatorFunction();
console.log(generator.next()); // { value: 1, done: false }
console.log(generator.next()); // { value: 2, done: false }
console.log(generator.next()); // { value: 3, done: false }
console.log(generator.next()); // { value: undefined, done: true }
```

Generator函数的主要特点是可以在函数内部暂停和恢复执行，可以有效处理异步任务，以及按需生成数据。

## 类数组转化为数组

这在 DOM 中甚为常见，如各种元素检索 API 返回的都是类数组，如 document.getElementsByTagName，document.querySelectorAll 等等。除了 DOM API 中，常见的 function 中的 arguments 也是类数组

```javascript
Array.from(arrayLike);
Array.apply(null, arrayLike);
Array.prototype.concat.apply([], arrayLike);
```

## Promise.allSettled()

Promise.allSettled() 静态方法将一个 Promise 可迭代对象作为输入，并返回一个单独的 Promise。当所有输入的 Promise 都已敲定时（包括传入空的可迭代对象时），返回的 Promise 将被兑现，并带有描述每个 Promise 结果的对象数组。

### 实现一

接收一个可迭代对象，其中每个成员都是Promise。在所有给定的Promise都已经fulfilled或rejected后返回一个Promise，并带有一个对象数组，每个对象表示对应的Promise结果 相较于Promise.all，后者会在任何一个Promise为rejected时立即结束 简单实现

```javascript
const myPromiseSettled = (items) => {
  const onResolved = (value) => ({ status: "fulfilled", value });
  const onRejected = (reason) => ({ status: "rejected", reason });
  return Promise.all(
    items.map((item) => Promise.resolve(item).then(onResolved, onRejected)),
  );
};
```

### 实现二

```javascript
function allSettled(promises = []) {
  return new Promise((resolve) => {
    let count = 0;
    let values = new Array(promises.length);
    const collect = (index, status) => (value) => {
      const prop = status === "fulfilled" ? "value" : "reason";
      values[index] = { status, [prop]: value };
      ++count === promises.length && resolve(values);
    };
    promises.forEach((promise, i) => {
      if (isPromise(promise)) {
        promise.then(collect(i, "fulfilled"), collect(i, "rejected"));
      } else {
        collect(i, "fulfilled")(promise);
      }
    });
  });
}
```

## 如何创建一个数组大小为100，每个值都为0的数组

```javascript
// 方法一:
Array(100).fill(0);
 
// 方法二:
// 注: 如果直接使用 map，会出现稀疏数组
Array.from(Array(100), (x) => 0);
 
// 方法二变体:
Array.from({ length: 100 }, (x) => 0);
```
