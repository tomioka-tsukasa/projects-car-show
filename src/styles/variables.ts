export {
  PcDesignWidth,
  PcDesignHeight,
  TabletDesignWidth,
  SpDesignWidth,
  PcMqWidthMin,
  PcMqWidthMax,
  PcOverMqWidthMin,
  TabletMqWidthMin,
  SpMqWidth,
  usePixelLimit,
  pixelLimitWidth,
} from './responsive.config'

/**
 * カラー定義
 */

export const colors = {
  main: {
  },
  base: {
    white: '#ffffff',
    black: '#000000',
    gray: '#d7d7d7',
    bg: '#ffffff',
  },
  sub: {
  },
  text: {
    link: '#3b82c7',
  },
}

/**
 * フォント定義
 */

export { basicFontStyle, zenOldMinchoStyle, cormorantGaramondStyle, type SetFontFamily } from './fontUtils'
