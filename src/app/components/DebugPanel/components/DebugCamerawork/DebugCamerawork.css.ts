import { style } from '@vanilla-extract/css'
import { hover, rvw } from '@/styles/responsive.css'
import { colors } from '@/styles/variables'

export const cameraList = style([
  {
    display: 'flex',
    flexWrap: 'wrap',
  },
  rvw.gap([16, 24]),
])

export const cameraItem = style([
  {
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: colors.base.white,
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rvw.gap(6, 4),
  rvw.fontSize(12),
  rvw.padding([6, 12], [6, 9]),
  rvw.borderRadius(4),
  hover({
    opacity: 0.5,
  }),
])

export const cameraItemActive = style([
  {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: colors.base.black,
  },
])
