"use client"

import { Stars } from "@react-three/drei"
import { useScrollProgress } from "@/hooks/useScrollProgress"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from "three"

export default function StarsWrapper() {
  const ref = useRef<THREE.Group>(null)
  const scrollRef = useScrollProgress()

  useFrame(() => {
    if (!ref.current) return

    const s = scrollRef.current

    // scale stars in as you scroll
    const eased = 1 - Math.pow(1 - s, 2) // ease-out
    const scale = THREE.MathUtils.lerp(3, 1, eased)
    ref.current.scale.set(scale, scale, scale)
  })

  return (
    <group ref={ref}>
      <Stars
        radius={250}
        depth={50}
        count={3000}
        factor={6}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  )
}