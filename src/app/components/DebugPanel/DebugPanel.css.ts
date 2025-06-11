import { hover, mqStyle, rvw, sp } from '@/styles/responsive.css'
import { colors } from '@/styles/variables'
import { style, keyframes } from '@vanilla-extract/css'

const fadeIn = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
})

export const ctrlArea = style([
  {
    position: 'fixed',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
  },
  rvw.right(34, 16),
  rvw.bottom(18, 16),
  rvw.gap(16),
])

export const displayControl = style([
  {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(10px)',
    color: colors.base.white,
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
  },
  rvw.borderRadius(9, 5),
  rvw.padding([6, 18], [3, 12]),
  rvw.fontSize(14, 12),
  hover({
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
  }),
])

export const root = style([
  {
    position: 'fixed',
    color: colors.base.white,
    zIndex: 1000,
    transition: 'opacity 0.3s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    opacity: 0,
    pointerEvents: 'none',
    backgroundColor: 'rgba(0, 0, 0,.35)',
    backdropFilter: 'blur(10px)',
  },
  rvw.left(24, '50%'),
  rvw.bottom(240, 64),
  rvw.width(540, '94%'),
  rvw.borderRadius(9),
  rvw.padding([24], [12, 9]),
  mqStyle.transform(['none', 'translateX(-50%)']),
])

export const rootActive = style({
  opacity: 1,
  pointerEvents: 'auto',
})

export const titleList = style([
  {
    display: 'flex',
    alignItems: 'center',
  },
  rvw.gap(16),
  rvw.marginTop(16),
])

export const titleItem = style([
  {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
  },
  hover({
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  }),
  rvw.width(40),
  rvw.height(40),
])

export const titleItemActive = style([
  {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    color: colors.base.black,
  },
  hover({
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  }),
])

export const icon = style([
  {
    width: 20,
    height: 20,
  },
])

export const titlePopup = style([
  {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
    whiteSpace: 'nowrap',
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
  },
  {
    selectors: {
      [`${titleItem}:hover &`]: {
        opacity: 1,
      }
    }
  },
  rvw.bottom(-30),
  rvw.padding([4, 8]),
  rvw.fontSize(12),
  rvw.borderRadius(4),
  sp({
    display: 'none',
  }),
])

export const renderContent = style([
  {
    opacity: 0,
    pointerEvents: 'none',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
  },
  rvw.minWidth(300),
])

export const renderContentActive = style([
  {
    opacity: 1,
    pointerEvents: 'auto',
    animation: `${fadeIn} 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) forwards`,
  }
])

export const title = style([
  {
    fontWeight: 'bold',
  },
  rvw.fontSize(16, 14),
])

export const accordions = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  rvw.gap(12),
  rvw.marginTop(12),
])

export const contentHeader = style([
  {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rvw.fontSize(14),
  rvw.padding([6, 12], [6, 12]),
  rvw.borderRadius(4),
])

export const contentArea = style([
  rvw.borderRadius(4),
  rvw.marginTop(12),
  rvw.padding([0, 0, 0, 6]),
])

export const intensityControl = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  rvw.marginTop(10),
  rvw.gap(5),
])

export const debugPanel = style([
  {
    display: 'none',
    pointerEvents: 'none',
  },
])

export const active = style({
  display: 'block',
  pointerEvents: 'auto',
})
