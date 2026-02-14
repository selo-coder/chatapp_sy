/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { motion } from "framer-motion"
import React from "react"

// Transparente Parent-Komponente, die Inhalte overlayt
function RomanticHeartsBackground({ children }: any) {
  const hearts = Array.from({ length: 200 })

  return (
    <div className="fixed w-full h-screen bg-black overflow-hidden z-0">
      {/* Herzen im Hintergrund */}
      <div className="absolute inset-0 pointer-events-none">
        {hearts.map((_, i) => {
          const delay = 0
          const duration = 5 + Math.random() * 6
          const startX = Math.random() * 100 // Full width() * 100;
          const endX = startX + 20
          const size = 20 + Math.random() * 30

          return (
            <motion.div
              key={i}
              initial={{ y: "100%", x: `${startX}%`, opacity: 0 }}
              animate={{ y: "100%", x: `${endX}%`, opacity: [0, 1, 1, 0] }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-pink-400 opacity-30"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          )
        })}
      </div>

      {/* Deine Inhalte oben drauf */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default React.memo(RomanticHeartsBackground)
