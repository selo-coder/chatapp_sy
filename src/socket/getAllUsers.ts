import { Account } from "@/types/account"
import { prismaClient } from "../database/client"
import {
  ServerExtended,
  ServerSocketExtended,
  ClientSocketExtended,
} from "../types/socket"

export function getAllUsersServer(
  socket: ServerSocketExtended,
  io: ServerExtended
) {
  socket.on("getAllUsers", async (senderId: string) => {
    const allAccounts = await prismaClient.account.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
      },
    })

    // 2. Hole alle PersonalChats, die den Sender betreffen, und sortiere nach createdAt
    const relevantChats = await prismaClient.personalChat.findMany({
      where: {
        OR: [{ senderId }, { recipientId: senderId }],
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    // 3. Extrahiere die IDs der relevanten Recipients
    const relevantRecipientIds = relevantChats.map((chat) =>
      chat.senderId === senderId ? chat.recipientId : chat.senderId
    )

    // 4. Erstelle eine Map für die Reihenfolge basierend auf den neuesten PersonalChats
    const recipientOrderMap = new Map()
    relevantRecipientIds.forEach((recipientId, index) => {
      if (!recipientOrderMap.has(recipientId)) {
        recipientOrderMap.set(recipientId, index)
      }
    })

    // 5. Sortiere alle Accounts, wobei diejenigen mit einer PersonalChat-Beziehung zuerst kommen,
    // und diese dann nach dem neuesten createdAt sortiert sind
    const sortedAccounts = allAccounts.sort((a, b) => {
      const orderA = recipientOrderMap.has(a.id)
        ? recipientOrderMap.get(a.id)
        : Number.MAX_SAFE_INTEGER
      const orderB = recipientOrderMap.has(b.id)
        ? recipientOrderMap.get(b.id)
        : Number.MAX_SAFE_INTEGER
      return orderA - orderB
    })

    const onlineAccounts: Account[] = sortedAccounts
      .map((account) => {
        const acc: Account = account
        acc.isOnline = false

        io.sockets.sockets.forEach((socketIO) => {
          if (socketIO.data.id === account.id) {
            acc.isOnline = true
          }
        })

        return acc
      })
      .filter((account) => account.id !== socket.data.id)

    socket.emit("getAllUsers", onlineAccounts)
  })
}

interface GetAllUsersClientProps {
  socket: ClientSocketExtended
  setUserList: (value: Account[] | undefined) => void
  currentSelectedChatUser: Account | undefined
  setCurrentSelectedChatUser: (value: Account | undefined) => void
}

export function getAllUsersClient({
  currentSelectedChatUser,
  setCurrentSelectedChatUser,
  setUserList,
  socket,
}: GetAllUsersClientProps) {
  socket.on("getAllUsers", (users) => {
    setUserList(users)

    if (!currentSelectedChatUser) setCurrentSelectedChatUser(users[0])
  })
}
