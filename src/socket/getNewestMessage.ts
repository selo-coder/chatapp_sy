import { prismaClient } from "../database/client"
import { ServerSocketExtended } from "../types/socket"

export default function getNewestMessage(socket: ServerSocketExtended) {
  socket.on("getNewestMessage", async ({ recipientId, senderId }) => {
    const message = await prismaClient.personalChat.findFirst({
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
        createdAt: "desc",
      },
    })

    socket.emit("getNewestMessage", message)
  })
}
