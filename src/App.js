import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Elevator from "./models/Elevator2"; 
import { OrbitControls, Sky, Environment, Html, Plane } from '@react-three/drei'
import * as THREE from 'three'
import create from 'zustand'
import { gsap } from "gsap";   
import useStore from './state';
 
function Box(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const {  upRaiser } = useStore()

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={upRaiser}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

function BoxRaise(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const { upRaiser } = useStore()
 
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={upRaiser}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'purple' : 'blue'} />
    </mesh>
  )
}
 
export default function App() {
  
  const refelevatorgroup = useRef() 
  const floor = useStore((state) => state.floor)
  const raiser = useStore((state) => state.triggerRaiser)
  const {  clearRaiser } = useStore()
 
  if (raiser){ 

    gsap.to( refelevatorgroup.current.position, {
      duration: 2,  
      x: refelevatorgroup.current.position.x,
      y: refelevatorgroup.current.position.y+8.7,
      z: refelevatorgroup.current.position.z, 
    }); 
    clearRaiser();//test only

  }
 
  console.log('floor:'+floor);
  
  return (
    <Canvas   
      onCreated={({ gl, camera, scene }) => {  
            gl.outputEncoding = THREE.sRGBEncoding
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap; 
    }}>
      <ambientLight intensity={0.5} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />  */}
 
        <Suspense fallback={<Html><h1 style={{color:'black'}}>Loading...</h1></Html>}>  
          <Box position={[1, 7, 0]} />  
          <BoxRaise position={[1, 1, 0]} />   
          <group ref={refelevatorgroup} position={[0, -10, 4]} scale={[.1,.1,.1]} rotation={[0, Math.PI / 2, 0]}>
            <Elevator />
          </group>
          <Environment preset="dawn"   background /> 
        </Suspense>

        <OrbitControls target={[0,0,0]}/>   
    </Canvas>
  )
}
