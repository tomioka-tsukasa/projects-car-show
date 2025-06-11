import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { LoadedAssets } from '../../setupMember'

export type GetWorld = (
  renderer: THREE.WebGLRenderer,
  model: GLTF,
  loadedAssets?: LoadedAssets,
  envmap?: THREE.Texture,
) => GLTF
