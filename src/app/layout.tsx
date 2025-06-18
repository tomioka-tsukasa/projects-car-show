import type { Metadata } from 'next'
import { Cormorant_Garamond, Zen_Old_Mincho } from 'next/font/google'
import '@/styles/global/globals'
import StoreProvider from '@/app/store/provider'
import { GsapManager } from './components/GsapManager/GsapManager'
import Head from 'next/head'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>
    <StoreProvider>
      <Head>
        {/* Open Graph タグ */}
        <meta property='og:title' content='3D車モデルViewer' />
        <meta property='og:description' content='車の3DモデルをWeb上でリアルタイムプレビューできるサイト。カラー変更やカメラワーク操作が可能で、環境テクスチャ等のディティール調整もできるカスタマイズ機能も付いています。' />
        <meta property='og:image' content='https://projects-car-show.vercel.app/og/og.jpg' />
        <meta property='og:url' content='https://projects-car-show.vercel.app/' />
        <meta property='og:type' content='website' />
      </Head>
      <GsapManager />
      <html lang='ja'>
        <body className={`${zenOldMincho.variable} ${cormorantGaramond.variable}`}>
          {children}
        </body>
      </html>
    </StoreProvider>
  </>
}
