import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { LoadedAssets } from '../../setupMember'

export type GetWorld = (
  model: GLTF,
  loadedAssets?: LoadedAssets,
  envmap?: THREE.Texture,
) => GLTF
