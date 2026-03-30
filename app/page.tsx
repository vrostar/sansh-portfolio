"use client"

import Scene from "@/components/three/Scene"

export default function Page() {
  return (
    <main>
      {/* FIXED 3D BACKGROUND */}
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <Scene />
      </div>

      {/* SCROLL CONTENT */}
      <div className="relative z-10 h-[300vh]">
        <div className="h-screen flex items-center justify-center text-white">
          Scroll down
        </div>

        <div className="h-screen flex items-center justify-center text-white">
          More content
        </div>
      </div>
    </main>
  )
}