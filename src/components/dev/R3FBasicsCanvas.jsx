import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function SpinningBlock() {
  const meshRef = useRef(null)

  useFrame((_, delta) => {
    if (!meshRef.current) {
      return
    }

    meshRef.current.rotation.x += delta * 0.55
    meshRef.current.rotation.y += delta * 0.8
  })

  return (
    <mesh ref={meshRef} castShadow position={[0, 0.2, 0]}>
      <boxGeometry args={[1.25, 1.25, 1.25]} />
      <meshStandardMaterial color="#8b5cf6" />
    </mesh>
  )
}

export function R3FBasicsCanvas() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-theme-muted">
        This route proves the standalone React Three Fiber shell with lights,
        controls, and a simple animated mesh.
      </p>

      <div className="h-[420px] overflow-hidden rounded-2xl border border-theme-border">
        <Canvas camera={{ position: [3.2, 2.4, 4.4], fov: 45 }} shadows>
          <color attach="background" args={['#0b1020']} />
          <ambientLight intensity={0.6} />
          <directionalLight
            castShadow
            intensity={1.4}
            position={[4, 5, 3]}
            shadow-mapSize-height={1024}
            shadow-mapSize-width={1024}
          />
          <SpinningBlock />
          <mesh receiveShadow position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#111827" />
          </mesh>
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  )
}
