# Three.js 代码示例

> 参考：[探索three.js](https://discoverthreejs.com/zh/)

![Three.js](https://pic.imgdb.cn/item/65f107229f345e8d03698e00.gif)

## 世界应用

- 世界类
  - 创建场景
  - 创建相机
  - 创建渲染器
  - 创建控制器
  - 创建动画循环
  - 创建灯光
  - 创建响应性
  - 创建 GUI 调试工具
  - 创建性能监视工具
  - 加载模型
  - 使用

## 创建场景

```js
import { Scene, Color } from 'three'

import type { TCreateScene } from '@types'

/**
 * 创建场景
 */
export const createScene = (options: TCreateScene = { background: new Color('skyblue') }) => {
  const scene = new Scene()

  scene.background = options.background ?? scene.background

  return scene
}
```

## 创建相机

```js
import { PerspectiveCamera, Vector3 } from 'three'

import type { TCreateCamera } from '@types'

/**
 * 创建相机
 */
export const createCamera = (options: TCreateCamera = { position: new Vector3(0, 10, 10) }) => {
  const { position } = options
  const camera = new PerspectiveCamera(45, 1, 1, 1000)

  if (position?.x) {
    camera.position.set(position.x, position.y, position.z)
  }

  return camera
}
```

## 创建渲染器

```js
import { WebGLRenderer } from 'three'

/**
 * 创建渲染器
 */
export const createRenderer = () => {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })

  renderer.setPixelRatio(window.devicePixelRatio)

  return renderer
}
```

## 创建控制器

```js
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import type { TCreateControls } from '@types'

/**
 * 创建控制器
 */
export const createControls = (options: TCreateControls) => {
  const { camera, canvas, target } = options
  const controls = new OrbitControls(camera, canvas)

  controls.target.set(target.x, target.y, target.z)

  // 启用阻尼
  controls.enableDamping = true
  controls.dampingFactor = 0.5

  controls.tick = () => controls.update()

  return controls
}
```

## 创建动画循环

```js
import { Clock } from 'three'

const clock = new Clock()

/**
 * 更新类
 */
export default class Loop {
  private renderer: THREE.WebGLRenderer
  private loopRenderer: () => void

  /** 可更新的 */
  public updatables: Set<any>

  constructor(renderer: THREE.WebGLRenderer, loopRenderer: () => void) {
    this.renderer = renderer
    this.loopRenderer = loopRenderer

    this.updatables = new Set<any>()
  }

  public start() {
    this.renderer.setAnimationLoop(() => {
      this.tick()

      this.loopRenderer()
    })
  }

  public stop() {
    this.renderer.setAnimationLoop(null)
  }

  private tick() {
    const delta = clock.getDelta()

    for (const object of this.updatables.values()) {
      object.tick(delta)
    }
  }
}
```

## 创建灯光

```js
import { DirectionalLight, HemisphereLight } from 'three'

/**
 * 创建定向光光源
 */
export const createLights = () => {
  // 半球光
  const hemisphereLight = new HemisphereLight('white', 'darkslategrey', 5)
  // 定向光
  const directionalLight = new DirectionalLight('white', 4)

  directionalLight.position.set(10, 10, 10)

  directionalLight.tick = (delta: number) => {}

  return { directionalLight, hemisphereLight }
}
```

## 创建响应性

```js
/**
 * 缩放类
 */
export default class Resizer {
  constructor(container: Element, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    this.setSize(container, camera, renderer)

    window.addEventListener('resize', () => {
      this.setSize(container, camera, renderer)

      // this.onResize()
    })
  }

  /**
   * 自定义操作
   */
  onResize() {}

  setSize(container: Element, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    const { clientWidth, clientHeight } = container

    camera.aspect = clientWidth / clientHeight

    camera.updateProjectionMatrix()

    renderer.setSize(clientWidth, clientHeight)

    renderer.setPixelRatio(window.devicePixelRatio)
  }
}
```

## 创建 GUI 调试工具

```js
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

/**
 * 创建光源 GUI
 */
export const createLightsGUI = (gui: GUI, ...lights: any[]) => {
  const [hemisphereLight, directionalLight] = lights

  const folderAmbient = gui.addFolder('半球光')
  folderAmbient.close()
  folderAmbient.addColor(hemisphereLight, 'color')
  folderAmbient.add(hemisphereLight, 'intensity', 0, 2.0, 0.1)

  if (directionalLight) {
    const folderDirectional = gui.addFolder('平行光')
    folderDirectional.close()
    folderDirectional.addColor(directionalLight, 'color')
    folderDirectional.add(directionalLight, 'intensity', 0, 100, 0.1)
    folderDirectional.add(directionalLight.position, 'x', -300, 300, 1)
    folderDirectional.add(directionalLight.position, 'y', -300, 300, 1)
    folderDirectional.add(directionalLight.position, 'z', -300, 300, 1)
  }
}
```

## 创建性能监视工具

```js
import Stats from 'three/examples/jsm/libs/stats.module.js'

/**
 * 创建性能监视
 * @description
 *   FPS: 最后一秒渲染的 FPS 帧。数字越高越好。
 *   MS: 渲染一帧所需的毫秒数。数字越低越好。
 *   MB: MB 已分配内存的兆字节数。
 */
export const createStats = (position: 'tl' | 'tr' | 'bl' | 'br' = 'bl') => {
  const stats = new Stats()

  stats.showPanel(0)

  const positions = {
    tl: { top: '0px', right: 'auto', bottom: 'auto', left: '0px' },
    tr: { top: '0px', right: '0px', bottom: 'auto', left: 'auto' },
    bl: { top: 'auto', right: 'auto', bottom: '0px', left: '0px' },
    br: { top: 'auto', right: '0px', bottom: '0px', left: 'auto' }
  }

  Object.assign(stats.dom.style, {
    position: 'absolute',
    ...positions[position]
  })

  document.body.appendChild(stats.dom)

  return stats
}
```

## 加载模型

```js
import ModelLoader from '@utils/loader-model'
import { AnimationMixer, Vector3 } from 'three'

import type { TLoaderModel, THandleModelEffect, TLoadAllModels } from '@types'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

/**
 * 加载全部模型
 */
export const loadAllModels = (options: TLoadAllModels) => {
  const floorLoadList: TLoaderModel[] = [
    {
      name: '鹦鹉',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Parrot.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'PARROT')
    },
    {
      name: '鹳',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Stork.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'STORK')
    },
    {
      name: '火烈鸟',
      type: 'glb',
      url: 'src/assets/3d/models/birds/Flamingo.glb',
      dracoUrl: 'src/assets/3d/draco/',
      onLoad: <T extends GLTF>(value1: T) => handleFModelEffect(value1, options, 'FLAMINGO')
    }
  ]

  return new Promise<boolean>((resolve, reject) => {
    try {
      ModelLoader.handleIterateLoaderModel({
        list: floorLoadList,
        onAllLoad: () => {
          resolve(true)
        },
        onAllProgress(event, index) {
          // 计算加载进度百分比
          const progress = (event.loaded / event.total) * 100

          console.log('🚀 ~ onAllProgress ~ progress:', progress)
        }
      })
    } catch (error) {
      console.log('🚀 ~ loadAllModels ~ error:', error)
      reject(error)
    }
  })
}

const stupeModel = (data: GLTF) => {
  if (!data || !data.scene) return void 0

  const model = data.scene.children[0]
  const clip = data.animations[0]

  const mixer = new AnimationMixer(model)
  const action = mixer.clipAction(clip)

  action.reset().play()

  // @ts-ignore
  model.tick = (delta: number) => {
    mixer.update(delta)
  }

  return model
}

/**
 * 处理模型效果
 */
export const handleFModelEffect = (
  value: GLTF,
  options: THandleModelEffect,
  type: 'PARROT' | 'STORK' | 'FLAMINGO'
) => {
  const { scene, loop } = options

  if (!scene || !loop) return

  const model = stupeModel(value)

  if (!model) return

  const defPosition = {
    PARROT: new Vector3(0, 0, 0.25),
    STORK: new Vector3(7.5, 0, -10),
    FLAMINGO: new Vector3(0, 2.5, -10)
  }
  const pos = defPosition[type]

  model.position.set(pos.x, pos.y, pos.z)

  scene.add(model)
  loop.updatables.add(model)
}
```

## 世界类

汇总上述所有方法...

```js
import { createCamera } from '@components/camera'
import { createScene } from '@components/scene'
import { createAxesHelper } from '@components/helpers'
import { createStats } from '@components/stats'
import { createLights } from '@components/lights'
import { createLightsGUI } from '@components/gui'

import { createRenderer } from '@systems/renderer'
import Resizer from '@systems/resizer'
import Loop from '@systems/loop'
import { createControls } from '@systems/controls'

import { load } from '@containers/birds'

import { Vector3 } from 'three'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'

import type { PerspectiveCamera, WebGLRenderer, Scene } from 'three'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * 世界类
 */
export default class BaseWorld {
  /** 摄像机 */
  public camera: PerspectiveCamera
  /** 摄像机默认位置 */
  public defaultCameraPosition = new Vector3(-1, 1.5, 6.5)
  /** 渲染器 */
  public renderer: WebGLRenderer
  /** 场景 */
  public scene: Scene
  /** 控制器 */
  public controls: OrbitControls
  /** 控制器默认位置 */
  public defaultControlsPosition = new Vector3(0, 0, 0)
  /** 挂载元素 */
  public el: HTMLDivElement
  /** 循环类 */
  public loop: Loop
  /** 调试类 */
  public gui: GUI

  /** 性能监视 */
  private stats?: Stats

  /** 是否为生产模式 */
  public isProd: boolean

  constructor(element: HTMLDivElement, isProd = false) {
    this.isProd = isProd

    this.gui = new GUI()
    this.camera = createCamera({ position: this.defaultCameraPosition })
    this.renderer = createRenderer()
    this.scene = createScene()
    this.controls = createControls({
      camera: this.camera,
      canvas: this.renderer.domElement,
      target: this.defaultControlsPosition
    })
    this.el = element
    this.loop = new Loop(this.renderer, () => this.render())

    element.append(this.renderer.domElement)

    const { directionalLight, hemisphereLight } = createLights()

    this.scene.add(directionalLight, hemisphereLight)

    this.loop.updatables.add(this.controls)

    new Resizer(element, this.camera, this.renderer)

    if (!isProd) {
      this.stats = createStats('tl')
      this.scene.add(createAxesHelper(500))
      this.loop.updatables.add(this.handleStats())

      createLightsGUI(this.gui, hemisphereLight, directionalLight)
    } else {
      this.gui.hide()
    }
  }

  public async init() {
    const { scene, renderer, loop } = this

    await load.loadAllModels({ scene, renderer, loop })
  }

  public render() {
    this.renderer.render(this.scene, this.camera)
  }

  public start() {
    this.loop.start()
  }

  public stop() {
    this.loop.stop()
  }

  private handleStats() {
    return {
      tick: () => this.stats?.update()
    }
  }
}
```

## 使用

```js
import './style.css'

import BaseWorld from '@worlds/base-world'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `<div class="container" id="container"></div>`

const init = async () => {
  const ele = document.querySelector<HTMLDivElement>('#container')

  if (ele) {
    const world = new BaseWorld(ele, false)

    await world.init()

    world.start()
  }
}

init()
```

## 备注

Three.js 示例，可能尚未完善，欢迎提供反馈和建议！[完整代码](https://github.com/1442916418/threejs-example)
