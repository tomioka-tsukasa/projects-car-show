import type { StyleRule } from '@vanilla-extract/css'

// フォントファミリーの基本定義
export const basicFontStyle = '"Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif'
export const notoSansStyle = `'Noto Sans JP', ${basicFontStyle}`
export const zenOldMinchoStyle = 'var(--font-zen-old-mincho)'
export const cormorantGaramondStyle = 'var(--font-cormorant-garamond)'

// フォントスタイル適用関数
export type SetFontFamily = (
  option?: {
    weight?: number,
    style?: string,
  }
) => StyleRule

export const zenOldMincho: SetFontFamily = (option = {
  weight: 400,
  style: 'normal',
}) => {
  return {
    fontFamily: zenOldMinchoStyle,
    fontOpticalSizing: 'auto',
    fontWeight: option.weight,
    fontStyle: option.style,
    WebkitTextSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    fontFeatureSettings: '"palt"',
  }
}

export const cormorantGaramond: SetFontFamily = (option = {
  weight: 400,
  style: 'normal',
}) => {
  return {
    fontFamily: cormorantGaramondStyle,
    fontOpticalSizing: 'auto',
    fontWeight: option.weight,
    fontStyle: option.style,
    WebkitTextSizeAdjust: '100%',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  }
}
