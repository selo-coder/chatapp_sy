"use client"

import Header from "@/components/header"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { MainmainDataProvider } from "@/provider/mainDataProvider"

export default function Layout({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const router = useRouter()

  if (status === "unauthenticated") {
    router.push("/auth/login")
  }

  return status === "authenticated" ? (
    <MainmainDataProvider>
      <div className="bg-dark-blue min-h-screen max-h-screen h-screen max-w-screen w-full overflow-hidden flex flex-col">
        <Header />

        {children}
      </div>
    </MainmainDataProvider>
  ) : (
    <div className="h-screen w-screen flex bg-dark-blue justify-center items-center">
      <svg
        className="animate-spin h-10 w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  )
}
