"use client"

import socket from "@/socket"
import { PersonalChat } from "@/types/personalChat"
import { useEffect, useRef, useState } from "react"

interface ChatElementMenuProps {
  chatEntry: PersonalChat
  userId: string | undefined
  index: number
  lastChatEntryIndex: number
}

export default function ChatElementMenu({
  chatEntry,
  userId,
  index,
  lastChatEntryIndex,
}: ChatElementMenuProps) {
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

  function handleDeleteTextMessage(message: PersonalChat) {
    socket.emit("deleteTextMessage", message)
  }

  return (
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
          className="w-6 h-6 md:hover:scale-125 cursor-pointer duration-100 ease-in-out-in-out transition-all active:scale-125"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
          />
        </svg>
      </div>

      <div
        className={`absolute text-sm whitespace-nowrap p-4 h-fit z-30 bg-dark-green w-24 gap-2 items-center rounded-lg ${
          chatEntry.senderId === userId
            ? `${
                window.innerWidth - 168 >=
                (observerRef.current?.clientWidth || 0)
                  ? "-left-[7.5rem]"
                  : "left-0"
              }`
            : `${
                window.innerWidth - 168 >=
                (observerRef.current?.clientWidth || 0)
                  ? "-right-[7.5rem]"
                  : "right-0"
              }`
        } ${showMenu ? "flex flex-col" : "hidden"} ${
          index !== lastChatEntryIndex ? "-top-0" : "-top-[3.5rem]"
        }`}
      >
        {chatEntry.senderId === userId && (
          <button
            type="button"
            onClick={() => {
              handleDeleteTextMessage(chatEntry)

              setShowMenu(false)
            }}
            className="w-fit cursor-pointer group/1"
          >
            <span>Löschen</span>
            <div className="h-px bg-white transition-all duration-200 ease-in-out w-0 group-hover/1:w-full" />
          </button>
        )}
        <button
          onClick={() => {
            if (navigator.clipboard)
              navigator.clipboard.writeText(chatEntry.textMessage || "")
            setShowMenu(false)
          }}
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
  )
}
