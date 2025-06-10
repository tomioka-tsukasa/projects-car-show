import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { setGUI } from '../../gui'
import { setupMember } from '../../../setupMember'

const status = {
  material: {
    pillar_bloom: false,
  }
}

export const setWorldGUI = (
  world: GLTF,
  settings: {
    material?: {
      bloom?: typeof setupMember.world.material.bloom
    }
  }
) => {
  /**
   * マテリアル設定
   */
  world.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {

      /**
       * Bloom 設定
       */
      if (child.material.name === 'Bloom_Common') {

        // Pillar_Bloom 設定
        if (!status.material.pillar_bloom && settings.material?.bloom?.common) {
          status.material.pillar_bloom = true

          const bloomGUI = setGUI(
            '【World / マテリアル / Bloom_Common】強さ',
            {
              emissiveIntensity: { type: 'number', label: 'emissiveIntensity', min: 0, max: 30, step: 0.1 },
            },
            {
              emissiveIntensity: settings.material?.bloom?.common,
            },
          )

          bloomGUI.controllers.forEach((controller) => {
            controller.onChange((value) => {
              child.material.emissiveIntensity = value
            })
          })
        }
      }
    }
  })
}
