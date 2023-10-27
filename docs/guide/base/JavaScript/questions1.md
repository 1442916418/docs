# JavaScript 面试题 - 1

## 1. URL 拆解成 Origin、文件名、Hash

首先，了解 URL 的基本结构。一个典型的 URL 可以表示为：`protocol://hostname[:port]/path/to/resource#hash`。我们可以使用 JavaScript 的 `URL` 对象来解析 URL。

```javascript
function parseURL(url) {
  const parsedURL = new URL(url);
  return {
    origin: parsedURL.origin, // 协议 + 域名 + 端口
    fileName: parsedURL.pathname.split('/').pop(), // 获取路径的最后一部分作为文件名
    hash: parsedURL.hash // 哈希部分
  };
}

// 示例
const result = parseURL('https://example.com/path/to/file.html#section1');
console.log(result); // { origin: 'https://example.com', fileName: 'file.html', hash: '#section1' }
```

## 2. 两个数组合并并进行算法优化

合并数组通常很简单，但“算法优化”依赖于特定的场景和需求。最基本的合并可以使用扩展运算符或 `Array.concat` 方法。

```javascript
// 使用扩展运算符
const mergeArrays = (arr1, arr2) => [...arr1, ...arr2];

// 使用 Array.concat
const mergeArraysConcat = (arr1, arr2) => arr1.concat(arr2);

// 示例
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const mergedArray = mergeArrays(array1, array2);
console.log(mergedArray); // [1, 2, 3, 4, 5, 6]
```

## 3. 数字转换为百分比格式

```javascript
function toPercentage(value) {
  return `${value * 100}%`;
}

// 示例
console.log(toPercentage(0.123)); // "12.3%"
```

## 4. 首屏优化方案

### 代码层面

1. **代码分割**：使用如 Webpack 的懒加载功能。
2. **树摇晃（Tree Shaking）**：移除未使用的代码。
3. **优化 JavaScript/CSS**：压缩文件，移除或优化冗长代码。

### 网络层面

1. **使用 CDN**：加快资源加载速度。
2. **减少 HTTP 请求**：合并文件，如 CSS Sprites、雪碧图。
3. **优化图片**：压缩或使用较小格式（如 WebP）。
4. **使用多域名**：图片等静态资源上传到多个文件存储服务器。

### 缓存层面

1. **浏览器缓存**：合理设置 HTTP 缓存头。
2. **服务端缓存**：如使用 Redis 缓存常用数据。

## 5. 应对 100 万用户的前端优化

1. **使用 CDN 分发静态资源**：减少服务器压力，加快加载速度。
2. **实现服务端渲染（SSR）**：加快首屏加载速度。
3. **优化图片和媒体资源**：确保资源文件尽可能小。
4. **减少和优化网络请求**：合并请求，使用合适的缓存策略。
5. **负载均衡和故障转移策略**：在多个服务器之间分散流量。

## 6. 使用 ES5 和 ES6 解决继承问题

### ES5 的继承

```javascript
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function() {
  console.log('Parent name:', this.name);
};

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

Child.prototype.sayAge = function() {
  console.log('Age:', this.age);
};

var child = new Child('Alice', 25);
child.sayName(); // 'Parent name: Alice'
child.sayAge();  // 'Age: 25'
```

### ES6 的继承

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log('Parent name:', this.name);
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }

  sayAge() {
    console.log('Age:', this.age);
  }
}

const child = new Child('Alice', 25);
child.sayName(); // 'Parent name: Alice'
child.sayAge();  // 'Age: 25'
```
