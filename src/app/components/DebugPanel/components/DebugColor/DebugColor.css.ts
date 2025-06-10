import { style } from '@vanilla-extract/css'
import { hover, rvw } from '@/styles/responsive.css'

export const colorList = style([
  {
    display: 'flex',
    alignItems: 'center',
  },
  rvw.gap(24),
])

export const colorItem = style([
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
    position: 'relative',
    // '::after': {
    //   content: '',
    //   position: 'absolute',
    //   top: '50%',
    //   left: '50%',
    //   transform: 'translate(-50%, -50%)',
    //   opacity: 0,
    //   width: '112%',
    //   height: '112%',
    //   borderColor: '#fff',
    //   borderStyle: 'solid',
    //   borderWidth: '1px',
    //   transition: 'all 0.6s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
    // },
  },
  hover({
    filter: 'brightness(1.2)',
  }),
  rvw.gap(6, 4),
  rvw.fontSize(12),
])

export const colorItemActive = style([
  {
    filter: 'brightness(0.4)',
    pointerEvents: 'none',
    cursor: 'default',
    // '::after': {
    //   opacity: 1,
    // },
  },
  hover({
    filter: 'brightness(0.4)',
  }),
])

export const colorPreview = style([
  {
    overflow: 'hidden',
  },
  rvw.width(64, 32),
  rvw.height(64, 32),
  rvw.borderRadius(4, 2),
])
