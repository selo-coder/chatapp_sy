"use client"

import { PersonalChat } from "@/types/personalChat"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import ChatElement from "./chatElement"

interface ChatProps {
  currentLoadedChat: PersonalChat[] | undefined
}

export default function Chat({ currentLoadedChat }: ChatProps) {
  const { data } = useSession()
  const ref = useRef<HTMLDivElement | null>(null)
  const [update, setUpdate] = useState(false)
  const [openImageList, setOpenImageList] = useState<boolean[]>(
    currentLoadedChat?.map(() => false) || []
  )

  // Scroll down on reloading or first load of chat
  useEffect(() => {
    if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [currentLoadedChat])

  const handleOpenImageChange = (imageIndex: number) => {
    openImageList.splice(imageIndex, 1, !openImageList[imageIndex])
    setUpdate(!update)
  }

  // Set Initial values for openImageList
  useEffect(() => {
    if (currentLoadedChat) setOpenImageList(currentLoadedChat.map(() => false))
  }, [currentLoadedChat])

  return (
    <div ref={ref} className="grow h-full overflow-y-auto">
      <div className="mt-4 md:mt-8 flex flex-col gap-2">
        {currentLoadedChat &&
          currentLoadedChat.map((chatEntry: PersonalChat, index: number) => (
            <ChatElement
              key={`chatEntry${chatEntry.id}`}
              chatEntry={chatEntry}
              index={index}
              currentLoadedChat={currentLoadedChat}
              handleOpenImageChange={handleOpenImageChange}
              openImageList={openImageList}
              userId={data?.user.id}
            />
          ))}
      </div>
    </div>
  )
}
