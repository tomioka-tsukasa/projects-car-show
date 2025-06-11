import * as THREE from 'three'
import { LoadedAssets } from '../../setupMember'

export type GetGround = (
  renderer: THREE.WebGLRenderer,
  loadedAssets: LoadedAssets,
) => THREE.Group
