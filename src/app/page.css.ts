import { cormorantGaramond } from '@/styles/fontUtils'
import { rvw, sp } from '@/styles/responsive.css'
import { colors } from '@/styles/variables'
import { style } from '@vanilla-extract/css'

export const mask = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100vh',
  zIndex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  pointerEvents: 'none',
})

export const content = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 2,
  pointerEvents: 'none',
})

export const inner = style({
  position: 'relative',
  width: '100%',
  height: '100%',
})

export const lineTop = style([
  {
    position: 'absolute',
    left: '2.5%',
    width: '95%',
    backgroundColor: colors.base.white,
    opacity: 0.3,
  },
  rvw.top(12, 24),
  rvw.height(1),
])

export const lineBottom = style([
  {
    position: 'absolute',
    bottom: 0,
    left: '2.5%',
    width: '95%',
    backgroundColor: colors.base.white,
    opacity: 0.3,
  },
  rvw.bottom(72, 58),
  rvw.height(1),
  sp({
    display: 'none',
  }),
])

export const titleContainer = style([
  {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  rvw.left(24, 12),
  rvw.top('unset', 32),
  rvw.bottom(48, 'unset'),
])

export const title = style([
  {
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 1,
    opacity: 1,
  },
  rvw.fontSize(148, 54),
  cormorantGaramond(),
])

export const subTitleArea = style([
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  rvw.gap(32),
  sp({
    justifyContent: 'flex-start',
  }),
])

export const subtitle = style([
  {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    opacity: 0.8,
  },
  rvw.padding([0, 0, 0, 12], 0),
  rvw.marginTop(12, 0),
  rvw.fontSize(12, 8),
  cormorantGaramond(),
])

export const debugTitle = style([
  {
    position: 'absolute',
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  rvw.bottom(24, 24),
  rvw.right(32, 12),
  rvw.padding([4, 16]),
  rvw.borderRadius(24),
  rvw.fontSize(16, 10),
])

export const canvas = style({
  position: 'relative',
  zIndex: 0,
})
