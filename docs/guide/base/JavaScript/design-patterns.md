# JavaScript - 设计模式

## 创建型模式

创建型模式与对象的创建过程有关。它们为对象的创建提供了一种抽象，使得系统不需要关心对象的具体实现、如何创建、组合和表示这些对象。

### 1. 工厂方法模式

**代码示例**：

```javascript
class Product {
  constructor(name) {
    this.name = name;
  }
}

class Factory {
  createProduct(type) {
    switch (type) {
      case 'A':
        return new Product('ProductA');
      case 'B':
        return new Product('ProductB');
      default:
        throw new Error('Invalid product type');
    }
  }
}

const factory = new Factory();
const productA = factory.createProduct('A');
console.log(productA.name);  // ProductA
```

**详解**：
工厂方法模式定义了一个创建对象的接口，但由子类决定要实例化的类是哪一个。工厂方法模式让类的实例化延迟到子类。

**应用场景**：

- 当一个类不知道它必须创建的对象的类时。
- 当一个类希望由其子类来指定它所创建的对象时。

### 2. 抽象工厂模式

**代码示例**：

```javascript
class ProductA {}
class ProductB {}

class AbstractFactory {
  createProductA() {}
  createProductB() {}
}

class ConcreteFactory1 extends AbstractFactory {
  createProductA() {
    return new ProductA();
  }
  createProductB() {
    return new ProductB();
  }
}

const factory1 = new ConcreteFactory1();
const productA1 = factory1.createProductA();
console.log(productA1 instanceof ProductA);  // true
```

**详解**：
抽象工厂模式提供一个接口，用于创建相关或依赖对象的家族，而不需要明确指定具体类。

**应用场景**：

- 系统需要独立于它的产品创建、组合和表示时。
- 系统需要配置多个产品家族中的一个来提供给它的类。

### 3. 单例模式

**代码示例**：

```javascript
class Singleton {
  static instance;

  static getInstance() {
    if (!this.instance) {
      this.instance = new Singleton();
    }
    return this.instance;
  }
}

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2);  // true
```

**详解**：
单例模式确保一个类只有一个实例，并提供一个全局点来访问这个实例。

**应用场景**：

- 当类只能有一个实例且客户可以从一个众所周知的访问点访问它时。

### 4. 建造者模式

**代码示例**：

```javascript
class Product {
  constructor(builder) {
    this.partA = builder.partA;
    this.partB = builder.partB;
  }
}

class Builder {
  setPartA(partA) {
    this.partA = partA;
    return this;
  }
  setPartB(partB) {
    this.partB = partB;
    return this;
  }
  build() {
    return new Product(this);
  }
}

const builder = new Builder();
const product = builder.setPartA('A').setPartB('B').build();
console.log(product.partA);  // A
```

**详解**：
建造者模式将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

**应用场景**：

- 当算法创建复杂对象的步骤应该独立于该对象的组成部分以及它们的装配方式时。

### 5. 原型模式

**代码示例**：

```javascript
class Prototype {
  constructor(name) {
    this.name = name;
  }
  clone() {
    return Object.create(this);
  }
}

const prototype = new Prototype('Original');
const clone = prototype.clone();
console.log(clone.name);  // Original
```

**详解**：
原型模式用原型实例指定创建对象的种类，并通过拷贝这些原型创建新的对象。

**应用场景**：

- 当要实例化的类是在运行时刻指定时，例如，通过动态装载。
- 为了避免创建一个与产品类层次平行的工厂类层次时。

## 结构性模式

结构型模式与对象的组合有关。它们确保各个组件之间能够高效、灵活地一起工作。

### 1. 适配器模式

**代码示例**：

```javascript
class OldService {
  oldRequest() {
    return 'Old Service';
  }
}

class Adapter {
  constructor(oldService) {
    this.oldService = oldService;
  }

  request() {
    return this.oldService.oldRequest();
  }
}

const oldService = new OldService();
const adapter = new Adapter(oldService);
console.log(adapter.request());  // Old Service
```

**详解**：
适配器模式将一个类的接口转换成客户希望的另外一个接口。Adapter模式使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

**应用场景**：

- 你想使用一个已经存在的类，但它的接口不符合你的需求。
- 你想创建一个可以复用的类，该类可以与其他不相关的类或不可预见的类（即那些接口可能不一定兼容的类）协同工作。

### 2. 装饰器模式

**代码示例**：

```javascript
class Component {
  operation() {}
}

class ConcreteComponent extends Component {
  operation() {
    return 'Component';
  }
}

class Decorator extends Component {
  constructor(component) {
    super();
    this.component = component;
  }

  operation() {
    return this.component.operation();
  }
}

class ConcreteDecorator extends Decorator {
  operation() {
    return 'Decorated ' + super.operation();
  }
}

const component = new ConcreteComponent();
const decorator = new ConcreteDecorator(component);
console.log(decorator.operation());  // Decorated Component
```

**详解**：
装饰器模式动态地将责任附加到对象上。想要扩展功能，装饰器提供了比继承更有弹性的替代方案。

**应用场景**：

- 在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。
- 当不能采用生成子类的方法进行扩充时。

### 3. 代理模式

**代码示例**：

```javascript
class RealSubject {
  request() {
    return 'Real Subject';
  }
}

class Proxy {
  constructor(realSubject) {
    this.realSubject = realSubject;
  }

  request() {
    return 'Proxy: ' + this.realSubject.request();
  }
}

const realSubject = new RealSubject();
const proxy = new Proxy(realSubject);
console.log(proxy.request());  // Proxy: Real Subject
```

**详解**：
代理模式为其他对象提供一种代理以控制对这个对象的访问。

**应用场景**：

- 远程代理，为一个对象在不同的地址空间提供局部代表。
- 虚代理，根据需要创建开销很大的对象。
- 保护代理，控制对原始对象的访问。

### 4. 外观模式

**代码示例**：

```javascript
class SubSystemA {
  operationA() {
    return 'Operation A';
  }
}

class SubSystemB {
  operationB() {
    return 'Operation B';
  }
}

class Facade {
  constructor() {
    this.subSystemA = new SubSystemA();
    this.subSystemB = new SubSystemB();
  }

  operation() {
    return this.subSystemA.operationA() + ' and ' + this.subSystemB.operationB();
  }
}

const facade = new Facade();
console.log(facade.operation());  // Operation A and Operation B
```

**详解**：
外观模式提供了一个统一的接口，用来访问子系统中的一群接口。外观定义了一个高层接口，让子系统更容易使用。

**应用场景**：

- 当你要为一个复杂子系统提供一个简单接口时。
- 客户程序与抽象类的实现部分之间存在着很大的依赖性。

### 5. 桥接模式

**代码示例**：

```javascript
class Implementor {
  operationImp() {}
}

class ConcreteImplementorA extends Implementor {
  operationImp() {
    return 'Implementor A';
  }
}

class Abstraction {
  constructor(implementor) {
    this.implementor = implementor;
  }

  operation() {
    return this.implementor.operationImp();
  }
}

const implementor = new ConcreteImplementorA();
const abstraction = new Abstraction(implementor);
console.log(abstraction.operation());  // Implementor A
```

**详解**：
桥接模式将抽象部分与它的实现部分分离，使它们都可以独立地变化。

**应用场景**：

- 不希望在抽象和它的实现部分之间有一个固定的绑定关系。
- 两个类的变化都是独立的。

### 6. 组合模式

**代码示例**：

```javascript
class Component {
  operation() {}
}

class Leaf extends Component {
  operation() {
    return 'Leaf';
  }
}

class Composite extends Component {
  constructor() {
    super();
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  operation() {
    return this.children.map(child => child.operation()).join(', ');
  }
}

const leaf1 = new Leaf();
const leaf2 = new Leaf();
const composite = new Composite();
composite.add(leaf1);
composite.add(leaf2);
console.log(composite.operation());  // Leaf, Leaf
```

**详解**：
组合模式允许你将对象组成树形结构来表示“部分-整体”的层次结构。组合使得客户端对单个对象和复合对象的使用具有一致性。

**应用场景**：

- 你希望表示对象的部分-整体层次结构。
- 你希望客户忽略组合对象与单个对象的不同，客户将统一地使用组合结构中的所有对象。

### 7. 享元模式

**代码示例**：

```javascript
class

 Flyweight {
  constructor(sharedState) {
    this.sharedState = sharedState;
  }

  operation(uniqueState) {
    return `Shared State: ${this.sharedState}, Unique State: ${uniqueState}`;
  }
}

class FlyweightFactory {
  constructor() {
    this.flyweights = {};
  }

  getFlyweight(sharedState) {
    if (!this.flyweights[sharedState]) {
      this.flyweights[sharedState] = new Flyweight(sharedState);
    }
    return this.flyweights[sharedState];
  }
}

const factory = new FlyweightFactory();
const flyweight = factory.getFlyweight('Shared1');
console.log(flyweight.operation('Unique1'));  // Shared State: Shared1, Unique State: Unique1
```

**详解**：
享元模式使用共享对象有效地支持大量的细粒度的对象。

**应用场景**：

- 一个应用程序使用了大量的对象。
- 由于使用了大量对象，造成很大的存储开销。

## 行为型模式

行为型模式与对象之间的通信和职责分配有关。它们为对象之间的交互提供了更清晰、更灵活的通信方式。

### 1. 策略模式

**代码示例**：

```javascript
class Strategy {
  execute() {}
}

class ConcreteStrategyA extends Strategy {
  execute() {
    return 'Strategy A';
  }
}

class Context {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  executeStrategy() {
    return this.strategy.execute();
  }
}

const strategyA = new ConcreteStrategyA();
const context = new Context(strategyA);
console.log(context.executeStrategy());  // Strategy A
```

**详解**：
策略模式定义了算法家族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。

**应用场景**：

- 许多相关的类仅仅是行为有异。
- 需要使用一个算法的不同变体。

### 2. 模板方法模式

**代码示例**：

```javascript
class AbstractClass {
  templateMethod() {
    this.primitiveOperation1();
    this.primitiveOperation2();
  }

  primitiveOperation1() {}
  primitiveOperation2() {}
}

class ConcreteClass extends AbstractClass {
  primitiveOperation1() {
    console.log('Operation 1');
  }

  primitiveOperation2() {
    console.log('Operation 2');
  }
}

const concrete = new ConcreteClass();
concrete.templateMethod();  // Output: Operation 1 \n Operation 2
```

**详解**：
模板方法模式在一个方法中定义一个算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以在不改变算法结构的情况下，重新定义算法中的某些步骤。

**应用场景**：

- 一次性实现一个算法的不变部分，并将可变的行为留给子类来实现。
- 各子类中公共的行为应被提取出来并集中到一个公共父类中以避免代码重复。

### 3. 观察者模式/发布订阅模式

**代码示例**：

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log('Observer received:', data);
  }
}

const subject = new Subject();
const observer = new Observer();
subject.addObserver(observer);
subject.notify('Some data');  // Observer received: Some data
```

**详解**：
观察者模式定义了对象之间的一对多依赖，当一个对象状态改变时，它的所有依赖者都会收到通知并自动更新。

**应用场景**：

- 当一个对象的改变需要同时改变其他对象，而不知道具体有多少对象待改变。
- 当一个对象必须通知其他对象，而它又不能假定其他对象是谁。

### 4. 迭代子模式

**代码示例**：

```javascript
class Iterator {
  constructor(items) {
    this.index = 0;
    this.items = items;
  }

  hasNext() {
    return this.index < this.items.length;
  }

  next() {
    return this.items[this.index++];
  }
}

const iterator = new Iterator(['A', 'B', 'C']);
while (iterator.hasNext()) {
  console.log(iterator.next());  // A \n B \n C
}
```

**详解**：
迭代子模式提供了一种方法顺序访问一个聚合对象中各个元素, 而又不需暴露该对象的内部表示。

**应用场景**：

- 访问一个聚合对象的内容而无需暴露它的内部表示。
- 支持对聚合对象的多种遍历。

### 5. 责任链模式

**代码示例**：

```javascript
class Handler {
  setNext(handler) {
    this.nextHandler = handler;
  }

  handleRequest(request) {
    if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

class ConcreteHandlerA extends Handler {
  handleRequest(request) {
    if (request === 'A') {
      console.log('Handler A handled request A');
    } else if (this.nextHandler) {
      this.nextHandler.handleRequest(request);
    }
  }
}

const handlerA = new ConcreteHandlerA();
const handlerB = new Handler();
handlerA.setNext(handlerB);
handlerA.handleRequest('A');  // Handler A handled request A
```

**详解**：
责任链模式为请求创建了一个接收者对象的链。这种模式给予请求的类型，对请求的发送者和接收者进行解耦。

**应用场景**：

- 有多个的对象可以处理一个请求，哪个对象处理该请求运行时刻自动确定。
- 你想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求。

### 6. 命令模式

**代码示例**：

```javascript
class Command {
  execute() {}
}

class ConcreteCommand extends Command {
  constructor(receiver) {
    super();
    this.receiver = receiver;
  }

  execute() {
    this.receiver.action();
  }
}

class Receiver {
  action() {
    console.log('Receiver action');
  }
}

const receiver = new Receiver();
const command = new ConcreteCommand(receiver);
command.execute();  // Receiver action
```

**详解**：
命令模式将一个请求封装为一个对象，从而使你可用不同的请求对客户进行参数化；对请求排队或记录请求日志，以及支持可撤销的操作。

**应用场景**：

- 支持撤销、重做操作。
- 需要将发出请求的对象和执行请求的对象解耦，使得调用者和接收者能够独立地改变。

### 7. 备忘录模式

**代码示例**：

```javascript
class Originator {


  constructor(state) {
    this.state = state;
  }

  createMemento() {
    return new Memento(this.state);
  }

  restore(memento) {
    this.state = memento.getState();
  }
}

class Memento {
  constructor(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }
}

const originator = new Originator('Initial State');
const memento = originator.createMemento();
originator.state = 'Changed State';
originator.restore(memento);
console.log(originator.state);  // Initial State
```

**详解**：
备忘录模式在不破坏封闭的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态。这样以后就可将该对象恢复到原先保存的状态。

**应用场景**：

- 必须保存一个对象在某一个时刻的(部分)状态, 这样以后需要时它才能恢复到先前的状态。
- 如果一个用接口来让其他对象直接得到这些状态，将会暴露对象的实现细节并破坏对象的封装性。

### 8. 状态模式

**代码示例**：

```javascript
class State {
  handle(context) {}
}

class ConcreteStateA extends State {
  handle(context) {
    console.log('State A handling');
    context.setState(new ConcreteStateB());
  }
}

class ConcreteStateB extends State {
  handle(context) {
    console.log('State B handling');
  }
}

class Context {
  constructor(state) {
    this.state = state;
  }

  setState(state) {
    this.state = state;
  }

  request() {
    this.state.handle(this);
  }
}

const context = new Context(new ConcreteStateA());
context.request();  // State A handling
context.request();  // State B handling
```

**详解**：
状态模式允许一个对象在其内部状态改变时改变它的行为。对象看起来似乎修改了它的类。

**应用场景**：

- 一个对象的行为取决于它的状态, 并且它必须在运行时刻根据状态改变它的行为。
- 一个操作中含有庞大的多分支的条件语句，且这些分支依赖于该对象的状态。

### 9. 访问者模式

**代码示例**：

```javascript
class Element {
  accept(visitor) {}
}

class ConcreteElementA extends Element {
  accept(visitor) {
    visitor.visitConcreteElementA(this);
  }

  operationA() {
    return 'Element A';
  }
}

class Visitor {
  visitConcreteElementA(element) {}
}

class ConcreteVisitor extends Visitor {
  visitConcreteElementA(element) {
    console.log('Visiting ' + element.operationA());
  }
}

const element = new ConcreteElementA();
const visitor = new ConcreteVisitor();
element.accept(visitor);  // Visiting Element A
```

**详解**：
访问者模式表示一个作用于某对象结构中的各元素的操作。它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

**应用场景**：

- 一个对象结构包含很多类对象，它们有不同的接口，而你想对这些对象实施一些依赖于其具体类的操作。
- 需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而你想避免让这些操作“污染”这些对象的类。

### 10. 中介者模式

**代码示例**：

```javascript
class Mediator {
  send(message, colleague) {}
}

class ConcreteMediator extends Mediator {
  constructor(colleague1, colleague2) {
    super();
    this.colleague1 = colleague1;
    this.colleague2 = colleague2;
  }

  send(message, colleague) {
    if (colleague === this.colleague1) {
      this.colleague2.notify(message);
    } else {
      this.colleague1.notify(message);
    }
  }
}

class Colleague {
  constructor(mediator) {
    this.mediator = mediator;
  }

  send(message) {
    this.mediator.send(message, this);
  }

  notify(message) {
    console.log('Colleague received:', message);
  }
}

const colleague1 = new Colleague();
const colleague2 = new Colleague();
const mediator = new ConcreteMediator(colleague1, colleague2);
colleague1.send('Hello');  // Colleague received: Hello
```

**详解**：
中介者模式用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

**应用场景**：

- 一组定义良好的对象，现在要进行复杂的通信。
- 定义对象间的通信方式，使其与对象本身解耦。

### 11. 解释器模式

**代码示例**：

```javascript
class AbstractExpression {
  interpret(context) {}
}

class TerminalExpression extends AbstractExpression {
  interpret(context) {
    console.log('Terminal for', context);
  }
}

class NonterminalExpression extends AbstractExpression {
  interpret(context) {
    console.log('Nonterminal for', context);
  }
}

const context = 'Context';
const terminal = new TerminalExpression();
const nonterminal = new NonterminalExpression();
terminal.interpret(context);  // Terminal for Context
nonterminal.interpret(context);  // Nonterminal for Context
```

**详解**：
解释器模式给定一个语言，定义它的文法的一种表示，并定义一个解释器，这个解释器使用该表示来解释语言中的句子。

**应用场景**：

- 当有一个语言需要解释执行, 并且你可将该语言中的句子表示为一个抽象语法树时，可使用解释器模式。而当存在以下情况时该模式效果最好：
  - 该文法简单对于复杂的文法, 文法的类层次变得庞大而无法管理。
  - 效率不是一个关键问题最高效的解释器通常不是通过直接解释语法分析树实现的，而是首先将它们转换成另一种形式。

## 架构型模式

架构型模式（Architectural Patterns）是一种更高级别的设计模式，它们关注的是整个系统的组织方式，而不仅仅是类和对象的设计。这些模式提供了一种定义程序组件的方法，包括它们的表示、交互和组合方式。

### 1. MVC (Model-View-Controller)

**详解**：

- **Model**：代表数据和业务逻辑，负责数据的存储和检索。
- **View**：代表用户界面，显示数据并在用户进行操作时发送命令。
- **Controller**：接收用户的命令，处理用户的输入，与模型交互并更新视图。

**实际应用场景**：

- Web应用程序：大多数现代Web框架，如Django、Ruby on Rails和Spring MVC，都使用MVC模式。
- 桌面应用程序：如Java的Swing框架。
- 移动应用程序：如iOS的UIKit框架。

**库/框架**：

- **Django**：Python的Web框架。
- **Ruby on Rails**：Ruby的Web框架。
- **Spring MVC**：Java的Web框架。
- **Express.js**：Node.js的Web框架，虽然它是一个微框架，但可以与其他库结合使用，实现MVC架构。
- **UIKit**：iOS的UI框架。

### 2. MVVM (Model-View-ViewModel)

**详解**：

- **Model**：代表数据和业务逻辑。
- **View**：代表用户界面，但与ViewModel绑定，而不是直接与Model交互。
- **ViewModel**：是View的抽象，持有不是UI控件的信息。它接收用户的命令并更新Model，同时也响应Model的更改。

**实际应用场景**：

- **桌面应用程序**：如WPF和Microsoft UWP应用程序。
- **Web应用程序**：单页应用程序（SPA）经常使用MVVM模式，特别是与数据绑定库结合使用时。
- **移动应用程序**：如Xamarin和NativeScript。

**库/框架**：

- **Knockout.js**：JavaScript的数据绑定库。
- **Angular**：一个前端Web框架，支持MVVM模式。
- **Vue.js**：一个前端Web框架，其核心是一个MVVM数据绑定系统。
- **WPF (Windows Presentation Foundation)**：Microsoft的桌面UI框架。
- **Xamarin.Forms**：用于构建跨平台移动应用程序的框架。
