import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedCube() {
  const mesh = useRef(); const edges = useRef()
  useFrame(({ clock: c }) => {
    const t = c.getElapsedTime()
    if (mesh.current)  { mesh.current.rotation.x = t*.18; mesh.current.rotation.y = t*.26 }
    if (edges.current) { edges.current.rotation.x = t*.18; edges.current.rotation.y = t*.26 }
  })
  return (
    <Float speed={1.4} floatIntensity={0.7} floatingRange={[-.15,.15]}>
      <group position={[-1.2, 0.7, 0]}>
        <mesh ref={mesh}>
          <boxGeometry args={[1.1,1.1,1.1]} />
          <meshStandardMaterial color="#000" transparent opacity={0.06} roughness={0.1} metalness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments ref={edges}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.1,1.1,1.1)]} />
          <lineBasicMaterial color="#000000" transparent opacity={0.7} />
        </lineSegments>
      </group>
    </Float>
  )
}

function AnimatedSphere() {
  const mesh = useRef()
  useFrame(({ clock: c }) => {
    const t = c.getElapsedTime()
    if (mesh.current) { mesh.current.rotation.y = t*.15; mesh.current.rotation.z = t*.08 }
  })
  return (
    <Float speed={1.0} floatIntensity={1.0} floatingRange={[-.2,.2]}>
      <group position={[1.0, -0.5, -0.3]}>
        <mesh ref={mesh}>
          <sphereGeometry args={[0.75, 48, 48]} />
          <meshStandardMaterial color="#000" transparent opacity={0.07} roughness={0.05} metalness={0.7} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.SphereGeometry(0.75, 10, 8)]} />
          <lineBasicMaterial color="#000000" transparent opacity={0.25} />
        </lineSegments>
        <mesh>
          <torusGeometry args={[0.82, 0.005, 12, 80]} />
          <meshBasicMaterial color="#0000cc" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

function AnimatedCylinder() {
  const mesh = useRef(); const edges = useRef()
  useFrame(({ clock: c }) => {
    const t = c.getElapsedTime()
    if (mesh.current)  { mesh.current.rotation.y = t*.2; mesh.current.rotation.x = t*.1 }
    if (edges.current) { edges.current.rotation.y = t*.2; edges.current.rotation.x = t*.1 }
  })
  return (
    <Float speed={1.2} floatIntensity={0.9} floatingRange={[-.12,.18]}>
      <group position={[0.2, 0.1, 0.5]}>
        <mesh ref={mesh}>
          <cylinderGeometry args={[0.45, 0.45, 1.2, 24]} />
          <meshStandardMaterial color="#000" transparent opacity={0.05} roughness={0.1} metalness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <lineSegments ref={edges}>
          <edgesGeometry args={[new THREE.CylinderGeometry(0.45, 0.45, 1.2, 16)]} />
          <lineBasicMaterial color="#000000" transparent opacity={0.45} />
        </lineSegments>
      </group>
    </Float>
  )
}

function Particles({ count = 60 }) {
  const geo = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i*3]   = (Math.random()-.5)*7
      pos[i*3+1] = (Math.random()-.5)*7
      pos[i*3+2] = (Math.random()-.5)*4
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  const ref = useRef()
  useFrame(({ clock: c }) => {
    if (ref.current) ref.current.rotation.y = c.getElapsedTime() * .01
  })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#000000" size={0.015} transparent opacity={0.2} sizeAttenuation />
    </points>
  )
}

function CameraDrift() {
  useFrame(({ camera, clock: c }) => {
    const t = c.getElapsedTime()
    camera.position.x = Math.sin(t*.07)*.2
    camera.position.y = Math.cos(t*.05)*.12
    camera.lookAt(0,0,0)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas camera={{ position:[0,0,5], fov:55 }} dpr={[1,1.5]}
      gl={{ antialias:true, alpha:true }} style={{ background:'transparent' }}>
      <CameraDrift />
      <ambientLight intensity={0.6} />
      <directionalLight position={[3,4,3]} intensity={1.0} color="#ffffff" />
      <pointLight position={[-3,-2,2]} intensity={0.4} color="#0000cc" />
      <AnimatedCube />
      <AnimatedSphere />
      <AnimatedCylinder />
      <Particles />
    </Canvas>
  )
}
