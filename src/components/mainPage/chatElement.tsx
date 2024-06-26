import { PersonalChat } from "@/types/personalChat"
import { format } from "date-fns"
import Image from "next/image"
import ChatElementMenu from "./chatElementMenu"

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
  return (
    <div
      className={`bg-green/60 w-fit p-2 pb-5 flex flex-col gap-1 relative max-w-lg rounded-lg group ${
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

      <ChatElementMenu
        lastChatEntryIndex={currentLoadedChat.length - 1}
        chatEntry={chatEntry}
        index={index}
        userId={userId}
      />
    </div>
  )
}
