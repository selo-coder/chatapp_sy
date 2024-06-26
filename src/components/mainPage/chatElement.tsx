import { PersonalChat } from "@/types/personalChat"
import { format } from "date-fns"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

interface ChatElementProps {
  chatEntry: PersonalChat
  userId: string | undefined
  index: number
  currentLoadedChat: PersonalChat[]
  openImageList: boolean[]
  handleOpenImageChange: (imageIndex: number) => void
}

export default function ChatElement({
  chatEntry,
  userId,
  index,
  currentLoadedChat,
  handleOpenImageChange,
  openImageList,
}: ChatElementProps) {
  const [showMenu, setShowMenu] = useState(false)

  const observerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (observerRef.current && !observerRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [observerRef])

  return (
    <div
      className={`bg-green/60 w-fit p-2 pb-5 flex flex-col gap-1 md:gap-2 relative max-w-lg rounded-lg group ${
        chatEntry.senderId === userId
          ? `self-end ${
              currentLoadedChat[index - 1]?.senderId !== userId
                ? ""
                : "rounded-tr-none"
            } ${
              currentLoadedChat[index + 1]?.senderId !== userId
                ? ""
                : "rounded-br-none"
            }`
          : `${
              currentLoadedChat[index - 1]?.senderId === userId ||
              !currentLoadedChat[index - 1]?.senderId
                ? ""
                : "rounded-tl-none"
            } ${
              currentLoadedChat[index + 1]?.senderId === userId ||
              !currentLoadedChat[index + 1]?.senderId
                ? ""
                : "rounded-bl-none"
            }`
      }`}
    >
      {chatEntry.imageUrl && (
        <Image
          onClick={() => {
            handleOpenImageChange(index)
          }}
          className={`${
            openImageList[index] === true ? "max-w-full max-h-full" : "w-48"
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

      <div ref={observerRef}>
        <div
          className={`absolute top-0 md:hidden group-hover:flex h-full ${
            chatEntry.senderId === userId ? "-left-6" : "-right-6"
          }`}
        >
          <svg
            onClick={() => setShowMenu(!showMenu)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 md:hover:scale-125 cursor-pointer duration-200 ease-in-out-in-out transition-all active:scale-125"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </div>

        <div
          className={`absolute text-sm whitespace-nowrap top-6 p-4 h-fit  bg-dark-green w-24 gap-2 items-center rounded-lg ${
            chatEntry.senderId === userId ? "-left-28" : "-right-28"
          } ${showMenu ? "flex flex-col" : "hidden"}`}
        >
          <button
            type="button"
            onClick={() => setShowMenu(false)}
            className="w-fit cursor-pointer group/1"
          >
            <span>Löschen</span>
            <div className="h-px bg-white transition-all duration-200 ease-in-out w-0 group-hover/1:w-full" />
          </button>
          <button
            onClick={() => setShowMenu(false)}
            type="button"
            className="w-fit cursor-pointer group/2"
          >
            <span>Text kopieren</span>
            <div className="h-px" />

            <div className="h-px bg-white transition-all duration-200 ease-in-out w-0 group-hover/2:w-full" />
          </button>
          <button
            onClick={() => setShowMenu(false)}
            type="button"
            className="w-fit cursor-pointer group/3"
          >
            <span>Weiterleiten</span>
            <div className="h-px" />

            <div className=" h-px bg-white transition-all duration-200 ease-in-out w-0 group-hover/3:w-full" />
          </button>
        </div>
      </div>
    </div>
  )
}
