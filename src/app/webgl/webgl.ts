import * as THREE from 'three'

// セットアップ
import { getCamera, getControls, getRenderer, getCameraInfo, getSpotLight } from './setup/setup'
import { lightsMember, loadingAssets, setupMember, webglCtrl } from './setupMember'
import { CreateWebGL, InitWebGL } from './webglTypes'

// ポストプロセッシング
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

// パフォーマンス
import Stats from 'stats.js'
import { setFpsManager } from '@/lib/threejs/setFpsManager/setFpsManager'

// ローディング
import { loadingManager } from './loading/loadingManager'

// メッシュ
import { getCar } from './mesh/car/car'
import { getWorld } from './mesh/world/world'

// GUI
import { setSceneGUI } from './gui/setter/scene/setSceneGUI'
import { setCameraGUI } from './gui/setter/camera/setCameraGUI'
import { setPostprocessGUI } from './gui/setter/postprocess/setPostprocessGUI'
import { setSpotLightGUI } from './gui/setter/spotLight/spotLightGUI'
import { fixCamerawork } from '@/lib/threejs/fixCamerawork/fixCamerawork'

/**
 * 【WebGLの初期化】
 * ・全ての処理が完了した後に loadingComplete を呼び出す
 * ・グローバルストア等で完了通知を行う想定
 */
const initWebGL: InitWebGL = (
  loadingComplete,
  loadedAssets,
) => {
  const canvas = document.querySelector('#canvas') as HTMLCanvasElement

  if (!canvas) {
    console.error('canvas not found')

    return
  }

  /**
   * Stats
   */
  const stats = new Stats()
  stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
  if (setupMember.gui.stats) {
    document.body.appendChild(stats.dom)
  }

  /**
   * FPS マネージャー
   */
  const fpsManager = setFpsManager({
    log: setupMember.renderer.fpsLog,
  })

  /**
   * シーン
   */
  const scene = new THREE.Scene()
  if (setupMember.scene.environment) {
    // シーン設定
    scene.environment = loadedAssets.envmaps[setupMember.scene.environment] || null
    scene.background = setupMember.scene.background ? loadedAssets.envmaps[setupMember.scene.environment] : null
    scene.environmentIntensity = setupMember.scene.environmentIntensity

    // シーンのGUI設定
    setSceneGUI(
      scene,
      loadedAssets.envmaps[setupMember.scene.environment],
      {
        environmentIntensity: setupMember.scene.environmentIntensity,
        background: setupMember.scene.background,
      },
    )
  }

  /**
   * レンダラー
   */
  const renderer = getRenderer(
    canvas,
    setupMember.renderer,
  )

  /**
   * カメラ設定
   */
  const cameraWork = fixCamerawork(
    setupMember.camera.default.position,
    setupMember.camera.default.target,
    setupMember.camera.default.rotation,
  )

  const camera = getCamera({
    position: cameraWork.position,
  })
  const controls = getControls(
    camera,
    renderer,
    cameraWork.target,
  )
  setCameraGUI(camera, cameraWork)

  // カメラの動きをログに出力
  getCameraInfo(camera, controls)

  // カメラをシーンに追加
  scene.add(
    camera,
  )

  /**
   * 光源設定
   */
  const spotLightEmblem = getSpotLight(lightsMember.spotLightEmblem)
  const spotLightEmblemHelper = new THREE.SpotLightHelper(spotLightEmblem)
  setSpotLightGUI(
    'spotLightEmblem',
    spotLightEmblem,
    lightsMember.spotLightEmblem
  )

  if (setupMember.light.spotLightEmblem.scene) {
    scene.add(
      spotLightEmblem,
    )
  }

  if (setupMember.light.spotLightEmblem.helper) {
    scene.add(
      spotLightEmblemHelper,
    )
  }

  /**
   * 環境光設定
   */
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
  directionalLight.position.set(0, 20, -50)
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

  if (setupMember.light.directionalLight.scene) {
    scene.add(directionalLight)
  }

  if (setupMember.light.directionalLight.helper) {
    scene.add(directionalLightHelper)
  }

  /**
   * メッシュ設定
   */
  const car = getCar(loadedAssets.models.car, loadedAssets)
  const world = getWorld(loadedAssets.models.world, loadedAssets)

  scene.add(
    camera,
    car.scene,
    world.scene,
  )

  /**
   * ポストプロセッシング
   */
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), // サイズ
    setupMember.postprocess.bloomPass.strength, // 強さ
    setupMember.postprocess.bloomPass.radius, // ブルームの半径
    setupMember.postprocess.bloomPass.threshold, // ブルームの強さ
  )
  composer.addPass(bloomPass)

  // GUI設定
  setPostprocessGUI(
    bloomPass,
    {
      bloomPass: setupMember.postprocess.bloomPass
    },
  )

  /**
   * アニメーション
   */
  let prevTime = performance.now()
  const targetFPS = 60

  const renderProcess = () => {
    if (setupMember.postprocess.active) {
      // ポストプロセッシングレンダリングを実行
      composer.render()
    } else {
      // 通常レンダリングを実行
      renderer.render(scene, camera)
    }
  }

  if (!setupMember.renderer.active) {
    fpsManager.rendering(0, renderProcess)
  }

  function animate(
    timestamp: number,
  ) {
    // レンダリングを停止している場合はアニメーションを停止
    if (!setupMember.renderer.active) {
      return
    }

    /**
     * パフォーマンス管理
     */
    stats.begin()
    const currentTime = performance.now()
    const delta = (currentTime - prevTime) / 1000 // 秒単位
    const deltaFPS = delta * targetFPS
    prevTime = currentTime

    /**
     * モデルアニメーション
     */
    if (setupMember.car.controls.autoRotate) {
      car.scene.rotation.y += 0.005 * deltaFPS
    }

    /**
     * アップデート関数
     */
    controls.update()
    controls.enabled = setupMember.controls.enabled
    controls.autoRotate = setupMember.controls.autoRotate

    if (setupMember.light.spotLightEmblem.helper) {
      spotLightEmblemHelper.update()
    }

    if (setupMember.light.directionalLight.helper) {
      directionalLightHelper.update()
    }

    /**
     * レンダリング
     */
    fpsManager.rendering(timestamp, renderProcess)

    /**
     * パフォーマンス
     */
    stats.end()
  }
  renderer.setAnimationLoop(animate)

  /**
   * 管理オブジェクト設定
   */
  webglCtrl.renderer = renderer
  webglCtrl.camera = camera
  webglCtrl.scene = scene
  webglCtrl.envmaps = loadedAssets.envmaps
  webglCtrl.textures = loadedAssets.textures
  webglCtrl.controls = controls
  webglCtrl.car = car
  webglCtrl.world = world

  /**
   * 初期化完了通知
   */
  loadingComplete()
}

/**
 * 【WebGLを生成】
 * ・<Canvas /> コンポーネントで一度だけ実行される想定
 * ・モデル等全てのローディングを loadingManager で処理した後に initWebGL を実行
 */
export const createWebGL: CreateWebGL = (
  loadingComplete,
) => {
  loadingManager(
    (loadedAssets) => {
      initWebGL(
        loadingComplete,
        loadedAssets,
      )
    },
    loadingAssets,
  )
}
