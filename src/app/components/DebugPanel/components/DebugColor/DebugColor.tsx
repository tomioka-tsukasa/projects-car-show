import * as THREE from 'three'
import * as styles from './DebugColor.css'
import * as debugPanelStyles from '../../DebugPanel.css'
import { UiImage } from '@/components/ui/Image/UiImage'
import { animateCarBodyColor } from '@/app/webgl/animation/carBodyColor/carBodyColor'
import { colorMember } from '@/app/webgl/colorMember'
import { useState } from 'react'

type Props = {
  activeAccordion: string
  setActiveAccordion: (value: string) => void
}

type Color = keyof typeof colorMember.car

export const DebugColor = ({ activeAccordion, setActiveAccordion }: Props) => {
  const [currentColor, setCurrentColor] = useState<Color>('blue')

  /**
   * 車のカラーを変更する
   */
  const handleColorChange = (
    color: Color,
    bodyColor: THREE.Color,
    emissiveColor: THREE.Color,
  ) => {
    setCurrentColor(color)

    animateCarBodyColor('Car_Paint', bodyColor, emissiveColor, 1200)
  }

  return (
    <div>

      {/* アコーディオンヘッダー */}
      <button
        className={`${debugPanelStyles.accordionHeader} ${activeAccordion === 'color' ? debugPanelStyles.accordionActive : ''}`}
        onClick={() => setActiveAccordion(activeAccordion === 'color' ? '' : 'color')}
      >
        カラーの変更
        <span className={`${debugPanelStyles.accordionArrow}`}>▼</span>
      </button>

      {/* アコーディオンコンテンツ */}
      {activeAccordion === 'color' && (
        <div className={`${debugPanelStyles.accordionContent} ${styles.colorList}`}>

          {/* ブルー */}
          <div
            className={`${styles.colorItem} ${currentColor === 'blue' ? styles.colorItemActive : ''}`}
            onClick={() => handleColorChange('blue', colorMember.car.blue, colorMember.worldEmissive.blue)}
          >
            <div className={`${styles.colorPreview}`}>
              <UiImage src='/assets/images/controller/body-color-blue.jpg' alt='blue' width={1080} height={1080} />
            </div>
          </div>

          {/* オレンジ */}
          <div
            className={`${styles.colorItem} ${currentColor === 'orange' ? styles.colorItemActive : ''}`}
            onClick={() => handleColorChange('orange', colorMember.car.orange, colorMember.worldEmissive.orange)}
          >
            <div className={`${styles.colorPreview}`}>
              <UiImage src='/assets/images/controller/body-color-orange.jpg' alt='orange' width={1080} height={1080} />
            </div>
          </div>

          {/* シルバー */}
          <div
            className={`${styles.colorItem} ${currentColor === 'silver' ? styles.colorItemActive : ''}`}
            onClick={() => handleColorChange('silver', colorMember.car.silver, colorMember.worldEmissive.silver)}
          >
            <div className={`${styles.colorPreview}`}>
              <UiImage src='/assets/images/controller/body-color-silver.jpg' alt='silver' width={1080} height={1080} />
            </div>
          </div>

          {/* パープル */}
          <div
            className={`${styles.colorItem} ${currentColor === 'purple' ? styles.colorItemActive : ''}`}
            onClick={() => handleColorChange('purple', colorMember.car.purple, colorMember.worldEmissive.purple)}
          >
            <div className={`${styles.colorPreview}`}>
              <UiImage src='/assets/images/controller/body-color-purple.jpg' alt='purple' width={1080} height={1080} />
            </div>
          </div>

          {/* グリーン */}
          <div
            className={`${styles.colorItem} ${currentColor === 'green' ? styles.colorItemActive : ''}`}
            onClick={() => handleColorChange('green', colorMember.car.green, colorMember.worldEmissive.green)}
          >
            <div className={`${styles.colorPreview}`}>
              <UiImage src='/assets/images/controller/body-color-green.jpg' alt='green' width={1080} height={1080} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
