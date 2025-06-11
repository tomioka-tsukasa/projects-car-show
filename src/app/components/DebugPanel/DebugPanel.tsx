'use client'

import { useEffect, useState } from 'react'
import * as styles from './DebugPanel.css'
import { useAppSelector } from '@/app/store/hook'
import { cameraAnimation, cameraAnimationInit } from '../../webgl/animation/cameraAnimation/cameraAnimation'
import { cameraWork } from '../../webgl/setup/cameraWork'
import { DebugColor } from './components/DebugColor/DebugColor'
import { DebugCamerawork } from './components/DebugCamerawork/DebugCamerawork'
import { DebugEnvmap } from './components/DebugEnvmap/DebugEnvmap'
import { DebugPerformance } from './components/DebugPerformance/DebugPerformance'
import { setupMember } from '../../webgl/setupMember'
import { fixCamerawork } from '@/lib/threejs/fixCamerawork/fixCamerawork'
import * as THREE from 'three'
import { CameraIcon, Eclipse, Palette, Settings2 } from 'lucide-react'

type DebugItem = {
  id: string
  label: string
  icon: React.ReactNode
}

const DEBUG_ITEMS: DebugItem[] = [
  { id: 'color', label: 'カラー設定', icon: <Palette className={`${styles.icon}`} /> },
  { id: 'camerawork', label: 'カメラワーク', icon: <CameraIcon className={`${styles.icon}`} /> },
  { id: 'envmap', label: '環境マップ', icon: <Eclipse className={`${styles.icon}`} /> },
  { id: 'performance', label: 'パフォーマンス', icon: <Settings2 className={`${styles.icon}`} /> },
]

export const DebugPanel = () => {
  const loadingStore = useAppSelector((selector) => selector.loadingStore)
  const [activeItem, setActiveItem] = useState<DebugItem['id']>('color')
  const [openDebug, setOpenDebug] = useState<boolean>(true)
  const [activeControl, setActiveControl] = useState<boolean>(setupMember.controls.enabled)

  /**
   * 開幕アニメーションを実行する
   */
  useEffect(() => {
    if (loadingStore.loadComplete) {
      const { position, target } = fixCamerawork(
        cameraWork.opening.position,
        cameraWork.opening.target,
        cameraWork.opening.rotation,
      )

      cameraAnimation(
        new THREE.Vector3(position.x, position.y, position.z),
        new THREE.Vector3(target.x, target.y, target.z),
        3200,
      )
    } else {
      cameraAnimationInit()
    }
  }, [loadingStore.loadComplete])

  const renderContent = () => {
    return (
      <>
        <div className={`${styles.debugPanel} ${activeItem === 'color' ? styles.active : ''}`}>
          <DebugColor />
        </div>
        <div className={`${styles.debugPanel} ${activeItem === 'camerawork' ? styles.active : ''}`}>
          <DebugCamerawork />
        </div>
        <div className={`${styles.debugPanel} ${activeItem === 'envmap' ? styles.active : ''}`}>
          <DebugEnvmap />
        </div>
        <div className={`${styles.debugPanel} ${activeItem === 'performance' ? styles.active : ''}`}>
          <DebugPerformance />
        </div>
      </>
    )
  }

  return (
    <>
      <div className={`${styles.root} ${!openDebug ? '' : styles.rootActive}`}>
        <div className={`${styles.renderContent} ${activeItem ? styles.renderContentActive : ''}`}>
          {renderContent()}
        </div>
        <div className={styles.titleList}>
          {DEBUG_ITEMS.map((item) => (
            <div
              key={item.id}
              className={`${styles.titleItem} ${activeItem === item.id ? styles.titleItemActive : ''}`}
              onClick={() => setActiveItem(item.id)}
            >
              {item.icon}
              <div className={styles.titlePopup}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.ctrlArea}>
        <button
          onClick={() => {
            setActiveControl(!activeControl)
            setupMember.controls.enabled = !activeControl
          }}
          className={styles.displayControl}
        >
          {activeControl ? 'カメラ操作を無効にする' : 'カメラ操作を有効にする'}
        </button>
        <button onClick={() => setOpenDebug(!openDebug)} className={styles.displayControl}>
          {openDebug ? 'デバックメニューを閉じる' : 'デバックメニューを開く'}
        </button>
      </div>
    </>
  )
}
