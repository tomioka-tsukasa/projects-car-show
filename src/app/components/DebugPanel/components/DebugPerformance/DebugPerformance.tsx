import * as THREE from 'three'
import * as styles from './DebugPerformance.css'
import * as debugPanelStyles from '../../DebugPanel.css'
import { setupMember, webglCtrl } from '@/app/webgl/setupMember'
import { useState } from 'react'

type Props = {
  activeAccordion: string
  setActiveAccordion: (value: string) => void
}

export const DebugPerformance = ({
  activeAccordion,
  setActiveAccordion,
}: Props) => {
  const [rendering, setRendering] = useState(setupMember.renderer.active)
  const [unrealBloom, setUnrealBloom] = useState(setupMember.postprocess.active)
  const [groundReflection, setGroundReflection] = useState(setupMember.renderer.groundReflection)
  const [cameraLog, setCameraLog] = useState(setupMember.controls.debug)

  /**
   * 地面の鏡面反射効果
   */
  const handleGroundReflection = () => {
    const current = !setupMember.renderer.groundReflection
    setupMember.renderer.groundReflection = current

    setGroundReflection(current)

    if (!webglCtrl.world) {
      return
    }

    webglCtrl.world.scene.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.Group) {
        if (child.name === 'Ground_Reflector') {
          child.visible = current
        }
      }
    })
  }

  return (
    <div>

      {/* アコーディオンヘッダー */}
      <button
        className={`${debugPanelStyles.accordionHeader} ${activeAccordion === 'performance' ? debugPanelStyles.accordionActive : ''}`}
        onClick={() => setActiveAccordion(activeAccordion === 'performance' ? '' : 'performance')}
      >
        環境・パフォーマンス設定
        <span className={`${debugPanelStyles.accordionArrow}`}>▼</span>
      </button>

      {/* アコーディオンコンテンツ */}
      {activeAccordion === 'performance' && (
        <div className={`${debugPanelStyles.accordionContent}`}>
          <div className={`${styles.list}`}>

            {/* レンダリング可否 */}
            <div className={`${styles.item}`}>
              <div className={`${styles.checkboxItem}`}>
                <input
                  type='checkbox'
                  name='rendering'
                  id='rendering'
                  className={`${styles.checkbox}`}
                  checked={rendering}
                  onChange={() => {
                    setRendering(!rendering)
                    setupMember.renderer.active = !setupMember.renderer.active
                  }}
                />
                <label htmlFor='rendering' className={`${styles.itemTitle}`}>
                  レンダリングの有無
                </label>
              </div>
            </div>

            {/* 光の拡散効果 */}
            <div className={`${styles.item}`}>
              <div className={`${styles.checkboxItem}`}>
                <input
                  type='checkbox'
                  name='unrealbloom'
                  id='unrealbloom'
                  className={`${styles.checkbox}`}
                  checked={unrealBloom}
                  onChange={() => {
                    setUnrealBloom(!unrealBloom)
                    setupMember.postprocess.active = !setupMember.postprocess.active
                  }}
                />
                <label htmlFor='unrealbloom' className={`${styles.itemTitle}`}>
                  光の拡散効果 Unreal Bloom
                </label>
              </div>
            </div>

            {/* 地面の鏡面反射効果 */}
            <div className={`${styles.checkboxItem}`}>
              <input
                type='checkbox'
                name='ground-reflection'
                id='ground-reflection'
                className={`${styles.checkbox}`}
                checked={groundReflection}
                onChange={handleGroundReflection}
              />
              <label htmlFor='ground-reflection' className={`${styles.itemTitle}`}>
                地面の鏡面反射効果
              </label>
            </div>

            {/* カメラ移動ログ */}
            <div className={`${styles.item}`}>
              <div className={`${styles.checkboxItem}`}>
                <input
                  type='checkbox'
                  name='camera-log'
                  id='camera-log'
                  className={`${styles.checkbox}`}
                  checked={cameraLog}
                  onChange={() => {
                    setupMember.controls.debug = !setupMember.controls.debug
                    setCameraLog(!cameraLog)
                  }}
                />
                <label htmlFor='camera-log' className={`${styles.itemTitle}`}>
                  カメラ移動のログ
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
