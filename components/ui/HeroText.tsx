"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function HeroText() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const chars = textRef.current?.querySelectorAll(".char")

    if (!chars) return

    gsap.fromTo(
    chars,
    {
        y: () => gsap.utils.random(50, 150),
        opacity: 0,
        rotate: () => gsap.utils.random(-20, 20)
    },
    {
        y: 0,
        opacity: 1,
        rotate: 0,
        stagger: {
        each: 0.03,
        from: "random"
        },
        duration: 1.8,
        ease: "power3.out"
    }
    )

        gsap.to(chars, {
    filter: "blur(0px)",
    duration: 1,
    stagger: 0.05
    })
  }, [])

  const text = "I am Pibble"

  return (
    <div className="h-screen flex items-center justify-center">
      <h1
        ref={textRef}
        className="text-white text-[10vw] leading-none font-bold"
      >
        {text.split("").map((char, i) => (
          <span key={i} className="char inline-block">
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  )
}