import { style } from '@vanilla-extract/css'
import { hover, rvw } from '@/styles/responsive.css'

export const envmapList = style([
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
  rvw.height(292, 240),
  rvw.gap(40),
])

export const envmapItem = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
])

export const envmapTitle = style([
  {
    color: '#fff',
    fontWeight: 'bold',
    borderBottomStyle: 'solid',
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  rvw.fontSize(14, 12),
  rvw.paddingBottom(6),
  rvw.borderBottomWidth(1),
])

export const textureList = style([
  {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    overflowX: 'scroll',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    selectors: {
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    }
  },
  rvw.gap(24),
  rvw.marginTop(24),
])

export const textureItem = style([
  {
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'auto',
    cursor: 'pointer',
    filter: 'brightness(0.4)',
    transition: 'all 0.3s cubic-bezier(0.15, 0.77, 0.45, 0.93) 0s',
  },
  rvw.gap(9),
  hover({
    filter: 'brightness(1)',
  }),
])

export const textureItemActive = style([
  {
    filter: 'brightness(1)',
    pointerEvents: 'none',
    cursor: 'default',
  },
])

export const texturePreview = style([
  rvw.width(160),
  rvw.height(90),
])

export const textureTitle = style([
  {
    color: '#fff',
  },
  rvw.fontSize(12),
])

export const intensityControl = style([
  {
    display: 'flex',
    flexDirection: 'column',
  },
  rvw.width('72%', '100%', '100%'),
  rvw.gap(12),
  rvw.marginTop(24),
])

export const intensityHead = style([
  {
    display: 'flex',
    alignItems: 'center',
  },
  rvw.gap(12),
])

export const intensityCurrent = style([
  {
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
  },
  rvw.padding([4, 6, 3]),
  rvw.borderRadius(3),
  rvw.fontSize(12),
])

export const intensityLabel = style([
  rvw.fontSize(14, 12),
])

export const intensitySlider = style([
  {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    outline: 'none',
    WebkitAppearance: 'none',
    '::-webkit-slider-thumb': {
      WebkitAppearance: 'none',
      width: '16px',
      height: '16px',
      backgroundColor: '#fff',
      borderRadius: '50%',
      cursor: 'pointer',
    },
  },
  rvw.height(4),
  rvw.borderRadius(2),
])
