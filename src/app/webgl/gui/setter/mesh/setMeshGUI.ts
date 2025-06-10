import * as THREE from 'three'
import { setGUI } from '../../gui'

export const setMeshGUI = (
  name: string,
  mesh: THREE.Mesh | THREE.Group | THREE.Object3D,
  settings: {
    position?: {
      x?: number,
      y?: number,
      z?: number,
    },
    rotation?: {
      x?: number,
      y?: number,
      z?: number,
    },
    scale?: {
      x?: number,
      y?: number,
      z?: number,
    },
  }
) => {
  /**
   * 位置のGUIの設定
   */
  if (settings?.position) {
    if (settings.position.x === undefined) settings.position.x = 0
    if (settings.position.y === undefined) settings.position.y = 0
    if (settings.position.z === undefined) settings.position.z = 0

    const positionGUI = setGUI(
      `【${name}】位置`,
      {
        x: { type: 'number', label: 'X Position', min: -100, max: 100, step: 0.1 },
        y: { type: 'number', label: 'Y Position', min: -100, max: 100, step: 0.1 },
        z: { type: 'number', label: 'Z Position', min: -100, max: 100, step: 0.1 }
      },
      {
        x: 0,
        y: 0,
        z: 0
      },
    )

    // 変更を反映
    positionGUI.controllers.forEach((controller) => {
      controller.onChange((value) => {
        mesh.position[controller.property as 'x' | 'y' | 'z'] = value
      })
    })
  }

  /**
   * 回転のGUIの設定
   */
  if (settings?.rotation) {
    if (settings.rotation.x === undefined) settings.rotation.x = 0
    if (settings.rotation.y === undefined) settings.rotation.y = 0
    if (settings.rotation.z === undefined) settings.rotation.z = 0

    const rotationGUI = setGUI(
      `【${name}】回転`,
      {
        x: { type: 'number', label: 'X Rotation', min: -Math.PI, max: Math.PI, step: 0.01 },
        y: { type: 'number', label: 'Y Rotation', min: -Math.PI, max: Math.PI, step: 0.01 },
        z: { type: 'number', label: 'Z Rotation', min: -Math.PI, max: Math.PI, step: 0.01 }
      },
      {
        x: 0,
        y: 0,
        z: 0
      },
    )

    // 変更を反映
    rotationGUI.controllers.forEach((controller) => {
      controller.onChange((value) => {
        mesh.rotation[controller.property as 'x' | 'y' | 'z'] = value
      })
    })
  }

  /**
   * スケールのGUIの設定
   */
  if (settings?.scale) {
    if (settings.scale.x === undefined) settings.scale.x = 1
    if (settings.scale.y === undefined) settings.scale.y = 1
    if (settings.scale.z === undefined) settings.scale.z = 1

    const scaleGUI = setGUI(
      `【${name}】スケール`,
      {
        x: { type: 'number', label: 'X Scale', min: -Math.PI, max: Math.PI, step: 0.01 },
        y: { type: 'number', label: 'Y Scale', min: -Math.PI, max: Math.PI, step: 0.01 },
        z: { type: 'number', label: 'Z Scale', min: -Math.PI, max: Math.PI, step: 0.01 }
      },
      {
        x: 0,
        y: 0,
        z: 0
      },
    )

    // 変更を反映
    scaleGUI.controllers.forEach((controller) => {
      controller.onChange((value) => {
        mesh.scale.set(value, value, value)
      })
    })
  }
}
