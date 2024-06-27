"use client"

import Chat from "./chat"
import ChatInput from "./chatInput"
import ChatHeader from "./chatHeader"
import { FadeInDiv } from "../common/fadeInElements"

export default function ChatOverview() {
  return (
    <FadeInDiv className="w-full max-h-full h-full rounded-lg flex flex-col relative">
      <ChatHeader />

      <Chat />

      <ChatInput />
    </FadeInDiv>
  )
}
