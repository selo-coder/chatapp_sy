"use client"

import { PersonalChat } from "@/types/personalChat"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

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
    <div className="grow h-full overflow-y-auto">
      <div ref={ref} className="mt-4 md:mt-8 flex flex-col gap-4">
        {currentLoadedChat &&
          currentLoadedChat.map((chatEntry: PersonalChat, index: number) => (
            <div
              className={`bg-green w-fit p-2 pb-5 flex flex-col gap-1 md:gap-2 relative max-w-lg rounded-lg ${
                chatEntry.senderId === data?.user.id
                  ? "self-end rounded-tr-none"
                  : "rounded-tl-none"
              }`}
              key={`chatEntry${chatEntry.id}`}
            >
              {chatEntry.imageUrl && (
                <Image
                  onClick={() => {
                    handleOpenImageChange(index)
                  }}
                  className={`${
                    openImageList[index] === true
                      ? "max-w-full max-h-full"
                      : "w-48"
                  } cursor-pointer`}
                  width={1000}
                  height={1000}
                  alt=""
                  src={chatEntry.imageUrl}
                />
              )}
              <p className="text-sm md:text-base"> {chatEntry?.textMessage}</p>
              <div className="w-20" />
              <span className="text-[10px] absolute right-2 bottom-1">
                {format(new Date(chatEntry.createdAt), "dd.MM.yyyy HH:mm")}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
