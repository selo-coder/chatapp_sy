/* eslint-disable react-hooks/exhaustive-deps */

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
import useIsMobile from "@/utils/useIsMobile"
import socket from "../../socket"

export default function Home() {
  const { data } = useSession()
  const isMobile = useIsMobile()
  const [userList, setUserList] = useState<Account[]>()
  const [currentSelectedChatUser, setCurrentSelectedChatUser] =
    useState<Account>()
  const [currentLoadedChat, setCurrentLoadedChat] = useState<PersonalChat[]>()
  const [currentLoadedWindow, setCurrentLoadedWindow] = useState<
    "userList" | "chat" | "both" | undefined
  >(undefined)

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

    // Socket.on event to receive all messages of a chat between two people
    getAllMessagesClient({ setCurrentLoadedChat, socket })

    // Socket.on event to receive change of an online status
    sendOnlineStatusClient({ setUserList, socket })

    return () => {
      socket.off("getAllUsers")
      socket.off("getAllMessages")
      socket.off("connect", initialSocketEmits)
      socket.off("sendOnlineStatus")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Seperate UseEffect for sendTextMessageClient to work with Current value of currentSelectedChatUser
  useEffect(() => {
    if (currentSelectedChatUser)
      // Socket.on event to receive newly send text message
      sendTextMessageClient({
        setCurrentLoadedChat,
        socket,
        userId: data?.user.id,
        currentSelectedChatUserId: currentSelectedChatUser?.id,
      })

    return () => {
      socket.off("sendTextMessage")
    }
  }, [currentSelectedChatUser])

  useEffect(() => {
    if (isMobile === false) setCurrentLoadedWindow("both")

    if (isMobile === true)
      setCurrentLoadedWindow(
        currentLoadedWindow === "chat" ? "chat" : "userList"
      )
  }, [isMobile])

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8 h-[calc(100%-64px)] md:h-[calc(100%-96px)]">
      {currentLoadedWindow !== "chat" && (
        <UserList
          isMobile={isMobile}
          setCurrentLoadedWindow={setCurrentLoadedWindow}
          setCurrentSelectedChatUser={setCurrentSelectedChatUser}
          userList={userList}
        />
      )}

      {currentLoadedWindow !== "userList" && (
        <ChatOverview
          currentLoadedWindow={currentLoadedWindow}
          setCurrentLoadedChat={setCurrentLoadedChat}
          setCurrentLoadedWindow={setCurrentLoadedWindow}
          isMobile={isMobile}
          setUserList={setUserList}
          userList={userList}
          currentLoadedChat={currentLoadedChat}
          currentSelectedChatUser={currentSelectedChatUser}
        />
      )}
    </div>
  )
}
