type SetFpsManager = (
  options?: {
    log?: boolean,
  }
) => {
  status: {
    fps: number,
    fixedFps: number,
  },
  rendering: (
    timestamp: number,
    process: () => void,
  ) => void,
}

export const setFpsManager: SetFpsManager = (
  options,
) => {
  const status = {
    fps: 0,
    fixedFps: 0,
  }

  const counter = {
    rawFrameCount: 0,
    adjustedFrameCount: 0,
    lastTimestamp: 0,
    lastRenderTime: 0,
    targetInterval: 1000 / 30,
  }

  /**
   * FPS計測
   */
  const measure = (
    timestamp: number,
  ) => {
    // 実際のFPS計測（毎秒ログ）
    if (timestamp - counter.lastTimestamp >= 1000) {
      if (options?.log) console.log(`📈 実測FPS: ${counter.rawFrameCount}, 調整後FPS: ${counter.adjustedFrameCount}`)
      counter.rawFrameCount = 0
      counter.adjustedFrameCount = 0
      counter.lastTimestamp = timestamp
    }
  }

  const rendering = (
    timestamp: number,
    process: () => void,
  ) => {
    // 実際のFPS計測
    counter.rawFrameCount++

    // 前回のレンダリング時間からの経過時間を計算
    const elapsed = timestamp - counter.lastRenderTime

    // 経過時間が目標間隔より短い場合はレンダリングをスキップ
    if (elapsed < counter.targetInterval) return

    // 前回のレンダリング時間を更新
    counter.lastRenderTime = timestamp

    // 調整後のFPS計測
    counter.adjustedFrameCount++

    // FPS計測
    measure(timestamp)

    // レンダリング処理を実行
    process()
  }

  return {
    status,
    rendering,
  }
}
