'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Quadtree implementation
class QuadTree {
  constructor(boundary, capacity) {
    this.boundary = boundary
    this.capacity = capacity
    this.points = []
    this.divided = false
  }

  subdivide() {
    const x = this.boundary.x
    const y = this.boundary.y
    const w = this.boundary.w / 2
    const h = this.boundary.h / 2

    const ne = new THREE.Box2(new THREE.Vector2(x + w, y), new THREE.Vector2(x + w + w, y + h))
    this.northeast = new QuadTree(ne, this.capacity)
    const nw = new THREE.Box2(new THREE.Vector2(x, y), new THREE.Vector2(x + w, y + h))
    this.northwest = new QuadTree(nw, this.capacity)
    const se = new THREE.Box2(new THREE.Vector2(x + w, y + h), new THREE.Vector2(x + w + w, y + h + h))
    this.southeast = new QuadTree(se, this.capacity)
    const sw = new THREE.Box2(new THREE.Vector2(x, y + h), new THREE.Vector2(x + w, y + h + h))
    this.southwest = new QuadTree(sw, this.capacity)

    this.divided = true
  }

  insert(point) {
    if (!this.boundary.containsPoint(point)) {
      return false
    }

    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    }

    if (!this.divided) {
      this.subdivide()
    }

    return (
      this.northeast.insert(point) ||
      this.northwest.insert(point) ||
      this.southeast.insert(point) ||
      this.southwest.insert(point)
    )
  }

  query(range, found = []) {
    if (!this.boundary.intersectsBox(range)) {
      return found
    }

    for (const p of this.points) {
      if (range.containsPoint(p)) {
        found.push(p)
      }
    }

    if (this.divided) {
      this.northwest.query(range, found)
      this.northeast.query(range, found)
      this.southwest.query(range, found)
      this.southeast.query(range, found)
    }

    return found
  }
}

// Shader code
const vertexShader = `
  attribute float size;
  varying vec3 vColor;
  uniform float time;
  uniform vec2 mouse;

  void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    float dist = distance(mouse, position.xy);
    float influence = smoothstep(0.5, 0.0, dist);
    mvPosition.z += sin(time * 2.0 + dist * 10.0) * 0.1 * influence;
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  varying vec3 vColor;

  void main() {
    if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
    gl_FragColor = vec4(vColor, 1.0);
  }
`

function ParticleSystem() {
  const { size, mouse } = useThree()
  const mesh = useRef()
  const quadtree = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < 5000; i++) {
      const x = Math.random() * 2 - 1
      const y = Math.random() * 2 - 1
      const z = Math.random() * 2 - 1
      temp.push(x, y, z)
    }
    return new Float32Array(temp)
  }, [])

  const colors = useMemo(() => {
    const temp = []
    for (let i = 0; i < 5000; i++) {
      const r = Math.random()
      const g = Math.random()
      const b = Math.random()
      temp.push(r, g, b)
    }
    return new Float32Array(temp)
  }, [])

  const sizes = useMemo(() => {
    const temp = []
    for (let i = 0; i < 5000; i++) {
      temp.push(Math.random() * 10 + 5)
    }
    return new Float32Array(temp)
  }, [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    mesh.current.material.uniforms.time.value = time
    mesh.current.material.uniforms.mouse.value = mouse

    // Update quadtree
    quadtree.current = new QuadTree(new THREE.Box2(new THREE.Vector2(-1, -1), new THREE.Vector2(1, 1)), 8)
    for (let i = 0; i < particles.length; i += 3) {
      quadtree.current.insert(new THREE.Vector2(particles[i], particles[i + 1]))
    }

    // Query quadtree for visible particles
    const frustum = new THREE.Frustum().setFromProjectionMatrix(
      new THREE.Matrix4().multiplyMatrices(state.camera.projectionMatrix, state.camera.matrixWorldInverse)
    )
    const visiblePoints = quadtree.current.query(new THREE.Box2(new THREE.Vector2(-1, -1), new THREE.Vector2(1, 1)))

    // Update only visible particles
    const positions = mesh.current.geometry.attributes.position.array
    for (const point of visiblePoints) {
      const i = point.x * 3
      positions[i + 2] = Math.sin(time * 2 + point.x * 10 + point.y * 10) * 0.1
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attachObject={['attributes', 'position']} count={particles.length / 3} array={particles} itemSize={3} />
        <bufferAttribute attachObject={['attributes', 'color']} count={colors.length / 3} array={colors} itemSize={3} />
        <bufferAttribute attachObject={['attributes', 'size']} count={sizes.length} array={sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          time: { value: 0 },
          mouse: { value: new THREE.Vector2(0, 0) },
        }}
        vertexColors
        transparent
      />
    </points>
  )
}

export function AdvancedShaderQuadtree() {
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ParticleSystem />
      </Canvas>
    </div>
  )
}