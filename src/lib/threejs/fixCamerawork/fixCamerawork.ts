import { TabletMqWidthMin } from '@/styles/responsive.config'

export const fixCamerawork = (
  position: { x: number, y: number, z: number, mobile: { x: number, y: number, z: number } },
  target: { x: number, y: number, z: number, mobile: { x: number, y: number, z: number } },
  rotation: { x: number, y: number, z: number, mobile: { x: number, y: number, z: number } },
): {
  position: { x: number, y: number, z: number },
  target: { x: number, y: number, z: number },
  rotation: { x: number, y: number, z: number },
} => {
  if (window.innerWidth > TabletMqWidthMin) {

    // PCの場合
    return {
      position: {
        x: position.x,
        y: position.y,
        z: position.z,
      },
      target: {
        x: target.x,
        y: target.y,
        z: target.z,
      },
      rotation: {
        x: rotation.x,
        y: rotation.y,
        z: rotation.z,
      },
    }

  } else {

    // スマホの場合
    return {
      position: {
        x: position.mobile.x,
        y: position.mobile.y,
        z: position.mobile.z,
      },
      target: {
        x: target.mobile.x,
        y: target.mobile.y,
        z: target.mobile.z,
      },
      rotation: {
        x: rotation.mobile.x,
        y: rotation.mobile.y,
        z: rotation.mobile.z,
      },
    }
  }
}
