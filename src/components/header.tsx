/* eslint-disable no-unsafe-optional-chaining */

"use client"

import { useEffect, useRef, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import socket from "@/socket"
import Button from "./common/button"
import MotionTitle from "./common/motionTitle"

export default function Header() {
  const { data } = useSession()
  const router = useRouter()
  const [showMenu, setShowMenu] = useState(false)
  const observerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (observerRef.current && !observerRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRef])

  return (
    <div className="w-full bg-dark-green h-16 md:h-24 shrink-0 !min-h-16 !md:min-h-24 flex justify-between items-center px-6 md:px-8">
      <MotionTitle
        className="text-[clamp(1.2rem,2cqw,3rem)]"
        label="Chatapp by Selo"
      />

      <div className="relative" ref={observerRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          type="button"
          className="w-10 h-10 z-20 rounded-full relative bg-swamp-green hover:bg-swamp-green/75 active:bg-swamp-green/50 flex items-center justify-center cursor-pointer duration-200 ease transition-all"
        >
          {data?.user && (
            <span>{data?.user.firstName[0] + data?.user.lastName[0]}</span>
          )}
        </button>

        {showMenu && (
          <div className="w-24 p-2 rounded-lg bg-swamp-green z-10 absolute translate-x-[-50%] top-0 flex flex-col">
            <div className="h-8" />

            <Button
              className="h-8 min-h-8 text-sm"
              label="Sign-Out"
              onClick={async () => {
                const response = await signOut({ redirect: false })

                if (socket.connected === true) socket.disconnect()

                if (response) router.push("/auth/login")
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}
