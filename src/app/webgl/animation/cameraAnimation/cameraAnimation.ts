import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { webglCtrl } from '../../setupMember'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

type CameraAnimationState = {
  isAnimating: boolean
  timeline: gsap.core.Timeline | null
}

const state: CameraAnimationState = {
  isAnimating: false,
  timeline: null,
}

export const cameraAnimation = (
  endPosition: THREE.Vector3,
  endTarget: THREE.Vector3,
  duration: number = 2000
): CameraAnimationState | null => {
  if (!webglCtrl.camera || !webglCtrl.controls) return null

  cameraAnimationInit()

  const controls = webglCtrl.controls as OrbitControls

  // 新しいタイムラインを作成
  state.timeline = gsap.timeline({
    onComplete: () => {
      state.isAnimating = false
      state.timeline = null
    }
  })

  // カメラ位置のアニメーション
  state.timeline.to(webglCtrl.camera.position, {
    x: endPosition.x,
    y: endPosition.y,
    z: endPosition.z,
    duration: duration / 1000, // GSAPは秒単位
    ease: CustomEase.create('custom', 'M0,0 C0.656,0.079 0.41,1 1,1 '),
  }, 0)

  // カメラターゲットのアニメーション
  state.timeline.to(controls.target, {
    x: endTarget.x,
    y: endTarget.y,
    z: endTarget.z,
    duration: duration / 1000,
    ease: CustomEase.create('custom', 'M0,0 C0.656,0.079 0.41,1 1,1 '),
  }, 0)

  return {
    isAnimating: state.isAnimating,
    timeline: state.timeline,
  }
}

export const cameraAnimationInit = () => {
  // 既存のアニメーションを停止
  if (state.timeline) {
    state.timeline.kill()
  }

  state.isAnimating = true
}
