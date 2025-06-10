import * as THREE from 'three'
import * as styles from './DebugEnvmap.css'
import * as debugPanelStyles from '../../DebugPanel.css'
import { UiImage } from '@/components/ui/Image/UiImage'
import { loadingEnvmaps, setupMember, webglCtrl } from '@/app/webgl/setupMember'
import { useState } from 'react'

type EnvMapName = (typeof loadingEnvmaps)[number]['name']

type EnvMapTarget = 'car' | 'world'

export const DebugEnvmap = () => {
  const [currentEnvMap, setCurrentEnvMap] = useState<{
    car: EnvMapName,
    world: EnvMapName,
  }>({
    car: setupMember.car.material.environment,
    world: setupMember.world.material.environment,
  })

  const [intensity, setIntensity] = useState<{
    car: number,
    world: number,
  }>({
    car: setupMember.car.material.envmapIntensity,
    world: setupMember.world.material.envmapIntensity,
  })

  /**
   * 環境テクスチャを変更する
   */
  const handleEnvMapChange = (
    target: EnvMapTarget,
    envMapName: EnvMapName,
  ) => {
    if (!webglCtrl.car || !webglCtrl.world) return

    // 環境テクスチャを変更
    setCurrentEnvMap({
      ...currentEnvMap,
      [target]: envMapName,
    })

    // 対象シーンを取得
    const scene = webglCtrl[target]?.scene

    if (!scene) return

    // 対象シーンの環境テクスチャを変更
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (webglCtrl.envmaps) {
          child.material.envMap = webglCtrl.envmaps[envMapName] || null
        }
      }
    })
  }

  /**
   * 反射強度を変更する
   */
  const handleEnvMapIntensityChange = (
    value: number,
    target: EnvMapTarget,
  ) => {
    if (!webglCtrl.scene) return

    // 反射強度を更新
    setIntensity({
      ...intensity,
      [target]: value,
    })

    // 対象シーンを取得
    const scene = webglCtrl[target]?.scene

    if (!scene) return

    // 対象シーンの環境テクスチャを変更
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (webglCtrl.envmaps) {
          child.material.envMapIntensity = value
        }
      }
    })
  }

  return (
    <div>

      {/* アコーディオンヘッダー */}
      <button
        className={`${debugPanelStyles.contentHeader}`}
      >
        環境テクスチャの変更
      </button>

      {/* アコーディオンコンテンツ */}
      <div className={`${debugPanelStyles.contentArea}`}>
        <div className={`${styles.envmapList}`}>

          {/* 車の環境テクスチャ */}
          <div className={`${styles.envmapItem}`}>

            {/* タイトル */}
            <h3 className={`${styles.envmapTitle}`}>車の反射テクスチャ</h3>

            {/* リスト */}
            <div className={`${styles.textureList}`}>
              <div
                className={`${styles.textureItem} ${currentEnvMap.car === 'stierberg_sunrise_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('car', 'stierberg_sunrise_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-stierberg_sunrise_1k.jpg' alt='stierberg_sunrise_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>青白い色合い</div>
              </div>
              <div
                className={`${styles.textureItem} ${currentEnvMap.car === 'blocky_photo_studio_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('car', 'blocky_photo_studio_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-blocky_photo_studio_1k.jpg' alt='blocky_photo_studio_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>スタジオ部屋</div>
              </div>
              <div
                className={`${styles.textureItem} ${currentEnvMap.car === 'bambanani_sunset_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('car', 'bambanani_sunset_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-bambanani_sunset_1k.jpg' alt='bambanani_sunset_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>夕焼けの色合い</div>
              </div>
            </div>

            {/* 反射強度 */}
            <div className={`${styles.intensityControl}`}>
              <div className={`${styles.intensityHead}`}>
                <label className={`${styles.intensityLabel}`}>反射強度</label>
                <div className={`${styles.intensityCurrent}`}>
                  強度: {intensity.car.toFixed(1)}
                </div>
              </div>
              <input
                className={`${styles.intensitySlider}`}
                type='range'
                min='0'
                max='2'
                step='0.1'
                defaultValue={setupMember.car.material.envmapIntensity}
                onChange={(e) => handleEnvMapIntensityChange(
                  Number(e.target.value),
                  'car',
                )}
              />
            </div>
          </div>

          {/* ワールドの環境テクスチャ */}
          <div className={`${styles.envmapItem}`}>

            {/* タイトル */}
            <h3 className={`${styles.envmapTitle}`}>ワールドの反射テクスチャ</h3>

            {/* リスト */}
            <div className={`${styles.textureList}`}>
              <div
                className={`${styles.textureItem} ${currentEnvMap.world === 'stierberg_sunrise_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('world', 'stierberg_sunrise_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-stierberg_sunrise_1k.jpg' alt='stierberg_sunrise_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>青白い色合い</div>
              </div>
              <div
                className={`${styles.textureItem} ${currentEnvMap.world === 'blocky_photo_studio_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('world', 'blocky_photo_studio_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-blocky_photo_studio_1k.jpg' alt='blocky_photo_studio_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>スタジオ部屋</div>
              </div>
              <div
                className={`${styles.textureItem} ${currentEnvMap.world === 'bambanani_sunset_1k' ? styles.textureItemActive : ''}`}
                onClick={() => handleEnvMapChange('world', 'bambanani_sunset_1k')}
              >
                <div className={`${styles.texturePreview}`}>
                  <UiImage src='/assets/images/controller/envmap-kv-bambanani_sunset_1k.jpg' alt='bambanani_sunset_1k' width={800} height={450} />
                </div>
                <div className={`${styles.textureTitle}`}>夕焼けの色合い</div>
              </div>
            </div>

            {/* 反射強度 */}
            <div className={`${styles.intensityControl}`}>
              <div className={`${styles.intensityHead}`}>
                <label className={`${styles.intensityLabel}`}>反射強度</label>
                <div className={`${styles.intensityCurrent}`}>
                  強度: {intensity.world.toFixed(1)}
                </div>
              </div>
              <input
                className={`${styles.intensitySlider}`}
                type='range'
                min='0'
                max='2'
                step='0.1'
                defaultValue={setupMember.world.material.envmapIntensity}
                onChange={(e) => handleEnvMapIntensityChange(
                  Number(e.target.value),
                  'world',
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
