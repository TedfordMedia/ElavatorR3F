import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/whitelongshirt.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="RootNode_(gltf_orientation_matrix)" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="RootNode_(model_correction_matrix)">
            <group name="Collada_visual_scene_group" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Shirt_low">
                <mesh name="defaultMaterial" geometry={nodes.defaultMaterial.geometry} material={materials.Shirt} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/whitelongshirt.glb')
