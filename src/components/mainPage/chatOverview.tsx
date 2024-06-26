"use client"

import { motion } from "framer-motion"

import {
  useCurrentLoadedChat,
  useCurrentSelectedChatUser,
  useCurrentLoadedWindow,
  useMobile,
} from "@/provider/mainDataProvider"
import Chat from "./chat"
import ChatInput from "./chatInput"
import Button from "../common/button"

export default function ChatOverview() {
  const { setCurrentLoadedChat } = useCurrentLoadedChat()
  const { currentSelectedChatUser } = useCurrentSelectedChatUser()
  const { currentLoadedWindow, setCurrentLoadedWindow } =
    useCurrentLoadedWindow()
  const { isMobile } = useMobile()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      className="w-full max-h-full h-full rounded-lg flex flex-col relative"
    >
      <div className="w-full flex flex-row justify-between mb-4 items-center">
        <span className="text-sm md:text-base underline flex-1 line-clamp-1 break-all pr-2">
          {currentSelectedChatUser?.userName
            ? `${currentSelectedChatUser?.userName}`
            : "Kein Chatnutzer ausgewählt"}
        </span>

        {isMobile === true && currentLoadedWindow === "chat" && (
          <Button
            onClick={() => {
              setCurrentLoadedChat(undefined)
              setCurrentLoadedWindow("userList")
            }}
            className="text-xs h-6 w-fit px-2 rounded bg-dark-green hover:bg-dark-green/75 active:bg-dark-green/50 duration-200 ease-in-out transition-all"
            label="Zurück zur Übersicht"
          />
        )}
      </div>

      <Chat />

      <ChatInput />
    </motion.div>
  )
}
