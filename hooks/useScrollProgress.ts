"use client"

import { useEffect, useState, useRef } from "react"

export function useScrollProgress() {
  const scrollRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const height =
        document.documentElement.scrollHeight - window.innerHeight

      scrollRef.current = scrollTop / height
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return scrollRef
}