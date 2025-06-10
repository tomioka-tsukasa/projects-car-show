import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { LoadedAssets } from '../../setupMember'
export type GetCar = (
  model: GLTF,
  loadedAssets: LoadedAssets,
  envmap?: THREE.Texture,
) => GLTF
