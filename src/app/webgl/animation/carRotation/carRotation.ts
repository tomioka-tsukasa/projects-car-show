import gsap from 'gsap'
import { webglCtrl } from '../../setupMember'
import CustomEase from 'gsap/CustomEase'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

type ColorAnimationState = {
  isAnimating: boolean
  timeline: gsap.core.Timeline | null
}

const state: ColorAnimationState = {
  isAnimating: false,
  timeline: null,
}

/**
 * 現在の回転値から最も近い360の倍数（…-720, -360, 0, 360, 720…）を計算
 */
const getNearestTargetRotation = (currentRotation: number): number => {
  const fullRotation = Math.PI * 2 // = 360度

  return Math.round(currentRotation / fullRotation) * fullRotation
}

export const carRotation = (
  type: 'resetor',
  car: GLTF | null,
  duration: number = 1000
) => {
  if (!webglCtrl.scene) return

  // 既存のアニメーションを停止
  if (state.timeline) {
    state.timeline.kill()
  }

  state.isAnimating = true

  // 新しいタイムラインを作成
  state.timeline = gsap.timeline({
    onComplete: () => {
      state.isAnimating = false
      state.timeline = null
    }
  })

  if (type === 'resetor') {
    if (car?.scene) {
      console.log('回転リセット', car.scene.rotation.y)
      console.log('回転リセット', getNearestTargetRotation(car.scene.rotation.y))

      state.timeline?.to(car.scene.rotation, {
        y: getNearestTargetRotation(car.scene.rotation.y),
        duration: duration / 1000,
        ease: CustomEase.create('custom', 'M0,0 C0.509,0.074 0.071,0.975 1,1 '),
      }, 0)
    }
  }
}
