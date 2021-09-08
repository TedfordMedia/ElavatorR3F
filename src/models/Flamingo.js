import React, { useRef , useEffect} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/Flamingo.glb')
  const { actions } = useAnimations(animations, group)
 
  useEffect(() => { 
    actions.KeyAction.play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        name="Object_0"
        geometry={nodes.Object_0.geometry}
        material={materials.Material_0_COLOR_0}
        morphTargetDictionary={nodes.Object_0.morphTargetDictionary}
        morphTargetInfluences={nodes.Object_0.morphTargetInfluences}
        rotation={[Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/Flamingo.glb')