'use client'

import Canvas from './components/Canvas/Canvas'
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen'
import { DebugPanel } from './components/DebugPanel/DebugPanel'
import * as styles from './page.css'

const Home = () => {
  return (
    <div>
      <div className={`${styles.content}`}>
        <div className={`${styles.inner}`}>
          <div className={`${styles.lineTop}`} />
          <div className={`${styles.lineBottom}`} />
          <div className={`${styles.titleContainer}`}>
            <h1 className={`${styles.title}`}>Vermilion </h1>
            <div className={`${styles.subTitleArea}`}>
              <h2 className={`${styles.subtitle}`}>Presents by Alexander Stalin.</h2>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.mask}`}></div>
      <div className={`${styles.canvas}`}>
        <Canvas />
      </div>
      <DebugPanel />
      <LoadingScreen />
    </div>
  )
}

export default Home
