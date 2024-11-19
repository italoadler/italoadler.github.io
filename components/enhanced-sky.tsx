"use client"

import React, { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sky, OrbitControls, Cloud, Stars } from "@react-three/drei"
import * as THREE from "three"

function Scene() {
  const cloudRef = useRef<THREE.Mesh>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)

  useFrame((state) => {
    if (cloudRef.current) {
      cloudRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
    if (cameraRef.current) {
      // Atualiza a posição da câmera para simular o movimento de voo
      const time = state.clock.getElapsedTime()
      cameraRef.current.position.x = Math.sin(time) * 10
      cameraRef.current.position.y = Math.sin(time / 2) * 5
      cameraRef.current.position.z = Math.cos(time) * 10
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <>
      <perspectiveCamera ref={cameraRef} position={[0, 0, 1]} fov={75} />
      <Sky
        distance={450000}
        sunPosition={[0, 0.05, -1]}
        inclination={0.1}
        azimuth={0.25}
        mieCoefficient={0.001}
        mieDirectionalG={0.99}
        rayleigh={3}
        turbidity={10}
      />
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      <Cloud
        ref={cloudRef}
        position={[10, 15, -25]}
        opacity={1.5}
        speed={0.4}
        width={10}
        depth={0.5}
        segments={200}
        color={new THREE.Color("#ffffff")}
      />
      <Cloud
        ref={cloudRef}
        position={[22, 15, -25]}
        opacity={1.05}
        speed={0.4}
        width={1000}
        depth={10.5}
        segments={20}
        color={new THREE.Color("#ffffff")}
      />
      <hemisphereLight intensity={0.5} groundColor={new THREE.Color("#ffffff")} />
      <directionalLight
        position={[0, 15, 15]}
        intensity={1}
        color={new THREE.Color("#ffffff")}
      />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export function EnhancedSky() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}