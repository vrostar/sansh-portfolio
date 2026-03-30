"use client"

import { Canvas } from "@react-three/fiber"
import Background from "./Background"

export default function Scene() {
  return (
    <Canvas
    camera={{ position: [0, 0, 5], fov: 60 }}
    style={{ width: "100vw", height: "100vh" }}
    >
        <Background />
    </Canvas>
  )
}