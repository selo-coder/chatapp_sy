"use client"

import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
import { motion } from "framer-motion"
import Chat from "./chat"
import ChatInput from "./chatInput"
import Button from "../common/button"

interface ChatProps {
  currentSelectedChatUser: Account | undefined
  currentLoadedChat: PersonalChat[] | undefined
  userList: Account[] | undefined
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
  setCurrentLoadedWindow: React.Dispatch<
    React.SetStateAction<"userList" | "chat" | "both" | undefined>
  >
  isMobile: boolean | undefined
  currentLoadedWindow: "userList" | "chat" | "both" | undefined
  setCurrentLoadedChat: (value: PersonalChat[] | undefined) => void
}

export default function ChatOverview({
  currentSelectedChatUser,
  currentLoadedChat,
  setUserList,
  userList,
  isMobile,
  setCurrentLoadedWindow,
  currentLoadedWindow,
  setCurrentLoadedChat,
}: ChatProps) {
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
      <div className="w-full flex flex-row justify-between mb-2 items-center">
        <span className="text-sm md:text-lg underline flex-1 line-clamp-1 break-all pr-2">
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
            className="text-xs h-6 w-fit px-2 rounded bg-dark-green hover:bg-dark-green/75 active:bg-dark-green/50"
            label="Zurück zur Übersicht"
          />
        )}
      </div>

      <Chat currentLoadedChat={currentLoadedChat} />

      <ChatInput
        currentSelectedChatUser={currentSelectedChatUser}
        setUserList={setUserList}
        userList={userList}
      />
    </motion.div>
  )
}
