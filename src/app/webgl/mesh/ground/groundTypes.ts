import * as THREE from 'three'
import { LoadedAssets } from '../../setupMember'

export type GetGround = (
  loadedAssets: LoadedAssets,
) => THREE.Group
