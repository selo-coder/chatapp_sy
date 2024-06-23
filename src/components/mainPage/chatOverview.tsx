"use client"

import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
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
    <div className="p-4 md:p-8 w-full max-h-full h-full bg-swamp-green rounded-lg flex flex-col relative">
      <div className="w-full flex flex-row justify-between -mt-2 mb-2 items-center">
        <span className="text-sm underline md:text-base">
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
            className="text-xs h-6 w-fit px-2 rounded bg-dark-blue hover:bg-dark-blue/75 active:bg-dark-blue/50"
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
    </div>
  )
}
