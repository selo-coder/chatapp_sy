"use client"

import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
import UserList from "@/components/mainPage/userList"
import ChatOverview from "@/components/mainPage/chatOverview"
import { getAllUsersClient } from "@/socket/getAllUsers"
import { sendTextMessageClient } from "@/socket/sendTextMessage"
import { getAllMessagesClient } from "@/socket/getAllMessages"
import { sendOnlineStatusClient } from "@/socket/sendOnlineStatus"
import socket from "../../socket"

export default function Home() {
  const { data } = useSession()
  const [userList, setUserList] = useState<Account[]>()
  const [currentSelectedChatUser, setCurrentSelectedChatUser] =
    useState<Account>()
  const [currentLoadedChat, setCurrentLoadedChat] = useState<PersonalChat[]>()

  useEffect(() => {
    if (socket.connected === false) socket.connect()

    function initialSocketEmits() {
      if (data?.user.id && !userList) {
        socket.emit("sendInitialUserInfo", data?.user.id)
        socket.emit("getAllUsers", data.user.id)
      }
    }

    // Initial Emits on Reconnect
    socket.on("connect", initialSocketEmits)

    // Initial Emits on first Connect
    if (socket.connected) {
      initialSocketEmits()
    }

    // Socket.on event to receive all users list
    getAllUsersClient({
      currentSelectedChatUser,
      setCurrentSelectedChatUser,
      setUserList,
      socket,
    })

    // Socket.on event to receive newly send text message
    sendTextMessageClient({ setCurrentLoadedChat, socket })

    // Socket.on event to receive all messages of a chat between two people
    getAllMessagesClient({ setCurrentLoadedChat, socket })

    // Socket.on event to receive change of an online status
    sendOnlineStatusClient({ setUserList, socket })

    return () => {
      socket.off("sendTextMessage")
      socket.off("getAllUsers")
      socket.off("getAllMessages")
      socket.off("connect", initialSocketEmits)
      socket.off("sendOnlineStatus")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-full h-full flex flex-row gap-8 p-8 ">
      <UserList
        setCurrentSelectedChatUser={setCurrentSelectedChatUser}
        userList={userList}
      />

      <ChatOverview
        setUserList={setUserList}
        userList={userList}
        currentLoadedChat={currentLoadedChat}
        currentSelectedChatUser={currentSelectedChatUser}
      />
    </div>
  )
}
