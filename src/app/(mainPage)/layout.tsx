"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/auth/login")
  }

  return status === "authenticated" ? (
    <div>hallo{children}</div>
  ) : (
    <p>Loading...</p>
  )
}
