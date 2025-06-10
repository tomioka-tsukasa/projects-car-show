'use client'

import dynamic from 'next/dynamic'
import { memo } from 'react'

/**
 * キャンバスダイナミックインポート
 * ・ReferenceError: window is not defined エラーを防ぐためにdynamic importを使用
 * ・リファレンス: https://zenn.dev/hironorioka28/articles/8247133329d64e
 */
const OriginalCanvas = dynamic(() => import('./OriginalCanvas'), {
  ssr: false,
})

const Canvas = () => {
  return <OriginalCanvas />
}

export default memo(Canvas)
