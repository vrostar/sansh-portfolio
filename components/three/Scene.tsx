"use client"

import { Canvas } from "@react-three/fiber"
import Background from "./Background"
import StarsWrapper from "./StarsWrapper"

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 90 }}>
      <Background />
      <StarsWrapper />
    </Canvas>
  )
}