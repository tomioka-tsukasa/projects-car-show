import { cameraWork } from './setup/cameraWork'
import { LoadingObject, LoadingObjects } from './loading/loadingManagerTypes'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DataTexture, Texture } from 'three'
import { WebGLCtrl } from './webglTypes'
import { GetSpotLight } from './setup/lights/lightsTypes'

/**
 * WebGLセットアップメンバー
 */
export const setupMember = {
  gui: {
    active: false,
    stats: false,
  },
  renderer: {
    active: true,
    shadow: false,
    toneMapping: 0.7,
    pixelRatio: {
      baseSize: {
        width: 1920,
        height: 1080,
      },
      wishPixelRatioPercent: 0.8,
      mobileWishPixelRatioPercent: 0.65,
      minPixelRatio: 0.8,
      groundTextureMinPixelRatio: 0.6,
    },
    groundReflection: true,
    debug: false,
    debugPixelRatioPercent: 0.5,
    targetFps: 30,
    fpsLog: false,
  },
  light: {
    directionalLight: {
      scene: false,
      helper: false,
    },
    spotLightEmblem: {
      scene: true,
      helper: false,
    },
  },
  camera: cameraWork,
  controls: {
    enabled: false,
    autoRotate: false,
    debug: false,
  },
  scene: {
    environment: '',
    background: false,
    environmentIntensity: 0.1,
  },
  postprocess: {
    active: true,
    bloomPass: {
      active: true,
      strength: 0.3,
      radius: 0.1,
      threshold: 0.85,
    },
  },
  world: {
    material: {
      environment: 'stierberg_sunrise_1k',
      envmapIntensity: 0.2,
      bloom: {
        common: 8,
        stage: 6,
      },
    },
  },
  car: {
    controls: {
      autoRotate: true,
    },
    material: {
      environment: 'stierberg_sunrise_1k',
      envmapIntensity: 1.0,
    },
  },
}

export const lightsMember: Record<string, Required<Parameters<GetSpotLight>[0]>> = {
  spotLightEmblem: {
    parameters: {
      color: '#ffffff',
      intensity: 17,
      distance: 100,
      angle: 0.42,
      decay: 0.98,
      penumbra: 1,
    },
    position: {
      x: 0,
      y: 40,
      z: -40,
    },
    target: {
      x: 0,
      y: 20,
      z: -100,
    },
    shadow: {
    }
  },
  _02: {
    parameters: {
      color: '#ffffff',
      intensity: 100,
      distance: 100,
      angle: Math.PI / 4.2,
      decay: 0.2,
      penumbra: 1,
    },
    position: {
      x: 0,
      y: 14,
      z: 14,
    },
    target: {
      x: 0,
      y: 0,
      z: 0,
    },
    shadow: {
    }
  },
}

/**
 * WebGL管理オブジェクト
 */
export const webglCtrl: WebGLCtrl = {
  renderer: null,
  camera: null,
  scene: null,
  envmaps: null,
  textures: null,
  controls: null,
  car: null,
  world: null,
}

/**
 * 3Dモデル
 */
export const loadingModels: Array<LoadingObject> = [
  {
    name: 'car',
    path: '/assets/models/car/scene.glb',
  },
  {
    name: 'world',
    path: '/assets/models/world/scene.glb',
  },
]

/**
 * 環境テクスチャ
 */
export const loadingEnvmaps: Array<LoadingObject> = [
  {
    name: 'blocky_photo_studio_1k',
    path: '/assets/envmap/blocky_photo_studio_1k.hdr',
  },
  {
    name: 'bambanani_sunset_1k',
    path: '/assets/envmap/bambanani_sunset_1k.hdr',
  },
  {
    name: 'stierberg_sunrise_1k',
    path: '/assets/envmap/stierberg_sunrise_1k.hdr',
  },
]

/**
 * テクスチャ
 */
export const loadingTextures: Array<LoadingObject> = [
  {
    name: 'Poliigon_PlasterPainted_7664_Metallic',
    path: '/assets/textures/Poliigon_PlasterPainted_7664_Metallic.jpg',
  },
  {
    name: 'Poliigon_PlasterPainted_7664_Roughness',
    path: '/assets/textures/Poliigon_PlasterPainted_7664_Roughness.jpg',
  },
  {
    name: 'Poliigon_PlasterPainted_7664_Normal',
    path: '/assets/textures/Poliigon_PlasterPainted_7664_Normal.png',
  },
  {
    name: 'Poliigon_PlasterPainted_7664_BaseColor',
    path: '/assets/textures/Poliigon_PlasterPainted_7664_BaseColor.jpg',
  },
  {
    name: 'Concrete_Tiles_Bump',
    path: '/assets/textures/Concrete_Tiles_Bump.png',
  },
  {
    name: 'Concrete_Tiles_Normal',
    path: '/assets/textures/Concrete_Tiles_Normal.png',
  },
  {
    name: 'Concrete_Tiles_Diffuse',
    path: '/assets/textures/Concrete_Tiles_Diffuse.png',
  },
  {
    name: 'Concrete_Tiles_Glossiness',
    path: '/assets/textures/Concrete_Tiles_Glossiness.png',
  },
  {
    name: 'Concrete_Tiles_Reflect',
    path: '/assets/textures/Concrete_Tiles_Reflect.png',
  },
]

/**
 * ローディングの型定義
 */
export const loadingAssets = {
  models: loadingModels,
  envmaps: loadingEnvmaps,
  textures: loadingTextures,
}

export type LoadingAssets = {
  models: LoadingObjects,
  envmaps: LoadingObjects,
  textures: LoadingObjects,
}

export type LoadedAssets = {
  models: {
    [key: string]: LoadedModel
  },
  envmaps: {
    [key: string]: LoadedEnvmap
  },
  textures: {
    [key: string]: LoadedTexture
  },
}

export type LoadedModel = GLTF

export type LoadedEnvmap = DataTexture

export type LoadedTexture = Texture
