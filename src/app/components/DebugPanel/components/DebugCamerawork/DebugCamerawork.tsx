import * as THREE from 'three'
import * as styles from './DebugCamerawork.css'
import * as debugPanelStyles from '../../DebugPanel.css'
import { setupMember, webglCtrl } from '@/app/webgl/setupMember'
import { cameraAnimation } from '@/app/webgl/animation/cameraAnimation/cameraAnimation'
import { carRotation } from '@/app/webgl/animation/carRotation/carRotation'
import { useState } from 'react'
import { fixCamerawork } from '@/lib/threejs/fixCamerawork/fixCamerawork'
import { CameraWorkMember } from '@/app/webgl/setup/cameraWork'

type CameraName = 'body' | 'tire' | 'sidemirror' | 'default' | 'opening'

type Props = {
  activeAccordion: string
  setActiveAccordion: (value: string) => void
}

export const DebugCamerawork = ({
  activeAccordion,
  setActiveAccordion,
}: Props) => {
  const [currentCamera, setCurrentCamera] = useState<CameraName | null>(null)

  /**
   * カメラワークを変更する
   */
  const handleCameraChange = (
    name: CameraName,
    cameraWork: CameraWorkMember
  ) => {
    // 選択済をクリックしたらデフォルトに戻す
    if (currentCamera === name) {
      setCurrentCamera(null)
      setupMember.car.controls.autoRotate = true

      const { position, target } = fixCamerawork(
        setupMember.camera.opening.position,
        setupMember.camera.opening.target,
        setupMember.camera.opening.rotation,
      )

      cameraAnimation(
        new THREE.Vector3(
          position.x,
          position.y,
          position.z,
        ),
        new THREE.Vector3(
          target.x,
          target.y,
          target.z,
        ),
        2000,
      )

      return
    }

    // 未選択クリックならカメラワークを変更
    setCurrentCamera(name)

    if (name !== 'opening') {
      setupMember.car.controls.autoRotate = false
    } else {
      setupMember.car.controls.autoRotate = true
    }

    carRotation(
      'resetor',
      webglCtrl.car,
      1000,
    )

    const { position, target } = fixCamerawork(
      cameraWork.position,
      cameraWork.target,
      cameraWork.rotation,
    )

    cameraAnimation(
      new THREE.Vector3(position.x, position.y, position.z),
      new THREE.Vector3(target.x, target.y, target.z),
      1000,
    )
  }

  return (
    <div>

      {/* アコーディオンヘッダー */}
      <button
        className={`${debugPanelStyles.accordionHeader} ${activeAccordion === 'camera' ? debugPanelStyles.accordionActive : ''}`}
        onClick={() => setActiveAccordion(activeAccordion === 'camera' ? '' : 'camera')}
      >
        カメラワークの変更
        <span className={`${debugPanelStyles.accordionArrow}`}>▼</span>
      </button>

      {/* アコーディオンコンテンツ */}
      {activeAccordion === 'camera' && (
        <div className={`${debugPanelStyles.accordionContent} ${styles.cameraList}`}>
          <div
            className={`${styles.cameraItem} ${currentCamera === 'body' ? styles.cameraItemActive : ''}`}
            onClick={() => handleCameraChange('body', setupMember.camera.changer.body)}
          >
            ボディ
          </div>
          <div
            className={`${styles.cameraItem} ${currentCamera === 'tire' ? styles.cameraItemActive : ''}`}
            onClick={() => handleCameraChange('tire', setupMember.camera.changer.tire)}
          >
            タイヤ
          </div>
          <div
            className={`${styles.cameraItem} ${currentCamera === 'sidemirror' ? styles.cameraItemActive : ''}`}
            onClick={() => handleCameraChange('sidemirror', setupMember.camera.changer.sidemirror)}
          >
            サイドミラー
          </div>
          <div
            className={`${styles.cameraItem} ${currentCamera === 'default' ? styles.cameraItemActive : ''}`}
            onClick={() => handleCameraChange('default', setupMember.camera.default)}
          >
            ワールド全体
          </div>
          <div
            className={`${styles.cameraItem} ${currentCamera === 'opening' ? styles.cameraItemActive : ''}`}
            onClick={() => handleCameraChange('opening', setupMember.camera.opening)}
          >
            デフォルト
          </div>
        </div>
      )}
    </div>
  )
}
