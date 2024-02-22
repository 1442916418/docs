# Three.js

## 什么是 Three.js？

`Three.js` 是一个基于 `WebGL` 的 JavaScript 库，它提供了一套易于使用的 API 来在网页上创建和显示 3D 图形。通过抽象 `WebGL` 的复杂性，`Three.js` 使得开发者能够快速开发3D应用，而无需深入了解 `WebGL` 的底层细节。

## 如何在 Three.js 中创建一个基本的场景？

这段代码创建了一个包含绿色立方体的基本场景，并将摄像机后退以便于观察立方体。

```js
// 创建一个场景
const scene = new THREE.Scene()

// 创建一个带有透视摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

// 创建一个 WebGL 渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// 添加一个立方体
const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

// 渲染循环
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}
animate()
```

## `Three.js` 中的 `Mesh` 是什么？

`Mesh` 是 `Three.js` 中的一个基本概念，表示一个由几何体（Geometry）和材质（Material）组合而成的3D物体。几何体定义了物体的形状，而材质定义了表面的外观（如颜色、纹理）。

## 解释 Three.js 中的光源类型

`Three.js` 提供了多种光源，以支持不同的照明需求，包括：

- `AmbientLight` 环境光：提供无方向的光源，影响场景中所有物体的颜色。  
- `PointLight` 点光源：从一个点向所有方向发散光线，类似于灯泡。  
- `DirectionalLight` 平行光：模拟远处的光源（如太阳），发出平行光线。  
- `SpotLight` 聚光灯：从一个点向特定方向发射光线，形成一个锥形照明区域。  
- `HemisphereLight` 半球光：模拟天空和地面之间的光照渐变。

## 如何在 Three.js 中添加纹理？

这段代码使用 `TextureLoader` 加载一个纹理，并将其应用于一个材质，最后将材质应用于一个几何体来创建带有纹理的 `Mesh`

```js
const textureLoader = new THREE.TextureLoader()

textureLoader.load('textures/texture.jpg', function(texture) {
  const geometry = new THREE.BoxGeometry()
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
})
```

## 什么是 MeshBasicMaterial？

`MeshBasicMaterial` 是 `Three.js` 中最简单的材质之一，它不考虑场景中的光照，因此不会产生阴影。这种材质常用于创建不需要反应光照效果的物体，例如，用于测试、调试或那些不需要复杂光照的场景。

## 如何给材质添加颜色？

给材质添加颜色可以通过设置材质的 `color` 属性。例如，使用 `MeshLambertMaterial` 并设置其颜色为红色：

这将创建一个红色的MeshLambertMaterial材质，它会与场景中的光源交互产生光照效果。

```js
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 })
```

## 如何让材质看起来是透明的？

要创建透明材质，需要将材质的 `transparent` 属性设置为 `true`，并设置 `opacity` 属性来控制透明度（0.0 完全透明，1.0 完全不透明）。

```js
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 })
```

## MeshLambertMaterial 与 MeshPhongMaterial 有什么区别？

`MeshLambertMaterial` 是一种考虑光照的材质，适用于大多数非发光物体，它进行的是简化的、非真实的光照计算，主要反映漫反射光。

`MeshPhongMaterial` 提供了更复杂的光照模型，包括镜面高光，适用于需要表现光滑、反光表面的物体。

## 如何给材质添加纹理？

给材质添加纹理需要使用 `TextureLoader` 加载纹理图片，然后将加载的纹理设置给材质的 `map` 属性。

```js
const texture = new THREE.TextureLoader().load('path/to/texture.jpg')
const material = new THREE.MeshBasicMaterial({ map: texture })
```

## 什么是 ShaderMaterial 和 RawShaderMaterial？

`ShaderMaterial` 和 `RawShaderMaterial` 都允许开发者自定义材质的着色器程序。`ShaderMaterial` 使用 `Three.js` 的着色器语言模板，自动包含了 `Three.js` 环境中的一些默认 `uniforms` 和 `attributes`。`RawShaderMaterial` 则不包括这些默认值，给予开发者更高级的控制，适用于需要完全自定义着色器代码的场景。

## 如何实现材质的环境贴图效果？

环境贴图(Reflection or Refraction)可以通过设置材质的 `envMap` 属性实现，通常与 `CubeTextureLoader` 一起使用，加载六个方向的纹理图像作为环境贴图。

```js
const cubeTextureLoader = new THREE.CubeTextureLoader()
const textureCube = cubeTextureLoader.load([
  'px.jpg', 'nx.jpg',
  'py.jpg', 'ny.jpg',
  'pz.jpg', 'nz.jpg'
])

const material = new THREE.MeshBasicMaterial({ color: 0xffffff, envMap: textureCube })
```

## 如何使用 PBR（基于物理的渲染）材质？

`Three.js` 提供了 `MeshStandardMaterial` 和 `MeshPhysicalMaterial` 两种基于物理的渲染(PBR)材质，它们提供了更真实的材质外观，通过模拟真实世界的光照和反射。

这些材质的参数，如 `metalness` 金属度和 `roughness` 粗糙度，可以调整材质的光照和反射特性，以适应不同的物理特性。

```js
const material = new THREE.MeshStandardMaterial({
  color: 0x0055ff,
  metalness: 0.5,
  roughness: 0.5
})
```

## 解释 Three.js 中的相机类型及其用途

`Three.js` 提供了两种主要的相机类型：

- `PerspectiveCamera` 透视相机：模拟人眼所见的透视效果，远处的物体看起来比近处的小。适用于大多数 3D 场景。  
- `OrthographicCamera` 正交相机：所有的物体无论远近都以相同的尺寸渲染，没有透视效果。适合用于 2D 游戏或 UI 元素。

## 如何在 Three.js 中实现阴影效果？

要实现阴影效果，需要设置光源支持阴影，设置物体接收或产生阴影，并在渲染器上启用阴影映射。

```js
// 光源支持阴影
const light = new THREE.DirectionalLight(0xffffff, 1)
light.castShadow = true
scene.add(light)

// 设置物体产生阴影
const mesh = new THREE.Mesh(geometry, material)
mesh.castShadow = true

// 设置物体接收阴影
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.receiveShadow = true

// 在渲染器上启用阴影映射
renderer.shadowMap.enabled = true
```

## Three.js中的几何体（Geometry）和缓冲几何体（BufferGeometry）有什么区别？

`Geometry` 是 `Three.js` 中较早的几何体表示形式，易于使用和修改，但在性能上不如 `BufferGeometry`。
`BufferGeometry` 是一种更高效的几何体表示形式，直接在 **GPU** 上操作，适合处理大量的顶点数据和复杂的模型。虽然使用起来比 `Geometry` 复杂，但提供了更好的性能。

## 如何在Three.js场景中实现雾效果（Fog）？

通过设置 `scene.fog` 属性，可以向场景添加雾效果，`Fog` 用于创建线性雾效，而 `FogExp2` 创建指数雾效，提高远处物体的模糊度。

```js
// 添加线性雾效果
scene.fog = new THREE.Fog(0xffffff, 1, 100)

// 或添加指数雾效果
scene.fog = new THREE.FogExp2(0xffffff, 0.01)
```

## 如何使用 Three.js 加载外部模型？

`Three.js` 提供了多种加载器来支持不同格式的模型导入，如 `GLTFLoader` 用于加载 `.glb` 或 `.gltf` 格式的模型。

这段代码使用 `GLTFLoader` 加载 `GLTF` 模型，并将其添加到场景中。

```js
const loader = new THREE.GLTFLoader()

loader.load('model.gltf', function(gltf) {
  scene.add(gltf.scene)
})
```

## 解释 Three.js 中的渲染循环及其重要性

渲染循环是 `Three.js`应用中不断执行的循环，负责更新场景和相机状态，然后渲染更新后的场景到屏幕上。这对于创建动画和响应用户输入至关重要，确保场景能够流畅地更新和渲染。

```js
function animate() {
  requestAnimationFrame(animate)

  // 更新物体状态
  renderer.render(scene, camera)
}
animate()
```

使用 `requestAnimationFrame` 方法来实现高效的渲染循环，它会在浏览器准备好新的帧时调用。

## 在 Three.js 中如何创建和使用后处理效果？

后处理效果需要使用 `EffectComposer` 及一系列的 `Pass` 对象。首先创建一个 `EffectComposer`，然后向其添加不同的 `Pass` 来实现各种视觉效果。

这允许开发者在渲染过程中插入额外的处理步骤，比如模糊、颜色校正等。

```js
const composer = new THREE.EffectComposer(renderer)
const renderPass = new THREE.RenderPass(scene, camera)

composer.addPass(renderPass)

// 添加更多Pass以实现不同的后处理效果
```

## 什么是顶点着色器和片元着色器？

- 顶点着色器(Vertex Shader)：处理每个顶点数据的程序，如顶点位置、颜色等。它运行在渲染图形的每个顶点上，用于确定顶点的最终位置和其他顶点相关属性的处理。  
- 片元着色器(Fragment Shader)：也称为像素着色器，处理图形的每个片元（即像素或屏幕上的点）的程序。它决定每个片元的颜色及其最终输出到屏幕上的外观。

## 如何在 Three.js 中实现自定义着色器效果？

自定义着色器可以通过 `ShaderMaterial` 或 `RawShaderMaterial` 来实现，允许开发者直接编写 `GLSL` 代码来控制顶点和片元的渲染过程。

通过提供顶点着色器和片元着色器的代码，可以创建具有复杂效果的材质。

```js
const material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
  uniforms: {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() }
  }
})
```

## 如何传递 uniforms 和 attributes 到着色器？

- `Uniforms` 是从 `JavaScript` 代码传递到着色器（顶点和片元）中的全局变量，对于着色器的所有顶点和片元来说，`uniforms` 的值都是相同的。它们常用于传递如变换矩阵、光照参数或时间等信息。

- `Attributes` 是只能在顶点着色器中访问的变量，用于每个顶点传递数据，比如顶点位置、法线、纹理坐标等。每个顶点的 `attributes` 值都是唯一的。

在 `ShaderMaterial` 中，你可以通过 `uniforms` 属性传递 `uniforms`，通过定义 `attribute` 变量在顶点着色器中接收 `attributes`。

## GLSL中常用的数据类型有哪些？

GLSL（OpenGL着色语言）中常用的数据类型包括：

- 基础数据类型：`int`（整型）、`float`（浮点型）、`bool`（布尔型）  
- 向量类型：`vec2`、`vec3`、`vec4`（浮点向量）、`ivec2`、`ivec3`、`ivec4`（整型向量）、`bvec2`、`bvec3`、`bvec4`（布尔向量）  
- 矩阵类型：`mat2`、`mat3`、`mat4`  
- 采样器类型：`sampler2D`（二维纹理）、`samplerCube`（立方体纹理）

## Three.js 中的性能优化策略有哪些？

- 使用 `BufferGeometry` 代替 `Geometry`。  
- 合理使用材质和纹理，避免创建过多的材质实例。  
- 对于静态场景，使用 `MeshBasicMaterial`，不需要光照的材质。  
- 使用 `InstancedMesh` 渲染大量相同物体，减少绘制调用。  
- 限制场景中的光源数量，尤其是**阴影**产生的光源。  

## 解释 Three.js 的物理引擎集成方式

`Three.js` 本身不包含物理引擎，但可以与诸如 `cannon.js`、`ammo.js`等物理引擎集成，来为场景中的对象添加物理效果（如碰撞检测、重力）。

通过在 `Three.js` 渲染循环中更新物理引擎计算出的物体位置和旋转，可以在 3D 场景中实现物理效果。

```js
// 使用cannon.js作为物理引擎
const world = new CANNON.World()
world.gravity.set(0, -9.82, 0)

// 创建物理世界中的物体
const body = new CANNON.Body({
  mass: 1,
  shape: new CANNON.Box(new CANNON.Vec3(1, 1, 1))
})
world.addBody(body)

// 在动画循环中更新物理世界状态
function animate() {
  world.step(1/60)
  // 更新Three.js场景中物体的位置
}
```
