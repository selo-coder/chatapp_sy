"use client"

import { useEffect, useState } from "react"

/**
 * This hook can be used to read
 * whether the page is mobile in its current state. This means under 700px.
 * CHECK FOR TRUE OR FALSE; UNDEFINED MEANS, IT HASNT CHECKED YET
 */

const useIsMobile = (): boolean | undefined => {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return isMobile
}

export default useIsMobile
