"use client"

import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import socket from "@/socket"
import Modal from "./modal"
import Button from "../common/button"

interface SignOutModalProps {
  setShowModal: (showModal: boolean) => void
}

export default function SignOutModal({ setShowModal }: SignOutModalProps) {
  const router = useRouter()
  const { data } = useSession()

  return (
    <Modal
      showModal
      backgroundBlur
      closeOnOutsideClick={false}
      verticalAlign="center"
      setShowModal={setShowModal}
    >
      <div className="bg-dark-blue flex flex-col p-8 gap-8 rounded-lg border border-gray-500">
        <span>
          Du bist schon als <strong>{data?.user.userName}</strong> angemeldet.
          Willst du dich abmelden um fortzufahren?
        </span>
        <div className="flex flex-row w-full gap-8">
          <Button
            type="button"
            onClick={() => {
              if (socket.connected === false) socket.connect()

              router.push("/")
            }}
            label="Zur Hauptseite"
          />

          <Button
            type="button"
            onClick={async () => {
              const response = await signOut({ redirect: false })

              if (socket.connected === true) socket.disconnect()

              if (response) setShowModal(false)
            }}
            label="Abmelden"
          />
        </div>
      </div>
    </Modal>
  )
}
