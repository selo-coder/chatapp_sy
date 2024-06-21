"use client"

import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
import Chat from "./chat"
import ChatInput from "./chatInput"

interface ChatProps {
  currentSelectedChatUser: Account | undefined
  currentLoadedChat: PersonalChat[] | undefined
  userList: Account[] | undefined
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
}

export default function ChatOverview({
  currentSelectedChatUser,
  currentLoadedChat,
  setUserList,
  userList,
}: ChatProps) {
  return (
    <div className="p-8 h-[80vh] w-full bg-swamp-green rounded-lg flex flex-col">
      <Chat
        currentLoadedChat={currentLoadedChat}
        currentSelectedChatUser={currentSelectedChatUser}
      />

      <ChatInput
        currentSelectedChatUser={currentSelectedChatUser}
        setUserList={setUserList}
        userList={userList}
      />
    </div>
  )
}
