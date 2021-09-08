import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import useStore from '../state';
import { gsap } from "gsap";   
import useSound from 'use-sound'
import bump from '../audio/enterGame.mp3' 
import lift from '../audio/open.mp3' 
 
export default function Model(props) {
  const group = useRef()
  const upbutton = useRef()
  const { nodes, materials } = useGLTF('/elevator2.glb')
  const { doorOpen } = useStore(); 
  const { goUpFloor } = useStore(); 
 
  const leftdoor = useRef() 
  const rightdoor = useRef()  
  const doorOpener = useStore((state) => state.doorOpener) 
  const doorCloser = useStore((state) => state.doorCloser) 
    
  const [play] = useSound(bump, {
    volume: 0.13 ,
    onend: () => {
      // console.info('Sound ended!')
    }
  })
  const [play2] = useSound(lift, {
    volume: 0.13 ,
    onend: () => {
      // console.info('Sound ended!')
    }
  })

  if (doorOpener){ 
    play();   
 
    gsap.to( leftdoor.current.position, {
      duration: 1.2,  
      delay: 1,
      x: leftdoor.current.position.x,
      y: leftdoor.current.position.y,
      z: leftdoor.current.position.z+250, 
    }); 
    gsap.to( rightdoor.current.position, {
      duration: 1.2,  
      delay: 1,
      x: rightdoor.current.position.x,
      y: rightdoor.current.position.y,
      z: rightdoor.current.position.z-250, 
    }); 

    setTimeout(() => { 
    play2();
    }, 200) 
  }

  //would be better off just reversing thetimeline!!!!!
  //better off just reversing thetimeline!!!!!
  if (doorCloser){ 
    console.log('doorCloser animate door')
    gsap.to( leftdoor.current.position, {
      duration: 2,  
      x: leftdoor.current.position.x,
      y: leftdoor.current.position.y,
      z: leftdoor.current.position.z-250, 
    }); 
    gsap.to( rightdoor.current.position, {
      duration: 2,  
      x: rightdoor.current.position.x,
      y: rightdoor.current.position.y,
      z: rightdoor.current.position.z+250, 
    });  
    setTimeout(() => { 
       goUpFloor();
    }, 2000);
  }

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={[0.1, 0.1, 0.1]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[299, 170, 318]} rotation={[Math.PI / 2, 0, 0]} scale={[2.53, 14.59, 13.76]}>
            <mesh geometry={nodes.B_Down_Material001_0.geometry} material={nodes.B_Down_Material001_0.material} />
            <mesh geometry={nodes.B_Down_Material003_0.geometry} material={nodes.B_Down_Material003_0.material} />
          </group>
          <group ref={upbutton}   position={[299, 210, 318]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.53, 14.59, 13.76]}>
            <mesh  
              geometry={nodes.B_Up_Material001_0.geometry}
              material={nodes.B_Up_Material001_0.material}
              position={[-15.43, -0.01, 0]}
              rotation={[0, 0, -3.13]}
            />
            <mesh onClick={doorOpen}
              geometry={nodes.B_Up_Material003_0.geometry}
              material={nodes.B_Up_Material003_0.material}
              position={[-15.43, -0.01, 0]}
              rotation={[0, 0, -3.13]}
            />
          </group>
          <group  ref={leftdoor} position={[287.15, 189.52, 125.13]} rotation={[-Math.PI / 2, 0, 0]} scale={[297, 385, 368.28]}>
            <mesh geometry={nodes.Door__0.geometry} material={nodes.Door__0.material} />
          </group>
          <group ref={rightdoor} position={[287.15, 189.52, -125.13]} rotation={[-Math.PI / 2, 0, -Math.PI]} scale={[297, 385, 368.28]}>
            <mesh geometry={nodes.Door001__0.geometry} material={nodes.Door001__0.material} />
          </group>
          <group position={[0, 300, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[297, 385, 368.28]}>
            <mesh geometry={nodes.Elevator_Material001_0.geometry} material={nodes.Elevator_Material001_0.material} />
            <mesh geometry={nodes.Elevator_Material002_0.geometry} material={materials['Material.003']} />
            <mesh geometry={nodes.Elevator_Material_0.geometry} material={materials['Material.001']} />
          </group>
          <group position={[298.24, 500, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[2.02, 53.76, 20.8]}>
            <mesh geometry={nodes.Top__0.geometry} material={nodes.Top__0.material} />
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/elevator2.glb')
