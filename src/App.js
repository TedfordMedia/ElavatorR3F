import React, { useRef, useState, Suspense, useEffect  } from 'react'
import { Canvas } from '@react-three/fiber'
import Elevator from "./models/Elevator2"; 
import Flamingo from "./models/Flamingo"; 
import { OrbitControls, Sky, Environment, Html } from '@react-three/drei'

import * as THREE from 'three'
import { Box } from '@react-three/drei'
import { gsap } from "gsap";   
import useStore from './state';
import { useAspect } from "@react-three/drei"; 
import MyFlock from "./components/flocks" 

function Scene() {
  const size = useAspect(1800, 1000);
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = "donna.mp4";
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true;
    return vid;
  });
  // Keep in mind videos can only play once the user has interacted with the site ...
  useEffect(() => void video.play(), [video]);
  return (
    <mesh scale={size}>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial>
        <videoTexture attach="map" args={[video]} />
      </meshBasicMaterial>
    </mesh>
  );
}
   
const Label = ({ text, position }) => {
  return (
    <mesh position={position}> 
      <Html>
        <div className="label">{text}</div>
      </Html>
    </mesh>
  )
}
function BoxNext(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const { doorClose } = useStore()
  const personDisplayName = useStore((state) => state.personDisplayName)

  return (
    <group>     
      <mesh
        {...props}
        ref={ref}
        scale={active ? 1.5 : 1}
        onClick={doorClose}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'purple' : 'blue'} />    
        <Label text={personDisplayName} position={[0, 0, 0]} />
      </mesh>
  
    </group>
 
  )
}

function BoxRaise(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  const { upRaiser } = useStore()

  const raiser = useStore((state) => state.triggerRaiser)

  useEffect((state, delta) => {  

    if (raiser){ //raiser is first initial Elevator appear through floor

      gsap.to( ref.current.position, {
        duration: 2,  
        x: ref.current.position.x,
        y: ref.current.position.y+18.7,
        z: ref.current.position.z, 
      });  
    } 
  })

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
function setUserDetails(state){
    //setup person details
 



  // if (urlParams.has('theid')){  
  
  //         checkUserDetails(state);
  //         var thisPerson = 
  //     } else { 
  //       set(state => ({ personDisplayName: true }))
  //     }

}

export default function App() {
  
  const refelevatorgroup = useRef()    
  const floor = useStore((state) => state.floor)
  const doorOpener = useStore((state) => state.doorOpener)
  const personDisplayName = useStore((state) => state.personDisplayName)
  const peopleArray = useStore((state) => state.peopleArray)
  const levelsDataArray = useStore((state) => state.levelsDataArray)
  const raiser = useStore((state) => state.triggerRaiser)
  // const setName = useStore((state) => state.setName)
  const {  setName } = useStore() 
  const {  clearRaiser } = useStore() 

  useEffect((state, delta) => {  
 
    const search = window.location.search;
    const params = new URLSearchParams(search);
    var theid = params.get('theid');
   
    // // setup person details  
    if (!personDisplayName){  
      if (!theid){
        theid = 0;
      } 
      const name = peopleArray[theid].name; 
      if (name){
        setName(name);
      } 
    }  
 
    if (raiser){ //raiser is first initial Elevator appear through floor

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
  })
 
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
        <BoxRaise position={[1, 1, 0]} >           </BoxRaise>   
        <BoxNext position={[2, 1, 0]} />   
        <group ref={refelevatorgroup} position={[0, -10, 4]} scale={[.1,.1,.1]} rotation={[0, Math.PI / 2, 0]}>
          <Elevator /> 
        </group> 
      </Suspense>

      <Suspense fallback={<Html></Html>}>  
        <Environment preset={thisLevel.backg} background /> 
      </Suspense>
    
      {floor === 1 &&
        <Box  args={[3, 1, 1]}/>
      }

      {floor === 2 && 
        <MyFlock/>
      }
 
      {floor === 2 &&
        <Box args={[1, 10, 1]} position={[0, 0,-10]}/>
      }  
 
      <OrbitControls target={[0,0,0]}/>   
    </Canvas>
  )
}
