import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ── Animated Cube ───────────────────────────────────────── */
function AnimatedCube() {
  const meshRef = useRef()
  const edgesRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.18
      meshRef.current.rotation.y = t * 0.26
    }
    if (edgesRef.current) {
      edgesRef.current.rotation.x = t * 0.18
      edgesRef.current.rotation.y = t * 0.26
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8} floatingRange={[-0.15, 0.15]}>
      <group position={[-1.1, 0.5, 0]}>
        {/* Solid face — warm translucent */}
        <mesh ref={meshRef}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <meshStandardMaterial
            color="#c9a96e"
            transparent
            opacity={0.08}
            roughness={0.1}
            metalness={0.6}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Wireframe edges */}
        <lineSegments ref={edgesRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(1.3, 1.3, 1.3)]} />
          <lineBasicMaterial color="#e8d5b0" transparent opacity={0.55} />
        </lineSegments>
      </group>
    </Float>
  )
}

/* ── Animated Sphere ─────────────────────────────────────── */
function AnimatedSphere() {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.z = t * 0.08
    }
  })

  return (
    <Float speed={1.0} rotationIntensity={0.15} floatIntensity={1.2} floatingRange={[-0.25, 0.2]}>
      <mesh ref={meshRef} position={[0.9, -0.6, -0.5]}>
        <sphereGeometry args={[0.85, 64, 64]} />
        <MeshDistortMaterial
          color="#aaaaaa"
          transparent
          opacity={0.12}
          distort={0.25}
          speed={1.5}
          roughness={0.05}
          metalness={0.8}
        />
      </mesh>
      {/* Outer ring halo */}
      <mesh position={[0.9, -0.6, -0.5]}>
        <torusGeometry args={[0.95, 0.006, 16, 128]} />
        <meshBasicMaterial color="#c9a96e" transparent opacity={0.3} />
      </mesh>
    </Float>
  )
}

/* ── Particle field ──────────────────────────────────────── */
function Particles({ count = 120 }) {
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 9
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9
      positions[i * 3 + 2] = (Math.random() - 0.5) * 5
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return g
  }, [count])

  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.012
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.008) * 0.05
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#e8d5b0"
        size={0.018}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

/* ── Camera drift ────────────────────────────────────────── */
function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime()
    camera.position.x = Math.sin(t * 0.07) * 0.25
    camera.position.y = Math.cos(t * 0.05) * 0.15
    camera.lookAt(0, 0, 0)
  })
  return null
}

/* ── Scene root ──────────────────────────────────────────── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <CameraDrift />

      {/* Lighting */}
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 3]} intensity={0.9} color="#fff5e0" />
      <pointLight position={[-4, -3, 2]} intensity={0.6} color="#c9a96e" />
      <pointLight position={[4, 2, -3]} intensity={0.4} color="#6090c0" />

      {/* Objects */}
      <AnimatedCube />
      <AnimatedSphere />
      <Particles />
    </Canvas>
  )
}
