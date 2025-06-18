import type { Metadata } from 'next'
import { Cormorant_Garamond, Zen_Old_Mincho } from 'next/font/google'
import '@/styles/global/globals'
import StoreProvider from '@/app/store/provider'
import { GsapManager } from './components/GsapManager/GsapManager'

const zenOldMincho = Zen_Old_Mincho({
  variable: '--font-zen-old-mincho',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-cormorant-garamond',
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '3D車モデルViewer',
  description: '車の3DモデルをWeb上でリアルタイムプレビューできるサイト。カラー変更やカメラワーク操作が可能で、環境テクスチャ等のディティール調整もできるカスタマイズ機能も付いています。',
  manifest: '/sakura_camera/assets/home-icon/manifest.json',
  openGraph: {
    title: '3D車モデルViewer',
    siteName: '3D車モデルViewer',
    description: '車の3DモデルをWeb上でリアルタイムプレビューできるサイト。カラー変更やカメラワーク操作が可能で、環境テクスチャ等のディティール調整もできるカスタマイズ機能も付いています。',
    url: 'https://projects-car-show.vercel.app/',
    type: 'website',
    images: [
      {
        url: 'https://projects-car-show.vercel.app/og/og.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'ja_JP',
  },
  twitter: {
    images: 'https://projects-car-show.vercel.app/og/og.jpg',
    card: 'summary_large_image',
    description: '車の3DモデルをWeb上でリアルタイムプレビューできるサイト。カラー変更やカメラワーク操作が可能で、環境テクスチャ等のディティール調整もできるカスタマイズ機能も付いています。',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <StoreProvider>
      <GsapManager />
      <html lang='ja'>
        <body className={`${zenOldMincho.variable} ${cormorantGaramond.variable}`}>
          {children}
        </body>
      </html>
    </StoreProvider>
  </>
}
