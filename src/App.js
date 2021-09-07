import React, { useRef, useState, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import Elevator from "./models/Elevator2"; 
import { OrbitControls, Sky, Environment, Html, Plane } from '@react-three/drei'
import * as THREE from 'three'
import create from 'zustand'
import { gsap } from "gsap";   
import useStore from './state';
// import url from "/static/arintro.mp4";

 
const TV = () => {
  const { nodes } = useGLTF("tv.gltf");

  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src =  "/video/donna.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    vid.play();
    return vid;
  });

  return (
    <group position={[0, 1, 0]} rotation={[Math.PI / 8, Math.PI * 1.2, 0]}>
      <mesh castShadow geometry={nodes.TV.geometry}>
        <meshStandardMaterial color="grey" />
      </mesh>
      <mesh rotation={[0, Math.PI , 0]} position={[0, 0, 1.1]}>
        <planeGeometry args={[3.2, 1.9]} />
        <meshStandardMaterial   emissive={"white"} side={THREE.DoubleSide}>
          <videoTexture attach="map" args={[video]} />
          <videoTexture attach="emissiveMap" args={[video]} />
        </meshStandardMaterial>
      </mesh>
    </group>
  );
};
 

function BoxNext(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const { doorClose } = useStore()
 
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={doorClose}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'purple' : 'blue'} />
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
      <boxGeometry args={[.3, .3, .3]} />
      <meshStandardMaterial color={hovered ? 'pink' : 'pink'} />
    </mesh>
  )
}
 
export default function App() {
  
  const refelevatorgroup = useRef()  
  const floor = useStore((state) => state.floor)
  const doorOpener = useStore((state) => state.doorOpener)
  const levelsDataArray = useStore((state) => state.levelsDataArray)
  const raiser = useStore((state) => state.triggerRaiser)
  const {  clearRaiser } = useStore()
 
  if (raiser){ 

    gsap.to( refelevatorgroup.current.position, {
      duration: 2,  
      x: refelevatorgroup.current.position.x,
      y: refelevatorgroup.current.position.y+8.7,
      z: refelevatorgroup.current.position.z, 
    }); 

    setTimeout(() => {
      clearRaiser();;// this should really be done with ONCOMPLETE of the animation ..
    }, 2000)
 
  }
 
  const thisLevel = levelsDataArray[floor]
  console.log('floor:'+floor+' raiser:'+raiser+' doorOpener:'+doorOpener);
  console.log(JSON.stringify(thisLevel))
  
  return (
    <Canvas   
      onCreated={({ gl, camera, scene }) => {  
            gl.outputEncoding = THREE.sRGBEncoding
            gl.shadowMap.enabled = true;
            gl.shadowMap.type = THREE.PCFSoftShadowMap; 
    }}>
      <ambientLight intensity={0.5} /> 

      <Suspense fallback={<Html><h1 style={{color:'black'}}>Loading...</h1></Html>}>   
        <BoxRaise position={[1, 1, 0]} />   
        <BoxNext position={[2, 1, 0]} />   
        <group ref={refelevatorgroup} position={[0, -10, 4]} scale={[.1,.1,.1]} rotation={[0, Math.PI / 2, 0]}>
          <Elevator />
        </group> 
      </Suspense>

      <Suspense fallback={<Html></Html>}>  
        <Environment preset={thisLevel.backg} background /> 
      </Suspense>

      <OrbitControls target={[0,0,0]}/>   
    </Canvas>
  )
}
