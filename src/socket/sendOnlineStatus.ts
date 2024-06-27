/* eslint-disable import/prefer-default-export */
import { Account } from "@/types/account"
import { ClientSocketExtended } from "@/types/socket"

interface SendOnlineStatusProps {
  socket: ClientSocketExtended
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
  setCurrentSelectedChatUser: (
    value: React.SetStateAction<Account | undefined>
  ) => void
}

export function sendOnlineStatusClient({
  socket,
  setUserList,
  setCurrentSelectedChatUser,
}: SendOnlineStatusProps) {
  socket.on("sendOnlineStatus", ({ id, isOnline }) => {
    setUserList((oldUserList) =>
      oldUserList?.map((user) =>
        user.id === id ? { ...user, isOnline } : user
      )
    )

    setCurrentSelectedChatUser((oldUser: Account | undefined) =>
      oldUser ? ({ ...oldUser, isOnline } as Account) : undefined
    )
  })
}
