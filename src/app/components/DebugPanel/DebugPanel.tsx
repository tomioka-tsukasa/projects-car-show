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

export const DebugPanel = () => {
  const loadingStore = useAppSelector((selector) => selector.loadingStore)
  const [activeAccordion, setActiveAccordion] = useState<string>('color')
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

  return <>
    <div className={`${styles.root} ${!openDebug ? '' : styles.rootActive}`}>
      <h2 className={`${styles.title}`}>デバッグメニュー</h2>

      <div className={`${styles.accordions}`}>
        <DebugColor
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />

        <DebugCamerawork
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />

        <DebugEnvmap
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />

        <DebugPerformance
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />
      </div>
    </div >
    <div className={`${styles.ctrlArea}`}>
      <button
        onClick={() => {
          setActiveControl(!activeControl)
          setupMember.controls.enabled = !activeControl
        }}
        className={`${styles.displayControl}`}
      >
        {activeControl ? 'カメラ操作を無効にする' : 'カメラ操作を有効にする'}
      </button>
      <button onClick={() => setOpenDebug(!openDebug)} className={`${styles.displayChanger}`}>
        {openDebug ? 'デバックメニューを閉じる' : 'デバックメニューを開く'}
      </button>
    </div>
  </>
}
