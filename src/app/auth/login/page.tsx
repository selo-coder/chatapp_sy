"use client"

import AuthFormWrapper from "@/components/auth/authFormWrapper"
import LoginForm from "@/components/auth/loginForm"
import SignOutModal from "@/components/modal/signOutModal"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function LoginPage() {
  const { status } = useSession()
  const [showModal, setShowModal] = useState(false)
  const [modalDisable, setModalDisable] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") setModalDisable(true)

    if (status === "authenticated" && !modalDisable) setShowModal(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status])

  return (
    <AuthFormWrapper>
      <>
        <LoginForm />

        {showModal && <SignOutModal setShowModal={setShowModal} />}
      </>
    </AuthFormWrapper>
  )
}
