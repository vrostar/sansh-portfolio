"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(SplitText, ScrollTrigger)

export default function IntroText() {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (!ref.current) return

    document.fonts.ready.then(() => {
      SplitText.create(ref.current!, {
        type: "lines",
        mask: "lines",
        autoSplit: true,

        onSplit(self) {
          return gsap.from(self.lines, {
            y: 100,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
              scrub: false
            }
          })
        }
      })
    })
  }, [])

  return (
    <p
      ref={ref}
      className="text-white text-5xl max-w-3xl text-center leading-tight"
    >
      A showcase of the stuff I made
    </p>
  )
}