import * as THREE from 'three'

import { detectBrowser, detectTouchDevice } from '@/lib/deviceInfo/detector/detector'
import { DEVICE_TYPE } from '@/lib/deviceInfo/deviceInfoConstants'

/**
 * Three.jsのレンダラーにピクセル比率を適用
 */
export const applyPixelRatio = (
  renderer: THREE.WebGLRenderer,
  customCalcRatio?: number
): void => {
  if (typeof window === 'undefined') return

  const ua = window.navigator.userAgent
  const hasMultiTouch = detectTouchDevice()
  const browserInfo = detectBrowser(ua, hasMultiTouch)

  if (browserInfo.deviceType === DEVICE_TYPE.PC) {

    /**
     * デバイスタイプがPCの場合は画面サイズを基準にピクセル比率を計算
     */
    const baseWidth = 1440
    const baseHeight = 800
    const baseArea = baseWidth * baseHeight
    const actualArea = window.innerWidth * window.innerHeight
    const scaleRatio = Math.sqrt(actualArea / baseArea)
    let applyDevicePixelRatio = 1

    // window.devicePixelRatio が 1 の場合は 1.5 を適用
    // 画質の極端な劣化を防ぐ
    if (window.devicePixelRatio < 2) {
      applyDevicePixelRatio = 1.5
    } else {
      applyDevicePixelRatio = window.devicePixelRatio
    }

    // ピクセル比率を計算
    const targetPixelRatio = applyDevicePixelRatio / (customCalcRatio || 1.5) / scaleRatio

    // ピクセル比率を適用
    renderer.setPixelRatio(targetPixelRatio)

    // ログ
    console.log('[PixelRatio-PC] dPR:', applyDevicePixelRatio)
    console.log('[PixelRatio-PC] dPR（window.devicePixelRatio）:', window.devicePixelRatio)
    console.log('[PixelRatio-PC] target:', targetPixelRatio)

  } else {

    /**
     * デバイスタイプがSPの場合はデバイスのピクセル比率をそのまま適用
     */
    const targetPixelRatio = window.devicePixelRatio / (customCalcRatio || 1.5)
    renderer.setPixelRatio(targetPixelRatio)

    console.log('[PixelRatio-SP] target:', targetPixelRatio)
  }
}
