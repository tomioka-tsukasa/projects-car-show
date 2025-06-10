import { GetCar } from './carTypes'
import { setMeshGUI } from '../../gui/setter/mesh/setMeshGUI'
import * as THREE from 'three'
import { setupMember } from '../../setupMember'

export const getCar: GetCar = (
  model,
  loadedAssets,
) => {
  console.log(model)

  model.scene.scale.set(0.02, 0.02, 0.02)
  model.scene.position.y = 5.05

  model.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (loadedAssets) {
        child.material.envMap = loadedAssets.envmaps[setupMember.car.material.environment] || null
        child.material.envMapIntensity = setupMember.car.material.envmapIntensity
      }
    }
  })

  setMeshGUI(
    'car',
    model.scene,
    {
      position: {
        x: 0,
        y: 5.05,
        z: 0,
      },
    }
  )

  return model
}
