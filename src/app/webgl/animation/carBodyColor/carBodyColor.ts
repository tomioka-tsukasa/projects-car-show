import * as THREE from 'three'
import gsap from 'gsap'
import { webglCtrl } from '../../setupMember'
import CustomEase from 'gsap/CustomEase'

type ColorAnimationState = {
  isAnimating: boolean
  timeline: gsap.core.Timeline | null
}

const state: ColorAnimationState = {
  isAnimating: false,
  timeline: null,
}

export const animateCarBodyColor = (
  materialName: string,
  targetColor: THREE.Color,
  targetEmissiveColor: THREE.Color,
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

  // マテリアルの色をアニメーション
  webglCtrl.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.material.name === materialName) {
        // 現在の色を取得
        const currentColor = child.material.color.clone()

        // 色のアニメーション
        state.timeline?.to(currentColor, {
          r: targetColor.r,
          g: targetColor.g,
          b: targetColor.b,
          duration: duration / 1000,
          ease: CustomEase.create('custom', 'M0,0 C0.509,0.074 0.071,0.975 1,1 '),
          onUpdate: () => {
            child.material.color.copy(currentColor)
          }
        }, 0)
      }

      if (child.material.name === 'Bloom_Common' || child.material.name === 'Bloom_Stage') {
        const currentEmissiveColor = child.material.emissive.clone()

        // エミッシブカラーのアニメーション
        state.timeline?.to(currentEmissiveColor, {
          r: targetEmissiveColor.r,
          g: targetEmissiveColor.g,
          b: targetEmissiveColor.b,
          duration: duration / 1000,
          ease: CustomEase.create('custom', 'M0,0 C0.509,0.074 0.071,0.975 1,1 '),
          onUpdate: () => {
            child.material.emissive.copy(currentEmissiveColor)
          }
        }, 0)
      }
    }
  })
}
