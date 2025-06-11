import { GetWorld } from './worldTypes'
import * as THREE from 'three'
import { setWorldGUI } from '../../gui/setter/world/setWorldGUI'
import { setupMember } from '../../setupMember'
import { cloneReflectorCircle } from '../ground/ground'

/**
 * 【WorldGLTF セッティング】
 * ・メッシュ設定
 * ・GUI 設定
 */
export const getWorld: GetWorld = (
  renderer,
  model,
  loadedAssets,
) => {
  console.log('>> world Object', model)

  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (loadedAssets) {
        child.material.envMap = loadedAssets.envmaps[setupMember.world.material.environment] || null
        child.material.envMapIntensity = setupMember.world.material.envmapIntensity
      }

      /**
       * マテリアル設定
       */
      if (child.material.name === 'Bloom_Common') {
        child.material.emissiveIntensity = setupMember.world.material.bloom.common
      }

      if (child.material.name === 'Bloom_Stage') {
        child.material.emissiveIntensity = setupMember.world.material.bloom.stage
      }

      if (child.material.name === 'Table') {
        // child.material.environmentIntensity = 10
      }
    }
  })

  /**
   * Reflector 生成
   */
  const reflector = cloneReflectorCircle(renderer, 'Table_Reflector', model, loadedAssets)
  if (reflector) {
    reflector.visible = setupMember.renderer.groundReflection
    reflector.name = 'Ground_Reflector'
    model.scene.add(reflector)
  }

  /**
   * GUI
   */
  setWorldGUI(
    model,
    setupMember.world,
  )

  return model
}
