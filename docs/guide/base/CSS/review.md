# CSS 复习

## CSS 选择器及优先级

- **选择器**

  - id选择器(`#id`)
  - 类选择器(`.class`)
  - 属性选择器(`a[rel="external"]`)
  - 伪类选择器(`a:hover`, `li:nth-child`)
  - 标签选择器(`div`, `h1`, `p`)
  - 相邻选择器(`h1 + p`)
  - 子选择器(`ul > li`)
  - 后代选择器(`li a`)
  - 通配符选择器(`*`)

- **优先级：**

  1. `!important`
  2. 内联样式（1000）
  3. ID选择器（0100）
  4. 类选择器/属性选择器/伪类选择器（0010）
  5. 元素选择器/伪元素选择器（0001）
  6. 关系选择器/通配符选择器（0000）

带 `!important` 标记的样式属性优先级最高；样式表的来源相同时：`!important > 行内样式 > ID选择器 > 类选择器 > 标签 > 通配符 > 继承 > 浏览器默认属性`

## 渐进增强与优雅降级的理解及区别

**渐进增强（Progressive Enhancement）：**
渐进增强是一种策略，它首先构建适用于低版本浏览器的基本功能，然后逐步添加效果、交互和附加功能，以提供更好的体验。

**优雅降级（Graceful Degradation）：**
优雅降级是一种策略，它一开始构建具有完整功能的站点，然后测试和修复以确保在各种浏览器上正常运行。例如，可以使用 CSS3 的特性构建应用，然后逐步解决兼容性问题，以确保在低版本浏览器上也能正常显示。

**两者区别：**

1. **广义**：渐进增强是在某个基准线之上增加功能，而优雅降级是在基准线以下确保兼容性。
2. **狭义**：渐进增强通常涉及使用 CSS3 技术来增强用户体验，而优雅降级强调 HTML 标签的语义，以确保即使在没有 JavaScript 或 CSS 的情况下，用户也能获得相应功能。

```css
/* 例子 */
.transition { /*渐进增强写法*/
  -webkit-transition: all .5s;
  -moz-transition: all .5s;
  -o-transition: all .5s;
  transition: all .5s;
}

.transition { /*优雅降级写法*/
  transition: all .5s;
  -o-transition: all .5s;
  -moz-transition: all .5s;
  -webkit-transition: all .5s;
}
```

## 常见的兼容性问题

- 不同浏览器的标签默认的 margin 和 padding 不一样. 可以使用以下通用 CSS 重置规则来规范化默认样式：

```css
* {
  margin: 0;
  padding: 0;
}
```

- IE6 双边距 bug：块属性标签 float 后，又有横向的 margin 情况下，在 IE6 显示的 margin 比设置的大。解决方法是添加 `display: inline;` 将其转化为行内属性。

- 设置较小高度的标签（一般小于 10px），在 IE6 和 IE7 中高度可能超出自己设置的高度。解决方法是给超出高度的标签设置 `overflow: hidden;` 或者设置行高 `line-height` 小于你设置的高度。

### 超链接

超链接访问过后 hover 样式就不出现，被点击访问过的超链接样式不再具有 hover 和 active 了。解决方法是改变 CSS 属性的排列顺序: `L-V-H-A`（love-hate）。

L-V-H-A 代表：

- **L:** :link — 未访问的链接
- **V:** :visited — 已访问的链接
- **H:** :hover — 鼠标悬停在链接上
- **A:** :active — 链接被点击的瞬间

```css
/* 未访问的链接 */
a:link {
  color: blue;
  text-decoration: none; /* 去掉下划线 */
}

/* 已访问的链接 */
a:visited {
  color: purple;
}

/* 鼠标悬停在链接上 */
a:hover {
  color: red;
  text-decoration: underline; /* 添加下划线 */
}

/* 链接被点击的瞬间 */
a:active {
  color: green;
}
```

### Chrome支持小于 12px 的文字

Chrome 中文版浏览器会默认设定页面的最小字号是12px，英文版没有限制，原由 Chrome 团队认为汉字小于12px就会增加识别难度。

- 中文版浏览器 与网页语言无关，取决于用户在Chrome的设置里（chrome://settings/languages）把哪种语言设置为默认显示语言  
- 系统级最小字号 浏览器默认设定页面的最小字号，用户可以前往 chrome://settings/fonts 根据需求更改  

解决方案（3种）

1.zoom  

zoom 可以改变页面上元素的尺寸，属于真实尺寸。

其支持的值类型有：

zoom:50%，表示缩小到原来的一半
zoom:0.5，表示缩小到原来的一半

```css
.span{
  font-size: 12px;
  display: inline-block;
  zoom: 0.8;
}
```

2.transform:scale()

transform:scale()这个属性进行放缩，使用scale属性只对可以定义宽高的元素生效，所以，需要将指定元素转为行内块元素

```css
.span{
  font-size: 12px;
  display: inline-block;
  transform:scale(0.8);
}
```

3.text-size-adjust

该属性用来设定文字大小是否根据设备(浏览器)来自动调整显示大小

属性值：

- auto：默认，字体大小会根据设备/浏览器来自动调整；
- percentage：字体显示的大小
- none:字体大小不会自动调整

存在兼容性问题，chrome受版本限制，safari可以。

## CSS3 新特性

- **过渡**

```css
/* 所有属性从原始值到指定值的一个过渡，运动曲线 ease，运动时间 0.5 秒 */ 
transition: all 0.5s;
```

- **动画**

```css
/* 执行一次 logo2-line 动画，运动时间 2 秒，运动曲线为 linear */
animation: logo2-line 2s linear;
```

- **形状转换**

```css
/* transform 适用于 2D 或 3D 转换的元素 */
/* transform-origin 转换元素的位置（围绕哪个点进行转换）。默认 (x, y, z): (50%, 50%, 0) */
transform: translate(30px, 30px);
transform: rotate(30deg);
transform: scale(0.8);
```

- **选择器:nth-of-type()**

- **阴影**

文本阴影: `text-shadow: 2px 2px 2px #000;`（水平阴影，垂直阴影，模糊距离，阴影颜色）

盒子阴影: `box-shadow: 10px 10px 5px #999;`

- **边框**

```css
border-image: url(border.png);
```

- **背景**
- **文字**
- **渐变**
- **Filter（滤镜）**
- **弹性布局、栅格布局、多列布局**
- **媒体查询**

## position 属性的值及其区别

- **固定定位 (`fixed`)**：元素的位置相对于浏览器窗口是固定的，即使窗口滚动，它也不会移动。固定定位的元素不占据文档流中的空间，因此与其他元素重叠。

- **相对定位 (`relative`)**：对元素进行相对定位后，它仍然占据原始位置，但可以通过设置垂直或水平位置属性，相对于其原始位置进行移动。因此，相对定位的元素可能会覆盖其他元素。

- **绝对定位 (`absolute`)**：绝对定位的元素的位置相对于最近的已定位父元素。如果没有已定位的父元素，位置相对于文档根元素。绝对定位的元素不占据文档流中的空间，与其他元素重叠。

- **粘性定位 (`sticky`)**：元素先按照正常文档流定位，然后相对于其在流中的父级容器（BFC）和包含块（最近的块级祖先元素）定位。之后，元素在特定阈值之前表现为相对定位，在之后表现为固定定位。

- **默认定位 (`static`)**：这是默认值，元素出现在正常的文档流中，忽略 `top`, `bottom`, `left`, `right` 或 `z-index` 声明。使用 `inherit` 可以规定从父元素继承 `position` 属性的值。

## box-sizing 属性

`box-sizing` 规定了两个并排带边框的框的语法，可选值为 `content-box`, `border-box`, 或 `inherit`。

- **content-box**：宽度和高度应用于元素的内容框，内边距和边框在宽度和高度之外绘制。这是标准盒模型。

- **border-box**：宽度和高度决定了元素的边框盒，包括内边距和边框。这是 IE 盒模型。

- **inherit**：继承父元素的 `box-sizing` 值。

## CSS 盒子模型

CSS 盒子模型本质上是一个包含边距、边框、填充和实际内容的盒子。在 CSS 中有两种盒子模型：IE 盒子模型和标准 W3C 盒子模型。

在标准的盒子模型中，`width` 属性指的是内容部分的宽度。

在 IE 盒子模型中，`width` 属性表示内容、内边距和边框这三个部分的宽度。

因此，它们在计算盒子的宽度时存在差异：

- **标准盒模型：** 一个块的总宽度 = `width + margin (左右) + padding (左右) + border (左右)`

![content-box.webp](https://i.postimg.cc/G2rxY00f/content-box.webp)

- **怪异盒模型：** 一个块的总宽度 = `width + margin (左右)`（即 `width` 已经包含了 `padding` 和 `border` 值）

![border-box](https://i.postimg.cc/JzfqrDpM/border-box.webp)

## BFC（块级格式上下文）

- **BFC的概念**

  `BFC` 是 `Block Formatting Context` 的缩写，即块级格式化上下文。`BFC`是CSS布局的一个概念，是一个独立的渲染区域，规定了内部box如何布局， 并且这个区域的子元素不会影响到外面的元素。其中比较重要的布局规则有内部 box 垂直放置，计算 BFC 的高度的时候，浮动元素也参与计算。

- **BFC的原理布局规则**

  - 内部的Box会在`垂直方向`，一个接一个地放置。
  - Box`垂直方向的距离由 margin 决定`。属于同一个BFC的两个相邻Box的margin会发生重叠。
  - 每个元素的 margin box 的左边，与包含块 border box 的左边相接触（对于从左往右的格式化，否则相反）。
  - BFC的区域`不会与float box重叠`。
  - BFC是一个独立容器，容器里面的`子元素不会影响到外面的元素`。
  - 计算BFC的高度时，`浮动元素也参与计算高度`。
  - 元素的类型和`display属性，决定了这个Box的类型`。不同类型的Box会参与不同的`Formatting Context`。

- **如何创建BFC？**

  - 根元素，即HTML元素
  - float的值不为none
  - position为absolute或fixed
  - display的值为inline-block、table-cell、table-caption
  - overflow的值不为visible

- **BFC的使用场景**

  - 去除边距重叠现象
  - 清除浮动（让父元素的高度包含子浮动元素）
  - 避免某元素被浮动元素覆盖
  - 避免多列布局由于宽度计算四舍五入而自动换行

## 让一个元素水平垂直居中

- **水平居中**

  - 对于行内元素：`text-align: center;`

  - 对于确定宽度的块级元素：

    （1）通过设置 `width` 和 `margin` 实现：`margin: 0 auto;`

    （2）绝对定位和 `margin-left`: `margin-left: (父width - 子width）/2`，前提是父元素 `position: relative`。

  - 对于宽度未知的块级元素：

    （1）`使用table标签配合margin左右auto实现水平居中`。使用 `table` 标签（或直接将块级元素设为 `display: table`），再通过给该标签添加左右 `margin` 为 `auto`。

    （2）`inline-block` 实现水平居中方法。`display: inline-block` 和 `text-align: center` 实现水平居中。

    （3）`绝对定位+transform`，`translateX` 可以移动元素的50%。

    （4）flex布局使用`justify-content: center;`

- **垂直居中**

    1. 利用 `line-height` 实现居中，适合纯文本元素。
    1. 通过设置父容器相对定位，子元素设置绝对定位，并使用 `margin` 实现自适应居中。
    1. 弹性布局 `flex`：父元素设置 `display: flex;` 子元素设置 `margin` 为 `auto` 实现自适应居中。
    1. 父元素设置相对定位，子元素设置绝对定位，并使用 `transform` 进行位移来实现。
    1. `table布局`：父元素通过转换成表格形式，然后子元素设置 `vertical-align` 实现。（需要注意的是：`vertical-align: middle` 使用的前提条件是内联元素以及 `display` 值为 `table

-cell` 的元素）。

[传送门 ☞ # 图解CSS水平垂直居中常见面试方法](https://juejin.cn/post/7008348524530106381)】

## 隐藏页面中某个元素的方法

1. 使用 `opacity: 0`，该元素被隐藏，但不会改变页面布局。如果该元素已经绑定了一些事件，如 click 事件，点击该区域仍能触发相应的事件。

2. 使用 `visibility: hidden`，该元素被隐藏，但不会改变页面布局，且不会触发该元素已绑定的事件。隐藏对应元素，但在文档布局中仍保留原来的空间（重绘）。

3. 使用 `display: none`，该元素被隐藏，并会改变页面布局。这将导致对应的元素不再显示，也不再分配空间于文档布局中（回流+重绘）。

> 这个问题涉及到回流和重绘的概念。

相同点：都能控制元素在视图中的可见性

不同点：直接看图

|                  | **display: none** | **visibility: hidden** | **opacity: 0** |
| :--------------: | :---------------: | :--------------------: | :------------: |
| **是否生成盒子** |        否         |           是           |       是       |
| **是否占据空间** |        否         |           是           |       是       |
| **是否可以交互** |        否         |           否           |       是       |
| **是否参与回流** |        否         |           是           |       是       |
| **是否参与重绘** |        否         |           否           |       是       |

## 用 CSS 实现三角符号

```css
/* 记忆口诀：盒子宽高均为零，三面边框皆透明。 */
div:after {
    position: absolute;
    width: 0px;
    height: 0px;
    content: " ";
    border-right: 100px solid transparent;
    border-top: 100px solid #ff0;
    border-left: 100px solid transparent;
    border-bottom: 100px solid transparent;
}
```

## 页面布局

### Flex 布局

传统布局解决方案是基于盒状模型，依赖 `display` 属性 + `position` 属性 + `float` 属性。这种方法对于一些特殊布局不够灵活，例如，垂直居中难以实现。

Flex 是 Flexible Box 的缩写，意为"弹性布局"，它为盒状模型提供了最大的灵活性。只需要将容器指定为 `display: flex` 即可。Flex 布局分为容器属性和项目属性。

容器的属性：

- `flex-direction`：决定主轴的方向（即子项目的排列方式）：`flex-direction: row | row-reverse | column | column-reverse;`
- `flex-wrap`：决定换行规则：`flex-wrap: nowrap | wrap | wrap-reverse;`
- `flex-flow`：`.box { flex-flow: || ; }`
- `justify-content`：主轴对齐方式，决定子项目在水平主轴上的排列方式。
- `align-items`：交叉轴对齐方式，决定子项目在竖直交叉轴上的排列方式。
- `align-content`：多根轴线的对齐方式。

项目的属性（元素的属性）：

- `order` 属性：定义项目的排列顺序，数值越小排列越靠前，默认为 0。
- `flex-grow` 属性：定义项目的放大比例，即使存在多余空间，也不会放大。
- `flex-shrink` 属性：定义项目的缩小比例，当空间不足时等比例缩小，如果将项目的 `flex-shrink` 设置为 0，则不会缩小。
- `flex-basis` 属性：定义了在分配多余空间时，项目占据的空间。
- `flex`：是 `flex-grow`、`flex-shrink`、`flex-basis` 的简写，默认值为 `0 1 auto`。
- `align-self`：允许单个项目与其他项目不一样的对齐方式，可以覆盖容器的 `align-items`。
- `align-items`：默认属性为 `auto`，表示继承自父元素的 `align-items`。例如，使用 Flex 实现圣杯布局。

### Rem 布局

Rem 相对于根（html）的 `font-size` 大小来计算。简单来说，它是一个相对单位。例如，如果 `font-size` 设置为 `10px`，那么 `1rem` 就等于 `10px`。理解计算原理后，首先要解决如何在不同设备上设置 `html` 的 `font-size` 大小。Rem 布局的本质是等比缩放，通常是基于宽度。

**优点**：

- 快速适用于移动端布局，字体和图片高度等。
  
**缺点**：

1. 目前不受 IE 支持，用于 PC 页面的使用较少。
2. 数据量大：所有图片和盒子都需要明确的值，以确保适应不同设备。
3. 在响应式布局中，必须通过 JavaScript 动态控制 `html` 根元素的 `font-size`。这意味着 CSS 样式和 JavaScript 代码之间存在一定的耦合性，且必须将更改 `font-size` 的代码放在 CSS 样式之前。

### 百分比布局

百分比布局通过百分比单位 "%" 实现响应式效果。使用百分比单位可以使浏览器中的组件的宽度和高度随着浏览器大小的变化而变化，从而实现响应式效果。通常，我们可能会认为子元素的百分比相对于其直接父元素，即 `height` 百分比相对于 `height`，`width` 百分比相对于 `width`。除了 `border-radius` 外，还有其他属性，如 `transform` 和 `background-size` 等，都是相对于自身的属性。

**缺点**：

1. 难以计算。
2. 在各种属性中使用百分比时，相对于父元素的属性不是唯一的，使布局变得复杂。

### 浮动布局

浮动布局使元素浮动，可以向左或向右移动，直到其外边缘与包含它的框或另一个浮动元素的边框接触为止。浮动元素脱离了正常的文档流，因此页面中的普通流中的元素好像浮动元素不存在一样。

**优点**:

- 在图文混排时，可以实现文字环绕图片。
- 浮动元素具有块级元素的特性，如设置宽度和高度等。

**缺点**:

- 最明显的缺点是，浮动元素一旦脱离文档流，无法支撑父元素，导致父元素的高度坍塌。

### 如何使用 Rem 或 Viewport 进行移动端适配

**Rem 适配原理**：
Rem 适配是通过改变不同设备上的 CSS 像素数量来实现的。它的优点是不会破坏视口，但缺点是像素值转换为 Rem 太复杂。这个问题可以通过使用 Less 来解决。

**Viewport 适配原理**：
Viewport 适配方案中，每个元素在不同设备上占用的 CSS 像素数量相同，但 CSS 像素与物理像素的比例不同。这是一个等比缩放的适配方法。

**清除浮动的方式**:

1.添加额外标签：

```html
<div class="parent">
    <!-- 添加额外标签并设置 clear 属性 -->
    <div style="clear:both"></div>
    <!-- 或者添加 <br> 标签 -->
</div>
```

2.父级添加 `overflow` 属性或设置高度。

3.使用伪类选择器清除浮动：

```css
/* 在 CSS 中添加 :after 伪元素 */
.parent:after {
    content: '';
    display: block;
    height: 0;
    visibility: hidden;
    clear: both;
}
```

### CSS 预处理器 Sass、Less、Stylus 的区别

CSS 预处理器是一种语言，用于为 CSS 添加一些增强特性，无需考虑浏览器兼容性问题，例如变量、简单程序逻辑、函数等。下面是它们的基本区别：

- 扩展名：Sass 使用 `.sass` 扩展名，Less 使用 `.less` 扩展名，Stylus 使用 `.styl` 扩展名。

- 变量：Sass 变量以 `$` 开头，Less 变量以 `@` 开头，Stylus 变量没有特定的规定，可以是 `$` 开头，也可以是其他字符。

- 语法：Sass 和 Less 的语法更接近原生 CSS，而 Stylus 的语法更灵活，允许省略冒号和分号。

- 功能：三种预处理器都支持嵌套、运算符、颜色函数、导入、继承、混合等。Stylus 还有一些高级特性，如循环和条件判断。

总的来说，这些预处理器都有各自的特点，选择哪一个通常取决于个人偏好和项目需求。
