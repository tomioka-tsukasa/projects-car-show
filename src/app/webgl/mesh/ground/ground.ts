import * as THREE from 'three'
import { GetGround } from './groundTypes'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { LoadedAssets, setupMember } from '../../setupMember'
import { pixelRatioManager } from '@/lib/threejs/pixelRatioManager/pixelRatioManager'

/**
 * Reflector を使ったミラー素材の地面
 */
export const getReflector = (
  renderer: THREE.WebGLRenderer,
  geometry: THREE.PlaneGeometry | THREE.CircleGeometry,
): THREE.Mesh => {
  const pixelRatio = pixelRatioManager(
    renderer.domElement,
    setupMember.renderer.pixelRatio,
  )?.getPixelRatio()

  const texturePixelRatio = Math.max((pixelRatio ?? 1) / 3, setupMember.renderer.pixelRatio.groundTextureMinPixelRatio)
  console.log('[Ground] texturePixelRatio:', texturePixelRatio)

  const groundMirror = new Reflector(geometry, {
    clipBias: 0.01,
    textureWidth: window.innerWidth * texturePixelRatio,
    textureHeight: window.innerHeight * texturePixelRatio,
    color: 0xA8B0E7,
  })

  return groundMirror
}

/**
 * テクスチャを重ねる半透明 Plane
 */
export const getReflectorOverlayMesh = (
  loadedAssets: LoadedAssets,
): THREE.MeshStandardMaterial => {
  const tileRepeat = new THREE.Vector2(6, 6)

  const overlayMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    opacity: 0.76,
    roughnessMap: loadedAssets.textures['Concrete_Tiles_Glossiness'],
    normalMap: loadedAssets.textures['Concrete_Tiles_Normal'],
    map: loadedAssets.textures['Concrete_Tiles_Diffuse'],
    metalnessMap: loadedAssets.textures['Concrete_Tiles_Reflect'],
    normalScale: new THREE.Vector2(1, 1),
    envMap: loadedAssets.envmaps[setupMember.world.material.environment],
    envMapIntensity: setupMember.world.material.envmapIntensity,
    depthWrite: false,
    side: THREE.FrontSide,
    metalness: 1.0,
    color: 0xaaaaaa,
  })

  const maps = [
    overlayMaterial.map,
    overlayMaterial.normalMap,
    overlayMaterial.roughnessMap,
    overlayMaterial.metalnessMap,
  ]

  maps.forEach((texture) => {
    if (texture) {
      texture.repeat.copy(tileRepeat)
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      texture.needsUpdate = true
    }
  })

  return overlayMaterial
}

export const getGround: GetGround = (
  renderer,
  loadedAssets
) => {
  const geometry = new THREE.PlaneGeometry(200, 200, 1, 1)
  const groundMirror = getReflector(renderer, geometry)

  // テクスチャを重ねる半透明 Plane
  const overlayMaterial = getReflectorOverlayMesh(loadedAssets)
  const overlayMesh = new THREE.Mesh(geometry, overlayMaterial)
  overlayMesh.position.z = 0.01

  // グループメッシュ
  const mesh = new THREE.Group()
  mesh.add(groundMirror, overlayMesh)
  mesh.rotation.x = -Math.PI / 2
  mesh.position.y = 0.01

  return mesh
}

export const cloneReflectorPlane = (
  renderer: THREE.WebGLRenderer,
  name: string,
  model: GLTF,
  loadedAssets?: LoadedAssets,
): THREE.Group | null => {
  const originalMesh = model.scene.getObjectByName(name)

  if (originalMesh && originalMesh instanceof THREE.Mesh && loadedAssets) {
    const originalGeometry = originalMesh.geometry

    // 頂点情報を複製
    const copiedGeometry = originalGeometry.clone()

    // 新しいメッシュとして作成
    const reflectorMesh = getReflector(renderer, copiedGeometry)

    // テクスチャを重ねる半透明 Plane
    const overlayMaterial = getReflectorOverlayMesh(loadedAssets)
    const overlayMesh = new THREE.Mesh(copiedGeometry, overlayMaterial)
    overlayMesh.position.y = 0.01

    // グループメッシュ
    const mesh = new THREE.Group()
    mesh.add(reflectorMesh, overlayMesh)

    // 位置・回転・スケールをコピー
    mesh.position.copy(originalMesh.position)
    mesh.rotation.copy(originalMesh.rotation)
    mesh.scale.copy(originalMesh.scale)

    // 親子構造を再現したい場合
    // mesh.matrix.copy(originalMesh.matrix)
    // mesh.matrixAutoUpdate = false // マトリクスをそのまま使うとき

    // オリジナルメッシュを非表示にする
    originalMesh.visible = false

    return mesh
  }

  // メッシュが見つからない場合は null を返す
  return null
}

export const cloneReflectorCircle = (
  renderer: THREE.WebGLRenderer,
  name: string,
  model: GLTF,
  loadedAssets?: LoadedAssets,
): THREE.Group | null => {
  const originalMesh = model.scene.getObjectByName(name)

  if (originalMesh && originalMesh instanceof THREE.Mesh && loadedAssets) {

    // メッシュの半径を取得
    const box = new THREE.Box3().setFromObject(originalMesh)
    const size = new THREE.Vector3()
    box.getSize(size) // size.x, size.y, size.z に幅が入る
    const diameter = size.x // もしくは size.y など、目的に応じて
    const radius = diameter / 2

    // 円形のジオメトリを作成
    const geometry = new THREE.CircleGeometry(radius, 100)

    // 新しいメッシュとして作成
    const reflectorMesh = getReflector(renderer, geometry)

    // テクスチャを重ねる半透明 Plane
    const overlayMaterial = getReflectorOverlayMesh(loadedAssets)
    const overlayMesh = new THREE.Mesh(geometry, overlayMaterial)
    overlayMesh.position.z = 0.01

    // グループメッシュ
    const mesh = new THREE.Group()
    mesh.add(reflectorMesh, overlayMesh)

    // 位置・回転・スケールの調整
    mesh.position.copy(originalMesh.position)
    mesh.rotation.copy(originalMesh.rotation)
    mesh.scale.copy(originalMesh.scale)

    // オリジナルメッシュを非表示にする
    originalMesh.visible = false

    return mesh
  }

  return null
}
