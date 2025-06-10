import { mqStyle, rvw } from '@/styles/responsive.css'
import { colors } from '@/styles/variables'
import { style } from '@vanilla-extract/css'

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

export const displayChanger = style([
  {
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
    color: colors.base.black,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
  },
  rvw.borderRadius(9, 5),
  rvw.padding([6, 12], [3, 12]),
  rvw.fontSize(14, 12),
])

export const displayControl = style([
  {
    backgroundColor: 'rgba(255, 255, 255, 0.84)',
    color: colors.base.black,
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.6)',
    },
  },
  rvw.borderRadius(9, 5),
  rvw.padding([6, 12], [3, 12]),
  rvw.fontSize(14, 12),
])

export const root = style([
  {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: colors.base.white,
    zIndex: 1000,
    transition: 'opacity 0.3s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    opacity: 0,
    pointerEvents: 'none',
  },
  rvw.left(24, '50%'),
  rvw.bottom(240, 64),
  rvw.width(540, '94%'),
  rvw.borderRadius(9),
  rvw.padding([12, 24], [12, 9]),
  mqStyle.transform(['none', 'translateX(-50%)']),
])

export const rootActive = style({
  opacity: 1,
  pointerEvents: 'auto',
})

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

export const accordionHeader = style([
  {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'background-color 0.6s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
  },
  rvw.fontSize(14),
  rvw.padding([6, 12], [6, 12]),
  rvw.borderRadius(4),
])

export const accordionActive = style({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
})

export const accordionArrow = style([
  {
    transition: 'transform 0.6s cubic-bezier(0.0, 0.5, 0.3, 1.0) 0s',
    selectors: {
      [`${accordionActive} &`]: {
        transform: 'rotate(180deg)',
      },
    },
  },
])

export const accordionContent = style([
  rvw.padding(10, [6, 6, 16]),
  rvw.borderRadius(4),
  rvw.marginTop(5),
])

export const intensityControl = style({
  marginTop: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
})
