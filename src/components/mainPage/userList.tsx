"use client"

import { Account } from "@/types/account"

interface UserListProps {
  userList: Account[] | undefined
  setCurrentSelectedChatUser: (user: Account) => void
}

export default function UserList({
  userList,
  setCurrentSelectedChatUser,
}: UserListProps) {
  return (
    <div className="p-8 h-[80vh] flex flex-col w-96 gap-4 bg-green rounded-lg	overflow-y-scroll">
      <span>
        {userList && userList.length > 0
          ? "Alle User:"
          : "Keine Nutzer vorhanden"}
      </span>
      {userList &&
        userList.map((user: Account) => (
          <button
            type="button"
            onClick={() => setCurrentSelectedChatUser(user)}
            className="p-2 bg-swamp-green/75 relative rounded-lg cursor-pointer hover:bg-swamp-green/50 active:bg-swamp-green/25"
            key={`userList${user.id}`}
          >
            {user.userName}
            <span
              className={`${
                user.isOnline ? "bg-dark-green/25" : "bg-red-500/50"
              } absolute text-[10px] p-1 rounded-lg top-0 right-0`}
            >
              {user.isOnline ? "Online" : "Offline"}
            </span>
          </button>
        ))}
    </div>
  )
}
