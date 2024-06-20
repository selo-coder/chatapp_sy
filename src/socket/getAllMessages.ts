import { PersonalChat } from "@/types/personalChat"
import { prismaClient } from "../database/client"
import { ClientSocketExtended, ServerSocketExtended } from "../types/socket"

export function getAllMessagesServer(socket: ServerSocketExtended) {
  socket.on("getAllMessages", async ({ recipientId, senderId }) => {
    const messages = await prismaClient.personalChat.findMany({
      where: {
        OR: [
          {
            recipient: { id: recipientId },
            sender: { id: senderId },
          },
          {
            recipient: { id: senderId },
            sender: { id: recipientId },
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    })

    socket.emit("getAllMessages", messages)
  })
}

interface GetAllMessagesClientProps {
  socket: ClientSocketExtended
  setCurrentLoadedChat: (value: PersonalChat[] | undefined) => void
}

export function getAllMessagesClient({
  socket,
  setCurrentLoadedChat,
}: GetAllMessagesClientProps) {
  socket.on("getAllMessages", (messages) => {
    setCurrentLoadedChat(messages)
  })
}
