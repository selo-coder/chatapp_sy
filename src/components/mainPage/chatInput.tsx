import { useEffect, useState } from "react"
import {
  PostTextMessage,
  sendTextMessageValidation,
} from "@/validation/textMessage"
import socket from "@/socket"
import bringToFrontById from "@/utils/bringToFrontById"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import { Account } from "@/types/account"
import Input from "../common/input"
import Button from "../common/button"

interface ChatInputProps {
  currentSelectedChatUser: Account | undefined
  userList: Account[] | undefined
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
}

export default function ChatInput({
  currentSelectedChatUser,
  userList,
  setUserList,
}: ChatInputProps) {
  const { data } = useSession()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const { register, handleSubmit, reset, getValues, watch } =
    useForm<PostTextMessage>({
      mode: "all",
      reValidateMode: "onChange",
      resolver: zodResolver(sendTextMessageValidation),
    })

  watch(["file", "textMessage"])

  // Load messages, when user is changed
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

  const handleImageChange = (e: any) => {
    setSelectedImage(null)
    if (e.target.files[0]) {
      const imageData = new FileReader()
      imageData.addEventListener("load", () => {
        setSelectedImage(imageData.result as string)
      })
      imageData.readAsDataURL(e.target.files[0])
    }
  }

  function handleSendTextMessage({ textMessage }: PostTextMessage) {
    if (data?.user.id && currentSelectedChatUser?.id) {
      socket.emit("sendTextMessage", {
        senderId: data?.user.id,
        recipientId: currentSelectedChatUser?.id,
        textMessage: textMessage || null,
        image: selectedImage,
      })
    }

    // Sort userList new, so currentChatUser is at top
    if (userList && currentSelectedChatUser?.id)
      setUserList((oldUserList) =>
        bringToFrontById(oldUserList || [], currentSelectedChatUser?.id)
      )
    reset()
    setSelectedImage(null)
  }

  return (
    <form
      onSubmit={handleSubmit(handleSendTextMessage)}
      className="flex flex-col gap-4 pt-4 items-center"
    >
      <Input {...register("textMessage")} />

      <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
        <input
          {...register("file")}
          type="file"
          accept=".png,.jpg,.jpeg"
          onChange={handleImageChange}
          className="block w-full md:min-w-min duration-200 ease-in-out transition-all md:w-min text-sm text-white file:cursor-pointer cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-green file:text-gray-300 hover:file:bg-green/75 active:file:bg-green/50"
        />
        <Button
          type="submit"
          className={`${
            !getValues("textMessage") && selectedImage == null
              ? "bg-green/25 rounded-lg h-10 hover:bg-green/25 active:bg-green/25"
              : ""
          } w-full md:w-fit px-4 text-sm`}
          disabled={!getValues("textMessage") && selectedImage == null}
          label="Senden"
        />
      </div>
    </form>
  )
}
