"use client"

import socket from "@/socket"
import { useState } from "react"
import { Account } from "@/types/account"
import {
  useCurrentSelectedChatUser,
  useUserList,
} from "@/provider/mainDataProvider"
import { PersonalChat } from "@/types/personalChat"
import bringToFrontById from "@/utils/bringToFrontById"
import Modal from "./modal"
import Button from "../common/button"

interface ForwardTextMessageModalProps {
  setShowModal: (showModal: boolean) => void
  userId: string | undefined
  chatEntry: PersonalChat
}

export default function ForwardTextMessageModal({
  setShowModal,
  userId,
  chatEntry,
}: ForwardTextMessageModalProps) {
  const { userList, setUserList } = useUserList()
  const { setCurrentSelectedChatUser } = useCurrentSelectedChatUser()
  const [selectedForwardUser, setSelectedForwardUser] = useState<
    Account | undefined
  >(undefined)

  function handleForwardTextMessage(message: PersonalChat) {
    if (userId && message && selectedForwardUser) {
      setCurrentSelectedChatUser(selectedForwardUser)
      socket.emit("forwardTextMessage", {
        message,
        senderId: userId,
        recipientId: selectedForwardUser.id,
      })

      if (userList && selectedForwardUser?.id)
        setUserList((oldUserList) =>
          bringToFrontById(oldUserList || [], selectedForwardUser?.id)
        )
    }
  }

  return (
    <Modal
      showModal
      backgroundBlur
      closeOnOutsideClick
      verticalAlign="center"
      setShowModal={setShowModal}
    >
      <div className="bg-dark-blue flex flex-col p-8 gap-8 rounded-lg border border-gray-500">
        <span>
          Bitte wähle eine Person aus, der du die Nachricht weiterleiten
          möchtest.
        </span>
        <div className="flex flex-col gap-2 max-h-72 overflow-y-scroll text-center">
          {userList?.map((user) => (
            <button
              key={`forwardButton${user.id}`}
              type="button"
              onClick={() =>
                setSelectedForwardUser(
                  selectedForwardUser && selectedForwardUser?.id === user.id
                    ? undefined
                    : user
                )
              }
              className={`bg-dark-green hover:bg-dark-green/75 border-2 active:bg-dark-green/50 rounded-lg p-2 ${
                selectedForwardUser && selectedForwardUser.id === user.id
                  ? "border-white"
                  : "border-dark-green"
              }
              `}
            >
              {user.userName}
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-white" />
        <div className="flex flex-row w-full gap-8">
          <Button
            className="px-2 whitespace-nowrap"
            type="button"
            onClick={() => {
              setShowModal(false)
            }}
            label="Abrechen"
          />

          <Button
            className={`px-2 whitespace-nowrap ${
              !selectedForwardUser
                ? "bg-green/25  hover:bg-green/25 active:bg-green/25"
                : ""
            }`}
            type="button"
            disabled={!selectedForwardUser}
            onClick={async () => {
              handleForwardTextMessage(chatEntry)

              setShowModal(false)
            }}
            label="Senden"
          />
        </div>
      </div>
    </Modal>
  )
}
