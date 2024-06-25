"use client"

import { Account } from "@/types/account"
import { motion } from "framer-motion"

interface UserListProps {
  userList: Account[] | undefined
  setCurrentSelectedChatUser: (user: Account) => void
  isMobile: boolean | undefined
  setCurrentLoadedWindow: React.Dispatch<
    React.SetStateAction<"userList" | "chat" | "both" | undefined>
  >
}

export default function UserList({
  userList,
  setCurrentSelectedChatUser,
  isMobile,
  setCurrentLoadedWindow,
}: UserListProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.75,
        ease: "easeInOut",
      }}
      className="p-4 md:p-8 max-h-full grow h-full flex flex-col gap-4 w-full md:w-96 bg-green/25 rounded-lg"
    >
      <span className="text-sm underline md:text-base">
        {userList && userList.length > 0
          ? "Alle User"
          : "Keine Nutzer vorhanden"}
      </span>

      <div className="overflow-y-scroll w-full h-full flex flex-col grow gap-4">
        {userList &&
          userList.map((user: Account) => (
            <button
              type="button"
              onClick={() => {
                if (isMobile) setCurrentLoadedWindow("chat")

                setCurrentSelectedChatUser(user)
              }}
              className="p-2 bg-swamp-green/60 items-center flex flex-row rounded-lg cursor-pointer hover:bg-swamp-green/40 active:bg-swamp-green/25 duration-200 ease transition-all"
              key={`userList${user.id}`}
            >
              <div className="w-full flex justify-center px-2">
                <span className="hyphens-auto line-clamp-3 text-sm md:text-base">
                  {user.userName}
                </span>
              </div>
              <span
                className={`${
                  user.isOnline ? "bg-dark-green/25" : "bg-red-500/50"
                } text-[10px] p-1 rounded-lg`}
              >
                {user.isOnline ? "Online" : "Offline"}
              </span>
            </button>
          ))}
      </div>
    </motion.div>
  )
}
