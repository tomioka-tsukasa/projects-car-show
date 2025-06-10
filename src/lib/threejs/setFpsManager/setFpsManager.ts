type SetFpsManager = () => {
  status: {
    fps: number,
  },
  measure: () => void,
}

export const setFpsManager: SetFpsManager = () => {
  let frameCount = 0
  let lastFpsCheckTime = performance.now()
  const status = {
    fps: 0,
  }

  /**
   * FPS 計測・ログ出力
   */
  const measure = () => {
    frameCount++
    const now = performance.now()
    const elapsed = now - lastFpsCheckTime

    if (elapsed >= 1000) {
      status.fps = (frameCount * 1000) / elapsed
      console.log(`📏 実測FPS: ${status.fps.toFixed(1)}`)
      frameCount = 0
      lastFpsCheckTime = now
    }
  }

  return {
    measure,
    status,
  }
}
