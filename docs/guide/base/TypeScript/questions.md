# TypeScript 面试题

## 1. 什么是 TypeScript？它与 JavaScript 有何不同？

**答案：**

`TypeScript`  是一种由 `Microsoft` 开发的开源编程语言，它是 `JavaScript` 的一个超集，添加了可选的静态类型检查以及最新的 `ECMAScript` 特性。与 `JavaScript` 相比， `TypeScript` 提供的主要不同点包括：

- **静态类型检查**： `TypeScript` 在编译时进行类型检查，而 `JavaScript` 是动态类型的，类型错误只能在运行时发现。
- **类和接口**： `TypeScript` 支持面向对象编程的类和接口，这有助于在大型项目中实现更高的代码质量和维护性。
- **泛型**： `TypeScript` 提供泛型支持，允许创建可重用的组件。
- **枚举类型**： `TypeScript` 支持枚举（Enum），这是原生 `JavaScript` 不具备的。

## 2. 解释 TypeScript 中的接口（Interface）

**答案：**

在 `TypeScript` 中，接口是一个非常强大的特性，它用于定义对象的形状。接口可以指定一个对象必须具有哪些属性和方法，从而提供了一种强类型的方式来定义对象的结构。接口通常用于强制实现特定的契约或形状，但它们不会转译为 `JavaScript` 。它们仅在 `TypeScript` 编译时存在。

```typescript
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}

let user: Person = {
  name: "John",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.name);
  }
};
```

## 3.  `TypeScript` 中的泛型是什么？

**答案：**

泛型是 `TypeScript` 的一个特性，允许在定义函数、接口或类时不预先指定具体的类型，而是在使用时指定类型。泛型提供了一种方法来确保函数或类的类型安全性，同时保持灵活性和重用性。

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
```

## 4. 解释 `TypeScript` 中的枚举（Enum）

**答案：**

枚举是 `TypeScript` 提供的一种数据类型，它允许为一组数值赋予更易读的名字。枚举的主要目的是提高代码的可读性和可维护性。在 `TypeScript` 中，枚举可以是数字或字符串。

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

let dir: Direction = Direction.Up;
```

## 5. 解释 `TypeScript` 中的联合类型和交叉类型

**答案：**

- **联合类型**： `TypeScript` 的联合类型允许一个变量拥有多种类型之一。联合类型使用 `|` 符号定义，表示一个值可以是几种类型之一。

```typescript
let value: number | string;
value = 5; // OK
value = "hello"; // OK
```

- **交叉类型**： `TypeScript` 的交叉类型是将多个类型合并为一个类型。这通过 `&` 符号实现，它允许组合多个类型的特性。

```typescript
interface Person {
  name: string;
}

interface Loggable {
  log(name: string): void;
}

let person: Person & Loggable = {
  name: "John",
  log(name: string) {
    console.log(name);
  }
};
```

## 6. TypeScript 中的 `never` 类型有什么用途？

**答案：**

`never` 类型表示的是那些永远不会发生的值的类型。在函数中，它通常用于两种情况：一是函数永远不会返回值（例如：函数内部抛出了错误）；二是函数总是会抛出异常，因此不会有返回值。

```typescript
function error(message: string): never {
  throw new Error(message);
}

function fail() {
  return error("Something failed");
}
```

## 7. 解释 TypeScript 中的装饰器（Decorator）

**答案：**

装饰器是 `TypeScript` 的一个实验性特性，它是一种特殊类型的声明，可以被附加到类声明、方法、访问器、属性或参数上。装饰器使用 `@expression` 这种形式，`expression`必须求值为一个函数，它会在运行时被调用，被装饰的声明信息作为参数传入。

```typescript
function sealed(constructor: Function) {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

@sealed
class Greeter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message;
  }
  greet() {
    return "Hello, " + this.greeting;
  }
}
```

## 8. TypeScript 中 `readonly` 关键字有什么作用？

**答案：**

`readonly` 关键字用于属性声明之前，表示该属性为只读，不能被重新赋值。这在创建不可变数据时非常有用，尤其是在工作中需要确保某些字段不被改变时。

```typescript
interface Point {
  readonly x: number;
  readonly y: number;
}

let point: Point = { x: 10, y: 20 };
point.x = 5; // 错误，x 是只读属性
```

## 9. 什么是命名空间（Namespace）和模块（Module），它们之间有什么区别？

**答案：**

- **命名空间（Namespace）**：在 `TypeScript` 中，命名空间是用来组织代码的一种方式，可以防止全局命名冲突。命名空间内的成员默认是私有的，除非显式导出。

```typescript
namespace MyNamespace {
  export class MyClass {}
}
```

- **模块（Module）**：模块是 `TypeScript` 的外部模块的简称，每个模块都在自己的作用域里运行，而不是在全局作用域里。这意味着在一个模块里定义的变量、函数、类等在模块外部是不可见的，除非你明确地使用 `export` 形式之一导出它们。

```typescript
// someModule.ts
export class SomeModule {}
```

**区别**：最主要的区别在于命名空间主要用于组织代码和避免命名冲突，通常用于将代码组织为内部模块。而模块是TypeScript的核心概念，用于组织和重用代码，每个文件都被视为一个模块，通过 `import` 和 `export` 来共享模块间的代码。

## 10. TypeScript中的 `type` 和 `interface` 有什么区别？

**答案：**

虽然 `type` 和 `interface` 在许多情况下可以互换使用，但它们之间还是有一些细微的差别：

- **扩展性**：`interface` 更加灵活，可以通过声明合并来扩展现有的接口。而 `type` 不能被重新打开以添加新的属性，但可以通过交叉类型来实现扩展。  
- **类型别名（Type Aliases）**：`type` 可以用来为类型定义一个新名字，它可以是任何有效的类型，包括基本类型、联合类型、交叉类型等。  
- **新特性**：`interface`可以声明合并，这对于在多个地方扩展同一个接口非常有用。而`type`则支持映射类型和条件类型。

```typescript
// Interface
interface Person {
  name: string;
}
interface Person {
  age: number;
}

// Type Alias
type Animal = {
  species: string;
};
type Bear = Animal & { 
  honey: boolean;
};
```
