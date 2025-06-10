import * as THREE from 'three'

/**
 * レンダラー取得
 */
export type GetRenderer = (
  canvas: HTMLCanvasElement,
  options?: {
    shadow?: boolean,
    toneMapping?: number,
    pixelRatio?: number,
  },
  parameters?: ConstructorParameters<typeof THREE.WebGLRenderer>[0],
) => THREE.WebGLRenderer
