import { hover, rvw } from '@/styles/responsive.css'
import { style } from '@vanilla-extract/css'

export const list = style([
  {
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    selectors: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }
  },
  rvw.height(180, 140),
  rvw.gap(24),
])

export const item = style([
  {
    display: 'flex',
    alignItems: 'center',
  },
  rvw.gap(12),
])

export const checkboxItem = style([
  {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  rvw.gap(12),
])

export const itemTitle = style([
  rvw.fontSize(14, 12),
])

export const checkbox = style([
  {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    appearance: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
    overflow: 'hidden',
    selectors: {
      '&:checked': {
        backgroundColor: 'rgba(55, 255, 255, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.9)',
      },
      '&:checked::after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#000',
      },
    },
  },
  hover({
    transform: 'translate(2px, 0)',
  }),
  rvw.width(12),
  rvw.height(12),
  rvw.borderRadius(2),
])
