"use client"

import socket from "@/socket"
import { Account } from "@/types/account"
import { PersonalChat } from "@/types/personalChat"
import bringToFrontById from "@/utils/bringToFrontById"
import {
  PostTextMessage,
  sendTextMessageValidation,
} from "@/validation/textMessage"
import { format } from "date-fns"
import { useSession } from "next-auth/react"
import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "../common/input"
import Button from "../common/button"

interface ChatProps {
  currentSelectedChatUser: Account | undefined
  currentLoadedChat: PersonalChat[] | undefined
  userList: Account[] | undefined
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
}

export default function Chat({
  currentSelectedChatUser,
  currentLoadedChat,
  setUserList,
  userList,
}: ChatProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<PostTextMessage>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(sendTextMessageValidation),
  })
  const { data } = useSession()
  const ref = useRef<HTMLDivElement | null>(null)

  // Scroll down on reloading or first load of chat
  useEffect(() => {
    if (ref && ref.current) ref.current.scrollTop = ref.current.scrollHeight
  }, [currentLoadedChat])

  useEffect(() => {
    if (data?.user.id && currentSelectedChatUser?.id) {
      socket.emit("getAllMessages", {
        senderId: data?.user.id,
        recipientId: currentSelectedChatUser?.id,
      })

      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSelectedChatUser])

  function handleSendTextMessage({ textMessage }: PostTextMessage) {
    if (data?.user.id && currentSelectedChatUser?.id) {
      socket.emit("sendTextMessage", {
        senderId: data?.user.id,
        recipientId: currentSelectedChatUser?.id,
        textMessage,
      })
    }
    if (userList && currentSelectedChatUser?.id)
      setUserList((oldUserList) =>
        bringToFrontById(oldUserList || [], currentSelectedChatUser?.id)
      )
    reset()
  }

  return (
    <div className="p-8 h-[80vh] w-full bg-swamp-green rounded-lg h-auto flex flex-col">
      <span className="text-lg">
        {currentSelectedChatUser?.userName
          ? `Chat mit: ${currentSelectedChatUser?.userName}`
          : "Kein Chatnutzer ausgewählt"}
      </span>
      <div
        ref={ref}
        className="mt-8 flex flex-col w-full gap-4 overflow-y-scroll h-[64vh]"
      >
        {currentLoadedChat &&
          currentLoadedChat.map((chatEntry: PersonalChat) => (
            <div
              className={`bg-green w-fit p-2 pb-5 relative max-w-lg rounded-lg ${
                chatEntry.senderId === data?.user.id
                  ? "self-end rounded-tr-none"
                  : "rounded-tl-none"
              }`}
              key={`chatEntry${chatEntry.id}`}
            >
              {chatEntry.textMessage}
              <div className="w-20" />
              <span className="text-[10px] absolute right-2 bottom-1">
                {format(new Date(chatEntry.createdAt), "dd.MM.yyyy HH:mm")}
              </span>
            </div>
          ))}
      </div>

      <form
        onSubmit={handleSubmit(handleSendTextMessage)}
        className="flex flex-row gap-4 pt-8"
      >
        <Input error={!!errors.textMessage} {...register("textMessage")} />
        <Button type="submit" className="w-fit px-4" label="Senden" />
      </form>
    </div>
  )
}
