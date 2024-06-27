"use client"

import { PersonalChat } from "@/types/personalChat"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { useCurrentLoadedChat } from "@/provider/mainDataProvider"
import ChatElement from "./chatElement"

export default function Chat() {
  const { currentLoadedChat } = useCurrentLoadedChat()

  const { data } = useSession()
  const ref = useRef<HTMLDivElement | null>(null)
  const [update, setUpdate] = useState(false)
  const [openImageList, setOpenImageList] = useState<boolean[] | null>(null)

  // Scroll down on reloading or first load of chat
  useEffect(() => {
    if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [currentLoadedChat])

  const handleOpenImageChange = (imageIndex: number) => {
    if (openImageList)
      openImageList.splice(imageIndex, 1, !openImageList[imageIndex])
    setUpdate(!update)
  }

  // Set Initial values for openImageList
  useEffect(() => {
    if (currentLoadedChat && openImageList == null)
      setOpenImageList(currentLoadedChat.map(() => false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLoadedChat])

  return (
    <div ref={ref} className="grow h-full overflow-y-auto">
      {currentLoadedChat && currentLoadedChat.length > 0 ? (
        <div className="mt-4 md:mt-8 flex flex-col gap-2">
          {currentLoadedChat.map((chatEntry: PersonalChat, index: number) => (
            <ChatElement
              key={`chatEntry${chatEntry.id}`}
              chatEntry={chatEntry}
              index={index}
              currentLoadedChat={currentLoadedChat}
              handleOpenImageChange={handleOpenImageChange}
              openImageList={openImageList || []}
              userId={data?.user.id}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-full grow flex flex-col justify-center text-center gap-2 items-center">
          <span>Noch keine Nachrichten in diesem Chat!</span>

          <span>Schreibe die erste Nachricht!</span>
        </div>
      )}
    </div>
  )
}
