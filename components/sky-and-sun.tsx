"use client"

import React, { useRef } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { Sky, OrbitControls, shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing"
import { BlendFunction } from "postprocessing"

// Custom shader material for the sun
const SunMaterial = shaderMaterial(
  {
    time: 0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    varying vec2 vUv;
    
    float noise(vec2 uv) {
      return fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
    }
    
    void main() {
      vec2 uv = vUv - 0.5;
      float r = length(uv);
      float angle = atan(uv.y, uv.x);
      
      float intensity = 1.0 - smoothstep(0.0, 0.5, r);
      intensity += 0.1 * noise(uv + time * 0.1);
      
      vec3 color = mix(vec3(1.0, 0.8, 0.2), vec3(1.0, 0.4, 0.0), r * 2.0);
      
      gl_FragColor = vec4(color * intensity, 1.0);
    }
  `
)

// Extend the custom material to make it available in JSX
extend({ SunMaterial })

// Add type for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      sunMaterial: any
    }
  }
}

function Sun() {
  const materialRef = useRef<any>()

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.time = clock.getElapsedTime()
    }
  })

  return (
    <mesh position={[0, 10, -1000]} scale={100}>
      <planeGeometry args={[1, 1]} />
      <sunMaterial ref={materialRef} />
    </mesh>
  )
}

function Scene() {
  const { camera } = useThree()

  React.useEffect(() => {
    camera.position.set(0, 1, 10)
  }, [camera])

  return (
    <>
      <Sky sunPosition={[0, 0.5, -1]} turbidity={8} rayleigh={6} mieCoefficient={0.005} mieDirectionalG={0.8} />
      <Sun />
      <OrbitControls />
    </>
  )
}

export function SkyAndSun() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Scene />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={[0.0005, 0.0005]} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}