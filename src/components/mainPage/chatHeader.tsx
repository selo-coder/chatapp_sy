import {
  useCurrentLoadedChat,
  useCurrentSelectedChatUser,
  useCurrentLoadedWindow,
  useMobile,
} from "@/provider/mainDataProvider"
import Button from "../common/button"

export default function ChatHeader() {
  const { setCurrentLoadedChat } = useCurrentLoadedChat()
  const { currentSelectedChatUser } = useCurrentSelectedChatUser()
  const { currentLoadedWindow, setCurrentLoadedWindow } =
    useCurrentLoadedWindow()
  const { isMobile } = useMobile()

  return (
    <div className="w-full flex flex-row justify-between mb-4 items-center">
      <div className="flex flex-1 pr-2 gap-2 items-center h-full">
        <span className="text-xs md:text-base flex-1 line-clamp-1 break-all">
          {currentSelectedChatUser?.userName
            ? `${currentSelectedChatUser?.userName}`
            : "Kein Chatnutzer ausgewählt"}
        </span>

        {isMobile && currentSelectedChatUser && (
          <span
            className={`${
              currentSelectedChatUser.isOnline
                ? "bg-swamp-green"
                : "bg-red-500/50"
            } text-[10px] p-1 rounded-lg`}
          >
            {currentSelectedChatUser.isOnline ? "Online" : "Offline"}
          </span>
        )}
      </div>

      {isMobile === true && currentLoadedWindow === "chat" && (
        <Button
          onClick={() => {
            setCurrentLoadedChat(undefined)
            setCurrentLoadedWindow("userList")
          }}
          className="text-xs h-6 w-fit px-2 rounded bg-dark-green hover:bg-dark-green/75 active:bg-dark-green/50 duration-200 ease-in-out transition-all"
          label="Zurück zur Übersicht"
        />
      )}
    </div>
  )
}
