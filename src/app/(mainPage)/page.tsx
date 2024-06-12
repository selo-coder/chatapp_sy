"use client"

import React, { useEffect, useState } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import socket from "../../socket"

export default function Home() {
  const router = useRouter()
  const [isConnected, setIsConnected] = useState(false)
  const [transport, setTransport] = useState("N/A")

  function onConnect() {
    setIsConnected(true)
    setTransport(socket.io.engine.transport.name)

    socket.io.engine.on("upgrade", (transportProp) => {
      setTransport(transportProp.name)
    })
  }

  const { data: session } = useSession()

  useEffect(() => {
    if (socket.connected) {
      onConnect()
    }

    function onDisconnect() {
      setIsConnected(false)
      setTransport("N/A")
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>

      <div className="bg-gradient-to-b from-cyan-50 to-cyan-200 p-2 flex gap-5 ">
        <div className="ml-auto flex gap-2">
          {session?.user ? (
            <>
              <p className="text-red-500"> {session.user.email}</p>
              <button
                type="button"
                className="text-red-500"
                onClick={async () => {
                  const response = await signOut({ redirect: false })

                  if (response) router.push("/auth/login")
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              type="button"
              className="text-green-600"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
