# JavaScript - 手写代码

## Array.flat(Infinity)

```javascript
const isArray = Array.isArray;

const flatDeep = arr => {
  return arr.reduce((acc, val) => acc.concat(isArray(val) ? flatDeep(val) : val), []);
};

flatDeep([1, 2, [3, [4, [5, 6]]]]);
// [1, 2, 3, 4, 5, 6]
```

## getQueryString

```js
const src = 'https://www.baidu.com/?id=123&name=aaa&phone=12345';

const getQueryString = url => {
  if (!url.includes('?')) {
    return null;
  }
  const [, search] = url.split('?');
  const obj = {};
  search.split('&').forEach(item => {
    if (item.includes('=')) {
      const [key, val] = item.split('=');
      Reflect.set(obj, key, val);
    }
  });
  return obj;
};

const getQueryString2 = (url: string) => {
  if (!url.includes('?')) {
    return null;
  }
  const ans = {};
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (ans[k] = v));
  return ans;
};

getQueryString(src);
// { id: "123", name: "aaa", phone: "12345" }
```

## Array.prototype.map

你可以手动实现 `Array.prototype.map` 方法，该方法会创建一个新数组，其中包含原始数组中每个元素调用回调函数后的结果。下面是一个示例实现：

```javascript
function customMap(arr, mapCallback) {
  if (!Array.isArray(arr) || !arr.length || typeof mapCallback !== "function") {
    return [];
  } 

  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    result.push(mapCallback(arr[i], i, arr));
  }

  return result;
}

// 示例用法
const numbers = [1, 2, 3, 4, 5];
const doubled = customMap(numbers, (num) => num * 2);
console.log(doubled); // 输出: [2, 4, 6, 8, 10]
```

这个 `customMap` 函数接受一个数组 `arr` 和一个回调函数 `mapCallback`。它遍历原始数组中的每个元素，将回调函数的结果推入一个新数组 `result` 中，并最终返回这个新数组。

## Array.prototype.filter

你可以手动实现 `Array.prototype.filter` 方法，该方法创建一个新数组，其中包含满足回调函数条件的原始数组元素。下面是一个示例实现：

```javascript
function customFilter(arr, filterCallback) {
    if (!Array.isArray(arr) || !arr.length || typeof filterCallback !== "function") {
        return [];
    } else {
        let result = [];
        for (let i = 0; i < arr.length; i++) {
            if (filterCallback(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}

// 示例用法
const numbers = [1, 2, 3, 4, 5];
const evenNumbers = customFilter(numbers, (num) => num % 2 === 0);
console.log(evenNumbers); // 输出: [2, 4]
```

这个 `customFilter` 函数接受一个数组 `arr` 和一个回调函数 `filterCallback`。它遍历原始数组中的每个元素，检查回调函数的条件，如果满足条件，则将元素推入一个新数组 `result` 中，并最终返回这个新数组。

## Array.prototype.reduce

你可以手动实现 `Array.prototype.reduce` 方法，该方法用于将数组元素按顺序应用于回调函数，最终返回一个累积值。下面是一个示例实现：

```javascript
function customReduce(arr, reduceCallback, initialValue) {
  if (!Array.isArray(arr) || !arr.length || typeof reduceCallback !== "function") {
    return [];
  } else {
    let hasInitialValue = initialValue !== undefined;
    let value = hasInitialValue ? initialValue : arr[0];

    for (let i = hasInitialValue ? 0 : 1; i < arr.length; i++) {
      value = reduceCallback(value, arr[i], i, arr);
    }

    return value;
  }
}

// 示例用法
const numbers = [1, 2, 3, 4, 5];
const sum = customReduce(numbers, (accumulator, num) => accumulator + num, 0);
console.log(sum); // 输出: 15
```

这个 `customReduce` 函数接受一个数组 `arr`、一个回调函数 `reduceCallback` 和一个可选的初始值 `initialValue`。它按顺序将数组元素应用于回调函数，累积最终的值，并返回该值。如果提供了初始值，循环从数组的第一个元素开始；否则，循从第二个元素开始。

## 实现一个 `call` 或 `apply`

`call` 和 `apply` 是 JavaScript 中用于改变函数执行上下文（`this` 值）的方法。下面是一个简单的实现 `call` 和 `apply` 的示例：

```javascript
// 实现 call 方法
Function.prototype.myCall = function(context, ...args) {
  // 默认上下文为全局对象
  context = context || window;
  // 临时属性名
  const fn = Symbol('fn');
  // this 指向调用 myCall 的函数对象
  context[fn] = this;

  // 执行该函数
  const result = context[fn](...args);

  // 删除临时属性
  delete context[fn];

  return result;
};

// 实现 apply 方法
Function.prototype.myApply = function(context, args) {
  // 默认上下文为全局对象
  context = context || window;
  // 临时属性名
  const fn = Symbol('fn');
  // this 指向调用 myApply 的函数对象
  context[fn] = this;

  // 执行该函数
  const result = context[fn](...args);

  // 删除临时属性
  delete context[fn];

  return result;
};

// 示例
function greet(name) {
  console.log(`Hello, ${name}! My name is ${this.name}.`);
}

const person = {
  name: 'John',
};

greet.myCall(person, 'Alice'); // Hello, Alice! My name is John.
greet.myApply(person, ['Alice']); // Hello, Alice! My name is John.
```

上述代码中，我们在 `Function` 的原型上扩展了 `myCall` 和 `myApply` 方法，实现了类似原生 `call` 和 `apply` 的功能。

## 实现一个 `Function.bind`

`bind` 方法用于创建一个新函数，该函数在调用时将指定的对象作为其 `this` 值，并在调用时添加任何必要的参数。下面是一个简单的 `bind` 方法的实现示例：

```javascript
// 实现 bind 方法
Function.prototype.myBind = function(context, ...args) {
  // 储存当前函数的引用
  const fn = this;

  // 返回一个新函数
  return function (...newArgs) {
    // 使用 apply 调用原函数，并设置 this 上下文和合并参数
    return fn.apply(context, args.concat(newArgs));
  };
};

// 示例
function greet(name, age) {
  console.log(`Hello, ${name}! My name is ${this.name}, and I am ${age} years old.`);
}

const person = {
  name: 'John'
};

const boundGreet = greet.myBind(person, 'Alice');
boundGreet(30); // Hello, Alice! My name is John, and I am 30 years old.
```

在上述代码中，我们在 `Function` 的原型上扩展了 `myBind` 方法，实现了类似原生 `bind` 的功能。`myBind` 返回一个新的函数，该函数在调用时会以指定的 `context` 作为 `this` 值，并传递给原函数的参数。

## 实现一个继承

JavaScript 支持原型链继承，通过将子类的原型设置为父类的实例，可以实现继承。以下是一个简单的继承示例：

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}

function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayName = function() {
  console.log('child name:', this.name);
}

var parent = new Parent('John');
parent.sayName(); // parent name: John

var child = new Child('Alice', 'John');
child.sayName(); // child name: Alice
```

在上述示例中，`Parent` 是父类，`Child` 是子类。我们通过 `Child.prototype = Object.create(Parent.prototype)` 将子类的原型设置为父类的实例，从而实现继承。同时，我们还重写了子类的 `sayName` 方法，以覆盖父类的实现。

## 求平面两点之间的距离

要计算平面上两点之间的距离，可以使用以下 JavaScript 函数：

```javascript
function calculateDistance(pointA, pointB) {
  const dx = Number(pointA.x) - Number(pointB.x);
  const dy = Number(pointA.y) - Number(pointB.y);
  return Math.sqrt(dx * dx + dy * dy);
}

// 例子
const point1 = { x: 6, y: 10 };
const point2 = { x: 8, y: 20 };

const distance = calculateDistance(point1, point2);
console.log('Distance between point1 and point2:', distance);
```

在上述代码中，`calculateDistance` 函数接受两点 `pointA` 和 `pointB` 作为参数，并计算它们之间的距离。这个函数使用欧几里得距离公式：$\sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$。

## 将浮点数点左边的数每三位添加一个逗号

要将浮点数的整数部分每三位添加一个逗号，可以使用以下 JavaScript 函数：

1.**方法一**

```javascript
function format(number) {
  return number && number.toString().replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
```

- 这个方法使用了正则表达式 `/(?!^)(?=(\d{3})+\.)/g` 来匹配整数部分的每三位数字。
- `replace` 方法用逗号 `,` 替换匹配的位置，但仅在不是字符串开头的情况下（使用 `(?!^)` 进行否定预查）才添加逗号。
- 这个方法适用于较旧的浏览器，因为它不依赖于内置的国际化支持。  

2.**方法二**

```javascript
function format1(number) {
  return Intl.NumberFormat().format(number);
}
```

- 这个方法使用 `Intl.NumberFormat` 对象，该对象是 ECMAScript 国际化 API 的一部分。
- `Intl.NumberFormat().format(number)` 用于格式化数字，自动添加逗号以表示千位分隔。
- 这个方法依赖于浏览器的国际化支持，因此它可能不适用于所有浏览器，尤其是在一些古老的浏览器中。

3.**方法三**

```javascript
function format2(number) {
  return number.toLocaleString('en');
}
```

- 这个方法使用 `toLocaleString` 方法来格式化数字，并通过 `'en'` 参数指定将数字格式化为英语格式。
- `toLocaleString` 方法是 ECMAScript 国际化 API 的一部分，用于根据当前语言环境格式化数字。
- 这个方法的表现类似于方法二，但也依赖于浏览器的国际化支持。

选择哪种方法取决于你的项目需求和目标浏览器的支持情况。方法一是一个较为通用的解决方案，适用于大多数浏览器，而方法二和方法三依赖于浏览器的国际化支持，可能在某些环境中不适用。

## 检测浏览器版本的方式

检测浏览器版本是在前端开发中经常需要执行的任务之一，以下是两种常见的检测浏览器版本的方式：

1. **功能检测**

   这是一种用于检测浏览器是否支持特定功能或API的方法。通过检查浏览器是否支持某个函数、对象或方法，可以确定浏览器的能力。这种方法的一个常见应用是检测是否支持HTML5或CSS3功能，然后相应地提供替代方案。

2. **userAgent特征检测**

   这种方法涉及检查 `navigator.userAgent` 属性，它包含有关用户代理字符串的信息。用户代理字符串包含浏览器和操作系统的信息，可以用于判断浏览器类型和版本。例如：

   ```javascript
   navigator.userAgent
   //"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.101 Safari/537.36"
   ```

   你可以从用户代理字符串中提取浏览器的相关信息，如浏览器名称和版本号。这种方法虽然可以用于检测浏览器版本，但在某些情况下可能会变得复杂，因为不同的浏览器可以生成不同格式的用户代理字符串。

## 判断当前运行环境

要判断当前的运行环境，通常使用正则表达式匹配 `navigator.userAgent` 中的用户代理字符串。以下是一个示例正则表达式，可以用于检测当前是否在移动设备上运行：

```javascript
navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
```

这个正则表达式匹配用户代理字符串中是否包含手机和平板等移动设备的关键词。如果匹配成功，就可以判断当前是在移动设备上运行。这样的检测对于根据设备类型提供不同的用户体验非常有用。

需要注意的是，虽然正则表达式方法可以用于判断运行环境，但可能会受到用户代理字符串格式的变化和伪造的影响，因此不是绝对可靠的方法。在一些情况下，可能需要结合其他检测方法来提高准确性。

## Promise

Promise 是一种用于处理异步操作的 JavaScript 对象，它表示一个尚未完成且预计在未来完成的异步任务。Promise 的出现主要解决了两个问题：

1. 回调地狱：避免了多层嵌套的回调函数，使代码更加清晰和可维护。
2. 支持并发请求：可以处理多个并发的异步请求，并在它们都完成时获取数据。

下面是一个简单的 Promise 的自定义实现示例：

```javascript
/* Promise 的简单实现 */
class MyPromise {
  constructor(fn) {
    this.resolvedCallbacks = [];
    this.rejectedCallbacks = [];
    this.state = "PENDING";
    this.value = "";

    fn(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(value) {
    if (this.state === "PENDING") {
      this.state = "RESOLVED";
      this.value = value;
      this.resolvedCallbacks.forEach(cb => cb());
    }
  }

  reject(value) {
    if (this.state === "PENDING") {
      this.state = "REJECTED";
      this value = value;
      this.rejectedCallbacks.forEach(cb => cb());
    }
  }

  then(resolve = function() {}, reject = function() {}) {
    if (this.state === "PENDING") {
      this.resolvedCallbacks.push(resolve);
      this.rejectedCallbacks.push(reject);
    }
    if (this.state === "RESOLVED") {
      resolve(this.value);
    }
    if (this.state === "REJECTED") {
      reject(this.value);
    }
  }
}
```

此自定义 Promise 实现简要展示了 Promise 的核心思想，包括状态管理、异步操作的处理以及链式调用。在实际应用中，通常使用内置的 `Promise` 对象，它提供了更多的功能和更丰富的 API，以简化异步操作的处理。

## 数组去重

1. **遍历循环**

   第一种方法也是最一般、最常用的办法，使用数组的 `indexOf()` 方法。但是 `indexOf` 方法内部实现也是去遍历数组知道找到目标为止，如果待去重的数组很长且重复的元素少，则会耗费大量时间。

   ```javascript
   let arr = [1,'1',2,'2',1,2,'x','y','f','x','y','f'];

   function unique1(arr) {
      let result = [arr[0]];
      for (let i = 1; i < arr.length; i++) {
        let item = arr[i];
        if (result.indexOf(item) === -1) {
          result.push(item);
        }
      }
      return result;
   }

   console.log(unique1(arr));
   ```

2. **存放 Hash 对象**

   第二种方法是将数组所有的元素转变成对象的键名，利用对象键名的不可重复特性来去重。从时间消耗的角度来看，这种方法比第一种方法要快很多，因为从对象中取属性值几乎可以不计时间，但存在以下两个问题：
   - 由于需要存放 Hash 对象，因此在内存占用上比第一种方法会多占用更多的内存空间，即所谓的 "空间换时间"。
   - 从上面的排序结果，我们会发现一个问题，'1'、'2'不在结果中。因为在键名中，String 类型的'1'、'2'和 Number 类型的 1、2 对于 Hash 对象来说都是一样的。

   ```javascript
   let arr = [1,'1',2,'2',1,2,'x','y','f','x','y','f'];

   function unique2(arr) {
      let result = [];
      let obj = {};

      for (let i = 0; i < arr.length; i++) {
        let item = arr[i];
        if (!obj[item]) {
          result.push(item);
          obj[item] = 1;
        }
      }

      return result;
   }

   console.log(unique2(arr));
   ```

3. **排序比较**

   第三种方法利用数组原生的 `sort()` 方法，将数组先进行排序，排序后比较相邻两个元素的值。这种方法比 `indexOf()` 消耗的时间要短，比存放 Hash 对象占用的内存要小，算是一种折中两者的方法。但是也存在一个问题，就是去重后的数组的顺序发生了改变。

   ```javascript
   let arr = [1,'1',2,'2',1,2,'x','y','f','x','y','f'];

   function unique3(arr) {
      let result = [arr[0]];
      arr = arr.sort();
      for (let i = 1; i < arr.length; i++) {
        let item = arr[i];
        if (item !== result[result.length - 1]) {
          result.push(item);
        }
      }
      return result;
   }

   console.log(unique3(arr));
   ```

4. **Set 类型**

   ```javascript
   let arr = [1,'1',2,'2',1,2,'x','y','f','x','y','f'];

   function unique4(arr) {
      return Array.from(new Set(arr));
   }

   console.log(unique4(arr));
   ```

5. **filter 实现**

   ```javascript
   var array = [1, 2, 1, 1, '1'];

   function unique(array) {
      var res = array.filter(function(item, index, array) {
        return array.indexOf(item) === index;
      });
      return res;
   }

   console.log(unique(array));
   ```

6. **Object 键值对**

   ```javascript
   var array = [{value: 1}, {value: 1}, {value: 2}];

   function unique(array) {
      var obj = {};
      return array.filter(function(item, index, array) {
        return obj.hasOwnProperty(typeof item + JSON.stringify(item)) ? false : (obj[typeof item + JSON.stringify(item)] = true);
      });
   }

   console.log(unique(array)); // [{value: 1}, {value: 2}]
   ```

## 对象数组去重

```javascript
const dataArray = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 2, name: 'Bob'},
  {id: 3, name: 'Charlie'},
  {id: 1, name: 'Alice'}
];
```

1. **使用JSON.stringify()和Set**

```javascript
function uniqueByJSON(arr) {
  const uniqueStrArray = [...new Set(arr.map(item => JSON.stringify(item)))];
  return uniqueStrArray.map(item => JSON.parse(item));
}

console.log(uniqueByJSON(dataArray));
```

2.**使用Map**

```javascript
function uniqueByMap(arr) {
  const uniqueMap = new Map();
  arr.forEach(item => {
    uniqueMap.set(JSON.stringify(item), item);
  });
  return [...uniqueMap.values()];
}

console.log(uniqueByMap(dataArray));
```

3.**双重for循环**

```javascript
function uniqueFunc(arr, uniId){
  let obj = {}
  let tempArr = []

  for(let i = 0; i < arr.length; i++){
    if(!obj[arr[i][uniId]]){
      tempArr.push(arr[i])
      obj[arr[i][uniId]] = true
    }
  }
  
  return tempArr
}
```

4.**filter和Map**

```JavaScript
function uniqueFunc(arr, uniId){
  const res = new Map();
  return arr.filter((item) => !res.has(item[uniId]) && res.set(item[uniId], 1));
}
```

5.**reduce**

```JavaScript
function uniqueFunc(arr, uniId){
  let hash = {}
  return arr.reduce((accum,item) => {
    hash[item[uniId]] ? '' : hash[item[uniId]] = true && accum.push(item)
    return accum
  },[])
}
```

## == 和 === 区别

- **==**
  
  - `==` 两边值类型不同的时候，要先进行类型转换，再比较。
  - 转化步骤:
    1. 如果类型不同，进行类型转换。
    2. 判断比较的是否是 `null` 或者是 `undefined`，如果是，返回 `true`。
    3. 判断两者类型是否为 `string` 和 `number`，如果是，将字符串转换成 `number`。
    4. 判断其中一方是否为 `boolean`，如果是, 将 `boolean` 转为 `number` 再进行判断。
    5. 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或 `symbol`，如果是, 将 object 转为原始类型再进行判断。

- **===**
  
  - `===` 不做类型转换，类型不同的一定不等。

- **经典面试题：[] == ![] 为什么是 true**
  - 转化步骤:
    1. `!` 运算符优先级最高， `![]` 会被转为为 `false`，因此表达式变成了：`[] == false`.
    2. 根据上面第(4)条规则，如果有一方是 `boolean`，就把 `boolean` 转为 `number`，因此表达式变成了：`[] == 0`.
    3. 根据上面第(5)条规则，把数组转为原始类型，调用数组的 `toString()` 方法， `[]` 转为空字符串，因此表达式变成了：`'' == 0`.
    4. 根据上面第(3)条规则，两边数据类型为 `string` 和 `number`，把空字符串转为 `0`，因此表达式变成了：`0 == 0`.
    5. 两边数据类型相同，`0 == 0` 为 `true`.

## 深拷贝和浅拷贝

### 浅拷贝

1.**for in**

```javascript
function simpleClone(obj) {
  var result = {};
  for (var i in obj) {
    result[i] = obj[i];
  }
  return result;
}
```

2.**Object.assign**

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = Object.assign({}, original);

console.log(copy); // { a: 1, b: { c: 2 } }

// 修改原始数据的嵌套对象
original.b.c = 3;

console.log(copy.b.c); // 输出 3，因为是浅拷贝
```

3.**展开运算符**

```javascript
const original = { a: 1, b: { c: 2 } };
const copy = { ...original };

console.log(copy); // { a: 1, b: { c: 2 } }

// 修改原始数据的嵌套对象
original.b.c = 3;

console.log(copy.b.c); // 输出 3，因为是浅拷贝
```

### 深拷贝

1.**遍历对象中的每一个属性**

```javascript
function deepClone(obj) {
  let result;
  if (typeof obj == 'object') {
    result = isArray(obj) ? [] : {}
    for (let i in obj) {
      result[i] = isObject(obj[i]) || isArray(obj[i]) ? deepClone(obj[i]) : obj[i]
    }
  } else {
    result = obj;
  }
  return result;
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) == "[object Object]";
}

function isArray(obj) {
  return Object.prototype.toString.call(obj) == "[object Array]";
}
```

2.**递归方法**

```javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return null; 
  if (typeof obj !== 'object') return obj;
  if (hash.has(obj)) return hash.get(obj);

  let cloneObj = new obj.constructor();
  hash.set(obj, cloneObj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

const original = { a: 1, b: { c: 2 } };
const copy = deepClone(original);

console.log(copy); // { a: 1, b: { c: 2 } }

original.b.c = 3;

console.log(copy.b.c); // 输出 2，因为是深拷贝
```
