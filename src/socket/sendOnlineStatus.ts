/* eslint-disable import/prefer-default-export */
import { Account } from "@/types/account"
import { ClientSocketExtended } from "@/types/socket"

interface SendOnlineStatusProps {
  socket: ClientSocketExtended
  setUserList: (value: React.SetStateAction<Account[] | undefined>) => void
}

export function sendOnlineStatusClient({
  socket,
  setUserList,
}: SendOnlineStatusProps) {
  socket.on("sendOnlineStatus", ({ id, isOnline }) => {
    setUserList((oldUserList) =>
      oldUserList?.map((user) =>
        user.id === id ? { ...user, isOnline } : user
      )
    )
  })
}
