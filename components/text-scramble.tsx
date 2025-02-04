"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"

interface TextScrambleProps {
  text: string
}

const TextScramble: React.FC<TextScrambleProps> = ({ text }) => {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const chars = "!<>-_\\/[]{}—=+*^?#________"
    const originalText = text
    let currentText = ""
    let iteration = 0

    const scramble = () => {
      currentText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index]
          }
          return chars[Math.floor(Math.random() * chars.length)]
        })
        .join("")

      if (textRef.current) {
        textRef.current.textContent = currentText
      }

      if (iteration < originalText.length) {
        iteration += 1 / 3
        gsap.delayedCall(0.05, scramble)
      }
    }

    gsap.delayedCall(1, scramble)

    return () => {
      gsap.killTweensOf(scramble)
    }
  }, [text])

  return <div ref={textRef} className="text-scramble"></div>
}

export default TextScramble

